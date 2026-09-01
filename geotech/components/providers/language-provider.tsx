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
        className="geotech-theme min-h-screen bg-background text-foreground"
        dir={getDirection(locale)}
        lang={locale}
      >
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
