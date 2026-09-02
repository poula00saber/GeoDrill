"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { ClientsGallery } from "@/geotech/components/pages/clients-gallery";
import { PageTransition } from "@/geotech/components/page-transition";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ClientsPage({ params }: PageProps) {
  const { lang } = use(params);

  return (
    <PageTransition>
      <Navigation />
      <main className="min-h-screen w-full">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-surface to-background pt-24">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-grid opacity-20" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative mx-auto flex h-full min-h-[36vh] max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
          />
        </section>

        <div className="py-16 sm:py-20">
          <ClientsGallery />
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
}