'use client'

import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export function Process() {
  const { t } = useLanguage()
  const p = t.process

  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-28">
      <div
        className="dot-grid pointer-events-none absolute inset-0 text-white/[0.05]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading kicker={p.kicker} title={p.title} sub={p.sub} align="center" invert />

        <ol className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((step, i) => (
            <Reveal key={step.num} delay={(i % 4) * 90} as="li">
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-teal/30 bg-teal/10 font-mono text-lg font-bold text-teal">
                    {step.num}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-teal/40 to-transparent rtl:bg-gradient-to-l" aria-hidden />
                </div>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
