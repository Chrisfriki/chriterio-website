import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { SiteNavbar } from '@/components/site-navbar'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CHRITERIO · Consultoría Amazon con criterio de seller',
  description:
    'Analizo tu cuenta de Amazon con el mismo criterio que uso con mi propio dinero. Diagnóstico en 7 días. Soy seller activo en Amazon.es.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0a1f44',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <SiteNavbar />
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
