import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'ghost-light' | 'outline'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2'

const variants: Record<Variant, string> = {
  primary:
    'bg-electric text-electric-foreground shadow-[0_8px_24px_-8px_rgba(46,91,255,0.6)] hover:bg-electric/90 hover:-translate-y-0.5',
  ghost:
    'border border-navy/15 text-navy hover:border-navy/40 hover:bg-navy/5',
  'ghost-light':
    'border border-white/25 text-white hover:border-white/60 hover:bg-white/10',
  outline: 'border border-electric text-electric hover:bg-electric hover:text-electric-foreground',
}

type LinkButtonProps = {
  variant?: Variant
  external?: boolean
} & ComponentProps<typeof Link>

export function LinkButton({
  variant = 'primary',
  external,
  className,
  children,
  ...props
}: LinkButtonProps) {
  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
  return (
    <Link
      className={cn(base, variants[variant], className)}
      {...externalProps}
      {...props}
    >
      {children}
    </Link>
  )
}
