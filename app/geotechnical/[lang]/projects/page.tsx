"use client";

import { Metadata } from "next";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

        {/* Projects Content */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {/* Placeholder: Real projects to be added */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 p-12">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                {isAr ? "معرض المشاريع قريبًا" : "Project Gallery Coming Soon"}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {isAr
                  ? "نعمل على تنظيم أمثلة من أفضل أعمالنا لإبراز خبراتنا. بينما نستعد لذلك، يمكنك استكشاف خدماتنا أو التواصل معنا لمناقشة احتياجات مشروعك."
                  : "We're curating our finest project work to showcase our expertise. In the meantime, explore our services or contact us to discuss your specific project needs."}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href={`/geotechnical/${lang}/services`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:gap-3"
                >
                  {isAr ? "استكشف خدماتنا" : "Explore Our Services"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/geotechnical/${lang}/contact`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 px-6 py-3 font-medium text-foreground transition-all hover:bg-surface"
                >
                  {isAr ? "ناقش مشروعك" : "Discuss Your Project"}
                </Link>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
      <Footer />
    </>
  );
}
