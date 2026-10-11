/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — single source of truth for the website.
 *
 *  Everything the business owner may need to edit lives in this file.
 *
 *  RULES
 *  - Only VERIFIED facts are published as-is (see BUSINESS below).
 *  - Anything not yet supplied by the business is `null` / empty and is either
 *    hidden or shown as a clearly-labelled placeholder ("To be confirmed").
 *  - Images marked `sample: true` are stock photography standing in until the
 *    business supplies its own photos. Replace them with real photography
 *    (put files in /public/images/... and use paths like '/images/ghodi-1.jpg').
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Verified business information ────────────────────────────────────────── */

export const BUSINESS = {
  name: 'Narayan Mali Ghodi Wale',
  shortName: 'Narayan Mali',
  phoneDisplay: '+91 82092 96418',
  phoneE164: '+918209296418',
  whatsappNumber: '918209296418',
  address: {
    street: 'Near CPS School, New Bhupalpura, Kharakua',
    locality: 'Udaipur',
    region: 'Rajasthan',
    postalCode: '313001',
    country: 'IN',
    countryName: 'India',
  },
  /** Google rating as listed publicly. Update when it changes. */
  rating: { value: 5.0, count: 13 },
  categories: [
    'Horse rental service',
    'Event planner',
    'Horseback riding service',
    'Wedding service',
  ],
  /** Listed availability on Google. */
  hours: 'Open 24 hours',
  /** Search URL that resolves to the Google Maps listing. Replace with the exact
   *  share link (https://maps.app.goo.gl/...) from Google Maps when available. */
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Narayan+Mali+Ghodi+Wale%2C+New+Bhupalpura%2C+Udaipur%2C+Rajasthan+313001',
  mapsEmbedUrl:
    'https://www.google.com/maps?q=Narayan+Mali+Ghodi+Wale,+New+Bhupalpura,+Kharakua,+Udaipur,+Rajasthan+313001&output=embed',
  /** Google reviews page. Replace with the listing's direct reviews link if available. */
  reviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=Narayan+Mali+Ghodi+Wale+Udaipur',

  /* ── PLACEHOLDERS — not yet supplied by the business ── */
  /** Official Instagram URL, e.g. 'https://www.instagram.com/handle'. Hidden while null. */
  instagram: null as string | null,
  /** Business email. Hidden while null. */
  email: null as string | null,
  /** Logo image path, e.g. '/images/logo.png'. A monogram is shown while null. */
  logo: null as string | null,

  whatsappMessage:
    'Hello Narayan Mali Ghodi Wale, I would like to enquire about booking a ghodi for my wedding.',
} as const;

export const FULL_ADDRESS = `${BUSINESS.address.street}, ${BUSINESS.address.locality}, ${BUSINESS.address.region} ${BUSINESS.address.postalCode}`;

/** Public site URL. Set NEXT_PUBLIC_SITE_URL in production (Netlify also provides URL). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  'http://localhost:3000'
).replace(/\/$/, '');

export function whatsappLink(message: string = BUSINESS.whatsappMessage) {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const TEL_LINK = `tel:${BUSINESS.phoneE164}`;

/* ── Navigation ───────────────────────────────────────────────────────────── */

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Our Ghodi', href: '#ghodi' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
] as const;

/* ── Images ───────────────────────────────────────────────────────────────── */

export interface SiteImage {
  src: string;
  alt: string;
  /** true = stock placeholder, not the business's own photograph */
  sample?: boolean;
}

const pexels = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const HERO_IMAGE: SiteImage = {
  src: pexels(35457634, 2000),
  alt: 'Groom in a sherwani and safa raising his hands on a decorated white wedding ghodi under a red chhatri',
  sample: true,
};

export const ABOUT_IMAGE: SiteImage = {
  src: pexels(19507613),
  alt: 'Groom in traditional attire seated on a decorated ghodi',
  sample: true,
};

/* ── Services ─────────────────────────────────────────────────────────────── */

export type ServiceIcon =
  | 'crown'
  | 'sparkles'
  | 'flag'
  | 'map'
  | 'key'
  | 'calendar'
  | 'camera'
  | 'horse';

export interface Service {
  title: string;
  description: string;
  icon: ServiceIcon;
  image: SiteImage;
  /**
   * Only services with `confirmed: true` are shown on the site, in the
   * enquiry form and in structured data. Set to true once the business
   * confirms it offers the service.
   */
  confirmed: boolean;
}

