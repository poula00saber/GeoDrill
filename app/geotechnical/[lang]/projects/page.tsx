"use client";

import { Metadata } from "next";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { use } from "react";

// Note: Can't export metadata with "use client", need to export from a server component
// For now, keeping for reference - metadata export will need to be in a wrapper if needed

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ProjectsPage({ params }: PageProps) {
  const { lang } = use(params);

  return (
    <>
      <Navigation />
      <main className="min-h-screen w-full">
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
                Our Projects
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Delivering excellence across infrastructure, commercial, and
                industrial developments in Saudi Arabia.
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
                Project Gallery Coming Soon
              </h2>
              <p className="mt-4 text-muted-foreground">
                We're curating our finest project work to showcase our
                expertise. In the meantime, explore our services or contact us
                to discuss your specific project needs.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href={`/geotechnical/${lang}/services`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:gap-3"
                >
                  Explore Our Services
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={`/geotechnical/${lang}/contact`}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 px-6 py-3 font-medium text-foreground transition-all hover:bg-surface"
                >
                  Discuss Your Project
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
