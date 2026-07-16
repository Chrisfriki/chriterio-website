import Link from 'next/link'
import {
  ArrowRight,
  Target,
  Search,
  Images,
  ScanSearch,
  Telescope,
  CircleDollarSign,
  ScanEye,
  Route,
  Globe2,
  Rocket,
  MessagesSquare,
  Headphones,
  type LucideIcon,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SERVICE_CATALOG, type ServiceCatalogItem } from '@/lib/data'

const SERVICE_ICONS: Record<string, LucideIcon> = {
  ppc: Target,
  posicionamiento: Search,
  'contenido-visual': Images,
  auditoria: ScanSearch,
  'estudio-mercado': Telescope,
  rentabilidad: CircleDollarSign,
  competencia: ScanEye,
  crecimiento: Route,
  expansion: Globe2,
  lanzamientos: Rocket,
  mentoria: MessagesSquare,
  soporte: Headphones,
}

type Group = {
  label: string
  ids: string[]
}

// Purely a display grouping — every service still renders its own
// standalone card, this just clusters them under the four conceptual
// categories from the brief so 12 cards read as an organized catalog
// instead of one long undifferentiated grid.
const GROUPS: Group[] = [
  { label: 'Visibilidad y publicidad', ids: ['ppc', 'posicionamiento', 'contenido-visual'] },
  {
    label: 'Análisis y rentabilidad',
    ids: ['auditoria', 'estudio-mercado', 'rentabilidad', 'competencia'],
  },
  { label: 'Crecimiento y expansión', ids: ['crecimiento', 'expansion', 'lanzamientos'] },
  { label: 'Dirección estratégica', ids: ['mentoria', 'soporte'] },
]

export function ServiceCatalog() {
  const byId = new Map(SERVICE_CATALOG.map((service) => [service.id, service]))

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
          <div className="max-w-[820px]">
            <Reveal>
              <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                Servicios
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance md:text-4xl">
                Estrategia, ejecución y acompañamiento para crecer en Amazon.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-base leading-relaxed text-white/70 text-pretty">
                Trabajamos los puntos críticos de tu cuenta, desde la
                publicidad y la rentabilidad hasta el lanzamiento de
                productos, la expansión internacional y la toma de
                decisiones estratégicas.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 flex flex-col gap-12 md:mt-16 md:gap-14">
            {GROUPS.map((group, groupIndex) => (
              <div key={group.label}>
                <Reveal delay={0.05}>
                  <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">
                    {group.label}
                  </span>
                </Reveal>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {group.ids.map((id, i) => {
                    const service = byId.get(id)
                    if (!service) return null
                    return (
                      <Reveal key={id} delay={0.08 + (groupIndex * 3 + i) * 0.04}>
                        <ServiceItemCard service={service} />
                      </Reveal>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceItemCard({ service }: { service: ServiceCatalogItem }) {
  const Icon = SERVICE_ICONS[service.id]

  return (
    <div className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest text-electric uppercase">
          {service.tag}
        </span>
        {Icon && <Icon className="size-5 text-white/35" aria-hidden="true" />}
      </div>

      <div className="flex-1">
        <h3 className="font-display text-lg font-bold tracking-tight text-white">
          {service.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{service.desc}</p>
        {service.note && (
          <p className="mt-3 text-xs text-white/35">{service.note}</p>
        )}
      </div>

      <Link
        href={service.href}
        className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-electric transition-colors hover:text-white"
      >
        {service.cta}
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  )
}
