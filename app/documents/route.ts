import { NextResponse } from "next/server";
import {
  getQrRedirect,
  isValidDestinationUrl,
} from "@/lib/qr-redirect";

// ---------------------------------------------------------------------------
// Permanent QR redirect: https://geodrillksa.com/documents
//
// The printed GeoDrill QR code encodes ONLY this permanent URL. When a visitor
// scans it, this server-side Route Handler looks up the CURRENT OneDrive
// destination from Sanity and issues an HTTP redirect to it. If Microsoft
// ever changes the share link again, the owner edits ONE field (destinationUrl)
// in Sanity Studio and the already-printed QR instantly works — no reprint.
// ---------------------------------------------------------------------------

// Never statically cache this redirect. The destination can change at any time
// and the new value must take effect quickly after the owner edits Sanity.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  // Fail hard if the public route is given the ability to redirect anywhere.
  // We intentionally do not read query parameters here: the destination must
  // always come from the trusted Sanity record, never from the request.

  const record = await getQrRedirect();

  if (!record) {
    // Sanity unavailable or the record lookup failed. Do NOT redirect to a
    // fallback URL — surface a generic 503 and log (see getQrRedirect).
    console.error("[documents] Sanity unavailable or lookup failed.");
    return NextResponse.json(
      { error: "Service temporarily unavailable. Please try again shortly." },
      { status: 503 },
    );
  }

  if (!record.active) {
    console.warn("[documents] QR redirect is disabled (active=false).");
    return NextResponse.json(
      { error: "This link is currently disabled." },
      { status: 404 },
    );
  }

  if (!isValidDestinationUrl(record.destinationUrl)) {
    console.error(
      "[documents] Invalid or missing destinationUrl in Sanity record.",
    );
    return NextResponse.json(
      { error: "This link is not configured correctly. Please try again later." },
      { status: 503 },
    );
  }

  // 307 preserves the semantics of a per-request redirect (SAFE method GET),
  // and — combined with `force-dynamic` — guarantees scans always hit the
  // latest destination. Location is populated from the trusted Sanity record.
  return NextResponse.redirect(record.destinationUrl, 307);
}