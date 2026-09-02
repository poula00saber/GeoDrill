"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor, Globe, Check } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { Button } from "@/geotech/components/ui/button";
import { cn } from "@/geotech/lib/utils";
import { ContourLines } from "@/geotech/components/geological/background";
import { Logo } from "@/components/logo";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const { locale, dict, setLocale } = useLanguage();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (!dict) return null;

  // Handles dynamic route translation while keeping the current subpath (e.g. /qhse, /services)
  const switchLanguage = (newLocale: "en" | "ar") => {
    if (newLocale === locale) {
      setLangOpen(false);
      return;
    }

    setLocale(newLocale);

    if (pathname) {
      // Replaces current locale path segment with the new target locale
      const segments = pathname.split("/").filter(Boolean);
      const currentLocaleIndex = segments.findIndex(
        (seg) => seg === "en" || seg === "ar",
      );

      if (currentLocaleIndex !== -1) {
        segments[currentLocaleIndex] = newLocale;
        const newPath = `/${segments.join("/")}`;
        router.push(newPath);
      } else {
        router.push(`/geotechnical/${newLocale}`);
      }
    }

    setLangOpen(false);
  };

  const baseHref = `/geotechnical/${locale}`;
  const navItems = [
    { label: dict.nav.about, href: `${baseHref}/about` },
    { label: dict.nav.services, href: `${baseHref}/services` },
    { label: dict.nav.projects, href: `${baseHref}/projects` },
    { label: dict.nav.qhse, href: `${baseHref}/qhse` },
    { label: dict.nav.contact, href: `${baseHref}/contact` },
  ];

  const themeOptions = [
    { value: "light", label: dict.theme.light, icon: Sun },
    { value: "dark", label: dict.theme.dark, icon: Moon },
    { value: "system", label: dict.theme.system, icon: Monitor },
  ] as const;

  return (
    <>
      <ScrollProgress />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/40 bg-background/75 backdrop-blur-xl shadow-sm dark:bg-background/80"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href={baseHref}
            className="group flex items-center gap-2.5 outline-none"
          >
            <Logo size="h-9" />
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname?.endsWith(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100",
                      isActive && "scale-x-100",
                    )}
                  />
                </a>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangOpen(!langOpen);
                  setThemeOpen(false);
                }}
                className="flex h-9 items-center gap-1.5 rounded-lg border border-border/60 bg-surface/40 px-3 text-xs font-semibold text-foreground transition-all hover:border-primary/40 hover:bg-surface"
                aria-label={dict.common.language}
              >
                <Globe className="h-3.5 w-3.5 text-primary" />
                <span className="font-mono uppercase">{locale}</span>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLangOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute end-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-border/80 bg-popover/95 p-1 backdrop-blur-md shadow-xl"
                    >
                      <button
                        onClick={() => switchLanguage("en")}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors hover:bg-surface",
                          locale === "en"
                            ? "bg-primary/10 text-primary font-bold"
                            : "text-foreground",
                        )}
                      >
                        <span>English</span>
                        {locale === "en" && <Check className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => switchLanguage("ar")}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors hover:bg-surface",
                          locale === "ar"
                            ? "bg-primary/10 text-primary font-bold"
                            : "text-foreground",
                        )}
                      >
                        <span>العربية</span>
                        {locale === "ar" && <Check className="h-3.5 w-3.5" />}
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setThemeOpen(!themeOpen);
                  setLangOpen(false);
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface/40 text-foreground transition-all hover:border-primary/40 hover:bg-surface"
                aria-label={dict.theme.toggle}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>

              <AnimatePresence>
                {themeOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setThemeOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute end-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-border/80 bg-popover/95 p-1 backdrop-blur-md shadow-xl"
                    >
                      {themeOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setTheme(opt.value);
                            setThemeOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors hover:bg-surface",
                            theme === opt.value
                              ? "bg-primary/10 text-primary font-bold"
                              : "text-foreground",
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <opt.icon className="h-3.5 w-3.5" />
                            <span>{opt.label}</span>
                          </div>
                          {theme === opt.value && (
                            <Check className="h-3.5 w-3.5" />
                          )}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Action CTA */}
            <Button
              asChild
              size="sm"
              className="hidden bg-primary text-primary-foreground font-semibold hover:bg-primary/90 shadow-sm sm:inline-flex"
            >
              <a href={`${baseHref}/contact`}>{dict.nav.startProject}</a>
            </Button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface/40 text-foreground transition-all hover:bg-surface lg:hidden"
              aria-label={dict.nav.menu}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
            <ContourLines className="text-primary" opacity={0.04} />
            <div className="relative flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <Logo size="h-8" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-foreground"
                  aria-label={dict.nav.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06 }}
                    className="flex items-center justify-between rounded-xl border-b border-border/40 py-4 text-xl font-bold text-foreground transition-colors hover:text-primary"
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto pt-6">
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground font-bold shadow-lg"
                >
                  <a
                    href={`${baseHref}/contact`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {dict.nav.startProject}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[55] h-[2px] bg-transparent">
      <div
        className="h-full bg-primary transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
