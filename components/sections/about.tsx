import Image from 'next/image';
import { CalendarHeart, MapPin, Star } from 'lucide-react';
import { ABOUT_IMAGE, BUSINESS } from '@/lib/site-data';
import { Reveal } from '@/components/reveal';
import { CornerFrame, Ornament } from '@/components/ornament';

/** Verified figures only — do not add statistics that the business has not provided. */
const STATS = [
  { value: `${BUSINESS.rating.value.toFixed(1)}★`, label: 'Google Rating', icon: Star },
  { value: `${BUSINESS.rating.count}+`, label: 'Google Reviews', icon: Star },
  { value: 'Weddings', label: 'Wedding & Event Services', icon: CalendarHeart },
  { value: 'Udaipur', label: 'Rajasthan, India', icon: MapPin },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative bg-ivory-paper">
      {/* Trust strip */}
      <div className="relative z-10 -mt-px bg-maroon-950 jaali-texture">
        <div className="container-site">
          <dl className="grid grid-cols-2 divide-gold-500/15 lg:grid-cols-4 lg:divide-x">
            {STATS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 90}
                className="flex flex-col items-center justify-center gap-1 border-gold-500/15 px-3 py-8 text-center odd:border-r lg:py-10 lg:odd:border-r-0 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0"
              >
                <dd className="font-serif text-3xl font-semibold text-gold-300 sm:text-4xl">{s.value}</dd>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ivory-200/70">{s.label}</dt>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      <div className="container-site grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal variant="image" className="relative order-2 lg:order-1">
          <div className="gold-frame relative aspect-[4/5] overflow-hidden bg-maroon-900 shadow-2xl shadow-maroon-950/25">
            <Image src={ABOUT_IMAGE.src} alt={ABOUT_IMAGE.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-6 -right-3 hidden border border-gold-500/40 bg-ivory-50 px-6 py-5 shadow-xl sm:block lg:-right-8">
            <p className="font-serif text-3xl font-semibold text-maroon-900">{BUSINESS.rating.value.toFixed(1)} / 5</p>
            <p className="mt-1 flex items-center gap-1 text-gold-600" aria-label={`${BUSINESS.rating.value} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
              ))}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{BUSINESS.rating.count} Google reviews</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow text-gold-700">About Us</p>
            <h2 id="about-title" className="mt-5 text-balance font-serif text-[2.1rem] font-semibold leading-[1.08] text-maroon-900 sm:text-5xl">
              The ghodi tradition, <em className="text-gold-700">presented royally</em>
            </h2>
            <Ornament className="mt-6 justify-start" />
          </Reveal>
          <Reveal delay={120} className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              <strong className="font-semibold text-maroon-900">{BUSINESS.name}</strong> is a wedding horse and ghodi
              service based in New Bhupalpura, Udaipur. We bring the traditional Rajasthani ghodi to the moment every
              family waits for — the groom&rsquo;s arrival.
            </p>
            <p>
              Alongside weddings, we offer horse rental, event horse services and horseback riding. Reach us any time —
              our listed availability is {BUSINESS.hours.toLowerCase()}.
            </p>
            {/* PLACEHOLDER: add the family/business story (years, heritage) here once supplied. */}
          </Reveal>
          <Reveal delay={220} className="relative mt-10 p-6">
            <CornerFrame />
            <p className="font-serif text-xl italic leading-snug text-maroon-800 sm:text-2xl">
              “Make your wedding entry truly royal.”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
