import { Reveal } from '@/components/reveal'

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <header className="bg-navy-dark px-5 pt-32 pb-16 text-white md:pt-40 md:pb-24">
      <div className="mx-auto max-w-6xl">
        {eyebrow && (
          <Reveal>
            <span className="text-xs font-semibold tracking-widest text-electric uppercase">
              {eyebrow}
            </span>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-lg text-pretty">
              {subtitle}
            </p>
          </Reveal>
        )}
      </div>
    </header>
  )
}
