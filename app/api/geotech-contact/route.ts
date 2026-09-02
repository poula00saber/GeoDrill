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
  return `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f4efe6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4efe6;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e9dfcc;box-shadow:0 8px 30px rgba(25,18,7,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#191207 0%,#2b2010 100%);padding:32px 40px;text-align:center;">
          <div style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#c9a227;font-family:Arial,Helvetica,sans-serif;font-weight:700;">☰ GEODRILL KSA</div>
          <div style="margin-top:6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.55);font-family:Arial,Helvetica,sans-serif;">Geotechnical &amp; Geoscience</div>
          <div style="height:2px;width:56px;margin:18px auto 0;background:#c9a227;border-radius:2px;"></div>
        </td></tr>

        <!-- Hero -->
        <tr><td style="background:linear-gradient(180deg,#fbf7ef 0%,#ffffff 100%);padding:40px 40px 8px;text-align:center;">
          <div style="width:64px;height:64px;margin:0 auto 20px;border-radius:50%;background:rgba(201,162,39,0.14);font-size:30px;line-height:64px;text-align:center;">🤝</div>
          <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.3;color:#191207;font-weight:800;">Thank You — We've Got Your Project 💛</h1>
          <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#6b5d3a;font-weight:700;">Dear ${name},</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:24px 40px 8px;">
          <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7;color:#4a4233;">We've received your consultation request and our geotechnical &amp; geoscience team will be in touch within 24–48 hours.</p>
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.7;color:#4a4233;">If your enquiry is urgent, reply to this email or call the number below and one of our engineers will assist you directly.</p>
        </td></tr>

        <!-- Next steps -->
        <tr><td style="padding:16px 40px 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbf7ef;border:1px solid #ece2cd;border-radius:12px;">
            <tr><td style="padding:20px 24px;">
              <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#a58a2e;font-family:Arial,Helvetica,sans-serif;font-weight:700;margin-bottom:10px;">What happens next</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
                <tr><td style="padding:7px 0;font-size:14px;color:#6b5d3a;vertical-align:top;">01</td><td style="padding:7px 12px;font-size:14px;color:#191207;font-weight:600;vertical-align:top;white-space:nowrap;">We review</td><td style="padding:7px 0 7px 4px;font-size:14px;color:#4a4233;">An engineer reviews your project details.</td></tr>
                <tr><td style="padding:7px 0;font-size:14px;color:#6b5d3a;vertical-align:top;">02</td><td style="padding:7px 12px;font-size:14px;color:#191207;font-weight:600;vertical-align:top;white-space:nowrap;">We plan</td><td style="padding:7px 0 7px 4px;font-size:14px;color:#4a4233;">We align an investigation &amp; testing approach.</td></tr>
                <tr><td style="padding:7px 0;font-size:14px;color:#6b5d3a;vertical-align:top;">03</td><td style="padding:7px 12px;font-size:14px;color:#191207;font-weight:600;vertical-align:top;white-space:nowrap;">We contact you</td><td style="padding:7px 0 7px 4px;font-size:14px;color:#4a4233;">We reach out with a tailored proposal.</td></tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td align="center" style="padding:0 40px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="border-radius:10px;background:#c9a227;">
              <a href="mailto:geotechnical@geodrillksa.com" style="display:inline-block;padding:14px 32px;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;color:#191207;text-decoration:none;">Contact Our Team Directly</a>
            </td>
          </tr></table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#191207;padding:24px 40px;text-align:center;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:rgba(255,255,255,0.65);line-height:1.8;">
            GEODRILL KSA — Geotechnical &amp; Geoscience<br/>geotechnical@geodrillksa.com · +966 59 694 5051<br/>3107 Makkah Al-Mukarramah Road, Al-Rabwa, Riyadh, Saudi Arabia
          </div>
          <div style="height:1px;width:48px;margin:14px auto 0;background:rgba(201,162,39,0.6);"></div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function internalEmailHtml(
  data: GeotechContactInput,
  attachmentName?: string,
): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:12px 20px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#6b5d3a;border-top:1px solid #ece2cd;border-right:1px solid #ece2cd;width:38%;white-space:nowrap;">${label}</td>
      <td style="padding:12px 20px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#191207;border-top:1px solid #ece2cd;">${escapeHtml(value)}</td>
    </tr>`;

  return `<!doctype html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:#f4efe6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4efe6;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e9dfcc;box-shadow:0 8px 30px rgba(25,18,7,0.08);">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#191207 0%,#2b2010 100%);padding:28px 40px;text-align:center;">
          <div style="font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#c9a227;font-family:Arial,Helvetica,sans-serif;font-weight:700;">☰ GEODRILL KSA</div>
          <div style="margin-top:6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.55);font-family:Arial,Helvetica,sans-serif;">Geotechnical Division</div>
          <h1 style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:20px;color:#ffffff;font-weight:800;">New Consultation Request</h1>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:28px 40px 20px;">
          <p style="margin:0 0 18px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#191207;">A new geotechnical consultation request has been submitted through the website. Details below:</p>
        </td></tr>

        <!-- Details table -->
        <tr><td style="padding:0 24px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #ece2cd;border-radius:12px;overflow:hidden;">
            ${row("Full Name", data.fullName + "")}
            ${row("Company", data.company + "")}
            ${row("Email", data.email + "")}
            ${row("Phone", data.phone + "")}
            ${row("Project Type", data.projectType + "")}
            ${row("Required Service", data.requiredService + "")}
            ${row("Project Location", data.projectLocation + "")}
            ${row("Project Description", data.projectDescription + "")}
            ${attachmentName ? row("Attachment", attachmentName) : ""}
          </table>
        </td></tr>

        <!-- Note -->
        <tr><td style="padding:20px 24px 32px;">
          <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#6b7536;font-style:italic;">Reply to this email to respond to the client.</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#191207;padding:20px 40px;text-align:center;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;color:rgba(255,255,255,0.55);line-height:1.7;">Sent from the GEODRILL geotechnical website contact form.</div>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  // Allowed file types + size (mirror the client-side rules). Geotech accepts
  // PDFs, CAD files (DWG/DXF), images and Word documents.
  const ACCEPTED_MIME = new Set([
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/dwg",
    "image/vnd.dxf",
    "application/x-dwg",
    "application/x-autocad",
    "application/acad",
    "application/dxf",
  ]);
  // DWG/DXF are sometimes served with generic octet-stream MIME on upload;
  // accept any extension by checking the extension as well.
  const ACCEPTED_EXT = /\.(pdf|doc|docx|dwg|dxf|jpe?g|png|gif|webp)$/i;
  const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

  let payload: GeotechContactInput;
  let attachmentFile: File | null = null;
  try {
    const form = await request.formData();

    payload = {
      fullName: String(form.get("fullName") ?? "").trim(),
      company: form.get("company") ? String(form.get("company")).trim() : "",
      email: String(form.get("email") ?? "").trim(),
      phone: form.get("phone") ? String(form.get("phone")).trim() : "",
      projectType: form.get("projectType") ? String(form.get("projectType")).trim() : "",
      requiredService: form.get("requiredService") ? String(form.get("requiredService")).trim() : "",
      projectLocation: form.get("projectLocation") ? String(form.get("projectLocation")).trim() : "",
      projectDescription: String(form.get("projectDescription") ?? "").trim(),
    };

    const maybeFile = form.get("attachment");
    attachmentFile = maybeFile instanceof File ? maybeFile : null;
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

  // Validate + read the optional attachment (PDF / CAD / image / Word).
  let attachment: { name: string; type: string; size: number; data: string } | null = null;
  if (attachmentFile) {
    const typeOk =
      ACCEPTED_MIME.has(attachmentFile.type) || ACCEPTED_EXT.test(attachmentFile.name);
    if (!typeOk) {
      return NextResponse.json(
        { ok: false, message: "Unsupported file type. Please upload a PDF, DWG, DXF, image, or Word document." },
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
        html: internalEmailHtml(payload, attachment?.name),
        ...(attachment
          ? {
              attachments: [
                {
                  filename: attachment.name,
                  content: attachment.data, // base64-encoded content
                  contentType: attachment.type,
                },
              ],
            }
          : {}),
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