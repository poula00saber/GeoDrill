'use client'

import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import type { JSX } from 'react'

const icons: Record<string, JSX.Element> = {
  experience: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 3 7v6c0 5 3.5 8 9 9 5.5-1 9-4 9-9V7Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2 15 8.5 22 9.5 17 14.5 18.5 21.5 12 18 5.5 21.5 7 14.5 2 9.5 9 8.5Z" />
    </svg>
  ),
  innovative: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z" />
    </svg>
  ),
  safety: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  ),
  ontime: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
}

export function WhyUs() {
  const { t } = useLanguage()
  const w = t.why

  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading kicker={w.kicker} title={w.title} />
            <Reveal delay={140}>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{w.intro}</p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {w.features.map((f, i) => (
              <Reveal key={f.key} delay={i * 80}>
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-navy/5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-teal-dark transition-colors group-hover:bg-teal group-hover:text-primary-foreground [&_svg]:h-5 [&_svg]:w-5">
                    {icons[f.key]}
                  </span>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
