'use client';

import { cn } from '@/geotech/lib/utils';

interface TechnicalBadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary';
}

export function TechnicalBadge({
  children,
  className,
  variant = 'default',
}: TechnicalBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider',
        variant === 'default'
          ? 'border-border bg-surface/50 text-muted-foreground'
          : 'border-primary/30 bg-primary/10 text-primary',
        className
      )}
    >
      {children}
    </span>
  );
}
