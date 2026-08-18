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
            <Reveal delay={200}>
              <ul className="flex flex-wrap gap-2">
                {c.extra.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-muted px-4 py-2 text-sm text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {c.items.map((cert, i) => (
              <Reveal key={cert.code} delay={i * 90}>
                <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-lg hover:shadow-navy/5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-teal-dark">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                      <path d="m8.5 13.5-1.5 7 5-3 5 3-1.5-7" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-mono text-sm font-bold text-foreground">{cert.code}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{cert.name}</p>
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
