'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown, Activity, MapPin } from 'lucide-react';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { Button } from '@/geotech/components/ui/button';
import { ContourLines } from '@/geotech/components/geological/background';
import { siteImages } from '@/geotech/lib/images';

export function Hero() {
  const { dict, locale } = useLanguage();
  if (!dict) return null;

  const isRtl = locale === 'ar';

  return (
    <section id="hero" className="relative min-h-[100svh] w-full overflow-hidden bg-background">
      {/* Background image with mask reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${siteImages.hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/10" />
      </motion.div>

      {/* Technical grid overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute inset-0 bg-grid opacity-20"
      />

      {/* Contour lines */}
      <ContourLines className="text-primary" opacity={0.08} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-primary sm:text-xs">
              {dict.hero.eyebrow}
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="space-y-1 text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.6 }}
              className="block whitespace-nowrap"
            >
              {dict.hero.title}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2 }}
              className="block whitespace-nowrap text-primary"
            >
              {dict.hero.titleAccent}
            </motion.span>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg"
          >
            {dict.hero.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              className="group bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="#services">
                {dict.hero.ctaPrimary}
                <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border bg-background/50 backdrop-blur-sm hover:bg-surface"
            >
              <a href="#contact">{dict.hero.ctaSecondary}</a>
            </Button>
          </motion.div>
        </div>

        {/* Technical HUD */}
        <motion.div
          initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
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
              <HudItem label={dict.hero.hud.investigation} value={dict.hero.hud.investigationValue} />
              <HudItem label={dict.hero.hud.dataStatus} value={dict.hero.hud.dataStatusValue} pulse />
              <HudItem label={dict.hero.hud.siteType} value={dict.hero.hud.siteTypeValue} />
              <HudItem label={dict.hero.hud.region} value={dict.hero.hud.regionValue} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="font-mono text-[10px] uppercase tracking-wider">{dict.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </div>
      </motion.div>

      {/* Geological layer transition at bottom */}
      <div className="absolute inset-x-0 bottom-0 z-[5] h-32">
        <GeologicalLayerTransition />
      </div>
    </section>
  );
}

function HudItem({ label, value, pulse }: { label: string; value: string; pulse?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/70">{label}</span>
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
