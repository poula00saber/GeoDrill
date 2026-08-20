'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { motion, useMotionValue, useTransform, animate, type PanInfo } from 'framer-motion'
import { useLanguage } from '@/components/language-provider'

/**
 * Premium full-bleed drag carousel hero.
 * All slides are laid edge-to-edge (each exactly 100vw) so there are never any
 * gaps or crops � the photos fill the viewport continuously. Dragging the row
 * translates every image; offset slides automatically zoom out and fade while
 * the incoming one slides in and catches up to center.
 */

const SLIDES = [
  { src: '/images/hero-facade.png', alt: 'Finished building facade at golden hour' },
  { src: '/images/skyline.png', alt: 'Construction project skyline at dusk' },
  { src: '/images/service-groundworks.png', alt: 'Heavy ground works and excavation on site' },
  { src: '/images/service-concrete.png', alt: 'Concrete placing and formwork piling' },
  { src: '/images/service-excavation.png', alt: 'Deep excavation and drilling machinery' },
]

const AUTOPLAY_MS = 5000
const PAUSE_AFTER_MANUAL_MS = 6000
const KB = ['hero-kb-1', 'hero-kb-2', 'hero-kb-3', 'hero-kb-4']

export function Hero() {
  const { t } = useLanguage()
  const [width, setWidth] = useState(0)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const indexRef = useRef(0)
  /* x = full track offset (-index*width + live drag). Drag writes it directly. */
  const x = useMotionValue(0)
  const SPRING = { type: 'spring', stiffness: 220, damping: 28 } as const

  /* Measure the viewport (drive thresholds + per-slide transforms) */
  useEffect(() => {
    const measure = () => setWidth(window.innerWidth)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const wrap = useCallback((i: number) => (i + SLIDES.length) % SLIDES.length, [])

  /* Snap the track so a given slide lands centered (returns to it from any offset) */
  const animateTo = useCallback(
    (i: number) => {
      if (!width) return
      const next = wrap(i)
      animate(x, -next * width, SPRING)
      indexRef.current = next
      setIndex(next)
    },
    [width, x],
  )

  const pauseAndGo = useCallback(
    (dir: 1 | -1) => {
      if (!width) return
      setPaused(true)
      animateTo(indexRef.current + dir)
    },
    [width, animateTo],
  )

  /* Autoplay every 5s unless the user is interacting */
  useEffect(() => {
    if (paused) return undefined
    const id = setInterval(() => pauseAndGo(1), AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, pauseAndGo])

  /* Resume autoplay shortly after a manual interaction */
  useEffect(() => {
    if (!paused) return
    const id = setTimeout(() => setPaused(false), PAUSE_AFTER_MANUAL_MS)
    return () => clearTimeout(id)
  }, [paused])

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (!width) return
      const dx = info.offset.x
      if (dx <= -width * 0.2) animateTo(indexRef.current + 1)
      else if (dx >= width * 0.2) animateTo(indexRef.current - 1)
      else animate(x, -indexRef.current * width, SPRING)
    },
    [width, x, animateTo],
  )

  return (
    <section
      id="home"
      className="relative h-svh min-h-[520px] overflow-hidden bg-navy text-white select-none"
    >
      {/* -- Full-bleed draggable track (photos never crop: all slides fill 100vw) -- */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -(SLIDES.length - 1) * width, right: 0 }}
        dragElastic={0.12}
        onDragEnd={onDragEnd}
        style={{ x }}
        className="absolute inset-0 flex"
      >
        {SLIDES.map((slide, i) => {
          /* distance of slide i from the centered viewport */
          const slideRel = useTransform(x, (v: number) => v + i * width)
          const dist = useTransform(slideRel, (d: number) => Math.abs(d))
          const scale = useTransform(dist, (d: number) =>
            Math.max(0.9, 1 - d / Math.max(1, width * 0.9) * 0.1),
          )
          const opacity = useTransform(dist, (d: number) =>
            Math.max(0.55, 1 - d / Math.max(1, width * 0.9)),
          )
          return (
            <motion.div
              key={slide.src}
              style={{ scale, opacity }}
              className="relative h-svh w-screen shrink-0 overflow-hidden"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`object-cover ${KB[i % KB.length]}`}
              />
            </motion.div>
          )
        })}
      </motion.div>

      {/* ── Premium overlays ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/25 rtl:bg-gradient-to-l" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/85 via-transparent to-navy/40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(4,10,14,0.55) 100%)',
        }}
      />
      <div className="pointer-events-none absolute start-0 top-0 h-full w-2/3 bg-[radial-gradient(ellipse_at_left,rgba(15,181,185,0.18),transparent_60%)]" />
      <div className="dot-grid pointer-events-none absolute end-6 top-24 size-40 text-amber-200/30" aria-hidden />

      {/* ── Fixed, staged text ── */}
      <div className="pointer-events-none relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pt-28 pb-16 md:px-8">
        <div className="pointer-events-auto max-w-2xl">
          <span className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both inline-flex items-center gap-2 rounded-full border border-amber-200/40 bg-amber-200/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-200 duration-700">
            <span className="size-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_2px_rgba(252,211,77,0.6)]" />
            {t.hero.tag}
          </span>

          <h1
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight duration-700 md:text-6xl lg:text-7xl"
            style={{ animationDelay: '120ms' }}
          >
            {t.hero.headline}
          </h1>

          <p
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-6 max-w-xl text-base leading-relaxed text-white/75 duration-700 md:text-lg"
            style={{ animationDelay: '240ms' }}
          >
            {t.hero.sub}
          </p>

          <div
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-9 flex flex-wrap items-center gap-3 duration-700"
            style={{ animationDelay: '360ms' }}
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
              className="inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-250 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg hover:shadow-black/20"
            >
              {t.cta.projects}
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="animate-in fade-in fill-mode-both mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 duration-1000"
            style={{ animationDelay: '520ms' }}
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
      <div className="absolute bottom-8 end-7 z-10 hidden items-center gap-2 font-mono text-xs tracking-widest text-white/50 md:flex">
        <span className="text-amber-200">{String(index + 1).padStart(2, '0')}</span>
        <span className="h-px w-8 bg-white/30" />
        <span>{String(SLIDES.length).padStart(2, '0')}</span>
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
  )
}
