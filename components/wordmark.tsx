import { cn } from '@/lib/utils'

export function Wordmark({
  light = false,
  className,
}: {
  light?: boolean
  className?: string
}) {
  return (
    <span className={cn('flex flex-col leading-none', className)}>
      <span
        className={cn(
          'font-display text-lg font-bold',
          light ? 'text-white' : 'text-navy',
        )}
        style={{ letterSpacing: '0.2em' }}
      >
        CHRITERIO
      </span>
      <span
        className={cn(
          'mt-1 text-[10px] font-medium',
          light ? 'text-white/50' : 'text-muted-foreground',
        )}
        style={{ letterSpacing: '0.18em' }}
      >
        × AMZ CREATIVES
      </span>
    </span>
  )
}
