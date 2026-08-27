import type { Metadata } from "next";
import { BlogPostPage, blogMetadata } from "@/components/blog-pages";
import { getBlogPost } from "@/lib/blog";
import type { Lang } from "@/lib/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale: Lang = lang === "ar" ? "ar" : "en";
  return blogMetadata(locale, await getBlogPost(slug));
}

export default async function ContractingBlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale: Lang = lang === "ar" ? "ar" : "en";
  return <BlogPostPage locale={locale} slug={slug} />;
}
