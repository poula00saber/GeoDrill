"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { cn } from "@/geotech/lib/utils";
import { servicesData } from "@/geotech/lib/services-data";
import {
  servicesPageItems,
  serviceCategoryLabels,
  pickLocalized,
} from "@/geotech/lib/services-page-i18n";

/**
 * A single capability row inside the ServiceVisualShowcase.
 *
 * `image`, `icon` and the optional `illustration` are all optional — the
 * component renders gracefully without any of them, falling back to the
 * service hero image and a numbered badge.
 */
export interface ShowcaseCapability {
  /** Unique id (auto-derived from index when omitted). */
  id?: string;
  /** Short label (max ~6 words) shown on the tab button. */
  label: string;
  /** Single-sentence description shown in the right panel. */
  description: string;
  /** Two-to-four short feature chips shown under the description. */
  features: string[];
  /** Optional photo — falls back to the service hero when absent. */
  image?: string;
  /** Optional lucide icon — falls back to a numbered badge when absent. */
  icon?: LucideIcon;
  /** Optional accent tone — defaults to "primary". */
  tone?: "primary" | "amber" | "sky" | "rose" | "violet" | "emerald" | "blue";
}

export interface ServiceVisualShowcaseProps {
  /** Service slug (must exist in `servicesData`). */
  slug: string;
  /** Eyebrow above the heading (e.g. "Service Capabilities"). */
  eyebrow?: string;
  /** Heading text. Defaults to the localized service title. */
  heading?: string;
  /** Optional supporting copy below the heading. */
  subheading?: string;
  /**
   * Capabilities to display. If omitted, falls back to reading
   * `servicesData[slug].capabilities` and turning each item into a row.
   */
  capabilities?: ShowcaseCapability[];
}

const TONE: Record<
  NonNullable<ShowcaseCapability["tone"]>,
  { accent: string; chip: string; glow: string; dot: string }
> = {
  primary: {
    accent: "from-primary/20 to-primary/0",
    chip: "border-primary/40 bg-primary/10 text-primary",
    glow: "bg-primary/20",
    dot: "bg-primary",
  },
  amber: {
    accent: "from-amber-500/20 to-amber-500/0",
    chip: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    glow: "bg-amber-500/15",
    dot: "bg-amber-400",
  },
  sky: {
    accent: "from-sky-500/20 to-sky-500/0",
    chip: "border-sky-500/40 bg-sky-500/10 text-sky-400",
    glow: "bg-sky-500/15",
    dot: "bg-sky-400",
  },
  blue: {
    accent: "from-blue-500/20 to-blue-500/0",
    chip: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    glow: "bg-blue-500/15",
    dot: "bg-blue-400",
  },
  rose: {
    accent: "from-rose-500/20 to-rose-500/0",
    chip: "border-rose-500/40 bg-rose-500/10 text-rose-400",
    glow: "bg-rose-500/15",
    dot: "bg-rose-400",
  },
  violet: {
    accent: "from-violet-500/20 to-violet-500/0",
    chip: "border-violet-500/40 bg-violet-500/10 text-violet-400",
    glow: "bg-violet-500/15",
    dot: "bg-violet-400",
  },
  emerald: {
    accent: "from-emerald-500/20 to-emerald-500/0",
    chip: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    glow: "bg-emerald-500/15",
    dot: "bg-emerald-400",
  },
};

const panelVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 24 : -24,
    transition: { duration: 0.2, ease: [0.7, 0, 0.84, 0] },
  }),
};

/**
 * Auto-derive a `ShowcaseCapability[]` from a flat `string[]` capability list
 * (the common shape in `servicesData`).
 */
export function capabilitiesFromStrings(
  items: string[],
  fallbackImage?: string,
): ShowcaseCapability[] {
  return items.map((raw, i) => {
    const [labelPart, ...descParts] = raw.split(" — ");
    return {
      id: `cap-${i}`,
      label: labelPart ?? raw,
      description: descParts.join(" — ") || raw,
      features: [],
      image: fallbackImage,
      tone: (
        ["primary", "amber", "sky", "violet", "emerald", "rose", "blue"] as const
      )[i % 7],
    };
  });
}

