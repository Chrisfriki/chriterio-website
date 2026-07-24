export type WorkMode = {
  title: string
  description: string
}

export type WorkPhase = {
  number: string
  title: string
  paragraphs: string[]
  image?: {
    src: string
    alt: string
    position?: string
  }
  modes?: WorkMode[]
}

export const WORK_PHASES: WorkPhase[] = [
  {
    number: '01',
    title: 'Auditoría y diagnóstico',
    paragraphs: [
      'Antes de proponer nada, hacemos 1 o 2 reuniones de auditoría para entender tu cuenta, tu catálogo, tu situación actual y el punto en el que realmente estás.',
      'A partir de ahí analizamos en profundidad el mercado, la competencia, las fugas de ventas, la conversión, el posicionamiento, las palabras clave, el PPC, la rentabilidad y los puntos críticos que están frenando el crecimiento.',
    ],
    image: {
      src: '/christian.png',
      alt: 'Christian, consultor de Amazon y fundador de CHRITERIO',
      position: '50% 28%',
    },
  },
  {
    number: '02',
    title: 'Definimos el mejor plan para tu cuenta',
    paragraphs: [
      'Con toda la auditoría hecha, definimos qué tipo de ayuda necesitas realmente. No todas las cuentas necesitan lo mismo, así que no forzamos un servicio estándar si no encaja.',
      'En esta fase aterrizamos prioridades, objetivos, foco de trabajo y el plan a seguir durante los próximos 3 meses.',
    ],
  },
  {
    number: '03',
    title: 'Lo ejecutamos contigo o lo dirigimos para tu equipo',
    paragraphs: [
      'Una vez definido el plan, empezamos a trabajar. Según el nivel de implicación que necesites, podemos dirigir la estrategia para tu equipo o trabajar directamente dentro de tu cuenta.',
    ],
    modes: [
      {
        title: 'Dirección estratégica',
        description:
          'Marcamos la hoja de ruta, priorizamos acciones y formamos al equipo que va a ejecutarlas para que trabaje con más criterio, claridad y autonomía.',
      },
      {
        title: 'Gestión integral',
        description:
          'Entramos directamente en la cuenta y ejecutamos nosotros las prioridades definidas para avanzar más rápido y con mayor control.',
      },
    ],
  },
  {
    number: '04',
    title: 'Seguimiento, revisión y ajustes',
    paragraphs: [
      'Durante los 3 meses no trabajamos a ciegas. Hacemos seguimiento continuo, revisamos avances, detectamos bloqueos y ajustamos prioridades para que el plan evolucione con la cuenta.',
    ],
  },
]

export const ANALYSIS_AREAS = [
  'Mercado y competencia',
  'Fugas de ventas',
  'Conversión',
  'Palabras clave',
  'Posicionamiento',
  'PPC',
  'Rentabilidad',
  'Catálogo',
  'Oportunidades de crecimiento',
] as const