export const SERVICES: Service[] = [
  {
    title: 'Wedding Ghodi',
    description:
      'A traditionally presented ghodi for the groom’s baraat and wedding-day entry in Udaipur.',
    icon: 'crown',
    image: { src: pexels(39980496), alt: 'Groom celebrating on a decorated white ghodi', sample: true },
    confirmed: true, // Google category: Wedding service
  },
  {
    title: 'Horse Rental',
    description:
      'Horses available on rental for weddings, ceremonies and celebrations — share your date and requirement.',
    icon: 'key',
    image: { src: pexels(35078579), alt: 'Portrait of a white horse wearing a rope halter', sample: true },
    confirmed: true, // Google category: Horse rental service
  },
  {
    title: 'Event Horse Services',
    description:
      'Horse arrangements for functions and events beyond the wedding day, planned around your programme.',
    icon: 'calendar',
    image: { src: pexels(33190948), alt: 'Close-up of an ornate silver and red horse headpiece with gold tassels', sample: true },
    confirmed: true, // Google category: Event planner
  },
  {
    title: 'Horseback Riding',
    description: 'Horseback riding sessions — contact us for timings and availability.',
    icon: 'horse',
    image: { src: pexels(15224125), alt: 'Young man in a shawl standing beside a white horse on sand', sample: true },
    confirmed: true, // Google category: Horseback riding service
  },

  /* ── NOT YET CONFIRMED — hidden until the business confirms ── */
  {
    title: 'Royal Groom Entry',
    description: 'A grand, choreographed groom entry on a decorated ghodi.',
    icon: 'sparkles',
    image: { src: pexels(8286046), alt: 'Groom riding a decorated white ghodi', sample: true },
    confirmed: false,
  },
  {
    title: 'Baraat Services',
    description: 'Ghodi arrangements for the full baraat procession.',
    icon: 'flag',
    image: { src: pexels(36818415), alt: 'Baraat procession with a flower-covered groom on horseback', sample: true },
    confirmed: false,
  },
  {
    title: 'Destination Wedding Services',
    description: 'Ghodi services for destination weddings at venues in and around Udaipur.',
    icon: 'map',
    image: { src: pexels(570031), alt: 'Palace facade in Udaipur', sample: true },
    confirmed: false,
  },
  {
    title: 'Pre-Wedding Photography',
    description: 'A decorated horse for pre-wedding photo and video shoots.',
    icon: 'camera',
    image: { src: pexels(8296805), alt: 'Couple posing beside a decorated white horse', sample: true },
    confirmed: false,
  },
];

export const CONFIRMED_SERVICES = SERVICES.filter((s) => s.confirmed);

/* ── Royal Ghodi collection ───────────────────────────────────────────────── */

export interface Ghodi {
  id: string;
  /** null → shown as "To be confirmed" */
  name: string | null;
  color: string | null;
  breed: string | null;
  decorationStyle: string | null;
  suitableEvents: string[] | null;
  images: SiteImage[];
}

/**
 * PLACEHOLDER COLLECTION — replace with the business's actual horses.
 * Add one entry per ghodi with real photos; delete unused entries.
 */
export const GHODI_COLLECTION: Ghodi[] = [
  {
    id: 'ghodi-1',
    name: null,
    color: null,
    breed: null,
    decorationStyle: null,
    suitableEvents: null,
    images: [
      { src: pexels(10597442), alt: 'White ghodi wearing a red and gold embroidered wedding cape', sample: true },
      { src: pexels(35078579), alt: 'White horse portrait against a stone wall', sample: true },
    ],
  },
  {
    id: 'ghodi-2',
    name: null,
    color: null,
    breed: null,
    decorationStyle: null,
    suitableEvents: null,
    images: [
      { src: pexels(33190948), alt: 'Horse in an ornate silver headpiece with gold tassels', sample: true },
      { src: pexels(39359881), alt: 'Piebald horse beside a sandstone wall', sample: true },
    ],
  },
  {
    id: 'ghodi-3',
    name: null,
    color: null,
    breed: null,
    decorationStyle: null,
    suitableEvents: null,
    images: [
      { src: pexels(8286046), alt: 'Decorated ghodi with beaded headpiece carrying a groom', sample: true },
      { src: pexels(19507613), alt: 'Groom seated on a decorated white ghodi', sample: true },
    ],
  },
];

/* ── Wedding experience ───────────────────────────────────────────────────── */

export const EXPERIENCE_STEPS = [
  {
    number: '01',
    title: 'Choose Your Ghodi',
    description: 'Tell us what you have in mind and we will share the ghodi available for your wedding.',
  },
  {
    number: '02',
    title: 'Select Your Style',
    description: 'Discuss how you would like the ghodi presented so it complements your wedding look.',
  },
  {
    number: '03',
    title: 'Confirm Your Wedding Date',
    description: 'Share your date, timing and venue, and confirm the booking directly with us.',
  },
  {
    number: '04',
    title: 'Make Your Royal Entry',
    description: 'On the day, ride in to your celebration with the entrance your family will remember.',
  },
] as const;

/* ── Gallery ──────────────────────────────────────────────────────────────── */

