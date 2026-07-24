import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ImageIcon,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'
import { LinkButton } from '@/components/link-button'
import { Reveal } from '@/components/reveal'
import { CALENDLY_URL } from '@/lib/site'
import { withBasePath } from '@/lib/base-path'

export const metadata: Metadata = {
  title: 'Caso real de estrategia Amazon · CHRITERIO',
  description:
    'Caso real anonimizado de consultoría Amazon: recuperación del posicionamiento, optimización de listing, control de PPC y crecimiento de ventas en Amazon.',
}

const SUMMARY = [
  {
    label: 'Problema',
    text: 'La facturación había caído de forma considerable y el producto estaba perdiendo competitividad frente a nuevos competidores del mercado.',
    icon: ArrowDown,
  },
  {
    label: 'Hallazgo',
    text: 'Detectamos pérdida de posicionamiento, entrada de competidores con packs mejor diferenciados, exceso de gasto en PPC, pérdida de rentabilidad y una grave supresión de búsqueda que limitaba la visibilidad del producto.',
    icon: Search,
  },
  {
    label: 'Resultado',
    text: 'El producto recuperó posicionamiento en palabras clave prioritarias, volvió a primera página y, tras la mejora estratégica y visual del listing, terminó alcanzando posiciones destacadas dentro de los más vendidos.',
    icon: TrendingUp,
  },
] as const

const DIAGNOSIS = [
  'Nuevos competidores con packs más diferenciados',
  'Pérdida de posicionamiento orgánico',
  'Gran gasto en PPC',
  'Pérdida de rentabilidad',
  'Supresión de búsqueda en parte del producto',
] as const

const RESULTS = [
  'Primera página recuperada',
  'Palabras clave prioritarias posicionadas',
  'Mayor competitividad visual',
  'Recuperación de ventas y estabilidad',
] as const

