'use client'

import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  motion,
  useReducedMotion,
  type PanInfo,
} from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { withBasePath } from '@/lib/base-path'

export interface CreativeSlide {
  id: string
  src: string
  alt: string
  type?: 'main-image' | 'infographic' | 'comparison' | 'lifestyle' | 'a-plus'
}

interface CreativePortfolioCarouselProps {
  slides: CreativeSlide[]
  className?: string
}

const SWIPE_DISTANCE = 45
const SWIPE_VELOCITY = 450

export function CreativePortfolioCarousel({
  slides,
  className,
}: CreativePortfolioCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const firstCardRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const [trackIndex, setTrackIndex] = useState(1)
  const [step, setStep] = useState(0)
  const [centerOffset, setCenterOffset] = useState(0)
  const [isLoopReset, setIsLoopReset] = useState(false)

  const loopSlides = useMemo(
    () => slides.length > 1
      ? [slides[slides.length - 1], ...slides, slides[0]]
      : slides,
    [slides]
  )

  const activeIndex = slides.length > 0
    ? (trackIndex - 1 + slides.length) % slides.length
    : 0

  useEffect(() => {
    const viewport = viewportRef.current
    const firstCard = firstCardRef.current
    if (!viewport || !firstCard) return

    const measure = () => {
      const styles = window.getComputedStyle(firstCard)
      const cardWidth = firstCard.getBoundingClientRect().width
      const marginLeft = Number.parseFloat(styles.marginLeft) || 0
      const marginRight = Number.parseFloat(styles.marginRight) || 0
      setStep(cardWidth + marginLeft + marginRight)
      setCenterOffset((viewport.getBoundingClientRect().width - cardWidth) / 2)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    return () => observer.disconnect()
  }, [slides.length])

  if (slides.length === 0) return null

  const previous = () => {
    if (slides.length > 1) {
      setTrackIndex((current) => current > 0 ? current - 1 : current)
    }
  }

  const next = () => {
    if (slides.length > 1) {
      setTrackIndex((current) =>
        current < slides.length + 1 ? current + 1 : current
      )
    }
  }

  const finishLoop = () => {
    let resetIndex: number | null = null
    if (trackIndex === 0) resetIndex = slides.length
    if (trackIndex === slides.length + 1) resetIndex = 1
    if (resetIndex === null) return

    setIsLoopReset(true)
    setTrackIndex(resetIndex)
    requestAnimationFrame(() => setIsLoopReset(false))
  }

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) {
      next()
    } else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) {
      previous()
    }
  }

  return (
    <div
      className={className}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Portfolio de imágenes que convierten"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') previous()
        if (event.key === 'ArrowRight') next()
      }}
    >
      <div ref={viewportRef} className="overflow-hidden py-3">
        <motion.div
          className="flex w-full cursor-grab items-center active:cursor-grabbing [touch-action:pan-y]"
          animate={{ x: centerOffset - trackIndex * step }}
          transition={
            reducedMotion || isLoopReset
              ? { duration: 0 }
              : { type: 'spring', stiffness: 280, damping: 32, mass: 0.55 }
          }
          drag={reducedMotion || slides.length < 2 ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
          onAnimationComplete={finishLoop}
        >
          {loopSlides.map((slide, index) => {
            const isClone = slides.length > 1 && (index === 0 || index === loopSlides.length - 1)
            const isActive = index === trackIndex

            return (
              <motion.article
                ref={index === 0 ? firstCardRef : undefined}
                key={`${slide.id}-${index}`}
                className="mx-1.5 aspect-square w-[86%] shrink-0 overflow-hidden rounded-2xl border bg-white sm:mx-2 sm:w-[56%] lg:w-[36%]"
                animate={{
                  scale: isActive ? 1 : 0.82,
                  opacity: isActive ? 1 : 0.42,
                  borderColor: isActive ? 'rgba(255,104,70,0.65)' : 'rgba(25,25,25,0.10)',
                  zIndex: isActive ? 2 : 1,
                }}
                transition={
                  reducedMotion || isLoopReset
                    ? { duration: 0 }
                    : { duration: 0.28 }
                }
                aria-hidden={isClone || undefined}
              >
                <div className="relative size-full bg-white">
                  <Image
                    src={withBasePath(slide.src)}
                    alt={isClone ? '' : slide.alt}
                    fill
                    sizes="(max-width: 639px) 86vw, (max-width: 1023px) 56vw, 36vw"
                    className="object-contain"
                    draggable={false}
                  />
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>

      <div className="mt-4 flex items-center justify-center px-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previous}
            aria-label="Ver creatividad anterior"
            className="flex size-11 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-[#ff6846] hover:text-[#ff6846] focus-visible:ring-2 focus-visible:ring-[#ff6846] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Ver siguiente creatividad"
            className="flex size-11 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-[#ff6846] hover:text-[#ff6846] focus-visible:ring-2 focus-visible:ring-[#ff6846] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        <p
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </p>
      </div>
    </div>
  )
}
