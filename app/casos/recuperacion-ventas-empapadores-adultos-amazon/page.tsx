import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Search,
  ShieldCheck,
  TrendingUp,
  TriangleAlert,
} from 'lucide-react'
import { CaseMedia } from '@/components/cases/case-media'
import { LinkButton } from '@/components/link-button'
import { Reveal } from '@/components/reveal'
import { CALENDLY_URL } from '@/lib/site'

const CASE_CANONICAL_URL =
  'https://chrisfriki.github.io/chriterio-website/casos/recuperacion-ventas-empapadores-adultos-amazon'

export const metadata: Metadata = {
  title: 'Caso Amazon: recuperación de ventas y posicionamiento | CHRITERIO',
  description:
    'Caso real anonimizado de recuperación de ventas, posicionamiento orgánico, PPC y conversión para un producto de empapadores para adultos en Amazon.',
  alternates: {
    canonical: CASE_CANONICAL_URL,
  },
  openGraph: {
    title: 'Caso Amazon: recuperación de ventas y posicionamiento',
    description:
      'Caso real anonimizado de recuperación de ventas, posicionamiento orgánico, PPC y conversión para empapadores de adultos en Amazon.',
    url: CASE_CANONICAL_URL,
    type: 'article',
    siteName: 'CHRITERIO',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caso Amazon: recuperación de ventas y posicionamiento',
    description:
      'Estrategia de recuperación para un producto de empapadores para adultos en Amazon.',
  },
}

const SUMMARY = [
  {
    label: 'Problema',
    title: 'La facturación llevaba meses cayendo.',
    text: 'El producto estaba perdiendo terreno frente a nuevos competidores y mantenía un gasto elevado en PPC sin obtener la rentabilidad esperada.',
    icon: TriangleAlert,
  },
  {
    label: 'Hallazgo',
    title: 'La cuenta estaba perdiendo competitividad por varios frentes.',
    text: 'Detectamos nuevos packs más diferenciados, pérdida de posicionamiento orgánico, una estrategia PPC poco eficiente, una imagen principal menos competitiva y una supresión de búsqueda que limitaba la visibilidad.',
    icon: Search,
  },
  {
    label: 'Resultado',
    title: 'El producto recuperó visibilidad, estabilidad y posiciones destacadas.',
    text: 'Primero volvió a posicionarse en búsquedas prioritarias y, tras incorporar la nueva imagen principal, aceleró sus ventas y regresó a posiciones relevantes entre los más vendidos.',
    icon: TrendingUp,
  },
] as const

const DIAGNOSIS = [
  'Nuevos competidores con packs más diferenciados.',
  'Pérdida de posiciones orgánicas relevantes.',
  'Gasto elevado en campañas PPC.',
  'Rentabilidad deteriorada.',
  'Supresión de búsqueda en parte del producto.',
] as const

const RESULTS = [
  'Primera página recuperada',
  'Keywords prioritarias posicionadas',
  'Mayor competitividad visual',
  'Trayectoria de ventas positiva',
] as const

