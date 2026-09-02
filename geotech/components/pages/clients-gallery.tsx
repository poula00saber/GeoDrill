"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  Grid3X3,
  Layers,
  Maximize2,
  Search,
  SearchX,
  X,
} from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { CLIENT_LOGOS, type ClientLogo } from "@/lib/clients-data";
import { cn } from "@/geotech/lib/utils";

type CategoryId = "all" | ClientLogo["category"];

const CATEGORIES: { id: CategoryId; en: string; ar: string }[] = [
  { id: "all", en: "All Clients", ar: "جميع العملاء" },
  { id: "government", en: "Government & Giga", ar: "الحكومة والمشاريع الكبرى" },
  { id: "infrastructure", en: "Infrastructure & Real Estate", ar: "البنية التحتية والعقار" },
  { id: "water-energy", en: "Water & Energy", ar: "المياه والطاقة" },
  { id: "contracting", en: "Contracting & Construction", ar: "المقاولات والإنشاءات" },
];

const CATEGORY_INFOS: Record<
  ClientLogo["category"],
  { en: string; ar: string }
> = {
  government: { en: "Government & Giga Projects", ar: "القطاع الحكومي والمشاريع الكبرى" },
  infrastructure: { en: "Infrastructure & Real Estate", ar: "البنية التحتية والتطوير" },
  "water-energy": { en: "Water & Energy", ar: "المياه والطاقة" },
  contracting: { en: "Contracting & Construction", ar: "المقاولات والإنشاءات" },
};

