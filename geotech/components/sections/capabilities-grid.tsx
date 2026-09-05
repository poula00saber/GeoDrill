"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Sparkles,
  CheckCircle2,
  Layers,
  ImageIcon,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/geotech/lib/utils";

interface GroupedCapability {
  group: string;
  items: string[];
}

export interface CapabilitiesGridProps {
  /** Either a flat list of capabilities or grouped ones. */
  capabilities: string[] | Record<string, string[]>;
  /** Optional hero image used as the cover for flat lists (when no per-item image exists). */
  heroImage?: string;
  /** Heading eyebrow. */
  eyebrow?: string;
  /** Heading text. */
  heading: string;
  /** Optional subheading text. */
  subheading?: string;
  /** Optional locale — controls RTL alignment. */
  isArabic?: boolean;
}

const HERO_FALLBACK = "/images/contact-us-hero.jpg";

/**
 * Modern replacement for the boring grouped/flat capability bullet list. Renders
 * either a flat list (as a uniform photo grid) or grouped capabilities (as
 * grouped tabs whose contents pop up in a content panel). Designed for the
 * service detail page where the source data may have many test items but the
 * UI should remain calm and visual.
 */
export function CapabilitiesGrid({
  capabilities,
  heroImage,
  eyebrow = "What We Deliver",
  heading,
  subheading,
  isArabic = false,
}: CapabilitiesGridProps) {
  const isGrouped =
    !Array.isArray(capabilities) && typeof capabilities === "object";

  const groups: GroupedCapability[] = isGrouped
    ? Object.entries(capabilities as Record<string, string[]>).map(
        ([group, items]) => ({ group, items }),
      )
    : [];

  const flatItems: string[] = Array.isArray(capabilities) ? capabilities : [];

  return (
    <section className="relative">
      {/* Header */}
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
          {heading}
        </motion.h2>

        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-4 text-balance text-base text-muted-foreground sm:text-lg"
          >
            {subheading}
          </motion.p>
        )}
      </div>

      {/* Body */}
      {isGrouped ? (
        <GroupedGrid groups={groups} isArabic={isArabic} />
      ) : (
        <FlatGrid items={flatItems} heroImage={heroImage} isArabic={isArabic} />
      )}
    </section>
  );
}

function FlatGrid({
  items,
  heroImage,
  isArabic,
}: {
  items: string[];
  heroImage?: string;
  isArabic: boolean;
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.slice(0, 6).map((item, i) => (
          <CapabilityCard
            key={i}
            index={i}
            item={item}
            heroImage={heroImage}
            expanded={expanded === i}
            onToggle={() => setExpanded(expanded === i ? null : i)}
            isArabic={isArabic}
          />
        ))}
      </div>
      {items.length > 6 && (
        <p className="mt-6 text-center text-xs text-muted-foreground">
          {isArabic
            ? `+ ${items.length - 6} اختبارات أخرى — راجع معرض المشاريع أو تواصل معنا للاطلاع على القائمة الكاملة.`
            : `+ ${items.length - 6} more tests — see project gallery or contact us for the full list.`}
        </p>
      )}
    </>
  );
}

function CapabilityCard({
  index,
  item,
  heroImage,
  expanded,
  onToggle,
  isArabic,
}: {
  index: number;
  item: string;
  heroImage?: string;
  expanded: boolean;
  onToggle: () => void;
  isArabic: boolean;
}) {
  // Strip trailing "(ASTM X)" or "(BS 812)" tags so the heading is clean.
  const { title, label } = splitCapabilityLabel(item);
  const tone = TONES[index % TONES.length]!;
  const Icon = tone.icon;

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative flex flex-col items-start overflow-hidden rounded-2xl border bg-card p-5 text-start transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10",
        tone.ring,
        expanded
          ? "border-primary/70 shadow-lg shadow-primary/15"
          : "border-border/60",
      )}
    >
      {/* Image strip + icon */}
      <div className="relative mb-4 flex w-full items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        {heroImage && (
          <div
            className="relative h-8 w-16 overflow-hidden rounded-md border border-border/60 bg-muted opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
          </div>
        )}
      </div>

      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {String(index + 1).padStart(2, "0")} · {isArabic ? tone.arabicTag : tone.tag}
      </span>

      <h3 className="mt-1 text-balance text-sm font-bold leading-snug text-foreground sm:text-base">
        {title}
      </h3>

      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {label}
      </p>

      <div
        className={cn(
          "mt-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-widest text-primary transition-transform duration-300",
          isArabic ? "flex-row-reverse" : "",
          "group-hover:translate-x-1 rtl:group-hover:-translate-x-1",
        )}
      >
        <span>{isArabic ? "اقرأ المزيد" : "Read more"}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-300",
            expanded && "rotate-180",
          )}
        />
      </div>

      {/* Expanded body — shows the long description when clicked */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 w-full overflow-hidden border-t border-border/40 pt-3"
          >
            <p className="text-xs leading-relaxed text-foreground/90 sm:text-sm">
              {item}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animated gold rule */}
      <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary/0 via-primary to-primary/0 transition-transform duration-500 group-hover:scale-x-100" />
    </motion.button>
  );
}

