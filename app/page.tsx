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
      <TrustedBrands />
      <MissionControl />
      <ServicesSection />
      <CaseHighlight />
      <FinalCta />
    </main>
  )
}
