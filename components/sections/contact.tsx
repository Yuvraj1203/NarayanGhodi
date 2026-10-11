import { Clock, Instagram, MapPin, Navigation, Phone } from 'lucide-react';
import { BUSINESS, TEL_LINK, whatsappLink } from '@/lib/site-data';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { WhatsAppGlyph } from '@/components/whatsapp-glyph';
import { cn } from '@/lib/utils';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ivory-paper py-20 sm:py-28">
      <div className="container-site">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title={
            <>
              Visit or call <em className="text-gold-700">any time</em>
            </>
          }
        />

        <div className="mt-14 grid overflow-hidden border border-gold-500/25 bg-ivory-50 shadow-[0_24px_60px_-30px_hsl(350_72%_15%/0.35)] lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="flex flex-col p-8 sm:p-12">
            <h3 className="font-serif text-3xl font-semibold text-maroon-900">{BUSINESS.name}</h3>

            <address className="mt-8 space-y-6 not-italic">
              <div className="flex gap-4">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                <p className="leading-relaxed text-foreground/85">
                  {BUSINESS.address.street.split(', ')[0]},
                  <br />
                  {BUSINESS.address.street.split(', ').slice(1).join(', ')},
                  <br />
                  {BUSINESS.address.locality}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                <a href={TEL_LINK} className="font-semibold text-maroon-900 hover:text-gold-700">
                  {BUSINESS.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                <p className="text-foreground/85">{BUSINESS.hours}</p>
              </div>
            </address>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <a href={TEL_LINK} className="btn-gold">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call Now
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#1f9d55] px-7 text-sm font-semibold tracking-wide text-white transition hover:bg-[#1a8a4a]"
              >
                <WhatsAppGlyph className="h-4 w-4" /> WhatsApp
              </a>
              <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className={cn('btn-outline-dark', !BUSINESS.instagram && 'sm:col-span-2')}>
                <Navigation className="h-4 w-4" aria-hidden="true" /> Google Maps
              </a>
              {BUSINESS.instagram && (
                <a href={BUSINESS.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
                  <Instagram className="h-4 w-4" aria-hidden="true" /> Instagram
                </a>
              )}
            </div>
          </Reveal>

          <div className="relative min-h-[360px] bg-muted lg:min-h-full">
            <iframe
              title={`Map showing ${BUSINESS.name}, Udaipur`}
              src={BUSINESS.mapsEmbedUrl}
              className="absolute inset-0 h-full w-full border-0 grayscale-[30%] sepia-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
