'use client'

import { useLanguage } from '@/components/language-provider'
import { Logo } from '@/components/logo'

export function Footer() {
  const { t } = useLanguage()
  const f = t.footer
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo onDark />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">{f.tagline}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal">{f.quickLinks}</h3>
          <ul className="flex flex-col gap-2.5">
            {t.nav.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-white/60 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal">{f.servicesTitle}</h3>
          <ul className="flex flex-col gap-2.5">
            {t.services.items.slice(0, 6).map((s) => (
              <li key={s.key} className="text-sm text-white/60">
                {s.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-teal">{f.contactTitle}</h3>
          <ul className="flex flex-col gap-2.5 text-sm text-white/60">
            <li>{t.contact.address}</li>
            <li dir="ltr" className="ltr:text-left rtl:text-right">
              {t.contact.phoneLabel}
            </li>
            <li dir="ltr" className="ltr:text-left rtl:text-right">
              {t.contact.emailLabel}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {year} {f.rights}
          </p>
          <p>{f.group}</p>
        </div>
      </div>
    </footer>
  )
}
