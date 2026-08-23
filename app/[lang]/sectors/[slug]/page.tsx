import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Award, Target, Sparkles } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import { SectorGallery } from "@/components/pages/sector-gallery";
import { SectorNav } from "@/components/pages/sector-nav";
import { SECTORS, getSectorByKey } from "@/lib/sector-data";

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

// Pre-render every sector for both locales.
export function generateStaticParams() {
  return ["en", "ar"].flatMap((lang) =>
    SECTORS.map((s) => ({ lang, slug: s.key })),
  );
}

// Unknown slugs 404 instead of building on-demand.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const sector = getSectorByKey(slug);
  const locale = lang === "ar" ? "ar" : "en";
  return {
    title: sector ? `${sector.name[locale]} | GEODRILL` : "GEODRILL",
    description: sector?.short[locale],
  };
}

export default async function SectorPage({ params }: Props) {
  const { lang, slug } = await params;
  const locale = lang === "ar" ? "ar" : "en";
  const sector = getSectorByKey(slug);
  if (!sector) notFound();

  const galleryTitle = locale === "ar" ? "صور الأعمال" : "Selected works";
  const introLabel =
    locale === "ar"
      ? "ما الذي ننفذه في هذا القطاع؟"
      : "Capabilities we deliver in this sector";

  const statItems = [
    {
      value: "ISO",
      label: locale === "ar" ? "شهادات معتمدة" : "Certified",
      icon: Award,
    },
    {
      value: "2030",
      label: locale === "ar" ? "رؤية 2030" : "Vision 2030",
      icon: Target,
    },
  ];

  return (
    <main className="min-h-svh bg-background text-foreground transition-colors duration-300">
      <Navbar />

      <PageHero
        image={sector.image}
        kicker={`${locale === "ar" ? "القطاع" : "Sector"} · ${sector.name[locale]}`}
        title={sector.name[locale]}
        sub={sector.short[locale]}
        crumb={sector.name[locale]}
      />

      {/* ── Teal Accent Intro Band ── */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-teal/10 via-background to-background py-10 md:py-14">
        {/* Ambient Radial Teal Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 end-1/4 size-96 rounded-full bg-teal/15 blur-3xl dark:bg-teal/10"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs font-semibold text-teal dark:text-teal">
              <Sparkles className="size-3.5" />
              <span>
                {locale === "ar" ? "قدرات القطاع" : "Sector Capabilities"}
              </span>
            </div>
            <h2 className="text-xl font-bold leading-snug tracking-tight text-foreground md:text-2xl lg:text-3xl">
              {introLabel}
            </h2>
          </div>

          {/* Glassmorphic Stat Cards (Using theme CSS variables) */}
          <div className="grid flex-shrink-0 grid-cols-2 gap-3 sm:gap-4 lg:w-[480px]">
            {statItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-teal/20 bg-card/60 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-teal/50 hover:bg-card hover:shadow-lg hover:shadow-teal/10 dark:bg-card/40 dark:hover:bg-card/80"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="size-4 text-teal transition-transform duration-300 group-hover:scale-110" />
                    <span className="size-1.5 rounded-full bg-teal opacity-60 group-hover:opacity-100" />
                  </div>
                  <div className="mt-4">
                    <span className="block text-2xl font-black text-teal sm:text-3xl">
                      {item.value}
                    </span>
                    <span className="mt-0.5 block text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground sm:text-sm">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modern bento gallery of this sector's works */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectorGallery items={sector.gallery} title={galleryTitle} />
        </div>
      </section>

      {/* Related sectors */}
      <SectorNav current={sector.key} currentName={sector.name[locale]} />

      <Footer />
    </main>
  );
}
