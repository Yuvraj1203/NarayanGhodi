import { ExternalLink, Quote, Star } from 'lucide-react';
import { BUSINESS, REVIEWS } from '@/lib/site-data';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { CornerFrame } from '@/components/ornament';

function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={className} role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`inline h-5 w-5 ${i < Math.round(value) ? 'fill-gold-500 text-gold-500' : 'text-gold-500/30'}`} aria-hidden="true" />
      ))}
    </span>
  );
}

/** Shows the verified Google rating, plus verbatim reviews from REVIEWS when supplied. */
export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-ivory-paper py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          id="reviews-title"
          eyebrow="Google Reviews"
          title={
            <>
              A perfect <em className="text-gold-700">5.0 on Google</em>
            </>
          }
        />

        <Reveal className="relative mx-auto mt-14 max-w-xl bg-ivory-50 px-8 py-12 text-center shadow-[0_24px_60px_-30px_hsl(350_72%_15%/0.35)]">
          <CornerFrame className="inset-3" />
          <p className="eyebrow text-muted-foreground">Rated on Google</p>
          <p className="mt-4 font-serif text-7xl font-semibold leading-none text-maroon-900">
            {BUSINESS.rating.value.toFixed(1)}
          </p>
          <Stars value={BUSINESS.rating.value} className="mt-4 inline-flex gap-1" />
          <p className="mt-3 text-sm text-muted-foreground">Based on {BUSINESS.rating.count} Google reviews</p>
          <a href={BUSINESS.reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-dark mt-8">
            Read our reviews on Google
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </Reveal>

        {REVIEWS.length > 0 && (
          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal as="li" key={r.author + i} delay={i * 100} className="flex">
                <figure className="flex flex-1 flex-col border border-gold-500/25 bg-ivory-50 p-7">
                  <Quote className="h-7 w-7 text-gold-500/60" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/85">{r.text}</blockquote>
                  <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-maroon-900/10 pt-5">
                    <span>
                      <span className="block font-semibold text-maroon-900">{r.author}</span>
                      {r.date && <span className="text-xs text-muted-foreground">{r.date} · Google</span>}
                    </span>
                    <Stars value={r.rating} className="flex shrink-0 [&_svg]:h-4 [&_svg]:w-4" />
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
