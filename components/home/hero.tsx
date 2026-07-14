import { ChriterioHeroSequence } from '@/components/chriterio-hero-sequence'
import { LinkButton } from '@/components/link-button'
import { CALENDLY_URL } from '@/lib/site'

export function Hero() {
  return (
    <ChriterioHeroSequence
      id="home-hero"
      eyebrow={
        <span className="text-xs font-semibold tracking-widest text-electric uppercase">
          Consultoría Amazon con criterio de seller
        </span>
      }
      headline={
        <h1 className="font-display text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          Escala tu negocio en Amazon con estrategia, no a base de prueba y
          error.
        </h1>
      }
      subtitle={
        <p className="text-sm leading-relaxed text-white/70 text-pretty md:text-base">
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
        <p className="text-sm text-white/50">
          Primera sesión estratégica sin coste · 90–120 minutos · Sin
          compromiso
        </p>
      }
      cards={
        <div className="flex flex-wrap items-end gap-3 md:flex-nowrap md:justify-end md:gap-4">
          <HeroCard>
            <span className="text-sm font-medium text-white">
              Auditoría inicial gratuita
            </span>
            <span className="mt-1 block text-xs text-white/60 md:text-sm">
              Valor real desde la primera sesión.
            </span>
          </HeroCard>

          <HeroCard>
            <span className="text-sm font-medium text-white">
              Recomendación honesta
            </span>
            <span className="mt-1 block text-xs text-white/60 md:text-sm">
              Solo te proponemos lo que realmente necesitas.
            </span>
          </HeroCard>
        </div>
      }
    />
  )
}

function HeroCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`glass-card px-5 py-4 ${className}`}>{children}</div>
}
