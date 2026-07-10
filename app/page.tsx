import { Hero } from '@/components/home/hero'
import { SellerReal } from '@/components/home/seller-real'
import { ServicesPreview } from '@/components/home/services-preview'
import { CaseHighlight } from '@/components/home/case-highlight'
import { FinalCta } from '@/components/final-cta'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SellerReal />
      <ServicesPreview />
      <CaseHighlight />
      <FinalCta />
    </main>
  )
}
