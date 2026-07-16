import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { withBasePath } from '@/lib/base-path'
import type { ServiceArea } from '@/lib/data'

interface ServiceAreaCardProps {
  area: ServiceArea
  hasImage: boolean
  isOpen: boolean
  onToggle: () => void
  panelId: string
  className?: string
}

/** Large vertical "programme card" — the area's own toggle button. Semantic
 *  <button> (not a div+onClick) so it's keyboard- and screen-reader-
 *  accessible by default, with aria-expanded/aria-controls wiring the visual
 *  state to the panel it opens. */
export function ServiceAreaCard({
  area,
  hasImage,
  isOpen,
  onToggle,
  panelId,
  className,
}: ServiceAreaCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-controls={panelId}
      className={cn(
        'group relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-3xl text-left shadow-[0_20px_45px_-20px_rgba(0,0,0,0.65)] transition-transform duration-300 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark',
        isOpen
          ? 'ring-2 ring-electric/70'
          : 'ring-1 ring-white/12 hover:ring-white/25',
        className,
      )}
    >
      {hasImage ? (
        <Image
          src={withBasePath(area.image)}
          alt=""
          fill
          sizes="(min-width: 1280px) 24vw, (min-width: 768px) 46vw, 90vw"
          style={{ objectPosition: area.imagePosition ?? 'center' }}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        // No photo dropped in yet for this area — a coherent dark fallback
        // instead of a broken image. See lib/data.ts for the expected path.
        <div
          aria-hidden="true"
          className="starfield absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-[#050d1f] opacity-90"
        />
      )}

      {/* Darken the photo a touch everywhere, then reinforce top (tags) and
          bottom (title) with their own gradients for legibility. */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/20" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/92 via-black/55 to-transparent"
      />

      <div className="relative z-10 flex flex-wrap items-center gap-2 p-5">
        <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase backdrop-blur-md">
          {area.countLabel}
        </span>
        <span className="inline-flex items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase backdrop-blur-md">
          {area.eyebrow}
        </span>
      </div>

      <div className="relative z-10 flex flex-col gap-3 p-5">
        <h3 className="font-display text-xl font-bold tracking-tight text-white text-balance md:text-2xl">
          {area.title}
        </h3>
        {area.shortDescription && (
          <p className="text-sm text-white/70 text-pretty">{area.shortDescription}</p>
        )}
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
          Ver servicios
          <ChevronDown
            className={cn(
              'size-4 transition-transform duration-300 ease-out',
              isOpen && 'rotate-180',
            )}
            aria-hidden="true"
          />
        </span>
      </div>
    </button>
  )
}
