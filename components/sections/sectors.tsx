'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { cn } from '@/lib/utils'

export function Sectors() {
  const { t } = useLanguage()
  const s = t.sectors

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker={s.kicker} title={s.title} sub={s.sub} align="center" />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {s.items.map((sector, i) => (
            <Reveal
              key={sector.key}
              delay={(i % 4) * 70}
              className={cn(
                // First card spans two columns on larger screens for visual rhythm
                i === 0 && 'md:col-span-2 md:row-span-1',
              )}
            >
              <article className="group relative h-full min-h-44 overflow-hidden rounded-2xl">
                <Image
                  src={sector.image || '/placeholder.svg'}
                  alt={sector.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/25 to-transparent transition-colors group-hover:from-navy/90" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <h3 className="text-lg font-semibold text-background">{sector.name}</h3>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/0 text-background transition-all group-hover:bg-teal ltr:group-hover:translate-x-0 rtl:group-hover:-translate-x-0">
                    <svg className="h-4 w-4 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
