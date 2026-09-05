// ============================================================================
// app/geotechnical/[lang]/services/page.tsx
//
// What changed vs. the previous version:
//   - Hero rebuilt to match the reference: real photo + scrim, eyebrow,
//     2-line heading (2nd line accent), no buttons in this hero variant.
//   - New floating ServicesTrustStrip overlapping the hero's bottom edge.
//   - The categorized services grid (4 categories, cards per category) is
//     UNCHANGED — same servicesData/serviceCategories loop, same card
//     markup, same image mapping, exactly as you had it.
//   - New ServicesApproach (4-step) — see the flag comment in that file
//     about the step-count conflict with the homepage's approach.tsx.
//   - Reused CtaBanner (already built) instead of the old plain CTA box.
//   - Stat bar uses only verified figures — see note inline.
// ============================================================================

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Building2 } from "lucide-react";
import { use } from "react";
import Image from "next/image";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { SectionHeading } from "@/geotech/components/section-heading";
import { Button } from "@/geotech/components/ui/button";
import { ServicesTrustStrip } from "@/geotech/components/sections/services-trust-strip";
import { ServicesApproach } from "@/geotech/components/sections/services-approach";
import { GoldGradientBand } from "@/geotech/components/sections/gold-gradient-band";
import { CtaBanner } from "@/geotech/components/sections/cta-banner";
import {
  servicesData,
  serviceCategories,
  ServiceCategory,
} from "@/geotech/lib/services-data";
import {
  servicesPageCopy,
  serviceCategoryLabels,
  serviceCategoryDescriptions,
  servicesPageItems,
  pickLocalized,
} from "@/geotech/lib/services-page-i18n";

// Service hero images — all 14 services share the hero photos under
// public/images/geotech/services/services-heros/.
const HERO = "/images/geotech/services/services-heros";
const serviceImages: Record<string, string> = {
  "geotechnical-investigation": `${HERO}/geotechnical-investigation-hero.jpg`,
  "geophysical-survey": `${HERO}/geophysical-survey-hero.jpg`,
  "geological-survey-rock-slope-stability": `${HERO}/geological-survey-rock-slope-stability-hero.jpg`,
  "hydrogeological-studies": `${HERO}/hydrogeological-studies-hero.jpg`,
  "material-testing-quality-control": `${HERO}/material-testing-quality-control-hero.jpg`,
  "topographical-survey": `${HERO}/topographical-survey-hero.jpg`,
  "cavity-probing-grouting-micro-piling": `${HERO}/cavity-probing-grouting-micro-piling-hero.jpg`,
  "anchoring-shoring-design-execution": `${HERO}/anchoring-shoring-design-execution-hero.jpg`,
  "dewatering-design-execution": `${HERO}/dewatering-design-execution-hero.jpg`,
  "soil-improvement-concrete-repair": `${HERO}/soil-improvement-concrete-repair-hero.jpg`,
  "structural-assessment": `${HERO}/structural-assessment-hero.jpg`,
  "hydrology-studies": `${HERO}/hydrology-studies-hero.jpg`,
  "environmental-survey": `${HERO}/environmental-survey-hero.jpg`,
  "mining-exploration": `${HERO}/mining-exploration-hero.jpg`,
};

const categories: ServiceCategory[] = [
  "Ground",
  "Testing",
  "Engineering",
  "Studies",
];

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ServicesPage({ params }: PageProps) {
  const { lang } = use(params);
  const isAr = lang === "ar";

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full">
        {/* ── Hero — real photo required, see note below ── */}
        <section className="relative min-h-[55vh] w-full overflow-hidden bg-background pt-24">
          <div className="absolute inset-0">
            {/* Replace with a real GEODRILL field photo — not the reference
                site's drill-rig-at-sunset shot. Reuse one already sourced,
                e.g. the geophysical-survey or mining-exploration hero. */}
            <Image
              src="/images/geotech-hero1.jpg"
              alt="GEODRILL field team on an active investigation site"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
                <span className="h-px w-8 bg-primary" />
                {pickLocalized(servicesPageCopy.heroEyebrow, lang)}
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {pickLocalized(servicesPageCopy.heroTitle1, lang)}
                <br />
                <span className="text-primary">
                  {pickLocalized(servicesPageCopy.heroTitle2, lang)}
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-200">
                {pickLocalized(servicesPageCopy.heroDescription, lang)}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Floating trust strip, overlapping the hero */}
        <br></br>
        <br></br>
        <ServicesTrustStrip />

        {/* ── Services by category — UNCHANGED from your existing build ── */}
        <div className="mx-auto max-w-7xl px-4 pb-4 pt-24 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryServices = serviceCategories[category]
              .map((slug) => servicesData[slug])
              .filter(Boolean);

            return (
              <section key={category} className="mb-20">
                <SectionHeading
                  eyebrow={pickLocalized(serviceCategoryLabels[category], lang)}
                  title={pickLocalized(
                    serviceCategoryDescriptions[category],
                    lang,
                  )}
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => {
                    const imageSrc =
                      serviceImages[service.slug] ||
                      "/images/geotech-portal-placeholder.png";
                    const localized = servicesPageItems[service.slug];
                    const name = localized
                      ? isAr
                        ? localized.ar.name
                        : localized.en.name
                      : service.title;
                    const description = localized
                      ? isAr
                        ? localized.ar.description
                        : localized.en.description
                      : service.shortDescription;
                    return (
                      <motion.article
                        key={service.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-surface hover:shadow-lg"
                      >
                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                          <Image
                            src={imageSrc}
                            alt={name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/40 transition-all group-hover:bg-black/30" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono text-xs uppercase tracking-wider text-white/80">
                              {pickLocalized(
                                serviceCategoryLabels[service.category],
                                lang,
                              )}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="font-bold text-foreground transition-colors group-hover:text-primary">
                            {name}
                          </h3>
                          <p className="mt-3 flex-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {description}
                          </p>

                          <Button
                            asChild
                            variant="outline"
                            className="mt-5 self-start border-primary bg-transparent text-black hover:bg-primary hover:text-black dark:text-white dark:hover:text-black"
                          >
                            <Link
                              href={`/geotechnical/${lang}/services/${service.slug}`}
                            >
                              {pickLocalized(servicesPageCopy.explore, lang)}

                              <ArrowRight
                                className={`ms-2 h-4 w-4 ${lang === "ar" ? "rotate-180" : ""}`}
                              />
                            </Link>
                          </Button>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* ── Our Approach (4-step) — see flag in services-approach.tsx ── */}
        <ServicesApproach locale={lang} />

        {/* ── CTA banner — reused from the earlier build ── */}
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
