'use client';

import { motion } from 'framer-motion';
import { Droplets, Waves, CloudRain, Shield } from 'lucide-react';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { SectionHeading } from '@/geotech/components/section-heading';
import { siteImages } from '@/geotech/lib/images';

export function HydrologySection() {
  const { dict } = useLanguage();
  if (!dict) return null;

  const flow = [
    { key: 'rain', icon: CloudRain },
    { key: 'watershed', icon: Shield },
    { key: 'runoff', icon: Waves },
    { key: 'groundwater', icon: Droplets },
    { key: 'aquifer', icon: Droplets },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-surface/30 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Hydrology & Hydrogeology"
          title={dict.hydrology.title}
          align="center"
          className="mb-12"
        />

        {/* Flow diagram */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {flow.map((step, i) => (
            <div key={step.key} className="flex items-center gap-2 sm:gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/5">
                  <step.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {dict.hydrology.flow[step.key as keyof typeof dict.hydrology.flow]}
                </span>
              </motion.div>
              {i < flow.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.1 }}
                  className="h-px w-6 origin-left bg-primary/40 sm:w-12"
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg border border-border/40 bg-card p-6"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="h-8 w-1 bg-primary" />
              <h3 className="text-lg font-semibold">{dict.hydrology.hydrologyTitle}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {dict.hydrology.hydrology}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-lg border border-border/40 bg-card p-6"
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="h-8 w-1 bg-primary" />
              <h3 className="text-lg font-semibold">{dict.hydrology.hydrogeologyTitle}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
              {dict.hydrology.hydrogeology}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
