'use client';

import { useEffect, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { BUSINESS, NAV_LINKS, TEL_LINK, whatsappLink } from '@/lib/site-data';
import { Logo } from '@/components/logo';
import { WhatsAppGlyph } from '@/components/whatsapp-glyph';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500',
          solid
            ? 'bg-maroon-950/95 py-2.5 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.6)] backdrop-blur-md'
            : 'bg-gradient-to-b from-black/50 to-transparent py-4 sm:py-5'
        )}
      >
        <nav aria-label="Main" className="container-site flex items-center justify-between gap-4">
          <a
            href="#home"
            aria-label={`${BUSINESS.name} — home`}
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={active === link.href ? 'true' : undefined}
                  className={cn(
                    'group relative px-3.5 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 xl:px-4',
                    active === link.href ? 'text-gold-300' : 'text-ivory-100/85 hover:text-gold-300'
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute inset-x-3.5 -bottom-0.5 h-px origin-center bg-gold-400 transition-transform duration-300 xl:inset-x-4',
                      active === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={TEL_LINK}
              className="hidden items-center gap-2 px-3 text-[13px] font-medium text-ivory-100/85 transition-colors hover:text-gold-300 xl:flex"
            >
              <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" />
              {BUSINESS.phoneDisplay}
            </a>
            <a href="#enquiry" className="btn-gold hidden min-h-[42px] px-5 sm:inline-flex">
              Book Now
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 items-center justify-center text-ivory-50 lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu — rendered outside <header>: the header's backdrop-filter would
          otherwise become the containing block for this fixed element and collapse it. */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-[45] bg-maroon-950 jaali-texture pt-[64px] transition-[opacity,visibility] duration-300 lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        <div className="container-site flex h-full flex-col overflow-y-auto pb-8 pt-6">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                className={cn(
                  'border-b border-gold-500/10 transition-all duration-500',
                  open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
                )}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : '0ms' }}
              >
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex min-h-[56px] items-center font-serif text-2xl',
                    active === link.href ? 'text-gold-300' : 'text-ivory-50'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 pt-8">
            <a href="#enquiry" onClick={() => setOpen(false)} className="btn-gold w-full">
              Book Now
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a href={TEL_LINK} className="btn-outline-light">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline-light">
                <WhatsAppGlyph className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
