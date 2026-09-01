'use client';

import { motion } from 'framer-motion';
import { Award, Layers, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { AnimatedCounter } from '@/geotech/components/animated-counter';

export function TrustBar() {
  const { dict } = useLanguage();
  if (!dict) return null;

  const items = [
    { icon: Award, value: 17, suffix: '+', label: dict.trust.years },
    { icon: Layers, value: 14, suffix: '', label: dict.trust.services },
    { icon: MapPin, value: null, text: 'KSA', label: dict.trust.ksa },
    { icon: ShieldCheck, value: null, text: 'ISO 9001', label: dict.trust.cert },
  ];

  return (
    <section className="relative border-b border-border/40 bg-surface/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden md:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 px-6 py-8 text-center md:py-10"
            >
              <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              <div className="text-3xl font-bold tracking-tight sm:text-4xl">
                {item.value !== null ? (
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                ) : (
                  item.text
                )}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
