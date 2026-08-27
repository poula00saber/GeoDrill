export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

export const dictionaries = {
  en: () => import("./geotech-dictionaries/en.json").then((m) => m.default),
  ar: () => import("./geotech-dictionaries/ar.json").then((m) => m.default),
} as const;

export type Dictionary = Awaited<ReturnType<typeof dictionaries.en>>;

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "ar";
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}
