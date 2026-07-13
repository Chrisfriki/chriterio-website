'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

const FRAME_BASE_PATH = '/chriterio-hero/frames/'

/** Change here to use more/fewer frames (60 files are available in /public/chriterio-hero/frames). */
export const HERO_FRAME_COUNT = 52

/** Change here to make the scroll-driven sequence longer or shorter. */
export const HERO_SCROLL_HEIGHT_VH = 450

const FRAME_URLS = Array.from(
  { length: HERO_FRAME_COUNT },
  (_, index) => `${FRAME_BASE_PATH}${String(index + 1).padStart(2, '0')}.png`,
)

const MAX_DPR = 2
const CONTENT_FADE_END = 0.2
const MOBILE_BREAKPOINT = 768
const BACKGROUND_COLOR = '#061530'

type ChriterioHeroSequenceProps = {
  id?: string
  children?: ReactNode
  className?: string
}

export function ChriterioHeroSequence({
  id,
  children,
  className,
}: ChriterioHeroSequenceProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const imagesRef = useRef<HTMLImageElement[]>([])
  const currentFrameRef = useRef(-1)
  const tickingRef = useRef(false)
  const rafIdRef = useRef<number | null>(null)
  const dprRef = useRef(1)

  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null)
  const [firstFrameReady, setFirstFrameReady] = useState(false)

  // Detect the user's reduced-motion preference.
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

    // Desktop: cover (fill, crop overflow). Mobile: contain (never crop the rocket).
    const coverScale = Math.max(cssWidth / img.naturalWidth, cssHeight / img.naturalHeight)
    const containScale = Math.min(cssWidth / img.naturalWidth, cssHeight / img.naturalHeight)
    const scale = isMobile ? containScale : coverScale

    const drawWidth = img.naturalWidth * scale
    const drawHeight = img.naturalHeight * scale

    // On desktop, bias the crop to the right so the rocket clears the text
    // column on the left instead of sitting dead-center behind it.
    const horizontalAnchor = isMobile ? 0.5 : 0.32
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

    const frameIndex = Math.min(
      HERO_FRAME_COUNT - 1,
      Math.round(progress * (HERO_FRAME_COUNT - 1)),
    )

    if (frameIndex !== currentFrameRef.current) {
      drawFrame(frameIndex)
    }

    if (contentRef.current) {
      const fadeProgress = Math.min(1, progress / CONTENT_FADE_END)
      contentRef.current.style.opacity = String(1 - fadeProgress)
      contentRef.current.style.transform = `translateY(${fadeProgress * -24}px)`
      contentRef.current.style.pointerEvents =
        fadeProgress > 0.95 ? 'none' : 'auto'
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
        className={`relative h-[100svh] min-h-[640px] w-full bg-navy-dark ${className ?? ''}`}
      />
    )
  }

  if (reducedMotion) {
    return (
      <section
        id={id}
        className={`relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy-dark ${className ?? ''}`}
      >
        <img
          src={FRAME_URLS[0]}
          alt="Cohete Chriterio despegando"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="relative z-10 flex h-full w-full flex-col">
          {children}
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
      <div className="sticky top-0 h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy-dark">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full"
        />

        {!firstFrameReady && (
          <div
            aria-hidden="true"
            className="absolute inset-0 z-[5] flex items-center justify-center bg-navy-dark"
          >
            <span className="size-6 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
          </div>
        )}

        <div
          ref={contentRef}
          className="relative z-10 flex h-full w-full flex-col"
        >
          {children}
        </div>
      </div>
    </section>
  )
}
