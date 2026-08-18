'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Compass, Hammer, ArrowRight, Moon, Sun } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

/** Pick en|ar from the browser's preferred language (SSR → en). */
function useLocale() {
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  useEffect(() => {
    const l = navigator.language || 'en'
    setLang(l.startsWith('ar') ? 'ar' : 'en')
  }, [])
  return lang
}

const portals = [
  {
    id: 'geotechnical',
    title: { en: 'Geotechnical & Geoscience', ar: 'الجيولوجيا والعلوم الأرضية' },
    subtitle: {
      en: 'Soil investigation, structural assessment, shoring, piling & geotechnical engineering.',
      ar: 'استكشاف التربة والتقييم الإنشائي وحواجز الحفر وأعمال الأعمدة وهندسة جيولوجية.',
    },
    capabilities: {
      en: ['Site investigation & soil profiling', 'Foundation design & piling', 'Shoring & retaining walls', 'Geotechnical analysis & reporting'],
      ar: ['استكشاف الموقع وتحليل التربة', 'تصميم الأساسات ودك الخيم', 'حواجز الحفر والجدران المحجزة', 'تحليل جيولوجي وتقارير'],
    },
    href: 'https://geodrillksa.com',
    external: true,
    accent: 'yellow',
    Icon: Compass,
    img: '/images/sector-industrial.png',
  },
  {
    id: 'construction',
    title: { en: 'General Construction & Engineering', ar: 'التشييد والهندسة العامة' },
    subtitle: {
      en: 'General contracting, infrastructure, concrete, steel structures, MEP & finishing.',
      ar: 'التعاقد العام والبنية التحتية والخرسانة والهياكل المعدنية والميكانيكية والتشطيبات.',
    },
    capabilities: {
      en: ['General contracting', 'Infrastructure & utilities', 'Concrete & steel structures', 'MEP & finishing works'],
      ar: ['التعاقد العام', 'البنية التحتية والمرافق', 'الخرسانة والهياكل المعدنية', 'الأعمال الميكانيكية والتشطيبات'],
    },
    href: '/en',
    external: false,
    accent: 'teal',
    Icon: Hammer,
    img: '/images/service-concrete.png',
  },
] as const

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 + 0.15 },
  }),
}

export default function Page() {
  const lang = useLocale()
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-background text-foreground dark:bg-navy dark:text-white">
      {/* Shared decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden
      />

      {/* Theme toggle */}
      <ThemeToggle className="absolute top-6 right-6 z-20" />

      {/* Logo */}
      <a href="/en" aria-label="GeoDrill home" className="absolute top-6 left-6 z-20">
        <Logo onDark={isDark} />
      </a>

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-4 px-5 sm:grid-cols-2 sm:gap-6 md:gap-8">
        {portals.map((p, i) => (
          <Portal key={p.id} portal={p} delay={i} variants={cardVariants} lang={lang} />
        ))}
      </div>
    </main>
  )
}

function Portal({ portal, delay, variants, lang }: {
  portal: (typeof portals)[number]
  delay: number
  variants: Variants
  lang: 'en' | 'ar'
}) {
  const isYellow = portal.accent === 'yellow'
  const title = portal.title[lang]
  const subtitle = portal.subtitle[lang]
  const caps = portal.capabilities[lang]
  const label = isYellow ? 'Geotechnical' : 'Construction'

  const content = (
    <>
      <span
        className={cn(
          'mb-5 flex size-14 items-center justify-center rounded-xl text-white',
          isYellow ? 'bg-yellow-400/15 ring-2 ring-yellow-300/30' : 'bg-teal-400/15 ring-2 ring-teal-300/30',
        )}
      >
        <portal.Icon className="size-6" />
      </span>

      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">{subtitle}</p>

      <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-1.5">
        {caps.map((c) => (
          <li
            key={c}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
              isYellow ? 'bg-yellow-400/10 text-yellow-200' : 'bg-teal-400/10 text-teal-200',
            )}
          >
            <span
              className={cn('size-1.5 rounded-full', isYellow ? 'bg-yellow-400' : 'bg-teal-400')}
            />
            {c}
          </li>
        ))}
      </ul>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/90">
        <span
          className={cn(
            'inline-flex h-7 px-1.5 items-center justify-center rounded-full text-xs font-bold uppercase',
            isYellow ? 'bg-yellow-400 text-navy' : 'bg-teal-400 text-white',
          )}
        >
          {label}
        </span>
        <span>{lang === 'ar' ? 'اختر المسار' : 'Choose path'}</span>
        <ArrowRight
          className={cn(
            'size-4 transition-transform duration-300 group-hover:translate-x-1',
            'rtl:group-hover:-translate-x-1',
          )}
        />
      </div>
        </>
  )
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'group relative flex h-[28rem] w-full flex-col overflow-hidden rounded-[22px] border text-white',
        'border-white/10 transition-all duration-300',
        'hover:border-transparent hover:shadow-2xl hover:shadow-black/40',
        isYellow && 'hover:shadow-yellow-500/20',
        !isYellow && 'hover:shadow-teal-500/20',
      )}
    >
      {/* Background photo of the division */}
      <div className="absolute inset-0">
        <Image
          src={portal.img}
          alt={title}
          fill
          priority={portal.id === 'geotechnical'}
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-center brightness-75 saturate-90"
        />
        {/* Dark gradient so the overlaid text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/50 to-navy/25" />
      </div>

      {/* Soft branded gradient accent */}
      <div
        className={cn(
          'absolute -inset-px opacity-50 blur-2xl',
          isYellow ? 'bg-yellow-400/15' : 'bg-teal-400/15',
        )}
        aria-hidden
      />

                  <div className="relative z-10 flex h-full flex-col justify-end p-7">
        {content}
      </div>

      {/* Hover reveal tint */}
      <div
        className={cn(
          'absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-15',
          isYellow ? 'bg-yellow-400' : 'bg-teal-400',
        )}
        aria-hidden
      />

      {portal.external ? (
        <a
          href={portal.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Go to ${title} division`}
          className="absolute inset-0 z-10"
        />
      ) : (
        <Link
          href={portal.href}
          aria-label={`Enter ${title} division`}
          className="absolute inset-0 z-10"
        />
      )}
    </motion.div>
  )
}

function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt="GeoDrill"
      width={150}
      height={40}
      priority
      className={cn('h-10 w-auto object-contain', onDark && 'brightness-0 invert')}
    />
  )
}

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === 'dark'
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/60 text-foreground transition-colors',
        'hover:bg-muted dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10',
        className,
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  )
}

