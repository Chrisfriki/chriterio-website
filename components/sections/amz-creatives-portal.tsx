'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowUpRight,
  Box,
  Camera,
  Check,
  GripVertical,
  Layers3,
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
import {
  CreativePortfolioCarousel,
  type CreativeSlide,
} from '@/components/ui/creative-portfolio-carousel'
import { withBasePath } from '@/lib/base-path'
import {
  AMZ_CREATIVE_PROJECTS,
  type AmzCreativeProject,
} from '@/lib/amz-creative-projects'

const SHOWREEL_SRC = withBasePath('/amz-creatives/showreel.mp4')
const VIDEOS_THAT_SELL_SRC = withBasePath(
  '/amz-creatives/videos-that-sell/showcase.mp4'
)
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

const CREATIVE_BENEFITS = [
  {
    number: '01',
    title: 'CAPTA EL CLIC',
    description: 'Destaca desde la primera imagen sin perder claridad.',
  },
  {
    number: '02',
    title: 'EXPLICA EL VALOR',
    description:
      'Convierte características en beneficios fáciles de entender.',
  },
  {
    number: '03',
    title: 'REDUCE LAS DUDAS',
    description: 'Responde las objeciones que pueden frenar la compra.',
  },
  {
    number: '04',
    title: 'ELEVA LA MARCA',
    description: 'Transmite más coherencia, confianza y calidad.',
  },
]

const CREATIVE_CHANGES = [
  'Jerarquía visual más clara',
  'Beneficios más visibles',
  'Mejor contexto de uso',
  'Marca más coherente',
]

const BEFORE_IMAGE_SRC = '/amz-creatives/before-after/before.webp'
const AFTER_IMAGE_SRC = '/amz-creatives/before-after/after.webp'

const IMAGES_THAT_CONVERT: CreativeSlide[] = Array.from(
  { length: 11 },
  (_, index) => ({
    id: `creative-${String(index + 1).padStart(2, '0')}`,
    src: `/amz-creatives/images-that-convert/${index + 1}.webp`,
    alt: `Creatividad para Amazon desarrollada por AMZ Creatives ${index + 1} de 11`,
    type: index === 0 ? 'main-image' : 'infographic',
  })
)

