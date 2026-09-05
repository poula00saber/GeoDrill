"use client";

import { motion } from "framer-motion";
import { Award, Cpu, Users } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";

export function WhatSetsApart() {
  const { dict, isArabic } = useLanguage();
  if (!dict?.whatSetsUs) return null;

  const items = dict.whatSetsUs.items;
  const icons = [Award, Cpu, Users];

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/30 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={isArabic ? "الميزة التنافسية" : "Competitive Advantage"}
          title={dict.whatSetsUs.title}
          align="center"
          className="mb-12"
        />

        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i] ?? Award;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Icon
                      className="h-6 w-6 text-primary transition-transform group-hover:scale-110"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="font-mono text-2xl font-bold text-primary/20">
                    {item.number}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                  {item.description}
                </p>
                <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
