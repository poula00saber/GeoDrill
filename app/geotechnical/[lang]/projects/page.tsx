"use client";

import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { ProjectNavigator } from "@/geotech/components/sections/project-navigator";
import { GoldGradientBand } from "@/geotech/components/sections/gold-gradient-band";
import { motion } from "framer-motion";
import { use } from "react";
import Image from "next/image";

// Note: Can't export metadata with "use client", need to export from a server component
// For now, keeping for reference - metadata export will need to be in a wrapper if needed

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ProjectsPage({ params }: PageProps) {
  const { lang } = use(params);
  const isAr = lang === "ar";

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full">
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
                <span className="h-px w-8 bg-primary" />
                {isAr ? "مشاريعنا" : "Our Projects"}
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {isAr ? "مشاريع جيودريل" : "Our Projects"}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-200">
                {isAr
                  ? "تسليم التميز عبر مشاريع البنية التحتية والتجارية والصناعية في المملكة العربية السعودية."
                  : "Delivering excellence across infrastructure, commercial, and industrial developments in Saudi Arabia."}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Centered gold-gradient band directly under the hero */}
        <GoldGradientBand
          eyebrow={isAr ? "سجل الأعمال" : "Track Record"}
          title={isAr ? "الخبرات المختارة" : "Selected Experience"}
          description={
            isAr
              ? "مشاريع جيوتقنية وجيوفيزيائية تمثيلية من أعمال جيودريل في جميع أنحاء المملكة العربية السعودية."
              : "Representative geotechnical and geoscience projects from GEODRILL's portfolio across Saudi Arabia."
          }
        />

        {/* Projects Content */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <ProjectNavigator showAll className="py-8 md:py-12" />
        </div>
      </main>
      <Footer />
    </>
  );
}
