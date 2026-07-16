export interface AmzCreativeProject {
  id: string
  brand: string
  logoSrc: string
  logoWidth: number
  logoHeight: number
  amazonUrl: string | null
  marketplace?: string
  productName?: string
  projectImageSrc?: string
  projectVideoSrc?: string
  ariaLabel: string
}

export const AMZ_CREATIVE_PROJECTS: AmzCreativeProject[] = [
  {
    id: 'almar-baby',
    brand: 'Almar Baby',
    logoSrc: '/brands/processed/almar-baby.png',
    logoWidth: 700,
    logoHeight: 448,
    amazonUrl:
      'https://www.amazon.es/ALMAR-Baby-term%C3%B3metro-antideslizante-temperatura/dp/B0CJVMKPNZ',
    marketplace: 'Amazon ES',
    ariaLabel: 'Ver el producto de Almar Baby en Amazon',
  },
  {
    id: 'funny-baby',
    brand: 'Funny Baby',
    logoSrc: '/brands/processed/funny-baby.png',
    logoWidth: 674,
    logoHeight: 604,
    amazonUrl:
      'https://www.amazon.es/Funny-Baby-Impermeable-Desenfundable-Ergon%C3%B3mico/dp/B0DPLC3PH1/',
    marketplace: 'Amazon ES',
    ariaLabel: 'Ver el producto de Funny Baby en Amazon',
  },
  {
    id: 'maternika',
    brand: 'Maternika',
    logoSrc: '/brands/processed/maternika.png',
    logoWidth: 700,
    logoHeight: 102,
    amazonUrl:
      'https://www.amazon.es/MATERNIKA-Embarazada-Lactancia-multifunci%C3%B3n-viscoel%C3%A1stica/dp/B0F21V3PRR',
    marketplace: 'Amazon ES',
    ariaLabel: 'Ver el producto de Maternika en Amazon',
  },
  {
    id: 'blatrap-mini',
    brand: 'Blatrap Mini',
    logoSrc: '/brands/processed/19.svg',
    logoWidth: 2000,
    logoHeight: 1000,
    amazonUrl:
      'https://www.amazon.es/DECEVI-PCS-Extra-Fuertes-Profesional-Alimentario/dp/B0BLW2541V',
    marketplace: 'Amazon ES',
    ariaLabel: 'Ver el producto de Blatrap Mini en Amazon',
  },
  {
    id: 't2nd',
    brand: 't2nd',
    logoSrc: '/brands/processed/20.svg',
    logoWidth: 2000,
    logoHeight: 1000,
    amazonUrl:
      'https://www.amazon.es/Impermeabilizante-Transparente-Poliuretano-Revestimiento-Hidrofugante/dp/B0DSQ9SJRP',
    marketplace: 'Amazon ES',
    ariaLabel: 'Ver el producto de t2nd en Amazon',
  },
  {
    id: 'kook-time',
    brand: 'Kook Time',
    logoSrc: '/brands/processed/kook-time.png',
    logoWidth: 700,
    logoHeight: 147,
    amazonUrl:
      'https://www.amazon.es/salero-cocina-madera-bamb%C3%BA-basculante/dp/B0CJC8S6KT',
    marketplace: 'Amazon ES',
    ariaLabel: 'Ver el producto de Kook Time en Amazon',
  },
  {
    id: 'snappy-blue',
    brand: 'Snappy Blue',
    logoSrc: '/brands/processed/sauk.png',
    logoWidth: 700,
    logoHeight: 442,
    amazonUrl:
      'https://www.amazon.es/Taloneras-Corregir-Fascitis-Plantar-Calcaneo/dp/B0CHSHWMSF/',
    marketplace: 'Amazon ES',
    ariaLabel: 'Ver el producto de Snappy Blue en Amazon',
  },
  {
    id: 'podcase',
    brand: 'PodCase',
    logoSrc: '/brands/processed/podcase.png',
    logoWidth: 700,
    logoHeight: 233,
    amazonUrl:
      'https://www.amazon.es/Rampa-para-Perros-Peque%C3%B1os-Grandes/dp/B0FJXPG6SK',
    marketplace: 'Amazon ES',
    ariaLabel: 'Ver el producto de PodCase en Amazon',
  },
  {
    id: 'pure4home',
    brand: 'Pure4Home',
    logoSrc: '/brands/processed/pure4home.png',
    logoWidth: 700,
    logoHeight: 149,
    amazonUrl:
      'https://www.amazon.es/Pure-4Home-Alfombrilla-Diatomita-60cmx39cm/dp/B0CQ3K2D1G/',
    marketplace: 'Amazon ES',
    ariaLabel: 'Ver el producto de Pure4Home en Amazon',
  },
  {
    id: 'pinisi-home',
    brand: 'Pinisi Home',
    logoSrc: '/brands/processed/pinisi.png',
    logoWidth: 500,
    logoHeight: 248,
    amazonUrl:
      'https://www.amazon.es/Pinisi-Home-piezas-vitrocer%C3%A1mica-Antideslizante/dp/B0D4F71VMY',
    marketplace: 'Amazon ES',
    ariaLabel: 'Ver el producto de Pinisi Home en Amazon',
  },
]
