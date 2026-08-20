'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'
import type { Localized } from '@/lib/sector-data'

/**
 * Modern bento gallery for a sector's work images.
 * Leader image spans a large cell; the rest create a balanced collage.
 * Clicking any image opens an animated lightbox with prev/next + keyboard.
 */
export function SectorGallery({
  items,
  title,
}: {
  items: { src: string; caption: Localized }[]
  title: string
}) {
  const { lang } = useLanguage()
  const [active, setActive] = useState<number | null>(null)

  const cap = (v: Localized) => v[lang]

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + items.length) % items.length)),
    [items.length],
  )
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % items.length)),
    [items.length],
  )

  // Keyboard + Escape handling inside the lightbox
  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, prev, next])

  // Bento spans: leader (first) is large, others distribute evenly
  const spanFor = (i: number) =>
    i === 0 ? 'md:col-span-2 md:row-span-2' : i === 3 || i === 4 ? 'md:row-span-2' : ''

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
        <span className="hidden h-px flex-1 bg-border sm:block" aria-hidden />
      </div>

      <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            key={`${item.src}-${i}`}
            delay={(i % 4) * 70}
            className={cn('h-full', spanFor(i))}
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border text-start"
              aria-label={`${cap(item.caption)} — open image`}
            >
              <Image
                src={item.src}
                alt={cap(item.caption)}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5">
                <span className="text-sm font-medium text-white md:text-base">{cap(item.caption)}</span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors group-hover:bg-teal">
                  <ZoomIn className="size-4" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
{/* Lightbox */}
      <AnimatePresence>
        {active !== null && items[active] ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] flex flex-col bg-navy/95 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            onClick={close}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <span className="text-sm font-medium text-white/70">
                {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                <span className="ms-3 hidden text-white sm:inline">{cap(items[active].caption)}</span>
              </span>
              <button
                type="button"
                onClick={close}
                className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Stage */}
            <div
              className="relative mx-auto w-full max-w-5xl flex-1 px-4 pb-6 md:px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative h-full w-full"
              >
                <Image
                  src={items[active].src}
                  alt={cap(items[active].caption)}
                  fill
                  sizes="80vw"
                  className="object-contain"
                />
              </motion.div>

              <button
                type="button"
                onClick={prev}
                className="absolute start-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-teal md:start-4"
                aria-label="Previous"
              >
                <ChevronLeft className="size-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-teal md:end-4"
                aria-label="Next"
              >
                <ChevronRight className="size-5 rtl:rotate-180" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}