const REAL_PRODUCTION_AND_MODELS: CreativeSlide[] = [
  { id: 'production-01', src: '/amz-creatives/real-production-and-models/dog-behind-gate.webp', alt: 'Perro detrás de una barrera de seguridad', type: 'lifestyle' },
  { id: 'production-02', src: '/amz-creatives/real-production-and-models/baby-in-bath.webp', alt: 'Bebé utilizando un cojín de bañera', type: 'lifestyle' },
  { id: 'production-03', src: '/amz-creatives/real-production-and-models/padel-training.webp', alt: 'Jugador entrenando pádel con una pelota elástica', type: 'lifestyle' },
  { id: 'production-04', src: '/amz-creatives/real-production-and-models/tennis-ball-closeup.webp', alt: 'Detalle de una pelota de tenis sobre la pista', type: 'lifestyle' },
  { id: 'production-05', src: '/amz-creatives/real-production-and-models/baby-on-changing-table.webp', alt: 'Bebé sobre un cambiador Toral', type: 'lifestyle' },
  { id: 'production-06', src: '/amz-creatives/real-production-and-models/embroidery-instructions.webp', alt: 'Modelo siguiendo las instrucciones de un kit de bordado', type: 'lifestyle' },
  { id: 'production-07', src: '/amz-creatives/real-production-and-models/embroidery-kit.webp', alt: 'Presentación completa de un kit de bordado', type: 'lifestyle' },
  { id: 'production-08', src: '/amz-creatives/real-production-and-models/matcha-kit-bright.webp', alt: 'Kit de té matcha en una escena luminosa', type: 'lifestyle' },
  { id: 'production-09', src: '/amz-creatives/real-production-and-models/matcha-kit-warm.webp', alt: 'Kit de té matcha en una escena cálida', type: 'lifestyle' },
  { id: 'production-10', src: '/amz-creatives/real-production-and-models/dog-using-bed-ramp.webp', alt: 'Perro utilizando una rampa para subir a la cama', type: 'lifestyle' },
  { id: 'production-11', src: '/amz-creatives/real-production-and-models/car-headrest-teen.webp', alt: 'Adolescente utilizando un reposacabezas en el coche', type: 'lifestyle' },
  { id: 'production-12', src: '/amz-creatives/real-production-and-models/car-headrest-child.webp', alt: 'Niño descansando con un reposacabezas en el coche', type: 'lifestyle' },
  { id: 'production-13', src: '/amz-creatives/real-production-and-models/senior-pedal-exerciser.webp', alt: 'Persona mayor utilizando un ejercitador de pedales', type: 'lifestyle' },
  { id: 'production-14', src: '/amz-creatives/real-production-and-models/dashboard-cleaner.webp', alt: 'Aplicación de un limpiador sobre el salpicadero del coche', type: 'lifestyle' },
  { id: 'production-15', src: '/amz-creatives/real-production-and-models/pop-up-tent.webp', alt: 'Montaje de una tienda de campaña desplegable', type: 'lifestyle' },
  { id: 'production-16', src: '/amz-creatives/real-production-and-models/kitchen-salt-cellar.webp', alt: 'Salero con tapa de bambú sobre una encimera', type: 'lifestyle' },
  { id: 'production-17', src: '/amz-creatives/real-production-and-models/pool-paint-bucket.webp', alt: 'Modelo transportando un cubo de pintura para piscinas', type: 'lifestyle' },
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

function VideosThatSellShowcase() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasVideoError, setHasVideoError] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video || hasVideoError || prefersReducedMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {
            // Some browsers may still require an explicit user gesture.
          })
        } else {
          video.pause()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [hasVideoError, prefersReducedMotion])

  if (hasVideoError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_65%_35%,#ff9d78,transparent_34%),linear-gradient(145deg,#181818,#3a302c)]">
        <div className="flex size-16 items-center justify-center rounded-full bg-white text-[#171717]">
          <Video className="size-7" aria-hidden="true" />
        </div>
      </div>
    )
  }

  return (
    <video
      ref={videoRef}
      src={VIDEOS_THAT_SELL_SRC}
      className="absolute inset-0 size-full bg-black object-cover"
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Vídeo de producto desarrollado por AMZ Creatives"
      onError={() => setHasVideoError(true)}
    />
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

function StrategyExecutionVisual({
  progress,
  prefersReducedMotion,
}: {
  progress: MotionValue<number>
  prefersReducedMotion: boolean
}) {
  const compositionOpacity = useTransform(progress, [0.62, 0.76], [0, 1])
  const compositionY = useTransform(progress, [0.62, 0.76], [40, 0])
  const strategyOpacity = useTransform(progress, [0.63, 0.72], [0, 1])
  const strategyY = useTransform(progress, [0.63, 0.72], [24, 0])
  const executionOpacity = useTransform(progress, [0.68, 0.78], [0, 1])
  const executionY = useTransform(progress, [0.68, 0.78], [24, 0])
  const resultOpacity = useTransform(progress, [0.72, 0.83], [0, 1])
  const resultY = useTransform(progress, [0.72, 0.83], [24, 0])
  const resultScale = useTransform(progress, [0.72, 0.83], [0.98, 1])
  const resultGlowOpacity = useTransform(progress, [0.74, 0.86], [0, 1])
  const activeBadgeOpacity = useTransform(progress, [0.78, 0.86], [0, 1])
  const activeBadgeY = useTransform(progress, [0.78, 0.86], [8, 0])
  const connectionScale = useTransform(progress, [0.65, 0.81], [0, 1])
  const lightY = useTransform(progress, [0.66, 0.81], [0, 72])
  const lightOpacity = useTransform(
    progress,
    [0.65, 0.68, 0.79, 0.82],
    [0, 1, 1, 0]
  )

  const cardClassName =
    'relative overflow-hidden rounded-[1.5rem] border border-[#8da6c7]/20 bg-[#07172f]/75 px-5 py-5 shadow-[0_24px_70px_-35px_rgba(70,132,218,0.45)] backdrop-blur-md sm:px-6 sm:py-6'

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[700px]"
      style={
        prefersReducedMotion
          ? undefined
          : {
              opacity: compositionOpacity,
              y: compositionY,
              translateZ: 0,
            }
      }
      aria-label="Conexión entre la estrategia de Chriterio y la ejecución de AMZ Creatives"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%_12%] bg-[radial-gradient(circle_at_center,rgba(72,133,218,0.14),transparent_68%)]"
      />

      <motion.div
        className={cardClassName}
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: strategyOpacity, y: strategyY, translateZ: 0 }
        }
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent"
        />
        <div className="relative flex items-start justify-between gap-5">
          <div className="min-w-0">
            <Image
              src={withBasePath('/chriterio-logo-white.png')}
              alt="Chriterio"
              width={1433}
              height={249}
              className="h-auto max-h-6 w-full max-w-[190px] object-contain object-left sm:max-h-7 sm:max-w-[220px]"
            />
            <p className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm">
              Estrategia · Rentabilidad · Publicidad
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-electric/25 bg-electric/10 px-3 py-1.5 text-[9px] font-bold tracking-[0.18em] text-electric uppercase sm:text-[10px]">
            Diagnóstico
          </span>
        </div>
      </motion.div>

      <div className="relative mx-auto flex h-24 w-full items-center justify-center">
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/10" />
        <motion.div
          className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-electric/80 via-electric to-[#ff6846]/70"
          style={
            prefersReducedMotion ? undefined : { scaleY: connectionScale }
          }
        />
        {!prefersReducedMotion && (
          <motion.span
            aria-hidden="true"
            className="absolute top-2 left-1/2 size-2 -translate-x-1/2 rounded-full bg-electric shadow-[0_0_16px_4px_rgba(72,133,218,0.65)]"
            style={{ y: lightY, opacity: lightOpacity, translateZ: 0 }}
          />
        )}
        <span className="relative z-10 rounded-full border border-white/10 bg-[#06142b] px-4 py-2 text-[10px] font-semibold tracking-[0.14em] text-white/65 uppercase">
          Una misma dirección
        </span>
      </div>

      <motion.div
        className={`${cardClassName} border-[#ff6846]/25`}
        style={
          prefersReducedMotion
            ? undefined
            : { opacity: executionOpacity, y: executionY, translateZ: 0 }
        }
      >
        <div
          aria-hidden="true"
          className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#ff6846]/80 to-transparent"
        />
        <div className="relative flex items-start justify-between gap-5">
          <div className="min-w-0">
            <Image
              src={withBasePath('/amz-creatives-logo.png')}
              alt="AMZ Creatives"
              width={4773}
              height={713}
              className="h-auto max-h-6 w-full max-w-[210px] object-contain object-left brightness-0 invert sm:max-h-7 sm:max-w-[240px]"
            />
            <p className="mt-2 text-xs leading-relaxed text-white/55 sm:text-sm">
              Fotografía · Diseño · Contenido
            </p>
          </div>
          <span className="shrink-0 rounded-full border border-[#ff6846]/30 bg-[#ff6846]/10 px-3 py-1.5 text-[9px] font-bold tracking-[0.18em] text-[#ff8a70] uppercase sm:text-[10px]">
            Ejecución
          </span>
        </div>
      </motion.div>

      <div
        aria-hidden="true"
        className="mx-auto h-10 w-px bg-gradient-to-b from-[#ff6846]/55 via-[#76c893]/50 to-[#76c893]/80"
      />

      <motion.div
        className="relative overflow-hidden rounded-[1.5rem] border border-[#76c893]/40 bg-[#061c18]/85 px-5 py-7 shadow-[0_24px_75px_-32px_rgba(65,184,131,0.55)] backdrop-blur-md sm:px-7 sm:py-8"
        style={
          prefersReducedMotion
            ? undefined
            : {
                opacity: resultOpacity,
                y: resultY,
                scale: resultScale,
                translateZ: 0,
              }
        }
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(118,200,147,0.16),transparent_42%)]"
          style={
            prefersReducedMotion ? undefined : { opacity: resultGlowOpacity }
          }
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#8addaa]/90 to-transparent"
        />

        <div className="relative flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="max-w-md text-left text-sm font-bold tracking-[0.14em] text-white uppercase sm:text-base">
            Cuenta preparada para competir
          </p>
          <motion.span
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#8addaa]/35 bg-[#76c893]/12 px-3 py-1.5 text-[9px] font-bold tracking-[0.16em] text-[#a5e6ba] uppercase sm:text-[10px]"
            style={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: activeBadgeOpacity,
                    y: activeBadgeY,
                    translateZ: 0,
                  }
            }
          >
            <Check className="size-3" strokeWidth={2} aria-hidden="true" />
            Activada
          </motion.span>
        </div>

        <div className="relative mt-7 grid grid-cols-2 items-center gap-x-5 gap-y-5 border-y border-[#a5e6ba]/10 py-6 sm:grid-cols-5 sm:gap-x-4 sm:gap-y-6">
          {AMZ_CREATIVE_PROJECTS.map((brand) => (
            <div
              key={brand.id}
              className="flex h-8 min-w-0 items-center justify-center"
            >
              <Image
                src={withBasePath(brand.logoSrc)}
                alt={brand.brand}
                width={brand.logoWidth}
                height={brand.logoHeight}
                className="max-h-7 w-auto max-w-full object-contain brightness-0 invert opacity-75 transition-[opacity,filter] duration-300 hover:opacity-100 hover:drop-shadow-[0_0_8px_rgba(165,230,186,0.22)]"
              />
            </div>
          ))}
        </div>

        <div className="relative mt-5 flex flex-wrap gap-2">
          {['Listing', 'A+', 'PPC', 'Vídeo'].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#8addaa]/20 bg-[#76c893]/8 px-3 py-1.5 text-[9px] font-semibold tracking-[0.13em] text-[#b8d8c2] uppercase"
            >
              <Check className="size-2.5 text-[#8addaa]" strokeWidth={2} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function BeforeAfterComparison() {
  const [position, setPosition] = useState(50)
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useMobileViewport()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const mediaScale = useTransform(
    scrollYProgress,
    [0.6, 1],
    [1, isMobile ? 0.95 : 0.91]
  )
  const mediaY = useTransform(
    scrollYProgress,
    [0.6, 1],
    [0, isMobile ? -12 : -28]
  )
  const mediaRadius = useTransform(
    scrollYProgress,
    [0.6, 1],
    [isMobile ? 24 : 32, isMobile ? 32 : 48]
  )
  const mediaOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0.94])
  const darkEyebrowOpacity = useTransform(
    scrollYProgress,
    [0.58, 0.7],
    [0, 1]
  )
  const darkEyebrowY = useTransform(scrollYProgress, [0.58, 0.7], [40, 0])
  const darkContentOpacity = useTransform(
    scrollYProgress,
    [0.62, 0.76],
    [0, 1]
  )
  const darkContentY = useTransform(scrollYProgress, [0.62, 0.76], [40, 0])

  return (
    <div className="relative overflow-x-clip bg-[#ff6846]">
      <section
        ref={sectionRef}
        className="relative border-t border-black/10 px-5 pt-24 pb-14 md:px-8 md:pt-32 md:pb-18 lg:pb-22"
        aria-labelledby="amz-before-after-title"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-14 lg:gap-20">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase">
                ANTES Y DESPUÉS
              </span>
              <h3
                id="amz-before-after-title"
                className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl lg:text-6xl"
              >
                <span className="block">El mismo producto.</span>
                <span className="block">Una forma completamente distinta</span>
                <span className="block font-extrabold text-[#f3f0eb]">
                  de competir.
                </span>
              </h3>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-black/65 md:text-base">
                Desliza para comprobar cómo cambian la claridad, la percepción y la fuerza visual cuando cada elemento responde a una estrategia.
              </p>
            </div>

            <motion.div
              className="relative z-30 aspect-square w-full origin-center overflow-hidden border border-black/20 bg-[#f3f0eb] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-black has-[:focus-visible]:ring-offset-4 has-[:focus-visible]:ring-offset-[#ff6846]"
              style={
                prefersReducedMotion
                  ? { borderRadius: isMobile ? 24 : 32 }
                  : {
                      scale: mediaScale,
                      y: mediaY,
                      borderRadius: mediaRadius,
                      opacity: mediaOpacity,
                      translateZ: 0,
                    }
              }
            >
              <Image
                src={withBasePath(AFTER_IMAGE_SRC)}
                alt="Creativo final desarrollado por AMZ Creatives"
                fill
                sizes="(max-width: 767px) calc(100vw - 2.5rem), 55vw"
                className="object-cover"
              />

              <div
                className="absolute inset-0"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                aria-hidden="true"
              >
                <Image
                  src={withBasePath(BEFORE_IMAGE_SRC)}
                  alt="Creativo anterior del producto"
                  fill
                  sizes="(max-width: 767px) calc(100vw - 2.5rem), 55vw"
                  className="object-cover"
                />
              </div>

              <span className="absolute top-4 left-4 rounded-full bg-[#191919] px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-white uppercase md:top-6 md:left-6">
                Antes
              </span>
              <span className="absolute top-4 right-4 rounded-full bg-[#ff6846] px-3 py-1.5 text-[10px] font-bold tracking-[0.18em] text-black uppercase md:top-6 md:right-6">
                Después
              </span>

              <div
                className="pointer-events-none absolute inset-y-0 z-10 w-px bg-black/70"
                style={{ left: `${position}%` }}
                aria-hidden="true"
              >
                <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/20 bg-white text-black shadow-sm md:size-12">
                  <GripVertical className="size-5" />
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={position}
                onChange={(event) => setPosition(Number(event.target.value))}
                aria-label="Comparar el creativo anterior con el creativo final de AMZ Creatives"
                className="absolute inset-0 z-20 size-full cursor-ew-resize opacity-0 [touch-action:pan-y]"
              />
            </motion.div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-bold tracking-[0.18em] uppercase">
              QUÉ HEMOS TRABAJADO
            </p>
            <div className="mt-4 grid border-t border-black/25 sm:grid-cols-2 lg:grid-cols-4">
              {CREATIVE_CHANGES.map((change) => (
                <div
                  key={change}
                  className="border-b border-black/20 py-5 text-sm font-semibold sm:px-5 sm:first:pl-0 lg:border-r lg:last:border-r-0"
                >
                  {change}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="starfield relative z-20 w-full bg-[#020817] px-5 py-24 text-white md:px-8 md:py-28 lg:py-32">
        <div className="mx-auto grid max-w-[1600px] items-center gap-16 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <motion.span
              className="block text-xs font-semibold tracking-widest text-electric uppercase"
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: darkEyebrowOpacity,
                      y: darkEyebrowY,
                      translateZ: 0,
                    }
              }
            >
              Un mismo criterio
            </motion.span>
            <motion.div
              style={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: darkContentOpacity,
                      y: darkContentY,
                      translateZ: 0,
                    }
              }
            >
              <h3 className="mt-5 max-w-[700px] font-display text-[clamp(2.75rem,6vw,6rem)] font-bold leading-[0.98] tracking-tight text-balance">Estrategia y ejecución, conectadas.</h3>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-xl">CHRITERIO detecta qué necesita tu cuenta. AMZ Creatives lo convierte en una solución visual preparada para competir.</p>
              <Link href={CREATIVE_PROJECTS_URL} className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                Ver proyectos creativos <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </div>

          <StrategyExecutionVisual
            progress={scrollYProgress}
            prefersReducedMotion={Boolean(prefersReducedMotion)}
          />
        </div>
      </div>
    </div>
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
            <article
              key={capability.number}
              className={`grid gap-8 border-t border-black/15 py-16 md:items-center md:py-24 ${
                index === 2
                  ? 'md:grid-cols-[0.78fr_1.22fr] md:gap-12'
                  : 'md:grid-cols-2 md:gap-20'
              }`}
            >
              <div className={index % 2 ? 'md:order-2' : undefined}>
                <div className="flex items-center gap-4">
                  <span className="font-display text-5xl font-bold text-[#ff6846] md:text-7xl">{capability.number}</span>
                  <span className="text-xs font-bold tracking-[0.18em] uppercase">{capability.eyebrow}</span>
                </div>
                <h4 className="mt-7 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">{capability.title}</h4>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-black/60 md:text-lg">{capability.description}</p>
              </div>
              <div className={`relative min-w-0 ${index === 0 || index === 2 ? '' : 'aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#1d1d1d]'} ${index % 2 ? 'md:order-1' : ''}`}>
                {index === 0 ? (
                  <CreativePortfolioCarousel slides={IMAGES_THAT_CONVERT} />
                ) : index === 1 ? (
                  <VideosThatSellShowcase />
                ) : index === 2 ? (
                  <CreativePortfolioCarousel
                    slides={REAL_PRODUCTION_AND_MODELS}
                    aspectRatio="landscape"
                    imageFit="cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 opacity-90" style={{ background: `radial-gradient(circle at 65% 35%, ${capability.accent}, transparent 34%), linear-gradient(145deg, #181818, #3a302c)` }} />
                    <span className="absolute -right-2 -bottom-12 font-display text-[12rem] font-bold leading-none tracking-tighter text-white/10 md:text-[15rem]">{capability.number}</span>
                    <div className="absolute top-7 left-7 flex size-14 items-center justify-center rounded-full bg-white text-[#171717] md:top-8 md:left-8 md:size-16">
                      <Icon className="size-6 md:size-7" aria-hidden="true" />
                    </div>
                  </>
                )}
              </div>
            </article>
          )
        })}
      </div>

      <AmzProjectsGrid />

      <section
        className="border-t border-black/10 bg-[#f3f0eb] px-5 py-24 md:px-8 md:py-32"
        aria-labelledby="amz-creative-change-title"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-[#ff6846] uppercase">
                LO QUE CAMBIA
              </span>
              <h3
                id="amz-creative-change-title"
                className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-6xl"
              >
                <span className="block">Un buen creativo</span>
                <span className="block">no solo mejora la imagen.</span>
                <span className="block text-[#ff6846]">Mejora la decisión.</span>
              </h3>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-black/65 md:text-base">
                Ordenamos la información, destacamos los beneficios y resolvemos objeciones para que el comprador entienda rápidamente por qué debería elegir tu producto.
              </p>
            </div>
            <div className="grid md:grid-cols-2">
              {CREATIVE_BENEFITS.map((benefit, index) => (
                <article
                  key={benefit.title}
                  className={`border-t border-black/20 py-7 md:py-8 ${
                    index % 2 === 0
                      ? 'md:pr-8'
                      : 'md:border-l md:pl-8'
                  }`}
                >
                  <span className="font-display text-5xl font-bold leading-none text-[#ff6846] md:text-6xl">
                    {benefit.number}
                  </span>
                  <h4 className="mt-5 text-sm font-bold tracking-[0.14em] text-[#191919] uppercase">
                    {benefit.title}
                  </h4>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-black/60">
                    {benefit.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BeforeAfterComparison />
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
