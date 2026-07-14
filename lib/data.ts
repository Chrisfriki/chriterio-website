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

export type ClientLogo = {
  name: string
  src: string
}

// Real client/brand logos go here once available — e.g.
// { name: 'Acme', src: '/logos/acme.svg' }.
// Keep this empty (not fabricated names/marks) until real assets exist;
// <CredibilityStrip> falls back to neutral placeholder marks when empty.
export const CLIENT_LOGOS: ClientLogo[] = []
