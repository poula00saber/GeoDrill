import type { Metadata } from "next";

export const SITE_URL = "https://www.geodrillksa.com";
export const SITE_NAME = "GEODRILL KSA";
export const DEFAULT_LOCALE = "en";
export const localeList = ["en", "ar"] as const;
export type Locale = (typeof localeList)[number];

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${safePath}`;
}

export function getLocaleRoute(path: string, lang: Locale = DEFAULT_LOCALE) {
  const normalizedPath = normalizePath(path);
  const divisionMatch = normalizedPath.match(
    /^\/(contracting|geotechnical)(?:\/(en|ar))?(\/.*)?$/,
  );

  if (divisionMatch) {
    const [, division, , rest = ""] = divisionMatch;
    return `/${division}/${lang}${rest}`;
  }

  if (normalizedPath === "/") return "/";
  return `/${lang}${normalizedPath}`;
}

export function buildLocalizedAlternates(
  path: string,
  { includeXDefault = true }: { includeXDefault?: boolean } = {},
): Metadata["alternates"] {
  const cleanPath = normalizePath(path);
  const canonical = absoluteUrl(cleanPath);
  const divisionMatch = cleanPath.match(
    /^\/(contracting|geotechnical)(?:\/(en|ar))?(\/.*)?$/,
  );
  const languages: Record<string, string> = divisionMatch
    ? {
        en: absoluteUrl(`/${divisionMatch[1]}/en${divisionMatch[3] ?? ""}`),
        ar: absoluteUrl(`/${divisionMatch[1]}/ar${divisionMatch[3] ?? ""}`),
      }
    : {};

  if (includeXDefault) {
    return {
      canonical,
      languages: {
        ...languages,
        "x-default": languages.en ?? canonical,
      },
    };
  }

  return {
    canonical,
    languages,
  };
}

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  locale = DEFAULT_LOCALE,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  locale?: Locale;
  noindex?: boolean;
}): Metadata {
  const normalizedPath = normalizePath(path);
  const canonicalUrl = absoluteUrl(normalizedPath);
  const ogImage = image ? absoluteUrl(image) : absoluteUrl("/logo.png");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: buildLocalizedAlternates(normalizedPath),
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

function normalizePath(path: string): string {
  const prefixedPath = path.startsWith("/") ? path : `/${path}`;
  return prefixedPath.length > 1
    ? prefixedPath.replace(/\/+$/, "")
    : prefixedPath;
}
