'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ImageOff } from 'lucide-react';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { SectionHeading } from '@/geotech/components/section-heading';
import { TechnicalBadge } from '@/geotech/components/technical-badge';
import { siteImages } from '@/geotech/lib/images';
import { cn } from '@/geotech/lib/utils';

type FilterKey = 'all' | 'geotechnical' | 'geophysical' | 'survey' | 'testing' | 'environmental' | 'infrastructure' | 'mining';

interface Project {
  title: string;
  category: Exclude<FilterKey, 'all'>;
  image: string;
}

const projects: Project[] = [
  { title: 'Geotechnical Investigation', category: 'geotechnical', image: siteImages.investigation },
  { title: 'Geophysical Survey', category: 'geophysical', image: siteImages.geophysical },
  { title: 'Topographical Survey', category: 'survey', image: siteImages.survey },
  { title: 'Material Testing', category: 'testing', image: siteImages.laboratory },
  { title: 'Environmental Survey', category: 'environmental', image: siteImages.geology2 },
  { title: 'Infrastructure Project', category: 'infrastructure', image: siteImages.groundEngineering },
  { title: 'Mining Exploration', category: 'mining', image: siteImages.mining },
  { title: 'Structural Assessment', category: 'infrastructure', image: siteImages.structural },
];

export function Projects() {
  const { dict } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  if (!dict) return null;

  const filters: FilterKey[] = ['all', 'geotechnical', 'geophysical', 'survey', 'testing', 'environmental', 'infrastructure', 'mining'];

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title={dict.projects.title}
          description={dict.projects.subtitle}
          className="mb-8"
        />

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-all',
                activeFilter === filter
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
              )}
            >
              {dict.projects.filters[filter]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={cn(
                  'group relative overflow-hidden rounded-lg border border-border/40 bg-card',
                  i === 0 && 'sm:col-span-2 lg:row-span-2'
                )}
              >
                <div className={cn(
                  'relative overflow-hidden',
                  i === 0 ? 'aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[400px]' : 'aspect-[4/3]'
                )}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute inset-0 bg-grid-sm opacity-10" />

                  {/* Placeholder badge */}
                  <div className="absolute end-3 top-3">
                    <div className="flex items-center gap-1.5 rounded-full border border-border/40 bg-background/60 px-2.5 py-1 backdrop-blur-md">
                      <ImageOff className="h-3 w-3 text-muted-foreground" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">Placeholder</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <TechnicalBadge variant="primary">{dict.projects.filters[project.category]}</TechnicalBadge>
                    </div>
                    <h3 className={cn('font-semibold text-foreground', i === 0 ? 'text-xl' : 'text-base')}>
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-muted-foreground">{dict.projects.placeholder}</p>
                    <div className="mt-3 flex items-center gap-2 text-primary">
                      <span className="text-xs font-medium">{dict.common.viewProject}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100" />
                    </div>
                    <div className="absolute inset-x-4 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
          {dict.projects.label} — {dict.projects.placeholder}
        </p>
      </div>
    </section>
  );
}
