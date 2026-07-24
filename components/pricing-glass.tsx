'use client'

import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { useState } from 'react'
import {
  PRICING_TIERS,
  type PricingMode,
  type TierType,
} from '@/lib/pricing-tiers'
import { cn } from '@/lib/utils'

function Price({
  tier,
  mode,
}: {
  tier: TierType
  mode: PricingMode
}) {
  const reducedMotion = useReducedMotion()
  const isCommitment = mode === 'commitment'

  return (
    <div className="min-h-[9.75rem]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex min-h-6 flex-wrap items-center gap-2">
            {isCommitment && tier.launchOffer && (
              <span className="rounded-full border border-electric/30 bg-electric/10 px-2.5 py-1 text-[9px] font-bold tracking-[0.16em] text-[#9db5ff] uppercase">
                Oferta de lanzamiento
              </span>
            )}
          </div>

          <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="font-display text-5xl font-bold tracking-[-0.055em] text-white md:text-6xl">
              {isCommitment ? tier.priceCommitment : tier.priceAnnual}
            </span>
            <span className="pb-1.5 text-sm text-white/50">/mes</span>
            {isCommitment && tier.originalPriceCommitment && (
              <span className="pb-1.5 text-sm text-white/35 line-through">
                {tier.originalPriceCommitment} /mes
              </span>
            )}
          </div>

          <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/50">
            {isCommitment
              ? tier.commitmentPriceNote
              : tier.annualPriceNote}
          </p>
          {isCommitment && (
            <p className="mt-2 text-[11px] font-medium tracking-wide text-white/38">
              {tier.commitmentNote}
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function PricingTierCard({
  tier,
  mode,
}: {
  tier: TierType
  mode: PricingMode
}) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-[#07152c]/78 p-6 shadow-[0_28px_90px_-48px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-8',
        tier.isPopular
          ? 'border-electric/55 shadow-[0_32px_100px_-42px_rgba(46,91,255,0.65)] lg:-translate-y-3'
          : 'border-white/14',
      )}
    >
      {tier.isPopular && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#7895ff] to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-[-4rem] size-64 rounded-full bg-electric/12 blur-3xl"
          />
        </>
      )}

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
            {tier.name}
          </h2>
          {tier.isPopular && tier.popularLabel && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-electric/35 bg-electric/14 px-3 py-1.5 text-[9px] font-bold tracking-[0.16em] text-[#b8c7ff] uppercase">
              <Sparkles className="size-3" aria-hidden="true" />
              {tier.popularLabel}
            </span>
          )}
        </div>
        {tier.popularNote && (
          <p className="mt-3 text-xs font-medium text-[#9db5ff]">
            {tier.popularNote}
          </p>
        )}
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60">
          {tier.description}
        </p>
      </div>

      <div className="relative mt-7 border-y border-white/10 py-6">
        <Price tier={tier} mode={mode} />
      </div>

      <ul className="relative mt-7 flex flex-col gap-3.5">
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
            <span className="text-sm leading-relaxed text-white/68">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {tier.executionNote && (
        <p className="relative mt-6 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-xs leading-relaxed text-white/45">
          {tier.executionNote}
        </p>
      )}

      <div className="flex-1" />
      <Link
        href={tier.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'relative mt-8 inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152c] focus-visible:outline-none',
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

export function PricingGlass() {
  const [mode, setMode] = useState<PricingMode>('commitment')
  const reducedMotion = useReducedMotion()

  return (
    <div>
      <div className="mx-auto flex w-fit rounded-full border border-white/14 bg-[#07152c]/75 p-1.5 shadow-[0_18px_60px_-30px_rgba(46,91,255,0.55)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setMode('commitment')}
          aria-pressed={mode === 'commitment'}
          className={cn(
            'relative rounded-full px-4 py-2.5 text-xs font-semibold transition-colors sm:px-6 sm:text-sm',
            mode === 'commitment' ? 'text-white' : 'text-white/48 hover:text-white/75',
          )}
        >
          {mode === 'commitment' && (
            <motion.span
              layoutId="pricing-mode"
              className="absolute inset-0 rounded-full bg-electric"
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 420, damping: 34 }
              }
            />
          )}
          <span className="relative">Compromiso 3 meses</span>
        </button>
        <button
          type="button"
          onClick={() => setMode('annual')}
          aria-pressed={mode === 'annual'}
          className={cn(
            'relative rounded-full px-4 py-2.5 text-xs font-semibold transition-colors sm:px-6 sm:text-sm',
            mode === 'annual' ? 'text-white' : 'text-white/48 hover:text-white/75',
          )}
        >
          {mode === 'annual' && (
            <motion.span
              layoutId="pricing-mode"
              className="absolute inset-0 rounded-full bg-electric"
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 420, damping: 34 }
              }
            />
          )}
          <span className="relative flex flex-col items-center gap-0.5 sm:flex-row sm:gap-2">
            Plan anual
            <span
              className={cn(
                'text-[8px] font-bold tracking-[0.12em] uppercase',
                mode === 'annual' ? 'text-white/75' : 'text-[#8fa8ff]',
              )}
            >
              1 mes incluido
            </span>
          </span>
        </button>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-7">
        {PRICING_TIERS.map((tier) => (
          <PricingTierCard key={tier.id} tier={tier} mode={mode} />
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-center text-xs leading-relaxed text-white/48 backdrop-blur-md md:text-sm">
        La app privada está incluida en todos los servicios. Fotografía, diseño,
        vídeo, renders y producción de contenido se presupuestan por separado.
      </div>
    </div>
  )
}
