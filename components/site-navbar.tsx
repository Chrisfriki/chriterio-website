'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, CALENDLY_URL, WHATSAPP_URL } from '@/lib/site'
import { Wordmark } from '@/components/wordmark'
import { LinkButton } from '@/components/link-button'
import { withBasePath } from '@/lib/base-path'
import {
  HERO_SEQUENCE_STATE_EVENT,
  type HeroSequenceStateDetail,
} from '@/lib/hero-sequence-events'

export function SiteNavbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const reduceMotion = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [heroComplete, setHeroComplete] = useState(!isHome)
  const [heroExited, setHeroExited] = useState(!isHome)
  const [direction, setDirection] = useState<'up' | 'down' | null>(null)
  const lastScrollYRef = useRef(0)
  const upwardDistanceRef = useRef(0)
  const downwardDistanceRef = useRef(0)

  useEffect(() => {
    setOpen(false)
    setHeroComplete(!isHome)
    setHeroExited(!isHome)
    setDirection(null)
    lastScrollYRef.current = window.scrollY
    upwardDistanceRef.current = 0
    downwardDistanceRef.current = 0
  }, [isHome, pathname])

  useEffect(() => {
    const onHeroSequenceState = (event: Event) => {
      const { complete, exited } = (
        event as CustomEvent<HeroSequenceStateDetail>
      ).detail
      setHeroComplete(complete)
      setHeroExited(exited)
    }

    window.addEventListener(HERO_SEQUENCE_STATE_EVENT, onHeroSequenceState)
    return () =>
      window.removeEventListener(HERO_SEQUENCE_STATE_EVENT, onHeroSequenceState)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const nextScrollY = window.scrollY
      const delta = nextScrollY - lastScrollYRef.current
      setScrolled(nextScrollY > 20)
      lastScrollYRef.current = nextScrollY

      if (delta > 0) {
        upwardDistanceRef.current = 0
        downwardDistanceRef.current += delta
        if (downwardDistanceRef.current >= 72) {
          setDirection('down')
          downwardDistanceRef.current = 0
        }
      } else if (delta < 0) {
        downwardDistanceRef.current = 0
        upwardDistanceRef.current += Math.abs(delta)
        if (upwardDistanceRef.current >= 8) {
          setDirection('up')
          upwardDistanceRef.current = 0
        }
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const navVisible = open || !isHome || heroComplete
  const compact =
    !open &&
    direction === 'down' &&
    (isHome ? heroExited : scrolled)

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          y: navVisible ? 0 : '-140%',
          opacity: navVisible ? 1 : 0,
        }}
        transition={{
          duration: reduceMotion ? 0 : 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        aria-hidden={!navVisible}
        inert={!navVisible ? true : undefined}
        className="fixed inset-x-0 top-0 z-50 flex justify-start px-4 pt-5 md:px-6 md:pt-6"
      >
        <nav
          aria-label="Principal"
          className={cn(
            'inline-flex items-center rounded-full border border-white/12 bg-navy-dark/60 shadow-[0_20px_50px_-18px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-[gap,padding,background-color,box-shadow] duration-300 ease-out',
            compact
              ? 'gap-3 px-2.5 py-1.5 md:gap-6 md:px-3.5 md:py-2'
              : 'gap-8 px-4 py-2.5 md:gap-10 md:px-5 md:py-3',
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
              className={cn(
                'w-auto transition-[height] duration-300 ease-out',
                compact ? 'h-7 md:h-8' : 'h-8 md:h-9',
              )}
            />
          </Link>

          <div
            className={cn(
              'hidden items-center transition-[gap] duration-300 ease-out md:flex',
              compact ? 'gap-6' : 'gap-8',
            )}
          >
            <ul
              className={cn(
                'flex items-center transition-[gap] duration-300 ease-out',
                compact ? 'gap-5' : 'gap-7',
              )}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'font-medium tracking-tight text-white/75 transition-[color,font-size] duration-300 hover:text-white',
                      compact ? 'text-xs' : 'text-sm',
                      pathname === link.href && 'text-white',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <LinkButton
              href={CALENDLY_URL}
              external
              className={cn(
                'transition-[padding,font-size] duration-300',
                compact ? 'px-4 py-2 text-xs' : 'px-5 py-2.5 text-sm',
              )}
            >
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
