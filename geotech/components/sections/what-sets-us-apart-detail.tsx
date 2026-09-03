"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";

export function WhatSetsUsApart() {
  const { dict, isArabic } = useLanguage();
  if (!dict?.whatSetsUs) return null;

  const items = dict.whatSetsUs.items;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isArabic ? "الميزة التنافسية" : "Competitive Advantage"}
          title={dict.whatSetsUs.title}
          align="center"
          className="mb-16"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group overflow-hidden rounded-lg border border-border/40 bg-surface/30 transition-all duration-300 hover:-translate-y-2 hover:border-primary/60 hover:bg-primary/5 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="h-full p-6 sm:p-8">
                <div className="flex h-full flex-col items-center text-center md:items-start md:text-start">
                  {/* Number */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary/30 bg-surface/50 transition-colors duration-300 group-hover:border-primary group-hover:bg-primary/10">
                      <span className="font-mono text-lg font-bold text-primary">
                        {item.number}
                      </span>
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-6 min-w-0 flex-1">
                    <h3 className="mb-4 text-xl font-bold sm:text-2xl">
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
