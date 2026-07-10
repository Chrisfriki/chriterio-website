import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function CaseHighlight() {
  return (
    <section className="bg-navy px-5 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-xs font-semibold tracking-widest text-electric uppercase">
            Caso destacado
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Tráfico alto, conversión baja: encontramos el gap
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
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
          ].map((block, i) => (
            <Reveal key={block.label} delay={0.1 + i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                  {block.label}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-white/80">
                  {block.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-6 text-xs text-white/40">
            (Caso anonimizado por confidencialidad)
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <Link
            href="/casos"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-electric transition-colors hover:text-white"
          >
            Ver casos
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
