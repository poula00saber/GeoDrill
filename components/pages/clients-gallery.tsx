'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { CLIENT_LOGOS } from '@/lib/clients-data'
import { cn } from '@/lib/utils'

export function ClientsGallery() {
  const { lang } = useLanguage()
  const isAr = lang === 'ar'
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CLIENT_LOGOS
    return CLIENT_LOGOS.filter((l) => l.name.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="mx-auto max-w-7xl px-6">
      {/* Breadcrumb back */}
      <Link
        href={`/${lang ?? 'en'}#clients`}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-teal"
      >
        <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
        {isAr ? 'العودة إلى الرئيسية' : 'Back to home'}
      </Link>

      {/* Header */}
      <div className="mt-8 max-w-2xl">
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-teal">
          <span className="h-px w-8 bg-teal" />
          {isAr ? 'شركاء النجاح' : 'Our Partners'}
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {isAr
            ? `أكثر من ${CLIENT_LOGOS.length} جهة تثق بجيو دريل`
            : `${CLIENT_LOGOS.length}+ Organizations Trust GEODRILL`}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          {isAr
            ? 'من الوزارات الحكومية إلى كبرى الشركات الخاصة، نفخر بشراكاتنا عبر جميع القطاعات في المملكة.'
            : 'From government ministries to leading private developers, spanning every sector we serve across the Kingdom.'}
        </p>
      </div>

      {/* Search */}
      <div className="relative mt-10 max-w-sm">
        <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isAr ? 'ابحث عن شريك...' : 'Search partners...'}
          className="w-full rounded-full border border-border bg-white py-2.5 ps-11 pe-4 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20"
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((logo) => (
            <div key={logo.slug} className="group/card flex flex-col">
              <div
                className={cn(
                  'relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-6',
                  'transition-all duration-300 ease-out',
                  'group-hover/card:-translate-y-1.5 group-hover/card:border-teal/50 group-hover/card:shadow-xl group-hover/card:shadow-teal/15',
                )}
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-teal/[0.06] to-transparent transition-transform duration-700 ease-out group-hover/card:translate-x-full" />

                <span className="relative block h-full w-full">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 18vw"
                    className="object-contain p-2 grayscale transition-all duration-300 group-hover/card:grayscale-0"
                  />
                </span>
              </div>

              <span className="mt-3 line-clamp-1 text-center text-xs font-semibold text-muted-foreground transition-colors duration-300 group-hover/card:text-foreground">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-20 text-center text-sm text-muted-foreground">
          {isAr ? 'لا توجد نتائج مطابقة.' : 'No partners match your search.'}
        </div>
      )}
    </div>
  )
}