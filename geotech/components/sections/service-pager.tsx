"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/geotech/lib/utils";
import type { ServiceContent } from "@/geotech/lib/services-data";

export interface ServicePagerProps {
  /** All services in the order they should appear in the pager. */
  allServices: ServiceContent[];
  /** Current service slug — used to derive prev/next. */
  currentSlug: string;
  /** Locale prefix (e.g. "/geotechnical/en"). */
  baseHref: string;
  /** Locale — used for the "Previous" / "Next" labels. */
  isArabic: boolean;
  /** Optional labels override. */
  labels?: { previous?: string; next?: string; allServices?: string };
}

/**
 * Premium prev/next navigation rendered at the bottom of every service detail
 * page. Uses each service's `heroImage` as a backdrop, with category label,
 * title, and a clear left/right CTA. Wraps around at the ends so the pager is
 * always actionable.
 */
export function ServicePager({
  allServices,
  currentSlug,
  baseHref,
  isArabic,
  labels,
}: ServicePagerProps) {
  const prevLabel = labels?.previous ?? (isArabic ? "السابقة" : "Previous");
  const nextLabel = labels?.next ?? (isArabic ? "التالية" : "Next");
  const allLabel =
    labels?.allServices ?? (isArabic ? "كل الخدمات" : "All Services");

  const idx = allServices.findIndex((s) => s.slug === currentSlug);
  if (idx === -1) return null;

  const prev =
    idx === 0 ? allServices[allServices.length - 1] : allServices[idx - 1];
  const next =
    idx === allServices.length - 1 ? allServices[0] : allServices[idx + 1];

  const ArrowEnd = isArabic ? ArrowLeft : ArrowRight;
  const ArrowStart = isArabic ? ArrowRight : ArrowLeft;

  return (
    <section className="relative mt-8 overflow-hidden border-y border-border/40 bg-gradient-to-r from-background via-primary/5 to-background py-12 sm:py-16">
      {/* Soft gold orbs */}
      <div className="pointer-events-none absolute -left-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {isArabic ? "تصفح الخدمات" : "Browse Services"}
            </span>
          </div>
          <Link
            href={`${baseHref}/services`}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm hover:border-primary/50 hover:text-primary"
          >
            <span>{allLabel}</span>
            <ArrowEnd className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <PagerCard
            service={prev}
            href={`${baseHref}/services/${prev.slug}`}
            direction="prev"
            label={prevLabel}
            isArabic={isArabic}
            ArrowEnd={ArrowStart}
            delay={0}
          />
          <PagerCard
            service={next}
            href={`${baseHref}/services/${next.slug}`}
            direction="next"
            label={nextLabel}
            isArabic={isArabic}
            ArrowEnd={ArrowEnd}
            delay={0.05}
          />
        </div>

        {/* Service indicator dots */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-1.5">
          {allServices.map((s, i) => {
            const isCurrent = s.slug === currentSlug;
            const isAdjacent = i === idx - 1 || i === idx + 1;
            return (
              <Link
                key={s.slug}
                href={`${baseHref}/services/${s.slug}`}
                aria-label={s.title}
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  isCurrent
                    ? "w-8 bg-primary"
                    : isAdjacent
                      ? "w-3 bg-primary/40 hover:bg-primary/70"
                      : "w-1.5 bg-border hover:bg-primary/40",
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PagerCard({
  service,
  href,
  direction,
  label,
  isArabic,
  ArrowEnd,
  delay,
}: {
  service: ServiceContent;
  href: string;
  direction: "prev" | "next";
  label: string;
  isArabic: boolean;
  ArrowEnd: typeof ArrowRight;
  delay: number;
}) {
  const category = isArabic
    ? getArabicCategory(service.category)
    : service.category;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        href={href}
        className={cn(
          "group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10",
          direction === "next" && "md:flex-row-reverse md:text-end",
        )}
      >
        {/* Image */}
        <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden sm:h-32 sm:w-32 md:h-36 md:w-40">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${service.heroImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-grid-sm opacity-[0.08]" />

          {/* Direction arrow overlay */}
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center text-white",
              direction === "next" ? "justify-end pr-4" : "justify-start pl-4",
            )}
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/30 backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
              <ArrowEnd className="h-4 w-4" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-5 py-4">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className="text-primary">{label}</span>
            <span className="h-px w-4 bg-border" />
            <span>{category}</span>
          </div>
          <h3 className="mt-2 text-balance text-base font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
            {service.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground sm:text-sm">
            {service.shortDescription}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function getArabicCategory(category: ServiceContent["category"]): string {
  return {
    Ground: "تحريات الأرض",
    Testing: "اختبارات ومسوح",
    Engineering: "هندسة الأرض",
    Studies: "دراسات متخصصة",
  }[category];
}
