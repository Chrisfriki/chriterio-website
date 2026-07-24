import type { Metadata } from 'next'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { CaseMedia } from '@/components/cases/case-media'
import { LinkButton } from '@/components/link-button'
import { Reveal } from '@/components/reveal'

export const metadata: Metadata = {
  title: 'Casos reales de consultoría Amazon · CHRITERIO',
  description:
    'Problemas reales, análisis de cuentas de Amazon y decisiones ejecutadas para recuperar posicionamiento, rentabilidad y crecimiento.',
}

const CASE_URL = '/casos/recuperacion-ventas-empapadores-adultos-amazon'

const UPCOMING_CASES = [
  {
    title: 'Recuperación de rentabilidad en campañas PPC',
    description:
      'Reestructuración publicitaria para una cuenta con tráfico, ventas y un gasto que estaba erosionando el margen.',
    tags: ['PPC', 'Rentabilidad', 'Estructura de campañas'],
  },
  {
    title: 'Lanzamiento y posicionamiento de un nuevo producto',
    description:
      'De una entrada sin visibilidad a una estrategia coordinada de keywords, contenido, publicidad y conversión.',
    tags: ['Lanzamiento', 'SEO Amazon', 'Conversión'],
  },
] as const

export default function CasosPage() {
  return (
    <main className="overflow-x-clip bg-[#020817] text-white">
      <div className="relative min-h-screen overflow-hidden">
        <div
          aria-hidden="true"
          className="starfield pointer-events-none absolute inset-0 opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[48rem] w-[80rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(46,91,255,0.16),transparent_66%)]"
        />

        <header className="relative px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                Casos
              </span>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance md:text-6xl lg:text-7xl">
                Casos reales, sin adornos
              </h1>
              <p className="mt-7 max-w-3xl text-sm leading-relaxed text-white/62 text-pretty md:text-lg">
                Problemas reales, análisis de cuentas de Amazon y decisiones
                ejecutadas para recuperar posicionamiento, rentabilidad y
                crecimiento.
              </p>
            </Reveal>
          </div>
        </header>

        <section className="relative border-t border-white/8 px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[2fr_1fr]">
            <Reveal className="h-full">
              <article className="group relative h-full overflow-hidden rounded-[2rem] border border-electric/25 bg-[#07172f]/78 p-4 shadow-[0_34px_100px_-58px_rgba(46,91,255,0.95)] backdrop-blur-xl transition-colors duration-500 hover:border-electric/45 md:p-5">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#7895ff]/70 to-transparent"
                />
                <div className="grid h-full gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-stretch">
                  <div className="flex flex-col p-3 md:p-5">
                    <span className="text-[10px] font-bold tracking-[0.14em] text-[#91a9ff] uppercase">
                      Caso destacado · Empapadores para adultos
                    </span>
                    <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-balance md:text-4xl">
                      De una caída de facturación a volver a competir entre los
                      más vendidos
                    </h2>
                    <p className="mt-5 text-sm leading-relaxed text-white/56">
                      La cuenta llevaba meses perdiendo ventas, posicionamiento
                      y rentabilidad. Detectamos nuevos competidores, una
                      inversión elevada en PPC, pérdida de visibilidad orgánica
                      y una supresión de búsqueda que estaba limitando el
                      crecimiento del producto.
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {[
                        'Posicionamiento Amazon',
                        'Optimización de listing',
                        'PPC y rentabilidad',
                        'Conversión',
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-[10px] font-medium text-white/55"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <LinkButton
                      href={CASE_URL}
                      variant="ghost-light"
                      className="mt-8 self-start group-hover:border-white/50"
                    >
                      Ver caso completo
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </LinkButton>
                  </div>
                  <CaseMedia
                    src="/images/casos/empapadores-adultos-portada.webp"
                    alt="Portada del caso de recuperación de ventas de empapadores para adultos en Amazon"
                    placeholder="Imagen principal del caso"
                    className="min-h-80 lg:min-h-[34rem]"
                    imageClassName="group-hover:scale-[1.025]"
                  />
                </div>
              </article>
            </Reveal>

            <div className="grid gap-6">
              {UPCOMING_CASES.map((item, index) => (
                <Reveal key={item.title} delay={0.08 + index * 0.07}>
                  <article className="flex h-full min-h-64 flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-6 opacity-75 md:p-7">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1 text-[9px] font-bold tracking-[0.15em] text-white/42 uppercase">
                      <Clock3 className="size-3" aria-hidden="true" />
                      Próximamente
                    </span>
                    <h2 className="mt-5 font-display text-xl font-bold leading-tight tracking-tight text-white/72">
                      {item.title}
                    </h2>
                    <p className="mt-4 text-sm leading-relaxed text-white/42">
                      {item.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/8 px-2.5 py-1 text-[9px] text-white/35"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
