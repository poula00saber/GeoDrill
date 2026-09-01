'use client';

import { motion } from 'framer-motion';
import { Map as MapIcon, FlaskConical, ClipboardCheck } from 'lucide-react';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { SectionHeading } from '@/geotech/components/section-heading';
import { siteImages } from '@/geotech/lib/images';

export function SurveyTesting() {
  const { dict } = useLanguage();
  if (!dict) return null;

  const modules = [
    {
      title: dict.survey.topographical.title,
      description: dict.survey.topographical.description,
      image: siteImages.survey,
      icon: MapIcon,
    },
    {
      title: dict.survey.material.title,
      description: dict.survey.material.description,
      image: siteImages.laboratory,
      icon: FlaskConical,
    },
    {
      title: dict.survey.quality.title,
      description: dict.survey.quality.description,
      image: siteImages.qhse,
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Survey & Testing"
          title={dict.survey.title}
          align="center"
          className="mb-12"
        />

        <div className="grid gap-6 md:grid-cols-3">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group relative overflow-hidden rounded-lg border border-border/40 bg-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${mod.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute start-4 top-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border/40 bg-background/60 backdrop-blur-md">
                    <mod.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold">{mod.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{mod.description}</p>
                <div className="mt-4 h-px w-full bg-border" />
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    0{i + 1}
                  </span>
                  <div className="h-px w-8 bg-primary transition-all duration-300 group-hover:w-16" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
