"use client";

import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { QhseEnhanced } from "@/geotech/components/sections/qhse-enhanced";
import { GoldGradientBand } from "@/geotech/components/sections/gold-gradient-band";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { motion } from "framer-motion";
import Image from "next/image";

const pageContent = {
  en: {
    badge: "Quality • Health • Safety • Environment",
    title: "Quality. Health. Safety. Environment.",
    description:
      "Our QHSE framework governs how we plan, execute and deliver every project — protecting people, the environment and the integrity of our work.",
  },
  ar: {
    badge: "الجودة • الصحة • السلامة • البيئة",
    title: "الجودة. الصحة. السلامة. البيئة.",
    description:
      "يوجّه إطار عمل الجودة والسلامة والبيئة لدينا كيفية تخطيط وتنفيذ وتسليم كل مشروع — لحماية الناس والبيئة وسلامة عملنا.",
  },
};

export default function QhsePage() {
  const { locale } = useLanguage();
  const isAr = locale === "ar";
  const t = isAr ? pageContent.ar : pageContent.en;

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full" dir={isAr ? "rtl" : "ltr"}>
        {/* Simple photo hero matching the services page */}
        <section className="relative min-h-[55vh] w-full overflow-hidden bg-background pt-24">
          <div className="absolute inset-0">
            <Image
              src="/images/geotech-hero1.jpg"
              alt="GEODRILL field team on an active investigation site"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                {t.badge}
              </span>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {t.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-200">
                {t.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Centered gold-gradient band under the hero */}
        <GoldGradientBand
          eyebrow={isAr ? "الجودة والسلامة" : "Quality & Safety"}
          title={
            isAr
              ? "التميز في كل موقع"
              : "Excellence on Every Site"
          }
          description={
            isAr
              ? "أعلى معايير السلامة والدقة والاعتماد الدولي في جميع عملياتنا عبر المملكة العربية السعودية."
              : "The highest standards of safety, precision, and international accreditation across every operation in Saudi Arabia."
          }
        />

        {/* Dynamic QHSE Body */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <QhseEnhanced />
        </div>
      </main>
      <Footer />
    </>
  );
}
