import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { BUSINESS, SITE_URL } from '@/lib/site-data';
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

// Title ≈ 60 chars and description ≈ 155 chars so Google shows them without truncation.
const TITLE = 'Wedding Ghodi in Udaipur for Baraat | Narayan Mali Ghodi Wale';
const DESCRIPTION =
  'Book a royal wedding ghodi in Udaipur for your baraat & groom entry. Narayan Mali Ghodi Wale, New Bhupalpura · 5.0★ on Google · Call +91 82092 96418.';
const SHARE_DESCRIPTION =
  'Traditional Rajasthani wedding ghodi for your baraat and groom entry in Udaipur. Rated 5.0 on Google. Call or WhatsApp +91 82092 96418.';

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
    'ghodi booking Udaipur',
    'horse for baraat Udaipur',
    'horse rental Udaipur',
    'ghodi wale Udaipur',
    'Bhupalpura Udaipur ghodi',
    'शादी के लिए घोड़ी उदयपुर',
    'बारात घोड़ी उदयपुर',
    'नारायण माली घोड़ी वाले',
  ],
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: BUSINESS.name,
    title: 'Wedding Ghodi in Udaipur | Narayan Mali Ghodi Wale',
    description: SHARE_DESCRIPTION,
    // Share image: app/opengraph-image.jpg (+ .alt.txt) via the file convention.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Ghodi in Udaipur | Narayan Mali Ghodi Wale',
    description: SHARE_DESCRIPTION,
    // Image: app/twitter-image.jpg
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token from Google Search Console.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  category: 'Wedding Services',
  appleWebApp: { title: 'Narayan Mali', capable: true, statusBarStyle: 'black-translucent' },
  themeColor: '#2d060b',
  viewport: { width: 'device-width', initialScale: 1 },
  other: {
    // Local-SEO geo hints (region code for Rajasthan, India). Coordinates are
    // intentionally omitted until the exact location is confirmed.
    'geo.region': 'IN-RJ',
    'geo.placename': 'Udaipur, Rajasthan',
  },
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
