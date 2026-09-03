// ============================================================================
// geotech/components/sections/services-approach.tsx
//
// FLAG: this is a 4-step process (Investigate -> Analyze -> Recommend ->
// Deliver), matching the reference layout. Your homepage's existing
// `approach.tsx` describes a DIFFERENT 3-step process (Investigate ->
// Analyze -> Advise). Two different process descriptions on two pages is a
// consistency problem, not a variety feature — decide which one is the real
// canonical description of how GEODRILL works, and either:
//   (a) reuse that exact content/step-count here instead of this 4-step
//       version, or
//   (b) update homepage's approach.tsx to match this 4-step version instead.
// Don't ship both as-is.
// ============================================================================

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Search, FileText, Lightbulb, Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/geotech/components/ui/button";

const steps = [
  {
    icon: Search,
    en: { label: "Investigate", description: "Understand site conditions through advanced investigation." },
    ar: { label: "تحري", description: "فهم ظروف الموقع من خلال التحري المتقدم." },
  },
  {
    icon: FileText,
    en: { label: "Analyze", description: "Analyze data using proven methods and engineering judgment." },
    ar: { label: "تحليل", description: "تحليل البيانات باستخدام أساليب مثبتة والحكم الهندسي." },
  },
  {
    icon: Lightbulb,
    en: { label: "Recommend", description: "Provide practical and cost-effective recommendations." },
    ar: { label: "توصية", description: "تقديم توصيات عملية وفعالة من حيث التكلفة." },
  },
  {
    icon: Rocket,
    en: { label: "Deliver", description: "Support your project from design through construction." },
    ar: { label: "تنفيذ", description: "دعم مشروعك بدءًا من التصميم وحتى البناء." },
  },
];

export function ServicesApproach({ locale = "en" }: { locale?: string }) {
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-foreground py-20 text-background sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:gap-16">
          {/* Left: intro + link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-primary">
              {isAr ? "نهجنا" : "Our Approach"}
            </p>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              {isAr
                ? "نهج مُثبت لنتائج موثوقة"
                : "A Proven Approach for Reliable Results"}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/70">
              {isAr
                ? "نتبع عملية منظمة لضمان تنفيذ كل مشروع بدقة وجودة وكفاءة."
                : "We follow a structured process to ensure every project is executed with accuracy, quality and efficiency."}
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-6 border-background/30 bg-transparent text-background hover:bg-background/10"
            >
              <Link href={`/geotechnical/${locale}/about`}>
                {isAr ? "اعرف المزيد عنا" : "Learn More About Us"}
                <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          {/* Right: 4-step row with connecting line */}
          <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-4 sm:gap-y-0">
            <div className="absolute inset-x-0 top-6 hidden h-px border-t border-dashed border-background/25 sm:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.en.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-background">
                  <step.icon
                    className="h-6 w-6 text-foreground"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="mt-3 inline-flex h-6 min-w-6 items-center justify-center rounded bg-primary px-1.5 font-mono text-xs font-bold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-bold">
                  {isAr ? step.ar.label : step.en.label}
                </p>
                <p className="mt-1 max-w-[9rem] text-xs leading-relaxed text-background/60">
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