export const GALLERY_CATEGORIES = [
  'Groom Entries',
  'Decorated Ghodi',
  'Baraat',
  'Wedding Ceremonies',
  'Horse Portraits',
  'Rajasthani Moments',
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryItem extends SiteImage {
  category: GalleryCategory;
  /** Intrinsic aspect ratio (width / height) – used for masonry layout. */
  ratio: number;
}

/**
 * PLACEHOLDER GALLERY — stock photography. Replace with the business's own
 * wedding photography, keeping alt text descriptive for SEO and accessibility.
 */
export const GALLERY: GalleryItem[] = [
  { src: pexels(35457634), alt: 'Groom celebrating on a decorated ghodi under a red chhatri', category: 'Groom Entries', ratio: 1.5, sample: true },
  { src: pexels(10597442), alt: 'White ghodi in a red and gold embroidered cape', category: 'Decorated Ghodi', ratio: 1.5, sample: true },
  { src: pexels(19507613), alt: 'Groom in white sherwani and safa on a ghodi', category: 'Groom Entries', ratio: 0.67, sample: true },
  { src: pexels(36818415), alt: 'Groom covered in a flower sehra on horseback in a baraat', category: 'Baraat', ratio: 1.15, sample: true },
  { src: pexels(33417234), alt: 'Red floral mandap in a Rajasthani palace courtyard', category: 'Wedding Ceremonies', ratio: 1.5, sample: true },
  { src: pexels(35078579), alt: 'White horse portrait with a rope halter', category: 'Horse Portraits', ratio: 0.75, sample: true },
  { src: pexels(33190948), alt: 'Ornate silver and red horse headpiece with tassels', category: 'Decorated Ghodi', ratio: 0.67, sample: true },
  { src: pexels(20058080), alt: 'Groom under a decorated umbrella at a night wedding', category: 'Baraat', ratio: 1.5, sample: true },
  { src: pexels(8286046), alt: 'Groom in a gold sherwani on a decorated ghodi', category: 'Groom Entries', ratio: 0.65, sample: true },
  { src: pexels(8155771), alt: 'Dhol players welcoming a groom under a red umbrella', category: 'Wedding Ceremonies', ratio: 1.5, sample: true },
  { src: pexels(39359881), alt: 'Piebald horse beside a sandstone wall', category: 'Horse Portraits', ratio: 0.75, sample: true },
  { src: pexels(38254685), alt: 'Baraat guests gathered in a sunlit courtyard', category: 'Baraat', ratio: 1.33, sample: true },
  { src: pexels(8296805), alt: 'Couple beside a decorated white horse in the Rajasthan countryside', category: 'Rajasthani Moments', ratio: 1.78, sample: true },
  { src: pexels(32012268), alt: 'Gold embroidered groom’s safa on flowers', category: 'Wedding Ceremonies', ratio: 1.5, sample: true },
  { src: pexels(570031), alt: 'Sandstone palace architecture in Udaipur', category: 'Rajasthani Moments', ratio: 1.5, sample: true },
  { src: pexels(39980496), alt: 'Groom on a white ghodi with sunflower decoration', category: 'Groom Entries', ratio: 1.5, sample: true },
];

/* ── Why choose us ────────────────────────────────────────────────────────── */

export const WHY_CHOOSE_US = [
  {
    title: 'Udaipur-Based Wedding Service',
    description: 'Located in New Bhupalpura, Udaipur — local to the weddings we serve.',
    icon: 'map-pin',
  },
  {
    title: 'Traditional Rajasthani Experience',
    description: 'The ghodi tradition presented the way a Rajasthani wedding deserves.',
    icon: 'crown',
  },
  {
    title: 'Professional Event Service',
    description: 'Listed as a wedding service and event planner, focused on the occasion.',
    icon: 'shield',
  },
  {
    title: 'Beautifully Presented Horses',
    description: 'Each ghodi is dressed and presented for the celebration.',
    icon: 'sparkles',
  },
  {
    title: 'Wedding-Focused Arrangements',
    description: 'Plans built around your wedding date, venue and timing.',
    icon: 'heart',
  },
] as const;

/* ── Reviews ──────────────────────────────────────────────────────────────── */

export interface Review {
  author: string;
  rating: number;
  text: string;
  /** e.g. '2 months ago' or an ISO date as shown on Google */
  date?: string;
}

/**
 * REAL REVIEWS ONLY. Copy reviews verbatim from the Google listing (with the
 * reviewer's name as shown publicly). Never add invented testimonials.
 * While empty, the section shows the Google rating summary and a link.
 */
export const REVIEWS: Review[] = [];

/* ── Enquiry form ─────────────────────────────────────────────────────────── */

export const ENQUIRY_SERVICE_OPTIONS = [
  ...CONFIRMED_SERVICES.map((s) => s.title),
  'Other / Not sure yet',
];

export const GUEST_OPTIONS = ['Under 100', '100 – 250', '250 – 500', '500 – 1000', '1000+'];
