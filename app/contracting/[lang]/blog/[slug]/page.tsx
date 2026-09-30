import type { Metadata } from "next";
import { BlogPostPage, blogMetadata } from "@/components/blog-pages";
import { getBlogPost } from "@/lib/blog";
import type { Lang } from "@/lib/content";
import { isLocale } from "@/geotech/lib/i18n";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Lang = lang;
  return blogMetadata(locale, await getBlogPost(slug));
}

export default async function ContractingBlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Lang = lang;
  return <BlogPostPage locale={locale} slug={slug} />;
}
