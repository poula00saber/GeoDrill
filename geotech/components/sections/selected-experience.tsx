"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";

export function SelectedExperience() {
  const { dict } = useLanguage();
  if (!dict?.selectedExperience) return null;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Track Record"
          title={dict.selectedExperience.title}
          subtitle={dict.selectedExperience.subtitle}
          align="center"
          className="mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="rounded-lg border border-border/40 bg-surface/50 backdrop-blur-sm p-12 sm:p-16 text-center"
        >
          <p className="text-lg text-muted-foreground mb-4">
            {dict.selectedExperience.placeholder}
          </p>
          <p className="text-sm text-foreground/60">
            Project documentation and case studies will be published as
            verification is completed.
          </p>

          {/* Column Headers */}
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 text-xs uppercase tracking-wider text-primary font-mono pb-8 border-b border-border/30">
            <div>{dict.selectedExperience.columns.project}</div>
            <div>{dict.selectedExperience.columns.location}</div>
            <div>{dict.selectedExperience.columns.service}</div>
            <div>{dict.selectedExperience.columns.sector}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
