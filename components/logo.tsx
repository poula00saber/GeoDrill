import { cn } from '@/lib/utils'

export function Logo({
  className,
  onDark = false,
}: {
  className?: string
  onDark?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative flex size-9 items-center justify-center rounded-lg bg-primary">
        <span className="dot-grid absolute inset-1 rounded text-primary-foreground/40" aria-hidden />
        <svg viewBox="0 0 24 24" className="relative size-5 text-primary-foreground" fill="none" aria-hidden>
          <path
            d="M12 2v6m0 0l-3 3m3-3l3 3M6 13l6 9 6-9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-lg font-extrabold tracking-tight',
            onDark ? 'text-white' : 'text-foreground',
          )}
        >
          GEO<span className="text-primary">DRILL</span>
        </span>
        <span
          className={cn(
            'text-[9px] font-medium uppercase tracking-[0.22em]',
            onDark ? 'text-white/60' : 'text-muted-foreground',
          )}
        >
          Construction Experts
        </span>
      </span>
    </span>
  )
}
