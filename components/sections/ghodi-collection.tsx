import { GHODI_COLLECTION } from '@/lib/site-data';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { GhodiCard } from '@/components/sections/ghodi-card';

export function GhodiCollection() {
  return (
    <section id="ghodi" aria-labelledby="ghodi-title" className="bg-ivory-paper py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          id="ghodi-title"
          eyebrow="Our Ghodi"
          title={
            <>
              Meet Our <em className="text-gold-700">Royal Ghodi</em> Collection
            </>
          }
          subtitle="Each ghodi is dressed for the celebration. Profiles and photographs of our horses are being added — ask us on WhatsApp for current photos."
        />

        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {GHODI_COLLECTION.map((g, i) => (
            <Reveal as="li" key={g.id} delay={i * 120}>
              <GhodiCard ghodi={g} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
