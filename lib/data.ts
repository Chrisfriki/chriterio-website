import type { Brand } from '@/components/ui/brand-scroller'
import { AMZ_CREATIVE_PROJECTS } from '@/lib/amz-creative-projects'

export type Service = {
  id: string
  name: string
  price: string
  priceNote: string
  audience: string
  features: string[]
  cta: string
  featured?: boolean
  badge?: string
}

export const SERVICES: Service[] = [
  {
    id: 'diagnostico',
    name: 'Diagnóstico de cuenta',
    price: '390€',
    priceNote: 'entrega en 7 días',
    audience: 'Para quien vende pero no sabe por qué no crece',
    features: [
      'Análisis de listings, PPC, keywords y competencia',
      'PDF con las 5-7 causas priorizadas',
      'Plan de acción paso a paso',
      '50% al encargar, 50% al entregar',
    ],
    cta: 'Quiero mi diagnóstico',
    featured: true,
    badge: 'Más pedido',
  },
  {
    id: 'sesiones',
    name: 'Sesiones de trabajo 1:1',
    price: '150€/hora',
    priceNote: 'pack 4 sesiones: 450€',
    audience: 'Para quien quiere gestionar su cuenta él mismo, con criterio',
    features: [
      'Sesión en directo sobre tu cuenta',
      'Sales sabiendo exactamente qué tocar',
      'Sin compromiso continuo',
    ],
    cta: 'Reservar sesión',
  },
]

export const FAQS = [
  {
    q: '¿Qué necesito darte para empezar?',
    a: 'Acceso de lectura a tu Seller Central (o capturas de las secciones clave) y un contexto breve de tu producto y objetivos. Con eso arranco el análisis.',
  },
  {
    q: '¿Cuánto tarda el diagnóstico?',
    a: 'Siete días desde que tengo los accesos. Recibes un PDF con las 5-7 causas priorizadas y un plan de acción paso a paso.',
  },
  {
    q: '¿Qué pasa después del diagnóstico?',
    a: 'Tú decides. Puedes ejecutar el plan por tu cuenta, contratar sesiones 1:1 para hacerlo conmigo, o que lo produzcamos nosotros. Sin permanencias.',
  },
  {
    q: '¿Qué formas de pago aceptas?',
    a: 'Transferencia o tarjeta. En el diagnóstico: 50% al encargar y 50% al entregar. Precio cerrado, sin sorpresas.',
  },
  {
    q: '¿Trabajas con cualquier categoría?',
    a: 'Trabajo con la mayoría de categorías de Amazon.es. Si veo que no puedo aportar valor real en la tuya, te lo digo antes de empezar.',
  },
]

export const PROCESS_STEPS = [
  {
    n: '01',
    title: 'Llamada gratis de 15 min',
    desc: 'Me cuentas tu situación. Sin compromiso: si no puedo ayudarte, te lo digo.',
  },
  {
    n: '02',
    title: 'Analizo tu cuenta a fondo durante una semana',
    desc: 'Reviso listings, PPC, keywords, competencia, precios e imágenes con criterio de seller.',
  },
  {
    n: '03',
    title: 'Recibes el PDF con las causas y el plan',
    desc: 'Tú decides: lo ejecutas tú o lo producimos nosotros. El plan es tuyo.',
  },
]

export const WHAT_I_CHECK = [
  'Listings',
  'PPC',
  'Keywords',
  'Competencia',
  'Precios',
  'Imágenes / A+',
  'Reviews',
  'Operativa',
]

export type MissionModule = {
  tag: string
  title: string
  desc: string
}

export const MISSION_MODULES: MissionModule[] = [
  {
    tag: '01 · Rentabilidad',
    title: 'Dinero real en juego',
    desc: 'Tomamos decisiones pensando en margen, inversión y retorno. No recomendamos acciones porque estén de moda, sino porque tienen sentido para tu cuenta.',
  },
  {
    tag: '02 · Visión global',
    title: 'Todo está conectado',
    desc: 'PPC, inventario, conversión, posicionamiento y margen forman parte del mismo sistema. Mejorar una métrica aislada no siempre mejora el negocio.',
  },
  {
    tag: '03 · Prioridades',
    title: 'Qué mover primero y por qué',
    desc: 'Detectamos qué acciones pueden generar más impacto y establecemos un orden claro. Sin informes interminables ni listas imposibles de ejecutar.',
  },
]

export type ServiceItem = {
  id: string
  eyebrow: string
  title: string
  description: string
  note?: string
}

export type ServiceArea = {
  id: string
  eyebrow: string
  countLabel: string
  title: string
  shortDescription: string
  introduction: string
  image: string
  imagePosition?: string
  services: ServiceItem[]
}

