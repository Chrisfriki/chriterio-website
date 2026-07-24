import type { Metadata } from 'next'
import { FaqAccordion } from '@/components/faq-accordion'
import { FinalCta } from '@/components/final-cta'
import { PricingGlass } from '@/components/pricing-glass'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Servicios · CHRITERIO',
  description:
    'Dirección estratégica y gestión integral de cuentas de Amazon para marcas que quieren crecer con criterio.',
}

export default function ServiciosPage() {
  return (
    <main>
      <div className="relative overflow-hidden bg-[#020817] text-white">
        <div
          aria-hidden="true"
          className="starfield pointer-events-none absolute inset-0 opacity-80"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[46rem] w-[80rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(46,91,255,0.14),transparent_66%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[55%] right-[-18rem] size-[48rem] rounded-full bg-electric/[0.065] blur-3xl"
        />

        <header className="relative px-5 pt-32 pb-10 md:px-8 md:pt-36 md:pb-12">
          <div className="mx-auto max-w-6xl text-center">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                Servicios
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mx-auto mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance md:text-6xl">
                Una forma de trabajar. Distintos niveles de implicación.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/60 text-pretty md:text-base">
                Desde la dirección estratégica hasta la gestión completa de tu
                cuenta. Tú decides cuánto quieres delegar.
              </p>
            </Reveal>
          </div>
        </header>

        <section className="relative px-5 pt-2 pb-20 md:px-8 md:pt-4 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <PricingGlass />
          </div>
        </section>
      </div>

      <section className="bg-light px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <span className="text-xs font-semibold tracking-widest text-electric uppercase">
              Antes de empezar
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance md:text-4xl">
              Preguntas frecuentes
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10">
              <FaqAccordion />
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta />
    </main>
  )
}
