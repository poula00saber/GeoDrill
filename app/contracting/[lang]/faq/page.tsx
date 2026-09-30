import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Faq } from "@/components/sections/faq";
import { content, type Lang } from "@/lib/content";
import { isLocale } from "@/geotech/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
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
  return buildPageMetadata({
    title: `${content[locale].faq.title} | GEODRILL`,
    description: content[locale].faq.sub,
    path: `/contracting/${locale}/faq`,
    image: "/logo.png",
    locale,
  });
}

export default async function ContractingFaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale: Lang = lang;
  return (
    <>
      <Navbar />
      <main
        className="min-h-svh bg-background pt-20"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <Faq locale={locale} />
        <Footer />
      </main>
    </>
  );
}
