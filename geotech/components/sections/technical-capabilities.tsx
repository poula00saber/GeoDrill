"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";

export function TechnicalCapabilities() {
  const { dict } = useLanguage();
  if (!dict?.geotechnical?.methods) return null;

  const methods = Object.values(dict.geotechnical.methods);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technical Methods"
          title="Technical Capabilities & Methods"
          subtitle="Industry-standard investigation, testing and analytical techniques"
          align="center"
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {methods.map((method, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group rounded-lg border border-border/40 bg-surface/50 px-4 py-3 text-center hover:border-primary/40 hover:bg-surface transition-all"
            >
              <p className="text-xs sm:text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {method}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-12 text-center text-sm text-muted-foreground">
          These methods combine with specialized equipment and expert
          interpretation to deliver reliable subsurface intelligence for every
          project.
        </p>
      </div>
    </section>
  );
}
