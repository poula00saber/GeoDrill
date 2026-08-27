'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dictionaries, type Dictionary, type Locale, isLocale, getDirection } from '@/lib/geotech-i18n';

interface LanguageContextValue {
  locale: Locale;
  dict: Dictionary | null;
  dir: 'ltr' | 'rtl';
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'geodrill-locale';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored && isLocale(stored)) {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    dictionaries[locale]().then((d) => setDict(d));
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, l);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider
      value={{ locale, dict, dir: getDirection(locale), setLocale, toggleLocale }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

