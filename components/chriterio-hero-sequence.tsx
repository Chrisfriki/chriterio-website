'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { withBasePath } from '@/lib/base-path'

/** Change here to use more/fewer frames. */
export const HERO_FRAME_COUNT = 120

/** File extension of the frame sequence (public/chriterio-hero/frames/*.EXT). */
const FRAME_EXTENSION = 'webp'

/** Bump this whenever the frame files are replaced so browsers/GitHub Pages
 *  don't keep serving a stale cached sequence under the same filenames. */
const FRAME_VERSION = 'v4'

/** Change here to make the overall scroll-driven hero longer or shorter. Kept
 *  short on purpose: the rocket should read as a brief cinematic entrance,
 *  not a long intro the visitor has to sit through before the message shows. */
export const HERO_SCROLL_HEIGHT_VH = 240

/** Fraction of the scroll range spent playing frames 1 -> N; the rest holds
 *  the last frame as a stable backdrop while content keeps appearing/settles. */
export const HERO_FRAME_PHASE_END = 0.85

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
// After the first frame, the rest load with limited concurrency, always
// picking whichever idle frame is closest to the current scroll target, so
// loading dynamically re-prioritizes around wherever the user is scrolling.
const BACKGROUND_LOAD_CONCURRENCY = 8

type FrameStatus = 'idle' | 'loading' | 'loaded' | 'error'

const MAX_DPR = 2
const MOBILE_BREAKPOINT = 768
const BACKGROUND_COLOR = '#050d1f'

// --- Playhead smoothing tuning (safe to tweak) -----------------------------
/** How aggressively the displayed frame chases the scroll target each tick (0-1: higher = snappier, lower = smoother/laggier). */
const SMOOTHING_FACTOR = 0.16
/** Max change in the (fractional) displayed frame per animation-frame tick. Keeps the canvas from ever skipping more than one drawn frame per render. */
const MAX_FRAME_STEP = 0.9
/** Trackpad/wheel micro-reversals shorter than this (px) are ignored. */
const REVERSE_DISTANCE_THRESHOLD = 70
/** ...and must persist at least this long (ms) before a direction change is accepted. */
const REVERSE_TIME_THRESHOLD = 120
// ----------------------------------------------------------------------------

// Narrative reveal choreography (fractions of the hero's total scroll
// progress, 0-1). The rocket starts moving and clearing space immediately;
// text cascades in shortly after — the headline should be fully in within
// one or two normal scroll gestures, not a long unexplained intro.
// Order: eyebrow -> headline -> subtitle -> CTA primary -> CTA secondary ->
// microcopy -> cards. Each overlaps slightly with the next for a fluid feel
// instead of everything popping in at once.
const STAGE_RANGES = {
  eyebrow: [0.04, 0.12],
  headline: [0.08, 0.2],
  subtitle: [0.24, 0.36],
  ctaPrimary: [0.32, 0.44],
  ctaSecondary: [0.38, 0.5],
  microcopy: [0.46, 0.58],
  cards: [0.55, 0.7],
} as const

/** The "slide to start" hint fades out fast, right as the first scroll gesture begins. */
const SCROLL_HINT_FADE_END = 0.05

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
  eyebrow: ReactNode
  headline: ReactNode
  subtitle: ReactNode
  ctaPrimary: ReactNode
  ctaSecondary: ReactNode
  microcopy: ReactNode
  cards: ReactNode
  className?: string
}

