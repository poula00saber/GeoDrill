import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { LinkIcon } from "@sanity/icons/Link";
import { schemaTypes } from "@/lib/sanity-schema";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// The QR redirect must exist as a single, easy-to-find record. Per Sanity
// conventions, singletons are enforced via Studio structure (not a schema
// option): we pin the document to the fixed ID `geoDrillQrRedirect` and show it
// at the top of the content list so there is only ever one active destination.
const QR_REDIRECT_TYPE = "geoDrillQrRedirect";

function createSingleton(S: StructureBuilder, typeName: string, title: string) {
  return S.listItem()
    .title(title)
    .icon(LinkIcon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName) // Fixed ID = singleton
        .title(title),
    );
}

// First studio — the GEODRILL content (blog) studio. A second studio can be
// added later by exporting an extra config with its own `name`, `title`,
// `projectId`/`dataset`, `basePath` and schema.
export default defineConfig({
  name: "default",
  title: "GEODRILL — Content Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            createSingleton(S, QR_REDIRECT_TYPE, "QR Redirect (Documents)"),
            S.divider(),
            // All remaining document types (blog posts, projects, etc.),
            // with the singleton excluded so it cannot be duplicated.
            ...S.documentTypeListItems().filter(
              (listItem) => listItem.getId() !== QR_REDIRECT_TYPE,
            ),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
