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
import { track } from '@vercel/analytics'
import { useEffect, useRef, useState } from 'react'
import { BrandScroller } from '@/components/ui/brand-scroller'
import { withBasePath } from '@/lib/base-path'
import {
  AMZ_CREATIVE_PROJECTS,
  type AmzCreativeProject,
} from '@/lib/amz-creative-projects'

const SHOWREEL_SRC = withBasePath('/amz-creatives/showreel.mp4')
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
    title: 'Tu producto tiene segundos para convencer.',
    description:
      'Creamos imágenes principales, infografías, comparativas y contenido A+ que captan la atención, explican el valor del producto y resuelven las dudas clave antes de la compra.',
    icon: Camera,
    accent: '#ff6846',
  },
  {
    number: '02',
    eyebrow: 'Vídeos que venden',
    title: 'Hay ventajas que una imagen no puede demostrar.',
    description:
      'Creamos vídeos de producto, demostraciones y anuncios que enseñan cómo funciona, resuelven dudas y ayudan al comprador a imaginar el producto en su día a día.',
    icon: Video,
    accent: '#ff9d78',
  },
  {
    number: '03',
    eyebrow: 'Producción real y modelos',
    title: 'El comprador no solo quiere verlo. Quiere imaginarlo en su vida.',
    description:
      'Creamos fotografías lifestyle y producciones con modelos que muestran cómo se usa, qué escala tiene y cómo encaja el producto en situaciones reales.',
    icon: Layers3,
    accent: '#ff6846',
  },
  {
    number: '04',
    eyebrow: 'IA, 3D y producción híbrida',
    title: 'La técnica cambia. El objetivo no: hacer que el producto convenza.',
    description:
      'Combinamos fotografía real, modelos, vídeo, render 3D e inteligencia artificial para crear la solución visual que mejor explique y eleve cada producto, sin perder coherencia ni realismo.',
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

const AMAZON_MARKETPLACE_HOSTS = new Set([
  'amazon.es',
  'amazon.com',
  'amazon.fr',
  'amazon.de',
  'amazon.it',
  'amazon.co.uk',
  'amazon.ca',
  'amazon.com.au',
  'amazon.co.jp',
  'amazon.com.be',
  'amazon.com.br',
  'amazon.com.mx',
  'amazon.ae',
  'amazon.in',
  'amazon.nl',
  'amazon.pl',
  'amazon.sa',
  'amazon.se',
  'amazon.sg',
])

function getValidAmazonUrl(url: string | null) {
  if (!url) return null

  try {
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname.toLowerCase().replace(/^www\./, '')
    return parsedUrl.protocol === 'https:' && AMAZON_MARKETPLACE_HOSTS.has(hostname)
      ? parsedUrl
      : null
  } catch {
    return null
  }
}

function handleProjectClick(project: AmzCreativeProject, marketplace: string) {
  if (process.env.NODE_ENV !== 'production' || !project.amazonUrl) return

  track('amz_creative_project_click', {
    brand: project.brand,
    productName: project.productName ?? '',
    amazonUrl: project.amazonUrl,
    marketplace,
  })
}

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
  const scaleX = useTransform(progress, [0, 0.08, 0.82, 1], [
    isMobile ? 0.88 : 0.44,
    isMobile ? 0.88 : 0.44,
    1.04,
    1.08,
  ])
  const scaleY = useTransform(progress, [0, 0.08, 0.82, 1], [
    isMobile ? 0.52 : 0.68,
    isMobile ? 0.52 : 0.68,
    1.04,
    1.08,
  ])
  const borderRadius = useTransform(progress, [0.08, 0.82], [28, 0])
  const shade = useTransform(progress, [0, 0.55, 0.86], [0.5, 0.22, 0])
  const shadow = useTransform(progress, [0.08, 0.75], [0.65, 0])
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

function ReducedMotionPortal() {
  return (
    <section className="relative bg-[#020817] text-white" aria-labelledby="amz-portal-title">
      <div className="starfield relative px-5 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-semibold tracking-widest text-electric uppercase">
            Ejecución creativa
          </span>
          <h2 id="amz-portal-title" className="mt-4 max-w-3xl font-display text-4xl font-bold md:text-6xl">
            No nos quedamos en el diagnóstico. También construimos la parte visual.
          </h2>
        </div>
      </div>
      <AmzEditorialContent />
    </section>
  )
}

function AmzProjectsGrid() {
  const brands = AMZ_CREATIVE_PROJECTS.map((project) => {
    const amazonUrl = getValidAmazonUrl(project.amazonUrl)

    return {
      name: project.brand,
      logo: project.logoSrc,
      width: project.logoWidth,
      height: project.logoHeight,
      href: amazonUrl?.href,
      ariaLabel: project.ariaLabel,
    }
  })

  return (
    <section
      aria-labelledby="amz-projects-heading"
      className="mx-auto max-w-7xl px-5 pb-28 md:px-8 md:pb-40"
    >
      <div className="max-w-3xl">
        <span className="text-xs font-bold tracking-[0.2em] text-[#ff6846] uppercase">
          Marcas y proyectos
        </span>
        <h3
          id="amz-projects-heading"
          className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl"
        >
          No hablamos solo de creatividad. Puedes verla en Amazon.
        </h3>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-black/60 md:text-lg">
          Explora algunos de los productos en los que hemos trabajado y comprueba
          cómo se aplica la estrategia visual dentro del listing real.
        </p>
      </div>

      <div className="relative mt-12 -mx-5 overflow-hidden md:-mx-8">
        <BrandScroller
          brands={brands}
          duration={38}
          variant="amz"
          onBrandClick={(brand) => {
            const project = AMZ_CREATIVE_PROJECTS.find(
              (candidate) => candidate.brand === brand.name
            )
            if (project) {
              handleProjectClick(project, project.marketplace ?? 'Amazon ES')
            }
          }}
        />
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <p className="text-xs text-black/45">
          Pulsa sobre una marca para ver el producto en Amazon.
        </p>
        <Link
          href={CREATIVE_PROJECTS_URL}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#191919] transition-colors hover:text-[#ff6846] focus-visible:ring-2 focus-visible:ring-[#ff6846] focus-visible:ring-offset-4 focus-visible:ring-offset-[#f3f0eb] focus-visible:outline-none"
        >
          Ver más proyectos creativos
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

function AmzEditorialContent() {
  return (
    <div className="relative z-20 bg-[#f3f0eb] text-[#191919]">
      <div className="mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
        <div className="flex items-center justify-between gap-8">
          <span className="text-xs font-bold tracking-[0.22em] text-[#ff6846] uppercase">AMZ Creatives</span>
          <Image src={withBasePath('/amz-creatives-logo.png')} alt="AMZ Creatives" width={4773} height={713} className="h-6 w-auto md:h-8" />
        </div>
        <h3 className="mt-12 max-w-5xl font-display text-[clamp(1.95rem,7vw,7rem)] font-bold leading-[0.96] tracking-[-0.055em]">
          <span className="block whitespace-nowrap">En Amazon,</span>
          <span className="block whitespace-nowrap">lo que no se entiende,</span>
          <span className="block whitespace-nowrap text-[#ff6846]">no se elige.</span>
        </h3>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-black/60 md:text-xl">
          Convertimos las ventajas de tu producto en imágenes, vídeos y contenido de marca que atraen el clic, explican su valor y generan confianza para comprar.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 md:px-8 md:pb-40">
        {CAPABILITIES.map((capability, index) => {
          const Icon = capability.icon
          return (
            <article key={capability.number} className="grid gap-8 border-t border-black/15 py-16 md:grid-cols-2 md:items-center md:gap-20 md:py-24">
              <div className={index % 2 ? 'md:order-2' : undefined}>
                <div className="flex items-center gap-4">
                  <span className="font-display text-5xl font-bold text-[#ff6846] md:text-7xl">{capability.number}</span>
                  <span className="text-xs font-bold tracking-[0.18em] uppercase">{capability.eyebrow}</span>
                </div>
                <h4 className="mt-7 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">{capability.title}</h4>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-black/60 md:text-lg">{capability.description}</p>
              </div>
              <div className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#1d1d1d] ${index % 2 ? 'md:order-1' : ''}`}>
                <div className="absolute inset-0 opacity-90" style={{ background: `radial-gradient(circle at 65% 35%, ${capability.accent}, transparent 34%), linear-gradient(145deg, #181818, #3a302c)` }} />
                <span className="absolute -right-2 -bottom-12 font-display text-[12rem] font-bold leading-none tracking-tighter text-white/10 md:text-[15rem]">{capability.number}</span>
                <div className="absolute top-7 left-7 flex size-14 items-center justify-center rounded-full bg-white text-[#171717] md:top-8 md:left-8 md:size-16">
                  <Icon className="size-6 md:size-7" aria-hidden="true" />
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <AmzProjectsGrid />

      <div className="bg-[#ff6846] px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-end">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Qué hemos conseguido</span>
            <h3 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">Creatividad que mejora cómo se presenta una marca.</h3>
            <p className="mt-6 text-sm leading-relaxed text-black/65 md:text-base">Hemos ayudado a marcas de diferentes sectores a explicar mejor sus productos, elevar su percepción visual y construir una presencia más competitiva dentro de Amazon.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {OUTCOMES.map((outcome) => <div key={outcome} className="flex items-center gap-3 border-t border-black/25 py-4 text-sm font-semibold"><Sparkles className="size-4 shrink-0" aria-hidden="true" />{outcome}</div>)}
          </div>
        </div>
      </div>

      <div className="starfield relative bg-[#020817] px-5 py-28 text-white md:px-8 md:py-36">
        <div className="mx-auto max-w-6xl">
          <span className="text-xs font-semibold tracking-widest text-electric uppercase">Un mismo criterio</span>
          <h3 className="mt-5 max-w-4xl font-display text-[clamp(2.75rem,6vw,6rem)] font-bold leading-[0.98] tracking-tight text-balance">Estrategia y ejecución, conectadas.</h3>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-xl">CHRITERIO detecta qué necesita tu cuenta. AMZ Creatives lo convierte en una solución visual preparada para competir.</p>
          <Link href={CREATIVE_PROJECTS_URL} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
            Ver proyectos creativos <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export function AmzCreativesPortal() {
  const entryRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const isMobile = useMobileViewport()
  const { scrollYProgress } = useScroll({
    target: entryRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.25 })

  const chriterioIntroOpacity = useTransform(progress, [0, 0.2, 0.72], [1, 1, 0])
  const headingLeftX = useTransform(progress, [0.12, 0.75], [0, isMobile ? -110 : -440])
  const headingRightX = useTransform(progress, [0.12, 0.75], [0, isMobile ? 110 : 440])
  const introDetailsOpacity = useTransform(progress, [0, 0.18, 0.55], [1, 1, 0])
  const introDetailsY = useTransform(progress, [0.15, 0.58], [0, 35])
  const spaceOpacity = useTransform(progress, [0.35, 0.9], [1, 0])

  if (reducedMotion) return <ReducedMotionPortal />

  return (
    <section className="relative bg-[#020817] text-white" aria-labelledby="amz-portal-title">
      <div ref={entryRef} className="relative h-[190vh] md:h-[220vh]">
        <div className="sticky top-0 h-[100dvh] min-h-[620px] overflow-hidden">
        <motion.div className="starfield absolute inset-0 bg-[#020817]" style={{ opacity: spaceOpacity }} aria-hidden="true" />
        <ExpandingMedia progress={progress} isMobile={isMobile} />

        <motion.div className="pointer-events-none absolute inset-0 z-30" style={{ opacity: chriterioIntroOpacity }}>
          <span className="absolute top-[12%] left-1/2 -translate-x-1/2 text-xs font-semibold tracking-widest text-electric uppercase md:top-[13%]">
            Ejecución creativa
          </span>
          <h2 id="amz-portal-title" className="contents font-display font-bold tracking-[-0.04em]">
            <motion.span
              className="absolute top-[22%] left-5 w-[80vw] text-[clamp(2.15rem,5vw,5.25rem)] leading-[0.96] text-balance md:top-[31%] md:left-[3vw] md:w-[39vw]"
              style={{ x: headingLeftX }}
            >
              No nos quedamos en el diagnóstico.
            </motion.span>
            <motion.span
              className="absolute right-5 bottom-[22%] w-[80vw] text-right text-[clamp(2.15rem,5vw,5.25rem)] leading-[0.96] text-balance md:right-[3vw] md:bottom-[29%] md:w-[41vw]"
              style={{ x: headingRightX }}
            >
              También construimos la parte visual.
            </motion.span>
          </h2>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute right-5 bottom-6 z-30 md:right-[6vw] md:bottom-8"
          style={{ opacity: introDetailsOpacity, y: introDetailsY }}
        >
          <span className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold tracking-wide text-white/55 uppercase">
            <ArrowDown className="size-4" aria-hidden="true" />
            Desliza para entrar en AMZ Creatives
          </span>
        </motion.div>

        </div>
      </div>
      <AmzEditorialContent />
    </section>
  )
}
