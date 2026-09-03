"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Swaps the favicon to match the BROWSER/OS color scheme:
 *  - Light scheme -> public/logo.png (or geotech-logo.png on /geotechnical),
 *                    visible on a light tab.
 *  - Dark scheme  -> public/logo2.png (or geotech-logo2.png on /geotechnical),
 *                    visible on a dark tab.
 *
 * A browser tab's favicon area follows the OS/browser theme
 * (`prefers-color-scheme`), not the website's own theme. We track the scheme
 * here — no in-app toggle needed.
 */

const ICON_SELECTOR =
  'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]';

/** Read the OS/browser color scheme from the CSS probe set in globals.css. */
function schemeIsDark(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined")
    return false;
  return (
    window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--prefers-color-scheme")
      .trim() === "dark"
  );
}

function applyFavicon(dark: boolean, geotech: boolean): void {
  // Geotech site (/geotechnical) ships its own brand marks; everywhere else
  // (construction) uses the generic GEODRILL logo pair.
  const href = dark
    ? geotech
      ? "/geotech-logo2.png"
      : "/logo2.png"
    : geotech
      ? "/geotech-logo.png"
      : "/logo.png";
  document
    .querySelectorAll<HTMLLinkElement>(ICON_SELECTOR)
    .forEach((link) => {
      link.href = href;
    });
}

export default function ThemeFavicon() {
  const pathname = usePathname();
  const [geotech, setGeotech] = useState(false);

  // Derive "is geotech route" from the path (client-side, post-hydration).
  useEffect(() => {
    setGeotech(pathname === "/geotechnical" || pathname?.startsWith("/geotechnical/"));
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Native matchMedia is the standard (and reacts instantly to OS changes).
    const native =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-color-scheme: dark)")
        : undefined;

    const sync = () =>
      applyFavicon(
        typeof native?.matches === "boolean" ? native.matches : schemeIsDark(),
        geotech,
      );

    sync();

    if (native) {
      const onChange = (event: MediaQueryListEvent) =>
        applyFavicon(event.matches, geotech);
      native.addEventListener("change", onChange);
      return () => native.removeEventListener("change", onChange);
    }

    // No native matchMedia — poll the CSS scheme probe as a fallback.
    const id = window.setInterval(sync, 3000);
    return () => window.clearInterval(id);
  }, [geotech]);

  return null;
}