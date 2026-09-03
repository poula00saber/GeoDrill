// ============================================================================
// geotech/components/sections/services-trust-strip.tsx
//
// The floating white/surface card that overlaps the bottom edge of the
// services-page hero. Content below is generic capability framing (accurate
// results, reliable solutions, on-time delivery, expert team) — not tied to
// any specific verified stat, safe to use as-is. Adjust wording if you want
// it to echo your real "What Sets Us Apart" copy instead.
// ============================================================================

"use client";

import { motion } from "framer-motion";
import { Target, ShieldCheck, Clock, Users } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";

const items = [
  {
    icon: Target,
    en: { title: "Accurate Results", description: "Advanced equipment and proven methods for precise data." },
    ar: { title: "نتائج دقيقة", description: "معدات متقدمة وأساليب مثبتة للحصول على بيانات دقيقة." },
  },
  {
    icon: ShieldCheck,
    en: { title: "Reliable Solutions", description: "Practical recommendations tailored to your project." },
    ar: { title: "حلول موثوقة", description: "توصيات عملية مصممة حسب مشروعك." },
  },
  {
    icon: Clock,
    en: { title: "On-Time Delivery", description: "Efficient workflows to keep your projects on track." },
    ar: { title: "التسليم في الوقت المحدد", description: "سير عمل فعّال لإبقاء مشاريعك على المسار الصحيح." },
  },
  {
    icon: Users,
    en: { title: "Expert Team", description: "Experienced engineers and geologists you can trust." },
    ar: { title: "فريق خبير", description: "مهندسون وجيولوجيون ذوو خبرة تثق بهم." },
  },
];

export function ServicesTrustStrip() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <div className="relative z-20 mx-auto -mt-16 max-w-6xl px-4 sm:-mt-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid gap-6 rounded-xl border border-border/60 bg-card p-6 shadow-lg sm:grid-cols-2 sm:p-8 lg:grid-cols-4"
      >
        {items.map((item) => {
          const copy = isAr ? item.ar : item.en;
          return (
            <div key={item.en.title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{copy.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {copy.description}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
