import Image from 'next/image'
import { Reveal } from '@/components/reveal'
import { BrandScroller } from '@/components/ui/brand-scroller'
import { TRUSTED_BRANDS } from '@/lib/data'
import { withBasePath } from '@/lib/base-path'

/**
 * Sits between the service areas and "Control de misión". Its only job is
 * honest credibility: brands worked with through AMZ Creatives, never framed
 * as Chriterio's own client roster or consulting results. Its background
 * matches the service area's navy-dark so there's no seam between blocks.
 */
export function TrustedBrands() {
  return (
    <section
      aria-labelledby="trusted-brands-heading"
      className="relative overflow-hidden border-b border-white/[0.08] bg-navy-dark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-navy-dark"
      />
      <div
        aria-hidden="true"
        className="starfield pointer-events-none absolute inset-0 opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/[0.06] blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-12">
          <Reveal className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest text-electric uppercase">
              Trayectoria del equipo
            </span>
            <h2
              id="trusted-brands-heading"
              className="mt-4 font-display text-2xl font-bold tracking-tight text-white text-balance md:text-3xl"
            >
              Marcas que ya han confiado en nosotros
            </h2>
          </Reveal>

          <Reveal
            delay={0.08}
            className="flex flex-col items-start gap-2 md:items-end"
          >
            <span className="text-xs text-white/40">
              Experiencia desarrollada junto al equipo de AMZ Creatives
            </span>
            <span className="inline-flex items-center rounded-lg bg-white px-3.5 py-2">
              <Image
                src={withBasePath('/amz-creatives-logo.png')}
                alt="AMZ Creatives"
                width={4773}
                height={713}
                className="h-5 w-auto md:h-6"
              />
            </span>
          </Reveal>
        </div>

        {TRUSTED_BRANDS.length > 0 && (
          <Reveal delay={0.14} className="mt-12 md:mt-16">
            <BrandScroller brands={TRUSTED_BRANDS} />
          </Reveal>
        )}
      </div>
    </section>
  )
}
