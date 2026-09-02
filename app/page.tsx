"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { motion, type Variants } from "framer-motion";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Logo as BrandLogo } from "@/components/logo";

// Single background asset — matches the reference design exactly. There is
// no separate "dark" background image anymore: the previous dark-mode file
// (`portal bg dark.png`) was a different, unrelated piece of art (dark
// abstract glow lines instead of the rig/crane wave design), not a dark
// variant of the same design — swapping files there was the actual bug, not
// a sizing issue. Dark mode now dims + scrims this same image instead.
const PORTAL_BG = "/images/portal bg.png";

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

// Placeholder imagery only — swap `img` for the real assets once they're
// ready. Reused from elsewhere in the project so something renders now
// instead of a flat color block.
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
    href: "https://old.geodrillksa.com",
    external: false,
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
    href: "/contracting/en",
    external: false,
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

export default function Page() {
  const [lang, setLang] = useState<"en" | "ar">("en");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const l = navigator.language || "en";
    setLang(l.startsWith("ar") ? "ar" : "en");
    setMounted(true);
  }, []);

  const headline = copy.headline[lang];
  const isDark = mounted && resolvedTheme === "dark";
  // Use the dedicated dark background asset in dark mode (no scrim overlay).
  const bgImage = isDark ? "/images/portal bg dark.png" : PORTAL_BG;

  return (
    <main
      key={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="relative isolate flex min-h-screen w-full flex-col bg-background text-foreground"
    >
      {/* Background Image — rated as layout-fill; using min-h-screen instead of
         h-screen + overflow-hidden means the letterbox/content never gets
         clipped, and dark mode swaps in its dedicated dark asset. */}
      <div className="absolute inset-0 -z-10 bg-background">
        <Image
          src={bgImage}
          alt="Portal background"
          fill
          sizes="100vw"
          priority
          quality={90}
          className="object-cover object-center"
        />
      </div>

      {/* Header - Fixed Top Navigation (unchanged) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="pointer-events-none">
          <Logo />
        </div>

        <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 border border-white/20 shadow-lg shadow-black/10">
          <LanguageToggle
            lang={lang}
            onToggle={() => setLang((l) => (l === "en" ? "ar" : "en"))}
          />
          <div className="w-px h-6 bg-white/20" />
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 sm:px-5 py-2 sm:py-3 pt-7 sm:pt-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headVariants}
          className="relative z-10 mx-auto max-w-4xl text-center mb-4 sm:mb-5"
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

        {/* Portal Cards Section */}
        <div className="relative z-10 w-full max-w-4xl mb-4">
          <div
            dir="ltr"
            className="grid gap-3 sm:gap-4 md:gap-5 sm:grid-cols-2"
          >
            {portals.map((portal, i) => (
              <PortalCard
                key={portal.id}
                portal={portal}
                delay={i}
                variants={cardVariants}
                lang={lang}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5, delay: 0.65 },
            }}
            className="pointer-events-none absolute hidden sm:flex left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex size-14 items-center justify-center rounded-full border-2 border-white/30 bg-white/20 backdrop-blur-sm shadow-lg">
              <Link2 className="size-6 text-white/80" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>

        {/* Trust strip — each label gets a teal→yellow gradient pill on hover
           (using the two brand colors), and nothing gets clipped on the page. */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: 0.75 },
          }}
          className="relative z-10 flex w-full max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-4"
        >
          {features.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <div key={i} className="group relative rounded-xl p-[1.5px]">
                {/* Teal→yellow gradient ring — only the ~1.5px outer frame
                   (border) shows through the padding; the inner frosted box
                   covers the rest. */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(90deg, #10b5b8 0%, #eab308 100%)",
                  }}
                />
                <div className="relative z-10 flex items-center gap-2.5 rounded-[10px] bg-background/70 px-3 py-1.5 backdrop-blur-sm transition-colors duration-300">
                  <IconComponent
                    className="size-5 shrink-0 text-foreground/80 dark:text-white/70"
                    strokeWidth={1.75}
                  />
                  <div className="text-start">
                    <div className="text-sm font-bold text-foreground dark:text-white">
                      {feature.label[lang]}
                    </div>
                    <div className="text-[10px] uppercase tracking-wide text-foreground/55 dark:text-white/60">
                      {feature.description[lang]}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}

