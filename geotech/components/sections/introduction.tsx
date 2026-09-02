"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { TechnicalBadge } from "@/geotech/components/technical-badge";
import { ContourLines } from "@/geotech/components/geological/background";
import { siteImages } from "@/geotech/lib/images";

export function Introduction() {
  const { dict } = useLanguage();
  if (!dict) return null;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <ContourLines className="text-primary" opacity={0.04} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading title={dict.intro.title} className="mb-8" />
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
              <p>{dict.intro.p1}</p>
              <p>{dict.intro.p2}</p>
              <p>{dict.intro.p3}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <TechnicalBadge variant="primary">Geotechnical</TechnicalBadge>
              <TechnicalBadge>Geophysical</TechnicalBadge>
              <TechnicalBadge>Geological</TechnicalBadge>
              <TechnicalBadge>Hydrogeological</TechnicalBadge>
              <TechnicalBadge>Testing</TechnicalBadge>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${siteImages.investigation})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-center gap-2 rounded-md border border-border/40 bg-background/60 p-3 backdrop-blur-md">
                  <div className="h-8 w-1 bg-primary" />
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Field Investigation
                    </span>
                    <span className="text-sm font-medium">
                      Subsurface Drilling
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Depth indicator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -end-3 top-0 flex h-full flex-col items-center"
            >
              <span className="font-mono text-[9px] text-muted-foreground/60 [writing-mode:vertical-rl]">
                0m
              </span>
              <div className="my-1 w-px flex-1 bg-gradient-to-b from-primary/40 to-transparent" />
              <span className="font-mono text-[9px] text-muted-foreground/60 [writing-mode:vertical-rl]">
                30m
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
