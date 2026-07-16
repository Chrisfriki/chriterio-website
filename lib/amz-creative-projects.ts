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

// TODO: Añadir la URL real de cada producto en Amazon cuando esté disponible.
// A project becomes interactive automatically as soon as `amazonUrl` contains
// a valid HTTPS URL from an allowed Amazon marketplace.
export const AMZ_CREATIVE_PROJECTS: AmzCreativeProject[] = [
  { id: 'almar-baby', brand: 'Almar Baby', logoSrc: '/brands/processed/almar-baby.png', logoWidth: 700, logoHeight: 448, amazonUrl: null, ariaLabel: 'Ver el producto de Almar Baby en Amazon' },
  { id: 'anefort', brand: 'Anefort', logoSrc: '/brands/processed/anefort.png', logoWidth: 700, logoHeight: 396, amazonUrl: null, ariaLabel: 'Ver el producto de Anefort en Amazon' },
  { id: 'bebe-pituso', brand: 'Bebé Pituso', logoSrc: '/brands/processed/bebe-pituso.png', logoWidth: 700, logoHeight: 251, amazonUrl: null, ariaLabel: 'Ver el producto de Bebé Pituso en Amazon' },
  { id: 'detraps', brand: 'Detraps', logoSrc: '/brands/processed/detraps.png', logoWidth: 607, logoHeight: 162, amazonUrl: null, ariaLabel: 'Ver el producto de Detraps en Amazon' },
  { id: 'funny-baby', brand: 'Funny Baby', logoSrc: '/brands/processed/funny-baby.png', logoWidth: 674, logoHeight: 604, amazonUrl: null, ariaLabel: 'Ver el producto de Funny Baby en Amazon' },
  { id: 'kook-time', brand: 'Kook Time', logoSrc: '/brands/processed/kook-time.png', logoWidth: 700, logoHeight: 147, amazonUrl: null, ariaLabel: 'Ver el producto de Kook Time en Amazon' },
  { id: 'maternika', brand: 'Maternika', logoSrc: '/brands/processed/maternika.png', logoWidth: 700, logoHeight: 102, amazonUrl: null, ariaLabel: 'Ver el producto de Maternika en Amazon' },
  { id: 'maurenza', brand: 'Maurenza', logoSrc: '/brands/processed/maurenza.png', logoWidth: 632, logoHeight: 153, amazonUrl: null, ariaLabel: 'Ver el producto de Maurenza en Amazon' },
  { id: 'neergy', brand: 'Neergy', logoSrc: '/brands/processed/neergy.png', logoWidth: 561, logoHeight: 264, amazonUrl: null, ariaLabel: 'Ver el producto de Neergy en Amazon' },
  { id: 'norditex', brand: 'Norditex', logoSrc: '/brands/processed/norditex.png', logoWidth: 273, logoHeight: 140, amazonUrl: null, ariaLabel: 'Ver el producto de Norditex en Amazon' },
  { id: 'pinisi-home', brand: 'Pinisi Home', logoSrc: '/brands/processed/pinisi.png', logoWidth: 500, logoHeight: 248, amazonUrl: null, ariaLabel: 'Ver el producto de Pinisi Home en Amazon' },
  { id: 'podcase', brand: 'PodCase', logoSrc: '/brands/processed/podcase.png', logoWidth: 700, logoHeight: 233, amazonUrl: null, ariaLabel: 'Ver el producto de PodCase en Amazon' },
  { id: 'pure4home', brand: 'Pure4Home', logoSrc: '/brands/processed/pure4home.png', logoWidth: 700, logoHeight: 149, amazonUrl: null, ariaLabel: 'Ver el producto de Pure4Home en Amazon' },
  { id: 'snappy-blue', brand: 'Snappy Blue', logoSrc: '/brands/processed/sauk.png', logoWidth: 700, logoHeight: 442, amazonUrl: null, ariaLabel: 'Ver el producto de Snappy Blue en Amazon' },
  { id: 'savia-alma', brand: 'Savia de Alma', logoSrc: '/brands/processed/savia-alma.png', logoWidth: 680, logoHeight: 750, amazonUrl: null, ariaLabel: 'Ver el producto de Savia de Alma en Amazon' },
  { id: 'thinia-home', brand: 'Thinia Home', logoSrc: '/brands/processed/thinia-home.png', logoWidth: 664, logoHeight: 411, amazonUrl: null, ariaLabel: 'Ver el producto de Thinia Home en Amazon' },
  { id: 'umbra', brand: 'Umbra', logoSrc: '/brands/processed/umbra.png', logoWidth: 669, logoHeight: 155, amazonUrl: null, ariaLabel: 'Ver el producto de Umbra en Amazon' },
  { id: 'xpintar', brand: 'Xpintar', logoSrc: '/brands/processed/xpintar.png', logoWidth: 700, logoHeight: 184, amazonUrl: null, ariaLabel: 'Ver el producto de Xpintar en Amazon' },
]
