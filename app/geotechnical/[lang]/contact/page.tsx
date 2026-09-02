"use client";

import { Metadata } from "next";
import Image from "next/image";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { ContactSection } from "@/geotech/components/sections/contact";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";

// Note: Can't export metadata with "use client"

export default function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark" || theme === "system";

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full">
        {/* Hero Section */}
        <section className="relative min-h-[55vh] w-full overflow-hidden bg-background pt-24">
          {/* Hero photo — same field shot used in the homepage CTA banner */}
          <div className="absolute inset-0">
            <Image
              src="/images/contact-us-hero.jpg"
              alt="GEODRILL engineer working on a project site"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            {/* Scrims for text legibility (theme-aware) */}
            {isDark ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
              </>
            )}
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
              className="max-w-3xl"
            >
              <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
                <span className="h-px w-8 bg-primary" />
                Contact Us
              </div>
              <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Get in Touch
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/85">
                Our expert team is ready to discuss your project requirements
                and provide technical solutions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <ContactSection />
        </div>
      </main>
      <Footer />
    </>
  );
}
