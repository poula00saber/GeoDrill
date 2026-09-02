"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { use } from "react";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { SectionHeading } from "@/geotech/components/section-heading";
import {
  servicesData,
  serviceCategories,
  ServiceCategory,
} from "@/geotech/lib/services-data";

// Note: Can't export metadata with "use client", need to export from a server component
// For now, keeping it for reference - metadata export will need to be in a wrapper if needed

const categories: ServiceCategory[] = [
  "Ground",
  "Testing",
  "Engineering",
  "Studies",
];

const categoryDescriptions: Record<ServiceCategory, string> = {
  Ground: "Subsurface investigation and geological characterization services",
  Testing: "Materials and quality control testing throughout your project",
  Engineering: "Foundation design and ground improvement solutions",
  Studies: "Specialized assessments and resource exploration services",
};

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default function ServicesPage({ params }: PageProps) {
  const { lang } = use(params);

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
                Our Services
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                GEODRILL offers a comprehensive suite of geotechnical,
                geophysical, and engineering services across four specialized
                categories.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services by Category */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryServices = serviceCategories[category]
              .map((slug) => servicesData[slug])
              .filter(Boolean);

            return (
              <section key={category} className="mb-20">
                <SectionHeading
                  label={category}
                  title={categoryDescriptions[category]}
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => (
                    <motion.article
                      key={service.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="group overflow-hidden rounded-lg border border-border/60 bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-surface hover:shadow-lg"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-muted">
                        {/* Placeholder for service image */}
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                            {service.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                          {service.shortDescription}
                        </p>

                        <Link
                          href={`/geotechnical/${lang}/services/${service.slug}`}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3"
                        >
                          Explore
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5 p-12 text-center"
          >
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Can't find what you need?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Contact our team to discuss custom solutions for your project
              requirements.
            </p>
            <Link
              href={`/geotechnical/${lang}/contact`}
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:gap-3"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
