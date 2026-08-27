"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Compass,
  Hammer,
  ArrowRight,
  Moon,
  Sun,
  Hexagon,
  Globe,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Logo as BrandLogo } from "@/components/logo";

const copy = {
  eyebrow: { en: "Welcome to GEODRILL", ar: "أهلاً بكم في جيودريل" },
  headline: {
    en: [
      { text: "Built on ", tone: "plain" },
      { text: "Expertise.", tone: "yellow" },
      { text: "Driven by ", tone: "plain", br: true },
      { text: "Precision.", tone: "teal" },
    ],
    ar: [
      { text: "مبنيّ على ", tone: "plain" },
      { text: "الخبرة.", tone: "yellow" },
      { text: "مدفوع بـ", tone: "plain", br: true },
      { text: "الدقة.", tone: "teal" },
    ],
  },
  sub: {
    en: "Choose your path to explore our core services",
    ar: "اختر مسارك لاستكشاف خدماتنا الأساسية",
  },
  footer: {
    en: "Power in Execution · Precision in Completion",
    ar: "قوة في التنفيذ · دقة في الإنجاز",
  },
} as const;

const portals = [
  {
    id: "geotechnical",
    title: {
      en: "Geotechnical Services & Engineering Laboratories",
      ar: "خدمات الجيوتقنية ومختبرات الهندسة",
    },
    subtitle: {
      en: "Soil investigation, structural assessment, shoring, piling & geotechnical engineering.",
      ar: "استكشاف التربة والتقييم الإنشائي وحواجز الحفر وأعمال الأعمدة وهندسة جيولوجية.",
    },
    capabilities: {
      en: [
        "Site investigation & soil profiling",
        "Foundation design & piling",
        "Shoring & retaining walls",
        "Geotechnical analysis & reporting",
      ],
      ar: [
        "استكشاف الموقع وتحليل التربة",
        "تصميم الأساسات ودك الخيم",
        "حواجز الحفر والجدران المحجزة",
        "تحليل جيولوجي وتقارير",
      ],
    },
    cta: { en: "Explore Geotechnical", ar: "استكشف الجيوتقنية" },
    href: "/geotech",
    accent: "yellow",
    Icon: Compass,
    img: "/images/sector-industrial.png",
  },
  {
    id: "construction",
    title: {
      en: "General Contracting & Engineering",
      ar: "التعاقد العام والهندسة",
    },
    subtitle: {
      en: "General contracting, infrastructure, concrete, steel structures, MEP & finishing.",
      ar: "التعاقد العام والبنية التحتية والخرسانة والهياكل المعدنية والميكانيكية والتشطيبات.",
    },
    capabilities: {
      en: [
        "General contracting",
        "Infrastructure & utilities",
        "Concrete & steel structures",
        "MEP & finishing works",
      ],
      ar: [
        "التعاقد العام",
        "البنية التحتية والمرافق",
        "الخرسانة والهياكل المعدنية",
        "الأعمال الميكانيكية والتشطيبات",
      ],
    },
    cta: { en: "Explore Construction", ar: "استكشف التشييد" },
    href: "/contracting/en",
    accent: "teal",
    Icon: Hammer,
    img: "/images/service-concrete.png",
  },
] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.1 + 0.35,
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

