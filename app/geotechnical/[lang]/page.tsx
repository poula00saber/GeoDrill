import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GeotechHome } from "@/app/geotechnical/page";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/seo";
import { isLocale, locales } from "@/geotech/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang;

  const title =
    locale === "ar"
      ? "GEODRILL KSA | الخبرة الجيوتقنية والجيوفيزيائية"
      : "GEODRILL KSA | Geotechnical & Geoscience Experts";
  const description =
    locale === "ar"
      ? "تقدم GEODRILL KSA خدمات الجيوتقنية، المسح الجيوفيزيائي، والتحليل الهندسي في السعودية."
      : "GEODRILL KSA delivers geotechnical, geophysical and engineering investigation services across Saudi Arabia.";

  return {
    metadataBase: new URL("https://www.geodrillksa.com"),
    title,
    description,
    alternates: {
      canonical: `https://www.geodrillksa.com/geotechnical/${locale}`,
      languages: {
        en: "https://www.geodrillksa.com/geotechnical/en",
        ar: "https://www.geodrillksa.com/geotechnical/ar",
        "x-default": "https://www.geodrillksa.com/geotechnical/en",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.geodrillksa.com/geotechnical/${locale}`,
      siteName: "GEODRILL KSA",
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [
        {
          url: "/images/geotech-hero1.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/geotech-hero1.jpg"],
    },
  };
}

export default async function GeotechnicalLocalePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const arabic = lang === "ar";
  const pageUrl = absoluteUrl(`/geotechnical/${lang}`);
  const title = arabic
    ? "الخبرة الجيوتقنية والجيوفيزيائية"
    : "Geotechnical and Geoscience Experts";
  const description = arabic
    ? "تقدم GEODRILL KSA خدمات الجيوتقنية والجيوفيزياء والتحقيقات الهندسية في جميع أنحاء المملكة العربية السعودية."
    : "GEODRILL KSA delivers geotechnical, geophysical, and engineering investigation services across Saudi Arabia.";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.geodrillksa.com/#geotechnical-organization",
          name: "GEODRILL KSA Geotechnical Division",
          url: pageUrl,
          parentOrganization: {
            "@id": "https://www.geodrillksa.com/#organization",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${pageUrl}#webpage`,
          url: pageUrl,
          name: title,
          description,
          inLanguage: lang,
          isPartOf: { "@id": "https://www.geodrillksa.com/#website" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: arabic ? "الرئيسية" : "Home",
              item: absoluteUrl("/"),
            },
            { "@type": "ListItem", position: 2, name: title, item: pageUrl },
          ],
        }}
      />
      <GeotechHome />
    </>
  );
}
