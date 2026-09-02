"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/geotech/components/providers/language-provider";
import { SectionHeading } from "@/geotech/components/section-heading";
import { siteImages } from "@/geotech/lib/images";

export function GroundEngineering() {
  const { dict } = useLanguage();
  if (!dict) return null;

  const items = Object.entries(dict.groundEngineering.items).map(
    ([key, label]) => ({
      key,
      label,
    }),
  );

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface/30 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Ground Engineering"
              title={dict.groundEngineering.title}
              description={dict.groundEngineering.description}
              className="mb-8"
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {items.map((item, i) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative flex flex-col gap-1 rounded-md border border-border/40 bg-card p-3 transition-colors hover:border-primary/40"
                >
                  <span className="font-mono text-[9px] text-muted-foreground/50">
                    0{i + 1}
                  </span>
                  <span className="text-xs font-medium leading-tight">
                    {item.label}
                  </span>
                  <div className="absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/40">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{
                  backgroundImage: `url(${siteImages.groundEngineering})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex items-center gap-2 rounded-md border border-border/40 bg-background/60 p-3 backdrop-blur-md">
                  <div className="h-8 w-1 bg-primary" />
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Specialized Solutions
                    </span>
                    <span className="text-sm font-medium">
                      Site-Specific Engineering
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
