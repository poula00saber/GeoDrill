import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  size = 'h-10',
  src,
  onDark = false,
}: {
  className?: string
  /** Height utility applied to the logo image (e.g. 'h-9', 'h-10', 'h-12'). */
  size?: string
  /** Explicit logo asset. When omitted, onDark selects /logo2.png else /logo.png. */
  src?: string
  /** true → use the light/for-dark logo (logo2.png) on dark backgrounds. */
  onDark?: boolean
}) {
  const resolved = src ?? (onDark ? '/logo2.png' : '/logo.png')
  return (
    <span className={cn('inline-flex items-center', className)}>
      <Image
        src={resolved}
        alt="GEODRILL — Construction Experts"
        width={180}
        height={48}
        priority
        className={cn(size, 'w-auto object-contain')}
      />
    </span>
  )
}

