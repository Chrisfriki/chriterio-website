import Link from 'next/link'
import { ArrowRight, Package, Target, LineChart } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SELLER_PROOF } from '@/lib/data'

const ICONS = [Package, Target, LineChart]

export function SellerReal() {
  return (
    <section className="bg-light px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-xs font-semibold tracking-widest text-electric uppercase">
              Seller real, no solo consultor
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy text-balance md:text-4xl">
              Analizo cuentas con criterio de seller, no de agencia
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground text-pretty">
              Gestiono mis propias cuentas en Amazon: inventario, reorders, PPC y
              decisiones reales cada semana, con mi dinero.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {SELLER_PROOF.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={item.title} delay={0.1 + i * 0.08}>
                <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
                  {/* Mock Seller Central capture placeholder */}
                  <div className="relative flex h-36 items-end gap-1.5 border-b border-border bg-navy-dark p-5">
                    <span className="absolute top-4 left-5 flex items-center gap-2 text-[10px] font-medium tracking-wide text-white/50 uppercase">
                      <Icon className="size-3.5 text-electric" />
                      Seller Central
                    </span>
                    <div className="h-8 w-full rounded-sm bg-white/10" />
                    <div className="h-14 w-full rounded-sm bg-white/15" />
                    <div className="h-20 w-full rounded-sm bg-electric/60" />
                    <div className="h-11 w-full rounded-sm bg-white/15" />
                    <div className="h-16 w-full rounded-sm bg-white/10" />
                  </div>
                  <div className="flex flex-col gap-1.5 p-6">
                    <h3 className="font-display text-base font-bold tracking-tight text-navy">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2}>
          <Link
            href="/como-trabajo"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-electric transition-colors hover:text-navy"
          >
            Cómo trabajo
            <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
