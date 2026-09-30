import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ClientsGallery } from "@/components/pages/clients-gallery";
import { CLIENT_LOGOS } from "@/lib/clients-data";
import { buildPageMetadata } from "@/lib/seo";
import { isLocale } from "@/geotech/lib/i18n";
import { notFound } from "next/navigation";

// Pre-render the clients page for both locales.
export function generateStaticParams() {
  return ["en", "ar"].map((lang) => ({ lang }));
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
  return buildPageMetadata({
    title:
      locale === "ar" ? "عملاؤنا | GEODRILL KSA" : "Our Clients | GEODRILL KSA",
    description:
      locale === "ar"
        ? `تثق أكثر من ${CLIENT_LOGOS.length} جهة بخدمات GEODRILL في المملكة العربية السعودية.`
        : `${CLIENT_LOGOS.length}+ organizations trust GEODRILL across Saudi Arabia.`,
    path: `/contracting/${locale}/clients`,
    image: "/logo.png",
    locale,
  });
}

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang;

  return (
    <>
      <Navbar />
      <main key={locale} className="min-h-svh lang-enter bg-background">
        <div className="pb-24 pt-36 md:pt-40">
          <ClientsGallery />
        </div>
        <Footer />
      </main>
    </>
  );
}
