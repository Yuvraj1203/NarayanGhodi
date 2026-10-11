'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory } from '@/lib/site-data';
import { SectionHeading } from '@/components/section-heading';
import { cn } from '@/lib/utils';

type Filter = 'All' | GalleryCategory;
const FILTERS: Filter[] = ['All', ...GALLERY_CATEGORIES.filter((c) => GALLERY.some((g) => g.category === c))];
const INITIAL_COUNT = 9;

export function Gallery() {
  const [filter, setFilter] = useState<Filter>('All');
  const [expanded, setExpanded] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const items = useMemo(() => (filter === 'All' ? GALLERY : GALLERY.filter((g) => g.category === filter)), [filter]);
  const visible = expanded ? items : items.slice(0, INITIAL_COUNT);
  const hasSamples = GALLERY.some((g) => g.sample);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setLightbox((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, close, step]);

  const active = lightbox !== null ? items[lightbox] : null;

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-ivory-paper py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          id="gallery-title"
          eyebrow="Gallery"
          title={
            <>
              Moments of <em className="text-gold-700">Rajasthani royalty</em>
            </>
          }
          subtitle={
            hasSamples
              ? 'Groom entries, decorated ghodi, baraat and wedding moments. Representative images shown while our own wedding photography is being added.'
              : 'Groom entries, decorated ghodi, baraat and wedding moments.'
          }
        />

        <div
          role="tablist"
          aria-label="Filter gallery"
          className="-mx-5 mt-12 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => {
                setFilter(f);
                setExpanded(false);
              }}
              className={cn(
                'min-h-[44px] shrink-0 border px-5 text-[13px] font-semibold tracking-wide transition-colors duration-300',
                filter === f
                  ? 'border-maroon-900 bg-maroon-900 text-ivory-50'
                  : 'border-maroon-900/15 text-maroon-900 hover:border-gold-600 hover:text-gold-700'
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="mt-10 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {visible.map((img, i) => (
            <li key={img.src + filter} className="mb-3 break-inside-avoid animate-in fade-in duration-700 sm:mb-4">
              <button
                type="button"
                onClick={() => setLightbox(i)}
                className="group relative block w-full overflow-hidden bg-maroon-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2"
                style={{ aspectRatio: img.ratio }}
                aria-label={`Open image: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-4">
                  <span className="text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-200">{img.category}</span>
                  <Expand className="h-4 w-4 text-ivory-50" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {items.length > INITIAL_COUNT && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setExpanded((e) => !e)} className="btn-outline-dark">
              {expanded ? 'Show fewer' : `View all ${items.length} photos`}
            </button>
          </div>
        )}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal-950/95 p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={close}
        >
          <figure className="relative h-[78vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={active.src.replace(/w=\d+/, 'w=1920')} alt={active.alt} fill sizes="100vw" className="object-contain" />
            <figcaption className="absolute -bottom-10 inset-x-0 text-center text-sm text-ivory-200/80">
              {active.alt}
            </figcaption>
          </figure>
          <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center text-ivory-50 hover:text-gold-300">
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-gold-500/30 bg-charcoal-950/60 text-ivory-50 hover:text-gold-300 sm:left-6"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-gold-500/30 bg-charcoal-950/60 text-ivory-50 hover:text-gold-300 sm:right-6"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </section>
  );
}
