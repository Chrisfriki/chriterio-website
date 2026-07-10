import type { Metadata } from 'next'
import { Clock } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { FinalCta } from '@/components/final-cta'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Casos · CHRITERIO',
  description:
    'Casos reales de análisis de cuentas de Amazon: problema, hallazgo y entrega. Anonimizados por confidencialidad.',
}

const CASE_BLOCKS = [
  {
    label: 'Problema',
    text: 'Marca de producto de hogar en Amazon.es con tráfico pero conversión baja.',
  },
  {
    label: 'Hallazgo',
    text: 'Gap entre lo que prometía el listing y lo que percibía el cliente, más fugas en PPC.',
  },
  {
    label: 'Entrega',
    text: 'Plan priorizado de 7 acciones.',
  },
]

export default function CasosPage() {
  return (
    <main>
      <PageHeader
        eyebrow="Casos"
        title="Casos reales, sin adornos"
        subtitle="Análisis reales de cuentas de Amazon. Anonimizados por confidencialidad, pero con la estructura exacta con la que trabajo."
      />

      <section className="bg-background px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Real case */}
          <Reveal className="md:col-span-2 lg:col-span-3">
            <article className="rounded-3xl border border-border bg-card p-7 md:p-10">
              <span className="inline-flex rounded-full bg-electric/10 px-3 py-1 text-xs font-semibold tracking-wide text-electric">
                Caso real
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold tracking-tight text-navy text-balance md:text-3xl">
                Producto de hogar: tráfico alto, conversión baja
              </h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {CASE_BLOCKS.map((block) => (
                  <div
                    key={block.label}
                    className="flex flex-col rounded-2xl bg-light p-6"
                  >
                    <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                      {block.label}
                    </span>
                    <p className="mt-3 text-sm leading-relaxed text-navy/80">
                      {block.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                (Caso anonimizado por confidencialidad)
              </p>
            </article>
          </Reveal>

          {/* Placeholder cards */}
          {[0, 1].map((i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <article className="flex h-full min-h-56 flex-col items-start justify-between rounded-3xl border border-dashed border-border bg-light p-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold tracking-wide text-muted-foreground">
                  <Clock className="size-3.5" />
                  Próximamente
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold tracking-tight text-navy/40">
                    Nuevo caso en camino
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Aquí irán más análisis reales a medida que se publiquen.
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </main>
  )
}
