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
  return `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#eef4f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef4f4;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #d5e2e3;box-shadow:0 8px 30px rgba(13,43,52,0.10);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0d2b34 0%,#114550 100%);padding:32px 40px;text-align:center;">
          <div style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#0fb5b9;font-family:Arial,Helvetica,sans-serif;font-weight:700;">☰ GEODRILL KSA</div>
          <div style="margin-top:6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.55);font-family:Arial,Helvetica,sans-serif;">Construction Experts</div>
          <div style="height:2px;width:56px;margin:18px auto 0;background:#0fb5b9;border-radius:2px;"></div>
        </td></tr>

        <!-- Hero -->
        <tr><td style="background:linear-gradient(180deg,#f2fafb 0%,#ffffff 100%);padding:40px 40px 8px;text-align:center;">
          <div style="width:64px;height:64px;margin:0 auto 20px;border-radius:50%;background:rgba(15,181,185,0.12);font-size:30px;line-height:64px;text-align:center;">🤝</div>
          <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.3;color:#0d2b34;font-weight:800;">Thank You — We've Got Your Message 💬</h1>
          <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#2f5b66;font-weight:700;">Dear ${name},</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:24px 40px 8px;">
          <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#3f5560;">We've received your message and our construction team will be in touch within 24–48 hours.</p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#3f5560;">If your enquiry is urgent, reply to this email and one of our project managers will assist you directly.</p>
        </td></tr>

        <!-- Next steps -->
        <tr><td style="padding:16px 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2fafb;border:1px solid #d5e6e8;border-radius:12px;">
            <tr><td style="padding:20px 24px;">
              <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#0b8b8f;font-family:Arial,Helvetica,sans-serif;font-weight:700;margin-bottom:10px;">What happens next</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
                <tr><td style="padding:7px 0;font-size:14px;color:#2f5b66;vertical-align:top;">01</td><td style="padding:7px 12px;font-size:14px;color:#0d2b34;font-weight:600;vertical-align:top;white-space:nowrap;">We review</td><td style="padding:7px 0 7px 4px;font-size:14px;color:#3f5560;">A project manager reviews your requirements.</td></tr>
                <tr><td style="padding:7px 0;font-size:14px;color:#2f5b66;vertical-align:top;">02</td><td style="padding:7px 12px;font-size:14px;color:#0d2b34;font-weight:600;vertical-align:top;white-space:nowrap;">We scope</td><td style="padding:7px 0 7px 4px;font-size:14px;color:#3f5560;">We align the right execution &amp; delivery approach.</td></tr>
                <tr><td style="padding:7px 0;font-size:14px;color:#2f5b66;vertical-align:top;">03</td><td style="padding:7px 12px;font-size:14px;color:#0d2b34;font-weight:600;vertical-align:top;white-space:nowrap;">We contact you</td><td style="padding:7px 0 7px 4px;font-size:14px;color:#3f5560;">We reach out with a tailored solution &amp; estimate.</td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td align="center" style="padding:0 40px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="border-radius:10px;background:#0fb5b9;">
              <a href="mailto:contracting@geodrillksa.com" style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#0d2b34;text-decoration:none;">Contact Our Team Directly</a>
            </td>
          </tr></table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0d2b34;padding:24px 40px;text-align:center;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(255,255,255,0.65);line-height:1.8;">
            GEODRILL KSA — Construction Experts<br/>contracting@geodrillksa.com<br/>Riyadh, Saudi Arabia
          </div>
          <div style="height:1px;width:48px;margin:14px auto 0;background:rgba(15,181,185,0.6);"></div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function internalEmailHtml(
  data: ContactFormInput,
  attachmentName?: string,
): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:12px 20px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#2f5b66;border-top:1px solid #d5e6e8;border-right:1px solid #d5e6e8;width:38%;white-space:nowrap;">${label}</td>
      <td style="padding:12px 20px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#0d2b34;border-top:1px solid #d5e6e8;">${escapeHtml(value)}</td>
    </tr>`;

  return `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#eef4f4;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#eef4f4;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #d5e2e3;box-shadow:0 8px 30px rgba(13,43,52,0.10);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0d2b34 0%,#114550 100%);padding:28px 40px;text-align:center;">
          <div style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#0fb5b9;font-family:Arial,Helvetica,sans-serif;font-weight:700;">☰ GEODRILL KSA</div>
          <div style="margin-top:6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.55);font-family:Arial,Helvetica,sans-serif;">Construction Division</div>
          <h1 style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:20px;color:#ffffff;font-weight:800;">New Contact Inquiry</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:28px 40px 20px;">
          <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#0d2b34;">A new contact inquiry has been submitted through the website. Details below:</p>
        </td></tr>

        <!-- Details table -->
        <tr><td style="padding:0 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d5e6e8;border-radius:12px;overflow:hidden;">
            ${row("Full Name", data.fullName + "")}
            ${row("Company", data.companyName + "")}
            ${row("Email", data.email + "")}
            ${row("Phone", data.phone + "")}
            ${row("Project Description", data.projectDescription + "")}
            ${attachmentName ? row("Attachment", attachmentName) : ""}
          </table>
        </td></tr>

        <!-- Note -->
        <tr><td style="padding:20px 24px 32px;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#2f5b66;font-style:italic;">Reply to this email to respond to the client.</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0d2b34;padding:20px 40px;text-align:center;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:rgba(255,255,255,0.55);line-height:1.7;">Sent from the GEODRILL website contact form.</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  // Allowed file types + size (must mirror the client-side rules).
  const ACCEPTED_MIME = new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]);
  const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

  let payload: ContactFormInput;
  let attachmentFile: File | null = null;
  try {
    const form = await request.formData();

    payload = {
      fullName: String(form.get("fullName") ?? ""),
      entityType: (form.get("entityType") as ContactFormInput["entityType"]) ?? "individual",
      companyName: String(form.get("companyName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      projectDescription: String(form.get("projectDescription") ?? ""),
    };

    const maybeFile = form.get("attachment");
    attachmentFile = maybeFile instanceof File ? maybeFile : null;

    if (!isContactFormInput(payload)) {
      return NextResponse.json(
        { ok: false, message: "Invalid form data." },
        { status: 400 },
      );
    }
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

  // Validate + read the optional attachment (photo / PDF / Word).
  let attachment: ContactFormInput["attachment"] = null;
  if (attachmentFile) {
    if (!ACCEPTED_MIME.has(attachmentFile.type)) {
      return NextResponse.json(
        { ok: false, message: "Unsupported file type. Please upload a photo, PDF, or Word document." },
        { status: 400 },
      );
    }
    if (attachmentFile.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { ok: false, message: "File is too large. Maximum size is 10 MB." },
        { status: 400 },
      );
    }
    const buffer = Buffer.from(await attachmentFile.arrayBuffer());
    attachment = {
      name: attachmentFile.name,
      type: attachmentFile.type,
      size: attachmentFile.size,
      data: buffer.toString("base64"),
    };
  }
  payload.attachment = attachment;

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
  const toEmail = process.env.GEODRILL_TO_EMAIL || "";
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
        html: internalEmailHtml(payload, payload.attachment?.name),
        ...(payload.attachment
          ? {
              attachments: [
                {
                  filename: payload.attachment.name,
                  content: payload.attachment.data, // base64-encoded content
                  contentType: payload.attachment.type,
                },
              ],
            }
          : {}),
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
          site: "construction",
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