export function ServiceVisualShowcase({
  slug,
  eyebrow = "Service Capabilities",
  heading,
  subheading,
  capabilities,
}: ServiceVisualShowcaseProps) {
  const { dict, locale } = useLanguage();
  const isAr = locale === "ar";

  const service = servicesData[slug];

  const items: ShowcaseCapability[] = useMemo(() => {
    if (capabilities && capabilities.length > 0) return capabilities;
    if (!service) return [];
    const caps = service.capabilities;
    if (Array.isArray(caps)) {
      return capabilitiesFromStrings(caps, service.heroImage);
    }
    // grouped -> flatten with their group name as a feature hint
    return Object.entries(caps).flatMap(([group, list]) =>
      capabilitiesFromStrings(
        list.map((s) => `${group} — ${s}`),
        service.heroImage,
      ),
    );
  }, [capabilities, service]);

  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  if (!dict || !service || items.length === 0) return null;

  const active = items[activeIdx]!;
  const tone = TONE[active.tone ?? "primary"];
  const Icon = active.icon ?? Sparkles;

  const localized = servicesPageItems[slug];
  const localizedTitle = localized
    ? isAr
      ? localized.ar.name
      : localized.en.name
    : service.title;
  const localizedSubtitle = localized
    ? isAr
      ? localized.ar.description
      : localized.en.description
    : service.shortDescription;
  const categoryBadge = pickLocalized(
    serviceCategoryLabels[service.category],
    locale,
  );

  const select = (idx: number) => {
    setDirection(idx >= activeIdx ? 1 : -1);
    setActiveIdx(idx);
  };
  const next = () => select((activeIdx + 1) % items.length);
  const prev = () => select((activeIdx - 1 + items.length) % items.length);

  return (
    <section className="relative">
      {/* Section header */}
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
          className="mb-3 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-primary" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-primary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          {heading ?? localizedTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-4 text-balance text-base text-muted-foreground sm:text-lg"
        >
          {subheading ?? localizedSubtitle}
        </motion.p>
      </div>

      {/* Capability chips strip */}
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {items.map((cap, i) => {
          const isActive = i === activeIdx;
          const t = TONE[cap.tone ?? "primary"];
          const Icon2 = cap.icon ?? Sparkles;
          return (
            <button
              key={cap.id ?? i}
              type="button"
              onClick={() => select(i)}
              aria-pressed={isActive}
              className={cn(
                "group relative flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-medium transition-all duration-300",
                isActive
                  ? `${t.chip} shadow-md shadow-primary/10`
                  : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              <Icon2 className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="line-clamp-1">{cap.label}</span>
            </button>
          );
        })}
      </div>

      {/* Hero panel */}
      <div className="mt-8 grid gap-0 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-lg shadow-primary/5 md:grid-cols-5">
        {/* Photo */}
        <div className="relative aspect-[16/10] overflow-hidden md:col-span-3 md:aspect-auto md:h-full md:min-h-[420px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.id ?? activeIdx}
              custom={direction}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={active.image ?? service.heroImage}
                alt={active.label}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover"
                onError={(event) => {
                  event.currentTarget.src = "/images/contact-us-hero.jpg";
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Photo overlays */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/75 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-grid-sm opacity-[0.07]" />

          {/* Floating phase badge */}
          <div
            className={cn(
              "absolute start-4 top-4 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur-md",
              tone.chip,
            )}
          >
            <Icon className="h-3 w-3" />
            <span>
              {String(activeIdx + 1).padStart(2, "0")} /{" "}
              {String(items.length).padStart(2, "0")}
            </span>
          </div>

          {/* Category badge */}
          <div className="absolute bottom-4 end-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/80 backdrop-blur-md">
            {categoryBadge}
          </div>

          {/* Bottom progress bar */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-black/30">
            <motion.div
              key={activeIdx}
              initial={{ width: 0 }}
              animate={{ width: `${((activeIdx + 1) / items.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={cn("h-full", tone.dot)}
            />
          </div>
        </div>

        {/* Detail panel */}
        <div className="relative md:col-span-2 md:p-7 lg:p-9">
          {/* Decorative gradient */}
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-25",
              tone.accent,
            )}
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.id ?? activeIdx}
              custom={direction}
              variants={panelVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative"
            >
              {/* Step counter */}
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {isAr ? "القدرة" : "Capability"}{" "}
                <span className="font-bold text-primary">
                  {String(activeIdx + 1).padStart(2, "0")}
                </span>
              </span>

              <h3 className="mt-2 text-balance text-xl- font-bold leading-tight tracking-tight text-foreground sm:text-2xl lg:text-3xl">
                {active.label}
              </h3>

              <p className="mt-4 text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
                {active.description}
              </p>

              {active.features.length > 0 && (
                <ul className="mt-6 grid gap-2.5">
                  {active.features.map((f, fi) => (
                    <motion.li
                      key={fi}
                      initial={{ opacity: 0, x: isAr ? -8 : 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * fi }}
                      className="flex items-start gap-2.5 rounded-lg border border-border/40 bg-surface/40 p-2.5"
                    >
                      <CheckCircle2
                        className={cn(
                          "mt-0.5 h-4 w-4 flex-shrink-0",
                          isAr && "rotate-180",
                        )}
                        strokeWidth={2}
                        style={{ color: "hsl(var(--primary))" }}
                      />
                      <span className="text-xs leading-relaxed text-foreground/90 sm:text-sm">
                        {f}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              )}

              {/* Prev / Next */}
              <div
                className={cn(
                  "mt-8 flex items-center gap-2",
                  isAr ? "flex-row-reverse" : "",
                )}
              >
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary rtl:rotate-180"
                  aria-label={isAr ? "السابق" : "Previous"}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary rtl:rotate-180"
                  aria-label={isAr ? "التالي" : "Next"}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                  {activeIdx + 1} / {items.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/**
 * Convenience helper: renders the show case with `eyebrow = "Process"`.
 * Use for services where each tab is a workflow step.
 */
export function ServiceProcessShowcase(
  props: ServiceVisualShowcaseProps & { stepLabel?: string },
) {
  return (
    <ServiceVisualShowcase {...props} eyebrow={props.stepLabel ?? "Process"} />
  );
}