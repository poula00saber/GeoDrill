'use client'

import { useLanguage } from '@/components/language-provider'
import { SectionHeading } from '@/components/section-heading'
import { SECTION_IDS } from '@/lib/content'

export function Clients() {
  const { t } = useLanguage()
  const c = t.clients
  const row = [...c.list, ...c.list]

  return (
    <section id={SECTION_IDS.clients} className="bg-muted py-20 md:py-28">
      <div className="mx-auto mb-12 max-w-7xl px-6">
        <SectionHeading kicker={c.kicker} title={c.title} sub={c.sub} align="center" />
      </div>

      <div className="relative flex flex-col gap-4">
        <div
          className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-muted to-transparent rtl:bg-gradient-to-l"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-muted to-transparent rtl:bg-gradient-to-r"
          aria-hidden
        />

        <div className="flex overflow-hidden">
          <ul className="marquee-track flex shrink-0 items-center gap-4">
            {row.map((name, i) => (
              <li
                key={`${name}-${i}`}
                className="flex h-16 shrink-0 items-center whitespace-nowrap rounded-xl border border-border bg-card px-7 text-sm font-medium text-foreground/80"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
