"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Globe, ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Logo } from "@/components/logo";
import { useLanguage } from "@/components/language-provider";
import { cn } from "@/lib/utils";

type ScrollState = "top" | "compact" | "hidden";

const NO_HERO_THRESHOLD = 10;

export function Navbar() {
  const { t, toggle, lang } = useLanguage();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollState, setScrollState] = useState<ScrollState>("top");
  const [hasHero, setHasHero] = useState(false);

  const heroHeightRef = useRef(NO_HERO_THRESHOLD);
  const prevScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const openRef = useRef(open);
  openRef.current = open;

  const isContractingHome = /^\/contracting\/(en|ar)\/?$/.test(pathname);
  const isHomePage =
    isContractingHome || pathname.split("/").filter(Boolean).length <= 1;
  const PAGE_NAV: Record<string, string> = {
    blog: `/contracting/${lang ?? "en"}/blog`,
    faq: `/contracting/${lang ?? "en"}/faq`,
  };
  const navHref = (id: string) =>
    PAGE_NAV[id] ??
    (isHomePage ? `#${id}` : `/contracting/${lang ?? "en"}#${id}`);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    setOpen(false);
    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return;
    const base = href.substring(0, hashIndex);
    const targetId = href.substring(hashIndex + 1);
    if (base && base !== window.location.pathname) {
      window.location.href = href;
      return;
    }
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  // Check for hero banner element on current page
  useEffect(() => {
    const heroEl = document.querySelector<HTMLElement>("[data-hero-banner]");
    if (!heroEl) {
      setHasHero(false);
      heroHeightRef.current = NO_HERO_THRESHOLD;
      return;
    }

    setHasHero(true);
    const update = () => {
      heroHeightRef.current = heroEl.offsetHeight;
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(heroEl);
    return () => ro.disconnect();
  }, [pathname]);

  // Handle scroll detection cleanly across all pages
  useEffect(() => {
    prevScrollY.current = window.scrollY;

    const onScroll = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const previousY = prevScrollY.current;
        prevScrollY.current = y;

        // Always show near the top, reveal on upward movement, hide on downward movement.
        if (y < 50) {
          setScrollState("top");
        } else if (y < previousY || openRef.current) {
          setScrollState("compact");
        } else if (y > previousY) {
          setScrollState("hidden");
        }

        rafId.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const effectiveState: ScrollState =
    open && scrollState === "hidden" ? "compact" : scrollState;
  const isTop = effectiveState === "top";
  const hidden = effectiveState === "hidden";

  // Active floating transparent state over dark hero
  const isFloatingHero = isTop && hasHero;

  // Use the dark/for-dark logo when floating over the dark hero or in dark mode,
  // otherwise the normal light logo — the contracting site keeps its coloured
  // logo.png / logo2.png variants.
  const logoSrc =
    isFloatingHero || resolvedTheme !== "light" ? "/logo2.png" : "/logo.png";

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        hidden && "pointer-events-none",
        isFloatingHero
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-background/85 backdrop-blur-md",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <a
          href={isHomePage ? "#home" : `/contracting/${lang}`}
          aria-label="GEODRILL home"
          onClick={(e) =>
            handleNavClick(e, isHomePage ? "#home" : `/contracting/${lang}`)
          }
          className="shrink-0"
        >
          <Logo src={logoSrc} size="h-8 md:h-9" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {t.nav.map((item) => (
            <li key={item.id}>
              <a
                href={navHref(item.id)}
                onClick={(e) => handleNavClick(e, navHref(item.id))}
                className={cn(
                  "rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                  isFloatingHero
                    ? "text-white/80 hover:text-white"
                    : "text-foreground/80 hover:text-primary",
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-lg transition-colors duration-200",
              isFloatingHero
                ? "text-white/90 hover:bg-white/10"
                : "text-foreground/80 hover:bg-muted hover:text-primary",
            )}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <Sun className="size-4.5" />
            ) : (
              <Moon className="size-4.5" />
            )}
          </button>

          <button
            type="button"
            onClick={toggle}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-200",
              isFloatingHero
                ? "text-white/90 hover:bg-white/10"
                : "text-foreground/80 hover:bg-muted hover:text-primary",
            )}
            aria-label="Switch language"
          >
            <Globe className="size-3.5" />
            {t.langLabel}
          </button>

          <a
            href={navHref("contact")}
            onClick={(e) => handleNavClick(e, navHref("contact"))}
            className="hidden items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-105 hover:shadow-md sm:inline-flex"
          >
            {t.cta.quote}
            <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex size-9 items-center justify-center rounded-lg transition-colors duration-200 lg:hidden",
              isFloatingHero
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-muted",
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-all duration-300 ease-out lg:hidden",
          open
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 border-t-transparent",
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {t.nav.map((item, i) => (
            <li
              key={item.id}
              className={cn(
                "transition-all duration-300",
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
              style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
            >
              <a
                href={navHref(item.id)}
                onClick={(e) => handleNavClick(e, navHref(item.id))}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="mt-2">
            <a
              href={navHref("contact")}
              onClick={(e) => handleNavClick(e, navHref("contact"))}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              {t.cta.quote}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" />
            </a>
          </li>
        </ul>
      </div>
    </motion.header>
  );
}
