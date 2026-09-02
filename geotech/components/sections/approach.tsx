"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";

export function Approach() {
  const { dict } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  if (!dict) return null;

  const stages = [
    { ...dict.approach.stages.investigate, num: "01" },
    { ...dict.approach.stages.analyze, num: "02" },
    { ...dict.approach.stages.advise, num: "03" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-y border-border bg-surface/30 py-20 sm:py-28 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Approach"
          title={dict.approach.title}
          align="center"
          className="mb-16"
        />

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-0">
          {/* Animated connecting line */}
          <div className="absolute inset-x-0 top-8 hidden h-px bg-border md:block">
            <motion.div
              className="h-full bg-primary"
              style={{ width: lineHeight }}
            />
          </div>

          {stages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center md:px-8"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-background">
                <span className="font-mono text-lg font-bold text-primary">
                  {stage.num}
                </span>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15, type: "spring" }}
                  className="absolute inset-0 rounded-full border-2 border-primary/30"
                />
              </div>
              <span className="mt-6 font-mono text-xs uppercase tracking-wider text-primary">
                {stage.label}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{stage.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
                {stage.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
