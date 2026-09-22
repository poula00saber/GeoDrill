import type { Metadata, Viewport } from "next";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import StudioClient from "@/components/studio/studio-client";

/**
 * Sanity Studio mounted at /studio.
 *
 * This is the same GEODRILL content Studio that is also available under
 * /contracting/[lang]/studio — both render the identical <StudioClient /> so an
 * editor can reach the Studio from either URL.
 *
 * Static server component for SSR; the actual Studio is mounted in the client
 * component <StudioClient /> and navigates via URL hashes (history="hash"), so
 * no [[...tool]] catch-all segment is required.
 */
export const metadata: Metadata = {
  ...studioMetadata,
  title: "GEODRILL — Content Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  ...studioViewport,
};

export default function StudioPage() {
  return <StudioClient />;
}