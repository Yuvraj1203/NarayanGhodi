import Image from 'next/image';
import { CalendarHeart, MapPin } from 'lucide-react';
import { HERO_IMAGE, whatsappLink } from '@/lib/site-data';
import { Parallax } from '@/components/parallax';
import { Ornament } from '@/components/ornament';
import { WhatsAppGlyph } from '@/components/whatsapp-glyph';

const HEADLINE_1 = ['Make', 'Your', 'Wedding', 'Entry'];
const HEADLINE_2 = ['Truly', 'Royal'];

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-charcoal-950">
      <Parallax speed={0.35} className="absolute inset-0 -z-10 h-[115%]">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[35%_center] sm:object-center"
        />
      </Parallax>
      {/* Cinematic grading */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal-950/70 via-maroon-950/45 to-charcoal-950/95" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgb(0_0_0/0.55)_100%)]" />

      <div className="container-site relative pb-28 pt-32 text-center sm:pb-32">
        <p className="fade-rise eyebrow flex items-center justify-center gap-2 text-gold-300" style={{ animationDelay: '150ms' }}>
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
          Wedding Ghodi · Udaipur, Rajasthan
        </p>

        <h1
          id="hero-title"
          className="text-shadow-hero mx-auto mt-6 max-w-5xl font-serif text-[2.75rem] font-semibold leading-[1.02] text-ivory-50 sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          <span className="block">
            {HEADLINE_1.map((w, i) => (
              <span key={w} className="word-rise mr-[0.22em]" style={{ animationDelay: `${300 + i * 110}ms` }}>
                {w}
              </span>
            ))}
          </span>
          <span className="mt-1 block italic text-gold-300">
            {HEADLINE_2.map((w, i) => (
              <span key={w} className="word-rise mr-[0.22em] last:mr-0" style={{ animationDelay: `${800 + i * 130}ms` }}>
                {w}
              </span>
            ))}
          </span>
        </h1>

        <Ornament className="fade-rise mt-8" />

        <p
          className="fade-rise text-shadow-hero mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory-100/90 sm:text-lg md:text-xl"
          style={{ animationDelay: '1150ms' }}
        >
          Traditional Rajasthani Ghodi &amp; Wedding Horse Services in Udaipur
        </p>

        <div
          className="fade-rise mx-auto mt-10 flex max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
          style={{ animationDelay: '1300ms' }}
        >
          <a href="#enquiry" className="btn-gold px-9">
            <CalendarHeart className="h-5 w-5" aria-hidden="true" />
            Book a Ghodi
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-outline-light px-9">
            <WhatsAppGlyph className="h-5 w-5" />
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to next section"
        className="fade-rise absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-ivory-100/60 transition-colors hover:text-gold-300"
        style={{ animationDelay: '1700ms' }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.35em]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory-100/20">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/3 bg-gold-400" />
        </span>
      </a>
    </section>
  );
}