export default function Page() {
  const [lang, setLang] = useState<"en" | "ar">("en");

  useEffect(() => {
    const l = navigator.language || "en";
    setLang(l.startsWith("ar") ? "ar" : "en");
  }, []);

  const headline = copy.headline[lang];

  return (
    <main
      key={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="lang-enter relative flex min-h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden bg-background px-5 py-16 text-foreground dark:bg-navy dark:text-white"
    >
      {/* Brand-colored gradient wash — yellow (geotechnical) vs teal (construction),
         echoing the actual left/right split of the page, not decoration for its own sake */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-32 start-[-10%] size-[42rem] rounded-full bg-yellow-400/25 blur-[110px] dark:bg-yellow-400/[0.12]" />
        <div className="absolute -top-32 end-[-10%] size-[42rem] rounded-full bg-teal-400/25 blur-[110px] dark:bg-teal-400/[0.14]" />
        <div className="absolute bottom-[-20%] start-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-navy/[0.05] blur-[100px] dark:bg-white/[0.04]" />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px), radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="absolute top-6 end-6 z-20 flex items-center gap-2">
        <LanguageToggle
          lang={lang}
          onToggle={() => setLang((l) => (l === "en" ? "ar" : "en"))}
        />
        <ThemeToggle />
      </div>

      <a
        href="/contracting/en"
        aria-label="GEODRILL home"
        className="absolute top-6 start-6 z-20"
      >
        <Logo />
      </a>

      {/* Hero heading */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={headVariants}
        className="relative z-10 mx-auto max-w-2xl text-center"
      >
        <div className="mb-4 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/50 dark:text-white/50">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-yellow-500/60 dark:to-yellow-400/60" />
          {copy.eyebrow[lang]}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-teal-500/60 dark:to-teal-400/60" />
        </div>

        <h1 className="text-balance text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {headline.map((chunk, i) => (
            <span key={i}>
              <span
                className={cn(
                  chunk.tone === "yellow" &&
                    "text-yellow-600 dark:text-yellow-400",
                  chunk.tone === "teal" && "text-teal-600 dark:text-teal-400",
                )}
              >
                {chunk.text}
              </span>
            </span>
          ))}
        </h1>

        <p className="mt-4 text-sm text-foreground/60 dark:text-white/60 sm:text-base">
          {copy.sub[lang]}
        </p>
      </motion.div>

      {/* Portal cards + connecting divider */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-4 sm:grid-cols-2 sm:gap-6 md:gap-8">
        {portals.map((p, i) => (
          <Portal
            key={p.id}
            portal={p}
            delay={i}
            variants={cardVariants}
            lang={lang}
          />
        ))}

        {/* Center connector — visual "fork in the road", sm+ only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, delay: 0.65 },
          }}
          className="pointer-events-none absolute start-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 sm:flex"
        >
          <span className="flex size-12 items-center justify-center rounded-full border border-border bg-background shadow-lg dark:border-white/15 dark:bg-navy">
            <span className="relative flex size-3.5 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-teal-400 opacity-70 blur-[3px]" />
              <Hexagon
                className="relative size-3.5 text-foreground/70 dark:text-white/70"
                strokeWidth={2}
              />
            </span>
          </span>
        </motion.div>
      </div>

      {/* Footer tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.7, delay: 0.8 } }}
        className="relative z-10 flex flex-col items-center gap-2 text-center"
      >
        <span className="mb-1 h-px w-16 bg-gradient-to-r from-yellow-400/50 via-border to-teal-400/50 dark:via-white/15" />
        <Hexagon
          className="size-5 text-foreground/30 dark:text-white/30"
          strokeWidth={1.5}
        />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/45 dark:text-white/45">
          {lang === "en" ? (
            <>
              Power in{" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                Execution
              </span>{" "}
              · Precision in{" "}
              <span className="text-teal-600 dark:text-teal-400">
                Completion
              </span>
            </>
          ) : (
            copy.footer.ar
          )}
        </p>
      </motion.div>
    </main>
  );
}

function Portal({
  portal,
  delay,
  variants,
  lang,
}: {
  portal: (typeof portals)[number];
  delay: number;
  variants: Variants;
  lang: "en" | "ar";
}) {
  const isYellow = portal.accent === "yellow";
  const title = portal.title[lang];
  const subtitle = portal.subtitle[lang];
  const caps = portal.capabilities[lang];
  const cta = portal.cta[lang];

  const linkHref =
    portal.id === "construction" ? `/contracting/${lang}` : "/geotech";

  const content = (
    <>
      <span
        className={cn(
          "mb-5 flex size-14 items-center justify-center rounded-xl text-white",
          isYellow
            ? "bg-yellow-400/15 ring-2 ring-yellow-300/30"
            : "bg-teal-400/15 ring-2 ring-teal-300/30",
        )}
      >
        <portal.Icon className="size-6" />
      </span>

      <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <span
        className={cn(
          "mt-3 block h-0.5 w-10 rounded-full",
          isYellow ? "bg-yellow-400" : "bg-teal-400",
        )}
        aria-hidden
      />
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
        {subtitle}
      </p>

      <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2">
        {caps.map((c) => (
          <li
            key={c}
            className="flex items-start gap-1.5 text-xs text-white/80"
          >
            <span
              className={cn(
                "mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full text-[8px]",
                isYellow ? "bg-yellow-400 text-navy" : "bg-teal-400 text-navy",
              )}
            >
              ✓
            </span>
            {c}
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "mt-6 flex items-center justify-between rounded-xl px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-navy transition-transform duration-300 group-hover:scale-[1.02]",
          isYellow
            ? "bg-gradient-to-r from-yellow-400 to-amber-500"
            : "bg-gradient-to-r from-teal-400 to-cyan-500 text-white",
        )}
      >
        <span>{cta}</span>
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
      </div>
    </>
  );

  return (
    <motion.div
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={variants}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "group relative flex h-[28rem] w-full flex-col overflow-hidden rounded-[22px] border text-white",
        "border-white/10 transition-all duration-300",
        "hover:border-transparent hover:shadow-2xl hover:shadow-black/40",
        isYellow && "hover:shadow-yellow-500/20",
        !isYellow && "hover:shadow-teal-500/20",
      )}
    >
      <div className="absolute inset-0">
        <Image
          src={portal.img}
          alt={title}
          fill
          priority={portal.id === "geotechnical"}
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover object-center brightness-75 saturate-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/50 to-navy/25" />
      </div>

      <div
        className={cn(
          "absolute -inset-px opacity-50 blur-2xl",
          isYellow ? "bg-yellow-400/15" : "bg-teal-400/15",
        )}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-y-0 start-3 z-10 hidden w-6 opacity-40 sm:grid"
        style={{
          gridTemplateColumns: "repeat(2, 3px)",
          gridAutoRows: "3px",
          gap: "6px",
          alignContent: "center",
          justifyContent: "start",
        }}
        aria-hidden
      >
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "rounded-full",
              isYellow ? "bg-yellow-300" : "bg-teal-300",
            )}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end p-7">
        {content}
      </div>

      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-15",
          isYellow ? "bg-yellow-400" : "bg-teal-400",
        )}
        aria-hidden
      />

      <Link
        href={linkHref}
        aria-label={`Enter ${title} division`}
        className="absolute inset-0 z-20"
      />
    </motion.div>
  );
}

// On the navigation (portal) page the logo must be a single colour — pure
// black in light theme and pure white in dark theme. This is applied via a CSS
// filter (brightness/invert), so no separate asset is required and the
// result tracks the theme automatically.
function Logo() {
  return <BrandLogo monochrome size="h-10" />;
}

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/60 text-foreground transition-colors",
        "hover:bg-muted dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </button>
  );
}

function LanguageToggle({
  lang,
  onToggle,
}: {
  lang: "en" | "ar";
  onToggle: () => void;
}) {
  const label = lang === "en" ? "العربية" : "English";
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-border bg-background/60 px-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
      aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Globe className="size-4" />
      {label}
    </button>
  );
}
