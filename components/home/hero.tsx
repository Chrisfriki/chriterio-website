import { Clock, ShieldCheck } from 'lucide-react'
import { ChriterioHeroSequence } from '@/components/chriterio-hero-sequence'
import { LinkButton } from '@/components/link-button'
import { CALENDLY_URL } from '@/lib/site'

export function Hero() {
  return (
    <ChriterioHeroSequence
      id="home-hero"
      eyebrow={
        <span className="text-xs font-semibold tracking-widest text-electric uppercase [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
          Consultoría Amazon con criterio de seller
        </span>
      }
      headline={
        <h1 className="font-display text-3xl leading-[1.18] font-bold tracking-tight text-white text-balance [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-4xl md:text-[3.25rem]">
          Escala tu negocio en Amazon con estrategia, no a base de prueba y
          error.
        </h1>
      }
      subtitle={
        <p className="text-base leading-relaxed text-white/85 text-pretty [text-shadow:0_1px_16px_rgba(0,0,0,0.5)] md:text-lg">
          Analizamos qué está frenando tu crecimiento, detectamos
          oportunidades y definimos qué debes priorizar para avanzar con una
          estrategia clara y rentable.
        </p>
      }
      ctaPrimary={
        <LinkButton href={CALENDLY_URL} external>
          Solicitar auditoría gratuita
        </LinkButton>
      }
      ctaSecondary={
        <LinkButton href="/como-trabajo" variant="ghost-light">
          Descubrir cómo trabajamos
        </LinkButton>
      }
      microcopy={
        <p className="text-sm font-medium text-white/65">
          Primera sesión estratégica sin coste · 90–120 minutos · Sin
          compromiso
        </p>
      }
      cards={
        <div className="flex flex-wrap items-stretch gap-3 md:flex-nowrap md:justify-end md:gap-4">
          <HeroCard icon={<Clock className="size-4" />}>
            <span className="text-sm font-medium text-white">
              Auditoría inicial gratuita
            </span>
            <span className="mt-0.5 block text-xs text-white/60 md:text-sm">
              Sesión estratégica de 90–120 minutos
            </span>
          </HeroCard>

          <HeroCard icon={<ShieldCheck className="size-4" />}>
            <span className="text-sm font-medium text-white">
              Recomendación honesta
            </span>
            <span className="mt-0.5 block text-xs text-white/60 md:text-sm">
              Solo te proponemos lo que realmente necesitas
            </span>
          </HeroCard>
        </div>
      }
    />
  )
}

function HeroCard({
  children,
  icon,
  className = '',
}: {
  children: React.ReactNode
  icon: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`glass-card flex min-w-[15rem] items-start gap-3 px-5 py-4 transition-colors duration-200 hover:border-white/25 ${className}`}
    >
      <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-electric/15 text-electric ring-1 ring-electric/25">
        {icon}
      </span>
      <div>{children}</div>
    </div>
  )
}
