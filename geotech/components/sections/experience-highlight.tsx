"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";

export function ExperienceHighlight() {
  const { dict } = useLanguage();
  if (!dict?.experienceHighlight) return null;

  const exp = dict.experienceHighlight;

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/50 py-20 sm:py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-primary mb-2">
            {exp.title}
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-8">
            {exp.subtitle}
          </p>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-muted-foreground">
            {exp.description}
          </p>
          <p className="mt-8 text-sm text-foreground/70 font-medium">
            {exp.highlight}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
