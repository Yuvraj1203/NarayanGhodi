'use client';

import { useEffect, useState } from 'react';
import { CalendarHeart, Phone } from 'lucide-react';
import { TEL_LINK, whatsappLink } from '@/lib/site-data';
import { WhatsAppGlyph } from '@/components/whatsapp-glyph';
import { cn } from '@/lib/utils';

/**
 * Desktop: floating WhatsApp button (always visible).
 * Mobile: sticky bottom action bar (Call / WhatsApp / Book) shown after the hero.
 */
export function FloatingActions() {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group fixed bottom-6 right-6 z-40 hidden items-center gap-0 rounded-full bg-[#1f9d55] p-4 text-white shadow-[0_12px_32px_-8px_rgb(0_0_0/0.45)] ring-1 ring-white/20 transition-all duration-300 hover:gap-2.5 hover:bg-[#1a8a4a] hover:pr-6 md:flex"
      >
        <WhatsAppGlyph className="h-6 w-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[160px]">
          WhatsApp Us
        </span>
      </a>

      <nav
        aria-label="Quick contact"
        className={cn(
          'fixed inset-x-0 bottom-0 z-40 border-t border-gold-500/25 bg-maroon-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md transition-transform duration-500 md:hidden',
          pastHero ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="grid grid-cols-3">
          <a href={TEL_LINK} className="flex min-h-[60px] flex-col items-center justify-center gap-1 text-ivory-100 active:bg-white/5">
            <Phone className="h-5 w-5 text-gold-400" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-wide">Call</span>
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[60px] flex-col items-center justify-center gap-1 bg-[#1f9d55] text-white active:brightness-95"
          >
            <WhatsAppGlyph className="h-5 w-5" />
            <span className="text-[11px] font-semibold tracking-wide">WhatsApp</span>
          </a>
          <a href="#enquiry" className="flex min-h-[60px] flex-col items-center justify-center gap-1 text-ivory-100 active:bg-white/5">
            <CalendarHeart className="h-5 w-5 text-gold-400" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-wide">Book</span>
          </a>
        </div>
      </nav>
    </>
  );
}
