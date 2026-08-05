'use client'

import Image from 'next/image'
import { GripVertical } from 'lucide-react'
import { useState } from 'react'
import { withBasePath } from '@/lib/base-path'
import { cn } from '@/lib/utils'

export function BeforeAfterComparison({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  className,
}: {
  beforeSrc: string
  beforeAlt: string
  afterSrc: string
  afterAlt: string
  className?: string
}) {
  const [position, setPosition] = useState(50)

  return (
    <div
      className={cn(
        'relative aspect-square w-full overflow-hidden rounded-[1.75rem] border border-white/14 bg-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-electric has-[:focus-visible]:ring-offset-4 has-[:focus-visible]:ring-offset-[#020817]',
        className,
      )}
    >
      <Image
        src={withBasePath(afterSrc)}
        alt={afterAlt}
        fill
        sizes="(max-width: 767px) calc(100vw - 2.5rem), 48rem"
        className="object-cover"
      />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden="true"
      >
        <Image
          src={withBasePath(beforeSrc)}
          alt={beforeAlt}
          fill
          sizes="(max-width: 767px) calc(100vw - 2.5rem), 48rem"
          className="object-cover"
        />
      </div>

      <span className="absolute top-4 left-4 rounded-full bg-[#07172f]/90 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase backdrop-blur-sm md:top-6 md:left-6">
        Antes
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-electric px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white uppercase md:top-6 md:right-6">
        Después
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white/85 shadow-[0_0_12px_rgba(0,0,0,0.3)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#07172f] text-white shadow-lg md:size-12">
          <GripVertical className="size-5" />
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Comparar la imagen principal anterior con la imagen optimizada"
        className="absolute inset-0 z-20 size-full cursor-ew-resize opacity-0 [touch-action:pan-y]"
      />
    </div>
  )
}
