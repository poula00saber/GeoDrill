'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/geotech/components/providers/language-provider';
import { SectionHeading } from '@/geotech/components/section-heading';

const organizationNames = [
  'ARAMCO', 'SABIC', 'NEOM', 'RED SEA GLOBAL', 'ROSHN',
  'MODERN', 'SAUDI ELECTRICITY', 'ROYAL COMMISSION', 'MOW',
  'SADARA', 'MAADEN', 'STC', 'DIRIYAH GATE', 'AL MARJAN',
];

export function Organizations() {
  const { dict } = useLanguage();
  if (!dict) return null;

  const row1 = organizationNames.slice(0, 7);
  const row2 = organizationNames.slice(7);

  return (
    <section className="relative overflow-hidden border-y border-border/40 bg-surface/30 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Organizations"
          title={dict.organizations.title}
          description={dict.organizations.subtitle}
          align="center"
          className="mb-12"
        />
      </div>

      {/* Marquee row 1 */}
      <div className="group relative flex overflow-hidden mask-fade-edges">
        <motion.div
          className="flex shrink-0 gap-4 pe-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...row1, ...row1].map((name, i) => (
            <OrgCard key={i} name={name} />
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 */}
      <div className="group relative mt-4 flex overflow-hidden mask-fade-edges">
        <motion.div
          className="flex shrink-0 gap-4 pe-4"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
          style={{ width: 'max-content' }}
        >
          {[...row2, ...row2].map((name, i) => (
            <OrgCard key={i} name={name} />
          ))}
        </motion.div>
      </div>

      <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
        Organizations Our Team Has Worked With
      </p>
    </section>
  );
}

function OrgCard({ name }: { name: string }) {
  return (
    <div className="group/item flex h-20 w-44 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-card transition-all hover:border-primary/40 hover:bg-surface">
      <span className="font-mono text-sm font-medium tracking-wide text-muted-foreground transition-colors group-hover/item:text-foreground">
        {name}
      </span>
    </div>
  );
}
