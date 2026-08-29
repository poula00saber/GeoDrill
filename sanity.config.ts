import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/lib/sanity-schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// First studio — the GEODRILL content (blog) studio. A second studio can be
// added later by exporting an extra config with its own `name`, `title`,
// `projectId`/`dataset`, `basePath` and schema.
export default defineConfig({
  name: "default",
  title: "GEODRILL — Content Studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
