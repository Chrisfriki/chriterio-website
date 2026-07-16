'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowUpRight,
  Box,
  Camera,
  Layers3,
  Sparkles,
  Video,
  type LucideIcon,
} from 'lucide-react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { withBasePath } from '@/lib/base-path'

// Replace null with withBasePath('/amz-creatives/showreel.mp4') when the real
// compressed showreel is available. Keeping it null avoids a production 404.
const SHOWREEL_SRC: string | undefined = undefined
const CREATIVE_PROJECTS_URL = '/casos'

type Capability = {
  number: string
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
  accent: string
}

const CAPABILITIES: Capability[] = [
  {
    number: '01',
    eyebrow: 'Imágenes que convierten',
    title: 'Diseñamos para vender, no solo para decorar.',
    description:
      'Creamos imágenes principales, infografías, comparativas, storytelling visual y contenido A+ pensado para comunicar rápido y mejorar la percepción del producto.',
    icon: Camera,
    accent: '#ff6846',
  },
  {
    number: '02',
    eyebrow: 'Vídeos que venden',
    title: 'Convertimos características en historias visuales.',
    description:
      'Producimos vídeos de producto, anuncios, demostraciones, contenido para listings y piezas adaptadas a campañas y redes sociales.',
    icon: Video,
    accent: '#ff9d78',
  },
  {
    number: '03',
    eyebrow: 'Producción real y modelos',
    title: 'Escenas creíbles para productos reales.',
    description:
      'Trabajamos con fotografía de producto, lifestyle y modelos para mostrar el uso, la escala y el contexto de cada producto de una forma más humana.',
    icon: Layers3,
    accent: '#ff6846',
  },
  {
    number: '04',
    eyebrow: 'IA, 3D y producción híbrida',
    title: 'Usamos cada tecnología donde aporta valor.',
    description:
      'Combinamos producción tradicional, inteligencia artificial, animación y render 3D para ampliar las posibilidades creativas sin perder coherencia ni realismo.',
    icon: Box,
    accent: '#ff9d78',
  },
]

const OUTCOMES = [
  'Mejor presentación de producto',
  'Mensajes visuales más claros',
  'Mayor coherencia de marca',
  'Producción adaptada a Amazon',
]

function useMobileViewport() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return isMobile
}

function CreativeFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#171717]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(255,104,70,0.65),transparent_30%),linear-gradient(135deg,#151515_15%,#29221f_55%,#ff6846_140%)]" />
      <div className="absolute top-[16%] right-[9%] size-[min(38vw,34rem)] rounded-full border border-white/25" />
      <div className="absolute top-[23%] right-[16%] size-[min(25vw,22rem)] rounded-full bg-[#ff6846] shadow-[0_0_100px_rgba(255,104,70,0.35)]" />
      <div className="absolute right-[22%] bottom-[14%] h-[42%] w-[17%] rotate-12 rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-white/30 to-white/5 shadow-2xl backdrop-blur-sm" />
      <div className="absolute bottom-[12%] left-[8%] font-display text-[clamp(5rem,18vw,18rem)] font-bold leading-none tracking-[-0.08em] text-white/[0.06]">
        AMZ
      </div>
    </div>
  )
}

function ExpandingMedia({
  progress,
  isMobile,
}: {
  progress: MotionValue<number>
  isMobile: boolean
}) {
  const scaleX = useTransform(progress, [0, 0.12, 0.31, 0.76, 0.93, 1], [
    isMobile ? 0.88 : 0.44,
    isMobile ? 0.88 : 0.44,
    1,
    1,
    isMobile ? 0.82 : 0.38,
    isMobile ? 0.82 : 0.38,
  ])
  const scaleY = useTransform(progress, [0, 0.12, 0.31, 0.76, 0.93, 1], [
    isMobile ? 0.46 : 0.5,
    isMobile ? 0.46 : 0.5,
    1,
    1,
    isMobile ? 0.42 : 0.44,
    isMobile ? 0.42 : 0.44,
  ])
  const borderRadius = useTransform(progress, [0.12, 0.31, 0.76, 0.93], [28, 0, 0, 28])
  const shade = useTransform(progress, [0, 0.2, 0.34, 0.75, 0.9], [0.55, 0.35, 0.08, 0.08, 0.5])
  const shadow = useTransform(progress, [0.12, 0.3, 0.78, 0.93], [0.65, 0, 0, 0.65])
  const boxShadow = useTransform(shadow, (value) => `0 30px 90px rgba(0,0,0,${value})`)

  return (
    <motion.div
      className="absolute inset-0 z-10 overflow-hidden bg-[#171717]"
      style={{
        scaleX,
        scaleY,
        borderRadius,
        boxShadow,
      }}
    >
      {SHOWREEL_SRC ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={SHOWREEL_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Showreel de AMZ Creatives"
        />
      ) : (
        <CreativeFallback />
      )}
      <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
    </motion.div>
  )
}

