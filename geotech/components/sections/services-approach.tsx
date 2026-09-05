"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/geotech/components/ui/button";
import { useLanguage } from "@/geotech/components/providers/language-provider";

// Same canonical 5-step approach as the homepage (Investigate / Test /
// Analyze / Engineer / Advise). Pulled from `dict.approach.stages` so the
// services page and the homepage stay in lockstep.
const STAGE_KEYS = ["investigate", "test", "analyze", "engineer", "advise"] as const;

export function ServicesApproach({ locale = "en" }: { locale?: string }) {
  const { dict } = useLanguage();
  const isAr = locale === "ar";
  if (!dict?.approach) return null;

  const stages = STAGE_KEYS.map((key, i) => ({
    num: `0${i + 1}`,
    ...dict.approach.stages[key],
  }));

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
      {/* Soft gold orbs */}
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/3 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr] lg:items-center lg:gap-16">
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
              {dict.approach.title}
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

          {/* Right Column: 5-Step Stepper */}
          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
            {/* Horizontal Connecting Bar (Desktop) */}
            <div
              className="absolute inset-x-8 top-7 hidden h-0.5 bg-gradient-to-r from-amber-500/20 via-amber-500/50 to-amber-500/20 lg:block"
              aria-hidden="true"
            />

            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/60 p-5 text-center backdrop-blur-sm transition-all hover:border-amber-500/40 hover:bg-slate-900"
              >
                {/* Step Number Badge */}
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-amber-500/50 bg-slate-950 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:border-amber-400">
                  <span className="font-mono text-sm font-bold text-amber-400 group-hover:text-amber-300">
                    {stage.num}
                  </span>
                </div>

                {/* Step Label */}
                <h3 className="mt-4 text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {stage.title}
                </h3>

                {/* Step Description */}
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}