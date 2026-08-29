'use client'

import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export function Certifications() {
  const { t } = useLanguage()
  const c = t.certs

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <div className="flex flex-col gap-6">
            <SectionHeading kicker={c.kicker} title={c.title} />
            <Reveal delay={140}>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{c.line}</p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {c.items.map((cert, i) => (
              <Reveal key={cert.code} delay={i * 90}>
                <div className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-teal hover:bg-teal hover:text-navy hover:shadow-xl hover:shadow-teal/20">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-teal-dark transition-colors duration-300 group-hover:bg-navy group-hover:text-teal">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                      <path d="m8.5 13.5-1.5 7 5-3 5 3-1.5-7" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-mono text-sm font-bold text-foreground transition-colors duration-300 group-hover:text-navy">{cert.code}</p>
                    <p className="mt-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-navy/80">{cert.name}</p>
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
