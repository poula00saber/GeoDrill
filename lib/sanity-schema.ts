import { defineArrayMember, defineField, defineType } from "sanity";

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

export const schemaTypes = [post, project];