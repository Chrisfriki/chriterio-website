'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { withBasePath } from '@/lib/base-path'

// This component draws frames via a plain `Image()` onto a canvas, which
// bypasses next/image entirely, so it must prefix the basePath itself to
// resolve correctly both on localhost and on GitHub Pages.
const FRAME_BASE_PATH = withBasePath('/chriterio-hero/frames/')

/** Change here to use more/fewer frames (60 files are available in /public/chriterio-hero/frames). */
export const HERO_FRAME_COUNT = 52

/** Change here to make the overall scroll-driven hero longer or shorter. */
export const HERO_SCROLL_HEIGHT_VH = 600

/** Fraction of the scroll range spent playing frames 01 -> N (0 to this value). */
export const HERO_FRAME_PHASE_END = 0.75

/** Fraction of the scroll range where the last frame is held and content starts revealing. */
export const HERO_CONTENT_REVEAL_START = 0.85

const FRAME_URLS = Array.from(
  { length: HERO_FRAME_COUNT },
  (_, index) => `${FRAME_BASE_PATH}${String(index + 1).padStart(2, '0')}.png`,
)

const MAX_DPR = 2
const MOBILE_BREAKPOINT = 768
const BACKGROUND_COLOR = '#050d1f'

// Staggered reveal windows for each content group, all inside
// [HERO_CONTENT_REVEAL_START, 1]. Order: headline -> actions -> cards -> bar.
const STAGE_RANGES = {
  headline: [0.85, 0.92],
  actions: [0.89, 0.95],
  cards: [0.93, 0.98],
  bar: [0.96, 1],
} as const

function easeInOutSmooth(t: number) {
  return t * t * (3 - 2 * t)
}

function applyStageStyle(el: HTMLElement | null, localT: number) {
  if (!el) return
  const eased = easeInOutSmooth(localT)
  el.style.opacity = String(eased)
  el.style.transform = `translateY(${(1 - eased) * 20}px)`
  el.style.filter = `blur(${(1 - eased) * 6}px)`
  el.style.pointerEvents = eased > 0.6 ? 'auto' : 'none'
}

type ChriterioHeroSequenceProps = {
  id?: string
  headline: ReactNode
  actions: ReactNode
  cards: ReactNode
  bar?: ReactNode
  className?: string
}

