import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  size = 'h-10',
  onDark = false,
}: {
  className?: string
  /** Height utility applied to the logo image (e.g. 'h-9', 'h-10', 'h-12'). */
  size?: string
  /** Kept for API compatibility; the localized site always uses logo2.png. */
  onDark?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <Image
        src="/logo2.png"
        alt="GEODRILL — Construction Experts"
        width={180}
        height={48}
        priority
        className={cn(size, 'w-auto object-contain')}
      />
    </span>
  )
}

