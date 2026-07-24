import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  Handshake,
  ShieldCheck,
} from 'lucide-react'
import { LinkButton } from '@/components/link-button'
import { Reveal } from '@/components/reveal'
import { CALENDLY_URL } from '@/lib/site'
import { withBasePath } from '@/lib/base-path'

export const metadata: Metadata = {
  title: 'Sobre nosotros · CHRITERIO',
  description:
    'Conoce a Christian y Rafa, el equipo que conecta estrategia, gestión y creatividad para ayudar a crecer marcas en Amazon.',
}

const TEAM = [
  {
    name: 'Christian',
    role: 'Estrategia, gestión y crecimiento en Amazon',
    description:
      'Se incorporó al proyecto en 2023 y desde entonces trabaja directamente en cuentas, listings, campañas PPC, análisis de rentabilidad y operativa. Su función dentro de CHRITERIO es detectar qué está frenando el crecimiento, ordenar las prioridades y convertir el análisis en un plan ejecutable.',
    image: '/images/about/christian-trabajando.jpg',
    alt: 'Christian trabajando en estrategia, gestión y crecimiento en Amazon',
    position: '68% 45%',
  },
  {
    name: 'Rafa',
    role: 'Estrategia creativa y marketplaces',
    description:
      'Vende en diferentes marketplaces desde 2020. Combina experiencia comercial, conocimiento de producto y dirección creativa para transformar la estrategia en imágenes, vídeos y contenidos que ayuden a mejorar la percepción y la conversión de las marcas.',
    image: '/images/about/rafa-trabajando.jpg',
    alt: 'Rafa trabajando en estrategia creativa y marketplaces',
    position: '64% 44%',
  },
] as const

const TIMELINE = [
  {
    label: '2020',
    title: 'Rafa comienza a vender en marketplaces',
    description:
      'Primeros productos, operativa, aprendizaje comercial y experiencia directa con plataformas.',
  },
  {
    label: '2023',
    title: 'Christian se incorpora al proyecto',
    description:
      'Se refuerzan la gestión, la estrategia, el PPC y el análisis de cuentas.',
  },
  {
    label: 'AMZ CREATIVES',
    title: 'Creatividad enfocada a conversión',
    description:
      'Fotografía, diseño, vídeo y contenido para marcas y vendedores de Amazon.',
  },
  {
    label: 'CHRITERIO',
    title: 'Estrategia, gestión y creatividad conectadas',
    description:
      'Todo el aprendizaje acumulado se convierte en una metodología más completa para ayudar a escalar cuentas.',
  },
  {
    label: 'SIGUIENTE ETAPA',
    title: 'Amazon 360º y expansión hacia TikTok Shop',
    description:
      'Nuevas herramientas, procesos y canales para acompañar el crecimiento de las marcas.',
  },
] as const

const VALUES = [
  {
    title: 'Honestidad antes que venta',
    description:
      'Si no creemos que podamos ayudarte, te lo diremos. Y si no necesitas un servicio, tampoco intentaremos vendértelo.',
    icon: ShieldCheck,
  },
  {
    title: 'Criterio profesional',
    description:
      'No recomendamos acciones porque estén de moda. Priorizamos lo que tenga sentido para tu cuenta, tus márgenes y tu momento actual.',
    icon: Compass,
  },
  {
    title: 'Formación continua',
    description:
      'Amazon cambia constantemente. Por eso seguimos vendiendo, probando, analizando cuentas y formándonos para no trabajar con recetas desactualizadas.',
    icon: BookOpen,
  },
  {
    title: 'Implicación real',
    description:
      'Tratamos cada cuenta entendiendo que detrás hay inversión, equipo y decisiones empresariales. No entregamos documentos para desaparecer después.',
    icon: Handshake,
  },
] as const

