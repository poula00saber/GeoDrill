"use client";

import { motion } from "framer-motion";
import { Map, Search, FlaskConical, Lightbulb } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { siteImages } from "@/geotech/lib/images";

export function MiningExploration() {
  const { dict } = useLanguage();
  if (!dict) return null;

  const steps = [
    { key: "map", icon: Map },
    { key: "survey", icon: Search },
    { key: "sample", icon: FlaskConical },
    { key: "interpret", icon: Lightbulb },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/30 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Mining Exploration"
          title={dict.mining.title}
          align="center"
          className="mb-12"
        />

        <div className="relative mb-12 overflow-hidden rounded-lg border border-border/40">
          <div className="relative aspect-[21/9]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${siteImages.mining})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-grid-sm opacity-10" />
          </div>
        </div>

        {/* Process */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex flex-col items-center gap-3 text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-background">
                <step.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                0{i + 1}
              </span>
              <span className="text-sm font-medium">
                {
                  dict.mining.process[
                    step.key as keyof typeof dict.mining.process
                  ]
                }
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
