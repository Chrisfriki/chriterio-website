import { Hero } from '@/components/home/hero'
import { MissionControl } from '@/components/home/mission-control'
import { ServicesPreview } from '@/components/home/services-preview'
import { CaseHighlight } from '@/components/home/case-highlight'
import { FinalCta } from '@/components/final-cta'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <MissionControl />
      <ServicesPreview />
      <CaseHighlight />
      <FinalCta />
    </main>
  )
}