function CapabilityPanel({
  capability,
  progress,
  range,
}: {
  capability: Capability
  progress: MotionValue<number>
  range: [number, number, number, number]
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0])
  const y = useTransform(progress, range, [50, 0, 0, -50])
  const Icon = capability.icon

  return (
    <motion.article
      className="pointer-events-none absolute inset-0 z-40 grid content-center px-5 py-24 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16 md:px-[8vw]"
      style={{ opacity, y }}
    >
      <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#222] md:block">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: `radial-gradient(circle at 65% 35%, ${capability.accent}, transparent 34%), linear-gradient(145deg, #181818, #3a302c)`,
          }}
        />
        <span className="absolute -right-2 -bottom-12 font-display text-[15rem] font-bold leading-none tracking-tighter text-white/10">
          {capability.number}
        </span>
        <div className="absolute top-8 left-8 flex size-16 items-center justify-center rounded-full bg-white text-[#171717]">
          <Icon className="size-7" aria-hidden="true" />
        </div>
      </div>

      <div className="max-w-2xl text-[#191919]">
        <div className="flex items-center gap-4">
          <span className="font-display text-5xl font-bold text-[#ff6846] md:text-7xl">
            {capability.number}
          </span>
          <span className="text-xs font-bold tracking-[0.2em] uppercase md:text-sm">
            {capability.eyebrow}
          </span>
        </div>
        <h3 className="mt-7 font-display text-[clamp(2rem,4vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.04em] text-balance">
          {capability.title}
        </h3>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#191919]/65 md:text-lg">
          {capability.description}
        </p>
      </div>
    </motion.article>
  )
}

