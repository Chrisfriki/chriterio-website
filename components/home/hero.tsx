import { ChriterioHeroSequence } from '@/components/chriterio-hero-sequence'

export function Hero() {
  return (
    <ChriterioHeroSequence
      id="home-hero"
      headline={
        <h1 className="font-display text-[clamp(2.5rem,1.4rem+4.6vw,5.25rem)] leading-[1.05] font-semibold tracking-tight text-white text-balance [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
          Amazon no premia al que prueba más.
        </h1>
      }
      secondaryHeadline={
        <p className="font-display text-[clamp(2.5rem,1.4rem+4.6vw,5.25rem)] leading-[1.05] font-semibold tracking-tight text-white text-balance [text-shadow:0_2px_28px_rgba(0,0,0,0.55)]">
          Premia al que decide mejor.
        </p>
      }
      subtitle={
        <p className="text-white/75 text-pretty [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
          <span className="block text-[clamp(1.0625rem,0.95rem+0.6vw,1.375rem)] leading-relaxed">
            En CHRITERIO analizamos tu negocio con experiencia real como
            sellers, datos y una estrategia diseñada para crecer con
            rentabilidad.
          </span>
        </p>
      }
    />
  )
}
