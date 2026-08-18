'use client'

import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { content, type Dict, type Lang } from '@/lib/content'

type LanguageContextValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: Dict
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function langFromPathname(pathname: string): Lang {
  return pathname.split('/')[1] === 'ar' ? 'ar' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const lang = langFromPathname(pathname)
  const dir = content[lang].dir

  // Keep the <html> language/direction in sync with the URL.
  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = dir
  }, [lang, dir])

  const toggle = () => {
    const target: Lang = lang === 'en' ? 'ar' : 'en'
    router.push(`/${target}`)
  }

  const value: LanguageContextValue = {
    lang,
    dir,
    t: content[lang],
    toggle,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

