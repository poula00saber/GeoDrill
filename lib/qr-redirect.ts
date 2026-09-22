import { sanityClient } from "@/lib/sanity";

// The document ID is fixed by the Sanity Studio singleton structure (see
// `sanity.config.ts`) so there is exactly one active GeoDrill QR redirect.
export const QR_REDIRECT_ID = "geoDrillQrRedirect";

export type QrRedirectRecord = {
  _id: string;
  title?: string | null;
  slug?: { current?: string | null } | null;
  destinationUrl?: string | null;
  active?: boolean | null;
  updatedAt?: string | null;
};

export const QR_REDIRECT_QUERY = `*[_id == $id][0] {
  _id, title, slug, destinationUrl, active, updatedAt
}`;

/**
 * Validate a redirect destination URL.
 *
 * Only http/https URLs are accepted. Anything else (javascript:, data:, file:,
 * malformed input, relative paths, etc.) is rejected so the public /documents
 * route can never be tricked into redirecting to a non-web/non-http location.
 * OneDrive share links use http(s), so this is intentionally loose about the
 * host/path while still being strict about the scheme.
 */
export function isValidDestinationUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return false; // malformed URL
  }

  // Must be an absolute http/https URL. `new URL` only parses these protocols
  // for absolute URLs; javascript:/data:/file: are not accepted here.
  const protocol = parsed.protocol.toLowerCase();
  if (protocol !== "http:" && protocol !== "https:") return false;

  if (!parsed.hostname) return false;

  return true;
}

/**
 * Fetch the active GeoDrill QR redirect record from Sanity.
 * Returns null if the client is unavailable or the lookup fails.
 */
export async function getQrRedirect(): Promise<QrRedirectRecord | null> {
  if (!sanityClient) return null;
  try {
    const record = await sanityClient.fetch<QrRedirectRecord | null>(
      QR_REDIRECT_QUERY,
      { id: QR_REDIRECT_ID },
    );
    return record ?? null;
  } catch (err) {
    console.error("[qr-redirect] failed to fetch redirect from Sanity:", err);
    return null;
  }
}