import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { BUSINESS, HERO_IMAGE, SITE_URL } from '@/lib/site-data';
import { StructuredData } from '@/components/structured-data';

// Self-hosted variable fonts (Latin subset from Google Fonts, OFL licensed) —
// no network fetch at build or dev time.
const serif = localFont({
  src: [
    { path: './fonts/cormorant-garamond-latin.woff2', weight: '500 700', style: 'normal' },
    { path: './fonts/cormorant-garamond-italic-latin.woff2', weight: '500 700', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
  fallback: ['Georgia', 'serif'],
});

const sans = localFont({
  src: './fonts/manrope-latin.woff2',
  weight: '200 800',
  variable: '--font-sans',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
});

const TITLE = 'Wedding Ghodi in Udaipur | Narayan Mali Ghodi Wale';
const DESCRIPTION =
  'Narayan Mali Ghodi Wale – traditional Rajasthani wedding ghodi and horse services in Udaipur. Book a royal ghodi for your baraat and groom entry. Call or WhatsApp +91 82092 96418.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${BUSINESS.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    'Narayan Mali Ghodi Wale',
    'ghodi for wedding Udaipur',
    'wedding ghodi Udaipur',
    'wedding horse Udaipur',
    'baraat ghodi Udaipur',
    'Rajasthani wedding ghodi',
    'royal ghodi Udaipur',
    'horse rental Udaipur',
  ],
  applicationName: BUSINESS.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: BUSINESS.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: HERO_IMAGE.src.replace(/w=\d+/, 'w=1200'), width: 1200, height: 800, alt: HERO_IMAGE.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [HERO_IMAGE.src.replace(/w=\d+/, 'w=1200')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'Wedding Services',
  formatDetection: { telephone: true },
  themeColor: '#2a0a10',
  viewport: { width: 'device-width', initialScale: 1 },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <StructuredData />
        <noscript>
          <style>{'.reveal,.reveal-image{opacity:1!important;transform:none!important;clip-path:none!important}'}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
