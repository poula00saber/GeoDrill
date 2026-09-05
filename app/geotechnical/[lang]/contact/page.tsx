"use client";

import Image from "next/image";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { ContactSection } from "@/geotech/components/sections/contact";
import { GoldGradientBand } from "@/geotech/components/sections/gold-gradient-band";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { motion } from "framer-motion";

export default function ContactPage() {
  const { dict, locale } = useLanguage();
  const isAr = locale === "ar";

  if (!dict) return null;

  return (
    <>
      <Navigation />
      <main
        className="min-h-screen w-full bg-background"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* Hero Section */}
        <section className="relative min-h-[55vh] w-full overflow-hidden bg-background pt-24">
          {/* Hero photo */}
          <div className="absolute inset-0">
            <Image
              src="/images/contact-us-hero.jpg"
              alt={
                isAr
                  ? "مهندس جيودريل يعمل في موقع المشروع"
                  : "GEODRILL engineer working on a project site"
              }
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Scrims flip direction automatically for RTL gradient depth */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                isAr
                  ? "from-black/20 via-black/55 to-black/80"
                  : "from-black/80 via-black/55 to-black/20"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
          </div>

          {/* Technical grid overlay */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-grid opacity-20" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl text-start"
            >
              <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-8 bg-primary" />
                {dict.contact.title}
              </div>

              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {isAr ? "تواصل معنا" : "Get in Touch"}
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-200">
                {dict.contact.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Centered gold-gradient band under the hero */}
        <GoldGradientBand
          eyebrow={isAr ? "تواصل معنا" : "Get in Touch"}
          title={
            isAr
              ? "دعنا نفهم مشروعك"
              : "Let's Understand Your Project"
          }
          description={
            isAr
              ? "أخبرنا بما تخطط له، وسيساعدك فريقنا في تحديد نهج التحقيق والهندسة المناسب لمتطلباتك الخاصة."
              : "Tell us what you are planning, investigating or building. Our team can help identify the right investigation and engineering approach for your specific needs."
          }
        />

        {/* Contact Content */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