export function ChriterioHeroSequence({
  id,
  eyebrow,
  headline,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  microcopy,
  cards,
  className,
}: ChriterioHeroSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaPrimaryRef = useRef<HTMLDivElement>(null)
  const ctaSecondaryRef = useRef<HTMLDivElement>(null)
  const microcopyRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const imagesRef = useRef<HTMLImageElement[]>([])
  const statusRef = useRef<FrameStatus[]>(new Array(HERO_FRAME_COUNT).fill('idle'))
  const dprRef = useRef(1)

  // --- Decoupled scroll-target vs. rendered-playhead state (all refs: never
  // trigger a re-render, and the render loop is the only reader/writer of
  // the "displayed" side of this split). ---
  const progressRef = useRef(0) // stabilized (anti-bounce-gated) 0..1 hero progress, drives content reveal
  const targetFrameFloatRef = useRef(0) // where the scroll *wants* the playhead to be
  const displayedFrameFloatRef = useRef(0) // where the playhead actually, smoothly is
  const lastDrawnFrameIndexRef = useRef(-1) // last frame index actually painted to the canvas
  const lastScrollYRef = useRef(0)
  // Cached, document-relative geometry. Re-measured only on mount/resize, never
  // on every scroll tick — see measureGeometry() for why.
  const sectionOffsetTopRef = useRef(0)
  const sectionHeightRef = useRef(0)
  const scrollDirectionRef = useRef<'down' | 'up' | null>(null)
  const reverseDistanceRef = useRef(0)
  const reverseStartTimeRef = useRef<number | null>(null)
  const rafIdRef = useRef<number | null>(null)
  const needsRedrawRef = useRef(false)

  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null)
  const [firstFrameReady, setFirstFrameReady] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const onChange = () => setReducedMotion(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Nearest already-loaded frame to `target`, searching both directions.
  // Used only to bootstrap the very first paint (lastDrawnFrameIndex === -1)
  // — before anything is on screen there's no "previous frame" to protect
  // against regressing from, so any loaded frame is an acceptable first
  // image. After that, the render loop below only ever steps to the
  // adjacent frame, never searches around.
  const findNearestLoadedAnyDirection = (target: number) => {
    const clamped = Math.max(0, Math.min(HERO_FRAME_COUNT - 1, target))
    if (statusRef.current[clamped] === 'loaded') return clamped
    for (let offset = 1; offset < HERO_FRAME_COUNT; offset++) {
      const before = clamped - offset
      const after = clamped + offset
      if (before >= 0 && statusRef.current[before] === 'loaded') return before
      if (after < HERO_FRAME_COUNT && statusRef.current[after] === 'loaded') return after
    }
    return -1
  }

  const resizeCanvasBackingStore = () => {
    const canvas = canvasRef.current
    if (!canvas) return
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
  }

  // The one and only place that calls context.drawImage(). Scroll, resize,
  // orientationchange, image.onload/decode and preload never call this
  // directly — they only update refs and ask the render loop to run.
  // Returns true if a frame was actually painted.
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return false

    const ctx = canvas.getContext('2d')
    if (!ctx) return false

    const cssWidth = canvas.clientWidth
    const cssHeight = canvas.clientHeight
    if (cssWidth === 0 || cssHeight === 0) return false

    const dpr = dprRef.current
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.fillStyle = BACKGROUND_COLOR
    ctx.fillRect(0, 0, cssWidth, cssHeight)

    // Always cover (fill, crop overflow) — on mobile this avoids the empty
    // navy letterbox bars a "contain" fit would leave behind, and keeps the
    // rocket a meaningful size instead of shrinking it to fit.
    const isMobile = cssWidth < MOBILE_BREAKPOINT
    const coverScale = Math.max(cssWidth / img.naturalWidth, cssHeight / img.naturalHeight)
    // On mobile the text column spans the full width and sits in the bottom
    // half of the screen, not beside the rocket like on desktop. A plain
    // cover-fit shows the *entire* height of the source frame (nose to
    // engine flame) — the flame/boosters start at roughly 60% down the
    // source frame, right where the text lives. Zooming in so only the top
    // ~60% of the source is visible, anchored near the top, keeps the nose
    // and fuselage in view while pushing the bright flame plume out of frame
    // entirely instead of behind the text.
    const extraZoom = isMobile ? 1.65 : 1
    const scale = coverScale * extraZoom
    const drawWidth = img.naturalWidth * scale
    const drawHeight = img.naturalHeight * scale

    // Bias the crop right on both breakpoints so the rocket sits clear of
    // the left-aligned text column instead of running straight through it.
    // On mobile the extra zoom above makes the visible horizontal window
    // much narrower, so the same bias needs a much smaller delta from center
    // (0.5) or the rocket shifts out of frame entirely (verified visually —
    // don't push this much past ~0.4 without re-checking screenshots).
    const horizontalAnchor = isMobile ? 0.4 : 0.42
    const verticalAnchor = isMobile ? 0.05 : 0.5
    const dx = (cssWidth - drawWidth) * horizontalAnchor
    const dy = (cssHeight - drawHeight) * verticalAnchor

    ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
    return true
  }

  const applyStages = (progress: number) => {
    for (const [key, ref] of [
      ['eyebrow', eyebrowRef],
      ['headline', headlineRef],
      ['subtitle', subtitleRef],
      ['ctaPrimary', ctaPrimaryRef],
      ['ctaSecondary', ctaSecondaryRef],
      ['microcopy', microcopyRef],
      ['cards', cardsRef],
    ] as const) {
      const [start, end] = STAGE_RANGES[key]
      const localT = Math.min(1, Math.max(0, (progress - start) / (end - start)))
      applyStageStyle(ref.current, localT)
    }

    const hint = scrollHintRef.current
    if (hint) {
      const fadeT = Math.min(1, Math.max(0, progress / SCROLL_HINT_FADE_END))
      const opacity = 1 - easeInOutSmooth(fadeT)
      hint.style.opacity = String(opacity)
      hint.style.pointerEvents = opacity > 0.4 ? 'auto' : 'none'
    }
  }

  const requestRender = () => {
    if (rafIdRef.current !== null) return
    rafIdRef.current = requestAnimationFrame(renderLoop)
  }

  // Single requestAnimationFrame loop: chases displayedFrameFloat toward
  // targetFrameFloat one step at a time (never more than MAX_FRAME_STEP per
  // tick), so the canvas always passes through every intermediate frame
  // instead of jumping. Keeps running on its own until it settles, even if
  // the user has stopped scrolling.
  const renderLoop = () => {
    rafIdRef.current = null

    if (lastDrawnFrameIndexRef.current === -1) {
      const bootstrapIndex = findNearestLoadedAnyDirection(Math.round(targetFrameFloatRef.current))
      if (bootstrapIndex !== -1) {
        const painted = drawFrame(bootstrapIndex)
        if (painted) {
          lastDrawnFrameIndexRef.current = bootstrapIndex
          displayedFrameFloatRef.current = bootstrapIndex
          needsRedrawRef.current = false
        }
      }
      applyStages(progressRef.current)
      requestRender()
      return
    }

    const target = targetFrameFloatRef.current
    const displayed = displayedFrameFloatRef.current
    const difference = target - displayed

    let proposedNext: number
    let blockedByDirection = false
    if (Math.abs(difference) < 0.01) {
      proposedNext = target
    } else {
      const rawStep = difference * SMOOTHING_FACTOR
      let step = Math.max(-MAX_FRAME_STEP, Math.min(MAX_FRAME_STEP, rawStep))
      // Guard against a rare edge case: if a new target lands *behind* the
      // displayed frame while it's still mid-chase toward a previous target
      // (only possible under extremely fast, erratic direction changes), the
      // raw difference could momentarily point the wrong way relative to the
      // just-confirmed scroll direction. Rather than let the chase take a
      // step backward while "down" is confirmed (or forward while "up" is
      // confirmed), pause here — the next accepted scroll event will supply
      // a consistent target again and the loop restarts from there, so this
      // never spins requestAnimationFrame waiting for a target direction
      // disallows.
      const direction = scrollDirectionRef.current
      if (direction === 'down' && step < 0) {
        step = 0
        blockedByDirection = true
      }
      if (direction === 'up' && step > 0) {
        step = 0
        blockedByDirection = true
      }
      proposedNext = displayed + step
    }

    const proposedIndex = Math.max(0, Math.min(HERO_FRAME_COUNT - 1, Math.round(proposedNext)))

    let advanced = false
    if (proposedIndex !== lastDrawnFrameIndexRef.current || needsRedrawRef.current) {
      const status = statusRef.current[proposedIndex]
      if (status === 'loaded') {
        const painted = drawFrame(proposedIndex)
        if (painted) {
          if (
            process.env.NODE_ENV !== 'production' &&
            lastDrawnFrameIndexRef.current !== -1
          ) {
            const dir = scrollDirectionRef.current
            const stepped = proposedIndex - lastDrawnFrameIndexRef.current
            if ((dir === 'down' && stepped < 0) || (dir === 'up' && stepped > 0)) {
              console.warn('Retroceso de fotograma detectado', {
                direction: dir,
                previousRenderedFrame: lastDrawnFrameIndexRef.current,
                nextRenderedFrame: proposedIndex,
              })
            }
          }
          lastDrawnFrameIndexRef.current = proposedIndex
          displayedFrameFloatRef.current = proposedNext
          needsRedrawRef.current = false
          advanced = true
        }
      } else if (status === 'error') {
        // Permanently missing frame: don't stall on it forever — treat it as
        // passed-through (the canvas keeps showing the last real frame) so
        // the chase can keep moving as soon as neighboring frames are ready.
        lastDrawnFrameIndexRef.current = proposedIndex
        displayedFrameFloatRef.current = proposedNext
        needsRedrawRef.current = false
        advanced = true
      }
      // 'idle' | 'loading': not ready yet — wait and retry next tick,
      // canvas keeps showing whatever was last successfully drawn.
    } else {
      // Same index as last drawn; let the float keep settling toward target.
      displayedFrameFloatRef.current = proposedNext
      advanced = true
    }

    applyStages(progressRef.current)

    const settled = Math.abs(targetFrameFloatRef.current - displayedFrameFloatRef.current) < 0.001
    if (!blockedByDirection && (!settled || !advanced)) {
      requestRender()
    }
  }

  // Caches the hero section's geometry in *document* coordinates
  // (offsetTop + height) instead of relying on getBoundingClientRect() on
  // every scroll event. getBoundingClientRect() is a viewport-relative
  // layout query — with a `position: sticky` child inside, browsers can
  // occasionally return a rect that hasn't caught up with the very latest
  // scroll/compositor position yet, especially under fast or trackpad-
  // driven scrolling. That produced a progress value that was momentarily
  // *behind* where the scroll actually was, which then "caught up" a tick
  // later — exactly the small backward-then-forward stutter this was
  // fixing. Re-deriving progress from window.scrollY against a geometry
  // snapshot taken once (mount) and refreshed only on resize removes that
  // per-tick layout read entirely, so progress is a pure, monotonic
  // function of scrollY.
  const measureGeometry = () => {
    const section = sectionRef.current
    if (!section) return
    const rect = section.getBoundingClientRect()
    sectionOffsetTopRef.current = rect.top + window.scrollY
    sectionHeightRef.current = rect.height
  }

  const computeProgressForScrollY = (scrollY: number) => {
    const viewportHeight = window.innerHeight
    const scrollableDistance = sectionHeightRef.current - viewportHeight
    const raw =
      scrollableDistance > 0
        ? (scrollY - sectionOffsetTopRef.current) / scrollableDistance
        : 0
    return Math.min(1, Math.max(0, raw))
  }

  // Computes the raw progress/target for the *current* scroll position and
  // commits it as the accepted state (used both for genuine continued
  // movement and for a confirmed direction reversal).
  const acceptScrollMovement = (rawScrollY: number, direction: 'down' | 'up') => {
    scrollDirectionRef.current = direction
    lastScrollYRef.current = rawScrollY
    reverseDistanceRef.current = 0
    reverseStartTimeRef.current = null

    const progress = computeProgressForScrollY(rawScrollY)
    progressRef.current = progress

    const frameProgress = Math.min(1, progress / HERO_FRAME_PHASE_END)
    targetFrameFloatRef.current = frameProgress * (HERO_FRAME_COUNT - 1)

    requestRender()
  }

  // The scroll listener's only job: figure out the raw progress/target and
  // gate direction changes against accidental trackpad micro-reversals. It
  // never touches the canvas.
  const handleScrollMovement = () => {
    const rawScrollY = window.scrollY
    const delta = rawScrollY - lastScrollYRef.current
    if (delta === 0) return

    const eventDirection: 'down' | 'up' = delta > 0 ? 'down' : 'up'
    const currentDirection = scrollDirectionRef.current

    if (currentDirection === null || eventDirection === currentDirection) {
      acceptScrollMovement(rawScrollY, eventDirection)
      return
    }

    // Moving opposite to the confirmed direction: don't commit yet.
    if (reverseStartTimeRef.current === null) {
      reverseStartTimeRef.current = performance.now()
    }
    reverseDistanceRef.current = Math.abs(rawScrollY - lastScrollYRef.current)
    const elapsed = performance.now() - reverseStartTimeRef.current

    if (
      reverseDistanceRef.current >= REVERSE_DISTANCE_THRESHOLD &&
      elapsed >= REVERSE_TIME_THRESHOLD
    ) {
      acceptScrollMovement(rawScrollY, eventDirection)
    }
    // Otherwise: ignore the micro-reversal entirely — keep the previous
    // direction, target and progress untouched.
  }

  // Preload: frame 1 first (painted immediately on arrival), then the rest
  // with limited concurrency. Idle workers always pick whichever unrequested
  // frame is closest to the *current* scroll target, so loading dynamically
  // re-prioritizes around wherever the user is actually scrolling.
  useEffect(() => {
    if (reducedMotion !== false) return
    let cancelled = false
    let announcedFirstPaint = false

    const images = FRAME_URLS.map(() => new Image())
    imagesRef.current = images
    statusRef.current = new Array(HERO_FRAME_COUNT).fill('idle')

    const pickNextIdleIndex = () => {
      const target = Math.round(targetFrameFloatRef.current)
      let best = -1
      let bestDistance = Infinity
      for (let i = 0; i < HERO_FRAME_COUNT; i++) {
        if (statusRef.current[i] !== 'idle') continue
        const distance = Math.abs(i - target)
        if (distance < bestDistance) {
          bestDistance = distance
          best = i
        }
      }
      return best
    }

    const loadOne = (index: number) =>
      new Promise<void>((resolve) => {
        const img = images[index]
        const src = FRAME_URLS[index]
        statusRef.current[index] = 'loading'
        img.decoding = 'async'

        const finish = () => {
          if (cancelled) {
            resolve()
            return
          }
          statusRef.current[index] = 'loaded'
          if (!announcedFirstPaint) {
            announcedFirstPaint = true
            setFirstFrameReady(true)
          }
          requestRender()
          resolve()
        }

        img.onload = () => {
          if (cancelled) {
            resolve()
            return
          }
          // Only draw fully-decoded images. decode() also avoids a
          // decode-on-first-paint stutter.
          if (typeof img.decode === 'function') {
            img.decode().then(finish).catch(finish)
          } else {
            finish()
          }
        }
        img.onerror = () => {
          statusRef.current[index] = 'error'
          console.error('Error cargando fotograma:', src)
          requestRender()
          resolve()
        }
        img.src = src
      })

    async function run() {
      await loadOne(PRIORITY_FIRST_INDEX)
      if (cancelled) return

      const worker = async () => {
        while (!cancelled) {
          const next = pickNextIdleIndex()
          if (next === -1) return
          await loadOne(next)
        }
      }
      await Promise.all(Array.from({ length: BACKGROUND_LOAD_CONCURRENCY }, () => worker()))
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
    lastScrollYRef.current = window.scrollY
    resizeCanvasBackingStore()
    measureGeometry()

    // Seed the initial progress/target directly (e.g. the page was reloaded
    // mid-scroll) — there's no prior direction yet, so this bypasses the
    // reversal gate on purpose.
    progressRef.current = computeProgressForScrollY(window.scrollY)
    const frameProgress = Math.min(1, progressRef.current / HERO_FRAME_PHASE_END)
    targetFrameFloatRef.current = frameProgress * (HERO_FRAME_COUNT - 1)
    displayedFrameFloatRef.current = targetFrameFloatRef.current

    const onScroll = () => handleScrollMovement()
    const onResize = () => {
      dprRef.current = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      resizeCanvasBackingStore()
      measureGeometry()
      needsRedrawRef.current = true
      requestRender()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    requestRender()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#050d1f]/90 via-[#050d1f]/25 to-transparent" />
        <div className="relative z-10 flex h-full w-full flex-col justify-end gap-4 px-5 pb-14 md:px-14 md:pb-16">
          <div>{eyebrow}</div>
          <div className="max-w-lg md:max-w-xl">{headline}</div>
          <div className="max-w-md md:max-w-lg">{subtitle}</div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div>{ctaPrimary}</div>
            <div>{ctaSecondary}</div>
          </div>
          <div>{microcopy}</div>
          <div>{cards}</div>
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

        {/* Legibility scrim. On mobile the text spans the full width along
            the bottom, so a full-width bottom-up gradient does the work. On
            desktop the text only lives in the bottom-left column, so an
            extra, stronger radial layer reinforces just that corner while
            keeping the rocket / earth / space visible everywhere else. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#050d1f]/90 via-[#050d1f]/25 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] hidden md:block"
          style={{
            background:
              'radial-gradient(ellipse 68% 60% at 8% 100%, rgba(5,13,31,0.82) 0%, rgba(5,13,31,0.32) 55%, transparent 80%)',
          }}
        />
        {/* Mobile-only left-to-right scrim: the rocket sits toward the right
            of the frame, so darkening the left side protects the text column
            without needing to touch the canvas/animation itself. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] block md:hidden"
          style={{
            background:
              'linear-gradient(90deg, rgba(5,13,31,0.75) 0%, rgba(5,13,31,0.35) 45%, transparent 75%)',
          }}
        />

        {/* Single bottom-anchored flex column: content stacks naturally in
            document flow (no fixed pixel offsets), so it never overlaps
            regardless of how many lines the headline wraps into. Each piece
            fades/rises in on its own schedule via its own ref. */}
        <div className="absolute inset-x-5 bottom-6 z-10 flex flex-col gap-4 md:inset-x-14 md:bottom-10 md:gap-5">
          <div ref={eyebrowRef} style={{ opacity: 0 }}>
            {eyebrow}
          </div>

          <div ref={headlineRef} className="max-w-lg md:max-w-xl" style={{ opacity: 0 }}>
            {headline}
          </div>

          <div ref={subtitleRef} className="max-w-md md:max-w-lg" style={{ opacity: 0 }}>
            {subtitle}
          </div>

          <div className="mt-5 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-3 md:mt-1">
            <div
              ref={ctaPrimaryRef}
              className="w-full sm:w-auto"
              style={{ opacity: 0, pointerEvents: 'none' }}
            >
              {ctaPrimary}
            </div>
            <div
              ref={ctaSecondaryRef}
              className="flex justify-center sm:block"
              style={{ opacity: 0, pointerEvents: 'none' }}
            >
              {ctaSecondary}
            </div>
          </div>

          <div ref={microcopyRef} style={{ opacity: 0 }}>
            {microcopy}
          </div>

          <div ref={cardsRef} style={{ opacity: 0 }}>
            {cards}
          </div>
        </div>

        {/* "Slide to start" hint — visible only at the very top of the hero,
            fades out at the first hint of scroll movement. */}
        <div
          ref={scrollHintRef}
          className="absolute inset-x-0 bottom-6 z-10 flex justify-center md:bottom-8"
        >
          <div className="flex flex-col items-center gap-1 text-white/60">
            <span className="text-[10px] tracking-widest uppercase">
              Desliza para comenzar
            </span>
            <ChevronDown className="size-4 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
