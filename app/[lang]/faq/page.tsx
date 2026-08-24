import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/sections/faq";
import { content, type Lang } from "@/lib/content";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const locale: Lang = resolvedParams.lang === "ar" ? "ar" : "en";

  return {
    title: `${content[locale].faq.title} | GEODRILL`,
    description: content[locale].faq.sub,
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const locale: Lang = resolvedParams.lang === "ar" ? "ar" : "en";
  const isArabic = locale === "ar";

  return (
    <>
      <Navbar />
      <main
        className="min-h-svh bg-background pt-20"
        dir={isArabic ? "rtl" : "ltr"}
      >
        <Faq locale={locale} />
        <Footer />
      </main>
    </>
  );
}
