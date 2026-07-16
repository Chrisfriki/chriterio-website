'use client'

import { useId, useState } from 'react'
import { Reveal } from '@/components/reveal'
import type { ServiceArea } from '@/lib/data'
import { ServiceAreaCard } from './service-area-card'
import { ServiceAreaDetails } from './service-area-details'

interface ServicesSectionClientProps {
  areas: ServiceArea[]
  imageAvailability: Record<string, boolean>
}

export function ServicesSectionClient({
  areas,
  imageAvailability,
}: ServicesSectionClientProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const uid = useId()

  const toggle = (id: string) => setOpenId((current) => (current === id ? null : id))
  const openArea = areas.find((area) => area.id === openId) ?? null

  return (
    <section className="relative overflow-hidden bg-navy-dark">
      <div
        aria-hidden="true"
        className="starfield pointer-events-none absolute inset-0 opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[-10%] size-[28rem] rounded-full bg-electric/[0.07] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-10%] size-[24rem] rounded-full bg-electric/[0.06] blur-3xl"
      />

      <div className="relative px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            <Reveal className="md:max-w-md">
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                Áreas de trabajo
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance md:text-4xl">
                Todo lo que necesita una cuenta para crecer con dirección.
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="md:max-w-md">
              <p className="text-base leading-relaxed text-white/70 text-pretty">
                Organizamos nuestro trabajo en cuatro áreas estratégicas que
                conectan visibilidad, rentabilidad, expansión y toma de
                decisiones.
              </p>
            </Reveal>
          </div>

          {/* Mobile (<md): single column, each panel opens right below its
              own card so you never have to scroll past the other three to
              read what you just opened. */}
          <div className="mt-12 flex flex-col gap-5 md:hidden">
            {areas.map((area, i) => {
              const panelId = `${uid}-mobile-${area.id}`
              const isOpen = openId === area.id
              return (
                <Reveal key={area.id} delay={0.05 + i * 0.05}>
                  <ServiceAreaCard
                    area={area}
                    hasImage={imageAvailability[area.id] ?? false}
                    isOpen={isOpen}
                    onToggle={() => toggle(area.id)}
                    panelId={panelId}
                  />
                  <ServiceAreaDetails area={area} id={panelId} isOpen={isOpen} />
                </Reveal>
              )
            })}
          </div>

          {/* Tablet/desktop (>=md): all four cards in one row (two rows on
              md), one shared panel spanning the full row underneath —
              never inside a narrow column. */}
          <div className="mt-12 hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-4">
            {areas.map((area, i) => {
              const panelId = `${uid}-desktop-${area.id}`
              return (
                <Reveal key={area.id} delay={0.05 + i * 0.05}>
                  <ServiceAreaCard
                    area={area}
                    hasImage={imageAvailability[area.id] ?? false}
                    isOpen={openId === area.id}
                    onToggle={() => toggle(area.id)}
                    panelId={panelId}
                  />
                </Reveal>
              )
            })}
          </div>
          <div className="hidden md:block">
            {openArea && (
              <ServiceAreaDetails
                area={openArea}
                id={`${uid}-desktop-${openArea.id}`}
                isOpen={true}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
