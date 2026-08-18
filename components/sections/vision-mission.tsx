'use client'

import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'

export function VisionMission() {
  const { t } = useLanguage()
  const v = t.visionMission

  return (
    <section className="relative overflow-hidden bg-navy py-20 md:py-28">
      <Image
        src="/images/skyline.png"
        alt=""
        fill
        aria-hidden
        className="object-cover opacity-15"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/90 to-navy" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading kicker={v.kicker} title={v.visionTitle} invert align="center" />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-colors hover:border-teal/50 md:p-10">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal/15 text-teal">
                <EyeIcon />
              </div>
              <h3 className="mb-4 text-xl font-bold text-white md:text-2xl">{v.visionTitle}</h3>
              <p className="leading-relaxed text-white/70">{v.vision}</p>
            </article>
          </Reveal>

          <Reveal delay={120}>
            <article className="group h-full rounded-2xl border border-teal/40 bg-teal/[0.08] p-8 backdrop-blur-sm transition-colors hover:border-teal md:p-10">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-teal text-navy">
                <TargetIcon />
              </div>
              <h3 className="mb-4 text-xl font-bold text-white md:text-2xl">{v.missionTitle}</h3>
              <p className="leading-relaxed text-white/70">{v.mission}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  )
}
