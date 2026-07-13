import Image from 'next/image'
import { withBasePath } from '@/lib/base-path'
import { cn } from '@/lib/utils'

export function Wordmark({
  light = false,
  className,
}: {
  light?: boolean
  className?: string
}) {
  return (
    <Image
      src={withBasePath(
        light ? '/chriterio-logo-white.png' : '/chriterio-logo-navy.png',
      )}
      alt="CHRITERIO"
      width={1433}
      height={249}
      priority
      className={cn('h-7 w-auto md:h-8', className)}
    />
  )
}
