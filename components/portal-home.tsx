"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Moon,
  Sun,
  Globe,
  Link2,
  Users,
  Cog,
  TrendingUp,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Logo as BrandLogo } from "@/components/logo";

const PORTAL_BG = "/images/portal bg.png";
const subscribeToLocale = () => () => {};
const getBrowserLocale = (): "en" | "ar" =>
  typeof navigator !== "undefined" && navigator.language.startsWith("ar")
    ? "ar"
    : "en";
const getServerLocale = (): "en" | "ar" => "en";

const copy = {
  eyebrow: { en: "Welcome to GEODRILL", ar: "أهلاً بكم في جيودريل" },
  headline: {
    en: {
      part1: "Diverse ",
      highlight1: "Expertise.",
      part2: " Under one ",
      highlight2: "Roof.",
    },
    ar: {
      part1: "خبرات ",
      highlight1: "متنوعة",
      part2: " تحت سقف ",
      highlight2: "واحد",
    },
  },
  subheading: {
    en: "We turn every idea into the start of a success story, offering integrated solutions that meet the needs of individuals and companies.",
    ar: "نجعل كل فكرة بداية قصة نجاح، ونقدم حلولاً متكاملة تلبي احتياجات الأفراد والشركات",
  },
  tagline: {
    en: "GEOTECHNICAL EXPERTISE × CONSTRUCTION EXCELLENCE",
    ar: "GEOTECHNICAL EXPERTISE × CONSTRUCTION EXCELLENCE",
  },
} as const;

const portals = [
  {
    id: "geotechnical",
    label: { en: "GEODRILL", ar: "جيودريل" },
    title: { en: "GEOTECH", ar: "الخدمات الجيوتقنية والمختبرات الهندسية" },
    description: {
      en: "Advanced geotechnical services and engineering laboratories for a safer foundation.",
      ar: "خدمات جيوتقنية متقدمة ومختبرات هندسية لأساس أكثر أماناً.",
    },
    cta: { en: "Visit Geotechnical Site", ar: "زيارة موقع الجيوتقنية" },
    accent: "yellow",
    img: "/images/geotech-portal-placeholder.png",
  },
  {
    id: "contracting",
    label: { en: "GEODRILL", ar: "جيودريل" },
    title: { en: "CONTRACT", ar: "المقاولات العامة" },
    description: {
      en: "General contracting and construction solutions that build lasting value.",
      ar: "حلول التعاقد العام والبناء التي تخلق قيمة دائمة.",
    },
    cta: { en: "Visit Contracting Site", ar: "زيارة موقع المقاولات" },
    accent: "teal",
    img: "/images/contracting-portal-placeholder.png",
  },
] as const;

const features = [
  {
    icon: Users,
    label: { en: "Trusted Partner", ar: "شريك موثوق" },
    description: { en: "IN SAUDI ARABIA", ar: "في المملكة العربية السعودية" },
  },
  {
    icon: Cog,
    label: { en: "Integrated Solutions", ar: "حلول متكاملة" },
    description: { en: "FROM GROUND TO STRUCTURE", ar: "من الأساس إلى البناء" },
  },
  {
    icon: TrendingUp,
    label: { en: "Sustainable Impact", ar: "تأثير مستدام" },
    description: { en: "FOR A STRONGER TOMORROW", ar: "لغد أقوى" },
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.15 + 0.35,
    },
  }),
};

const headVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Logo() {
  return <BrandLogo monochrome size="h-9 sm:h-10" />;
}

