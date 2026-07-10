import { LinkButton } from '@/components/link-button'
import { Reveal } from '@/components/reveal'
import { CALENDLY_URL, WHATSAPP_URL } from '@/lib/site'

export function FinalCta({
  title = '¿Vemos qué está frenando tu cuenta?',
  note = 'Julio-agosto es el momento: quien quiere llegar fuerte a Q4 se mueve ahora.',
}: {
  title?: string
  note?: string
}) {
  return (
    <section className="bg-navy-dark px-5 py-24 text-white">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href={CALENDLY_URL} external>
              Reserva una llamada gratis de 15 min
            </LinkButton>
            <LinkButton href={WHATSAPP_URL} external variant="ghost-light">
              Escríbeme por WhatsApp
            </LinkButton>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-md text-sm leading-relaxed text-white/50 text-pretty">
            {note}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
