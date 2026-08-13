'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS } from '@/lib/data'

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col divide-y divide-[#e4e8ef] overflow-hidden rounded-3xl border border-[#e4e8ef] bg-white">
      {FAQS.map((faq, i) => {
        const isOpen = open === i
        return (
          <div key={faq.q} className="min-w-0">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full min-w-0 items-center justify-between gap-3 px-5 py-5 text-left sm:gap-4 sm:px-6 md:px-8"
            >
              <span className="min-w-0 flex-1 font-display text-base font-bold tracking-tight text-navy break-words md:text-lg">
                {faq.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-electric/10 text-electric"
              >
                <Plus className="size-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="min-w-0 px-5 pb-6 text-sm leading-relaxed text-[#5b6b86] break-words text-pretty sm:px-6 md:px-8">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
