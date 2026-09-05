'use client';

import { motion } from 'framer-motion';
import { cn } from '@/geotech/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'default' | 'deep';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'default',
  className,
}: SectionHeadingProps) {
  const onDeep = tone === 'deep';
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-primary" />
          <span className={cn('font-mono text-xs uppercase tracking-[0.2em] text-primary')}>
            {eyebrow}
          </span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={cn(
          'text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl',
          onDeep ? 'text-deep-foreground' : 'text-foreground',
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={cn(
            'max-w-2xl text-base leading-relaxed text-pretty sm:text-lg',
            onDeep ? 'text-deep-muted' : 'text-muted-foreground',
          )}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
