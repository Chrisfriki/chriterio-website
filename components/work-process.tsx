import Image from 'next/image'
import {
  ArrowDownRight,
  BarChart3,
  Check,
  RefreshCw,
  Route,
  Search,
  Target,
  Users,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { ANALYSIS_AREAS, WORK_PHASES, type WorkPhase } from '@/lib/work-process'
import { withBasePath } from '@/lib/base-path'
import { cn } from '@/lib/utils'

function ProcessVisual({
  phase,
  variant,
}: {
  phase: WorkPhase
  variant: 'roadmap' | 'review'
}) {
  if (phase.image) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-white/[0.045] shadow-[0_28px_90px_-45px_rgba(46,91,255,0.55)]">
        <div
          className={cn(
            'relative',
            phase.image.aspect === 'portrait'
              ? 'aspect-[2/3]'
              : 'aspect-[3/2]',
          )}
        >
          <Image
            src={withBasePath(phase.image.src)}
            alt={phase.image.alt}
            fill
            sizes="(max-width: 767px) calc(100vw - 2.5rem), 45vw"
            className="object-cover"
            style={{ objectPosition: phase.image.position }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06142b]/85 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/12 bg-[#06142b]/75 px-5 py-4 backdrop-blur-md">
            <p className="text-[10px] font-bold tracking-[0.18em] text-electric uppercase">
              {phase.image.eyebrow}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {phase.image.caption}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'roadmap') {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[#07172f]/80 p-6 shadow-[0_28px_90px_-45px_rgba(46,91,255,0.5)] md:p-8">
        <div className="absolute -top-20 -left-16 size-52 rounded-full bg-electric/12 blur-3xl" />
        <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] font-bold tracking-[0.18em] text-electric uppercase">
              Hoja de ruta
            </p>
            <p className="mt-2 font-display text-2xl font-bold text-white">
              Próximos 3 meses
            </p>
          </div>
          <Route className="size-7 text-white/35" aria-hidden="true" />
        </div>
        <div className="relative mt-7 space-y-4">
          {[
            ['01', 'Prioridades'],
            ['02', 'Objetivos'],
            ['03', 'Responsables'],
            ['04', 'Métricas'],
          ].map(([number, label]) => (
            <div
              key={number}
              className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3.5"
            >
              <span className="font-display text-xs font-bold text-electric">
                {number}
              </span>
              <span className="text-sm text-white/65">{label}</span>
              <Check className="ml-auto size-4 text-white/25" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/14 bg-[#07172f]/80 p-6 shadow-[0_28px_90px_-45px_rgba(46,91,255,0.5)] md:p-8">
      <div className="absolute -right-16 -bottom-20 size-52 rounded-full bg-electric/12 blur-3xl" />
      <div className="relative flex items-center gap-4">
        <span className="flex size-12 items-center justify-center rounded-full border border-electric/25 bg-electric/10 text-electric">
          <RefreshCw className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] text-electric uppercase">
            Ciclo de mejora
          </p>
          <p className="mt-1 font-display text-xl font-bold text-white">
            Medir. Revisar. Ajustar.
          </p>
        </div>
      </div>
      <div className="relative mt-8 grid grid-cols-3 gap-3">
        {[
          { value: '01', label: 'Avances' },
          { value: '02', label: 'Bloqueos' },
          { value: '03', label: 'Ajustes' },
        ].map((item) => (
          <div
            key={item.value}
            className="rounded-2xl border border-white/10 bg-white/[0.035] px-3 py-5 text-center"
          >
            <p className="font-display text-xl font-bold text-white/85">
              {item.value}
            </p>
            <p className="mt-2 text-[10px] text-white/42">{item.label}</p>
          </div>
        ))}
      </div>
      <div className="relative mt-5 h-24 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.025] p-4">
        <div className="flex h-full items-end gap-2">
          {[35, 52, 44, 68, 61, 82, 76, 92].map((height, index) => (
            <span
              key={`${height}-${index}`}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-electric/25 to-electric/70"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function AnalysisGrid() {
  const icons = [
    Search,
    ArrowDownRight,
    Target,
    Search,
    BarChart3,
    Target,
    BarChart3,
    Users,
    Route,
  ]

  return (
    <section className="relative border-y border-white/8 bg-white/[0.025] px-5 py-20 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <span className="text-xs font-semibold tracking-widest text-electric uppercase">
            Antes de decidir
          </span>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-tight text-white text-balance md:text-5xl">
            Qué analizamos antes de empezar
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ANALYSIS_AREAS.map((area, index) => {
            const Icon = icons[index]
            return (
              <Reveal key={area} delay={index * 0.035}>
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-[#07172f]/65 px-4 py-4 backdrop-blur-md">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-electric/20 bg-electric/8 text-[#86a0ff]">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-white/72">{area}</span>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function WorkProcess() {
  return (
    <div>
      {WORK_PHASES.map((phase, index) => {
        const isReversed = index % 2 === 1
        const visualVariant = index === 1 ? 'roadmap' : 'review'

        return (
          <div key={phase.number}>
            <section className="relative px-5 py-20 md:px-8 md:py-28">
              <div
                className={cn(
                  'mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20',
                )}
              >
                <Reveal
                  className={cn(
                    'min-w-0',
                    isReversed && 'lg:order-2',
                  )}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-display text-5xl font-bold leading-none text-electric md:text-6xl">
                      {phase.number}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-electric/50 to-transparent" />
                  </div>
                  <h2 className="mt-7 max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance md:text-5xl">
                    {phase.title}
                  </h2>
                  <div className="mt-6 flex max-w-xl flex-col gap-4">
                    {phase.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-relaxed text-white/60 text-pretty md:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {phase.modes && (
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {phase.modes.map((mode, modeIndex) => (
                        <div
                          key={mode.title}
                          className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex size-7 items-center justify-center rounded-full bg-electric/10 text-[10px] font-bold text-electric">
                              {modeIndex + 1}
                            </span>
                            <h3 className="font-display text-base font-bold text-white">
                              {mode.title}
                            </h3>
                          </div>
                          <p className="mt-4 text-xs leading-relaxed text-white/52">
                            {mode.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Reveal>

                <Reveal
                  delay={0.08}
                  className={cn(
                    'min-w-0',
                    isReversed && 'lg:order-1',
                  )}
                >
                  <ProcessVisual phase={phase} variant={visualVariant} />
                </Reveal>
              </div>
            </section>

            {index === 0 && <AnalysisGrid />}
          </div>
        )
      })}
    </div>
  )
}
