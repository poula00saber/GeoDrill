"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

/**
 * Client-side boundary that mounts the (first) Sanity Studio.
 *
 * `history="hash"` keeps all intra-studio navigation inside the URL hash
 * (`#/...`) so deep links work without needing a server-side catch-all
 * segment under the dynamic `/contracting/[lang]/studio` path.
 */
export default function StudioClient() {
  return <NextStudio config={config} history="hash" />;
}