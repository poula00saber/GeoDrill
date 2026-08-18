'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SECTION_IDS } from '@/lib/content'
import { cn } from '@/lib/utils'

const gallery = [
  { src: '/images/project-warehouse.png', span: 'md:col-span-2 md:row-span-2' },
  { src: '/images/service-concrete.png', span: '' },
  { src: '/images/service-steel.png', span: '' },
  { src: '/images/service-excavation.png', span: '' },
  { src: '/images/service-finishing.png', span: '' },
  { src: '/images/sector-industrial.png', span: 'md:col-span-2' },
  { src: '/images/service-infrastructure.png', span: '' },
]

export function Projects() {
  const { t } = useLanguage()
  const p = t.projects

  return (
    <section id={SECTION_IDS.projects} className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading kicker={p.kicker} title={p.title} sub={p.sub} align="center" />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((item, i) => (
            <Reveal
              key={item.src}
              delay={(i % 4) * 60}
              className={cn('h-full', item.span)}
            >
              <div className="group relative h-full overflow-hidden rounded-2xl">
                <Image
                  src={item.src || '/placeholder.svg'}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-navy/0 transition-colors group-hover:bg-navy/20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
