import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { PricingCard } from '@/components/pricing-card'
import { SERVICES } from '@/lib/data'

export function ServicesPreview() {
  return (
    <section className="bg-background px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-xs font-semibold tracking-widest text-electric uppercase">
              Servicios
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance md:text-4xl">
              Dos formas de trabajar conmigo
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={0.1 + i * 0.08} className="h-full">
              <PricingCard service={service} compact />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Link
            href="/servicios"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-electric transition-colors hover:text-navy"
          >
            Ver servicios y precios en detalle
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
