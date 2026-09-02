import { NextResponse } from "next/server";
import { Resend } from "resend";

// ---------------------------------------------------------------------------
// Geotech contact form API
//
// Mirrors app/api/contact (construction site) but targets the GEODRILL
// geotechnical inbox + Google Sheet tab. The geotech form captures its own
// set of fields (project type / required service / project location).
//
// 1. Auto-replies to the customer: "We received your consultation request".
// 2. Emails GEODRILL geotechnical with the submitted details (via Resend).
// 3. Appends a row to the "GEODRILL geotechnical" Google Sheet tab via a
//    Google Apps Script web app.
//
// Server-only env vars (never exposed to the client):
//   RESEND_API_KEY                    -> Resend API key
//   GEOTECH_FROM_EMAIL                -> verified sender (geotechnical@...)
//   GEODRILL_TO_EMAIL                 -> the inbox receiving the lead
//   GOOGLE_SHEET_WEBHOOK_URL_GEOTECH -> Apps Script web app URL for the
//                                        geotechnical sheet tab
// ---------------------------------------------------------------------------

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface GeotechContactInput {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  projectType?: string;
  requiredService?: string;
  projectLocation?: string;
  projectDescription: string;
}
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function customerEmailHtml(data: GeotechContactInput): string {
  const name = escapeHtml(data.fullName.trim());
  return `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;color:#191207;line-height:1.6">
  <h2 style="color:#c9a227">Thank you, ${name} 🤝</h2>
  <p>We've received your consultation request and our geotechnical team will get back to you as soon as possible.</p>
  <p>If your enquiry is urgent, feel free to reach us directly.</p>
  <br/>
  <p style="color:#6b7280">— GEODRILL Geotechnical &amp; Geoscience</p>
</body></html>`;
}

function internalEmailHtml(data: GeotechContactInput): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;font-weight:600;color:#191207;border-top:1px solid #e5e7eb">${label}</td><td style="padding:8px 12px;color:#374151;border-top:1px solid #e5e7eb">${escapeHtml(value)}</td></tr>`;

  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f3f4f6;padding:24px">
  <table style="width:100%;max-width:560px;margin:auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;border-collapse:collapse">
    <tr><td style="padding:20px;background:#191207;color:#fff;border-radius:12px 12px 0 0">
      <h2 style="margin:0;color:#c9a227">New Geotechnical Consultation Request</h2>
    </td></tr>
    <tr><td style="padding:0"><table style="border-collapse:collapse;width:100%">
      ${row("Full Name", data.fullName + "")}
      ${row("Company", data.company + "")}
      ${row("Email", data.email + "")}
      ${row("Phone", data.phone + "")}
      ${row("Project Type", data.projectType + "")}
      ${row("Required Service", data.requiredService + "")}
      ${row("Project Location", data.projectLocation + "")}
      ${row("Project Description", data.projectDescription + "")}
    </table></td></tr>
    <tr><td style="padding:12px 16px;color:#6b7280;font-size:13px">Sent via the GEODRILL geotechnical website contact form.</td></tr>
  </table></body></html>`;
}

export async function POST(request: Request) {
  let payload: GeotechContactInput;
  try {
    const body = await request.json();
    payload = {
      fullName: String(body.fullName ?? "").trim(),
      company: body.company ? String(body.company).trim() : "",
      email: String(body.email ?? "").trim(),
      phone: body.phone ? String(body.phone).trim() : "",
      projectType: body.projectType ? String(body.projectType).trim() : "",
      requiredService: body.requiredService ? String(body.requiredService).trim() : "",
      projectLocation: body.projectLocation ? String(body.projectLocation).trim() : "",
      projectDescription: String(body.projectDescription ?? "").trim(),
    };
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  // Validation (mirrors the client rules).
  const errors: Record<string, string> = {};
  if (!payload.fullName) errors.fullName = "Full name is required.";
  if (!payload.email) errors.email = "Email address is required.";
  else if (!EMAIL_RE.test(payload.email)) errors.email = "Please enter a valid email address.";
  if (!payload.projectDescription) errors.projectDescription = "Please describe your project.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, message: "Please review the highlighted fields.", errors },
      { status: 400 },
    );
  }

  if (!resend) {
    return NextResponse.json(
      { ok: false, message: "Email service is not configured. Please set RESEND_API_KEY on the server." },
      { status: 500 },
    );
  }

  const fromEmail = process.env.GEOTECH_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const toEmail = process.env.GEODRILL_TO_EMAIL || "";
  const sheetUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL_GEOTECH || "";

  let customerSent = false;
  const details: { fromEmail: string; toEmail: string; sheetUrl: string; internalError?: string; sheetError?: string } = {
    fromEmail,
    toEmail,
    sheetUrl,
  };

  // 1) Auto-reply to the customer.
  try {
    const r = await resend.emails.send({
      from: fromEmail,
      to: [payload.email],
      subject: "We received your consultation request — GEODRILL Geotechnical",
      html: customerEmailHtml(payload),
    });
    if (r.error) throw r.error;
    customerSent = true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[geotech-contact] customer email failed:", msg);
    customerSent = false;
  }

  // 2) Internal lead notification to GEODRILL (best-effort).
  if (toEmail) {
    try {
      const r = await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        subject: `New geotechnical enquiry from ${payload.fullName || "a visitor"}`,
        html: internalEmailHtml(payload),
      });
      if (r.error) throw r.error;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      details.internalError = msg;
      console.error("[geotech-contact] internal email failed:", msg);
    }
  } else {
    details.internalError = "GEODRILL_TO_EMAIL is not set — internal notification skipped.";
  }

  // 3) Append a row to the geotechnical Google Sheet tab (best-effort).
  if (sheetUrl) {
    try {
      const sheetResp = await fetch(sheetUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          site: "geotechnical",
          fullName: payload.fullName,
          company: payload.company || "",
          email: payload.email,
          phone: payload.phone || "",
          projectType: payload.projectType || "",
          requiredService: payload.requiredService || "",
          projectLocation: payload.projectLocation || "",
          projectDescription: payload.projectDescription || "",
        }),
      });
      const text = (await sheetResp.text()).slice(0, 300);
      if (!sheetResp.ok) {
        details.sheetError = `HTTP ${sheetResp.status}: ${text}`;
        console.error("[geotech-contact] sheet HTTP error:", sheetResp.status, text);
      } else if (text.toLowerCase().includes("<html")) {
        details.sheetError =
          "Sheet returned HTML (likely a login/redirect). Check the web-app deployment access: set 'Who has access' to 'Anyone'.";
        console.error("[geotech-contact] sheet returned HTML (redirect to login?)");
      } else {
        console.log("[geotech-contact] sheet reply:", text);
      }
    } catch (err) {
      details.sheetError = err instanceof Error ? err.message : String(err);
      console.error("[geotech-contact] sheet fetch error:", err);
    }
  }

  return NextResponse.json(
    {
      ok: customerSent,
      message: customerSent
        ? "Your consultation request has been received. We'll be in touch soon."
        : "We could not send a confirmation email right now. Please try again or contact us directly.",
      details,
    },
    { status: customerSent ? 200 : 502 },
  );
}