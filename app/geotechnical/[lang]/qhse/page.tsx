"use client";

import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { QhseEnhanced } from "@/geotech/components/sections/qhse-enhanced";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { motion } from "framer-motion";

const pageContent = {
  en: {
    badge: "Quality • Health • Safety • Environment",
    title: "QHSE Framework",
    description:
      "Operating with absolute safety integrity, uncompromising precision, and accredited international compliance standards across Saudi Arabia.",
  },
  ar: {
    badge: "الجودة • الصحة • السلامة • البيئة",
    title: "إطار عمل الصحة والسلامة والجودة والبيئة",
    description:
      "العمل بسلامة مطلقة، ودقة متناهية، وبأعلى المعايير والاعتمادات الدولية المعتمدة في جميع أنحاء المملكة العربية السعودية.",
  },
};

export default function QhsePage() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const t = isAr ? pageContent.ar : pageContent.en;

  return (
    <>
      <Navigation />
      <main
        className="min-h-screen w-full bg-background"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Modern Header Section */}
        <section className="relative overflow-hidden border-b border-border/60 bg-surface/30 pb-20 pt-32">
          <div className="bg-grid absolute inset-0 opacity-20" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                {t.badge}
              </span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {t.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Dynamic QHSE Body */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <QhseEnhanced />
        </div>
      </main>
      <Footer />
    </>
  );
}
