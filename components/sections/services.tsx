'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/components/language-provider'
import { SectionHeading } from '@/components/section-heading'
import { SECTION_IDS } from '@/lib/content'
import { cn } from '@/lib/utils'

type Localized = { en: string; ar: string }
const services: {
  num: string;
  img: string;
  title: Localized;
  body: Localized;
}[] = [
  {
    num: "01",
    img: "/images/service-groundworks.png",
    title: { en: "Groundworks", ar: "أعمال الحفر والقطع" },
    body: {
      en: "Site preparation, leveling, soil compaction, cutting and backfilling.",
      ar: "تشمل تجهيز الموقع وتسوية ودمك التربة، وأعمال القطع والردم.",
    },
  },
  {
    num: "02",
    img: "/images/final/projects/new_landscaping/landscape_pool_palm_walkway GROK.jpg",
    title: { en: "Landscape Works", ar: "أعمال اللاندسكيب" },
    body: {
      en: "Site coordination and development, including execution of green and outdoor spaces.",
      ar: "نقدم حلولاً متكاملة للأعمال، تنسيق وتطوير المواقع، تشمل تنفيذ المساحات الخضراء.",
    },
  },
  {
    num: "03",
    img: "/images/service-infrastructure.png",
    title: { en: "Infrastructure Works", ar: "البنية التحتية" },
    body: {
      en: "Building essential networks: roads, water supply, sewage, electrical power, and telecommunications.",
      ar: "تنفيذ شبكات الطرق، المياه، الصرف الصحي، والكهرباء والاتصالات والمرافق.",
    },
  },
  {
    num: "04",
    img: "/images/service-concrete.png",
    title: { en: "Concrete Works", ar: "أعمال الخرسانة" },
    body: {
      en: "Reinforced concrete works including foundations, footings, columns and slabs.",
      ar: "تنفيذ جميع أنواع الخرسانة المسلحة من الأساسات والقواعد والأعمدة والأسقف.",
    },
  },
  {
    num: "05",
    img: "/images/service-steel.png",
    title: { en: "Steel Structures", ar: "الهياكل المعدنية" },
    body: {
      en: "Design, fabrication and erection of steel structures for commercial and industrial facilities.",
      ar: "تصميم وتنفيذ وتركيب الهياكل المعدنية للمباني والمنشآت التجارية والصناعية.",
    },
  },
  {
    num: "06",
    img: "/images/service-mep.png",
    title: { en: "MEP Works", ar: "كهروميكانيكا" },
    body: {
      en: "Complete installation and integration of mechanical, electrical, plumbing, and climate control systems.",
      ar: "تنفيذ جميع أعمال الميكانيكا والكهرباء والسباكة وأنظمة التبريد والتكييف والتهوية.",
    },
  },
  {
    num: "07",
    img: "/images/service-finishing.png",
    title: { en: "Finishing Works", ar: "أعمال التشطيبات" },
    body: {
      en: "High-precision interior and exterior finishing solutions delivered to the highest standards.",
      ar: "أعمال التشطيبات الداخلية والخارجية بأعلى مستويات الدقة والجودة.",
    },
  },
  {
    num: "08",
    img: "/images/service-insulation.png",
    title: { en: "Insulation Works", ar: "أعمال العزل" },
    body: {
      en: "Integrated waterproofing and thermal insulation protecting structures from moisture and heat.",
      ar: "نقدم حلول عزل متكاملة لحماية المباني والمنشآت من تأثيرات المياه والرطوبة والحرارة.",
    },
  },
];

export function Services() {
  const { t, lang } = useLanguage()
  const [active, setActive] = useState(0)
  const current = services[active]!
  const pick = (v: Localized) => v[lang]
  return (
    <section
      id={SECTION_IDS.services}
      className="relative overflow-hidden bg-muted py-20 md:py-28"
    >
      <div className="dot-grid pointer-events-none absolute start-6 top-12 z-0 size-24 text-teal/30" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading kicker={t.services.kicker} title={t.services.title} sub={t.services.sub} align="center" />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_1.1fr] lg:gap-14">
          {/* Service list */}
          <ul className="flex flex-col">
            {services.map((s, i) => (
              <li key={s.num}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={cn(
                    'group flex w-full items-center gap-5 border-b border-border py-5 text-start transition-colors duration-300',
                    active === i ? 'text-primary' : 'text-foreground hover:text-primary',
                  )}
                >
                  <span
                    className={cn(
                      'text-sm font-semibold tabular-nums transition-colors duration-300',
                      active === i ? 'text-primary' : 'text-muted-foreground',
                    )}
                  >
                    {s.num}
                  </span>
                  <span className="flex-1 text-lg font-bold tracking-tight md:text-xl">
                    {pick(s.title)}
                  </span>
                  <ArrowRight
                    className={cn(
                      'size-4 transition-all duration-300 rtl:rotate-180',
                      active === i ? 'opacity-100' : 'opacity-0 group-hover:opacity-60',
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          {/* Sticky preview panel */}
          <div className="relative lg:sticky lg:top-28 lg:h-fit">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-primary/20">
              {services.map((s, i) => (
                <motion.div
                  key={s.num}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Image
                    src={s.img}
                    alt={pick(s.title)}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="mt-5 rounded-2xl border border-border bg-card p-7"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {current.num}
                </span>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                  {pick(current.title)}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {pick(current.body)}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
