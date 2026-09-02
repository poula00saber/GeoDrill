"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { TechnicalBadge } from "@/geotech/components/technical-badge";
import { siteImages } from "@/geotech/lib/images";
import { cn } from "@/geotech/lib/utils";

type ServiceKey =
  | "geotechnical-investigation"
  | "geophysical-survey"
  | "geological-survey"
  | "hydrogeological-studies"
  | "material-testing"
  | "quality-control"
  | "topographical-survey"
  | "environmental-survey"
  | "cavity-probing"
  | "grouting"
  | "micropiling"
  | "anchoring-shoring"
  | "dewatering"
  | "soil-improvement"
  | "hydrology"
  | "structural-assessment"
  | "mining-exploration";

interface Category {
  key: string;
  labelKey: "ground" | "testing" | "engineering" | "studies";
  services: ServiceKey[];
}

// Map explorer keys to actual service slugs
const serviceSlugMap: Record<ServiceKey, string> = {
  "geotechnical-investigation": "geotechnical-investigation",
  "geophysical-survey": "geophysical-survey",
  "geological-survey": "geological-survey-rock-slope-stability",
  "hydrogeological-studies": "hydrogeological-studies",
  "material-testing": "material-testing-quality-control",
  "quality-control": "material-testing-quality-control",
  "topographical-survey": "topographical-survey",
  "environmental-survey": "environmental-survey",
  "cavity-probing": "cavity-probing-grouting-micro-piling",
  grouting: "cavity-probing-grouting-micro-piling",
  micropiling: "cavity-probing-grouting-micro-piling",
  "anchoring-shoring": "anchoring-shoring-design-execution",
  dewatering: "dewatering-design-execution",
  "soil-improvement": "soil-improvement-concrete-repair",
  hydrology: "hydrology-studies",
  "structural-assessment": "structural-assessment",
  "mining-exploration": "mining-exploration",
};

const categories: Category[] = [
  {
    key: "ground",
    labelKey: "ground",
    services: [
      "geotechnical-investigation",
      "geophysical-survey",
      "geological-survey",
      "hydrogeological-studies",
    ],
  },
  {
    key: "testing",
    labelKey: "testing",
    services: [
      "material-testing",
      "quality-control",
      "topographical-survey",
      "environmental-survey",
    ],
  },
  {
    key: "engineering",
    labelKey: "engineering",
    services: [
      "cavity-probing",
      "grouting",
      "micropiling",
      "anchoring-shoring",
      "dewatering",
      "soil-improvement",
    ],
  },
  {
    key: "studies",
    labelKey: "studies",
    services: ["hydrology", "structural-assessment", "mining-exploration"],
  },
];

const serviceImages: Record<ServiceKey, string> = {
  "geotechnical-investigation": siteImages.investigation,
  "geophysical-survey": siteImages.geophysical,
  "geological-survey": siteImages.geology,
  "hydrogeological-studies": siteImages.hydrology,
  "material-testing": siteImages.laboratory,
  "quality-control": siteImages.qhse,
  "topographical-survey": siteImages.survey,
  "environmental-survey": siteImages.geology2,
  "cavity-probing": siteImages.groundEngineering,
  grouting: siteImages.groundEngineering,
  micropiling: siteImages.groundEngineering,
  "anchoring-shoring": siteImages.structural,
  dewatering: siteImages.hydrology,
  "soil-improvement": siteImages.groundEngineering,
  hydrology: siteImages.hydrology,
  "structural-assessment": siteImages.structural,
  "mining-exploration": siteImages.mining,
};

const contentVariants = {
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
} as const;

export function ServiceExplorer() {
  const { dict, locale } = useLanguage();
  const [category, setCategory] = useState(0);
  const [activeService, setActiveService] = useState<ServiceKey>(
    categories[0]!.services[0]!,
  );
  // Tracks direction for the content-animation transitions.
  const [direction, setDirection] = useState(1);

  if (!dict) return null;

  const currentCategory = categories[category];
  const list = currentCategory.services;
  const activeIdx = list.indexOf(activeService);

  const pickCategory = (i: number) => {
    setCategory(i);
    setDirection(1);
    setActiveService(categories[i]!.services[0]!);
  };

  const selectService = (id: ServiceKey) => {
    const currentIndex = list.indexOf(activeService);
    const nextIndex = list.indexOf(id);
    setDirection(nextIndex >= currentIndex ? 1 : -1);
    setActiveService(id);
  };

  return (
    <section
      id="services"
      className="relative overflow-hidden py-20 sm:py-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title={dict.services.title}
          description={dict.services.subtitle}
          className="mb-12"
        />

        {/* Categories Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, i) => {
            const isSelected = category === i;
            return (
              <button
                key={cat.key}
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
                  {dict.services.categories[cat.labelKey]}
                </motion.span>
              </button>
            );
          })}
        </div>

        {/* Master-Detail Interactive Grid */}
        <div className="mt-8 grid overflow-hidden rounded-md border border-border/80 bg-border/60 shadow-xl lg:grid-cols-[280px_1.1fr_1fr]">
          {/* Left: service list for the current category */}
          <ul className="divide-y divide-border/60 bg-background">
            {list.map((s, i) => {
              const isActive = s === activeService;
              return (
                <li key={s}>
                  <button
                    type="button"
                    onMouseEnter={() => selectService(s)}
                    onFocus={() => selectService(s)}
                    onClick={() => selectService(s)}
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
                      {dict.services.items[s].name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Middle: dynamic service visual */}
          <div className="relative min-h-[320px] overflow-hidden bg-black lg:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeService}
                src={serviceImages[activeService]}
                alt={dict.services.items[activeService].name}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 0.85, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            {/* Discipline / index badge */}
            <div className="absolute bottom-5 start-5 z-10">
              <span className="inline-flex rounded border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                {dict.services.categories[currentCategory.labelKey]} /{" "}
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Right: service details panel */}
          <div className="relative flex flex-col justify-between bg-background p-6 md:p-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeService}
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
                    {dict.services.items[activeService].name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {dict.services.items[activeService].description}
                  </p>

                  {/* Category tag */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    <TechnicalBadge>
                      {dict.services.categories[currentCategory.labelKey]}
                    </TechnicalBadge>
                  </div>
                </div>

                <div className="mt-8 border-t border-border/60 pt-6">
                  <a
                    href={`/geotechnical/${locale}/services/${serviceSlugMap[activeService]}`}
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
