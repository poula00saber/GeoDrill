import type { Metadata } from "next";
import { BlogIndexPage, blogMetadata } from "@/components/blog-pages";
import type { Lang } from "@/lib/content";
import { isLocale } from "@/geotech/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return ["en", "ar"].map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Lang = lang;
  return blogMetadata(locale);
}

export default async function ContractingBlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Lang = lang;
  return <BlogIndexPage locale={locale} />;
}
