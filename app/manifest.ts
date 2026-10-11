import type { MetadataRoute } from 'next';
import { BUSINESS } from '@/lib/site-data';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BUSINESS.name} – Wedding Ghodi in Udaipur`,
    short_name: 'Narayan Mali',
    description: 'Traditional Rajasthani wedding ghodi and horse services in Udaipur.',
    start_url: '/',
    display: 'standalone',
    background_color: '#2d060b',
    theme_color: '#2d060b',
    lang: 'en-IN',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
