'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Ghodi } from '@/lib/site-data';
import { whatsappLink } from '@/lib/site-data';
import { WhatsAppGlyph } from '@/components/whatsapp-glyph';
import { cn } from '@/lib/utils';

const PENDING = 'To be confirmed';

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-maroon-900/10 py-2.5 text-sm last:border-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon-800/70">{label}</dt>
      <dd className={cn('text-right', value ? 'font-medium text-maroon-950' : 'italic text-muted-foreground/80')}>
        {value ?? PENDING}
      </dd>
    </div>
  );
}

export function GhodiCard({ ghodi, index }: { ghodi: Ghodi; index: number }) {
  const [current, setCurrent] = useState(0);
  const image = ghodi.images[current];
  const displayName = ghodi.name ?? `Royal Ghodi ${String(index + 1).padStart(2, '0')}`;
  const hasSample = ghodi.images.some((img) => img.sample);

  return (
    <article className="group flex h-full flex-col border border-gold-500/25 bg-ivory-50 shadow-[0_24px_60px_-30px_hsl(350_72%_15%/0.35)] transition-shadow duration-500 hover:shadow-[0_30px_70px_-28px_hsl(350_72%_15%/0.5)]">
      <div className="gold-frame relative aspect-[4/5] overflow-hidden bg-maroon-900">
        {image && (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="animate-in fade-in object-cover duration-700 group-hover:scale-[1.03] [transition:transform_1.2s_ease-out]"
          />
        )}
        {hasSample && (
          <span className="absolute left-4 top-4 z-10 bg-charcoal-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory-100 backdrop-blur-sm">
            Sample photo
          </span>
        )}
        {ghodi.images.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center gap-2 bg-gradient-to-t from-charcoal-950/70 to-transparent pb-4 pt-10" role="group" aria-label={`${displayName} photos`}>
            {ghodi.images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setCurrent(i)}
                aria-label={`Show photo ${i + 1} of ${ghodi.images.length}`}
                aria-pressed={i === current}
                className={cn(
                  'relative h-12 w-12 overflow-hidden border transition-all',
                  i === current ? 'border-gold-300' : 'border-ivory-100/30 opacity-70 hover:opacity-100'
                )}
              >
                <Image src={img.src} alt="" fill sizes="48px" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-serif text-[1.7rem] font-semibold leading-tight text-maroon-900">{displayName}</h3>
        <dl className="mt-4">
          <Field label="Colour" value={ghodi.color} />
          <Field label="Breed" value={ghodi.breed} />
          <Field label="Decoration" value={ghodi.decorationStyle} />
          <Field label="Suitable for" value={ghodi.suitableEvents?.join(', ') ?? null} />
        </dl>
        <a
          href={whatsappLink(`Hello Narayan Mali Ghodi Wale, I would like to know more about ${displayName} for my wedding.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline-dark mt-6 w-full"
        >
          <WhatsAppGlyph className="h-4 w-4" />
          Ask about this ghodi
        </a>
      </div>
    </article>
  );
}
