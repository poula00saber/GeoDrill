"use client";

import { useEffect } from "react";

/**
 * Swaps the favicon to match the BROWSER/OS color scheme:
 *  - Light scheme -> public/logo.png,  visible on a light tab.
 *  - Dark scheme  -> public/logo2.png, visible on a dark tab.
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

function applyFavicon(dark: boolean): void {
  const href = dark ? "/logo2.png" : "/logo.png";
  document
    .querySelectorAll<HTMLLinkElement>(ICON_SELECTOR)
    .forEach((link) => {
      link.href = href;
    });
}

export default function ThemeFavicon() {
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
      );

    sync();

    if (native) {
      const onChange = (event: MediaQueryListEvent) =>
        applyFavicon(event.matches);
      native.addEventListener("change", onChange);
      return () => native.removeEventListener("change", onChange);
    }

    // No native matchMedia — poll the CSS scheme probe as a fallback.
    const id = window.setInterval(sync, 3000);
    return () => window.clearInterval(id);
  }, []);

  return null;
}