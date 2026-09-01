'use client';

import { motion } from 'framer-motion';
import { Eye, Target } from 'lucide-react';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { SectionHeading } from '@/geotech/components/section-heading';
import { ContourLines } from '@/geotech/components/geological/background';
import { siteImages } from '@/geotech/lib/images';

export function AboutSection() {
  const { dict } = useLanguage();
  if (!dict) return null;

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28 md:py-32">
      <ContourLines className="text-primary" opacity={0.03} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About GEODRILL"
              title={dict.about.title}
              className="mb-6"
            />
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground text-pretty">
              <p>{dict.about.p1}</p>
              <p>{dict.about.p2}</p>
              <p className="text-foreground">{dict.about.p3}</p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border/40">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${siteImages.about})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg border border-border/40 bg-surface/50 p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <Eye className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-primary">Vision</span>
            </div>
            <h3 className="mb-3 text-lg font-semibold">{dict.vision.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{dict.vision.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-lg border border-border/40 bg-surface/50 p-6"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                <Target className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <span className="font-mono text-xs uppercase tracking-wider text-primary">Mission</span>
            </div>
            <h3 className="mb-3 text-lg font-semibold">{dict.mission.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground text-pretty">{dict.mission.description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
