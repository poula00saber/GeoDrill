// ============================================================================
// geotech/components/sections/services-approach.tsx
// ============================================================================

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, FileText, Lightbulb, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/geotech/components/ui/button";

const steps = [
  {
    icon: Search,
    en: {
      label: "Investigate",
      description: "Understand site conditions through advanced investigation.",
    },
    ar: {
      label: "تحري",
      description: "فهم ظروف الموقع من خلال التحري المتقدم.",
    },
  },
  {
    icon: FileText,
    en: {
      label: "Analyze",
      description:
        "Analyze data using proven methods and engineering judgment.",
    },
    ar: {
      label: "تحليل",
      description: "تحليل البيانات باستخدام أساليب مثبتة والحكم الهندسي.",
    },
  },
  {
    icon: Lightbulb,
    en: {
      label: "Recommend",
      description: "Provide practical and cost-effective recommendations.",
    },
    ar: {
      label: "توصية",
      description: "تقديم توصيات عملية وفعالة من حيث التكلفة.",
    },
  },
  {
    icon: Rocket,
    en: {
      label: "Deliver",
      description: "Support your project from design through construction.",
    },
    ar: {
      label: "تنفيذ",
      description: "دعم مشروعك بدءًا من التصميم وحتى البناء.",
    },
  },
];

export function ServicesApproach({ locale = "en" }: { locale?: string }) {
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 text-slate-100 sm:py-24">
      {/* Decorative Engineering Grid Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-center lg:gap-16">
          {/* Left Column: Heading + CTA */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className={isAr ? "text-right" : "text-left"}
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              {isAr ? "نهجنا" : "Our Approach"}
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {isAr
                ? "نهج مُثبت لنتائج موثوقة"
                : "A Proven Approach for Reliable Results"}
            </h2>

            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
              {isAr
                ? "نتبع عملية منظمة لضمان تنفيذ كل مشروع بدقة وجودة وكفاءة."
                : "We follow a structured geotechnical workflow to ensure every site project is executed with accuracy, quality, and engineering efficiency."}
            </p>

            <Button
              asChild
              className="mt-8 bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary/90 shadow-lg shadow-primary/10"
            >
              <Link
                href={`/geotechnical/${locale}/about`}
                className="inline-flex items-center gap-2"
              >
                {isAr ? "اعرف المزيد عنا" : "Learn More About Us"}
                <ArrowRight className={`h-4 w-4 ${isAr ? "rotate-180" : ""}`} />
              </Link>
            </Button>
          </motion.div>

          {/* Right Column: Steps Stepper */}
          <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {/* Horizontal Connecting Bar (Desktop) */}
            <div
              className="absolute inset-x-8 top-7 hidden h-0.5 bg-gradient-to-r from-amber-500/20 via-amber-500/50 to-amber-500/20 lg:block"
              aria-hidden="true"
            />

            {steps.map((step, i) => (
              <motion.div
                key={step.en.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="group relative flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-center backdrop-blur-sm transition-all hover:border-amber-500/40 hover:bg-slate-900"
              >
                {/* Step Icon Badge */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-500/50 bg-slate-950 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-400">
                  <step.icon
                    className="h-6 w-6 text-amber-400 transition-colors group-hover:text-amber-300"
                    strokeWidth={1.75}
                  />
                </div>

                {/* Step Number Tag */}
                <span className="mt-4 inline-flex h-5 min-w-[2rem] items-center justify-center rounded bg-slate-800 px-2 font-mono text-xs font-bold text-slate-300 transition-colors group-hover:bg-amber-500/20 group-hover:text-amber-400">
                  0{i + 1}
                </span>

                {/* Step Label */}
                <h3 className="mt-3 text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {isAr ? step.ar.label : step.en.label}
                </h3>

                {/* Step Description */}
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {isAr ? step.ar.description : step.en.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
