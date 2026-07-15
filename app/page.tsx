import { Hero } from '@/components/home/hero'
import { TrustedBrands } from '@/components/home/trusted-brands'
import { MissionControl } from '@/components/home/mission-control'
import { ServicesPreview } from '@/components/home/services-preview'
import { CaseHighlight } from '@/components/home/case-highlight'
import { FinalCta } from '@/components/final-cta'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustedBrands />
      <MissionControl />
      <ServicesPreview />
      <CaseHighlight />
      <FinalCta />
    </main>
  )
}
