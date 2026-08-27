'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/geotech-utils';

interface ContourLinesProps {
  className?: string;
  opacity?: number;
}

export function ContourLines({ className, opacity = 0.15 }: ContourLinesProps) {
  return (
    <svg
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      style={{ opacity }}
    >
      <defs>
        <pattern id="contour-pattern" x="0" y="0" width="1200" height="800" patternUnits="userSpaceOnUse">
          <path d="M0,200 Q300,150 600,200 T1200,200" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,280 Q300,230 600,280 T1200,280" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,360 Q300,310 600,360 T1200,360" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,440 Q300,390 600,440 T1200,440" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,520 Q300,470 600,520 T1200,520" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0,600 Q300,550 600,600 T1200,600" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="1200" height="800" fill="url(#contour-pattern)" />
    </svg>
  );
}

export function GeologicalBackground({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <ContourLines className="text-foreground" opacity={0.06} />
      <div className="absolute inset-0 bg-grid-sm opacity-30" />
    </div>
  );
}

export function BoreholeGraphic({ className }: { className?: string }) {
  return (
    <svg
      className={cn('pointer-events-none', className)}
      viewBox="0 0 100 400"
      fill="none"
      preserveAspectRatio="none"
    >
      <line x1="50" y1="0" x2="50" y2="400" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
      <circle cx="50" cy="20" r="3" fill="currentColor" opacity="0.4" />
      <line x1="40" y1="20" x2="60" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <line x1="42" y1="40" x2="58" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="42" y1="80" x2="58" y2="80" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="42" y1="140" x2="58" y2="140" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="42" y1="200" x2="58" y2="200" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="42" y1="260" x2="58" y2="260" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="42" y1="320" x2="58" y2="320" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="42" y1="380" x2="58" y2="380" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

export function SeismicWave({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.svg
      className={cn('pointer-events-none', className)}
      viewBox="0 0 400 100"
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 2, delay, ease: 'easeInOut' }}
    >
      <motion.path
        d="M0,50 Q50,10 100,50 T200,50 T300,50 T400,50"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay, ease: 'easeInOut' }}
      />
    </motion.svg>
  );
}

