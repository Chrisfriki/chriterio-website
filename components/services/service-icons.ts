import {
  Target,
  Search,
  Images,
  ScanSearch,
  Telescope,
  CircleDollarSign,
  Binoculars,
  Route,
  Globe2,
  Rocket,
  MessagesSquare,
  Handshake,
  type LucideIcon,
} from 'lucide-react'

// Keyed by ServiceItem.id (see lib/data.ts) rather than stored on the data
// itself, so lib/data.ts stays plain, serializable data with no component
// references — same convention as the icon maps used elsewhere in
// components/home/*.
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  ppc: Target,
  posicionamiento: Search,
  'contenido-visual': Images,
  auditoria: ScanSearch,
  'estudio-mercado': Telescope,
  rentabilidad: CircleDollarSign,
  competencia: Binoculars,
  crecimiento: Route,
  expansion: Globe2,
  lanzamientos: Rocket,
  mentoria: MessagesSquare,
  soporte: Handshake,
}
