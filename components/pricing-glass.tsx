'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { PRICING_TIERS, type TierType } from '@/lib/pricing-tiers'
import { withBasePath } from '@/lib/base-path'
import { CALENDLY_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

function Price({ tier }: { tier: TierType }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {tier.launchOffer && (
          <span className="rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] text-[#9db5ff] uppercase">
            Oferta de lanzamiento
          </span>
        )}
      </div>

      <div className="mt-2.5 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="font-display text-4xl font-bold tracking-[-0.055em] text-white md:text-5xl">
          {tier.price}
        </span>
        <span className="pb-1.5 text-sm text-white/50">/mes</span>
        {tier.originalPrice && (
          <span className="pb-1.5 text-sm text-white/35 line-through">
            {tier.originalPrice} /mes
          </span>
        )}
      </div>

      <p className="mt-2.5 max-w-lg text-[11px] leading-relaxed text-white/50">
        {tier.priceNote}
      </p>
      <p className="mt-1.5 text-[10px] font-medium tracking-wide text-white/38">
        {tier.commitmentNote}
      </p>
    </div>
  )
}

function PricingTierCard({ tier }: { tier: TierType }) {
  const reducedMotion = useReducedMotion()

  return (
    <article
      className={cn(
        'relative flex h-full flex-col rounded-[1.75rem] border bg-[#07152c]/78 p-5 shadow-[0_28px_90px_-48px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-6',
        tier.isPopular
          ? 'border-electric/55 pt-8 shadow-[0_32px_100px_-42px_rgba(46,91,255,0.65)] md:pt-8 lg:-translate-y-2'
          : 'border-white/14',
      )}
    >
      {tier.isPopular && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.75rem]"
          >
            <motion.div
              className="absolute -inset-[80%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(167,186,255,0.15)_326deg,rgba(199,211,255,0.95)_345deg,rgba(92,126,255,0.2)_358deg,transparent_360deg)]"
              animate={reducedMotion ? undefined : { rotate: 360 }}
              transition={
                reducedMotion
                  ? undefined
                  : { duration: 7, repeat: Infinity, ease: 'linear' }
              }
            />
            <div className="absolute inset-[1px] rounded-[calc(1.75rem-1px)] bg-[#07152c]" />
          </div>
          <span className="absolute top-0 left-1/2 z-10 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-electric/45 bg-[#0a1d43] px-3.5 py-1.5 text-[9px] font-bold tracking-[0.16em] text-[#c7d2ff] uppercase shadow-[0_8px_22px_-10px_rgba(46,91,255,0.85)]">
            <Sparkles className="size-3" aria-hidden="true" />
            {tier.popularLabel}
          </span>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-[-4rem] size-64 rounded-full bg-electric/12 blur-3xl"
          />
        </>
      )}

      <div className="relative">
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            {tier.name}
          </h2>
        </div>
        {tier.popularNote && (
          <p className="mt-2 text-[11px] font-medium text-[#9db5ff]">
            {tier.popularNote}
          </p>
        )}
        <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/60">
          {tier.description}
        </p>
      </div>

      <div className="relative mt-5 border-y border-white/10 py-4">
        <Price tier={tier} />
      </div>

      <ul className="relative mt-5 flex flex-col gap-2.5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <span
              className={cn(
                'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border',
                tier.isPopular
                  ? 'border-electric/35 bg-electric/12 text-[#aabaff]'
                  : 'border-white/15 bg-white/[0.055] text-white/65',
              )}
            >
              <Check className="size-3" strokeWidth={2.2} aria-hidden="true" />
            </span>
            <span className="text-xs leading-relaxed text-white/68">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {tier.executionNote && (
        <p className="relative mt-4 rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-2.5 text-[11px] leading-relaxed text-white/45">
          {tier.executionNote}
        </p>
      )}

      <div className="flex-1" />
      <Link
        href={tier.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'relative mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152c] focus-visible:outline-none',
          tier.isPopular
            ? 'bg-electric text-white shadow-[0_12px_34px_-12px_rgba(46,91,255,0.8)] hover:bg-[#416cff]'
            : 'border border-white/20 bg-white/[0.055] text-white hover:border-white/40 hover:bg-white/10',
        )}
      >
        {tier.ctaLabel}
      </Link>
    </article>
  )
}

const TOTAL_MANAGEMENT_FEATURES = [
  'Todo lo incluido en Gestión integral',
  'Dirección estratégica de la cuenta',
  'Gestión directa de Seller Central',
  'Gestión y optimización PPC',
  'Optimización y creación de listings',
  'Fotografía de producto',
  'Infografías y contenido visual',
  'Contenido A+',
  'Vídeos de producto',
  'Renders y piezas creativas',
  'Lanzamientos y expansión a nuevos marketplaces',
  'Coordinación entre CHRITERIO y AMZ Creatives',
  'App privada y seguimiento continuo',
]

