'use client'

import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { useRef, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { withBasePath } from '@/lib/base-path'

export type Brand = {
  name: string
  logo: string
  width?: number
  height?: number
  href?: string
  ariaLabel?: string
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
  variant?: 'default' | 'amz'
  onBrandClick?: (brand: Brand) => void
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
  variant = 'default',
  onBrandClick,
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
          'flex w-max items-center',
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

          const content = (
            <>
              <Image
                src={withBasePath(brand.logo)}
                alt={isDuplicate ? '' : `Logo de ${brand.name}`}
                width={brand.width ?? 120}
                height={brand.height ?? 36}
                className={cn(
                  'w-auto object-contain transition-opacity duration-300',
                  variant === 'default' &&
                    'max-h-14 max-w-[190px] opacity-80 hover:opacity-100 md:max-h-16 md:max-w-[230px]',
                  variant === 'amz' &&
                    'max-h-16 max-w-[150px] brightness-0 md:max-h-20 md:max-w-[190px]'
                )}
              />
              {variant === 'amz' && brand.href && (
                <ExternalLink
                  className="absolute top-4 right-4 size-3.5 text-black/35 transition-colors group-hover:text-[#ff6846]"
                  aria-hidden="true"
                />
              )}
            </>
          )

          const itemClassName = cn(
            'relative flex shrink-0 items-center justify-center',
            variant === 'default' && 'mx-7 h-20 px-4 md:mx-10 md:h-24 md:px-5',
            variant === 'amz' &&
              'group mx-2 h-32 w-[210px] rounded-2xl border border-black/10 bg-white/65 px-7 shadow-[0_12px_40px_rgba(25,25,25,0.04)] md:mx-3 md:h-36 md:w-[260px] md:px-9',
            variant === 'amz' && brand.href &&
              'transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-[#ff6846]/60 focus-visible:ring-2 focus-visible:ring-[#ff6846] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f0eb] focus-visible:outline-none',
            isDuplicate && 'motion-reduce:hidden'
          )

          return brand.href ? (
            <a
              key={`${brand.name}-${index}`}
              href={brand.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isDuplicate ? undefined : brand.ariaLabel}
              aria-hidden={isDuplicate || undefined}
              tabIndex={isDuplicate ? -1 : undefined}
              className={itemClassName}
              onClick={() => onBrandClick?.(brand)}
            >
              {content}
            </a>
          ) : (
            <div
              key={`${brand.name}-${index}`}
              className={itemClassName}
              aria-hidden={isDuplicate || undefined}
            >
              {content}
            </div>
          )
        })}
      </div>
    </div>
  )
}
