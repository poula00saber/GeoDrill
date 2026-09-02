import { Metadata } from "next";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { ServicePageTemplate } from "@/geotech/components/service-page-template";
import {
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/geotech/lib/services-data";
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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | GEODRILL KSA`,
    description: service.shortDescription,
    openGraph: {
      title: service.title,
      description: service.shortDescription,
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

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full bg-background">
        <ServicePageTemplate service={service} locale={lang} />
      </main>
      <Footer />
    </>
  );
}
