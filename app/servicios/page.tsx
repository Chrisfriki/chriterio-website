import type { Metadata } from 'next'
import { PageHeader } from '@/components/page-header'
import { PricingCard } from '@/components/pricing-card'
import { FaqAccordion } from '@/components/faq-accordion'
import { FinalCta } from '@/components/final-cta'
import { Reveal } from '@/components/reveal'
import { SERVICES } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Servicios · CHRITERIO',
  description:
    'Diagnóstico de cuenta de Amazon en 7 días (390€) y sesiones de trabajo 1:1 (150€/h). Precio cerrado, sin permanencias.',
}

export default function ServiciosPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Servicios"
        title="Servicios"
        subtitle="Dos formas de trabajar conmigo, según lo que necesites: un diagnóstico completo o sesiones para que lo lleves tú."
      />

      <section className="bg-background px-5 py-20">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08} className="h-full">
              <PricingCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-light px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy text-balance md:text-4xl">
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
