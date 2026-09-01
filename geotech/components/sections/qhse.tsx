'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, HeartPulse, Leaf, Award } from 'lucide-react';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { SectionHeading } from '@/geotech/components/section-heading';

export function QhseSection() {
  const { dict } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  if (!dict) return null;

  const pillars = [
    {
      icon: ShieldCheck,
      title: dict.qhse.quality.title,
      cert: dict.qhse.quality.cert,
      description: dict.qhse.quality.description,
      hasCert: true,
    },
    {
      icon: HeartPulse,
      title: dict.qhse.health.title,
      description: dict.qhse.health.description,
      hasCert: false,
    },
    {
      icon: Leaf,
      title: dict.qhse.environment.title,
      description: dict.qhse.environment.description,
      hasCert: false,
    },
  ];

  return (
    <section id="qhse" ref={containerRef} className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="QHSE"
          title={dict.qhse.title}
          align="center"
          className="mb-16"
        />

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Animated vertical line */}
          <div className="absolute start-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block">
            <motion.div
              className="w-full bg-primary"
              style={{ height: lineHeight }}
            />
          </div>

          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-background">
                <pillar.icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{pillar.title}</h3>
              {pillar.hasCert && (
                <div className="mt-3 flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                  <Award className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-xs font-medium text-primary">{pillar.cert}</span>
                </div>
              )}
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground text-pretty">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
