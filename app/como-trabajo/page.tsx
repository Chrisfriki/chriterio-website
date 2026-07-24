import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { LinkButton } from '@/components/link-button'
import { Reveal } from '@/components/reveal'
import { WorkProcess } from '@/components/work-process'
import { CALENDLY_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cómo trabajo · CHRITERIO',
  description:
    'Auditoría, estrategia, ejecución y seguimiento para construir un plan de crecimiento de Amazon adaptado a cada cuenta.',
}

export default function ComoTrabajoPage() {
  return (
    <main className="overflow-x-clip">
      <div className="relative overflow-hidden bg-[#020817] text-white">
        <div
          aria-hidden="true"
          className="starfield pointer-events-none absolute inset-0 opacity-75"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[48rem] w-[82rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(46,91,255,0.14),transparent_66%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[52%] left-[-18rem] size-[42rem] rounded-full bg-electric/[0.055] blur-3xl"
        />

        <header className="relative px-5 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                Cómo trabajo
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 max-w-5xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance md:text-6xl lg:text-7xl">
                Analizamos primero. Decidimos después. Ejecutamos con criterio.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/62 text-pretty md:text-lg">
                Todo empieza con una auditoría real de tu cuenta. Entendemos qué
                está fallando, dónde están las oportunidades y qué plan tiene
                más sentido para ti antes de empezar a trabajar juntos.
              </p>
            </Reveal>
          </div>
        </header>

        <div className="relative">
          <WorkProcess />
        </div>

        <section className="relative border-t border-white/10 px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/12 bg-[#07172f]/72 px-6 py-12 text-center shadow-[0_32px_100px_-50px_rgba(46,91,255,0.55)] backdrop-blur-xl md:px-12 md:py-16">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                El siguiente paso
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
                Si tiene sentido para ambos, empezamos.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/58 text-pretty md:text-base">
                La auditoría inicial nos sirve para entender tu cuenta y decirte
                con honestidad cómo podemos ayudarte. Si vemos que encajamos,
                definimos el plan y nos ponemos a trabajar.
              </p>
              <LinkButton
                href={CALENDLY_URL}
                external
                className="mt-8"
              >
                Solicitar auditoría
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </LinkButton>
            </Reveal>
          </div>
        </section>
      </div>
    </main>
  )
}
