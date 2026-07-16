'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { LinkButton } from '@/components/link-button'
import { CALENDLY_URL } from '@/lib/site'
import { cn } from '@/lib/utils'
import type { ServiceArea } from '@/lib/data'
import { SERVICE_ICONS } from './service-icons'

interface ServiceAreaDetailsProps {
  area: ServiceArea
  id: string
  isOpen: boolean
}

/** The glass panel a card expands into. Rendered by both the mobile (inline,
 *  right after its own card) and desktop/tablet (shared, after the row of
 *  cards) layouts in <ServicesSectionClient> — each caller passes its own
 *  `id` so the two instances never collide, and only one is ever mounted
 *  with `isOpen` true at a time regardless of breakpoint. */
export function ServiceAreaDetails({ area, id, isOpen }: ServiceAreaDetailsProps) {
  const gridCols =
    area.services.length === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          id={id}
          role="region"
          aria-label={area.title}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/12 bg-navy-dark/70 p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.75)] backdrop-blur-xl md:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-20 right-[-4rem] size-72 rounded-full bg-electric/10 blur-3xl"
            />

            <div className="relative">
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                {area.eyebrow}
              </span>
              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white text-balance md:text-3xl">
                {area.title}
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 text-pretty md:text-base">
                {area.introduction}
              </p>

              <div className={cn('mt-8 grid gap-5', gridCols)}>
                {area.services.map((service) => {
                  const Icon = SERVICE_ICONS[service.id]
                  return (
                    <div
                      key={service.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <div className="flex items-center gap-2.5">
                        {Icon && (
                          <Icon className="size-4 text-electric" aria-hidden="true" />
                        )}
                        <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                          {service.eyebrow}
                        </span>
                      </div>
                      <h4 className="mt-3 font-display text-base font-bold tracking-tight text-white">
                        {service.title}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {service.description}
                      </p>
                      {service.note && (
                        <p className="mt-3 text-xs text-white/35">{service.note}</p>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 md:mt-10">
                <LinkButton href={CALENDLY_URL} external className="px-6 py-3 text-sm">
                  Solicitar una auditoría
                </LinkButton>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
