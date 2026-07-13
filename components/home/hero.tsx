import { ChriterioHeroSequence } from '@/components/chriterio-hero-sequence'
import { LinkButton } from '@/components/link-button'
import { CALENDLY_URL, WHATSAPP_URL } from '@/lib/site'

const H1_LINES = ['¿Vendes en Amazon', 'y no sabes por qué no despegas?']

export function Hero() {
  return (
    <ChriterioHeroSequence
      id="home-hero"
      headline={
        <div>
          <h1 className="font-display text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            {H1_LINES.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70 text-pretty md:text-base">
            Analizo tu cuenta, detecto qué frena tus ventas y convierto los
            datos en un plan de acción claro.
          </p>
        </div>
      }
      actions={
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <LinkButton href={CALENDLY_URL} external>
            Reserva una llamada gratis de 15 min
          </LinkButton>
          <LinkButton href={WHATSAPP_URL} external variant="ghost-light">
            Escríbeme por WhatsApp
          </LinkButton>
        </div>
      }
      cards={
        <div className="flex flex-wrap items-end gap-3 md:flex-nowrap md:justify-end md:gap-4">
          <HeroCard>
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-2.5 shrink-0">
                <span className="chr-pulse absolute inline-flex size-2.5 rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm font-medium text-white">
                Seller activo
                <span className="block text-xs font-normal text-white/60">
                  Amazon.es
                </span>
              </span>
            </div>
          </HeroCard>

          <HeroCard featured>
            <span className="font-display text-3xl font-bold text-navy md:text-4xl">
              7 días
            </span>
            <span className="mt-1 block text-xs text-navy/60 md:text-sm">
              De análisis a plan de acción
            </span>
          </HeroCard>

          <HeroCard className="hidden sm:block">
            <span className="font-display text-2xl font-bold text-white md:text-3xl">
              5–7 causas
            </span>
            <span className="mt-1 block text-xs text-white/60 md:text-sm">
              Priorizadas, sin humo
            </span>
          </HeroCard>
        </div>
      }
      bar={
        <div className="hidden items-center gap-3 md:flex">
          <div className="h-px flex-1 bg-white/20" />
          <span className="size-1 rounded-full bg-white/40" />
          <div className="h-px w-16 bg-white/20" />
          <span className="size-1 rounded-full bg-white/40" />
          <div className="h-px w-16 bg-white/20" />
        </div>
      }
    />
  )
}

function HeroCard({
  children,
  featured = false,
  className = '',
}: {
  children: React.ReactNode
  featured?: boolean
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl px-5 py-4 ${
        featured
          ? 'bg-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.45)] md:-translate-y-2 md:px-6 md:py-5'
          : 'glass-card'
      } ${className}`}
    >
      {children}
    </div>
  )
}
