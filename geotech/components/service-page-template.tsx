"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceContent, servicesData } from "@/geotech/lib/services-data";
import { Button } from "@/geotech/components/ui/button";
import { TechnicalBadge } from "@/geotech/components/technical-badge";
import { SectionHeading } from "@/geotech/components/section-heading";

interface ServicePageTemplateProps {
  service: ServiceContent;
  customVisual?: ReactNode;
  locale?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function ServicePageTemplate({
  service,
  customVisual,
  locale = "en",
}: ServicePageTemplateProps) {
  const isCapabilitiesGrouped = typeof service.capabilities[0] !== "string";
  const baseHref = `/geotechnical/${locale}`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Hero Banner */}
      <section className="relative min-h-[50vh] w-full overflow-hidden bg-gradient-to-b from-surface to-background pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={service.heroImage}
            alt={service.heroAlt}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div variants={itemVariants} className="max-w-2xl">
            {/* Category badge */}
            <motion.div className="mb-6 inline-flex">
              <span className="rounded-full bg-primary/20 px-3 py-1 font-mono text-xs uppercase tracking-widest text-primary">
                {service.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {service.title}
            </motion.h1>

            {/* Short description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-xl text-lg leading-relaxed text-gray-200"
            >
              {service.shortDescription}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Overview Section */}
        <motion.section variants={itemVariants} className="mb-20">
          <div className="prose prose-invert max-w-none">
            {service.overview.map((paragraph, idx) => (
              <motion.p
                key={idx}
                variants={itemVariants}
                className="mb-4 max-w-3xl text-base leading-relaxed text-muted-foreground lg:text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.section>

        {/* Standards Referenced */}
        {service.standardsReferenced &&
          service.standardsReferenced.length > 0 && (
            <motion.section variants={itemVariants} className="mb-20">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Standards & Frameworks
              </h2>
              <div className="flex flex-wrap gap-2">
                {service.standardsReferenced.map((standard) => (
                  <TechnicalBadge key={standard}>{standard}</TechnicalBadge>
                ))}
              </div>
            </motion.section>
          )}

        {/* Process Steps */}
        {service.processSteps && service.processSteps.length > 0 && (
          <motion.section variants={itemVariants} className="mb-20">
            <SectionHeading eyebrow="Process" title="How We Work" />
            <div className="mt-12 grid gap-4">
              {service.processSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative flex gap-6 rounded-lg border border-border/70 bg-surface/40 p-5 lg:gap-8"
                >
                  {/* Step number */}
                  <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary bg-primary/10 lg:h-14 lg:w-14">
                    <span className="font-mono text-sm font-bold text-primary lg:text-base">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground lg:text-lg">
                      {step.label}
                    </h3>
                    {step.description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Custom Visual */}
        {customVisual && (
          <motion.section variants={itemVariants} className="mb-20">
            {customVisual}
          </motion.section>
        )}

        {/* Capabilities Section */}
        <motion.section variants={itemVariants} className="mb-20">
          <SectionHeading eyebrow="Capabilities" title="What We Deliver" />

          {isCapabilitiesGrouped ? (
            // Grouped capabilities
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {Object.entries(
                service.capabilities as Record<string, string[]>,
              ).map(([groupName, items]) => (
                <motion.div
                  key={groupName}
                  variants={itemVariants}
                  className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                >
                  <div className="border-b border-border bg-surface px-5 py-3">
                    <h3 className="font-bold text-foreground lg:text-lg">
                      {groupName}
                    </h3>
                  </div>
                  <ul className="divide-y divide-border">
                    {items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        variants={itemVariants}
                        className="flex items-start gap-3 px-5 py-3 text-sm leading-relaxed text-foreground/90"
                      >
                        <span className="mt-1.5 flex h-2.5 w-2.5 flex-shrink-0 items-center justify-center rounded-full bg-primary" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          ) : (
            // Flat capabilities list -> bordered card grid
            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {(service.capabilities as string[]).map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="flex items-start gap-3 rounded-lg border border-border/70 bg-card px-4 py-3 transition-colors hover:border-primary/50"
                >
                  <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <span className="text-sm leading-relaxed text-foreground/90">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Gallery */}
        {service.gallery && service.gallery.length > 0 && (
          <motion.section variants={itemVariants} className="mb-20">
            <SectionHeading eyebrow="Gallery" title="In Action" />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.gallery.map((image, idx) => (
                <motion.figure
                  key={idx}
                  variants={itemVariants}
                  className="overflow-hidden rounded-lg border border-border bg-surface transition-all hover:shadow-md hover:shadow-primary/10"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  {image.caption && (
                    <figcaption className="p-4 text-sm text-muted-foreground">
                      {image.caption}
                    </figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          </motion.section>
        )}

        {/* Related Services */}
        {service.relatedServices && service.relatedServices.length > 0 && (
          <motion.section variants={itemVariants} className="mb-20">
            <SectionHeading eyebrow="Explore" title="Related Services" />

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.relatedServices.map((slug) => {
                const related = servicesData[slug];
                const title = related?.title ?? slug;
                const desc = related?.shortDescription ?? "Related technical expertise";
                return (
                  <motion.div
                    key={slug}
                    variants={itemVariants}
                    className="group flex flex-col rounded-lg border border-border/70 bg-surface/50 p-6 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-surface hover:shadow-md hover:shadow-primary/5"
                  >
                    <h3 className="font-bold text-foreground">{title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground line-clamp-2">
                      {desc}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="mt-5 self-start"
                    >
                      <Link href={`${baseHref}/services/${slug}`}>
                        Learn more
                        <ArrowRight className="ms-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.section
          variants={itemVariants}
          className="rounded-lg border border-border bg-gradient-to-r from-primary/10 to-primary/5 p-10 text-center sm:p-12"
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Ready to discuss your project?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Our experts are ready to provide technical consultation and support
            for your specific needs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={`${baseHref}/contact`}>
                Get in Touch
                <ArrowRight className="ms-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`${baseHref}/services`}>
                Explore All Services
              </Link>
            </Button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
