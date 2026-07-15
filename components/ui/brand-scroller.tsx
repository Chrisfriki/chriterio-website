'use client'

import Image from 'next/image'
import { useRef, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { withBasePath } from '@/lib/base-path'

export type Brand = {
  name: string
  logo: string
  width?: number
  height?: number
}

// `logo` must already be a white-ink-on-transparent PNG/SVG — this component
// only applies opacity, it doesn't recolor. A CSS filter (grayscale +
// brightness-0 + invert) was tried here previously and looked fine on simple
// single-tone logos, but silently destroyed any two-tone "badge" logo (solid
// fill + same-color cutout text), since both regions collapse to identical
// pixels once the filter runs. Pre-processing each logo per-file avoids that
// failure mode entirely.

interface BrandScrollerProps {
  brands: Brand[]
  direction?: 'left' | 'right'
  duration?: number
  className?: string
}

// Below this count a looping marquee reads as padding, not motion — show a
// static centered row instead.
const MARQUEE_THRESHOLD = 5

// How much slower the loop runs while hovered (1 = no change).
const HOVER_PLAYBACK_RATE = 0.35

export function BrandScroller({
  brands,
  direction = 'left',
  duration = 56,
  className,
}: BrandScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  if (brands.length === 0) return null

  const shouldAnimate = brands.length >= MARQUEE_THRESHOLD
  const trackBrands = shouldAnimate ? [...brands, ...brands] : brands

  // Slowing the marquee on hover via animation-duration (CSS-only) causes a
  // visible jump: an infinite CSS animation's position is elapsed-time mod
  // duration, so changing the duration mid-flight re-maps that same elapsed
  // time onto a different point in the cycle. Scaling playbackRate on the
  // already-running Web Animations API instance instead changes speed from
  // the exact current position, with no jump and no second animation.
  const setPlaybackRate = (rate: number) => {
    trackRef.current?.getAnimations().forEach((animation) => {
      animation.playbackRate = rate
    })
  }

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      role="group"
      aria-label="Marcas que han trabajado con AMZ Creatives"
      onMouseEnter={() => setPlaybackRate(HOVER_PLAYBACK_RATE)}
      onMouseLeave={() => setPlaybackRate(1)}
    >
      <div
        ref={trackRef}
        className={cn(
          'flex w-max items-center gap-12',
          shouldAnimate &&
            direction === 'left' &&
            'motion-safe:chr-brand-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center',
          shouldAnimate &&
            direction === 'right' &&
            'motion-safe:chr-brand-marquee-reverse motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center',
          !shouldAnimate && 'w-full flex-wrap justify-center'
        )}
        style={
          shouldAnimate
            ? ({ '--chr-marquee-duration': `${duration}s` } as CSSProperties)
            : undefined
        }
      >
        {trackBrands.map((brand, index) => {
          // The second copy exists only so the marquee loop has no seam; it's
          // hidden from assistive tech (and from the DOM entirely once motion
          // is reduced, since the row no longer scrolls).
          const isDuplicate = shouldAnimate && index >= brands.length

          return (
            <div
              key={`${brand.name}-${index}`}
              className={cn(
                'flex h-10 shrink-0 items-center justify-center px-3',
                isDuplicate && 'motion-reduce:hidden'
              )}
              aria-hidden={isDuplicate || undefined}
            >
              <Image
                src={withBasePath(brand.logo)}
                alt={isDuplicate ? '' : brand.name}
                width={brand.width ?? 120}
                height={brand.height ?? 36}
                className="max-h-8 w-auto max-w-[140px] object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
