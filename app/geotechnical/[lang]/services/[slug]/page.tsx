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
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const localizedService = getLocalizedService(service, lang);

  return {
    title: `${localizedService.title} | GEODRILL KSA`,
    description: localizedService.shortDescription,
    openGraph: {
      title: localizedService.title,
      description: localizedService.shortDescription,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, lang } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const localizedService = getLocalizedService(service, lang);

  // Canonical services list for the bottom pager (same order as /services).
  const allServices = (Object.keys(serviceCategories) as ServiceCategory[])
    .flatMap((cat) =>
      serviceCategories[cat].map((s) => servicesData[s]),
    )
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => getLocalizedService(s, lang));

  return (
    <>
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
