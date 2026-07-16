import fs from 'node:fs'
import path from 'node:path'
import { SERVICE_AREAS } from '@/lib/data'
import { ServicesSectionClient } from './services-section-client'

/** Server component so it can check, at build time, which area photos
 *  actually exist in /public — <ServiceAreaCard> falls back to a plain dark
 *  gradient for any area whose image is still missing instead of a broken
 *  <img>. The interactive open/close state lives in the client child. */
export function ServicesSection() {
  const imageAvailability: Record<string, boolean> = {}
  for (const area of SERVICE_AREAS) {
    const filePath = path.join(process.cwd(), 'public', area.image)
    imageAvailability[area.id] = fs.existsSync(filePath)
  }

  return (
    <ServicesSectionClient areas={SERVICE_AREAS} imageAvailability={imageAvailability} />
  )
}
