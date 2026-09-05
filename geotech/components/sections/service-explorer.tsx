"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { TechnicalBadge } from "@/geotech/components/technical-badge";
import { cn } from "@/geotech/lib/utils";
import {
  servicesData,
  serviceCategories,
  type ServiceContent,
  type ServiceCategory,
} from "@/geotech/lib/services-data";
import {
  servicesPageItems,
  serviceCategoryLabels,
  pickLocalized,
} from "@/geotech/lib/services-page-i18n";

/**
 * Home-page interactive service browser.
 *
 * Reads directly from `services-data.ts` — the same source of truth used by
 * the /services index page and the [slug] detail page — so the count, order,
 * names, descriptions and categories on the home match those on /services
 * exactly. There is one row per `servicesData` slug (currently 14).
 */

// Flat list of every service, in the canonical /services order.
const ALL_SERVICES: ServiceContent[] = (
  Object.keys(serviceCategories) as ServiceCategory[]
).flatMap((cat) =>
  serviceCategories[cat].map((slug) => servicesData[slug]),
).filter((s): s is ServiceContent => Boolean(s));

const CATEGORY_KEYS: ServiceCategory[] = [
  "Ground",
  "Testing",
  "Engineering",
  "Studies",
];

const CATEGORY_LABEL_KEY: Record<ServiceCategory, "ground" | "testing" | "engineering" | "studies"> =
  {
    Ground: "ground",
    Testing: "testing",
    Engineering: "engineering",
    Studies: "studies",
  };

const contentVariants: Variants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 12 : -12,
    filter: "blur(4px)",
  }),
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? 12 : -12,
    filter: "blur(4px)",
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  }),
};

interface ServiceMeta {
  name: string;
  description: string;
}

function getLocalized(
  service: ServiceContent,
  isAr: boolean,
): ServiceMeta {
  const localized = servicesPageItems[service.slug];
  if (localized) {
    return isAr
      ? { name: localized.ar.name, description: localized.ar.description }
      : { name: localized.en.name, description: localized.en.description };
  }
  return {
    name: service.title,
    description: service.shortDescription,
  };
}

export function ServiceExplorer() {
  const { dict, locale } = useLanguage();
  const isAr = locale === "ar";
  const [category, setCategory] = useState(0);
  const [activeSlug, setActiveSlug] = useState<string>(
    ALL_SERVICES[0]?.slug ?? "",
  );
  const [direction, setDirection] = useState(1);

  // Service meta (name + description) for every entry, locale-aware.
  const meta = useMemo(() => {
    const m: Record<string, ServiceMeta> = {};
    for (const s of ALL_SERVICES) m[s.slug] = getLocalized(s, isAr);
    return m;
  }, [isAr]);

  if (!dict) return null;

  const currentCategory = CATEGORY_KEYS[category];
  const list = serviceCategories[currentCategory];
  const activeService = servicesData[activeSlug];
  const activeMeta = meta[activeSlug];
  const activeIdx = list.indexOf(activeSlug);

  const pickCategory = (i: number) => {
    setCategory(i);
    setDirection(1);
    setActiveSlug(serviceCategories[CATEGORY_KEYS[i]!]![0]!);
  };

  const selectService = (slug: string) => {
    const currentIndex = list.indexOf(activeSlug);
    const nextIndex = list.indexOf(slug);
    setDirection(nextIndex >= currentIndex ? 1 : -1);
    setActiveSlug(slug);
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-amber-500/10 py-20 sm:py-28 md:py-32"
    >
      {/* Soft gold orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/3 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title={dict.services.title}
          description={dict.services.subtitle}
          className="mb-12"
        />

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_KEYS.map((cat, i) => {
            const isSelected = category === i;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => pickCategory(i)}
                aria-pressed={isSelected}
                className={cn(
                  "relative rounded-md px-4 py-2.5 text-xs font-semibold uppercase tracking-wider outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-primary",
                  isSelected
                    ? "text-primary-foreground"
                    : "border border-border bg-surface text-muted-foreground hover:border-primary/50 hover:bg-surface/80 hover:text-primary",
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-category"
                    transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.9 }}
                    className="absolute inset-0 rounded-md bg-primary shadow-[0_0_18px_rgba(201,162,39,0.45)]"
                  />
                )}
                <motion.span
                  layout
                  transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.9 }}
                  className="relative z-10 block"
                >
                  {dict.services.categories[CATEGORY_LABEL_KEY[cat]]}
                </motion.span>
              </button>
            );
          })}
        </div>

        {/* Master-Detail Interactive Grid */}
        <div className="mt-8 grid overflow-hidden rounded-md border border-border/80 bg-border/60 shadow-xl lg:grid-cols-[280px_1.1fr_1fr]">
          {/* Left: service list for the current category */}
          <ul className="divide-y divide-border/60 bg-background">
            {list.map((slug, i) => {
              const m = meta[slug];
              const isActive = slug === activeSlug;
              return (
                <li key={slug}>
                  <button
                    type="button"
                    onMouseEnter={() => selectService(slug)}
                    onFocus={() => selectService(slug)}
                    onClick={() => selectService(slug)}
                    aria-current={isActive}
                    className={cn(
                      "group relative flex w-full items-start gap-3.5 px-5 py-4 text-start transition-colors duration-200 hover:bg-surface/80",
                      isActive && "bg-surface",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="service-indicator"
                        className="absolute inset-y-0 start-0 w-1 rounded-e bg-primary shadow-[0_0_10px_rgba(201,162,39,0.5)]"
                        transition={{ type: "spring", stiffness: 300, damping: 26, mass: 0.9 }}
                      />
                    )}
                    <span
                      className={cn(
                        "pt-0.5 font-mono text-xs transition-colors",
                        isActive
                          ? "font-bold text-primary"
                          : "text-muted-foreground/60",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium leading-snug transition-colors",
                        isActive
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {m?.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Middle: dynamic service visual */}
          <div className="relative min-h-[320px] overflow-hidden bg-black lg:min-h-[420px]">
            <AnimatePresence mode="wait">
              {activeService && (
                <motion.div
                  key={activeService.slug}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeService.heroImage}
                    alt={activeMeta?.name ?? activeService.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover opacity-90"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Discipline / index badge */}
            <div className="absolute bottom-5 start-5 z-10">
              <span className="inline-flex rounded border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                {pickLocalized(serviceCategoryLabels[currentCategory], locale)} /{" "}
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right: service details panel */}
          <div className="relative flex flex-col justify-between bg-background p-6 md:p-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeSlug}
                custom={direction}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex h-full flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-primary">
                    {String(activeIdx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold tracking-tight text-balance text-foreground">
                    {activeMeta?.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {activeMeta?.description}
                  </p>

                  {/* Category tag */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    <TechnicalBadge>
                      {dict.services.categories[CATEGORY_LABEL_KEY[currentCategory]]}
                    </TechnicalBadge>
                  </div>
                </div>

                <div className="mt-8 border-t border-border/60 pt-6">
                  <a
                    href={`/geotechnical/${locale}/services/${activeSlug}`}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-primary bg-transparent px-6 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_18px_rgba(201,162,39,0.45)]"
                  >
                    <span>{dict.services.explore}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5 rtl:rotate-180 rtl:group-hover:-translate-x-1.5" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// Re-export so server components can import the full list when they need it.
export { ALL_SERVICES };