"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor, Globe } from "lucide-react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
      {/* Scroll progress bar */}
      <ScrollProgress />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a href={baseHref} className="group flex items-center gap-2.5">
            <Logo size="h-9" />
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex h-9 items-center gap-1.5 rounded-md border border-border/60 px-2.5 text-xs font-medium transition-colors hover:bg-surface"
                aria-label={dict.common.language}
              >
                <Globe className="h-3.5 w-3.5" />
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
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute end-0 z-50 mt-2 w-32 overflow-hidden rounded-md border border-border bg-popover shadow-lg"
                    >
                      <button
                        onClick={() => {
                          setLocale("en");
                          setLangOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-surface",
                          locale === "en" && "text-primary",
                        )}
                      >
                        English
                      </button>
                      <button
                        onClick={() => {
                          setLocale("ar");
                          setLangOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-surface",
                          locale === "ar" && "text-primary",
                        )}
                      >
                        العربية
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <div className="relative">
              <button
                onClick={() => setThemeOpen(!themeOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 transition-colors hover:bg-surface"
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
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute end-0 z-50 mt-2 w-36 overflow-hidden rounded-md border border-border bg-popover shadow-lg"
                    >
                      {themeOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setTheme(opt.value);
                            setThemeOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-surface",
                            theme === opt.value && "text-primary",
                          )}
                        >
                          <opt.icon className="h-4 w-4" />
                          {opt.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Start a project */}
            <Button
              asChild
              size="sm"
              className="hidden bg-primary text-primary-foreground hover:bg-primary/90 sm:inline-flex"
            >
              <a href={`${baseHref}/contact`}>{dict.nav.startProject}</a>
            </Button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60 transition-colors hover:bg-surface lg:hidden"
              aria-label={dict.nav.menu}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            <ContourLines className="text-primary" opacity={0.05} />
            <div className="relative flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold tracking-tight">
                  GEODRILL
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border/60"
                  aria-label={dict.nav.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav className="mt-12 flex flex-col gap-2">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center justify-between border-b border-border/40 py-4 text-2xl font-semibold transition-colors hover:text-primary"
                  >
                    {item.label}
                    <span className="font-mono text-xs text-muted-foreground">
                      0{i + 1}
                    </span>
                  </motion.a>
                ))}
              </nav>
              <div className="mt-auto">
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a href="#contact" onClick={() => setMobileOpen(false)}>
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
    <div className="fixed inset-x-0 top-0 z-[55] h-0.5 bg-transparent">
      <div
        className="h-full bg-primary transition-[width] duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