export function ClientsGallery() {
  const { locale, dict } = useLanguage();
  const isAr = locale === "ar";
  const t = dict?.clientsPage;

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Lock body scroll while the quick-view modal is open.
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CLIENT_LOGOS.filter((logo) => {
      const matchesSearch =
        !q || `${logo.name} ${logo.nameAr}`.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategory === "all" || logo.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      all: CLIENT_LOGOS.length,
      government: 0,
      infrastructure: 0,
      "water-energy": 0,
      contracting: 0,
    };
    for (const l of CLIENT_LOGOS) counts[l.category] += 1;
    return counts;
  }, []);

  // Keyboard navigation: Esc closes, arrows move the "active" highlight.
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
        return;
      }
      if (filtered.length === 0) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const delta = e.key === "ArrowRight" ? 1 : -1;
        setActiveIndex((prev) =>
          prev === null ? 0 : (prev + delta + filtered.length) % filtered.length,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, filtered.length]);

  const activeLogo = activeIndex !== null ? filtered[activeIndex] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Back link */}
      <Link
        href={`/geotechnical/${locale}`}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
        {t?.backHome ?? (isAr ? "العودة إلى الرئيسية" : "Back to home")}
      </Link>

      {/* Header */}
      <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary" />
            {t?.eyebrow ?? (isAr ? "عملاؤنا" : "Our Clients")}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {isAr
              ? `أكثر من ${CLIENT_LOGOS.length} جهة تثق بجيو دريل`
              : `${CLIENT_LOGOS.length}+ ${t?.title ?? "Trusted Organizations"}`}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t?.subtitle ??
              (isAr
                ? "شركاء من القطاعين الحكومي والخاص يعتمدون على خبراتنا في حلول الجيوتقنية وهندسة الأرض."
                : "Partners from the public and private sectors who rely on our geotechnical and geoscience expertise across Saudi Arabia.")}
          </p>
        </div>

        {/* Stat chips */}
        <div className="flex flex-wrap gap-3">
          {[
            { icon: Grid3X3, label: t?.clientsStat ?? (isAr ? "عميل" : "Clients"), value: String(CLIENT_LOGOS.length) },
            { icon: Layers, label: t?.sectorsStat ?? (isAr ? "قطاع" : "Sectors"), value: "4" },
            { icon: CircleCheck, label: t?.verifiedStat ?? (isAr ? "معتمدون" : "Verified"), value: "100%" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-xl border border-border/70 bg-card px-4 py-3 shadow-sm"
            >
              <s.icon className="size-5 text-primary" />
              <div className="leading-none">
                <div className="text-xl font-extrabold text-foreground">{s.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(null);
            }}
            placeholder={t?.search ?? (isAr ? "ابحث عن عميل..." : "Search clients...")}
            className="w-full rounded-full border border-border bg-card py-2.5 ps-11 pe-9 text-sm text-foreground shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={isAr ? "مسح البحث" : "Clear search"}
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Filter pills with counts */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveIndex(null);
                }}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all duration-300",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
                )}
              >
                {isAr ? cat.ar : cat.en}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none",
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {categoryCounts[cat.id]}
                </span>
              </button>
            );
          })}
        </div>
      </div>
{/* Grid */}
      <motion.div
        ref={gridRef}
        layout
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5"
      >
        <AnimatePresence>
          {filtered.map((logo, i) => {
            const catInfo = CATEGORY_INFOS[logo.category];
            const displayName = isAr ? logo.nameAr : logo.name;
            const isActive = i === activeIndex;

            return (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={logo.slug}
                onClick={() => setActiveIndex(i)}
                type="button"
                className={cn(
                  "group/card relative flex cursor-pointer flex-col rounded-2xl text-start outline-none before:pointer-events-none before:absolute before:inset-2 before:-z-10 before:rounded-3xl before:bg-primary/0 before:blur-xl before:transition-colors before:duration-300 hover:before:bg-primary/10",
                  isActive && "before:bg-primary/10",
                )}
              >
                <div
                  className={cn(
                    "relative z-10 flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-background to-muted/80 p-6 shadow-sm backdrop-blur-md",
                    "transition-all duration-300 ease-out",
                    "group-hover/card:-translate-y-1.5 group-hover/card:scale-[1.015] group-hover/card:border-primary/60 group-hover/card:shadow-xl group-hover/card:shadow-primary/20",
                    "dark:border-white/10 dark:from-white/[0.06] dark:via-surface/80 dark:to-white/[0.03]",
                    isActive &&
                      "-translate-y-1.5 scale-[1.015] border-primary/70 shadow-xl shadow-primary/20",
                  )}
                >
                  {/* Expand badge */}
                  <div
                    className={cn(
                      "absolute start-3 top-3 z-20 flex size-7 items-center justify-center rounded-full bg-primary/10 opacity-0 transition-all duration-300 group-hover/card:opacity-100",
                      isActive && "opacity-100",
                    )}
                  >
                    <Maximize2 className="size-3.5 text-primary" />
                  </div>

                  {/* White card behind the logo so marks stay visible in dark mode */}
                  <span className="relative block h-full w-full rounded-xl border border-black/5 bg-gradient-to-br from-white to-slate-100 p-2 shadow-inner dark:border-white/20 dark:from-white/95 dark:to-slate-200">
                    <Image
                      src={logo.src}
                      alt={displayName}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 18vw"
                      className="object-contain"
                    />
                  </span>
                </div>

                <span className="mt-3 line-clamp-2 text-center text-xs font-semibold leading-snug text-muted-foreground transition-colors duration-300 group-hover/card:text-foreground">
                  {displayName}
                </span>
                <span className="mt-1 text-center font-mono text-[9px] uppercase tracking-wider text-primary/80">
                  {isAr ? catInfo.ar : catInfo.en}
                </span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 flex flex-col items-center gap-3 text-center text-muted-foreground"
        >
          <SearchX className="size-10 text-muted-foreground/40" />
          <p className="text-sm">
            {t?.empty ??
              (isAr
                ? "لا توجد نتائج مطابقة لخيارات البحث."
                : "No clients match your selected criteria.")}
          </p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("all");
            }}
            className="rounded-full border border-primary/50 px-4 py-2 text-xs font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            {t?.reset ?? (isAr ? "إعادة تعيين البحث" : "Reset filters")}
          </button>
        </motion.div>
      )}

      {/* Quick view modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeLogo && (
              <div className="geotech-theme fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center overflow-hidden p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveIndex(null)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl dark:border-white/10"
                >
                  <ActiveContent
                    key={activeLogo.slug}
                    logo={activeLogo}
                    isAr={isAr}
                    onClose={() => setActiveIndex(null)}
                    onPrev={() =>
                      setActiveIndex(
                        (activeIndex! - 1 + filtered.length) % filtered.length,
                      )
                    }
                    onNext={() =>
                      setActiveIndex((activeIndex! + 1) % filtered.length)
                    }
                    hasPrev={filtered.length > 1}
                    hasNext={filtered.length > 1}
                    ctaLabel={
                      t?.cta ?? (isAr ? "ابدأ مشروعاً مماثلاً" : "Start a Similar Project")
                    }
                  />
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}

function ActiveContent({
  logo,
  isAr,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  ctaLabel,
}: {
  logo: ClientLogo;
  isAr: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  ctaLabel: string;
}) {
  const catInfo = CATEGORY_INFOS[logo.category];
  const displayName = isAr ? logo.nameAr : logo.name;

  return (
    <div>
      <button
        onClick={onClose}
        className="absolute end-5 top-5 z-20 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label={isAr ? "إغلاق" : "Close"}
      >
        <X className="size-5" />
      </button>

      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.55, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.08 }}
          className="relative flex size-44 items-center justify-center sm:size-52"
        >
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.9, 1.08, 0.9] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-2 rounded-[2rem] bg-primary/20 blur-2xl"
          />
          <div className="relative z-10 flex size-full items-center justify-center rounded-3xl border border-black/5 bg-gradient-to-br from-white to-slate-100 p-4 shadow-2xl shadow-primary/15 dark:border-white/20 sm:p-5">
            <span className="relative block h-full w-full">
              <Image
                src={logo.src}
                alt={displayName}
                fill
                className="object-contain p-2 sm:p-3"
              />
            </span>
          </div>
        </motion.div>

        <h3 className="mt-6 text-xl font-bold text-foreground">{displayName}</h3>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
            {isAr ? catInfo.ar : catInfo.en}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
            <CircleCheck className="size-3" />
            {isAr ? "موثق" : "Verified"}
          </span>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-3">
        {hasPrev && (
          <button
            onClick={onPrev}
            aria-label={isAr ? "السابق" : "Previous"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
          >
            <ArrowLeft className="size-5 rtl:rotate-180" />
          </button>
        )}
        <button
          onClick={onClose}
          className="flex-1 rounded-xl bg-primary py-3 text-center text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90"
        >
          {ctaLabel}
        </button>
        {hasNext && (
          <button
            onClick={onNext}
            aria-label={isAr ? "التالي" : "Next"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
          >
            <ArrowRight className="size-5 rtl:rotate-180" />
          </button>
        )}
      </div>
    </div>
  );
}