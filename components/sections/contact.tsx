'use client'

import { useState, type FormEvent } from 'react'
import { useLanguage } from '@/components/language-provider'
import { Reveal } from '@/components/reveal'
import { SectionHeading } from '@/components/section-heading'
import { SECTION_IDS } from '@/lib/content'

export function Contact() {
  const { t } = useLanguage()
  const c = t.contact
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  const inputClass =
    'w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-teal focus:ring-2 focus:ring-teal/20'

  return (
    <section id={SECTION_IDS.contact} className="bg-muted py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading kicker={c.kicker} title={c.title} sub={c.sub} />

            <div className="flex flex-col gap-4">
              <InfoRow icon={<PinIcon />} label={c.infoTitle} value={c.address} />
              {/* TODO: replace with verified real phone/email from client */}
              <InfoRow icon={<PhoneIcon />} value={c.phoneLabel} dir="ltr" />
              <InfoRow icon={<MailIcon />} value={c.emailLabel} dir="ltr" />
            </div>
          </div>

          <Reveal delay={120}>
            {sent ? (
              <div className="flex h-full min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-teal/30 bg-card p-10 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/15 text-teal">
                  <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <p className="text-lg font-medium text-foreground">{c.form.sent}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 md:p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-foreground">{c.form.name}</span>
                    <input required className={inputClass} type="text" name="name" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-foreground">{c.form.email}</span>
                    <input required className={inputClass} type="email" name="email" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-foreground">{c.form.phone}</span>
                    <input className={inputClass} type="tel" name="phone" />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-foreground">{c.form.subject}</span>
                    <input className={inputClass} type="text" name="subject" />
                  </label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-foreground">{c.form.message}</span>
                  <textarea required rows={4} className={inputClass} name="message" />
                </label>
                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center rounded-xl bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal hover:text-white"
                >
                  {c.form.send}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function InfoRow({
  icon,
  label,
  value,
  dir,
}: {
  icon: React.ReactNode
  label?: string
  value: string
  dir?: 'ltr'
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-teal-dark [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </span>
      <div className="flex flex-col">
        {label ? <span className="text-sm font-semibold text-foreground">{label}</span> : null}
        <span className="text-sm leading-relaxed text-muted-foreground" dir={dir}>
          {value}
        </span>
      </div>
    </div>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6 6l1.1-1.1a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  )
}
