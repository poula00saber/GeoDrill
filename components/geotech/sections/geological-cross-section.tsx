'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/geotech/providers/language-provider';
import { SectionHeading } from '@/components/geotech/section-heading';
import { cn } from '@/lib/geotech-utils';

interface Layer {
  key: string;
  labelKey: 'surface' | 'alluvial' | 'sand' | 'clay' | 'weathered' | 'fractured' | 'bedrock';
  height: number;
  color: string;
  darkColor: string;
}

const layers: Layer[] = [
  { key: 'surface', labelKey: 'surface', height: 8, color: 'bg-amber-500/60', darkColor: 'dark:bg-amber-600/50' },
  { key: 'alluvial', labelKey: 'alluvial', height: 12, color: 'bg-yellow-700/50', darkColor: 'dark:bg-yellow-800/40' },
  { key: 'sand', labelKey: 'sand', height: 18, color: 'bg-orange-300/50', darkColor: 'dark:bg-orange-900/40' },
  { key: 'clay', labelKey: 'clay', height: 15, color: 'bg-rose-400/40', darkColor: 'dark:bg-rose-900/40' },
  { key: 'weathered', labelKey: 'weathered', height: 18, color: 'bg-stone-500/50', darkColor: 'dark:bg-stone-700/40' },
  { key: 'fractured', labelKey: 'fractured', height: 14, color: 'bg-slate-600/50', darkColor: 'dark:bg-slate-700/40' },
  { key: 'bedrock', labelKey: 'bedrock', height: 15, color: 'bg-zinc-800/60', darkColor: 'dark:bg-zinc-900/60' },
];

export function GeologicalCrossSection() {
  const { dict } = useLanguage();
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  if (!dict) return null;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Geological Visualization"
          title={dict.crossSection.label}
          align="center"
          className="mb-12"
        />

        <div className="relative mx-auto max-w-4xl">
          {/* Cross section */}
          <div className="relative overflow-hidden rounded-lg border border-border/40">
            <div className="flex h-[480px] flex-col">
              {layers.map((layer, i) => {
                const isActive = activeLayer === i;
                return (
                  <motion.div
                    key={layer.key}
                    initial={{ opacity: 0, scaleX: 0.95 }}
                    whileInView={{ opacity: 1, scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setActiveLayer(i)}
                    onMouseLeave={() => setActiveLayer(null)}
                    onClick={() => setActiveLayer(isActive ? null : i)}
                    className={cn(
                      'group relative flex cursor-pointer items-center justify-between border-b border-border/30 px-4 transition-all',
                      layer.color,
                      layer.darkColor,
                      isActive && 'ring-2 ring-primary ring-inset'
                    )}
                    style={{ height: `${layer.height}%` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-muted-foreground/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className={cn(
                        'text-sm font-medium transition-colors',
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      )}>
                        {dict.crossSection.layers[layer.labelKey]}
                      </span>
                    </div>
                    {/* Texture pattern */}
                    <div className="pointer-events-none absolute inset-0 opacity-20">
                      <svg className="h-full w-full" preserveAspectRatio="none">
                        <pattern id={`pattern-${i}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d={i % 2 === 0 ? 'M0,10 L20,10' : 'M0,5 L20,5 M0,15 L20,15'} stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#pattern-${i})`} />
                      </svg>
                    </div>
                    {/* Depth indicator */}
                    <span className="relative z-10 font-mono text-[10px] text-muted-foreground/60">
                      {Math.round(layers.slice(0, i).reduce((acc, l) => acc + l.height, 0) * 0.5)}m
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Active layer info */}
            {activeLayer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute inset-x-4 bottom-4 z-20"
              >
                <div className="rounded-md border border-primary/30 bg-background/90 p-3 backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary">
                      {dict.crossSection.layers[layers[activeLayer].labelKey]}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {dict.crossSection.relevance[layers[activeLayer].labelKey]}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* Disclaimer */}
          <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
            {dict.crossSection.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

