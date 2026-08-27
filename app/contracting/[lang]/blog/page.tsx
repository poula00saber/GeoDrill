import type { Metadata } from "next";
import { BlogIndexPage, blogMetadata } from "@/components/blog-pages";
import { content, type Lang } from "@/lib/content";

export function generateStaticParams() {
  return ["en", "ar"].map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale: Lang = (await params).lang === "ar" ? "ar" : "en";
  return blogMetadata(locale);
}

export default async function ContractingBlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale: Lang = (await params).lang === "ar" ? "ar" : "en";
  return <BlogIndexPage locale={locale} />;
}
