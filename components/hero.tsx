"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, useMotionValue, animate, type PanInfo } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

const SLIDES = [
  {
    src: "/images/hero-facade.png",
    alt: "Finished building facade at golden hour",
  },
  { src: "/images/skyline.png", alt: "Construction project skyline at dusk" },
  {
    src: "/images/service-groundworks.png",
    alt: "Heavy ground works and excavation on site",
  },
  {
    src: "/images/service-concrete.png",
    alt: "Concrete placing and formwork piling",
  },
  {
    src: "/images/service-excavation.png",
    alt: "Deep excavation and drilling machinery",
  },
];

const AUTOPLAY_MS = 4000;
const PAUSE_AFTER_MANUAL_MS = 6000;
const SPRING = { type: "spring", stiffness: 220, damping: 28 } as const;

export function Hero() {
  const { t } = useLanguage();
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const indexRef = useRef(0);
  const x = useMotionValue(0);

  // Measure container width accurately on mount & window resize
  useEffect(() => {
    const updateWidth = () => {
      const w = window.innerWidth;
      setWidth(w);
      x.set(-indexRef.current * w);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [x]);

  const wrap = useCallback(
    (i: number) => (i + SLIDES.length) % SLIDES.length,
    [],
  );

  const animateTo = useCallback(
    (i: number) => {
      if (!width) return;
      const next = wrap(i);
      indexRef.current = next;
      setIndex(next);
      animate(x, -next * width, SPRING);
    },
    [width, x, wrap],
  );

  // Manual trigger (swipes/clicks) - pauses autoplay temporarily
  const handleManualNav = useCallback(
    (dir: 1 | -1) => {
      setPaused(true);
      animateTo(indexRef.current + dir);
    },
    [animateTo],
  );

  // Autoplay handler (shifts strictly every 4 seconds)
  useEffect(() => {
    if (paused || !width) return undefined;
    const id = setInterval(() => {
      animateTo(indexRef.current + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, width, animateTo]);

  // Resume autoplay 6 seconds after a manual user drag
  useEffect(() => {
    if (!paused) return;
    const id = setTimeout(() => setPaused(false), PAUSE_AFTER_MANUAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (!width) return;
      const offset = info.offset.x;
      const velocity = info.velocity.x;

      if (offset < -width * 0.15 || velocity < -400) {
        handleManualNav(1);
      } else if (offset > width * 0.15 || velocity > 400) {
        handleManualNav(-1);
      } else {
        animateTo(indexRef.current);
      }
    },
    [width, animateTo, handleManualNav],
  );

  return (
    <section
      id="home"
      data-hero-banner
      className="relative h-svh min-h-[580px] overflow-hidden bg-navy text-white select-none touch-pan-y"
    >
      {/* Draggable Background Track - Forced to LTR */}
      {width > 0 && (
        <div dir="ltr" className="absolute inset-0">
          <motion.div
            drag="x"
            dragConstraints={{ left: -(SLIDES.length - 1) * width, right: 0 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
            style={{ x }}
            className="flex size-full cursor-grab active:cursor-grabbing"
          >
            {SLIDES.map((slide, i) => {
              const isActive = index === i;
              return (
                <div
                  key={slide.src}
                  className="relative h-svh w-screen shrink-0 overflow-hidden"
                >
                  <motion.div
                    className="relative size-full"
                    initial={{ scale: 1 }}
                    animate={{ scale: isActive ? 1.08 : 1 }}
                    transition={{
                      duration: isActive ? AUTOPLAY_MS / 1000 : 0.4,
                      ease: isActive ? "linear" : "easeOut",
                    }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      sizes="100vw"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </div>
      )}

      {/* ── Softened Overlays ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/50 to-transparent rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/90 via-transparent to-navy/30" />

      {/* ── Fixed Text & Hero Content ── */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pt-20 pb-12 md:px-8">
        <div className="pointer-events-auto max-w-2xl">
          <span className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-200/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-amber-200 duration-700">
            <span className="size-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_2px_rgba(252,211,77,0.6)]" />
            {t.hero.tag}
          </span>

          <h1
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-4 text-balance text-3xl font-extrabold leading-snug tracking-tight duration-700 sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ animationDelay: "120ms" }}
          >
            {t.hero.headline}
          </h1>

          <p
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-4 max-w-xl min-h-[6.5rem] text-sm leading-relaxed text-white/85 duration-700 sm:text-base md:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {t.hero.sub}
          </p>

          <div
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-6 flex flex-wrap items-center gap-3 duration-700"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 hover:brightness-105"
            >
              {t.cta.services}
              <ArrowUpRight className="size-4 transition-transform duration-250 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-lg hover:shadow-black/20"
            >
              {t.cta.projects}
            </a>
          </div>

          {/* Trust Badges */}
          <div
            className="animate-in fade-in fill-mode-both mt-8 rtl:mt-14 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-5 duration-1000"
            style={{ animationDelay: "520ms" }}
          >
            {t.hero.badges.map((b) => (
              <span
                key={b}
                className="flex items-center gap-2 rounded-full px-2 py-0.5 text-xs font-medium text-white/80 transition-colors duration-250 hover:bg-white/10 hover:text-white sm:text-sm"
              >
                <span className="flex size-4 items-center justify-center rounded-full border border-amber-200/50 bg-amber-200/20 text-[9px] text-amber-200">
                  ✓
                </span>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 end-7 z-10 hidden items-center gap-2 font-mono text-xs tracking-widest text-white/70 md:flex">
        <span className="text-amber-200">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-white/40" />
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* Smooth Scroll Arrow Button */}
      <a
        href="#about"
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-white/5 p-2.5 text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-amber-200/50 hover:bg-white/15 hover:text-amber-200 lg:flex"
      >
        <ChevronDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
