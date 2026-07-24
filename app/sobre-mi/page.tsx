import type { Metadata } from 'next'
import { LegacyAboutRedirect } from '@/components/legacy-about-redirect'

export const metadata: Metadata = {
  title: 'Sobre nosotros · CHRITERIO',
  robots: { index: false, follow: true },
}

export default function SobreMiLegacyPage() {
  return <LegacyAboutRedirect />
}
