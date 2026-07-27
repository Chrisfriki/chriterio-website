import { ChriterioHeroSequence } from '@/components/chriterio-hero-sequence'

export function Hero() {
  return (
    <ChriterioHeroSequence
      id="home-hero"
      headline={
        <h1 className="font-display text-[clamp(2.05rem,1.2rem+4.25vw,5.25rem)] leading-[1.02] font-semibold tracking-[-0.04em] text-balance text-white/80 [text-shadow:0_3px_22px_rgba(0,0,0,0.58)] sm:leading-[0.96] sm:tracking-[-0.055em]">
          <span className="block">Amazon no premia</span>
          <span className="block">a quien más prueba.</span>
        </h1>
      }
      secondaryHeadline={
        <p className="font-display text-[clamp(2.15rem,1.25rem+4.5vw,5.5rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-balance text-white [text-shadow:0_3px_22px_rgba(0,0,0,0.58)] sm:tracking-[-0.055em]">
          <span className="block">Premia a quien</span>
          <span className="-mb-[0.1em] block bg-gradient-to-r from-electric to-[#89a9ff] bg-clip-text pb-[0.1em] text-transparent drop-shadow-[0_0_18px_rgba(46,91,255,0.26)]">
            decide mejor.
          </span>
        </p>
      }
    />
  )
}
