import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Faq } from "@/components/sections/faq";
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
  return {
    title: `${content[locale].faq.title} | GEODRILL`,
    description: content[locale].faq.sub,
  };
}

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-svh bg-background pt-20" dir="inherit">
        <Faq />
        <Footer />
      </main>
    </>
  );
}
