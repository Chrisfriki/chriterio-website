'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { HERO_NAV_REVEAL_RANGE } from '@/components/chriterio-hero-sequence'
import { cn } from '@/lib/utils'
import { NAV_LINKS, CALENDLY_URL, WHATSAPP_URL } from '@/lib/site'
import { Wordmark } from '@/components/wordmark'
import { LinkButton } from '@/components/link-button'

export function SiteNavbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [solid, setSolid] = useState(!isHome)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isHome) {
      setSolid(true)
      // Clear any inline reveal styles left over from a previous visit to
      // the homepage so inner pages always render the navbar normally.
      const header = headerRef.current
      if (header) {
        header.style.opacity = ''
        header.style.visibility = ''
        header.style.pointerEvents = ''
        header.style.transform = ''
      }
      return
    }

    // The homepage hero can be a tall scroll-driven section (e.g. the
    // ChriterioHeroSequence). Track its own bottom edge instead of a fixed
    // scroll offset, so the navbar only turns solid once the hero has
    // actually scrolled past, however tall it is. The navbar also stays
    // fully hidden (opacity/visibility/pointer-events) until the hero's own
    // content-reveal stage begins, set imperatively (not via React state)
    // so it doesn't re-render on every scroll tick.
    const heroEl = document.getElementById('home-hero')
    let ticking = false

    const apply = () => {
      ticking = false
      const header = headerRef.current
      if (!heroEl || !header) return

      const rect = heroEl.getBoundingClientRect()
      const scrollableDistance = rect.height - window.innerHeight
      // If the hero isn't scroll-jacked (e.g. prefers-reduced-motion, where
      // it renders at a normal 100vh), there's nothing to wait for.
      const progress =
        scrollableDistance > 0
          ? Math.min(1, Math.max(0, -rect.top / scrollableDistance))
          : 1

      setSolid(rect.bottom <= 0)

      const [start, end] = HERO_NAV_REVEAL_RANGE
      const t = Math.min(1, Math.max(0, (progress - start) / (end - start)))
      header.style.opacity = String(t)
      header.style.visibility = t > 0.02 ? 'visible' : 'hidden'
      header.style.pointerEvents = t > 0.6 ? 'auto' : 'none'
      header.style.transform = `translateY(${(1 - t) * -12}px)`
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      rafIdRef.current = requestAnimationFrame(apply)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    // The hero's height starts at a placeholder ~100vh (while
    // ChriterioHeroSequence is still resolving prefers-reduced-motion) and
    // then jumps to the full scroll-jacked height. Watch for that so `apply`
    // re-runs with the correct height instead of possibly sticking with a
    // stale "revealed" state from that first frame.
    let resizeObserver: ResizeObserver | null = null
    if (heroEl && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(onScroll)
      resizeObserver.observe(heroEl)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      resizeObserver?.disconnect()
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
    }
  }, [isHome])

  const linkColor = solid ? 'text-navy/80' : 'text-white/90'

  return (
    <>
    <header
      ref={headerRef}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        solid
          ? 'border-b border-border bg-background/90 backdrop-blur-md'
          : 'bg-transparent',
        // Hidden-by-default on the homepage so there's no flash of the
        // navbar before hydration takes over and starts driving the
        // opacity/visibility/pointer-events above imperatively.
        isHome && 'opacity-0 invisible pointer-events-none',
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