const TOTAL_MANAGEMENT_BRANDS = [
  {
    name: 'Almar Baby',
    src: '/brands/processed/almar-baby.png',
    width: 700,
    height: 448,
  },
  {
    name: 'Funny Baby',
    src: '/brands/processed/funny-baby.png',
    width: 674,
    height: 604,
  },
  {
    name: 'Maternika',
    src: '/brands/processed/maternika.png',
    width: 700,
    height: 102,
  },
  {
    name: 'Kook Time',
    src: '/brands/processed/kook-time.png',
    width: 700,
    height: 147,
  },
  {
    name: 'Pure4Home',
    src: '/brands/processed/pure4home.png',
    width: 700,
    height: 149,
  },
  {
    name: 'Pinisi Home',
    src: '/brands/processed/pinisi.png',
    width: 500,
    height: 248,
  },
]

function TotalManagementCard() {
  return (
    <article className="relative mt-14 overflow-hidden rounded-[2rem] border border-[#7895ff]/35 bg-[#07152c]/88 shadow-[0_35px_120px_-50px_rgba(46,91,255,0.8)] backdrop-blur-xl lg:mt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-[#9db5ff]/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/3 size-[30rem] rounded-full bg-electric/10 blur-3xl"
      />

      <div className="relative grid lg:grid-cols-[0.42fr_0.58fr]">
        <div className="flex flex-col p-6 md:p-9 lg:p-10">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#9db5ff] uppercase">
            Servicio más completo
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-[-0.035em] text-white md:text-4xl">
            Gestión total 360º
          </h2>
          <p className="mt-3 text-sm font-medium text-white/78">
            Estrategia, gestión y creatividad en un mismo equipo.
          </p>
          <p className="mt-5 max-w-xl text-xs leading-relaxed text-white/52 md:text-sm">
            Para marcas que quieren delegar por completo su crecimiento en
            Amazon y trabajar con un único equipo para estrategia, ejecución y
            producción creativa.
          </p>

          <div className="mt-7 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-4 border-y border-white/10 py-5">
            <Image
              src={withBasePath('/chriterio-logo-white.png')}
              alt="Chriterio"
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

          <div className="mt-7">
            <p className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Propuesta personalizada
            </p>
            <p className="mt-3 text-[11px] leading-relaxed text-white/45">
              El alcance se define según catálogo, marketplaces, inversión
              publicitaria y necesidades creativas.
            </p>
            <p className="mt-2 text-[10px] font-medium tracking-wide text-white/38">
              Permanencia mínima de 3 meses
            </p>
          </div>

          <div className="flex-1" />
          <Link
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-navy transition-transform duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152c] focus-visible:outline-none"
          >
            Solicitar propuesta 360º
          </Link>
        </div>

        <div className="border-t border-white/10 p-6 md:p-9 lg:border-t-0 lg:border-l lg:p-10">
          <h3 className="text-xs font-bold tracking-[0.16em] text-white/75 uppercase">
            Todo lo que incluye
          </h3>
          <ul className="mt-6 grid gap-x-7 gap-y-3 sm:grid-cols-2">
            {TOTAL_MANAGEMENT_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-electric/35 bg-electric/12 text-[#aabaff]">
                  <Check className="size-2.5" strokeWidth={2.2} aria-hidden="true" />
                </span>
                <span className="text-[11px] leading-relaxed text-white/62">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-white/42 uppercase">
              Experiencia de nuestro equipo con marcas como
            </p>
            <div className="mt-5 grid grid-cols-3 items-center gap-x-5 gap-y-5 sm:grid-cols-6">
              {TOTAL_MANAGEMENT_BRANDS.map((brand) => (
                <div
                  key={brand.name}
                  className="flex h-9 min-w-0 items-center justify-center"
                >
                  <Image
                    src={withBasePath(brand.src)}
                    alt={brand.name}
                    width={brand.width}
                    height={brand.height}
                    className="max-h-8 w-auto max-w-full object-contain brightness-0 invert opacity-68 transition-opacity duration-200 hover:opacity-90"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function PricingGlass() {
  return (
    <div>
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/12 bg-[#07152c]/70 px-4 py-2 text-[10px] font-semibold tracking-[0.12em] text-white/48 uppercase backdrop-blur-xl">
        <Check className="size-3 text-[#8fa8ff]" aria-hidden="true" />
        Permanencia mínima de 3 meses
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-7">
        {PRICING_TIERS.map((tier) => (
          <PricingTierCard key={tier.id} tier={tier} />
        ))}
      </div>

      <div className="mx-auto mt-7 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-3.5 text-center text-xs leading-relaxed text-white/48 backdrop-blur-md">
        La app privada está incluida en todos los servicios. Fotografía, diseño,
        vídeo, renders y producción de contenido se presupuestan por separado.
      </div>

      <TotalManagementCard />
    </div>
  )
}