function ReducedMotionPortal() {
  return (
    <section className="relative bg-[#020817] text-white" aria-labelledby="amz-portal-title">
      <div className="starfield absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8">
        <span className="text-xs font-semibold tracking-widest text-electric uppercase">
          Ejecución creativa
        </span>
        <h2 id="amz-portal-title" className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-6xl">
          No nos quedamos en el diagnóstico. También construimos la parte visual.
        </h2>
      </div>
      <div className="relative bg-[#f3f0eb] px-5 py-24 text-[#191919] md:px-8">
        <div className="mx-auto max-w-6xl">
          <Image src={withBasePath('/amz-creatives-logo.png')} alt="AMZ Creatives" width={4773} height={713} className="h-8 w-auto" />
          <h3 className="mt-12 max-w-4xl font-display text-4xl font-bold md:text-6xl">
            Creatividad diseñada para destacar dentro de Amazon.
          </h3>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {CAPABILITIES.map((capability) => (
              <article key={capability.number} className="rounded-3xl bg-white p-7">
                <span className="font-display text-4xl font-bold text-[#ff6846]">{capability.number}</span>
                <h4 className="mt-5 font-display text-2xl font-bold">{capability.title}</h4>
                <p className="mt-4 text-sm leading-relaxed text-black/60">{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-24 md:px-8">
        <span className="text-xs font-semibold tracking-widest text-electric uppercase">Un mismo criterio</span>
        <h3 className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-6xl">Estrategia y ejecución, conectadas.</h3>
      </div>
    </section>
  )
}

export function AmzCreativesPortal() {
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useMobileViewport()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.25 })

  const chriterioIntroOpacity = useTransform(progress, [0, 0.1, 0.23], [1, 1, 0])
  const introY = useTransform(progress, [0, 0.22], [0, -60])
  const spaceOpacity = useTransform(progress, [0.16, 0.32, 0.76, 0.94], [1, 0, 0, 1])
  const amzBackgroundOpacity = useTransform(progress, [0.23, 0.34, 0.77, 0.92], [0, 1, 1, 0])
  const amzHeaderOpacity = useTransform(progress, [0.29, 0.37, 0.73, 0.81], [0, 1, 1, 0])
  const amzIntroOpacity = useTransform(progress, [0.29, 0.35, 0.39, 0.44], [0, 1, 1, 0])
  const outcomesOpacity = useTransform(progress, [0.68, 0.71, 0.76, 0.81], [0, 1, 1, 0])
  const returnOpacity = useTransform(progress, [0.87, 0.94, 1], [0, 1, 1])
  const returnY = useTransform(progress, [0.87, 0.96], [40, 0])

  if (reducedMotion) return <ReducedMotionPortal />

  return (
    <section
      ref={sectionRef}
      className="relative h-[380vh] bg-[#020817] text-white md:h-[460vh] xl:h-[500vh]"
      aria-labelledby="amz-portal-title"
    >
      <div className="sticky top-0 h-[100dvh] min-h-[620px] overflow-hidden">
        <motion.div className="starfield absolute inset-0 bg-[#020817]" style={{ opacity: spaceOpacity }} aria-hidden="true" />
        <ExpandingMedia progress={progress} isMobile={isMobile} />

        <motion.div className="absolute inset-0 z-20 bg-[#f3f0eb]" style={{ opacity: amzBackgroundOpacity }} aria-hidden="true" />

        <motion.div
          className="absolute inset-0 z-30 flex items-center px-5 md:px-[8vw]"
          style={{ opacity: chriterioIntroOpacity, y: introY }}
        >
          <div className="max-w-xl md:max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-electric uppercase">Ejecución creativa</span>
            <h2 id="amz-portal-title" className="mt-4 font-display text-[clamp(2.25rem,5vw,4.75rem)] font-bold leading-[1.02] tracking-tight text-balance">
              No nos quedamos en el diagnóstico. También construimos la parte visual.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/70 md:text-lg">
              A través de AMZ Creatives desarrollamos imágenes, vídeos y experiencias visuales para marcas que quieren destacar y convertir mejor dentro de Amazon.
            </p>
            <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-white/55 uppercase">
              <ArrowDown className="size-4" aria-hidden="true" />
              Desliza para entrar en AMZ Creatives
            </span>
          </div>
        </motion.div>

        <motion.div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex items-center justify-end px-5 py-6 md:px-8" style={{ opacity: amzHeaderOpacity }}>
          <Image src={withBasePath('/amz-creatives-logo.png')} alt="AMZ Creatives" width={4773} height={713} className="h-6 w-auto md:h-8" />
        </motion.div>

        <motion.div className="pointer-events-none absolute inset-0 z-40 flex items-center px-5 md:px-[8vw]" style={{ opacity: amzIntroOpacity }}>
          <div className="max-w-4xl text-[#191919]">
            <span className="text-xs font-bold tracking-[0.22em] text-[#ff6846] uppercase">AMZ Creatives</span>
            <h3 className="mt-6 font-display text-[clamp(2.5rem,6vw,6.5rem)] font-bold leading-[0.94] tracking-[-0.05em] text-balance">
              Creatividad diseñada para destacar dentro de Amazon.
            </h3>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-black/60 md:text-xl">
              Unimos estrategia, diseño y producción para mejorar cómo se percibe, se entiende y se compra un producto.
            </p>
          </div>
        </motion.div>

        {CAPABILITIES.map((capability, index) => {
          const starts = [0.39, 0.47, 0.55, 0.63]
          const start = starts[index]
          return <CapabilityPanel key={capability.number} capability={capability} progress={progress} range={[start, start + 0.025, start + 0.065, start + 0.095]} />
        })}

        <motion.div className="pointer-events-none absolute inset-0 z-40 flex items-center px-5 md:px-[8vw]" style={{ opacity: outcomesOpacity }}>
          <div className="mx-auto grid w-full max-w-6xl gap-10 text-[#191919] md:grid-cols-2 md:items-end">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#ff6846] uppercase">Qué hemos conseguido</span>
              <h3 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">Creatividad que mejora cómo se presenta una marca.</h3>
              <p className="mt-6 text-sm leading-relaxed text-black/60 md:text-base">Hemos ayudado a marcas de diferentes sectores a explicar mejor sus productos, elevar su percepción visual y construir una presencia más competitiva dentro de Amazon.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {OUTCOMES.map((outcome) => <div key={outcome} className="flex items-center gap-3 border-t border-black/15 py-4 text-sm font-semibold"><Sparkles className="size-4 shrink-0 text-[#ff6846]" aria-hidden="true" />{outcome}</div>)}
            </div>
          </div>
        </motion.div>

        <motion.div className="absolute inset-0 z-50 flex items-center px-5 md:px-[8vw]" style={{ opacity: returnOpacity, y: returnY }}>
          <div className="max-w-3xl">
            <span className="text-xs font-semibold tracking-widest text-electric uppercase">Un mismo criterio</span>
            <h3 className="mt-5 font-display text-[clamp(2.5rem,6vw,6rem)] font-bold leading-[0.98] tracking-tight text-balance">Estrategia y ejecución, conectadas.</h3>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-xl">CHRITERIO detecta qué necesita tu cuenta. AMZ Creatives lo convierte en una solución visual preparada para competir.</p>
            <Link href={CREATIVE_PROJECTS_URL} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Ver proyectos creativos <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
