import { ArrowRight, Clock, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { ChriterioHeroSequence } from '@/components/chriterio-hero-sequence'
import { LinkButton } from '@/components/link-button'
import { CALENDLY_URL } from '@/lib/site'

export function Hero() {
  return (
    <>
      <ChriterioHeroSequence
        id="home-hero"
        eyebrow={
          <span className="text-[clamp(0.75rem,3vw,0.8125rem)] font-semibold tracking-widest text-electric uppercase [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            <span className="md:hidden">Consultoría Amazon para sellers</span>
            <span className="hidden md:inline">
              Consultoría Amazon con criterio de seller
            </span>
          </span>
        }
        headline={
          <h1 className="font-display font-bold tracking-tight text-white text-balance [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
            <span className="block text-[clamp(2.375rem,10vw,2.75rem)] leading-[1.05] md:hidden">
              Escala tu negocio en Amazon con una estrategia clara y
              rentable.
            </span>
            <span className="hidden text-4xl leading-[1.18] md:block md:text-[3.25rem]">
              Escala tu negocio en Amazon con estrategia, no a base de
              prueba y error.
            </span>
          </h1>
        }
        subtitle={
          <p className="text-white/85 text-pretty [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
            <span className="block text-[clamp(1.0625rem,4.5vw,1.1875rem)] leading-relaxed md:hidden">
              Analizamos qué frena tu crecimiento, detectamos oportunidades
              y definimos qué debes priorizar para avanzar.
            </span>
            <span className="hidden text-base leading-relaxed md:block md:text-lg">
              Analizamos qué está frenando tu crecimiento, detectamos
              oportunidades y definimos qué debes priorizar para avanzar con
              una estrategia clara y rentable.
            </span>
          </p>
        }
        ctaPrimary={
          <LinkButton
            href={CALENDLY_URL}
            external
            className="w-full justify-center py-4 text-base md:w-auto md:py-3.5 md:text-sm"
          >
            Solicitar auditoría gratuita
          </LinkButton>
        }
        ctaSecondary={
          <>
            {/* Mobile: a lightweight text link — it must not compete with the primary CTA. */}
            <Link
              href="/como-trabajo"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/75 underline-offset-4 transition-colors hover:text-white hover:underline md:hidden"
            >
              Ver cómo trabajamos
              <ArrowRight className="size-3.5" />
            </Link>
            <LinkButton
              href="/como-trabajo"
              variant="ghost-light"
              className="hidden md:inline-flex"
            >
              Descubrir cómo trabajamos
            </LinkButton>
          </>
        }
        microcopy={
          <p className="font-medium text-white/65">
            <span className="block text-[clamp(0.875rem,3.5vw,0.9375rem)] md:hidden">
              Sesión estratégica de 90–120 minutos · Sin compromiso
            </span>
            <span className="hidden text-sm md:block">
              Primera sesión estratégica sin coste · 90–120 minutos · Sin
              compromiso
            </span>
          </p>
        }
        cards={
          // Shown inside the hero on desktop only — on mobile the same two
          // cards live in <MobileBenefits> below, in their own section after
          // the hero instead of floating over the rocket.
          <div className="hidden flex-wrap items-stretch gap-3 md:flex md:flex-nowrap md:justify-end md:gap-4">
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

      <MobileBenefits />
    </>
  )
}

/** Mobile-only: the same two hero cards, moved into their own section right
 *  after the hero instead of floating over the rocket canvas. Desktop is
 *  unaffected — it keeps the cards inside the hero (see `cards` above). */
function MobileBenefits() {
  return (
    <section className="bg-navy-dark px-5 py-10 md:hidden">
      <div className="flex flex-col gap-4">
        <HeroCard icon={<Clock className="size-4" />}>
          <span className="text-sm font-medium text-white">
            Auditoría inicial gratuita
          </span>
          <span className="mt-0.5 block text-sm text-white/65">
            Sesión estratégica de 90–120 minutos
          </span>
        </HeroCard>

        <HeroCard icon={<ShieldCheck className="size-4" />}>
          <span className="text-sm font-medium text-white">
            Recomendación honesta
          </span>
          <span className="mt-0.5 block text-sm text-white/65">
            Solo te proponemos lo que realmente necesitas
          </span>
        </HeroCard>
      </div>
    </section>
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
