import { ChriterioHeroSequence } from '@/components/chriterio-hero-sequence'

export function Hero() {
  return (
    <ChriterioHeroSequence
      id="home-hero"
      headline={
        <h1 className="font-display text-[clamp(2.35rem,1.3rem+4.7vw,5.25rem)] leading-[0.96] font-semibold tracking-[-0.045em] text-white/80 [text-shadow:0_3px_22px_rgba(0,0,0,0.58)] sm:tracking-[-0.055em]">
          <span className="block">
            Amazon no premia
            <br className="hidden sm:block" />
            al que prueba más.
          </span>
        </h1>
      }
      secondaryHeadline={
        <p className="font-display text-[clamp(2.5rem,1.4rem+4.8vw,5.5rem)] leading-[1.04] font-semibold tracking-[-0.045em] text-white [text-shadow:0_3px_22px_rgba(0,0,0,0.58)] sm:tracking-[-0.055em]">
          <span className="block">
            Premia al que
            <br className="hidden sm:block" />
            <span className="-mb-[0.1em] inline-block bg-gradient-to-r from-electric to-[#89a9ff] bg-clip-text pb-[0.1em] text-transparent whitespace-nowrap drop-shadow-[0_0_18px_rgba(46,91,255,0.26)]">
              decide mejor.
            </span>
          </span>
        </p>
      }
    />
  )
}
