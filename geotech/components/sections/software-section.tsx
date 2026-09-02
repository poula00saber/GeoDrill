"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";

interface SoftwareCategory {
  title: string;
  items: string[];
}

export function SoftwareSection() {
  const { dict } = useLanguage();
  if (!dict?.software) return null;

  const categories = Object.values(
    dict.software.categories,
  ) as SoftwareCategory[];

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
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technology Stack"
          title={dict.software.title}
          subtitle={dict.software.subtitle}
          align="center"
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {categories.map((category, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group rounded-lg border border-border/40 bg-surface/50 p-6 sm:p-8 hover:border-primary/30 hover:bg-surface/80 transition-all"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-6 pb-4 border-b border-border/40">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.items.map((software, j) => (
                  <li key={j} className="text-sm font-medium text-foreground">
                    {software}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
