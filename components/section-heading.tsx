'use client'

import { Reveal } from '@/components/reveal'
import { cn } from '@/lib/utils'

export function SectionHeading({
  kicker,
  title,
  sub,
  align = 'left',
  invert = false,
}: {
  kicker: string
  title: string
  sub?: string
  align?: 'left' | 'center'
  invert?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center mx-auto max-w-2xl' : 'items-start',
      )}
    >
      <Reveal>
        <span
          className={cn(
            'inline-flex items-center text-sm font-semibold uppercase tracking-[0.18em]',
            invert ? 'text-teal' : 'text-teal-dark',
          )}
        >
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={cn(
            'text-pretty text-3xl font-bold leading-tight md:text-4xl lg:text-[2.75rem]',
            invert ? 'text-white' : 'text-foreground',
          )}
        >
          {title}
        </h2>
      </Reveal>
      {sub ? (
        <Reveal delay={140}>
          <p
            className={cn(
              'max-w-xl text-base leading-relaxed md:text-lg',
              invert ? 'text-white/70' : 'text-muted-foreground',
            )}
          >
            {sub}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
