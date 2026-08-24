import { sanityClient } from "@/lib/sanity";

export type BlogPost = {
  _id: string;
  title: string;
  titleAr?: string | null;
  slug?: { current?: string | null } | null;
  excerpt?: string | null;
  excerptAr?: string | null;
  publishedAt?: string | null;
  author?: string | null;
  authorAr?: string | null;
  coverImage?: unknown;
  body?: unknown[] | null;
  bodyAr?: unknown[] | null;
};

export const POSTS_QUERY = `*[_type == "post"] | order(coalesce(publishedAt, _createdAt) desc) {
  _id, title, titleAr, slug, excerpt, excerptAr, publishedAt, author, authorAr,
  coverImage, body, bodyAr
}`;

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, titleAr, slug, excerpt, excerptAr, publishedAt, author, authorAr,
  coverImage, body, bodyAr
}`;

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!sanityClient) return [];
  try {
    const posts = await sanityClient.fetch<BlogPost[]>(POSTS_QUERY);
    return (posts ?? []).filter((post) => post.slug?.current);
  } catch {
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<BlogPost | null>(POST_QUERY, { slug });
  } catch {
    return null;
  }
}
