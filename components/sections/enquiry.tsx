'use client';

import { useState, type FormEvent } from 'react';
import { CalendarHeart, CheckCircle2, Loader2, Phone } from 'lucide-react';
import { BUSINESS, ENQUIRY_SERVICE_OPTIONS, GUEST_OPTIONS, TEL_LINK, whatsappLink } from '@/lib/site-data';
import { SectionHeading } from '@/components/section-heading';
import { Reveal } from '@/components/reveal';
import { CornerFrame } from '@/components/ornament';
import { WhatsAppGlyph } from '@/components/whatsapp-glyph';
import { cn } from '@/lib/utils';

interface FormState {
  full_name: string;
  phone: string;
  wedding_date: string;
  wedding_venue: string;
  service_required: string;
  guest_count: string;
  message: string;
}

const EMPTY: FormState = {
  full_name: '',
  phone: '',
  wedding_date: '',
  wedding_venue: '',
  service_required: '',
  guest_count: '',
  message: '',
};

function formatDate(iso: string) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function buildMessage(f: FormState) {
  const details = [
    `Name: ${f.full_name}`,
    `Phone: ${f.phone}`,
    f.wedding_date && `Wedding date: ${formatDate(f.wedding_date)}`,
    f.wedding_venue && `Venue: ${f.wedding_venue}`,
    f.service_required && `Service: ${f.service_required}`,
    f.guest_count && `Guests: ${f.guest_count}`,
    f.message && `Message: ${f.message}`,
  ];
  return `Hello ${BUSINESS.name}, I would like to check availability for my wedding.\n\n${details.filter(Boolean).join('\n')}`;
}

const input =
  'w-full min-h-[50px] border border-maroon-900/15 bg-white/70 px-4 py-3 text-[15px] text-maroon-950 placeholder:text-muted-foreground/60 transition-colors focus:border-gold-600 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gold-600';
const label = 'mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon-800';

export function Enquiry() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [error, setError] = useState('');

  const set = (k: keyof FormState) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!/^[+\d][\d\s-]{8,18}$/.test(form.phone.trim())) {
      setError('Please enter a valid phone number.');
      return;
    }
    setStatus('sending');
    const honeypot = (e.currentTarget.elements.namedItem('company') as HTMLInputElement | null)?.value ?? '';
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, company: honeypot }),
      });
    } catch {
      // Network failure is fine — the WhatsApp step below still delivers the enquiry.
    }
    setSubmitted(form);
    setStatus('done');
  }

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="relative bg-ivory-200/60 py-20 sm:py-28">
      <div className="container-site grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="enquiry-title"
            align="left"
            eyebrow="Wedding Enquiry"
            title={
              <>
                Reserve your <em className="text-gold-700">royal ghodi</em>
              </>
            }
            subtitle="Share your wedding details and we’ll confirm availability for your date directly on WhatsApp or by phone."
          />
          <Reveal delay={150} className="mt-10 space-y-4">
            <a href={TEL_LINK} className="group flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center border border-gold-600/40 text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-maroon-950">
                <Phone className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">Call us</span>
                <span className="font-serif text-2xl font-semibold text-maroon-900">{BUSINESS.phoneDisplay}</span>
              </span>
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center border border-gold-600/40 text-gold-700 transition-colors group-hover:bg-[#1f9d55] group-hover:text-white">
                <WhatsAppGlyph className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground">WhatsApp</span>
                <span className="font-serif text-2xl font-semibold text-maroon-900">Message us directly</span>
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={100} className="relative bg-ivory-50 p-6 shadow-[0_30px_80px_-40px_hsl(350_72%_15%/0.45)] sm:p-10">
          <CornerFrame className="inset-3" />

          {status === 'done' && submitted ? (
            <div className="relative flex flex-col items-center py-8 text-center" role="status" aria-live="polite">
              <CheckCircle2 className="h-14 w-14 text-gold-600" aria-hidden="true" />
              <h3 className="mt-5 font-serif text-3xl font-semibold text-maroon-900">One last step</h3>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                Thank you, {submitted.full_name.split(' ')[0]}. Send your details to us on WhatsApp — it’s the fastest
                way to confirm availability for your date.
              </p>
              <a
                href={whatsappLink(buildMessage(submitted))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-[52px] w-full max-w-sm items-center justify-center gap-2 bg-[#1f9d55] px-7 text-sm font-semibold tracking-wide text-white shadow-lg transition hover:bg-[#1a8a4a]"
              >
                <WhatsAppGlyph className="h-5 w-5" />
                Send on WhatsApp
              </a>
              <a href={TEL_LINK} className="btn-outline-dark mt-3 w-full max-w-sm">
                <Phone className="h-4 w-4" aria-hidden="true" /> Or call {BUSINESS.phoneDisplay}
              </a>
              <button
                type="button"
                onClick={() => {
                  setForm(EMPTY);
                  setStatus('idle');
                }}
                className="mt-6 text-sm text-maroon-800 underline underline-offset-4 hover:text-gold-700"
              >
                Start a new enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="relative grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="full_name" className={label}>
                  Full Name <span className="text-gold-700">*</span>
                </label>
                <input id="full_name" name="full_name" required autoComplete="name" value={form.full_name} onChange={set('full_name')} className={input} placeholder="Your full name" />
              </div>
              <div>
                <label htmlFor="phone" className={label}>
                  Phone Number <span className="text-gold-700">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={set('phone')}
                  className={input}
                  placeholder="+91 98765 43210"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'form-error' : undefined}
                />
              </div>
              <div>
                <label htmlFor="wedding_date" className={label}>
                  Wedding Date
                </label>
                <input id="wedding_date" name="wedding_date" type="date" value={form.wedding_date} onChange={set('wedding_date')} className={input} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="wedding_venue" className={label}>
                  Wedding Venue
                </label>
                <input id="wedding_venue" name="wedding_venue" value={form.wedding_venue} onChange={set('wedding_venue')} className={input} placeholder="Venue name and area" />
              </div>
              <div>
                <label htmlFor="service_required" className={label}>
                  Service Required
                </label>
                <select id="service_required" name="service_required" value={form.service_required} onChange={set('service_required')} className={cn(input, !form.service_required && 'text-muted-foreground/70')}>
                  <option value="">Select a service</option>
                  {ENQUIRY_SERVICE_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="guest_count" className={label}>
                  Number of Guests
                </label>
                <select id="guest_count" name="guest_count" value={form.guest_count} onChange={set('guest_count')} className={cn(input, !form.guest_count && 'text-muted-foreground/70')}>
                  <option value="">Select</option>
                  {GUEST_OPTIONS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={label}>
                  Message
                </label>
                <textarea id="message" name="message" rows={4} value={form.message} onChange={set('message')} className={cn(input, 'resize-y')} placeholder="Timing, baraat route, or anything else we should know" />
              </div>

              {/* Honeypot for bots */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              {error && (
                <p id="form-error" role="alert" className="text-sm font-medium text-destructive sm:col-span-2">
                  {error}
                </p>
              )}

              <div className="sm:col-span-2">
                <button type="submit" disabled={status === 'sending'} className="btn-gold w-full text-[15px] disabled:opacity-70">
                  {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> : <CalendarHeart className="h-5 w-5" aria-hidden="true" />}
                  Check Availability
                </button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  We’ll reply on WhatsApp or by phone. Your details are only used to respond to your enquiry.
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
