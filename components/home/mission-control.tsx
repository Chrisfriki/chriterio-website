import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Coins, ListOrdered, Orbit } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { CLIENT_LOGOS, MISSION_MODULES } from '@/lib/data'
import { TEAM_TRAJECTORY_URL } from '@/lib/site'
import { withBasePath } from '@/lib/base-path'

const MODULE_ICONS = [Coins, Orbit, ListOrdered]

/**
 * The full post-hero space sequence: credibility strip -> "Control de
 * misión" -> AMZ Creatives connection. Kept as one continuous section (one
 * shared dark background + starfield) rather than three separate <section>s
 * so there's no hard seam between them, and so the hero's dark canvas hands
 * off into this section without a visible cut.
 */
export function MissionControl() {
  return (
    <section className="relative overflow-hidden bg-navy-dark">
      {/* Shared space backdrop for the whole section. The top blends from
          the hero canvas's exact background color (#050d1f) into the site's
          navy-dark token, so the hand-off from the hero reads as one
          continuous background instead of a cut. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050d1f] via-navy-dark to-navy-dark"
      />
      <div
        aria-hidden="true"
        className="starfield pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-32 size-[26rem] rounded-full bg-electric/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[34rem] -right-24 size-[22rem] rounded-full bg-electric/[0.08] blur-3xl"
      />
      {/* Faint decorative orbit ring, very slow spin — respects
          prefers-reduced-motion via motion-safe:. */}
      <div
        aria-hidden="true"
        className="motion-safe:chr-orbit-spin pointer-events-none absolute top-24 right-[8%] hidden size-[34rem] rounded-full border border-white/[0.06] md:block"
      />

      <div className="relative">
        <CredibilityStrip />
        <MissionControlCards />
        <AmzConnection />
      </div>
    </section>
  )
}

function CredibilityStrip() {
  return (
    <div className="border-b border-white/[0.08] px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <Reveal className="max-w-sm">
          <p className="text-sm font-medium text-white/80">
            Experiencia trabajando con sellers y marcas en Amazon
          </p>
          <p className="mt-1 text-xs text-white/45">
            Parte del equipo detrás de AMZ Creatives
          </p>
        </Reveal>

        <Reveal delay={0.08} className="w-full md:w-auto">
          {CLIENT_LOGOS.length > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 overflow-x-auto md:justify-end">
              {CLIENT_LOGOS.map((logo) => (
                <Image
                  key={logo.name}
                  src={withBasePath(logo.src)}
                  alt={logo.name}
                  width={120}
                  height={32}
                  className="h-6 w-auto shrink-0 opacity-60 grayscale transition-opacity hover:opacity-90 md:h-7"
                />
              ))}
            </div>
          ) : (
            // No real client logos yet — add them to CLIENT_LOGOS in
            // lib/data.ts (name + src under /public) and this placeholder
            // row is replaced automatically. Neutral marks only, on
            // purpose: never fabricate brand names/logos here.
            <div
              className="flex flex-wrap items-center justify-center gap-3"
              aria-hidden="true"
            >
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-7 w-20 shrink-0 rounded-md border border-white/10 bg-white/[0.03]"
                />
              ))}
            </div>
          )}
        </Reveal>
      </div>
    </div>
  )
}

function MissionControlCards() {
  return (
    <div className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-xs font-semibold tracking-widest text-electric uppercase">
              Control de misión
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white text-balance md:text-4xl">
              No analizamos tu negocio desde la teoría.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-white/70 text-pretty">
              Gestionamos cuentas propias en Amazon, con inventario,
              campañas y dinero real en juego. Por eso recomendamos lo que
              aplicaríamos en nuestro propio negocio.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 md:mt-16">
          {/* Trajectory line connecting the three modules — sits behind the
              cards, only visible through the gaps between them. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-11 z-0 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block"
          />

          <div className="relative z-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {MISSION_MODULES.map((module, i) => {
              const Icon = MODULE_ICONS[i]
              return (
                <Reveal key={module.tag} delay={0.1 + i * 0.08}>
                  <div className="group flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="relative flex size-1.5">
                          <span className="chr-pulse absolute inline-flex size-1.5 rounded-full bg-electric" />
                          <span className="relative inline-flex size-1.5 rounded-full bg-electric" />
                        </span>
                        <span className="text-xs font-semibold tracking-widest text-electric uppercase">
                          {module.tag}
                        </span>
                      </div>
                      <Icon className="size-5 text-white/35" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-bold tracking-tight text-white">
                      {module.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/60">
                      {module.desc}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function AmzConnection() {
  return (
    <div className="border-t border-white/[0.08] px-5 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <Reveal className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest text-electric uppercase">
              La experiencia no empieza hoy
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white text-balance md:text-3xl">
              Chriterio nace de una trayectoria real dentro de Amazon.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/65 text-pretty md:text-base">
              Somos parte del equipo detrás de AMZ Creatives, donde ya hemos
              trabajado junto a decenas de sellers y marcas. Ahora
              trasladamos esa experiencia con el mercado, el cliente y la
              conversión a la estrategia completa de una cuenta.
            </p>
            <Link
              href={TEAM_TRAJECTORY_URL}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-electric transition-colors hover:text-white"
            >
              Conocer nuestra trayectoria
              <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <Reveal
            delay={0.1}
            className="flex shrink-0 items-center rounded-2xl bg-white px-6 py-4"
          >
            <Image
              src={withBasePath('/amz-creatives-logo.png')}
              alt="AMZ Creatives"
              width={4773}
              height={713}
              className="h-6 w-auto md:h-7"
            />
          </Reveal>
        </div>
      </div>
    </div>
  )
}
