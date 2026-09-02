"use client";

import { Metadata } from "next";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { AboutSection } from "@/geotech/components/sections/about";
import { WhoWeAre } from "@/geotech/components/sections/who-we-are";
import { ExperienceHighlight } from "@/geotech/components/sections/experience-highlight";
import { WhatSetsUsApart } from "@/geotech/components/sections/what-sets-us-apart-detail";
import { VisionMissionGoals } from "@/geotech/components/sections/vision-mission-goals";
import { SoftwareSection } from "@/geotech/components/sections/software-section";
import { Organizations } from "@/geotech/components/sections/organizations";
import { ContactSection } from "@/geotech/components/sections/contact";
import { motion } from "framer-motion";

// Note: Can't export metadata with "use client"

export default function AboutPage() {
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
                About GEODRILL
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Pioneering geotechnical solutions and expertise across Saudi
                Arabia.
              </p>
            </motion.div>
          </div>
        </section>

        {/* About Sections */}
        <WhoWeAre />
        <ExperienceHighlight />
        <WhatSetsUsApart />
        <VisionMissionGoals />
        <SoftwareSection />
        <Organizations />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
