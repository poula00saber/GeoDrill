import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

type SanityImageSource = Parameters<
  ReturnType<typeof createImageUrlBuilder>["image"]
>[0];

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_READ_TOKEN;

export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2026-01-01",
      useCdn: !token, // Disable CDN when using a token for fresher data
      token, // Add token for authenticated requests
    })
  : null;

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function sanityImage(source: unknown) {
  return builder?.image(source as SanityImageSource);
}
