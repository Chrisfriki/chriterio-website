'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { withBasePath } from '@/lib/base-path'

/** Change here to use more/fewer frames. */
export const HERO_FRAME_COUNT = 120

/** File extension of the frame sequence (public/chriterio-hero/frames/*.EXT). */
const FRAME_EXTENSION = 'webp'

/** Bump this whenever the frame files are replaced so browsers/GitHub Pages
 *  don't keep serving a stale cached sequence under the same filenames. */
const FRAME_VERSION = 'v4'

/** Change here to make the overall scroll-driven hero longer or shorter. */
export const HERO_SCROLL_HEIGHT_VH = 600

/** Fraction of the scroll range spent playing frames 1 -> N. */
export const HERO_FRAME_PHASE_END = 0.78

/** Fraction of the scroll range where the last frame is held and content starts revealing. */
export const HERO_CONTENT_REVEAL_START = 0.86

// This component draws frames via a plain `Image()` onto a canvas, which
// bypasses next/image entirely, so it must prefix the basePath itself
// (GitHub Pages serves this site from /chriterio-website/) to resolve
// correctly both on localhost and in production. The basePath is applied
// exactly once here — nowhere else in this file touches the raw path.
const getFramePath = (index: number) =>
  `${withBasePath('/chriterio-hero/frames/')}${String(index + 1).padStart(3, '0')}.${FRAME_EXTENSION}?v=${FRAME_VERSION}`

const FRAME_URLS = Array.from({ length: HERO_FRAME_COUNT }, (_, index) => getFramePath(index))

// Loaded first, before anything else, so there's a frame to paint ASAP.
const PRIORITY_FIRST_INDEX = 0
// Loaded right after the first frame: a handful of frames spread across the
// sequence so an early scroll already lands close to the right image while
// the rest streams in behind them.
const PRIORITY_KEY_INDICES = [29, 59, 89, HERO_FRAME_COUNT - 1].filter(
  (i, idx, arr) => i >= 0 && i < HERO_FRAME_COUNT && arr.indexOf(i) === idx,
)
const BACKGROUND_LOAD_CONCURRENCY = 6

const MAX_DPR = 2
const MOBILE_BREAKPOINT = 768
const BACKGROUND_COLOR = '#050d1f'

// Staggered reveal windows for each content group, all inside
// [HERO_CONTENT_REVEAL_START, 1]. Order: headline -> actions -> cards -> bar.
// (The navbar/logo group is handled separately by SiteNavbar — see
// HERO_NAV_REVEAL_RANGE below — since it lives outside this component.)
const STAGE_RANGES = {
  headline: [0.88, 0.94],
  actions: [0.91, 0.96],
  cards: [0.94, 0.985],
  bar: [0.97, 1],
} as const

/** Reveal window for the global site navbar on the homepage (read by SiteNavbar). */
export const HERO_NAV_REVEAL_RANGE: readonly [number, number] = [0.86, 0.9]

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
  const loadedRef = useRef<boolean[]>(new Array(HERO_FRAME_COUNT).fill(false))
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

  // Nearest already-loaded frame to `target` (itself included). Returns -1
  // if nothing has loaded yet at all.
  const resolveDrawableIndex = (target: number) => {
    if (loadedRef.current[target]) return target
    for (let offset = 1; offset < HERO_FRAME_COUNT; offset++) {
      const before = target - offset
      const after = target + offset
      if (before >= 0 && loadedRef.current[before]) return before
      if (after < HERO_FRAME_COUNT && loadedRef.current[after]) return after
    }
    return -1
  }

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
    const targetIndex = Math.min(
      HERO_FRAME_COUNT - 1,
      Math.round(frameProgress * (HERO_FRAME_COUNT - 1)),
    )

    const drawableIndex = resolveDrawableIndex(targetIndex)
    if (drawableIndex !== -1 && drawableIndex !== currentFrameRef.current) {
      drawFrame(drawableIndex)
      currentFrameRef.current = drawableIndex
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

  // Priority-ordered preload: frame 1 first, then a handful of frames spread
  // across the sequence, then the rest with limited concurrency in the
  // background. Every successful load re-triggers `update()` so a
  // temporarily-substituted frame gets swapped for the real one once it's
  // ready, and the reveal only waits for the very first frame to land
  // (whichever one that ends up being, in case an earlier one 404s).
  useEffect(() => {
    if (reducedMotion !== false) return
    let cancelled = false
    let announcedFirstPaint = false

    const images = FRAME_URLS.map(() => new Image())
    imagesRef.current = images
    loadedRef.current = new Array(HERO_FRAME_COUNT).fill(false)

    const loadOne = (index: number) =>
      new Promise<void>((resolve) => {
        const img = images[index]
        const src = FRAME_URLS[index]
        img.decoding = 'async'
        img.onload = () => {
          if (!cancelled) {
            loadedRef.current[index] = true
            if (!announcedFirstPaint) {
              announcedFirstPaint = true
              setFirstFrameReady(true)
            }
            requestUpdate()
          }
          resolve()
        }
        img.onerror = () => {
          console.error('Error cargando fotograma:', src)
          resolve()
        }
        img.src = src
      })

    async function run() {
      await loadOne(PRIORITY_FIRST_INDEX)
      if (cancelled) return

      await Promise.all(
        PRIORITY_KEY_INDICES.filter((i) => i !== PRIORITY_FIRST_INDEX).map(loadOne),
      )
      if (cancelled) return

      const already = new Set([PRIORITY_FIRST_INDEX, ...PRIORITY_KEY_INDICES])
      const rest = Array.from({ length: HERO_FRAME_COUNT }, (_, i) => i).filter(
        (i) => !already.has(i),
      )

      let cursor = 0
      const worker = async () => {
        while (cursor < rest.length && !cancelled) {
          const i = rest[cursor]
          cursor += 1
          await loadOne(i)
        }
      }
      await Promise.all(
        Array.from({ length: BACKGROUND_LOAD_CONCURRENCY }, () => worker()),
      )
    }

    run()

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
    const lastFrame = FRAME_URLS[FRAME_URLS.length - 1]
    return (
      <section
        id={id}
        className={`relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#050d1f] ${className ?? ''}`}
      >
        <img
          src={lastFrame}
          alt="Cohete Chriterio en órbita"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => console.error('Error cargando fotograma:', lastFrame)}
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
