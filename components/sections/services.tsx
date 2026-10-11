import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { CONFIRMED_SERVICES } from '@/lib/site-data';
import { Reveal } from '@/components/reveal';
import { SectionHeading } from '@/components/section-heading';
import { Icon } from '@/components/icons';

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-maroon-950 bg-jaali py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          id="services-title"
          tone="light"
          eyebrow="Our Services"
          title={
            <>
              Wedding horse services, <em className="text-gold-300">made for the occasion</em>
            </>
          }
          subtitle="From the groom’s ghodi to horses for events and riding — tell us about your celebration and we’ll take care of the rest."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {CONFIRMED_SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 100}>
              <a
                href="#enquiry"
                className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden border border-gold-500/20 bg-charcoal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
              >
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover opacity-70 transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-transparent" />
                <div className="relative p-7">
                  <span className="flex h-12 w-12 items-center justify-center border border-gold-500/50 bg-maroon-950/60 text-gold-300 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-maroon-950">
                    <Icon name={s.icon} className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-2xl font-semibold text-ivory-50">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ivory-200/75">{s.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
                    Enquire
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
