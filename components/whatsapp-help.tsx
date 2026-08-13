'use client'

import { MessageCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { WHATSAPP_URL } from '@/lib/site'

const STORAGE_KEY = 'chriterio-whatsapp-help-dismissed'

export function WhatsAppHelp() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(window.sessionStorage.getItem(STORAGE_KEY) !== 'true')
  }, [])

  const dismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside className="fixed right-4 bottom-4 z-[60] flex max-w-[calc(100vw-2rem)] items-center gap-1 rounded-full border border-white/15 bg-[#07172f]/95 p-1.5 pl-2.5 text-white shadow-[0_18px_55px_-18px_rgba(2,8,23,0.9)] backdrop-blur-xl sm:right-6 sm:bottom-6">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex min-w-0 items-center gap-2.5 rounded-full py-2 pr-2 pl-1 transition-colors hover:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-electric focus-visible:outline-none"
        aria-label="Resolver dudas por WhatsApp"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_22px_-10px_rgba(37,211,102,0.9)]">
          <MessageCircle className="size-[18px]" aria-hidden="true" />
        </span>
        <span className="hidden pr-1 sm:block">
          <span className="block text-xs font-semibold">¿Tienes dudas?</span>
          <span className="block text-[10px] text-white/55">Hablemos por WhatsApp</span>
        </span>
      </a>
      <button
        type="button"
        onClick={dismiss}
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-white/45 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-electric focus-visible:outline-none"
        aria-label="Cerrar acceso de WhatsApp"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </aside>
  )
}
