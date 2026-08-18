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

const services: { num: string; img: string; title: Localized; body: Localized }[] = [
  {
    num: '01',
    img: '/images/service-groundworks.png',
    title: { en: 'Ground Works', ar: 'الأعمال الترابية' },
    body: {
      en: 'Site preparation, leveling, soil compaction, cutting and backfilling executed with precision survey control.',
      ar: 'تجهيز المواقع والتسوية ودك التربة والقطع والردم بدقة مساحية عالية.',
    },
  },
  {
    num: '02',
    img: '/images/service-excavation.png',
    title: { en: 'Excavation Works', ar: 'أعمال الحفر' },
    body: {
      en: 'Foundation and trench excavation, shoring and site preparation to the highest safety standards.',
      ar: 'حفر الأساسات والخنادق وأعمال السند وتجهيز الموقع وفق أعلى معايير السلامة.',
    },
  },
  {
    num: '03',
    img: '/images/service-infrastructure.png',
    title: { en: 'Infrastructure Works', ar: 'أعمال البنية التحتية' },
    body: {
      en: 'Roads, water networks, sanitary drainage, electrical, telecom and utility networks.',
      ar: 'الطرق وشبكات المياه والصرف الصحي والكهرباء والاتصالات وشبكات الخدمات.',
    },
  },
  {
    num: '04',
    img: '/images/service-concrete.png',
    title: { en: 'Concrete Works', ar: 'الأعمال الخرسانية' },
    body: {
      en: 'All reinforced concrete types: foundations, footings, columns and slabs with certified mixes.',
      ar: 'جميع أنواع الخرسانة المسلحة: الأساسات والقواعد والأعمدة والبلاطات بخلطات معتمدة.',
    },
  },
  {
    num: '05',
    img: '/images/service-steel.png',
    title: { en: 'Steel Structures', ar: 'المنشآت المعدنية' },
    body: {
      en: 'Design, fabrication and erection of steel frameworks for commercial and industrial facilities.',
      ar: 'تصميم وتصنيع وتركيب الهياكل المعدنية للمنشآت التجارية والصناعية.',
    },
  },
  {
    num: '06',
    img: '/images/service-mep.png',
    title: { en: 'MEP Works', ar: 'الأعمال الكهروميكانيكية' },
    body: {
      en: 'Full mechanical, electrical, plumbing, HVAC and ventilation systems with testing and balancing.',
      ar: 'أنظمة ميكانيكية وكهربائية وسباكة وتكييف وتهوية متكاملة مع الاختبار والموازنة.',
    },
  },
  {
    num: '07',
    img: '/images/service-finishing.png',
    title: { en: 'Finishing Works', ar: 'أعمال التشطيبات' },
    body: {
      en: 'Interior and exterior finishing delivered to the highest precision and quality.',
      ar: 'تشطيبات داخلية وخارجية بأعلى درجات الدقة والجودة.',
    },
  },
  {
    num: '08',
    img: '/images/service-insulation.png',
    title: { en: 'Insulation Works', ar: 'أعمال العزل' },
    body: {
      en: 'Integrated waterproofing and thermal insulation protecting structures from moisture and heat.',
      ar: 'عزل مائي وحراري متكامل يحمي المنشآت من الرطوبة والحرارة.',
    },
  },
]

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
