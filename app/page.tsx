import { Hero } from '@/components/home/hero'
import { TrustedBrands } from '@/components/home/trusted-brands'
import { MissionControl } from '@/components/home/mission-control'
import { ServicesSection } from '@/components/services/services-section'
import { CaseHighlight } from '@/components/home/case-highlight'
import { FinalCta } from '@/components/final-cta'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <div className="relative overflow-hidden bg-[#020817]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#050d1f] to-transparent"
        />
        <div
          aria-hidden="true"
          className="starfield pointer-events-none absolute inset-0 opacity-55"
        />
        <div className="relative">
          <ServicesSection />
          <TrustedBrands />
          <MissionControl />
          <CaseHighlight />
          <FinalCta className="bg-transparent" />
        </div>
      </div>
    </main>
  )
}
