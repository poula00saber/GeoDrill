import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
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
  const locale: Lang = (await params).lang === "ar" ? "ar" : "en";
  return {
    title: `${content[locale].faq.title} | GEODRILL`,
    description: content[locale].faq.sub,
  };
}

export default async function ContractingFaqPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const locale: Lang = (await params).lang === "ar" ? "ar" : "en";
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
