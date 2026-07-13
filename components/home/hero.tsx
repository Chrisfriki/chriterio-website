'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { ChriterioHeroSequence } from '@/components/chriterio-hero-sequence'
import { LinkButton } from '@/components/link-button'
import { CALENDLY_URL, WHATSAPP_URL } from '@/lib/site'

const H1_LINES = ['¿Vendes en Amazon', 'y no sabes por qué', 'no despegas?']

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (reduceMotion) {
      setShow(true)
      return
    }
    const raf = requestAnimationFrame(() => setShow(true))
    return () => cancelAnimationFrame(raf)
  }, [reduceMotion])

  return (
    <ChriterioHeroSequence id="home-hero">
      {/* Legibility scrim so the text reads over any frame of the sequence */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-navy-dark/90 via-navy-dark/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-navy-dark/70 via-navy-dark/15 to-transparent" />

      {/* Giant translucent watermark */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-20 left-1/2 z-[2] -translate-x-1/2 font-serif text-[20vw] leading-none font-medium tracking-tight whitespace-nowrap text-white/[0.07] select-none sm:top-24 md:top-28 md:text-[14vw]"
      >
        CHRITERIO
      </span>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-5 pb-16 md:pb-20">
        {/* H1 line by line rise-up */}
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {H1_LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '110%' }}
                animate={show ? { y: '0%' } : { y: '110%' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Glass cards */}
        <div className="mt-8 flex max-w-xl flex-wrap gap-3 md:mt-10 md:gap-4">
          <GlassCard show={show} delay={0.45}>
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2.5">
                <span className="chr-pulse absolute inline-flex size-2.5 rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm font-medium text-white">
                Seller activo · Amazon.es
              </span>
            </div>
          </GlassCard>

          <GlassCard show={show} delay={0.55}>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-white md:text-3xl">
                7 días
              </span>
              <span className="mt-1 text-xs text-white/70 md:text-sm">
                de análisis a plan de acción
              </span>
            </div>
          </GlassCard>

          <GlassCard show={show} delay={0.65} className="hidden sm:block">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold text-white md:text-3xl">
                5–7 causas
              </span>
              <span className="mt-1 text-xs text-white/70 md:text-sm">
                priorizadas, sin humo
              </span>
            </div>
          </GlassCard>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85, ease }}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/80 text-pretty md:text-lg"
        >
          Te lo digo en 7 días. Analizo tu cuenta con el mismo criterio que uso
          con mi propio dinero: soy seller activo en Amazon.es.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1, ease }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <LinkButton href={CALENDLY_URL} external>
            Reserva una llamada gratis de 15 min
          </LinkButton>
          <LinkButton href={WHATSAPP_URL} external variant="ghost-light">
            Escríbeme por WhatsApp
          </LinkButton>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-6 text-sm text-white/50"
        >
          Sin permanencias · Sin retainers · Precio cerrado
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute inset-x-0 bottom-6 z-10 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-white/60"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown className="size-4" />
        </motion.div>
      </motion.div>
    </ChriterioHeroSequence>
  )
}

function GlassCard({
  children,
  show,
  delay,
  className = '',
}: {
  children: React.ReactNode
  show: boolean
  delay: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.94 }}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ type: 'spring', stiffness: 120, damping: 14, delay }}
      className={`glass-card px-5 py-4 ${className}`}
    >
      {children}
    </motion.div>
  )
}