function PortalCard({
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
  const description = portal.description[lang];
  const cta = portal.cta[lang];
  const label = portal.label[lang];
  const router = useRouter();

  const linkHref = portal.external
    ? portal.href
    : portal.href.startsWith("/contracting")
      ? `/contracting/${lang}`
      : portal.href;

  return (
    <motion.div
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={variants}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="group relative flex h-44 sm:h-52 rounded-3xl overflow-hidden"
    >
      <Link
        href={linkHref}
        target={portal.external ? "_blank" : undefined}
        rel={portal.external ? "noopener noreferrer" : undefined}
        className="absolute inset-0 z-30"
        aria-label={`Visit ${title}`}
      />

      {/* Card Content — after the text side. In LTR (EN) the text is on the
         left and the photo on the right; in RTL (AR) they mirror (text right,
         photo left) automatically via the card's `dir`. */}
      <div
        className={cn(
          "relative z-10 flex flex-1 flex-col justify-between p-3 sm:p-4",
          "bg-gradient-to-r",
          isYellow
            ? "from-yellow-950/95 to-yellow-900/40"
            : "from-teal-950/95 to-teal-900/40",
        )}
      >
        <div>
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-white/70">
            {label}
          </p>
        </div>

        <div className="space-y-2 sm:space-y-2.5">
          <div>
            <h2
              className={cn(
                "font-bold leading-snug",
                lang === "ar"
                  ? "text-lg sm:text-xl lg:text-2xl"
                  : "text-xl sm:text-2xl lg:text-3xl",
                isYellow ? "text-yellow-300" : "text-teal-300",
              )}
            >
              {title}
            </h2>

            <div
              className={cn(
                "mt-1.5 sm:mt-2 h-1 w-10 rounded-full",
                isYellow ? "bg-yellow-400" : "bg-teal-400",
              )}
              aria-hidden
            />

            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white/90 line-clamp-2">
              {description}
            </p>
          </div>

          <button
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-sm font-semibold transition-all duration-300",
              "hover:scale-105 active:scale-95 relative z-30",
              isYellow
                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                : "bg-teal-500 hover:bg-teal-600 text-white",
            )}
            onClick={(e) => {
              e.preventDefault();
              if (portal.external) {
                window.open(portal.href, "_blank");
              } else {
                router.push(linkHref);
              }
            }}
          >
            {cta}
            <ArrowRight className="size-4 rtl:-scale-x-100" />
          </button>
        </div>
      </div>

      {/* Placeholder photo layer — sits after the text side (right in EN, left
         in AR). Swap portal.img for the real asset later. */}
      <div className="relative w-2/5 sm:w-[38%] shrink-0">
        <Image
          src={portal.img}
          alt={title}
          fill
          sizes="(max-width: 640px) 38vw, 20vw"
          className="object-cover object-center"
        />
        <div
          className={cn(
            "absolute inset-0",
            isYellow
              ? "bg-gradient-to-r from-yellow-950/40 to-transparent"
              : "bg-gradient-to-r from-teal-950/40 to-transparent",
          )}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20 rounded-3xl",
          isYellow ? "bg-yellow-400" : "bg-teal-400",
        )}
        aria-hidden
      />
    </motion.div>
  );
}

function Logo() {
  return <BrandLogo monochrome size="h-9 sm:h-10" />;
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
        "inline-flex size-8 sm:size-9 items-center justify-center rounded-lg transition-colors",
        "text-white/70 hover:text-white hover:bg-white/20",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="size-4 sm:size-5" />
      ) : (
        <Moon className="size-4 sm:size-5" />
      )}
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
      className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-lg"
      aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Globe className="size-4" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
