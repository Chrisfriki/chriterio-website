import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Service } from '@/lib/data'
import { LinkButton } from '@/components/link-button'
import { CALENDLY_URL } from '@/lib/site'

export function PricingCard({
  service,
  compact = false,
}: {
  service: Service
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-3xl bg-card p-7 md:p-9',
        service.featured
          ? 'border-2 border-navy shadow-[0_24px_60px_-30px_rgba(10,31,68,0.5)]'
          : 'border border-border',
      )}
    >
      {service.badge && (
        <span className="absolute -top-3 left-7 rounded-full bg-navy px-3 py-1 text-xs font-semibold tracking-wide text-white">
          {service.badge}
        </span>
      )}

      <h3 className="font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
        {service.name}
      </h3>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold text-navy md:text-5xl">
          {service.price}
        </span>
        <span className="text-sm text-muted-foreground">
          {service.priceNote}
        </span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
        {service.audience}
      </p>

      {!compact && (
        <ul className="mt-7 flex flex-col gap-3.5">
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-electric/10 text-electric">
                <Check className="size-3.5" />
              </span>
              <span className="text-sm leading-relaxed text-navy/80">{f}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex-1" />

      <LinkButton
        href={CALENDLY_URL}
        external
        variant={service.featured ? 'primary' : 'ghost'}
        className="w-full"
      >
        {service.cta}
      </LinkButton>
    </div>
  )
}
