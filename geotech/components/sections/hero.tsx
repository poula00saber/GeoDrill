// ============================================================================
// geotech/components/sections/hero.tsx
//
// Changes from the previous version, and why:
//
// 1. Headline is now 3 lines (dict.hero.titleLine1 / titleLine2 / titleAccent)
//    to match the reference layout, instead of 2 (title / titleAccent).
//    Update en.json / ar.json accordingly — see the dict shape note below.
//
// 2. Background is now a small rotating carousel with dot indicators
//    (matching the reference's slide dots), not a single static image.
//    IMPORTANT: `HERO_IMAGES` below is a placeholder array — replace with
//    real GEODRILL field photography, not the dramatic golden-hour stock
//    shot from the reference. A few real, high-quality site photos rotating
//    is more credible than one striking photo that isn't actually yours.
//
// 3. The legibility scrim now flips direction based on `isRtl`, instead of
//    always darkening the left side. Previously, Arabic rendering would
//    place the headline on the brighter side of the photo since the scrim
//    direction was hardcoded — same failure mode flagged on the homepage
//    hero, just reappearing here from the same root cause (a one-sided
//    gradient assumption).
//
// 4. Removed `whitespace-nowrap` on headline lines — it forces overflow or
//    forced-shrink on longer Arabic strings. Using `text-balance` instead.
//
// 5. Secondary CTA now also carries an arrow, matching the reference (both
//    buttons had one, previously only the primary did).
// ============================================================================

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown, Activity } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { Button } from "@/geotech/components/ui/button";
import { ContourLines } from "@/geotech/components/geological/background";
import { cn } from "@/geotech/lib/utils";

// Placeholder — replace with real GEODRILL field photos (e.g. from the
// geotechnical-investigation, geophysical-survey, or mining-exploration
// galleries already sourced). Keep to 3-4 images; more dilutes the carousel.
const HERO_IMAGES = [
  "/images/geotech-hero1.jpg",
  "/images/geotech-hero2.jpg",
  "/images/geotech-hero3.jpg",
];

const SLIDE_INTERVAL_MS = 6000;

export function Hero() {
  const { theme } = useTheme();
  const { dict, locale } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActiveSlide((i) => (i + 1) % HERO_IMAGES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);

  if (!dict) return null;

  const isRtl = locale === "ar";
  const baseHref = `/geotechnical/${locale}`;
  const isDark = theme === "dark" || theme === "system";

  // Scrim darkens whichever side the headline actually renders on. Content
  // sits on the "start" side (left in LTR, right in RTL) — the gradient
  // must track that, not assume LTR.
  const scrimDirection = isRtl ? "to-l" : "to-r";
  const sideOverlayPosition = isRtl ? "inset-y-0 right-0" : "inset-y-0 left-0";
  const sideOverlayDirection = isRtl ? "to-l" : "to-r";

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-background"
    >
      {/* Background image carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_IMAGES[activeSlide]})` }}
          />
        </AnimatePresence>

        {/* Overlay gradients — direction now RTL-aware, see note above */}
        {isDark ? (
          <>
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/15",
                isRtl && "bg-gradient-to-l",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
            <div
              className={cn(
                "absolute w-1/2 bg-gradient-to-r from-black/60 to-transparent",
                sideOverlayPosition,
                isRtl && "bg-gradient-to-l",
              )}
            />
          </>
        ) : (
          <>
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-white/5",
                isRtl && "bg-gradient-to-l",
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white/40" />
            <div
              className={cn(
                "absolute w-1/2 bg-gradient-to-r from-white/50 to-transparent",
                sideOverlayPosition,
                isRtl && "bg-gradient-to-l",
              )}
            />
          </>
        )}
      </div>

      {/* Technical grid overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute inset-0 bg-grid opacity-20"
      />
      <ContourLines className="text-primary" opacity={0.08} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary sm:text-xs">
              {dict.hero.eyebrow}
            </span>
          </motion.div>

          {/* Headline — now 3 lines: two neutral, one accent */}
          <h1
            className={cn(
              "text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl",
              isDark ? "text-white" : "text-gray-900",
            )}
          >
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="block"
            >
              {dict.hero.titleLine1}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="block"
            >
              {dict.hero.titleLine2}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="block text-primary"
            >
              {dict.hero.titleAccent}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className={cn(
              "mt-6 max-w-xl text-pretty text-base leading-relaxed sm:text-lg",
              isDark ? "text-muted-foreground" : "text-gray-700",
            )}
          >
            {dict.hero.description}
          </motion.p>

          {/* CTAs — both now carry an arrow, matching the reference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href={`${baseHref}/services`}>
                {dict.hero.ctaPrimary}
                <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="group border-white/40 bg-background/10 text-white backdrop-blur-sm hover:bg-white/10"
            >
              <a href={`${baseHref}/contact`}>
                {dict.hero.ctaSecondary}
                <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Technical HUD — unchanged from previous version */}
        <motion.div
          initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-12 hidden md:block"
        >
          <div className="inline-flex flex-col gap-3 rounded-lg border border-border/60 bg-surface/50 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2 border-b border-border/40 pb-2">
              <Activity className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {dict.hero.hud.title}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              <HudItem
                label={dict.hero.hud.investigation}
                value={dict.hero.hud.investigationValue}
              />
              <HudItem
                label={dict.hero.hud.dataStatus}
                value={dict.hero.hud.dataStatusValue}
                pulse
              />
              <HudItem
                label={dict.hero.hud.siteType}
                value={dict.hero.hud.siteTypeValue}
              />
              <HudItem
                label={dict.hero.hud.region}
                value={dict.hero.hud.regionValue}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Slide dot indicators — bottom-start, matches the reference */}
      <div
        className={cn(
          "absolute bottom-6 z-10 flex items-center gap-2",
          isRtl
            ? "right-4 sm:right-6 lg:right-8"
            : "left-4 sm:left-6 lg:left-8",
        )}
      >
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === activeSlide
                ? "w-6 bg-primary"
                : "w-1.5 bg-white/40 hover:bg-white/60",
            )}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="font-mono text-[10px] uppercase tracking-wider">
            {dict.hero.scroll}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 z-[5] h-32">
        <GeologicalLayerTransition />
      </div>
    </section>
  );
}

function HudItem({
  label,
  value,
  pulse,
}: {
  label: string;
  value: string;
  pulse?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70">
        {label}
      </span>
      <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-foreground">
        {pulse && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        )}
        {value}
      </span>
    </div>
  );
}

function GeologicalLayerTransition() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      fill="none"
    >
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.4 }}
        transition={{ duration: 2, delay: 1.5 }}
        d="M0,40 Q300,20 600,40 T1200,40"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
      />
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 2, delay: 1.8 }}
        d="M0,70 Q300,50 600,70 T1200,70"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
      />
      <motion.path
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 2, delay: 2.1 }}
        d="M0,100 Q300,80 600,100 T1200,100"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
      />
    </svg>
  );
}
