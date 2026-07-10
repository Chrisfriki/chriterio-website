'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { LinkButton } from '@/components/link-button'
import { CALENDLY_URL, WHATSAPP_URL } from '@/lib/site'

const H1_LINES = ['¿Vendes en Amazon', 'y no sabes por qué', 'no despegas?']

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [revealed, setRevealed] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (revealed) {
      window.dispatchEvent(new Event('chriterio:hero-ready'))
    }
  }, [revealed])

  useEffect(() => {
    if (reduceMotion) {
      setRevealed(true)
      return
    }
    // Fallback: reveal content even if the video is missing, blocked or stalls.
    const fallback = window.setTimeout(() => setRevealed(true), 6000)
    return () => window.clearTimeout(fallback)
  }, [reduceMotion])

  const handleEnded = () => {
    // Freeze on the last frame, then reveal the content.
    if (videoRef.current) videoRef.current.pause()
    setRevealed(true)
  }

  const show = revealed || reduceMotion

  return (
    <section className="relative flex h-[100svh] min-h-[640px] w-full items-end overflow-hidden bg-navy-dark">
      {/* Background video with poster fallback */}
      {!reduceMotion ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster="/rocket-poster.png"
          src="/rocket.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
          onError={() => window.setTimeout(() => setRevealed(true), 1200)}
        />
      ) : (
        <img
          src="/rocket-poster.png"
          alt="Cohete despegando"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Legibility overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(6,21,48,0.35)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 md:pb-28">
        {/* H1 line by line rise-up */}
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-7xl">
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
        <div className="mt-8 flex flex-wrap gap-3 md:mt-10 md:gap-4">
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
          className="mt-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg text-pretty"
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
    </section>
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
