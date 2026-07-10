'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQS } from '@/lib/data'

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex flex-col divide-y divide-border rounded-3xl border border-border bg-card">
      {FAQS.map((faq, i) => {
        const isOpen = open === i
        return (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8"
            >
              <span className="font-display text-base font-bold tracking-tight text-navy md:text-lg">
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
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground md:px-8 text-pretty">
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
