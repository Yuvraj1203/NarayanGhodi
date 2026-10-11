import Image from 'next/image';
import { WHY_CHOOSE_US } from '@/lib/site-data';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { Icon } from '@/components/icons';

const FEATURE_IMAGE = {
  src: 'https://images.pexels.com/photos/10597442/pexels-photo-10597442.jpeg?auto=compress&cs=tinysrgb&w=1400',
  alt: 'White ghodi dressed in a red and gold embroidered wedding cape',
};

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="relative overflow-hidden bg-maroon-950 jaali-texture py-20 sm:py-28">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="why-title"
            align="left"
            tone="light"
            eyebrow="Why Choose Us"
            title={
              <>
                Rooted in Udaipur. <em className="text-gold-300">Devoted to weddings.</em>
              </>
            }
          />
          <ul className="mt-10 space-y-2">
            {WHY_CHOOSE_US.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 80}>
                <div className="group flex gap-5 border-b border-gold-500/10 py-5 last:border-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold-500/40 text-gold-300 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-maroon-950">
                    <Icon name={item.icon} className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-ivory-50 sm:text-2xl">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ivory-200/70 sm:text-base">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal variant="image" className="relative">
          <div className="gold-frame relative aspect-[4/5] overflow-hidden sm:aspect-[5/6]">
            <Image src={FEATURE_IMAGE.src} alt={FEATURE_IMAGE.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/60 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
