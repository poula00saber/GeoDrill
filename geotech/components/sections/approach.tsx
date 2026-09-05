"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";

export function Approach() {
  const { dict } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 80%"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (!dict) return null;

  const stages = [
    { ...dict.approach.stages.investigate, num: "01" },
    { ...dict.approach.stages.test, num: "02" },
    { ...dict.approach.stages.analyze, num: "03" },
    { ...dict.approach.stages.engineer, num: "04" },
    { ...dict.approach.stages.advise, num: "05" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-y border-border bg-surface/30 py-20 sm:py-28 md:py-32"
    >
      <div className="pointer-events-none absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-64 w-64 rounded-full bg-amber-500/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Approach"
          title={dict.approach.title}
          align="center"
          className="mb-16"
        />

        <div className="relative grid gap-8 md:grid-cols-5 md:gap-0">
          {/* Animated horizontal line */}
          <div className="absolute inset-x-0 top-8 hidden h-0.5 bg-border md:block">
            <motion.div
              className="h-full bg-amber-500"
              style={{ width: lineWidth }}
            />
          </div>

          {stages.map((stage, i) => (
            <StageNode
              key={i}
              stage={stage}
              index={i}
              total={stages.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StageNode({
  stage,
  index,
  total,
  progress,
}: {
  stage: any;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Trigger highlight right when the line reaches this node's relative position
  const nodeThreshold = index / (total - 1);

  const scale = useTransform(
    progress,
    [nodeThreshold - 0.05, nodeThreshold, nodeThreshold + 0.05],
    [1, 1.25, 1.25],
  );

  const borderColor = useTransform(
    progress,
    [nodeThreshold - 0.02, nodeThreshold],
    ["var(--border)", "#f59e0b"], // Tailwind border-border to amber-500
  );

  const activeGlow = useTransform(
    progress,
    [nodeThreshold - 0.02, nodeThreshold],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 20px rgba(245, 158, 11, 0.6)"],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex flex-col items-center text-center md:px-4"
    >
      <motion.div
        style={{
          scale,
          borderColor,
          boxShadow: activeGlow,
        }}
        className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-background transition-colors duration-300"
      >
        <span className="font-mono text-lg font-bold text-amber-500">
          {stage.num}
        </span>
      </motion.div>

      <span className="mt-6 font-mono text-xs uppercase tracking-wider text-primary">
        {stage.label}
      </span>
      <h3 className="mt-2 text-lg font-semibold">{stage.title}</h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
        {stage.description}
      </p>
    </motion.div>
  );
}
