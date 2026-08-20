'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { SectionHeading } from '@/components/section-heading'
import { SECTORS } from '@/lib/sector-data'

/**
 * "More sectors" strip shown at the bottom of a sector page so visitors can
 * easily jump between industries. Excludes the currently active sector.
 */
export function SectorNav({ current, currentName }: { current: string; currentName: string }) {
  const { lang } = useLanguage()
  const others = SECTORS.filter((s) => s.key !== current)
  const heading = lang === 'ar' ? 'قطاعات أخرى' : 'Explore other sectors'

  return (
    <section className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          kicker={lang === 'ar' ? 'استكشف المزيد' : 'Keep exploring'}
          title={heading}
          align="center"
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {others.map((sector) => (
            <Link
              key={sector.key}
              href={`/${lang}/sectors/${sector.key}`}
              className={`group relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy ${
                currentName === sector.name[lang] ? 'pointer-events-none opacity-40' : ''
              }`}
            >
              <Image
                src={sector.image}
                alt={sector.name[lang]}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <h3 className="text-base font-semibold text-white md:text-lg">{sector.name[lang]}</h3>
                <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-white opacity-0 transition-all group-hover:opacity-100 group-hover:bg-teal">
                  <ArrowUpRight className="size-4 rtl:-scale-x-100" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}