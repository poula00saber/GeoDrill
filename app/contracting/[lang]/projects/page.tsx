import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { JsonLd } from "@/components/json-ld";
import { Projects } from "@/components/sections/projects";
import { isLocale, locales } from "@/geotech/lib/i18n";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return buildPageMetadata({
    title:
      lang === "ar"
        ? "مشاريع المقاولات العامة | GEODRILL KSA"
        : "General Contracting Projects | GEODRILL KSA",
    description:
      lang === "ar"
        ? "استعرض صور أعمال GEODRILL KSA في أعمال التربة والهياكل المعدنية والكهروميكانيكا والتشطيبات والعزل والمنشآت الصناعية."
        : "Explore GEODRILL KSA portfolio imagery across groundworks, steel structures, MEP, finishing, insulation, and industrial construction.",
    path: `/contracting/${lang}/projects`,
    image: "/images/project-groundworks-01.jpg",
    locale: lang,
  });
}

export default async function ContractingProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const isArabic = lang === "ar";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: isArabic ? "الرئيسية" : "Home",
              item: absoluteUrl(`/contracting/${lang}`),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: isArabic ? "المشاريع" : "Projects",
              item: absoluteUrl(`/contracting/${lang}/projects`),
            },
          ],
        }}
      />
      <Navbar />
      <main className="min-h-svh pt-20" dir={isArabic ? "rtl" : "ltr"}>
        <header className="mx-auto max-w-7xl px-6 pb-2 pt-12">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {isArabic ? "مشاريع المقاولات" : "Contracting Projects"}
          </h1>
        </header>
        <Projects includeGalleryCatalog />
      </main>
      <Footer />
    </>
  );
}