export default function EmpapadoresAdultosAmazonCasePage() {
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
              <Link
                href="/casos"
                className="inline-flex items-center gap-2 text-xs font-medium text-white/45 transition-colors hover:text-white"
              >
                <ArrowLeft className="size-3.5" aria-hidden="true" />
                Volver a todos los casos
              </Link>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-electric/25 bg-electric/10 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#9bb0ff] uppercase">
                  Caso real · Empapadores para adultos
                </span>
                <span className="inline-flex items-center gap-2 text-[10px] tracking-wide text-white/38">
                  <ShieldCheck className="size-3.5" aria-hidden="true" />
                  Caso anonimizado por confidencialidad
                </span>
              </div>
              <h1 className="mt-7 max-w-5xl font-display text-4xl font-bold leading-[1.04] tracking-tight text-balance md:text-6xl">
                De una caída de facturación a recuperar posicionamiento,
                estabilidad y ventas en Amazon
              </h1>
              <p className="mt-7 max-w-4xl text-sm leading-relaxed text-white/60 md:text-lg">
                El cliente acudió a nosotros después de experimentar una
                reducción importante de facturación. Tras analizar el mercado,
                la cuenta y el listing, descubrimos que la caída no dependía de
                una sola causa.
              </p>
            </Reveal>
          </div>
        </header>

        <article className="relative border-t border-white/8">
          <section className="px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                  Resumen del caso
                </span>
                <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                  El problema no estaba en un único punto.
                </h2>
              </Reveal>
              <div className="mt-12 grid gap-4 lg:grid-cols-3">
                {SUMMARY.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Reveal key={item.label} delay={index * 0.07} className="h-full">
                      <section className="h-full rounded-[1.75rem] border border-white/12 bg-[#07172f]/72 p-6 backdrop-blur-xl md:p-7">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold tracking-[0.16em] text-[#91a9ff] uppercase">
                            {item.label}
                          </span>
                          <span className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/55">
                            <Icon className="size-4" aria-hidden="true" />
                          </span>
                        </div>
                        <h3 className="mt-6 font-display text-xl font-bold leading-tight">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-sm leading-relaxed text-white/52">
                          {item.text}
                        </p>
                      </section>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </section>

          <section className="border-y border-white/8 bg-white/[0.025] px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.96fr] lg:gap-20">
              <Reveal>
                <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                  Fase 01
                </span>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                  Una caída que no se había detectado a tiempo
                </h2>
                <p className="mt-6 text-sm leading-relaxed text-white/58 md:text-base">
                  El cliente acudió a nosotros tras experimentar una reducción
                  importante de facturación. Al revisar la evolución comprobamos
                  que no se trataba de una oscilación puntual: el producto
                  llevaba meses perdiendo competitividad y rentabilidad.
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <CaseMedia
                  src="/images/casos/empapadores-adultos-reunion.webp"
                  alt="Reunión de análisis del caso de empapadores para adultos en Amazon"
                  placeholder="Fotografía de reunión y análisis del proyecto"
                  className="aspect-[4/3]"
                />
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
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
                    Analizamos el mercado y la cuenta
                  </h2>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="text-sm leading-relaxed text-white/58 md:text-base">
                  Realizamos un análisis completo de la categoría, los
                  principales competidores, el posicionamiento orgánico, las
                  palabras clave, la inversión publicitaria y la estructura del
                  listing.
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
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
                    Priorizamos antes de ejecutar
                  </h2>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-sm leading-relaxed text-white/58 md:text-base">
                    Primero trabajamos junto al cliente para eliminar la
                    supresión de búsqueda. Después realizamos un nuevo estudio
                    de palabras clave y definimos las búsquedas prioritarias
                    para recuperar posicionamiento en Amazon. En paralelo,
                    desarrollamos una nueva imagen principal.
                  </p>
                </Reveal>
              </div>
              <Reveal delay={0.12} className="mt-12">
                <CaseMedia
                  src="/images/casos/empapadores-adultos-evidencia.webp"
                  alt="Evidencia de la evolución de posicionamiento y ventas del caso Amazon"
                  placeholder="Evidencia de ventas, ranking o evolución de palabras clave"
                  className="min-h-80 md:min-h-[30rem]"
                  caption="Evidencia del caso. Pie de imagen editable al incorporar la captura definitiva."
                />
              </Reveal>
            </div>
          </section>

          <section className="px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
              <Reveal>
                <section className="h-full rounded-[2rem] border border-white/12 bg-white/[0.035] p-7 md:p-9">
                  <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                    Fase 04
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance">
                    La recuperación empezó antes del cambio creativo
                  </h2>
                  <p className="mt-6 text-sm leading-relaxed text-white/56">
                    El producto comenzó a recuperar posiciones antes de publicar
                    la nueva imagen principal. El nuevo trabajo de palabras
                    clave y visibilidad permitió volver a competir en primera
                    página para varias búsquedas prioritarias.
                  </p>
                  <blockquote className="mt-8 border-l-2 border-electric pl-5 font-display text-lg font-semibold text-white/88">
                    Primero recuperamos la base estratégica. Después aceleramos
                    la conversión.
                  </blockquote>
                </section>
              </Reveal>
              <Reveal delay={0.08}>
                <section className="h-full rounded-[2rem] border border-electric/20 bg-electric/[0.065] p-7 md:p-9">
                  <span className="text-xs font-semibold tracking-widest text-[#91a9ff] uppercase">
                    Fase 05
                  </span>
                  <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance">
                    La nueva imagen principal aceleró el crecimiento
                  </h2>
                  <p className="mt-6 text-sm leading-relaxed text-white/58">
                    Una vez estabilizado el posicionamiento, publicamos una
                    imagen principal más competitiva y mejor adaptada al
                    mercado. La combinación de visibilidad, posicionamiento y
                    presentación visual estuvo seguida de una aceleración clara
                    de las ventas.
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-white/58">
                    El producto volvió a ocupar posiciones destacadas dentro de
                    los más vendidos y comenzó a generar nuevas valoraciones
                    favorables a un ritmo muy positivo.
                  </p>
                </section>
              </Reveal>
            </div>
          </section>

          <section className="border-y border-white/8 bg-white/[0.025] px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                  Optimización de listings
                </span>
                <h2 className="mt-4 max-w-4xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                  Una imagen principal preparada para competir mejor
                </h2>
                <p className="mt-6 max-w-4xl text-sm leading-relaxed text-white/58 md:text-base">
                  La nueva imagen principal se diseñó para mejorar la lectura
                  del pack, reforzar la diferenciación frente a los nuevos
                  competidores y aumentar la competitividad visual dentro de
                  Amazon. La imagen fue un acelerador, no la única causa de la
                  recuperación.
                </p>
              </Reveal>
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <Reveal>
                  <div>
                    <span className="mb-4 block text-[10px] font-bold tracking-[0.16em] text-white/40 uppercase">
                      Antes
                    </span>
                    <CaseMedia
                      src="/images/casos/empapadores-adultos-antes.webp"
                      alt="Imagen principal anterior del producto de empapadores para adultos"
                      placeholder="Imagen principal anterior"
                      className="aspect-square"
                    />
                  </div>
                </Reveal>
                <Reveal delay={0.08}>
                  <div>
                    <span className="mb-4 block text-[10px] font-bold tracking-[0.16em] text-[#91a9ff] uppercase">
                      Después
                    </span>
                    <CaseMedia
                      src="/images/casos/empapadores-adultos-despues.webp"
                      alt="Nueva imagen principal optimizada del producto de empapadores para adultos"
                      placeholder="Nueva imagen principal"
                      className="aspect-square"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section className="px-5 py-20 md:px-8 md:py-28">
            <div className="mx-auto max-w-6xl">
              <Reveal>
                <div className="rounded-[2rem] border border-electric/25 bg-[linear-gradient(135deg,rgba(46,91,255,0.15),rgba(7,23,47,0.78)_48%,rgba(7,23,47,0.55))] p-7 shadow-[0_36px_110px_-62px_rgba(46,91,255,0.95)] md:p-12">
                  <span className="text-xs font-semibold tracking-widest text-[#91a9ff] uppercase">
                    Resultado
                  </span>
                  <h2 className="mt-4 max-w-4xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                    Posicionamiento recuperado. Producto estabilizado. Ventas
                    de nuevo en crecimiento.
                  </h2>
                  <p className="mt-6 max-w-4xl text-sm leading-relaxed text-white/60 md:text-base">
                    Tras resolver la supresión de búsqueda, replantear el
                    posicionamiento, trabajar las palabras clave prioritarias y
                    reforzar la imagen principal, el producto volvió a competir
                    en primera página y alcanzó posiciones destacadas dentro de
                    los más vendidos.
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
        </article>

        <section className="relative border-t border-white/8 px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/12 bg-[#07172f]/75 px-6 py-12 text-center backdrop-blur-xl md:px-12 md:py-16">
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
                ¿Tu cuenta está perdiendo ventas y no sabes exactamente por
                qué?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/58 md:text-base">
                Analizamos el mercado, el posicionamiento, el PPC, la conversión
                y la rentabilidad para detectar qué está frenando el crecimiento
                de tu cuenta.
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
