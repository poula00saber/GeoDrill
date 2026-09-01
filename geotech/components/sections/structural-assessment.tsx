'use client';

import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { SectionHeading } from '@/geotech/components/section-heading';
import { siteImages } from '@/geotech/lib/images';

export function StructuralAssessment() {
  const { dict } = useLanguage();
  if (!dict) return null;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/40">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: `url(${siteImages.structural})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute start-4 top-4">
                <div className="flex items-center gap-2 rounded-md border border-border/40 bg-background/60 p-2 backdrop-blur-md">
                  <Building2 className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Structural Assessment</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div>
            <SectionHeading
              eyebrow="Structural Assessment"
              title={dict.structural.title}
              description={dict.structural.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
