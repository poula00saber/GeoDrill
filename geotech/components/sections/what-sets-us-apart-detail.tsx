"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";

export function WhatSetsUsApart() {
  const { dict } = useLanguage();
  if (!dict?.whatSetsUs) return null;

  const items = dict.whatSetsUs.items;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Competitive Advantage"
          title={dict.whatSetsUs.title}
          align="center"
          className="mb-16"
        />

        <div className="space-y-8 md:space-y-12">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group border border-border/40 rounded-lg overflow-hidden bg-surface/30 hover:bg-surface/60 hover:border-border/60 transition-all"
            >
              <div className="p-8 sm:p-10 md:p-12">
                <div className="flex items-start gap-6 md:gap-8">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/30 bg-surface/50">
                      <span className="font-mono text-lg font-bold text-primary">
                        {item.number}
                      </span>
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