function MediaPlaceholder({
  label,
  className = '',
}: {
  label: string
  className?: string
}) {
  return (
    <div
      className={`relative flex min-h-64 items-center justify-center overflow-hidden rounded-[1.75rem] border border-dashed border-white/20 bg-white/[0.035] p-8 text-center ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px]"
      />
      <div className="relative flex max-w-xs flex-col items-center">
        <span className="flex size-12 items-center justify-center rounded-full border border-electric/25 bg-electric/10 text-[#91a9ff]">
          <ImageIcon className="size-5" aria-hidden="true" />
        </span>
        <p className="mt-4 text-xs font-semibold tracking-wide text-white/52">
          {label}
        </p>
      </div>
    </div>
  )
}

export default function CasosPage() {
  return (
    <main className="overflow-x-clip bg-[#020817] text-white">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="starfield pointer-events-none absolute inset-0 opacity-70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[48rem] w-[80rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(46,91,255,0.16),transparent_66%)]"
        />

        <header className="relative px-5 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                Casos
              </span>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance md:text-6xl lg:text-7xl">
                Casos reales, sin adornos
              </h1>
              <p className="mt-7 max-w-3xl text-sm leading-relaxed text-white/62 text-pretty md:text-lg">
                Análisis reales de cuentas de Amazon, decisiones estratégicas y
                mejoras ejecutadas para recuperar posicionamiento, rentabilidad
                y crecimiento. Consultoría Amazon conectada con PPC,
                optimización de listings y conversión.
              </p>
            </Reveal>
          </div>
        </header>

        <article className="relative border-t border-white/8">
          <section className="px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-electric/25 bg-electric/10 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#9bb0ff] uppercase">
                    Caso real · Empapadores para adultos
                  </span>
                  <span className="inline-flex items-center gap-2 text-[10px] tracking-wide text-white/38">
                    <ShieldCheck className="size-3.5" aria-hidden="true" />
                    Caso anonimizado por confidencialidad
                  </span>
                </div>
                <h2 className="mt-7 max-w-5xl font-display text-3xl font-bold leading-tight tracking-tight text-balance md:text-5xl">
                  De una caída de facturación a recuperar posicionamiento,
                  estabilidad y ventas en Amazon
                </h2>
                <p className="mt-7 max-w-4xl text-sm leading-relaxed text-white/58 md:text-base">
                  El cliente acudió a nosotros después de detectar una bajada
                  importante de facturación en su producto de empapadores para
                  adultos. Tras analizar el mercado, la cuenta y el listing,
                  identificamos varios problemas que estaban afectando
                  directamente al posicionamiento, la rentabilidad y la
                  conversión del producto en Amazon.
                </p>
              </Reveal>

              <div className="mt-12 grid gap-4 lg:grid-cols-3">
                {SUMMARY.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Reveal key={item.label} delay={index * 0.07} className="h-full">
                      <div className="group h-full rounded-[1.75rem] border border-white/12 bg-[#07172f]/72 p-6 shadow-[0_24px_70px_-48px_rgba(46,91,255,0.75)] backdrop-blur-xl transition-colors hover:border-electric/30 md:p-7">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-[0.16em] text-[#91a9ff] uppercase">
                            {item.label}
                          </span>
                          <span className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/55">
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                        </div>
                        <p className="mt-6 text-sm leading-relaxed text-white/58">
                          {item.text}
                        </p>
                      </div>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="border-y border-white/8 bg-white/[0.025] px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
              <Reveal>
                <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                  Fase 01
                </span>
                <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                  Una bajada de facturación que escondía varios problemas
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-white/58 md:text-base">
                  El cliente acudió a nosotros porque su producto había bajado
                  en facturación de forma importante. A simple vista parecía un
                  problema comercial, pero al revisar la cuenta detectamos que
                  la caída llevaba meses produciéndose y que el producto estaba
                  perdiendo fuerza dentro de Amazon.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/14">
                  <Image
                    src={withBasePath('/images/about/audit-work.jpg')}
                    alt="Análisis profesional de una cuenta de Amazon"
                    fill
                    sizes="(max-width: 1023px) calc(100vw - 2.5rem), 45vw"
                    className="object-cover"
                    style={{ objectPosition: '50% 38%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/45 via-transparent to-transparent" />
                </div>
              </Reveal>
            </div>
          </section>

          <section className="px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
              <Reveal>
                <div className="lg:sticky lg:top-32">
                  <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                    Fase 02
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
                    Analizamos el mercado, la cuenta y el posicionamiento
                  </h3>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-sm leading-relaxed text-white/58 md:text-base">
                  Hicimos un análisis completo del mercado y de la cuenta para
                  entender qué estaba ocurriendo realmente. Detectamos nuevos
                  competidores con una diferenciación clara en cuanto a formato
                  y pack, pérdida de visibilidad orgánica, un gasto elevado en
                  PPC y un deterioro progresivo de la rentabilidad.
                </p>
                <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {DIAGNOSIS.map((item, index) => (
                    <div key={item} className="flex items-center gap-5 py-5">
                      <span className="font-display text-xs font-bold text-electric">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm text-white/68">{item}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          <section className="border-y border-white/8 bg-[#06142b]/55 px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal>
                  <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                    Fase 03
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
                    Priorizamos las acciones que más impacto podían tener
                  </h3>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-sm leading-relaxed text-white/58 md:text-base">
                    No empezamos cambiando todo a la vez. Primero resolvimos,
                    junto al cliente, la grave supresión de búsqueda que estaba
                    afectando la visibilidad del producto. Después realizamos un
                    nuevo estudio de palabras clave y replanteamos el enfoque de
                    posicionamiento para recuperar presencia en Amazon.
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-white/58 md:text-base">
                    El nuevo estudio de palabras clave nos permitió volver a
                    trabajar el posicionamiento en Amazon con foco en las
                    búsquedas más importantes para la categoría.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.12} className="mt-12">
                <MediaPlaceholder label="Aquí irá una imagen del caso (subida por el cliente)" />
              </Reveal>
            </div>
          </section>

          <section className="px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 lg:grid-cols-2">
                <Reveal>
                  <div className="h-full rounded-[2rem] border border-white/12 bg-white/[0.035] p-7 md:p-9">
                    <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                      Fase 04
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance">
                      La recuperación empezó antes incluso del cambio visual
                    </h3>
                    <p className="mt-6 text-sm leading-relaxed text-white/56">
                      Antes de publicar la nueva imagen principal, el producto
                      ya empezó a recuperar terreno. Gracias al nuevo trabajo de
                      posicionamiento y a la recuperación de visibilidad,
                      empezó a colocarse de nuevo en primera página para algunas
                      de las palabras clave prioritarias.
                    </p>
                    <div className="mt-8 border-l-2 border-electric pl-5 font-display text-lg font-semibold text-white/88">
                      Primero recuperamos la base estratégica. Después
                      aceleramos la conversión.
                    </div>
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div className="h-full rounded-[2rem] border border-electric/20 bg-electric/[0.065] p-7 shadow-[0_28px_90px_-56px_rgba(46,91,255,0.9)] md:p-9">
                    <span className="text-xs font-semibold tracking-widest text-[#91a9ff] uppercase">
                      Fase 05
                    </span>
                    <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance">
                      La nueva imagen principal aceleró el crecimiento
                    </h3>
                    <p className="mt-6 text-sm leading-relaxed text-white/58">
                      Una vez recuperado el rumbo, añadimos una nueva imagen
                      principal más competitiva y mejor alineada con el mercado
                      actual. Esa mejora visual ayudó a reforzar la conversión y
                      terminó de impulsar el producto, que volvió a situarse
                      entre los más vendidos con una proyección de ventas mucho
                      más sólida.
                    </p>
                    <p className="mt-5 text-sm leading-relaxed text-white/58">
                      Además, el producto empezó a consolidar una velocidad muy
                      positiva de nuevas valoraciones favorables.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="border-y border-white/8 bg-white/[0.025] px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                  Optimización de listing
                </span>
                <h3 className="mt-4 max-w-4xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                  Una imagen principal preparada para competir mejor
                </h3>
                <p className="mt-6 max-w-4xl text-sm leading-relaxed text-white/58 md:text-base">
                  La nueva imagen principal se diseñó para competir mejor dentro
                  de la categoría, mejorar la lectura del pack, reforzar la
                  diferenciación frente a nuevos competidores y apoyar una
                  mejor conversión en Amazon. Fue una pieza del proceso, no la
                  única causa de la recuperación.
                </p>
              </Reveal>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <Reveal>
                  <div>
                    <span className="mb-4 block text-[10px] font-bold tracking-[0.16em] text-white/40 uppercase">
                      Antes
                    </span>
                    <MediaPlaceholder label="Imagen principal anterior" className="aspect-square" />
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div>
                    <span className="mb-4 block text-[10px] font-bold tracking-[0.16em] text-[#91a9ff] uppercase">
                      Después
                    </span>
                    <MediaPlaceholder label="Nueva imagen principal" className="aspect-square border-electric/30 bg-electric/[0.045]" />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div className="overflow-hidden rounded-[2rem] border border-electric/25 bg-[linear-gradient(135deg,rgba(46,91,255,0.15),rgba(7,23,47,0.78)_48%,rgba(7,23,47,0.55))] p-7 shadow-[0_36px_110px_-62px_rgba(46,91,255,0.95)] md:p-12">
                  <span className="text-xs font-semibold tracking-widest text-[#91a9ff] uppercase">
                    Resultado
                  </span>
                  <h3 className="mt-4 max-w-4xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                    Posicionamiento recuperado, producto estabilizado y
                    crecimiento de ventas
                  </h3>
                  <p className="mt-6 max-w-4xl text-sm leading-relaxed text-white/60 md:text-base">
                    Tras resolver la supresión de búsqueda, replantear el
                    posicionamiento, trabajar las palabras clave prioritarias y
                    reforzar la imagen principal, el producto volvió a competir
                    en primera página y alcanzó posiciones destacadas dentro de
                    los más vendidos de su categoría.
                  </p>
                  <div className="mt-10 grid gap-3 sm:grid-cols-2">
                    {RESULTS.map((result) => (
                      <div
                        key={result}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-4"
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-electric/20 text-[#a8b8ff]">
                          <Check className="size-3.5" aria-hidden="true" />
                        </span>
                        <span className="text-sm text-white/72">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="border-t border-white/8 bg-white/[0.025] px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
              <Reveal>
                <div className="flex size-14 items-center justify-center rounded-full border border-electric/25 bg-electric/10 text-[#91a9ff]">
                  <Target className="size-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Qué demuestra este caso
                </h3>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-lg leading-relaxed text-white/68">
                  Cuando una cuenta en Amazon pierde ventas, la solución rara
                  vez depende de una sola acción. En este caso fue necesario
                  conectar análisis de mercado, estrategia de posicionamiento,
                  optimización de listing, control del PPC y mejora visual para
                  recuperar competitividad y volver a crecer.
                </p>
                <p className="mt-5 text-sm leading-relaxed text-white/48">
                  Una consultoría Amazon útil conecta el posicionamiento en
                  Amazon, el PPC Amazon, la conversión y la estrategia Amazon
                  dentro de un mismo orden de prioridades.
                </p>
              </Reveal>
            </div>
          </section>
        </article>

        <section className="relative px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/12 bg-[#07172f]/75 px-6 py-12 text-center shadow-[0_32px_100px_-50px_rgba(46,91,255,0.6)] backdrop-blur-xl md:px-12 md:py-16">
            <Reveal>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-electric uppercase">
                <Sparkles className="size-4" aria-hidden="true" />
                Siguiente paso
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                ¿Tu cuenta en Amazon está perdiendo ventas y no sabes
                exactamente por qué?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">
                Analizamos tu mercado, tu cuenta y tus puntos críticos para
                detectar dónde está el problema y definir una estrategia
                realista de recuperación y crecimiento.
              </p>
              <LinkButton href={CALENDLY_URL} external className="mt-8">
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