function LanguageToggle({
  lang,
  onToggle,
}: {
  lang: "en" | "ar";
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-white/90 transition hover:border-white/30 hover:bg-white/10"
      aria-label="Toggle language"
    >
      <Globe className="h-4 w-4" />
      <span>{lang === "en" ? "AR" : "EN"}</span>
    </button>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-full border border-white/15 bg-white/5 p-2 text-white/90 transition hover:border-white/30 hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export default function PortalHome() {
  const browserLang = useSyncExternalStore<"en" | "ar">(
    subscribeToLocale,
    getBrowserLocale,
    getServerLocale,
  );
  const [localeOverride, setLocaleOverride] = useState<"en" | "ar" | null>(
    null,
  );
  const lang = localeOverride ?? browserLang;
  const { resolvedTheme } = useTheme();

  const headline = copy.headline[lang];
  const isDark = resolvedTheme === "dark";
  const bgImage = isDark ? "/images/portal bg dark.png" : PORTAL_BG;

  return (
    <main
      key={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative isolate flex min-h-screen w-full flex-col bg-background text-foreground"
    >
      <div className="absolute inset-0 -z-10 bg-background">
        <Image
          src={bgImage}
          alt=""
          fill
          sizes="100vw"
          priority
          quality={90}
          className="object-cover object-center"
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <div className="pointer-events-none">
          <Logo />
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3 py-2 shadow-lg shadow-black/10 backdrop-blur-md sm:px-4 sm:py-2.5">
          <LanguageToggle
            lang={lang}
            onToggle={() => setLocaleOverride(lang === "en" ? "ar" : "en")}
          />
          <div className="w-px h-6 bg-white/20" />
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-2 sm:px-5 sm:py-3 pt-7 sm:pt-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headVariants}
          className="relative z-10 mx-auto mb-4 max-w-4xl text-center sm:mb-5"
        >
          <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-foreground/70 dark:text-white/70">
            {copy.eyebrow[lang]}
          </p>

          <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight sm:leading-tight dark:text-white">
            {headline.part1}
            <span className="text-yellow-500 dark:text-yellow-400">
              {headline.highlight1}
            </span>
            {lang === "en" && <br />}
            {headline.part2}
            <span className="text-teal-500 dark:text-teal-400">
              {headline.highlight2}
            </span>
          </h1>

          <p className="mx-auto mt-3 sm:mt-4 max-w-2xl text-balance text-sm sm:text-base lg:text-lg font-semibold text-foreground/80 dark:text-white/80">
            {copy.subheading[lang]}
          </p>

          <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-foreground/60 dark:text-white/60">
            {copy.tagline[lang]}
          </p>
        </motion.div>

        <div className="relative z-10 mb-4 w-full max-w-4xl">
          <div
            dir="ltr"
            className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:gap-5"
          >
            {portals.map((portal, index) => (
              <motion.div
                key={portal.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                dir={lang === "ar" ? "rtl" : "ltr"}
                className="group relative flex h-44 overflow-hidden rounded-3xl sm:h-52"
              >
                <Link
                  href={
                    portal.id === "geotechnical"
                      ? "https://old.geodrillksa.com/"
                      : `/contracting/${lang}`
                  }
                  className="absolute inset-0 z-30"
                  aria-label={`Visit ${portal.title[lang]}`}
                />

                <div
                  className={cn(
                    "relative z-10 flex flex-1 flex-col justify-between p-3 sm:p-4",
                    "bg-gradient-to-r",
                    portal.accent === "yellow"
                      ? "from-yellow-950/95 to-yellow-900/40"
                      : "from-teal-950/95 to-teal-900/40",
                  )}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/70 sm:text-sm">
                    {portal.label[lang]}
                  </p>

                  <div className="space-y-2 sm:space-y-2.5">
                    <div>
                      <h2
                        className={cn(
                          "font-bold leading-snug",
                          lang === "ar"
                            ? "text-lg sm:text-xl lg:text-2xl"
                            : "text-xl sm:text-2xl lg:text-3xl",
                          portal.accent === "yellow"
                            ? "text-yellow-300"
                            : "text-teal-300",
                        )}
                      >
                        {portal.title[lang]}
                      </h2>
                      <div
                        className={cn(
                          "mt-1.5 h-1 w-10 rounded-full sm:mt-2",
                          portal.accent === "yellow"
                            ? "bg-yellow-400"
                            : "bg-teal-400",
                        )}
                        aria-hidden
                      />
                      <p className="mt-1.5 line-clamp-2 text-xs text-white/90 sm:mt-2 sm:text-sm">
                        {portal.description[lang]}
                      </p>
                    </div>

                    <span
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 group-hover:scale-105 sm:px-5 sm:py-2",
                        portal.accent === "yellow"
                          ? "bg-yellow-500 text-black"
                          : "bg-teal-500 text-white",
                      )}
                    >
                      {portal.cta[lang]}
                      <ArrowRight className="size-4 rtl:-scale-x-100" />
                    </span>
                  </div>
                </div>

                <div className="relative w-2/5 shrink-0 sm:w-[38%]">
                  <Image
                    src={portal.img}
                    alt={portal.description[lang]}
                    fill
                    sizes="(max-width: 640px) 38vw, 20vw"
                    className="object-cover object-center"
                  />
                  <div
                    className={cn(
                      "absolute inset-0",
                      portal.accent === "yellow"
                        ? "bg-gradient-to-r from-yellow-950/40 to-transparent"
                        : "bg-gradient-to-r from-teal-950/40 to-transparent",
                    )}
                    aria-hidden
                  />
                </div>

                <div
                  className={cn(
                    "absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-20",
                    portal.accent === "yellow"
                      ? "bg-yellow-400"
                      : "bg-teal-400",
                  )}
                  aria-hidden
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: 0.65 },
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 sm:flex"
          >
            <div className="flex size-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 shadow-lg backdrop-blur-sm">
              <Link2 className="size-6 text-white/80" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.75 },
          }}
          className="relative z-10 flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {features.map(({ icon: Icon, label, description }) => (
            <div key={label.en} className="group relative rounded-xl p-[1.5px]">
              <span
                aria-hidden
                className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, #10b5b8 0%, #eab308 100%)",
                }}
              />
              <div className="relative z-10 flex items-center gap-2.5 rounded-[10px] bg-background/70 px-3 py-1.5 backdrop-blur-sm transition-colors duration-300">
                <Icon
                  className="size-5 shrink-0 text-foreground/80 dark:text-white/70"
                  strokeWidth={1.75}
                />
                <div className="text-start">
                  <p className="text-sm font-bold text-foreground dark:text-white">
                    {label[lang]}
                  </p>
                  <p className="text-[10px] uppercase tracking-wide text-foreground/55 dark:text-white/60">
                    {description[lang]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
