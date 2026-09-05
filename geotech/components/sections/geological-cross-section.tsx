'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { SectionHeading } from '@/geotech/components/section-heading';
import { ContourLines } from '@/geotech/components/geological/background';
import { cn } from '@/geotech/lib/utils';

const EASE = [0.16, 1, 0.3, 1] as const;

interface Layer {
  key: string;
  depth: string;
  h: number;
}

// Visual strata stack. Labels + relevance come from the bilingual dictionary.
// heights are row percentages; depth is the top-of-layer marker shown in the UI.
const LAYERS: Layer[] = [
  { key: 'surface', depth: '0.0 m', h: 46 },
  { key: 'alluvial', depth: '1.5 m', h: 56 },
  { key: 'sand', depth: '4.0 m', h: 62 },
  { key: 'clay', depth: '8.0 m', h: 66 },
  { key: 'weathered', depth: '14.0 m', h: 70 },
  { key: 'fractured', depth: '20.0 m', h: 74 },
  { key: 'bedrock', depth: '26.0 m', h: 84 },
];

// Map each strata key to a thematic layer colour (strata-* tokens).
function layerKeyColor(key: string): string {
  switch (key) {
    case 'alluvial':
    case 'sand':
      return 'bg-strata-2';
    case 'clay':
      return 'bg-strata-3';
    case 'weathered':
    case 'fractured':
      return 'bg-strata-4';
    case 'bedrock':
      return 'bg-strata-5';
    case 'surface':
    default:
      return 'bg-strata-1';
  }
}

export function GeologicalCrossSection() {
  const { dict, isArabic } = useLanguage();
  const [activeLayer, setActiveLayer] = useState<number>(0);

  if (!dict?.crossSection) return null;

  const labels = dict.crossSection.layers as Record<string, string>;
  const relevance = dict.crossSection.relevance as Record<string, string>;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <ContourLines className="text-primary" opacity={0.06} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={dict.crossSection.label}
          title={dict.crossSection.title}
          description={dict.crossSection.intro}
          align="center"
          className="mb-14"
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          {/* Strata stack */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative overflow-hidden rounded-lg border border-border"
          >
            <div className="flex h-[480px] flex-col">
              {LAYERS.map((layer, i) => {
                const isActive = activeLayer === i;
                return (
                  <button
                    key={layer.key}
                    type="button"
                    onMouseEnter={() => setActiveLayer(i)}
                    onFocus={() => setActiveLayer(i)}
                    onClick={() => setActiveLayer(isActive ? 0 : i)}
                    aria-pressed={isActive}
                    style={{ height: `${layer.h}%` }}
                    className={cn(
                      'group relative flex w-full items-center justify-between px-5 text-start transition-all duration-300',
                      layerKeyColor(layer.key),
                      isActive ? 'brightness-110' : 'brightness-95 saturate-75',
                    )}
                  >
                    {/* Texture pattern */}
                    <div className="pointer-events-none absolute inset-0 opacity-20">
                      <svg className="h-full w-full" preserveAspectRatio="none">
                        <pattern id={`strata-pattern-${i}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d={i % 2 === 0 ? 'M0,10 L20,10' : 'M0,5 L20,5 M0,15 L20,15'} stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill={`url(#strata-pattern-${i})`} />
                      </svg>
                    </div>

                    <span className="font-mono text-sm font-medium text-foreground/90">{labels[layer.key]}</span>
                    <span className="font-mono text-xs text-foreground/60">{layer.depth}</span>

                    {isActive && (
                      <motion.span
                        layoutId="strata-indicator"
                        className="absolute start-0 top-0 h-full w-1 bg-primary"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Active layer detail panel */}
          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={LAYERS[activeLayer]!.key}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="rounded-lg border border-border bg-card p-7"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  {isArabic ? 'العمق' : 'Depth'} · {LAYERS[activeLayer]!.depth}
                </span>

                <div className="mt-4 flex items-center gap-3">
                  <span className={cn('h-4 w-4 rounded-full', layerKeyColor(LAYERS[activeLayer]!.key))} />
                  <h3 className="text-2xl font-semibold tracking-tight">{labels[LAYERS[activeLayer]!.key]}</h3>
                </div>

                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {relevance[LAYERS[activeLayer]!.key]}
                </p>
              </motion.div>
            </AnimatePresence>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
              {dict.crossSection.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
