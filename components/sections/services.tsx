'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SECTION_IDS } from '@/lib/content'

export function Services() {
  const { t } = useLanguage()
  const s = t.services

  return (
    <section id={SECTION_IDS.services} className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker={s.kicker} title={s.title} sub={s.sub} align="center" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((service, i) => (
            <Reveal key={service.key} delay={(i % 4) * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image || '/placeholder.svg'}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute start-4 top-4 rounded-md bg-navy/80 px-2 py-1 font-mono text-xs font-semibold text-teal backdrop-blur-sm">
                    {service.num}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{service.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
