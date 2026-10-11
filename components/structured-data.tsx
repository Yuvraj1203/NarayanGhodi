import { BUSINESS, CONFIRMED_SERVICES, HERO_IMAGE, SITE_URL } from '@/lib/site-data';

/**
 * JSON-LD for local SEO. Only verified business facts are included.
 *
 * Intentionally omitted until supplied: geo coordinates, priceRange, logo,
 * founding date, email. `aggregateRating` is also omitted on purpose — Google
 * does not allow businesses to mark up ratings collected on third-party
 * sites (such as Google reviews) about themselves.
 */
export function StructuredData() {
  const businessId = `${SITE_URL}/#business`;

  const graph = [
    {
      '@type': 'LocalBusiness',
      '@id': businessId,
      name: BUSINESS.name,
      description:
        'Traditional Rajasthani wedding ghodi and horse services in Udaipur, Rajasthan.',
      url: SITE_URL,
      telephone: BUSINESS.phoneE164,
      image: HERO_IMAGE.src.replace(/w=\d+/, 'w=1200'),
      address: {
        '@type': 'PostalAddress',
        streetAddress: BUSINESS.address.street,
        addressLocality: BUSINESS.address.locality,
        addressRegion: BUSINESS.address.region,
        postalCode: BUSINESS.address.postalCode,
        addressCountry: BUSINESS.address.country,
      },
      hasMap: BUSINESS.mapsUrl,
      areaServed: { '@type': 'City', name: 'Udaipur' },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      knowsAbout: ['Wedding ghodi', 'Baraat', 'Rajasthani weddings', 'Horse rental'],
      ...(BUSINESS.instagram ? { sameAs: [BUSINESS.instagram] } : {}),
      ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Wedding horse services',
        itemListElement: CONFIRMED_SERVICES.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@id': `${SITE_URL}/#service-${slug(s.title)}` },
        })),
      },
    },
    ...CONFIRMED_SERVICES.map((s) => ({
      '@type': 'Service',
      '@id': `${SITE_URL}/#service-${slug(s.title)}`,
      name: s.title,
      serviceType: s.title,
      description: s.description,
      provider: { '@id': businessId },
      areaServed: { '@type': 'City', name: 'Udaipur' },
    })),
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS.name,
      inLanguage: 'en-IN',
      publisher: { '@id': businessId },
    },
  ];

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c'),
      }}
    />
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
