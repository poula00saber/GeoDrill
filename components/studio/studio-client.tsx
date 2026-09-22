"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/**
 * Client-side boundary that mounts the (single) GEODRILL Sanity Studio.
 *
 * This shared component lets the exact same Studio be mounted under multiple
 * URLs:
 *   - /contracting/[lang]/studio  (lang = "en" | "ar")
 *   - /studio
 *
 * `history="hash"` keeps all intra-studio navigation inside the URL hash
 * (`#/...`) so deep links work without needing a server-side catch-all
 * segment under either dynamic or static path.
 */
export default function StudioClient() {
  return <NextStudio config={config} history="hash" />;
}