import type { Metadata, Viewport } from "next";
import { metadata as studioMetadata, viewport as studioViewport } from "next-sanity/studio";
import StudioClient from "./studio-client";

/**
 * Sanity Studio mounted at /contracting/[lang]/studio (lang = "en" | "ar").
 * Both locales render the same (first) content Studio — the [lang] segment is
 * kept only so the URL shape matches the rest of the branded contracting site.
 *
 * The page is a static server component for SSR; the actual Studio is mounted
 * in the client component <StudioClient /> and navigates via URL hashes, so no
 * [[...tool]] catch-all segment is required.
 */
export function generateStaticParams() {
  return ["en", "ar"].map((lang) => ({ lang }));
}

export const dynamicParams = false;

export const metadata: Metadata = {
  ...studioMetadata,
  title: "GEODRILL — Content Studio",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  ...studioViewport,
};

export default function ContractingStudioPage() {
  return <StudioClient />;
}
