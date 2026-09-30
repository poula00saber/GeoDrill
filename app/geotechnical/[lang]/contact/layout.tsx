import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/geotech/lib/i18n";
import { getGeotechPageMetadata } from "@/lib/geotech-page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return getGeotechPageMetadata(lang, "contact");
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
