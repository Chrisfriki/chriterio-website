import { CALENDLY_URL } from '@/lib/site'

export type PricingMode = 'commitment' | 'annual'

export type TierType = {
  id: string
  name: string
  description: string
  priceCommitment: string
  priceAnnual: string
  originalPriceCommitment?: string
  commitmentPriceNote: string
  annualPriceNote: string
  commitmentNote: string
  launchOffer?: boolean
  isPopular?: boolean
  popularLabel?: string
  popularNote?: string
  features: string[]
  executionNote?: string
  ctaLabel: string
  ctaHref: string
}

export const PRICING_TIERS: TierType[] = [
  {
    id: 'direccion-estrategica',
    name: 'Dirección estratégica',
    description:
      'Para marcas que necesitan criterio, análisis y seguimiento, pero cuentan con equipo o capacidad para ejecutar.',
    priceCommitment: '500 €',
    priceAnnual: '550 €',
    originalPriceCommitment: '600 €',
    commitmentPriceNote:
      '500 €/mes durante los primeros 3 meses. Después, 600 €/mes.',
    annualPriceNote: '6.600 € al año · equivalente a 1 mes incluido',
    commitmentNote: 'Permanencia mínima de 3 meses',
    launchOffer: true,
    features: [
      '4 sesiones estratégicas mensuales.',
      'App privada del cliente.',
      'Análisis periódico de la cuenta.',
      'Hoja de ruta y prioridades mensuales.',
      'Revisión de PPC, posicionamiento, conversión y rentabilidad.',
      'Seguimiento de avances.',
      'Soporte entre sesiones con límites definidos.',
      'Acceso a vídeos, recursos y newsletter.',
    ],
    executionNote: 'Tu equipo ejecuta las acciones definidas.',
    ctaLabel: 'Quiero dirección estratégica',
    ctaHref: CALENDLY_URL,
  },
  {
    id: 'gestion-integral',
    name: 'Gestión integral',
    description:
      'Para marcas que quieren delegar la gestión y que trabajemos directamente dentro de su cuenta de Amazon.',
    priceCommitment: '997 €',
    priceAnnual: '1.100 €',
    originalPriceCommitment: '1.200 €',
    commitmentPriceNote:
      '997 €/mes durante los primeros 3 meses. Después, 1.200 €/mes.',
    annualPriceNote: '13.200 € al año · equivalente a 1 mes incluido',
    commitmentNote: 'Permanencia mínima de 3 meses',
    launchOffer: true,
    isPopular: true,
    popularLabel: 'Más recomendado',
    popularNote: 'La opción más efectiva para delegar la ejecución.',
    features: [
      'Todo lo incluido en Dirección estratégica.',
      'Gestión directa desde Seller Central.',
      'Gestión y optimización continua de campañas PPC.',
      'Optimización de listings y contenido existente.',
      'Seguimiento de posicionamiento y conversión.',
      'Gestión de incidencias con Amazon.',
      'Preparación de promociones y lanzamientos.',
      'Ejecución semanal de las prioridades.',
      'Seguimiento continuo mediante la app privada.',
    ],
    ctaLabel: 'Quiero delegar mi cuenta',
    ctaHref: CALENDLY_URL,
  },
]
