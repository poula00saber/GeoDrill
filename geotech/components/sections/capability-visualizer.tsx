"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Eye,
  ScanLine,
  BarChart3,
  AlertTriangle,
  ShieldAlert,
  Layers,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/geotech/lib/utils";

/**
 * Locale / rich / rich — a structured capability with all the metadata we need
 * to render a rich, interactive card instead of a single boring bullet line.
 */
export interface CapabilityRich {
  /** Unique slug within the service (e.g. "visual-inspection"). */
  id: string;
  /** Phase label shown above the title (e.g. "01 / Field"). */
  phase: string;
  /** Short title, e.g. "Visual Structural Inspections". */
  title: string;
  /** Single-sentence description. */
  description: string;
  /** Two-to-four bullet features. */
  features: string[];
  /** Lucide icon for the card. */
  icon: LucideIcon;
  /** Photo src — falls back to a built-in placeholder if missing. */
  image: string;
  /** Image alt text (English). */
  imageAlt: string;
  /** Accent tone for the card. */
  tone: "amber" | "primary" | "blue" | "rose" | "violet" | "emerald";
}

export interface CapabilityRichLocalized {
  title: string;
  description: string;
  features: string[];
  imageAlt: string;
  phase: string;
}

export interface CapabilityVisualizerProps {
  /** Optional eyebrow (e.g. "What We Deliver"). */
  eyebrow?: string;
  /** Heading text. */
  heading: string;
  /** Optional supporting copy. */
  subheading?: string;
  /** Current locale — "en" | "ar". */
  locale: "en" | "ar";
  /** Capability cards data in the current locale. */
  items: CapabilityRich[];
}

/**
 * Tone → Tailwind classes used by the card accent system.
 * Each tone has: subtle bg, border, glow, and dot color.
 */
const TONE_MAP: Record<
  CapabilityRich["tone"],
  {
    accent: string;
    glow: string;
    ring: string;
    dot: string;
    chip: string;
  }
