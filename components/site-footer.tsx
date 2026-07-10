import Image from 'next/image'
import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'
import { NAV_LINKS, CALENDLY_URL, WHATSAPP_URL } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xs">
            <Wordmark light />
            <p className="mt-5 text-sm leading-relaxed text-white/50">
              Consultoría de Amazon con criterio de seller, no de agencia.
              Análisis con el mismo criterio que uso con mi propio dinero.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">
              Navegación
            </span>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-electric"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-widest text-white/40 uppercase">
              Hablemos
            </span>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 transition-colors hover:text-electric"
                >
                  Reserva 15 min
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/70 transition-colors hover:text-electric"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <span>© {new Date().getFullYear()} CHRITERIO · Todos los derechos reservados</span>
            <span>Seller activo en Amazon.es · Sin permanencias · Precio cerrado</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/40">Diseñado por</span>
            <span className="flex items-center rounded-md bg-white px-2 py-1">
              <Image
                src="/amz-creatives-logo.png"
                alt="AMZ Creatives"
                width={4773}
                height={713}
                className="h-4 w-auto"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
