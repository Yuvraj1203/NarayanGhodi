import { Instagram, MapPin, Phone } from 'lucide-react';
import { BUSINESS, CONFIRMED_SERVICES, FULL_ADDRESS, NAV_LINKS, TEL_LINK, whatsappLink } from '@/lib/site-data';
import { Logo } from '@/components/logo';
import { Ornament } from '@/components/ornament';
import { WhatsAppGlyph } from '@/components/whatsapp-glyph';

export function Footer() {
  const year = new Date().getFullYear();
  const heading = 'eyebrow mb-5 text-gold-400';
  const link = 'text-sm text-ivory-200/70 transition-colors hover:text-gold-300';

  return (
    <footer className="relative overflow-hidden bg-charcoal-950 jaali-texture pb-24 pt-20 text-ivory-100 md:pb-10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="container-site">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory-200/70">
              Traditional Rajasthani wedding ghodi and horse services in Udaipur — for a wedding entry that feels
              truly royal.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center border border-gold-500/30 text-gold-300 transition-colors hover:border-gold-400 hover:bg-gold-500/10"
              >
                <WhatsAppGlyph className="h-5 w-5" />
              </a>
              <a
                href={BUSINESS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps"
                className="flex h-11 w-11 items-center justify-center border border-gold-500/30 text-gold-300 transition-colors hover:border-gold-400 hover:bg-gold-500/10"
              >
                <MapPin className="h-5 w-5" />
              </a>
              {BUSINESS.instagram && (
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center border border-gold-500/30 text-gold-300 transition-colors hover:border-gold-400 hover:bg-gold-500/10"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <p className={heading}>Quick Links</p>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={heading}>Services</p>
            <ul className="space-y-3">
              {CONFIRMED_SERVICES.map((s) => (
                <li key={s.title}>
                  <a href="#services" className={link}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={heading}>Contact</p>
            <address className="space-y-4 not-italic">
              <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${link} flex gap-3`}>
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                <span>{FULL_ADDRESS}</span>
              </a>
              <a href={TEL_LINK} className={`${link} flex items-center gap-3`}>
                <Phone className="h-4 w-4 shrink-0 text-gold-500" aria-hidden="true" />
                {BUSINESS.phoneDisplay}
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`${link} flex items-center gap-3`}>
                <WhatsAppGlyph className="h-4 w-4 shrink-0 text-gold-500" />
                WhatsApp {BUSINESS.phoneDisplay}
              </a>
            </address>
          </div>
        </div>

        <Ornament className="mt-16" />
        <div className="mt-8 flex flex-col items-center justify-between gap-3 text-center text-xs text-ivory-200/50 sm:flex-row sm:text-left">
          <p>
            © {year} {BUSINESS.name}. All rights reserved.
          </p>
          <p>Udaipur, Rajasthan, India</p>
        </div>
      </div>
    </footer>
  );
}
