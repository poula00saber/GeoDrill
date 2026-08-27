'use client';

import { motion } from 'framer-motion';
import { Brain, Cpu, Database, ShieldCheck, HardHat, Users } from 'lucide-react';
import { useLanguage } from '@/components/geotech/providers/language-provider';
import { SectionHeading } from '@/components/geotech/section-heading';

export function WhatSetsApart() {
  const { dict } = useLanguage();
  if (!dict) return null;

  const pillars = [
    { key: 'expertise', icon: Brain },
    { key: 'technology', icon: Cpu },
    { key: 'reliableData', icon: Database },
    { key: 'quality', icon: ShieldCheck },
    { key: 'safety', icon: HardHat },
    { key: 'clientFocus', icon: Users },
  ] as const;

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-surface/30 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What Sets Us Apart"
          title={dict.apart.title}
          align="center"
          className="mb-12"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-lg border border-border/40 bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <pillar.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <span className="font-mono text-2xl font-bold text-primary/20">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{dict.apart.pillars[pillar.key].title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                {dict.apart.pillars[pillar.key].description}
              </p>
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

