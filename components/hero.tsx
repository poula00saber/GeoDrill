"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { useLanguage } from "@/components/language-provider";

/**
 * Cinematic drag-driven slideshow.
 * Dragging the photo TRANSLATES it with the pointer while it zooms out and
 * fades; the neighbour in the direction of travel slides in from the edge
 * underneath it. Beyond the threshold it commits to the next/previous image.
 * Only `transform` + `opacity` animate (GPU-accelerated, 60fps).
 */

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
] as const;

const AUTOPLAY_MS = 5000;
const PAUSE_AFTER_MANUAL_MS = 6000;

/* Slow Ken Burns drift applied to every visible slide */
const KB = ["hero-kb-1", "hero-kb-2", "hero-kb-3", "hero-kb-4"];

export function Hero() {
  const { t } = useLanguage();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [kbOffset, setKbOffset] = useState(0);
  const [width, setWidth] = useState(0);

  /* Drag offset of the foreground (current) slide */
  const x = useMotionValue(0);

  /* Measure viewport width once stable (drives thresholds & transforms) */
  useEffect(() => {
    const measure = () => setWidth(window.innerWidth);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const THRESHOLD = Math.max(50, width * 0.2);
  const W = Math.max(1, width);

  /* While dragging: the CURRENT photo follows the pointer 1:1, zooms out
     and fades out as it travels. */
  const dragScale = useTransform(x, (v: number) =>
    Math.max(0.82, 1 - (Math.abs(v) / W) * 0.28),
  );
  const dragOpacity = useTransform(x, (v: number) =>
    Math.max(0, 1 - Math.abs(v) / (W * 0.9)),
  );

  /* The incoming neighbour slides in from the opposite edge, catching up
     to center as the pointer travels, and fades in as it approaches. */
  const nextX = useTransform(x, (v: number) => (v < 0 ? W + v : W));
  const nextOpacity = useTransform(x, (v: number) =>
    v < 0 ? Math.min(1, Math.abs(v) / THRESHOLD) : 0,
  );
  const prevX = useTransform(x, (v: number) => (v > 0 ? -W + v : -W));
  const prevOpacity = useTransform(x, (v: number) =>
    v > 0 ? Math.min(1, v / THRESHOLD) : 0,
  );

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length),
    [],
  );

  /* Autoplay: advance every 5s unless user is currently interacting */
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  /* Resume autoplay after a manual interaction */
  useEffect(() => {
    if (!paused) return;
    const id = setTimeout(() => setPaused(false), PAUSE_AFTER_MANUAL_MS);
    return () => clearTimeout(id);
  }, [paused]);

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setPaused(true);
      setKbOffset((o) => o + 1);
      x.jump(0); // centre the incoming photo in place
      if (dir === 1) next();
      else prev();
    },
    [x, next, prev],
  );

  /* Release logic: commit if dragged far enough, otherwise spring back */
  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const delta = info.offset.x;
      if (delta <= -THRESHOLD) goTo(1);
      else if (delta >= THRESHOLD) goTo(-1);
      else x.set(0); // snapped back
    },
    [x, THRESHOLD, goTo],
  );

  /* Keeps the slideshow running smoothly during a drag */
  const onDrag = (_: unknown, info: PanInfo) => {
    x.set(info.offset.x);
  };

  const prevIndex = (index - 1 + SLIDES.length) % SLIDES.length;
  const nextIndex = (index + 1) % SLIDES.length;

  return (
    <section
      id="home"
      className="relative h-svh min-h-[520px] overflow-hidden bg-navy text-white select-none"
    >
      {/* ── Drag stack ── */}
      {/* background: next image, slides in from the right as you drag left */}
      <motion.div
        style={{ x: nextX, opacity: nextOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src={SLIDES[nextIndex].src}
          alt={SLIDES[nextIndex].alt}
          fill
          sizes="100vw"
          loading="lazy"
          className={`object-cover ${KB[(index + 1) % KB.length]}`}
        />
      </motion.div>

      {/* background: previous image, slides in from the left as you drag right */}
      <motion.div
        style={{ x: prevX, opacity: prevOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <Image
          src={SLIDES[prevIndex].src}
          alt={SLIDES[prevIndex].alt}
          fill
          sizes="100vw"
          loading="lazy"
          className={`object-cover ${KB[(index - 1 + KB.length) % KB.length]}`}
        />
      </motion.div>

      {/* foreground: current slide — translates 1:1 with the pointer, zooms + fades */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -width, right: width }}
        dragElastic={0.05}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        style={{ x, scale: dragScale, opacity: dragOpacity }}
        className="absolute inset-0"
      >
        <Image
          src={SLIDES[index].src}
          alt={SLIDES[index].alt}
          fill
          sizes="100vw"
          priority
          loading="eager"
          className={`object-cover ${KB[index % KB.length]}`}
        />
      </motion.div>

      {/* ── Premium overlays ── */}
      {/* left→right navy depth (text side stays solid), mirrored for RTL */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/25 rtl:bg-gradient-to-l pointer-events-none" />
      {/* bottom-up depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-navy/40 pointer-events-none" />
      {/* subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(4,10,14,0.55) 100%)",
        }}
      />
      {/* soft radial glow behind the text */}
      <div className="absolute start-0 top-0 h-full w-2/3 bg-[radial-gradient(ellipse_at_left,rgba(15,181,185,0.18),transparent_60%)] pointer-events-none" />
      {/* dot-grid brand motif */}
      <div
        className="dot-grid absolute end-6 top-24 size-40 text-amber-200/30 pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pt-28 pb-16 md:px-8 pointer-events-none">
        <div className="max-w-2xl pointer-events-auto">
          <span className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-200/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200 duration-700">
            <span className="size-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_2px_rgba(252,211,77,0.6)]" />
            {t.hero.tag}
          </span>

          <h1
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance duration-700 md:text-6xl lg:text-7xl"
            style={{ animationDelay: "120ms" }}
          >
            {t.hero.headline}
          </h1>

          <p
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-6 max-w-xl text-base leading-relaxed text-white/75 duration-700 md:text-lg"
            style={{ animationDelay: "240ms" }}
          >
            {t.hero.sub}
          </p>

          <div
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-9 flex flex-wrap items-center gap-3 duration-700"
            style={{ animationDelay: "360ms" }}
          >
            <a
              href="#services"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40 hover:brightness-105"
            >
              {t.cta.services}
              <ArrowUpRight className="size-4 transition-transform duration-250 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:translate-x-0" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:bg-white/10"
            >
              {t.cta.projects}
            </a>
          </div>

          {/* Trust strip */}
          <div
            className="animate-in fade-in fill-mode-both mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 duration-1000"
            style={{ animationDelay: "520ms" }}
          >
            {t.hero.badges.map((b) => (
              <span
                key={b}
                className="flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium text-white/70 transition-colors duration-250 hover:bg-white/5 hover:text-white"
              >
                <span className="flex size-5 items-center justify-center rounded-full border border-amber-200/50 bg-amber-200/10 text-[10px] text-amber-200">
                  ✓
                </span>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 end-7 z-10 hidden items-center gap-2 font-mono text-xs tracking-widest text-white/50 md:flex pointer-events-none">
        <span className="text-amber-200">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-white/30" />
        <span>{String(SLIDES.length).padStart(2, "0")}</span>
      </div>

      {/* Scroll mouse indicator */}
      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute inset-x-0 bottom-6 z-10 mx-auto hidden w-fit text-white/70 transition-opacity duration-300 hover:text-white lg:block"
      >
        <span className="scroll-mouse mx-auto" />
      </a>
    </section>
  );
}
