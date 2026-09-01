"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { content, type Dict, type Lang } from "@/lib/content";

type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dict;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function langFromPathname(pathname: string): Lang {
  // Locale segment depends on the route shape:
  //   /[lang]            -> segments[0]  (e.g. "/ar")
  //   /contracting/[lang]-> segments[1]  (e.g. "/contracting/ar")
  const segments = pathname.split("/").filter(Boolean);
  const localeSegment =
    segments[0] === "contracting" || segments[0] === "geotechnical"
      ? segments[1]
      : segments[0];
  return localeSegment === "ar" ? "ar" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const lang = langFromPathname(pathname);
  const dir = content[lang].dir;

  // Keep the <html> language/direction in sync with the URL.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
  }, [lang, dir]);

  const toggle = () => {
    const target: Lang = lang === "en" ? "ar" : "en";
    const segments = pathname.split("/").filter(Boolean);

    // Use replace() instead of push() so language switches update the URL
    // WITHOUT adding a new browser history entry. This means toggling
    // languages many times still lets the user go "back" to the previous
    // page with a single click — no accumulation of history entries.

    // Contracting path: /contracting/en <-> /contracting/ar
    if (segments[0] === "contracting") {
      segments[1] = target;
      router.replace(`/${segments.join("/")}`);
      return;
    }

    // Check if the first segment is a valid locale
    if (segments[0] === "en" || segments[0] === "ar") {
      segments[0] = target;
      router.replace(`/${segments.join("/")}`);
      return;
    }

    // Fallback for root path or un-prefixed routes
    router.replace(`/${target}`);
  };

  const value: LanguageContextValue = {
    lang,
    dir,
    t: content[lang],
    toggle,
  };

  return (
    <LanguageContext.Provider value={value}>
      <div dir={dir} lang={lang}>
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
