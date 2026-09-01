'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { SectionHeading } from '@/geotech/components/section-heading';
import { TechnicalBadge } from '@/geotech/components/technical-badge';
import { siteImages } from '@/geotech/lib/images';
import { cn } from '@/geotech/lib/utils';

type ServiceKey =
  | 'geotechnical-investigation'
  | 'geophysical-survey'
  | 'geological-survey'
  | 'hydrogeological-studies'
  | 'material-testing'
  | 'quality-control'
  | 'topographical-survey'
  | 'environmental-survey'
  | 'cavity-probing'
  | 'grouting'
  | 'micropiling'
  | 'anchoring-shoring'
  | 'dewatering'
  | 'soil-improvement'
  | 'hydrology'
  | 'structural-assessment'
  | 'mining-exploration';

interface Category {
  key: string;
  labelKey: 'ground' | 'testing' | 'engineering' | 'studies';
  services: ServiceKey[];
}

const categories: Category[] = [
  {
    key: 'ground',
    labelKey: 'ground',
    services: ['geotechnical-investigation', 'geophysical-survey', 'geological-survey', 'hydrogeological-studies'],
  },
  {
    key: 'testing',
    labelKey: 'testing',
    services: ['material-testing', 'quality-control', 'topographical-survey', 'environmental-survey'],
  },
  {
    key: 'engineering',
    labelKey: 'engineering',
    services: ['cavity-probing', 'grouting', 'micropiling', 'anchoring-shoring', 'dewatering', 'soil-improvement'],
  },
  {
    key: 'studies',
    labelKey: 'studies',
    services: ['hydrology', 'structural-assessment', 'mining-exploration'],
  },
];

const serviceImages: Record<ServiceKey, string> = {
  'geotechnical-investigation': siteImages.investigation,
  'geophysical-survey': siteImages.geophysical,
  'geological-survey': siteImages.geology,
  'hydrogeological-studies': siteImages.hydrology,
  'material-testing': siteImages.laboratory,
  'quality-control': siteImages.qhse,
  'topographical-survey': siteImages.survey,
  'environmental-survey': siteImages.geology2,
  'cavity-probing': siteImages.groundEngineering,
  'grouting': siteImages.groundEngineering,
  'micropiling': siteImages.groundEngineering,
  'anchoring-shoring': siteImages.structural,
  'dewatering': siteImages.hydrology,
  'soil-improvement': siteImages.groundEngineering,
  'hydrology': siteImages.hydrology,
  'structural-assessment': siteImages.structural,
  'mining-exploration': siteImages.mining,
};

export function ServiceExplorer() {
  const { dict, locale } = useLanguage();
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeService, setActiveService] = useState<ServiceKey>('geotechnical-investigation');

  if (!dict) return null;

  const currentCategory = categories[activeCategory];

  return (
    <section id="services" className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title={dict.services.title}
          description={dict.services.subtitle}
          className="mb-12"
        />

        <div className="grid gap-8 lg:grid-cols-[260px_1fr_320px]">
          {/* Left: Categories */}
          <div className="flex flex-col gap-1">
            {categories.map((cat, i) => (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategory(i);
                  setActiveService(cat.services[0]);
                }}
                className={cn(
                  'group flex items-center justify-between border-s-2 px-4 py-3.5 text-start transition-all',
                  activeCategory === i
                    ? 'border-primary bg-surface text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-surface/50'
                )}
              >
                <span className="text-sm font-medium">{dict.services.categories[cat.labelKey]}</span>
                <span className="font-mono text-xs text-muted-foreground/60">{cat.services.length}</span>
              </button>
            ))}
          </div>

          {/* Center: Visual */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/40 lg:aspect-auto lg:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${serviceImages[activeService]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-grid-sm opacity-10" />
              </motion.div>
            </AnimatePresence>

            {/* Service number overlay */}
            <div className="absolute start-4 top-4 z-10">
              <span className="font-mono text-6xl font-bold text-primary/20">
                {String(currentCategory.services.indexOf(activeService) + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Active service name on image */}
            <div className="absolute inset-x-4 bottom-4 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                    {dict.services.items[activeService].name}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Service info */}
          <div className="flex flex-col">
            {/* Service list for current category */}
            <div className="mb-6 flex flex-col gap-1">
              {currentCategory.services.map((service) => (
                <button
                  key={service}
                  onClick={() => setActiveService(service)}
                  className={cn(
                    'group flex items-center justify-between rounded-md px-3 py-2.5 text-start text-sm transition-all',
                    activeService === service
                      ? 'bg-surface text-foreground'
                      : 'text-muted-foreground hover:bg-surface/50 hover:text-foreground'
                  )}
                >
                  <span className="font-medium">{dict.services.items[service].name}</span>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity rtl:rotate-180 group-hover:opacity-60" />
                </button>
              ))}
            </div>

            {/* Active service details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-1 flex-col"
              >
                <div className="mb-3 h-px w-12 bg-primary" />
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                  {dict.services.items[activeService].description}
                </p>
                <a
                  href="#contact"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  {dict.services.explore}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: accordion-style */}
        <div className="mt-8 lg:hidden">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(i)}
                className={cn(
                  'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                  activeCategory === i
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border text-muted-foreground'
                )}
              >
                {dict.services.categories[cat.labelKey]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
