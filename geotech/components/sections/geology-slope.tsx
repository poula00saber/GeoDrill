"use client";

import { motion } from "framer-motion";
import { Mountain, Compass } from "lucide-react";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { ContourLines } from "@/geotech/components/geological/background";
import { siteImages } from "@/geotech/lib/images";

export function GeologySlope() {
  const { dict } = useLanguage();
  if (!dict) return null;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/40">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${siteImages.geology})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <ContourLines className="text-primary" opacity={0.08} />
              {/* Slope arrows */}
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 400 300"
                preserveAspectRatio="xMidYMid slice"
              >
                <motion.path
                  d="M100,80 L100,120"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
                <motion.path
                  d="M250,60 L250,100"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#arrowhead)"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="6"
                    markerHeight="6"
                    refX="3"
                    refY="3"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 6 3, 0 6"
                      fill="hsl(var(--primary))"
                    />
                  </marker>
                </defs>
              </svg>
              <div className="absolute start-4 top-4">
                <div className="flex items-center gap-2 rounded-md border border-border/40 bg-background/60 p-2 backdrop-blur-md">
                  <Compass className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    Slope Assessment
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Geological Survey"
              title={dict.geology.title}
              description={dict.geology.description}
              className="mb-8"
            />
            <div className="flex flex-wrap gap-3">
              {[
                "Geological Mapping",
                "Remote Sensing",
                "Slope Stability",
                "Rock Mass Rating",
              ].map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2 rounded-md border border-border/40 bg-surface/50 px-3 py-2"
                >
                  <Mountain className="h-3.5 w-3.5 text-primary" />
                  <span className="text-xs font-medium">{tag}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