export default function SobreNosotrosPage() {
  return (
    <main className="overflow-x-clip">
      <div className="relative overflow-hidden bg-[#020817] text-white">
        <div
          aria-hidden="true"
          className="starfield pointer-events-none absolute inset-0 opacity-75"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/3 h-[46rem] w-[72rem] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(46,91,255,0.15),transparent_66%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[48%] right-[-18rem] size-[44rem] rounded-full bg-electric/[0.055] blur-3xl"
        />

        <header className="relative px-5 pt-32 pb-20 md:px-8 md:pt-40 md:pb-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                  Sobre nosotros
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-balance md:text-6xl lg:text-7xl">
                  Dos perfiles. Un mismo criterio.
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-xl text-sm leading-relaxed text-white/62 text-pretty md:text-base">
                  Somos Christian y Rafa. Llevamos años trabajando dentro de
                  Amazon y otros marketplaces, tomando decisiones reales sobre
                  productos, publicidad, posicionamiento y contenido. CHRITERIO
                  nace de toda esa experiencia para ayudar a otras marcas con
                  estrategia, ejecución y creatividad conectadas.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="relative grid aspect-[3/2] grid-cols-2 overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.04] shadow-[0_32px_100px_-48px_rgba(46,91,255,0.65)]">
                <div className="relative overflow-hidden border-r border-white/12">
                  <Image
                    src={withBasePath('/images/about/christian-about.jpg')}
                    alt="Christian sonriendo"
                    fill
                    priority
                    sizes="(max-width: 1023px) 50vw, 28vw"
                    className="object-cover"
                    style={{ objectPosition: '53% 42%' }}
                  />
                </div>
                <div className="relative overflow-hidden">
                  <Image
                    src={withBasePath('/images/about/rafa-sonriendo.jpg')}
                    alt="Rafa sonriendo"
                    fill
                    priority
                    sizes="(max-width: 1023px) 50vw, 28vw"
                    className="object-cover"
                    style={{ objectPosition: '50% 35%' }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#06142b]/55 via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </header>

        <section className="relative border-t border-white/8 px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                El equipo
              </span>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
                Experiencia operativa y creatividad bajo una misma dirección.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {TEAM.map((member, index) => (
                <Reveal key={member.name} delay={index * 0.08} className="h-full">
                  <article className="h-full overflow-hidden rounded-[2rem] border border-white/12 bg-[#07172f]/72 shadow-[0_28px_90px_-50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                    <div className="relative aspect-[3/2]">
                      <Image
                        src={withBasePath(member.image)}
                        alt={member.alt}
                        fill
                        sizes="(max-width: 1023px) calc(100vw - 2.5rem), 50vw"
                        className="object-cover"
                        style={{ objectPosition: member.position }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07172f]/75 via-transparent to-transparent" />
                    </div>
                    <div className="p-6 md:p-8">
                      <h3 className="font-display text-3xl font-bold tracking-tight text-white">
                        {member.name}
                      </h3>
                      <p className="mt-2 text-xs font-semibold tracking-wide text-[#91a9ff]">
                        {member.role}
                      </p>
                      <p className="mt-5 text-sm leading-relaxed text-white/58">
                        {member.description}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/8 bg-white/[0.025] px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <div className="relative aspect-[2/3] overflow-hidden rounded-[2rem] border border-white/14">
                <Image
                  src={withBasePath('/images/about/audit-work.jpg')}
                  alt="Christian trabajando frente a una cuenta de Amazon"
                  fill
                  sizes="(max-width: 1023px) calc(100vw - 2.5rem), 45vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                Experiencia desde dentro
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
                No analizamos Amazon desde fuera.
              </h2>
              <div className="mt-7 flex flex-col gap-5 text-sm leading-relaxed text-white/60 md:text-base">
                <p>
                  Hemos vendido nuestros propios productos, trabajado dentro de
                  cuentas reales y colaborado con marcas y vendedores de
                  diferentes categorías. Sabemos lo que implica invertir dinero,
                  cometer errores, revisar campañas, rehacer un listing y tomar
                  decisiones sin tener todas las respuestas.
                </p>
                <p>
                  A través de AMZ Creatives hemos formado parte de numerosos
                  proyectos de Amazon, trabajando tanto en la parte creativa
                  como en decisiones relacionadas con posicionamiento,
                  conversión y estrategia de producto.
                </p>
                <p>
                  Esa combinación de experiencia operativa, estrategia y
                  producción creativa es la que nos permite construir una
                  propuesta 360º para Amazon, con TikTok Shop como siguiente
                  canal de crecimiento.
                </p>
              </div>

              <div className="mt-9 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-5 border-y border-white/10 py-6">
                <Image
                  src={withBasePath('/chriterio-logo-white.png')}
                  alt="CHRITERIO"
                  width={1433}
                  height={249}
                  className="h-auto max-h-7 w-full object-contain object-left"
                />
                <span className="text-sm text-white/25" aria-hidden="true">
                  +
                </span>
                <Image
                  src={withBasePath('/amz-creatives-logo.png')}
                  alt="AMZ Creatives"
                  width={4773}
                  height={713}
                  className="h-auto max-h-7 w-full object-contain object-left brightness-0 invert"
                />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <p className="flex items-start gap-2.5 text-xs leading-relaxed text-white/48">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-electric" aria-hidden="true" />
                  CHRITERIO conecta estrategia, gestión y crecimiento.
                </p>
                <p className="flex items-start gap-2.5 text-xs leading-relaxed text-white/48">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-[#ff6846]" aria-hidden="true" />
                  AMZ Creatives aporta experiencia y ejecución creativa.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="relative px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                Trayectoria
              </span>
              <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
                Aprendizaje acumulado, paso a paso.
              </h2>
            </Reveal>

            <div className="relative mt-14">
              <div
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-[5px] w-px bg-gradient-to-b from-electric/70 via-white/15 to-electric/25 lg:top-[5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
              />
              <div className="grid gap-10 lg:grid-cols-5 lg:gap-5">
                {TIMELINE.map((item, index) => (
                  <Reveal key={`${item.label}-${item.title}`} delay={index * 0.06}>
                    <article className="relative pl-8 lg:pt-8 lg:pl-0">
                      <span className="absolute top-0 left-0 size-[11px] rounded-full border-2 border-[#020817] bg-electric shadow-[0_0_14px_rgba(46,91,255,0.65)] lg:left-0" />
                      <p className="text-[9px] font-bold tracking-[0.16em] text-[#91a9ff] uppercase">
                        {item.label}
                      </p>
                      <h3 className="mt-3 font-display text-lg font-bold leading-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-xs leading-relaxed text-white/48">
                        {item.description}
                      </p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-y border-white/8 bg-white/[0.025] px-5 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                Cómo decidimos
              </span>
              <h2 className="mt-4 max-w-4xl font-display text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
                Trabajar bien también significa saber decir que no.
              </h2>
            </Reveal>
            <div className="mt-12 grid border-t border-white/12 md:grid-cols-2">
              {VALUES.map((value, index) => {
                const Icon = value.icon
                return (
                  <Reveal key={value.title} delay={index * 0.05}>
                    <article
                      className={`border-b border-white/12 py-8 md:min-h-56 md:px-8 ${
                        index % 2 === 0
                          ? 'md:border-r md:pl-0'
                          : 'md:pr-0'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="flex size-10 items-center justify-center rounded-full border border-electric/20 bg-electric/8 text-[#91a9ff]">
                          <Icon
                            className="size-[1.125rem]"
                            aria-hidden="true"
                          />
                        </span>
                        <h3 className="font-display text-xl font-bold text-white">
                          {value.title}
                        </h3>
                      </div>
                      <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/52">
                        {value.description}
                      </p>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative px-5 py-24 md:px-8 md:py-32">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/12 bg-[#07172f]/72 px-6 py-12 text-center shadow-[0_32px_100px_-50px_rgba(46,91,255,0.6)] backdrop-blur-xl md:px-12 md:py-16">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                Hablemos
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
                No buscamos venderte más. Buscamos que tomes mejores decisiones.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/58 text-pretty md:text-base">
                Cuéntanos en qué punto está tu cuenta. La auditoría inicial nos
                permitirá entender si podemos ayudarte y cuál debería ser el
                siguiente paso.
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
