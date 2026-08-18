import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({
  className,
  onDark = false,
}: {
  className?: string
  onDark?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      <Image
        src="/logo.png"
        alt="GeoDrill — Construction Experts"
        width={180}
        height={48}
        priority
        className={cn(
          'h-10 w-auto object-contain',
          onDark && 'brightness-0 invert',
        )}
      />
    </span>
  )
}