// The 12 real CHRITERIO services, grouped into the four areas presented as
// large visual cards (see components/services/). The image filenames are
// deliberately URL-safe so they work consistently in local development and
// in production deployments.
export const SERVICE_AREAS: ServiceArea[] = [
  {
    id: 'visibilidad-publicidad',
    eyebrow: 'Adquisición',
    countLabel: '03 servicios',
    title: 'Visibilidad y publicidad',
    shortDescription: 'Cómo te encuentran, cómo te perciben y cómo conviertes.',
    introduction:
      'Trabajamos los elementos que determinan cómo aparece tu producto, cómo atrae tráfico y cómo convierte las visitas en ventas.',
    image: '/images/services/visibility-advertising.jpg',
    services: [
      {
        id: 'ppc',
        eyebrow: 'Ads / PPC',
        title: 'Gestión y escalado de campañas publicitarias',
        description:
          'Diseñamos, optimizamos y escalamos campañas de Amazon Ads para mejorar la rentabilidad, controlar la inversión y acompañar el crecimiento de la cuenta.',
      },
      {
        id: 'posicionamiento',
        eyebrow: 'SEO Amazon',
        title: 'Posicionamiento orgánico y optimización de listings',
        description:
          'Optimizamos títulos, palabras clave, estructura y contenido para mejorar la visibilidad, la relevancia y la conversión del producto.',
      },
      {
        id: 'contenido-visual',
        eyebrow: 'Creatividad',
        title: 'Contenido visual y creatividades de alta conversión',
        description:
          'Creamos imágenes, infografías, contenido A+ y recursos visuales orientados a mejorar la percepción y conversión del producto.',
        note: 'Producción creativa desarrollada junto al equipo de AMZ Creatives.',
      },
    ],
  },
  {
    id: 'analisis-rentabilidad',
    eyebrow: 'Control',
    countLabel: '04 servicios',
    title: 'Análisis y rentabilidad',
    shortDescription: 'Entender qué ocurre antes de decidir qué hacer.',
    introduction:
      'Analizamos la cuenta y el mercado para detectar bloqueos, oportunidades y decisiones que afectan directamente al beneficio.',
    image: '/images/services/analysis-profitability.jpg',
    services: [
      {
        id: 'auditoria',
        eyebrow: 'Diagnóstico',
        title: 'Auditoría y diagnóstico de cuenta',
        description:
          'Analizamos el estado real de la cuenta, detectamos sus principales bloqueos y establecemos qué acciones deben priorizarse.',
      },
      {
        id: 'estudio-mercado',
        eyebrow: 'Mercado',
        title: 'Estudio de mercado y detección de oportunidades',
        description:
          'Evaluamos demanda, competencia, tendencias y barreras de entrada para identificar oportunidades con sentido comercial.',
      },
      {
        id: 'rentabilidad',
        eyebrow: 'Rentabilidad',
        title: 'Optimización de rentabilidad y márgenes',
        description:
          'Analizamos costes, precios, publicidad y operativa para localizar fugas de rentabilidad y mejorar el beneficio real del negocio.',
      },
      {
        id: 'competencia',
        eyebrow: 'Competencia',
        title: 'Análisis de la competencia',
        description:
          'Estudiamos ofertas, precios, posicionamiento, contenido y publicidad para entender dónde competir y cómo diferenciarse.',
      },
    ],
  },
  {
    id: 'crecimiento-expansion',
    eyebrow: 'Escalado',
    countLabel: '03 servicios',
    title: 'Crecimiento y expansión',
    shortDescription: 'Avanzar por fases sin perder rentabilidad ni control.',
    introduction:
      'Diseñamos cómo avanzar desde la situación actual hacia nuevos niveles de facturación, productos y mercados sin perder control.',
    image: '/images/services/growth-expansion.jpg',
    services: [
      {
        id: 'crecimiento',
        eyebrow: 'Escalado',
        title: 'Estrategia de crecimiento por fases',
        description:
          'Diseñamos una hoja de ruta progresiva con objetivos, prioridades y decisiones adaptadas al momento real de la cuenta.',
      },
      {
        id: 'expansion',
        eyebrow: 'Marketplaces',
        title: 'Expansión internacional y nuevos marketplaces',
        description:
          'Estudiamos la viabilidad de nuevos mercados y definimos cómo expandir la marca sin replicar errores ni perder el control.',
      },
      {
        id: 'lanzamientos',
        eyebrow: 'Lanzamientos',
        title: 'Lanzamiento de nuevos productos',
        description:
          'Definimos la estrategia de entrada, posicionamiento, publicidad y validación necesaria para lanzar con una base más sólida.',
      },
    ],
  },
  {
    id: 'direccion-estrategica',
    eyebrow: 'Dirección',
    countLabel: '02 servicios',
    title: 'Dirección estratégica',
    shortDescription: 'Decisiones acompañadas, prioridades claras y seguimiento.',
    introduction:
      'Acompañamos la toma de decisiones para convertir los datos de la cuenta en prioridades claras y acciones ejecutables.',
    image: '/images/services/strategic-direction.jpg',
    services: [
      {
        id: 'mentoria',
        eyebrow: 'Mentoría',
        title: 'Consultoría estratégica y mentoría 1:1',
        description:
          'Trabajamos contigo en sesiones personalizadas para revisar decisiones, resolver bloqueos y dirigir el crecimiento de la cuenta.',
      },
      {
        id: 'soporte',
        eyebrow: 'Soporte',
        title: 'Acompañamiento y soporte continuo',
        description:
          'Realizamos seguimiento de la cuenta, revisamos avances y te ayudamos a tomar decisiones a medida que aparecen nuevos retos.',
      },
    ],
  },
]

// The AMZ project catalogue is the shared source of truth for these logos.
export const TRUSTED_BRANDS: Brand[] = AMZ_CREATIVE_PROJECTS.map((project) => ({
  name: project.brand,
  logo: project.logoSrc,
  width: project.logoWidth,
  height: project.logoHeight,
}))
