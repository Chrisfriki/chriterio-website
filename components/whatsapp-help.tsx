'use client'

import { MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { WHATSAPP_URL } from '@/lib/site'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'chriterio-whatsapp-help-dismissed'

export function WhatsAppHelp() {
  const [visible, setVisible] = useState(false)
  const [compact, setCompact] = useState(false)
  const lastScrollYRef = useRef(0)
  const upwardDistanceRef = useRef(0)
  const downwardDistanceRef = useRef(0)

  useEffect(() => {
    setVisible(window.sessionStorage.getItem(STORAGE_KEY) !== 'true')
    lastScrollYRef.current = window.scrollY

    const onScroll = () => {
      const nextScrollY = window.scrollY
      const delta = nextScrollY - lastScrollYRef.current
      lastScrollYRef.current = nextScrollY

      if (delta > 0) {
        upwardDistanceRef.current = 0
        downwardDistanceRef.current += delta
        if (downwardDistanceRef.current >= 72 && nextScrollY > 20) {
          setCompact(true)
          downwardDistanceRef.current = 0
        }
      } else if (delta < 0) {
        downwardDistanceRef.current = 0
        upwardDistanceRef.current += Math.abs(delta)
        if (upwardDistanceRef.current >= 8) {
          setCompact(false)
          upwardDistanceRef.current = 0
        }
      }

      if (nextScrollY <= 20) setCompact(false)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside
      className={cn(
        'fixed right-4 bottom-4 z-[60] flex max-w-[calc(100vw-2rem)] items-center rounded-full border border-white/15 bg-[#07172f]/95 text-white shadow-[0_18px_55px_-18px_rgba(2,8,23,0.9)] backdrop-blur-xl transition-[gap,padding] duration-300 ease-out sm:right-6 sm:bottom-6',
        compact ? 'gap-0.5 p-1' : 'gap-1 p-1.5 pl-2.5',
      )}
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'group flex min-w-0 items-center rounded-full transition-[gap,padding,background-color] duration-300 hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-electric focus-visible:outline-none',
          compact ? 'gap-0 p-1' : 'gap-2.5 py-2 pr-2 pl-1',
        )}
        aria-label="Resolver dudas por WhatsApp"
      >
        <span
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_22px_-10px_rgba(37,211,102,0.9)] transition-[width,height] duration-300 ease-out',
            compact ? 'size-8' : 'size-9',
          )}
        >
          <MessageCircle className={compact ? 'size-4' : 'size-[18px]'} aria-hidden="true" />
        </span>
        <span
          className={cn(
            'overflow-hidden whitespace-nowrap transition-[max-width,opacity,padding] duration-300 ease-out',
            compact ? 'max-w-0 p-0 opacity-0' : 'max-w-40 pr-1 opacity-100',
          )}
        >
          <span className="block text-xs font-semibold">¿Tienes dudas?</span>
          <span className="block text-[10px] text-white/55">Hablemos por WhatsApp</span>
        </span>
      </a>
      <button
        type="button"
        onClick={dismiss}
        className={cn(
          'flex shrink-0 items-center justify-center rounded-full text-white/45 transition-[width,height,color,background-color] duration-300 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-electric focus-visible:outline-none',
          compact ? 'size-7' : 'size-8',
        )}
        aria-label="Cerrar acceso de WhatsApp"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </aside>
  )
}