function GroupedGrid({
  groups,
  isArabic,
}: {
  groups: GroupedCapability[];
  isArabic: boolean;
}) {
  const [active, setActive] = useState(0);
  const group = groups[active];
  const totalItems = groups.reduce((acc, g) => acc + g.items.length, 0);

  return (
    <>
      {/* Tabs */}
      <div className="mt-10 flex flex-wrap gap-2">
        {groups.map((g, i) => (
          <button
            key={g.group}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300",
              active === i
                ? "border-primary bg-primary/15 text-primary shadow-md shadow-primary/10"
                : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            <span className="font-mono text-[10px]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{g.group}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 font-mono text-[9px]",
                active === i ? "bg-primary/30" : "bg-border/40",
              )}
            >
              {g.items.length}
            </span>
          </button>
        ))}
      </div>

      {/* Active panel */}
      <div className="mt-8 grid gap-6 overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm lg:grid-cols-[1fr_1.5fr]">
        {/* Left: title + counts */}
        <div className="relative border-b border-border/60 bg-surface/30 p-6 lg:border-e lg:border-b-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-500/10" />
          <div className="relative">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {isArabic ? "الفئة" : "Category"}
            </span>
            <h3 className="mt-2 text-balance text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
              {group?.group}
            </h3>

            <div className="mt-6 flex items-center gap-6 border-t border-border/40 pt-4">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {isArabic ? "عدد الاختبارات" : "Tests"}
                </div>
                <div className="mt-1 text-2xl font-bold text-primary">
                  {group?.items.length ?? 0}
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {isArabic ? "إجمالي" : "Total"}
                </div>
                <div className="mt-1 text-2xl font-bold text-foreground">
                  {totalItems}
                </div>
              </div>
            </div>

            {/* Mini progress */}
            <div className="mt-6">
              <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>{isArabic ? "الفئة الحالية" : "Current category"}</span>
                <span>
                  {String(active + 1).padStart(2, "0")} / {String(groups.length).padStart(2, "0")}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-border/40">
                <motion.div
                  key={active}
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((active + 1) / groups.length) * 100}%`,
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-amber-500"
                />
              </div>
            </div>

            {/* Prev/Next */}
            <div
              className={cn(
                "mt-6 flex items-center gap-2",
                isArabic ? "flex-row-reverse" : "",
              )}
            >
              <button
                type="button"
                onClick={() => setActive((active - 1 + groups.length) % groups.length)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary rtl:rotate-180"
                aria-label={isArabic ? "السابق" : "Previous category"}
              >
                <ChevronDown className="h-4 w-4 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => setActive((active + 1) % groups.length)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary rtl:rotate-180"
                aria-label={isArabic ? "التالي" : "Next category"}
              >
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: list of tests in this group */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.ul
              key={group?.group}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid gap-2 sm:grid-cols-2"
            >
              {group?.items.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: isArabic ? -6 : 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.3) }}
                  className="flex items-start gap-2 rounded-lg border border-border/40 bg-surface/40 p-3 transition-colors hover:border-primary/40 hover:bg-surface/60"
                >
                  <CheckCircle2
                    className={cn(
                          "mt-0.5 h-4 w-4 flex-shrink-0 text-primary",
                          isArabic && "rotate-180",
                        )}
                    strokeWidth={2}
                  />
                  <span className="text-xs leading-relaxed text-foreground/90 sm:text-sm">
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

/**
 * Splits a string like:
 *   "Slump of Hydraulic-Cement Concrete (ASTM C143)"
 * into:
 *   title: "Slump of Hydraulic-Cement Concrete"
 *   label: "ASTM C143"
 */
function splitCapabilityLabel(item: string): { title: string; label: string } {
  const match = item.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (!match) return { title: item, label: "" };
  return { title: match[1]!.trim(), label: match[2]!.trim() };
}

interface Tone {
  tag: string;
  arabicTag: string;
  icon: LucideIcon;
  ring: string;
}

const TONES: Tone[] = [
  { tag: "Field", arabicTag: "حقلي", icon: Sparkles, ring: "hover:border-primary/60" },
  { tag: "Lab", arabicTag: "مخبري", icon: Layers, ring: "hover:border-amber-500/60" },
  { tag: "NDT", arabicTag: "غير إتلافي", icon: ImageIcon, ring: "hover:border-sky-500/60" },
  { tag: "QC", arabicTag: "جودة", icon: CheckCircle2, ring: "hover:border-emerald-500/60" },
  { tag: "Specialty", arabicTag: "متخصص", icon: X, ring: "hover:border-violet-500/60" },
  { tag: "Testing", arabicTag: "اختبار", icon: Layers, ring: "hover:border-rose-500/60" },
];