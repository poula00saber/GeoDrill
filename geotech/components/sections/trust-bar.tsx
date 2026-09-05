'use client';

import { motion } from 'framer-motion';
import { Award, Layers, MapPin, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { AnimatedCounter } from '@/geotech/components/animated-counter';
import { ContourLines } from '@/geotech/components/geological/background';
import { cn } from '@/geotech/lib/utils';

export function TrustBar() {
  const { dict } = useLanguage();
  if (!dict) return null;

  const items = [
    { icon: Award, value: 17, suffix: '+', label: dict.trust.years, accent: 'from-amber-400/30' },
    { icon: Layers, value: 14, suffix: '', label: dict.trust.services, accent: 'from-primary/30' },
    { icon: MapPin, value: null, text: 'KSA', label: dict.trust.ksa, accent: 'from-amber-300/25' },
    { icon: ShieldCheck, value: null, text: 'ISO 9001', label: dict.trust.cert, accent: 'from-amber-500/25' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border/40">
      {/* Golden gradient + color wash background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-amber-500/10" />

      {/* Decorative shapes / color accents */}
      <ContourLines className="text-primary" opacity={0.05} />

      {/* Blurred gold orbs */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-amber-500/15 blur-3xl" />

      {/* Diagonal accent stroke */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Flying geometric detail */}
      <div className="pointer-events-none absolute right-8 top-1/2 hidden h-10 w-10 -translate-y-1/2 rotate-45 border border-primary/30 bg-primary/10 lg:block" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-primary/15 bg-surface/40 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-surface/70 hover:shadow-lg hover:shadow-primary/10 sm:p-7',
              )}
            >
              {/* Card color accent */}
              <div className={cn('absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r', item.accent)} />

              {/* Shape accent behind the number */}
              <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <item.icon className="mx-auto h-5 w-5 text-primary" strokeWidth={1.5} />
              <div className="mt-3 flex items-baseline justify-center gap-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {item.value !== null ? (
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                ) : (
                  item.text
                )}
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
