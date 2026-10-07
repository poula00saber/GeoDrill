import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContractingSite } from "@/components/contracting-site";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/seo";
import { isLocale, locales } from "@/geotech/lib/i18n";

/**
 * Branded route for the General Contracting Division site.
 * Serves the same bilingual content as the legacy `/[lang]` route.
 *   /contracting/en  and  /contracting/ar
 */
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
  const locale = lang;

  const title =
    locale === "ar"
      ? "شركة المقاولات العامة في الرياض | GEODRILL"
      : "General Contractor in Riyadh | GEODRILL";
  const description =
    locale === "ar"
      ? "تقدم GEODRILL خدمات المقاولات العامة، الأعمال الخرسانية، والأعمال المعدنية والمباني في السعودية."
      : "GEODRILL delivers general contracting, groundworks, concrete works, steel structures, MEP, and finishing solutions across Saudi Arabia.";

  return {
    metadataBase: new URL("https://www.geodrillksa.com"),
    title,
    description,
    alternates: {
      canonical: `https://www.geodrillksa.com/contracting/${locale}`,
      languages: {
        en: "https://www.geodrillksa.com/contracting/en",
        ar: "https://www.geodrillksa.com/contracting/ar",
        "x-default": "https://www.geodrillksa.com/contracting/en",
      },
    },
    openGraph: {
      title,
      description,
      url: `https://www.geodrillksa.com/contracting/${locale}`,
      siteName: "GEODRILL KSA",
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [
        {
          url: "/images/service-groundworks.png",
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/service-groundworks.png"],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang;

  const pageUrl = absoluteUrl(`/contracting/${locale}`);
  const arabic = locale === "ar";
  const title = arabic
    ? "شركة المقاولات العامة في الرياض | GEODRILL"
    : "General Contractor in Riyadh | GEODRILL";
  const description = arabic
    ? "تقدم GEODRILL خدمات المقاولات العامة، الأعمال الخرسانية، والأعمال المعدنية والمباني في السعودية."
    : "GEODRILL delivers general contracting, groundworks, concrete works, steel structures, MEP, and finishing solutions across Saudi Arabia.";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://www.geodrillksa.com/#organization",
          name: "GEODRILL KSA",
          url: "https://www.geodrillksa.com/",
          description:
            "Geotechnical, geoscience, engineering investigation, general contracting and construction services in Saudi Arabia.",
          department: {
            "@type": "Organization",
            name: arabic
              ? "قسم المقاولات العامة في GEODRILL"
              : "GEODRILL General Contracting Division",
            url: pageUrl,
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
          inLanguage: locale,
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
      <ContractingSite locale={locale} />
    </>
  );
}
