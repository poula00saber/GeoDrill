import { defineArrayMember, defineField, defineType } from "sanity";
import { LinkIcon } from "@sanity/icons/Link";

/**
 * Content model for the GEODRILL blog. The field names here must match
 * exactly what the frontend reads in `lib/blog.ts` and renders in
 * `components/blog-pages.tsx` (title/titleAr, slug, excerpt/excerptAr,
 * author/authorAr, publishedAt, coverImage, body/bodyAr).
 *
 * The site is fully bilingual, so each content field has an English (en)
 * and an Arabic (ar) variant.
 */
export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (EN)",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "titleAr",
      title: "Title (AR)",
      type: "string",
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (EN)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "excerptAr",
      title: "Excerpt (AR)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "author",
      title: "Author (EN)",
      type: "string",
    }),
    defineField({
      name: "authorAr",
      title: "Author (AR)",
      type: "string",
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip", "palette"],
      },
    }),
    defineField({
      name: "body",
      title: "Body (EN)",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "bodyAr",
      title: "Body (AR)",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "coverImage",
    },
  },

  orderings: [
    {
      title: "Publish date, new",
      name: "publishDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

/**
 * The project/case-study document type already deployed to the dataset.
 * Kept here for completeness so the Studio can also manage projects.
 */
export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sector",
      title: "Sector",
      type: "string",
      options: {
        list: [
          "industrial",
          "commercial",
          "education",
          "healthcare",
          "residential",
          "hospitality",
          "government",
        ],
      },
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
});

/**
 * Singleton that stores the permanent destination (currently a Microsoft
 * OneDrive share URL`` used by the GeoDrill printed QR code.
 *
 * The printed QR code encodes ONLY the permanent site URL (e.g.
 * `https://geodrillksa.com/documents`). When Microsoft changes the actual
 * OneDrive share link, the owner edits ONLY this record's `destinationUrl`
 * in Sanity — the already-printed QR keeps working with no reprint needed.
 *
 * The single active record is enforced as a singleton in Sanity Studio via
 * the custom structure (see `sanity.config.ts`), using the fixed document ID
 * `geoDrillQrRedirect`.
 */
export const geoDrillQrRedirect = defineType({
  name: "geoDrillQrRedirect",
  title: "QR Redirect (Documents)",
  type: "document",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "destinationUrl",
      title: "Documents destination URL",
      description:
        "Permanent destination used by the GeoDrill printed QR code. Change this URL when the OneDrive folder/share link changes. The printed QR code does not need to be replaced.",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["http", "https"],
          allowRelative: false,
        }),
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "updatedAt",
      title: "Last updated",
      type: "datetime",
      options: { dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" },
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "destinationUrl",
    },
  },
});

export const schemaTypes = [post, project, geoDrillQrRedirect];