import { CALENDLY_URL } from '@/lib/site'

export type TierType = {
  id: string
  name: string
  description: string
  price: string
  originalPrice?: string
  priceNote: string
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
    price: '500 €',
    originalPrice: '600 €',
    priceNote:
      '500 €/mes durante los primeros 3 meses. Después, 600 €/mes.',
    commitmentNote: 'Permanencia mínima de 3 meses',
    launchOffer: true,
    features: [
      '4 sesiones estratégicas mensuales.',
      'App privada, vídeos, recursos y newsletter.',
      'Análisis periódico y hoja de ruta mensual.',
      'Revisión de PPC, conversión y rentabilidad.',
      'Seguimiento de prioridades y avances.',
      'Soporte entre sesiones con límites definidos.',
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
    price: '997 €',
    originalPrice: '1.200 €',
    priceNote:
      '997 €/mes durante los primeros 3 meses. Después, 1.200 €/mes.',
    commitmentNote: 'Permanencia mínima de 3 meses',
    launchOffer: true,
    isPopular: true,
    popularLabel: 'Más eficiente',
    popularNote: 'La opción más efectiva para delegar la ejecución.',
    features: [
      'Todo lo incluido en Dirección estratégica.',
      'Gestión y ejecución directa en Seller Central.',
      'Optimización continua de campañas PPC.',
      'Optimización de listings y contenido existente.',
      'Seguimiento de posicionamiento y conversión.',
      'Incidencias, promociones y lanzamientos.',
    ],
    ctaLabel: 'Quiero delegar mi cuenta',
    ctaHref: CALENDLY_URL,
  },
]
