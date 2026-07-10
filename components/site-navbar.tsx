'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, CALENDLY_URL, WHATSAPP_URL } from '@/lib/site'
import { Wordmark } from '@/components/wordmark'
import { LinkButton } from '@/components/link-button'

export function SiteNavbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(!isHome)

  useEffect(() => {
    setVisible(!isHome)
  }, [isHome])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // On the home page the navbar fades in after the hero video ends.
  useEffect(() => {
    if (!isHome) return
    const reveal = () => setVisible(true)
    window.addEventListener('chriterio:hero-ready', reveal)
    // Safety fallback in case the event never fires.
    const t = window.setTimeout(reveal, 9000)
    return () => {
      window.removeEventListener('chriterio:hero-ready', reveal)
      window.clearTimeout(t)
    }
  }, [isHome])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Solid white when scrolled or on inner pages; transparent+blur over hero.
  const solid = !isHome || scrolled
  const linkColor = solid ? 'text-navy/80' : 'text-white/90'

  return (
    <>
    <motion.header
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        visible ? 'pointer-events-auto' : 'pointer-events-none',
        solid
          ? 'border-b border-border bg-background/90 backdrop-blur-md'
          : 'bg-navy-dark/10 backdrop-blur-md',
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:h-20">
        <Link href="/" aria-label="CHRITERIO inicio">
          <Wordmark light={!solid} />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    'text-sm font-medium tracking-tight transition-colors hover:text-electric',
                    pathname === link.href && 'text-electric',
                    linkColor,
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <LinkButton href={CALENDLY_URL} external className="px-5 py-2.5">
            Reserva 15 min
          </LinkButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          className={cn(
            'flex size-10 items-center justify-center rounded-full transition-colors md:hidden',
            solid ? 'text-navy hover:bg-muted' : 'text-white hover:bg-white/10',
          )}
        >
          <Menu className="size-6" />
        </button>
      </nav>
    </motion.header>

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
                Reserva una llamada de 15 min
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
