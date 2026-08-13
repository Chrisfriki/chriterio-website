import { CALENDLY_URL } from '@/lib/site'

export type TierType = {
  id: string
  name: string
  description: string
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
    features: [
      '4 sesiones estratégicas mensuales.',
      'App privada, vídeos, recursos y newsletter.',
      'Análisis periódico y hoja de ruta mensual.',
      'Revisión de PPC, conversión y rentabilidad.',
      'Seguimiento de prioridades y avances.',
      'Soporte entre sesiones con límites definidos.',
      'Formación del equipo encargado para que pueda ejecutar con criterio, orden y autonomía.',
    ],
    executionNote: 'Tu equipo ejecuta las acciones definidas.',
    ctaLabel: 'Agendar reunión',
    ctaHref: CALENDLY_URL,
  },
  {
    id: 'gestion-integral',
    name: 'Gestión integral',
    description:
      'Para marcas que quieren delegar la gestión y que trabajemos directamente dentro de su cuenta de Amazon.',
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
    ctaLabel: 'Agendar reunión',
    ctaHref: CALENDLY_URL,
  },
]
