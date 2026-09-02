"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";

interface WhyGroup {
  title: string;
  items: string[];
}

export function WhyGeoDrill() {
  const { dict, isArabic } = useLanguage();
  if (!dict?.whyGeoDrill) return null;

  const groups = Object.values(dict.whyGeoDrill.groups) as WhyGroup[];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Advantage"
          title={dict.whyGeoDrill.title}
          align="center"
          className="mb-20"
        />

        <div className="space-y-16">
          {groups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-l-2 border-primary/30 pl-8 md:pl-12"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-primary mb-6">
                {group.title}
              </h3>
              <div className="space-y-4">
                {group.items.map((item, j) => {
                  const [title, desc] = item.split(": ");
                  return (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className="group"
                    >
                      <p className="text-foreground font-medium">{title}</p>
                      {desc && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {desc}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
