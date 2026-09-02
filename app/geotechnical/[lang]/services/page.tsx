"use client";

import { Metadata } from "next";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { use } from "react";
import Image from "next/image";
import { Navigation } from "@/geotech/components/navigation";
import { Footer } from "@/geotech/components/sections/footer";
import { SectionHeading } from "@/geotech/components/section-heading";
import { Button } from "@/geotech/components/ui/button";
import { WhatAreYouSolving } from "@/geotech/components/sections/what-are-you-solving";
import { TechnicalCapabilities } from "@/geotech/components/sections/technical-capabilities";
import {
  servicesData,
  serviceCategories,
  ServiceCategory,
} from "@/geotech/lib/services-data";

// Service image mapping
const serviceImages: Record<string, string> = {
  "geotechnical-investigation": "/images/service-excavation.png",
  "geophysical-survey": "/images/service-infrastructure.png",
  "geological-survey": "/images/sector-industrial.png",
  "hydrogeological-studies": "/images/service-mep.png",
  "material-testing-quality-control": "/images/service-concrete.png",
  "topographical-survey": "/images/project-groundworks-01.jpg",
  "cavity-probing-void-detection": "/images/service-steel.png",
  grouting: "/images/service-finishing.png",
  micropiling: "/images/project-industrial-01.jpg",
  "anchoring-shoring": "/images/service-groundworks.png",
  "soil-improvement": "/images/service-insulation.png",
  "structural-assessment": "/images/project-structures-02.jpg",
  "mining-exploration": "/images/sector-government.png",
  "laboratory-analysis": "/images/service-concrete.png",
};

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

        {/* Service Discovery */}
        <WhatAreYouSolving />

        {/* Technical Capabilities */}
        <TechnicalCapabilities />

        {/* Services by Category */}
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          {categories.map((category) => {
            const categoryServices = serviceCategories[category]
              .map((slug) => servicesData[slug])
              .filter(Boolean);

            return (
              <section key={category} className="mb-20">
                <SectionHeading
                  eyebrow={category}
                  title={categoryDescriptions[category]}
                />

                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service) => {
                    const imageSrc =
                      serviceImages[service.slug] ||
                      "/images/geotech-portal-placeholder.png";
                    return (
                      <motion.article
                        key={service.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface/50 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-surface hover:shadow-lg"
                      >
                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                          <Image
                            src={imageSrc}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono text-xs uppercase tracking-wider text-white/80">
                              {service.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="mt-3 flex-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                            {service.shortDescription}
                          </p>

                          <Button
                            asChild
                            variant="outline"
                            className="mt-5 self-start"
                          >
                            <Link
                              href={`/geotechnical/${lang}/services/${service.slug}`}
                            >
                              Explore
                              <ArrowRight className="ms-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </motion.article>
                    );
                  })}
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
            <Button asChild size="lg" className="mt-8">
              <Link href={`/geotechnical/${lang}/contact`}>
                Get in Touch
                <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
