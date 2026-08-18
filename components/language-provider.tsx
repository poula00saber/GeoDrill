'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { content, type Dict, type Lang } from '@/lib/content'

type LanguageContextValue = {
  lang: Lang
  dir: 'ltr' | 'rtl'
  t: Dict
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const root = document.documentElement
    root.lang = lang
    root.dir = content[lang].dir
  }, [lang])

  const value: LanguageContextValue = {
    lang,
    dir: content[lang].dir,
    t: content[lang],
    toggle: () => setLang((prev) => (prev === 'en' ? 'ar' : 'en')),
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
