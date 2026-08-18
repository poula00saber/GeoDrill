'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
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
              <motion.li
                key={`${name}-${i}`}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className="group/hover relative flex h-16 shrink-0 cursor-default select-none items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl border border-border bg-card px-7 transition-[border-color,box-shadow,background-color] duration-300 hover:border-primary/60 hover:bg-primary/[0.04] hover:shadow-lg hover:shadow-primary/10"
              >
                {/* Logo slot — drop an <Image src="/clients/xxx.png" /> here later */}
                <span className="flex size-6 items-center justify-center rounded-md bg-muted text-[10px] font-bold uppercase text-muted-foreground transition-colors group-hover/hover:bg-primary group-hover/hover:text-primary-foreground">
                  {name.charAt(0)}
                </span>
                <span className="text-sm font-medium text-foreground/80 transition-colors duration-300 group-hover/hover:text-primary">
                  {name}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
