"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { TechnicalBadge } from "@/geotech/components/technical-badge";
import {
  ContourLines,
  BoreholeGraphic,
} from "@/geotech/components/geological/background";

export function GeotechnicalInvestigation() {
  const { dict } = useLanguage();
  if (!dict) return null;

  const workflow = [
    { key: "drill", label: dict.geotechnical.workflow.drill },
    { key: "sample", label: dict.geotechnical.workflow.sample },
    { key: "test", label: dict.geotechnical.workflow.test },
    { key: "analyze", label: dict.geotechnical.workflow.analyze },
    { key: "report", label: dict.geotechnical.workflow.report },
  ];

  const methods = Object.entries(dict.geotechnical.methods).map(
    ([key, label]) => ({
      key,
      label,
    }),
  );

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/30 py-20 sm:py-28 md:py-32">
      <ContourLines className="text-primary" opacity={0.04} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Geotechnical Investigation"
              title={dict.geotechnical.title}
              description={dict.geotechnical.description}
              className="mb-8"
            />

            {/* Workflow */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2">
                {workflow.map((step, i) => (
                  <div key={step.key} className="flex items-center gap-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-center gap-2"
                    >
                      <span className="font-mono text-[10px] text-muted-foreground/60">
                        0{i + 1}
                      </span>
                      <span className="text-sm font-semibold uppercase tracking-wide">
                        {step.label}
                      </span>
                    </motion.div>
                    {i < workflow.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + 0.1, duration: 0.3 }}
                        className="h-px w-6 origin-left bg-primary sm:w-10"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Methods */}
            <div className="flex flex-wrap gap-2">
              {methods.map((method, i) => (
                <motion.div
                  key={method.key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <TechnicalBadge>{method.label}</TechnicalBadge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual: Borehole diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm">
              <BoreholeGraphic className="h-[500px] w-full text-primary" />
              {/* Layer labels */}
              {[
                { y: "8%", label: "Surface", color: "bg-amber-600/40" },
                { y: "22%", label: "Alluvial", color: "bg-yellow-700/40" },
                { y: "40%", label: "Sand", color: "bg-orange-800/40" },
                { y: "58%", label: "Weathered Rock", color: "bg-stone-600/40" },
                { y: "78%", label: "Bedrock", color: "bg-slate-700/40" },
              ].map((layer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="absolute inset-x-0 flex items-center gap-3"
                  style={{ top: layer.y }}
                >
                  <div className={`h-px flex-1 ${layer.color}`} />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {layer.label}
                  </span>
                </motion.div>
              ))}
              {/* Depth markers */}
              <div className="absolute -end-8 top-0 h-full">
                {[0, 5, 10, 15, 20, 25, 30].map((depth, i) => (
                  <div
                    key={i}
                    className="absolute flex items-center gap-1"
                    style={{ top: `${(depth / 30) * 90}%` }}
                  >
                    <span className="font-mono text-[9px] text-muted-foreground/50">
                      {depth}m
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
