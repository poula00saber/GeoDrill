import { Metadata } from "next";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { ServicePageTemplate } from "@/geotech/components/service-page-template";
import {
  getServiceBySlug,
  getAllServiceSlugs,
  servicesData,
  serviceCategories,
  type ServiceCategory,
} from "@/geotech/lib/services-data";
import { getLocalizedService } from "@/geotech/lib/services-page-i18n";
import { notFound } from "next/navigation";
import { isLocale } from "@/geotech/lib/i18n";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

interface ServicePageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  const langs = ["en", "ar"];

  return langs.flatMap((lang) =>
    slugs.map((slug) => ({
      lang,
      slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const localizedService = getLocalizedService(service, lang);

  return buildPageMetadata({
    title: `${localizedService.title} | GEODRILL KSA`,
    description: localizedService.shortDescription,
    path: `/geotechnical/${lang}/services/${slug}`,
    image: service.heroImage,
    locale: lang,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, lang } = await params;
  if (!isLocale(lang)) notFound();
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const localizedService = getLocalizedService(service, lang);
  const isArabic = lang === "ar";
  const pageUrl = absoluteUrl(`/geotechnical/${lang}/services/${slug}`);

  // Canonical services list for the bottom pager (same order as /services).
  const allServices = (Object.keys(serviceCategories) as ServiceCategory[])
    .flatMap((cat) => serviceCategories[cat].map((s) => servicesData[s]))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => getLocalizedService(s, lang));

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
              item: absoluteUrl(`/geotechnical/${lang}`),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: isArabic ? "الخدمات" : "Services",
              item: absoluteUrl(`/geotechnical/${lang}/services`),
            },
            { "@type": "ListItem", position: 3, name: localizedService.title },
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ImageObject",
          contentUrl: absoluteUrl(service.heroImage),
          name: localizedService.title,
          description: localizedService.shortDescription,
          representativeOfPage: true,
          url: pageUrl,
        }}
      />
      <Navigation />
      <main className="min-h-screen w-full">
        <ServicePageTemplate
          service={localizedService}
          locale={lang}
          allServices={allServices}
        />
      </main>
      <Footer />
    </>
  );
}
