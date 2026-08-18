'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { CountUp } from '@/components/count-up'
import { SectionHeading } from '@/components/section-heading'
import { SECTION_IDS } from '@/lib/content'

export function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section id={SECTION_IDS.about} className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[5/6]">
            <Image
              src="/images/about-team.png"
              alt="GeoDrill engineers reviewing plans on site"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
          </div>
          <div
            className="dot-grid pointer-events-none absolute -bottom-6 -end-6 -z-10 hidden h-32 w-32 text-teal/40 md:block"
            aria-hidden
          />
        </Reveal>

        <div className="flex flex-col gap-8">
          <SectionHeading kicker={a.kicker} title={a.title} />
          <Reveal delay={120}>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{a.body}</p>
          </Reveal>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
            {a.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 90} className="bg-card">
                <div className="flex flex-col gap-1 p-6">
                  <span className="text-3xl font-bold text-foreground md:text-4xl">
                    <CountUp end={stat.value} suffix={stat.suffix} format={stat.value < 1000} />
                  </span>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
