"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  dictionaries,
  type Dictionary,
  type Locale,
  isLocale,
  getDirection,
} from "@/geotech/lib/i18n";

interface LanguageContextValue {
  locale: Locale;
  dict: Dictionary | null;
  dir: "ltr" | "rtl";
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

function localeFromPathname(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const geotechnicalIndex = segments.indexOf("geotechnical");
  const locale =
    geotechnicalIndex >= 0 ? segments[geotechnicalIndex + 1] : undefined;
  return isLocale(locale ?? "") ? locale : "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = localeFromPathname(pathname);
  const [dict, setDict] = useState<Dictionary | null>(null);

  useEffect(() => {
    let cancelled = false;
    dictionaries[locale]().then((d) => {
      if (!cancelled) setDict(d);
    });
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
    return () => {
      cancelled = true;
    };
  }, [locale]);

  const setLocale = useCallback(
    (l: Locale) => {
      router.replace(`/geotechnical/${l}`);
    },
    [router],
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ar" : "en");
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        dict,
        dir: getDirection(locale),
        setLocale,
        toggleLocale,
      }}
    >
      <div
        className="geotech-theme isolate min-h-screen bg-background text-foreground"
        dir={getDirection(locale)}
        lang={locale}
      >
        {/* Ambient background gradients shown across the whole page
            (subtle glows over the base background, behind all content). */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -start-24 size-[34rem] rounded-full bg-primary/10 blur-[140px]" />
          <div className="absolute top-1/4 -end-28 size-[30rem] rounded-full bg-slate-400/10 blur-[140px] dark:bg-primary/10" />
          <div className="absolute bottom-0 start-1/4 size-[26rem] rounded-full bg-primary/10 blur-[150px] dark:bg-primary/15" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
