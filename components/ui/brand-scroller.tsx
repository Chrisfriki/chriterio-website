import Image from 'next/image'
import { cn } from '@/lib/utils'
import { withBasePath } from '@/lib/base-path'

export type Brand = {
  name: string
  logo: string
  width?: number
  height?: number
}

interface BrandScrollerProps {
  brands: Brand[]
  direction?: 'left' | 'right'
  duration?: number
  className?: string
}

// Below this count a looping marquee reads as padding, not motion — show a
// static centered row instead.
const MARQUEE_THRESHOLD = 5

export function BrandScroller({
  brands,
  direction = 'left',
  duration = 36,
  className,
}: BrandScrollerProps) {
  if (brands.length === 0) return null

  const shouldAnimate = brands.length >= MARQUEE_THRESHOLD
  const trackBrands = shouldAnimate ? [...brands, ...brands] : brands

  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      role="group"
      aria-label="Marcas que han trabajado con AMZ Creatives"
    >
      <div
        className={cn(
          'flex w-max items-center gap-12',
          shouldAnimate &&
            direction === 'left' &&
            'motion-safe:animate-brand-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center',
          shouldAnimate &&
            direction === 'right' &&
            'motion-safe:animate-brand-marquee-reverse motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center',
          !shouldAnimate && 'w-full flex-wrap justify-center'
        )}
        style={shouldAnimate ? { animationDuration: `${duration}s` } : undefined}
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
                className="max-h-8 w-auto max-w-[140px] object-contain opacity-70 grayscale brightness-0 invert transition-opacity duration-300 hover:opacity-100"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
