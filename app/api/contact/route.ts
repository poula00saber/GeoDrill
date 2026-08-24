import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  isContactFormInput,
  validateContactInput,
  type ContactFormInput,
} from "@/types/contact";

// ---------------------------------------------------------------------------
// Contact form API
//
// 1. Validates the payload (same rules as the client).
// 2. Auto-replies to the customer: "We received your message".
// 3. Emails GEODRILL with the submitted details (via Resend).
// 4. Appends a row to the Google Sheet via a Google Apps Script web app.
//
// Server-only env vars (never exposed to the client):
//   RESEND_API_KEY            -> Resend API key
//   RESEND_FROM_EMAIL          -> verified sender. For a verified domain use
//                                 e.g. "GEODRILL <info@yourdomain.com>". Resend's
//                                 sandbox "onboarding@resend.dev" can only
//                                 deliver to the account owner's address.
//   GEO_DRILL_TO_EMAIL     -> the inbox receiving the lead notification
//   GOOGLE_SHEET_WEBHOOK_URL -> the deployed Google Apps Script web app URL
// ---------------------------------------------------------------------------

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function customerEmailHtml(data: ContactFormInput): string {
  const name = escapeHtml(data.fullName.trim());
  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#0d2b34;line-height:1.6">
  <h2 style="color:#0fb5b9">Thank you, ${name} 🤝</h2>
  <p>We've received your message and our team will get back to you as soon as possible.</p>
  <p>If your enquiry is urgent, feel free to reach us directly.</p>
  <br/>
  <p style="color:#6b7280">— GEODRILL Construction Experts</p>
</body></html>`;
}

function internalEmailHtml(data: ContactFormInput): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font-weight:600;color:#0d2b34;border-top:1px solid #e5e7eb">${label}</td><td style="padding:8px 12px;color:#374151;border-top:1px solid #e5e7eb">${escapeHtml(value)}</td></tr>`;

  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:24px">
  <table style="width:100%;max-width:560px;margin:auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;border-collapse:collapse">
    <tr><td style="padding:20px;background:#0d2b34;color:#fff;border-radius:12px 12px 0 0">
      <h2 style="margin:0;color:#fff">New Contact Inquiry</h2>
    </td></tr>
    <tr><td style="padding:0"><table style="border-collapse:collapse;width:100%">
      ${row("Full Name", data.fullName + "")}
      ${row("Company", data.companyName + "")}
      ${row("Email", data.email + "")}
      ${row("Phone", data.phone + "")}
      ${row("Project Description", data.projectDescription + "")}
    </table></td></tr>
    <tr><td style="padding:12px 16px;color:#6b7280;font-size:13px">Sent via the GEODRILL website contact form.</td></tr>
  </table></body></html>`;
}

export async function POST(request: Request) {
  let payload: ContactFormInput;
  try {
    const parsed: unknown = await request.json();
    if (!isContactFormInput(parsed)) {
      return NextResponse.json(
        { ok: false, message: "Invalid form data." },
        { status: 400 },
      );
    }
    payload = parsed;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const validation = validateContactInput(payload);
  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please review the highlighted fields.",
        errors: validation.errors,
      },
      { status: 400 },
    );
  }

  if (!resend) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Email service is not configured. Please set RESEND_API_KEY on the server.",
      },
      { status: 500 },
    );
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toEmail = process.env.GEO_DRILL_TO_EMAIL || "";
  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL || "";

  let customerSent = false;
  const details: { toEmail: string; sheetUrl: string; internalError?: string; sheetError?: string } = {
    toEmail,
    sheetUrl,
  };

  // 1) Auto-reply to the customer.
  try {
    const r = await resend.emails.send({
      from: fromEmail,
      to: [payload.email],
      subject: "We received your message — GEODRILL",
      html: customerEmailHtml(payload),
    });
    if (r.error) throw r.error;
    customerSent = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] customer email failed:", msg);
    customerSent = false;
  }

  // 2) Internal lead notification to GEODRILL (best-effort).
  if (toEmail) {
    try {
      const r = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: `New inquiry from ${payload.fullName || "a visitor"}`,
        html: internalEmailHtml(payload),
      });
      if (r.error) throw r.error;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      details.internalError = msg;
      console.error("[contact] internal email failed:", msg);
    }
  } else {
    details.internalError = "GEODRILL_TO_EMAIL is not set — internal notification skipped.";
  }

  // 3) Append a row to the Google Sheet (best-effort).
  if (sheetUrl) {
    try {
      const sheetResp = await fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          fullName: payload.fullName,
          companyName: payload.companyName || "Individual",
          email: payload.email,
          phone: payload.phone,
          projectDescription: payload.projectDescription || "",
        }),
      });
      const text = (await sheetResp.text()).slice(0, 300);
      if (!sheetResp.ok) {
        details.sheetError = `HTTP ${sheetResp.status}: ${text}`;
        console.error("[contact] sheet HTTP error:", sheetResp.status, text);
      } else if (text.toLowerCase().includes("<html")) {
        details.sheetError =
          "Sheet returned HTML (likely a login/redirect). Check the web-app deployment access: set 'Who has access' to 'Anyone'.";
        console.error("[contact] sheet returned HTML (redirect to login?)");
      } else {
        console.log("[contact] sheet reply:", text);
      }
    } catch (err) {
      details.sheetError = err instanceof Error ? err.message : String(err);
      console.error("[contact] sheet fetch error:", err);
    }
  }

  return NextResponse.json(
    {
      ok: customerSent,
      message: customerSent
        ? "Your message has been received. We'll be in touch soon."
        : "We could not send a confirmation email right now. Please try again or contact us directly.",
      details,
    },
    { status: customerSent ? 200 : 502 },
  );
}