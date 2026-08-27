"use client";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, X, Maximize2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/language-provider";
import {
  CLIENT_LOGOS,
  type ClientLogo,
  type ClientCategory,
} from "@/lib/clients-data";
import { cn } from "@/lib/utils";

const CATEGORIES: { id: ClientCategory | "all"; en: string; ar: string }[] = [
  { id: "all", en: "All Partners", ar: "جميع الشركاء" },
  {
    id: "government",
    en: "Government & Giga Projects",
    ar: "القطاع الحكومي والمشاريع الكبرى",
  },
  {
    id: "infrastructure",
    en: "Infrastructure & Real Estate",
    ar: "البنية التحتية والتطوير",
  },
  { id: "water-energy", en: "Water & Energy", ar: "المياه والطاقة" },
  {
    id: "contracting",
    en: "Contracting & Construction",
    ar: "المقاولات والإنشاءات",
  },
];

export function ClientsGallery() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ClientCategory | "all"
  >("all");
  const [activeLogo, setActiveLogo] = useState<ClientLogo | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (activeLogo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeLogo]);
  // Combined Search & Dynamic Category Filtering Logic
  const filtered = useMemo(() => {
    return CLIENT_LOGOS.filter((logo) => {
      const matchesSearch = logo.name
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || logo.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [query, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Back Link */}
      <Link
        href={`/${lang ?? "en"}#clients`}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-teal"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
        {isAr ? "العودة إلى الرئيسية" : "Back to home"}
      </Link>

      {/* Header */}
      <div className="mt-8 max-w-2xl">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-teal">
          <span className="h-px w-8 bg-teal" />
          {isAr ? "شركاء النجاح" : "Our Partners"}
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {isAr
            ? `أكثر من ${CLIENT_LOGOS.length} جهة تثق بجيو دريل`
            : `${CLIENT_LOGOS.length}+ Organizations Trust GEODRILL`}
        </h1>
      </div>

      {/* Controls Header: Search Input & Category Filters */}
      <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isAr ? "ابحث عن شريك..." : "Search partners..."}
            className="w-full rounded-full border border-border bg-card py-2.5 ps-11 pe-4 text-sm text-foreground shadow-sm outline-none transition-all focus:border-teal focus:ring-2 focus:ring-teal/20"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-bold transition-all duration-300",
                  isActive
                    ? "bg-teal text-navy shadow-md shadow-teal/20"
                    : "border border-border bg-card text-muted-foreground hover:border-teal/40 hover:text-foreground",
                )}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Card Grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5"
      >
        <AnimatePresence>
          {filtered.map((logo) => {
            const catObj = CATEGORIES.find((c) => c.id === logo.category);

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={logo.slug}
                onClick={() => setActiveLogo(logo)}
                className="group/card relative flex cursor-pointer flex-col before:pointer-events-none before:absolute before:inset-2 before:-z-10 before:rounded-3xl before:bg-teal/0 before:blur-xl before:transition-colors before:duration-300 hover:before:bg-teal/15"
              >
                <div
                  className={cn(
                    "relative z-10 flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card via-background to-muted/80 p-6 shadow-sm backdrop-blur-md",
                    "transition-all duration-300 ease-out",
                    "group-hover/card:-translate-y-1.5 group-hover/card:scale-[1.015] group-hover/card:border-teal/70 group-hover/card:shadow-xl group-hover/card:shadow-teal/25",
                    "dark:border-white/10 dark:from-white/[0.1] dark:via-navy/80 dark:to-white/[0.04]",
                  )}
                >
                  {/* Top-Right Expand Icon Badge */}
                  <div className="absolute end-3 top-3 z-20 flex size-7 items-center justify-center rounded-full bg-teal/10 opacity-0 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:scale-100 dark:bg-navy/10">
                    <Maximize2 className="size-3.5 text-teal dark:group-hover/card:text-navy" />
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-teal/[0.08] to-transparent transition-transform duration-700 ease-out group-hover/card:translate-x-full" />

                  {/* Logo Image */}
                  <span className="relative z-10 block h-full w-full rounded-xl border border-black/5 bg-gradient-to-br from-white to-slate-100 p-4 shadow-inner transition-transform duration-500 ease-out group-hover/card:scale-[1.035] dark:border-white/20 dark:from-white/95 dark:to-slate-200">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 18vw"
                      className="object-contain p-2"
                    />
                  </span>

                  {/* Bottom Hover Pill Badge */}
                  <div className="absolute bottom-2 translate-y-4 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
                    <span className="rounded-full bg-navy/90 px-2.5 py-1 text-[10px] font-bold text-teal shadow-md dark:bg-teal dark:text-navy">
                      {isAr ? catObj?.ar : catObj?.en}
                    </span>
                  </div>
                </div>

                {/* Company Name Under Card */}
                <span className="mt-3 line-clamp-1 text-center text-xs font-semibold text-muted-foreground transition-colors duration-300 group-hover/card:text-foreground">
                  {logo.name}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Empty Filter State */}
      {filtered.length === 0 && (
        <div className="mt-20 text-center text-sm text-muted-foreground">
          {isAr
            ? "لا توجد نتائج مطابقة لخيارات البحث."
            : "No partners match your selected criteria."}
        </div>
      )}

      {/* Interactive Quick View Modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {activeLogo && (
              <div className="fixed inset-0 z-[9999] flex h-dvh w-screen items-center justify-center overflow-hidden p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setActiveLogo(null)}
                  className="absolute inset-0 bg-navy/80 backdrop-blur-md"
                />

                {/* Modal */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl dark:border-white/10 dark:bg-navy"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setActiveLogo(null)}
                    className="absolute end-5 top-5 z-20 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label={isAr ? "إغلاق" : "Close"}
                  >
                    <X className="size-5" />
                  </button>

                  <div className="flex flex-col items-center text-center">
                    {/* Logo showcase */}
                    <motion.div
                      key={activeLogo.slug}
                      initial={{ opacity: 0, scale: 0.55, rotate: -8 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 180,
                        damping: 14,
                        delay: 0.08,
                      }}
                      className="relative flex size-48 items-center justify-center sm:size-56"
                    >
                      <motion.span
                        aria-hidden
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.9, 1.08, 0.9] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-2 rounded-[2rem] bg-teal/25 blur-2xl"
                      />
                      <motion.span
                        aria-hidden
                        initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 rounded-[2rem] border border-teal/50"
                      />
                      <div className="relative z-10 flex size-40 items-center justify-center rounded-3xl border border-black/5 bg-gradient-to-br from-white to-slate-100 p-3 shadow-2xl shadow-teal/15 dark:border-white/20 dark:from-white/95 dark:to-slate-200 sm:size-48">
                      <Image
                        src={activeLogo.src}
                        alt={activeLogo.name}
                        fill
                        className="object-contain p-5 sm:p-6"
                      />
                      </div>
                    </motion.div>

                    {/* Company Name */}
                    <h3 className="mt-6 text-xl font-bold text-foreground">
                      {activeLogo.name}
                    </h3>

                    {/* Status */}
                    <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-teal">
                      {isAr ? "شريك معتمد" : "Verified Partner"}
                    </p>

                    {/* Information */}
                    <div className="mt-6 grid w-full grid-cols-2 gap-4 rounded-xl bg-muted/50 p-4 text-start text-xs">
                      <div>
                        <span className="block text-muted-foreground">
                          {isAr ? "القطاع" : "Sector"}
                        </span>

                        <span className="font-bold text-foreground">
                          {isAr
                            ? CATEGORIES.find(
                                (c) => c.id === activeLogo.category,
                              )?.ar
                            : CATEGORIES.find(
                                (c) => c.id === activeLogo.category,
                              )?.en}
                        </span>
                      </div>

                      <div>
                        <span className="block text-muted-foreground">
                          {isAr ? "الحالة" : "Status"}
                        </span>

                        <span className="inline-flex items-center gap-1 font-bold text-teal">
                          <CheckCircle2 className="size-3" />
                          {isAr ? "نشط" : "Active"}
                        </span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link
                      href={`/${lang ?? "en"}#contact`}
                      onClick={() => setActiveLogo(null)}
                      className="mt-6 w-full rounded-xl bg-teal py-3 text-center text-sm font-bold text-navy transition-all hover:bg-teal-dark"
                    >
                      {isAr ? "بدء مشروع مماثل" : "Start a Similar Project"}
                    </Link>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
