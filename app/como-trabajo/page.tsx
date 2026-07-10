import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { FinalCta } from '@/components/final-cta'
import { Reveal } from '@/components/reveal'
import { PROCESS_STEPS, WHAT_I_CHECK } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Cómo trabajo · CHRITERIO',
  description:
    'El proceso paso a paso: llamada gratis de 15 min, una semana de análisis y un PDF con las causas y el plan de acción.',
}

export default function ComoTrabajoPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Cómo trabajo"
        title="Un proceso claro, sin humo"
        subtitle="Tres pasos. Sin retainers, sin reuniones eternas. Del primer contacto al plan de acción en una semana."
      />

      <section className="bg-background px-5 py-20 md:py-28">
        <div className="mx-auto flex max-w-5xl flex-col gap-16 md:gap-24">
          {PROCESS_STEPS.map((step) => (
            <Reveal key={step.n}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
                <span className="font-display text-7xl font-bold leading-none tracking-tight text-navy/10 md:text-9xl">
                  {step.n}
                </span>
                <div className="md:pt-3">
                  <h2 className="max-w-xl font-display text-2xl font-bold tracking-tight text-navy text-balance md:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty">
                    {step.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-light px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy text-balance md:text-4xl">
              Qué miro exactamente
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2">
            {WHAT_I_CHECK.map((item, i) => (
              <Reveal key={item} delay={i * 0.04}>
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric/10 text-electric">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-base font-medium text-navy">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </main>
  )
}
