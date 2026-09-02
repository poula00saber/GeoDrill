"use client";

import { Metadata } from "next";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { QhseSection } from "@/geotech/components/sections/qhse";
import { QhseEnhanced } from "@/geotech/components/sections/qhse-enhanced";
import { motion } from "framer-motion";

// Note: Can't export metadata with "use client"

export default function QhsePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full bg-background">
        {/* Hero Section */}
        <section className="relative min-h-[40vh] w-full overflow-hidden bg-gradient-to-b from-surface to-background pt-24">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-grid opacity-20" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                QHSE Commitment
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Quality, Health, Safety, and Environmental excellence at every
                project stage.
              </p>
            </motion.div>
          </div>
        </section>

        {/* QHSE Content - Overview */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <QhseSection />
        </div>

        {/* QHSE Detailed Policies */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <QhseEnhanced />
        </div>
      </main>
      <Footer />
    </>
  );
}
