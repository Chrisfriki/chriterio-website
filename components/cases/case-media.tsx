import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { withBasePath } from '@/lib/base-path'
import { cn } from '@/lib/utils'

export function CaseMedia({
  src,
  alt,
  placeholder,
  className,
  imageClassName,
  caption,
}: {
  src: string
  alt: string
  placeholder: string
  className?: string
  imageClassName?: string
  caption?: string
}) {
  const exists = fs.existsSync(path.join(process.cwd(), 'public', src))

  return (
    <figure className={cn('relative', className)}>
      <div className="relative h-full min-h-64 overflow-hidden rounded-[1.75rem] border border-white/14 bg-white/[0.035]">
        {exists ? (
          <Image
            src={withBasePath(src)}
            alt={alt}
            fill
            sizes="(max-width: 767px) calc(100vw - 2.5rem), 50vw"
            className={cn(
              'object-cover transition-transform duration-700 motion-reduce:transition-none',
              imageClassName,
            )}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center border border-dashed border-white/16 p-8 text-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:36px_36px]"
            />
            <div className="relative flex max-w-xs flex-col items-center">
              <span className="flex size-12 items-center justify-center rounded-full border border-electric/25 bg-electric/10 text-[#91a9ff]">
                <ImageIcon className="size-5" aria-hidden="true" />
              </span>
              <span className="mt-4 text-xs font-semibold tracking-wide text-white/50">
                {placeholder}
              </span>
            </div>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs leading-relaxed text-white/38">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