export function ChriterioHeroSequence({
  id,
  headline,
  actions,
  cards,
  bar,
  className,
}: ChriterioHeroSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(-1)
  const tickingRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const dprRef = useRef(1)

  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null)
  const [firstFrameReady, setFirstFrameReady] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cssWidth = canvas.clientWidth
    const cssHeight = canvas.clientHeight
    if (cssWidth === 0 || cssHeight === 0) return

    const dpr = dprRef.current
    const pixelWidth = Math.round(cssWidth * dpr)
    const pixelHeight = Math.round(cssHeight * dpr)
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, cssWidth, cssHeight)

    const isMobile = cssWidth < MOBILE_BREAKPOINT
    const coverScale = Math.max(cssWidth / img.naturalWidth, cssHeight / img.naturalHeight)
    const containScale = Math.min(cssWidth / img.naturalWidth, cssHeight / img.naturalHeight)
    const scale = isMobile ? containScale : coverScale

    const drawWidth = img.naturalWidth * scale
    const drawHeight = img.naturalHeight * scale

    // On desktop, bias the crop right so the rocket clears the text column.
    const horizontalAnchor = isMobile ? 0.5 : 0.36
    const dx = (cssWidth - drawWidth) * horizontalAnchor
    const dy = (cssHeight - drawHeight) / 2

    ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
    currentFrameRef.current = index
  }

  const update = () => {
    tickingRef.current = false
    const section = sectionRef.current
    if (!section) return

    const rect = section.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const scrollableDistance = rect.height - viewportHeight

    let progress = scrollableDistance > 0 ? -rect.top / scrollableDistance : 0
    progress = Math.min(1, Math.max(0, progress))

    // Phase 1 (0 -> HERO_FRAME_PHASE_END): scrub frames 0..N-1.
    // Phase hold + reveal (HERO_FRAME_PHASE_END -> 1): stay on the last frame.
    const frameProgress = Math.min(1, progress / HERO_FRAME_PHASE_END)
    const frameIndex = Math.min(
      HERO_FRAME_COUNT - 1,
      Math.round(frameProgress * (HERO_FRAME_COUNT - 1)),
    )

    if (frameIndex !== currentFrameRef.current) {
      drawFrame(frameIndex)
    }

    for (const [key, ref] of [
      ['headline', headlineRef],
      ['actions', actionsRef],
      ['cards', cardsRef],
      ['bar', barRef],
    ] as const) {
      const [start, end] = STAGE_RANGES[key]
      const localT = Math.min(1, Math.max(0, (progress - start) / (end - start)))
      applyStageStyle(ref.current, localT)
    }
  }

  const requestUpdate = () => {
    if (tickingRef.current) return
    tickingRef.current = true
    rafIdRef.current = requestAnimationFrame(update)
  }

  // Preload every frame; draw + reveal as soon as the first one is ready.
  useEffect(() => {
    if (reducedMotion !== false) return
    let cancelled = false

    const images = FRAME_URLS.map((src, index) => {
      const img = new Image()
      img.decoding = 'async'
      img.onload = () => {
        if (cancelled) return
        if (index === 0) {
          setFirstFrameReady(true)
          requestUpdate()
        }
      }
      img.onerror = () => {
        console.error(`[ChriterioHeroSequence] Failed to load frame: ${src}`)
      }
      img.src = src
      return img
    })

    imagesRef.current = images

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

  // Scroll + resize wiring.
  useEffect(() => {
    if (reducedMotion !== false) return

    dprRef.current = Math.min(window.devicePixelRatio || 1, MAX_DPR)

    const onScroll = () => requestUpdate()
    const onResize = () => {
      dprRef.current = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      currentFrameRef.current = -1
      requestUpdate()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    requestUpdate()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      tickingRef.current = false
    }
  }, [reducedMotion])

  // Avoid a flash of the wrong variant: render nothing until the media query resolves.
  if (reducedMotion === null) {
    return (
      <section
        id={id}
        className={`relative h-[100svh] min-h-[640px] w-full bg-[#050d1f] ${className ?? ''}`}
      />
    )
  }

  if (reducedMotion) {
    return (
      <section
        id={id}
        className={`relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#050d1f] ${className ?? ''}`}
      >
        <img
          src={FRAME_URLS[FRAME_URLS.length - 1]}
          alt="Cohete Chriterio en órbita"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() =>
            console.error(
              `[ChriterioHeroSequence] Failed to load static frame: ${FRAME_URLS[FRAME_URLS.length - 1]}`,
            )
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d1f]/85 via-[#050d1f]/20 to-transparent" />
        <div className="relative z-10 flex h-full w-full flex-col justify-end gap-6 px-5 pb-14 md:px-14 md:pb-16">
          <div>{headline}</div>
          <div>{actions}</div>
          <div>{cards}</div>
          {bar && <div>{bar}</div>}
        </div>
      </section>
    )
  }

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative w-full ${className ?? ''}`}
      style={{ height: `${HERO_SCROLL_HEIGHT_VH}vh` }}
    >
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#050d1f]">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full bg-[#050d1f]"
        />

        {!firstFrameReady && (
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[5] flex items-center justify-center"
          >
            <span className="size-6 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
          </div>
        )}

        {/* Localized scrim: only darkens the bottom-left corner behind the
            text block, keeping the rocket / earth / space visible. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 10% 100%, rgba(5,13,31,0.88) 0%, rgba(5,13,31,0.35) 55%, transparent 80%)',
          }}
        />

        {/* Single bottom-anchored flex column: content stacks naturally in
            document flow (no fixed pixel offsets), so it never overlaps
            regardless of how many lines the headline wraps into. */}
        <div className="absolute inset-x-5 bottom-6 z-10 flex flex-col gap-4 md:inset-x-14 md:bottom-10 md:gap-5">
          <div ref={headlineRef} className="max-w-md md:max-w-lg" style={{ opacity: 0 }}>
            {headline}
          </div>

          <div ref={actionsRef} style={{ opacity: 0, pointerEvents: 'none' }}>
            {actions}
          </div>

          <div ref={cardsRef} style={{ opacity: 0 }}>
            {cards}
          </div>

          {bar && (
            <div ref={barRef} style={{ opacity: 0 }}>
              {bar}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
