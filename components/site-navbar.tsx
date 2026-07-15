'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, CALENDLY_URL, WHATSAPP_URL } from '@/lib/site'
import { Wordmark } from '@/components/wordmark'
import { LinkButton } from '@/components/link-button'
import { withBasePath } from '@/lib/base-path'

export function SiteNavbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Consistently dark glass regardless of page/hero, so there's no more
  // color-swap state to manage — only a very slight refinement (a touch more
  // opaque, a touch more shadow) once the page has actually scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 md:px-6 md:pt-6">
        <nav
          aria-label="Principal"
          className={cn(
            'flex w-full max-w-[1200px] items-center justify-between rounded-full border border-white/12 bg-navy-dark/60 px-4 py-2.5 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-[background-color,box-shadow] duration-300 md:px-5 md:py-3',
            scrolled && 'bg-navy-dark/78 shadow-[0_20px_50px_-14px_rgba(0,0,0,0.7)]',
          )}
        >
          <Link
            href="/"
            aria-label="CHRITERIO inicio"
            className="flex shrink-0 items-center"
          >
            <Image
              src={withBasePath('/chriterio-icon-white.png')}
              alt="CHRITERIO"
              width={414}
              height={477}
              priority
              className="h-8 w-auto md:h-9"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm font-medium tracking-tight text-white/75 transition-colors hover:text-white',
                      pathname === link.href && 'text-white',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LinkButton href={CALENDLY_URL} external className="px-5 py-2.5 text-sm">
              Solicitar auditoría
            </LinkButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="flex size-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ backgroundColor: '#061530' }}
            className="fixed inset-0 z-[60] flex flex-col px-6 py-5 md:hidden"
          >
            <div className="flex items-center justify-between">
              <Wordmark light />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="flex size-10 items-center justify-center rounded-full text-white hover:bg-white/10"
              >
                <X className="size-6" />
              </button>
            </div>

            <ul className="mt-16 flex flex-1 flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="block font-display text-4xl font-bold tracking-tight text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.5 }}
              className="flex flex-col gap-3 pb-4"
            >
              <LinkButton href={CALENDLY_URL} external className="w-full">
                Solicitar auditoría gratuita
              </LinkButton>
              <LinkButton
                href={WHATSAPP_URL}
                external
                variant="ghost-light"
                className="w-full"
              >
                Escríbeme por WhatsApp
              </LinkButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
