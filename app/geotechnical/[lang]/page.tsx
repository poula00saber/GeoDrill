import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GeotechHome } from "@/app/geotechnical/page";
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

  return <GeotechHome />;
}