> = {
  amber: {
    accent: "from-amber-500/20 to-amber-500/0",
    glow: "bg-amber-500/20",
    ring: "group-hover:border-amber-500/60",
    dot: "bg-amber-400",
    chip: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  primary: {
    accent: "from-primary/20 to-primary/0",
    glow: "bg-primary/20",
    ring: "group-hover:border-primary/60",
    dot: "bg-primary",
    chip: "bg-primary/15 text-primary border-primary/30",
  },
  blue: {
    accent: "from-sky-500/20 to-sky-500/0",
    glow: "bg-sky-500/15",
    ring: "group-hover:border-sky-500/60",
    dot: "bg-sky-400",
    chip: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  },
  rose: {
    accent: "from-rose-500/20 to-rose-500/0",
    glow: "bg-rose-500/15",
    ring: "group-hover:border-rose-500/60",
    dot: "bg-rose-400",
    chip: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  },
  violet: {
    accent: "from-violet-500/20 to-violet-500/0",
    glow: "bg-violet-500/15",
    ring: "group-hover:border-violet-500/60",
    dot: "bg-violet-400",
    chip: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  },
  emerald: {
    accent: "from-emerald-500/20 to-emerald-500/0",
    glow: "bg-emerald-500/15",
    ring: "group-hover:border-emerald-500/60",
    dot: "bg-emerald-400",
    chip: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
};

export function CapabilityVisualizer({
  eyebrow,
  heading,
  subheading,
  locale,
  items,
}: CapabilityVisualizerProps) {
  const isAr = locale === "ar";
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  const active = items.find((c) => c.id === activeId) ?? items[0];
  const ActiveIcon = active?.icon ?? Eye;
  const tone = TONE_MAP[active?.tone ?? "primary"];

  return (
    <section className="relative">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="mb-3 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </span>
            <span className="h-px w-8 bg-primary" />
          </motion.div>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
        >
          {heading}
        </motion.h2>
        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-4 text-balance text-base text-muted-foreground sm:text-lg"
          >
            {subheading}
          </motion.p>
        )}
      </div>

      {/* Card grid (always visible — clicking selects the focused card) */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((cap, idx) => {
          const Icon = cap.icon;
          const t = TONE_MAP[cap.tone];
          const isActive = cap.id === activeId;

          return (
            <motion.button
              key={cap.id}
              type="button"
              onClick={() => setActiveId(cap.id)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={cn(
                "group relative flex flex-col items-start overflow-hidden rounded-xl border bg-card p-5 text-start transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10",
                t.ring,
                isActive
                  ? "border-primary/70 shadow-lg shadow-primary/15"
                  : "border-border/70",
              )}
              aria-pressed={isActive}
            >
              {/* Number watermark */}
              <span
                className={cn(
                  "pointer-events-none absolute end-3 top-3 font-mono text-[10px] uppercase tracking-widest",
                  isActive ? "text-primary" : "text-muted-foreground/50",
                )}
              >
                {cap.phase}
              </span>

              {/* Accent gradient + glow */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  t.accent,
                  isActive && "opacity-100",
                )}
              />
              <div
                className={cn(
                  "pointer-events-none absolute -inset-px rounded-xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60",
                  t.glow,
                  isActive && "opacity-60",
                )}
              />

              <div className="relative">
                {/* Icon badge */}
                <div
                  className={cn(
                    "mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border bg-background/40 backdrop-blur-sm transition-all duration-300",
                    t.chip,
                    isActive && "scale-110",
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>

                <h3 className="text-base font-bold leading-snug text-foreground sm:text-lg">
                  {cap.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {cap.description}
                </p>

                {/* Indicator dots */}
                <div className="mt-4 flex items-center gap-1">
                  {items.map((dot, di) => (
                    <span
                      key={di}
                      className={cn(
                        "h-1 rounded-full transition-all",
                        di === idx ? `w-5 ${t.dot}` : "w-1 bg-border",
                      )}
                    />
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Focused detail panel — appears below the grid for the active card */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="mt-8 grid gap-6 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:p-6 md:grid-cols-5 md:gap-8 lg:p-8"
          >
            {/* Photo */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/40 bg-muted md:col-span-2 md:aspect-auto md:h-full">
              <Image
                src={active.image}
                alt={active.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                onError={(event) => {
                  event.currentTarget.src = "/images/contact-us-hero.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />

              {/* Floating phase badge */}
              <div
                className={cn(
                  "absolute start-4 top-4 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-md",
                  tone.chip,
                )}
              >
                <ActiveIcon className="h-3 w-3" />
                <span>{active.phase}</span>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3">
              <div className="mb-2 flex items-center gap-3">
                <span
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-lg border",
                    tone.chip,
                  )}
                >
                  <ActiveIcon className="h-4 w-4" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {isAr ? "القدرة المختارة" : "Selected capability"}
                </span>
              </div>

              <h3 className="text-balance text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
                {active.title}
              </h3>
              <p className="mt-3 text-balance text-sm leading-relaxed text-muted-foreground sm:text-base">
                {active.description}
              </p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {active.features.map((feature, fi) => (
                  <motion.li
                    key={fi}
                    initial={{ opacity: 0, x: isAr ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * fi }}
                    className="flex items-start gap-3 rounded-lg border border-border/40 bg-surface/40 p-3"
                  >
                    <CheckCircle2
                      className={cn(
                        "mt-0.5 h-4 w-4 flex-shrink-0",
                        isAr ? "rotate-180" : "",
                      )}
                      strokeWidth={2}
                      style={{ color: "hsl(var(--primary))" }}
                    />
                    <span className="text-xs leading-relaxed text-foreground/90 sm:text-sm">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Nav arrows between cards */}
              <div
                className={cn(
                  "mt-6 flex items-center gap-2",
                  isAr ? "flex-row-reverse" : "",
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    const i = items.findIndex((c) => c.id === active.id);
                    const prev = items[(i - 1 + items.length) % items.length];
                    setActiveId(prev.id);
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary rtl:rotate-180"
                  aria-label={isAr ? "السابق" : "Previous"}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const i = items.findIndex((c) => c.id === active.id);
                    const next = items[(i + 1) % items.length];
                    setActiveId(next.id);
                  }}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-surface/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary rtl:rotate-180"
                  aria-label={isAr ? "التالي" : "Next"}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                  {items.findIndex((c) => c.id === active.id) + 1} / {items.length}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * Default capabilities for the Structural Assessment service, used as a
 * ready-to-go rich visualization. Other services can build their own
 * `items` arrays following the same shape.
 */
export const STRUCTURAL_ASSESSMENT_CAPABILITIES: {
  en: CapabilityRich[];
  ar: CapabilityRich[];
} = {
  en: [
    {
      id: "visual-inspection",
      phase: "01 / Field",
      title: "Visual Structural Inspections",
      description:
        "On-site visual surveys that identify cracks, deformation, corrosion, and other visible defects across the structure.",
      features: [
        "Crack mapping & width monitoring",
        "Deflection & deformation surveys",
        "Surface condition & corrosion checks",
        "Photo log + deficiency register",
      ],
      icon: Eye,
      image: "/images/project-structures-02.jpg",
      imageAlt: "Engineer performing a visual inspection on a structural element",
      tone: "amber",
    },
    {
      id: "ndt",
      phase: "02 / Testing",
      title: "Non-Destructive Testing (NDT)",
      description:
        "In-place material and integrity testing that reveals hidden defects without damaging the structure.",
      features: [
        "Rebound hammer (concrete strength)",
        "Ultrasonic pulse velocity",
        "Cover meter & rebar scanning",
        "Half-cell potential for corrosion",
      ],
      icon: ScanLine,
      image: "/images/project-industrial-01.jpg",
      imageAlt: "NDT equipment in use on a concrete member",
      tone: "primary",
    },
    {
      id: "structural-analysis",
      phase: "03 / Analysis",
      title: "Structural Analysis",
      description:
        "Engineering analysis of buildings, bridges, and industrial facilities to verify capacity against current loads and codes.",
      features: [
        "Buildings, bridges & industrial facilities",
        "Load path & capacity verification",
        "Code compliance review",
        "Modeling with recognized software",
      ],
      icon: BarChart3,
      image: "/images/office-building-exterior.jpg",
      imageAlt: "Structural analysis of a building",
      tone: "blue",
    },
    {
      id: "damage-change-use",
      phase: "04 / Condition",
      title: "Damage & Change-of-Use Assessments",
      description:
        "Targeted evaluations when damage, deterioration, or a change in occupancy threatens the original design assumptions.",
      features: [
        "Damage & deterioration diagnosis",
        "Change-of-use feasibility",
        "Repair-vs-replace recommendation",
        "Risk classification & priority",
      ],
      icon: AlertTriangle,
      image: "/images/project-groundworks-01.jpg",
      imageAlt: "Damage assessment on an existing structure",
      tone: "rose",
    },
    {
      id: "post-incident",
      phase: "05 / Response",
      title: "Post-Incident Condition Assessment",
      description:
        "Rapid post-event evaluations after fire, impact, flooding or seismic events to determine if the structure is safe to occupy or needs immediate intervention.",
      features: [
        "Fire, impact & flood assessments",
        "Make-safe recommendations",
        "Rapid integrity rating",
        "Recovery & repair scope",
      ],
      icon: ShieldAlert,
      image: "/images/project-finishing-01.jpg",
      imageAlt: "Post-incident site assessment",
      tone: "violet",
    },
    {
      id: "foundation-design-support",
      phase: "06 / Integrated",
      title: "Foundation System Design Support",
      description:
        "Integrated structural support for foundation design — coordinated with grouting, repair, micropiling and underpinning divisions.",
      features: [
        "Grouting & repair integration",
        "Micropile coordination",
        "Underpinning design support",
        "Single-team accountability",
      ],
      icon: Layers,
      image: "/images/why-geodrill.jpg",
      imageAlt: "Integrated foundation design support",
      tone: "emerald",
    },
  ],
  ar: [
    {
      id: "visual-inspection",
      phase: "01 / ميدان",
      title: "الفحص البصري الإنشائي",
      description:
        "مسوحات بصرية في الموقع لتحديد الشروخ والتشوهات والصدأ وأي عيوب ظاهرة في العنصر الإنشائي.",
      features: [
        "رسم خرائط الشروخ ومراقبة عرضها",
        "مسوحات الانحراف والتشوه",
        "فحص حالة السطح والصدأ",
        "سجل صور وقائمة عيوب",
      ],
      icon: Eye,
      image: "/images/project-structures-02.jpg",
      imageAlt: "مهندس يجري فحصًا بصريًا لعنصر إنشائي",
      tone: "amber",
    },
    {
      id: "ndt",
      phase: "02 / اختبار",
      title: "الاختبارات غير الإتلافية (NDT)",
      description:
        "اختبارات ميدانية تكشف عن العيوب المخفية دون الإضرار بالعنصر الإنشائي.",
      features: [
        "مطرقة الارتداد (مقاومة الخرسانة)",
        "سرعة الموجات فوق الصوتية",
        "جهاز قياس الغطاء وحديد التسليح",
        "اختبار نصف الخلية للتآكل",
      ],
      icon: ScanLine,
      image: "/images/project-industrial-01.jpg",
      imageAlt: "استخدام معدات NDT على عنصر خرساني",
      tone: "primary",
    },
    {
      id: "structural-analysis",
      phase: "03 / تحليل",
      title: "التحليل الإنشائي",
      description:
        "تحليل هندسي للمباني والجسور والمنشآت الصناعية للتحقق من قدرتها وفق الأحمال والمعايير الحالية.",
      features: [
        "مباني وجسور ومنشآت صناعية",
        "التحقق من مسار الحمل والسعة",
        "مراجعة الامتثال للكود",
        "نمذجة باستخدام برامج معتمدة",
      ],
      icon: BarChart3,
      image: "/images/office-building-exterior.jpg",
      imageAlt: "تحليل إنشائي لمبنى",
      tone: "blue",
    },
    {
      id: "damage-change-use",
      phase: "04 / حالة",
      title: "تقييم الضرر وتغيير الاستخدام",
      description:
        "تقييمات موجّهة عند وجود ضرر أو تدهور أو تغيير في الاستخدام يهدد افتراضات التصميم الأصلية.",
      features: [
        "تشخيص الضرر والتدهور",
        "جدوى تغيير الاستخدام",
        "توصية بالترميم أو الاستبدال",
        "تصنيف المخاطر والأولوية",
      ],
      icon: AlertTriangle,
      image: "/images/project-groundworks-01.jpg",
      imageAlt: "تقييم ضرر على منشأة قائمة",
      tone: "rose",
    },
    {
      id: "post-incident",
      phase: "05 / استجابة",
      title: "تقييم الحالة بعد الحوادث",
      description:
        "تقييمات سريعة بعد الحريق أو الصدم أو الفيضان أو الزلازل لتحديد ما إذا كان المبنى آمنًا للسكن أو يحتاج لتدخل فوري.",
      features: [
        "تقييم الحريق والصدم والفيضان",
        "توصيات تأمين الموقع",
        "تصنيف سلامة سريع",
        "نطاق التعافي والترميم",
      ],
      icon: ShieldAlert,
      image: "/images/project-finishing-01.jpg",
      imageAlt: "تقييم الموقع بعد حادث",
      tone: "violet",
    },
    {
      id: "foundation-design-support",
      phase: "06 / متكامل",
      title: "دعم تصميم نظام الأساسات",
      description:
        "دعم إنشائي متكامل لتصميم الأساسات بالتنسيق مع فرق الحقن والترميم والخوازيق الدقيقة وتدعيم الأساسات.",
      features: [
        "تنسيق الحقن والترميم",
        "تنسيق الخوازيق الدقيقة",
        "دعم تصميم التدعيم",
        "مسؤولية فريق واحدة",
      ],
      icon: Layers,
      image: "/images/why-geodrill.jpg",
      imageAlt: "دعم متكامل لتصميم الأساسات",
      tone: "emerald",
    },
  ],
};