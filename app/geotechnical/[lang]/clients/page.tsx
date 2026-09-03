"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { ClientsGallery } from "@/geotech/components/pages/clients-gallery";
import { PageTransition } from "@/geotech/components/page-transition";
import Image from "next/image";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ClientsPage({ params }: PageProps) {
  const { lang } = use(params);
  const isAr = lang === "ar";

  return (
    <PageTransition>
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8"
          >
            <div className="max-w-3xl">
              <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
                <span className="h-px w-8 bg-primary" />
                {isAr ? "عملاؤنا" : "Our Clients"}
              </p>
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                {isAr
                  ? "جهات تثق بنا"
                  : "Clients Who Trust Us"}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-200">
                {isAr
                  ? "جهات موثوقة تقود مشاريع البنية التحتية والتجارية والصناعية في جميع أنحاء المملكة العربية السعودية."
                  : "Trusted by organizations delivering infrastructure, commercial, and industrial developments across Saudi Arabia."}
              </p>
            </div>
          </motion.div>
        </section>

        <div className="py-16 sm:py-20">
          <ClientsGallery />
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}
