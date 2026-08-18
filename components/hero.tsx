'use client'

import Image from 'next/image'
import { ArrowUpRight, ArrowDown } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative min-h-svh overflow-hidden bg-navy text-white">
      {/* Photo */}
      <Image
        src="/images/hero-facade.png"
        alt="Modern ornamental building facade in Saudi Arabia at golden hour"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Directional navy gradient — solid on the text side */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/92 to-navy/20 rtl:bg-gradient-to-l" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/40" />

      {/* Diagonal teal seam accent */}
      <div className="absolute inset-y-0 start-[46%] hidden w-1.5 -skew-x-12 bg-primary/70 shadow-[0_0_40px_var(--teal)] lg:block rtl:skew-x-12" />

      {/* Dot-grid brand motif */}
      <div className="dot-grid absolute end-6 top-24 size-40 text-primary/40" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-svh max-w-7xl flex-col justify-center px-5 pt-28 pb-16 md:px-8">
        <div className="max-w-2xl">
          <span className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary duration-700">
            <span className="size-1.5 rounded-full bg-primary" />
            {t.hero.tag}
          </span>

          <h1
            className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-balance duration-700 md:text-6xl lg:text-7xl"
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
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:brightness-105"
            >
              {t.cta.services}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" />
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
            style={{ animationDelay: '520ms' }}
          >
            {t.hero.badges.map((b) => (
              <span key={b} className="flex items-center gap-2 text-sm font-medium text-white/70">
                <span className="flex size-5 items-center justify-center rounded-full border border-primary/50 text-[10px] text-primary">
                  ✓
                </span>
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute inset-x-0 bottom-6 z-10 mx-auto hidden w-fit animate-bounce text-white/50 lg:block"
      >
        <ArrowDown className="size-5" />
      </a>
    </section>
  )
}
