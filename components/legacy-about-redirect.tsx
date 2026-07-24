'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { withBasePath } from '@/lib/base-path'

export function LegacyAboutRedirect() {
  useEffect(() => {
    window.location.replace(withBasePath('/sobre-nosotros'))
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020817] px-5 text-white">
      <p className="text-sm text-white/60">
        Esta página se ha trasladado a{' '}
        <Link
          href="/sobre-nosotros"
          className="font-semibold text-electric hover:text-white"
        >
          Sobre nosotros
        </Link>
        .
      </p>
    </main>
  )
}
