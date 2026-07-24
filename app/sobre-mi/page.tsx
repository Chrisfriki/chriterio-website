import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHeader } from '@/components/page-header'
import { FinalCta } from '@/components/final-cta'
import { Reveal } from '@/components/reveal'
import { withBasePath } from '@/lib/base-path'

export const metadata: Metadata = {
  title: 'Sobre mí · CHRITERIO',
  description:
    'Soy Christian. Vendo en Amazon con mis propias cuentas y trabajo listings, PPC y operativa. CHRITERIO nace de ahí, junto a AMZ Creatives.',
}

export default function SobreMiPage() {
  return (
    <main>
      <PageHeader eyebrow="Sobre mí" title="Hola, soy Christian" />

      <section className="bg-background px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-border bg-light">
              <Image
                src={withBasePath('/images/about/christian-about.jpg')}
                alt="Christian, consultor de Amazon y seller activo en Amazon.es"
                fill
                sizes="(max-width: 767px) calc(100vw - 2.5rem), 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6 md:pt-4">
              <p className="text-lg leading-relaxed text-navy text-pretty md:text-xl">
                Soy Christian. Vendo en Amazon con mis propias cuentas y llevo
                años trabajando listings, PPC y operativa.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                No soy una agencia que analiza cuentas desde fuera. Cada semana
                tomo decisiones reales con mi dinero: qué reordenar, cómo
                estructurar las campañas, qué listing tocar y por qué. Ese mismo
                criterio es el que aplico cuando miro tu cuenta.
              </p>
              <p className="text-base leading-relaxed text-muted-foreground text-pretty">
                CHRITERIO nace de ahí: análisis directos, priorizados y sin
                humo. Trabajo de la mano de{' '}
                <span className="font-semibold text-navy">AMZ Creatives</span>{' '}
                cuando hace falta producción (contenido, imágenes, A+), así que
                si decides ejecutar, no te quedas solo.
              </p>

              <div className="mt-2 grid grid-cols-3 gap-4 border-t border-border pt-8">
                {[
                  { k: 'Seller', v: 'Activo en Amazon.es' },
                  { k: 'Diagnóstico', v: 'En 7 días' },
                  { k: 'Enfoque', v: 'Sin humo' },
                ].map((stat) => (
                  <div key={stat.k}>
                    <p className="font-display text-sm font-bold text-electric">
                      {stat.k}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta title="¿Hablamos de tu cuenta?" />
    </main>
  )
}
