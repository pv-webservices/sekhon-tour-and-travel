export const brand = {
  name: 'Sekhon Tour and Travel',
  origin: (process.env.SITE_URL ?? 'https://sekhon-tour-and-travel.netlify.app').replace(/\/$/, ''),
  phone: '+918054202500',
  phoneDisplay: '+91 80542 02500',
  whatsapp: '918054202500',
  email: 'sukhbirsingh82635@gmail.com',
  address: '2227, Street No. 3, Old Jawahar Nagar, Amritsar, Punjab',
  city: 'Amritsar, Punjab',
  mapQuery: '2227 Street No. 3 Old Jawahar Nagar Amritsar Punjab',
};

/** FormSubmit (formsubmit.co) AJAX endpoint that emails every website enquiry to the business inbox. */
export const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${brand.email}`;

export const telHref = `tel:${brand.phone}`;
export const mailHref = `mailto:${brand.email}`;
export const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.mapQuery)}`;
export const mapEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(brand.mapQuery)}&z=15&output=embed`;
export function whatsappHref(text = 'Hello Sekhon Tour and Travel, I would like to plan a journey.') {
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`;
}

export type Car = {
  slug: string;
  name: string;
  category: 'Sedan' | 'MPV' | 'SUV' | 'Tempo Traveller';
  seats: string;
  fuel: string;
  transmission: string;
  luggage: string;
  image: string;
  gallery: string[];
  tag: string;
  bestFor: string[];
  wedding: boolean;
  description: string;
};

export const cars: Car[] = [
  {
    slug: 'force-urbania',
    name: 'Force Urbania',
    category: 'Tempo Traveller',
    seats: '10 – 17',
    fuel: 'Diesel',
    transmission: 'Manual',
    luggage: 'Rear boot',
    image: 'force-urbania-parked',
    gallery: ['force-urbania-parked', 'force-urbania-front', 'force-urbania-cabin', 'force-urbania-rear'],
    tag: 'Premium Group Van',
    bestFor: ['Premium group tours', 'Wedding guest transfers', 'Corporate & airport groups'],
    wedding: true,
    description: 'A premium, car-like group van with individual reclining seats, large windows and a smooth, quiet ride. Group travel with the comfort of a luxury car.',
  },
  {
    slug: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'MPV',
    seats: '6 + 1',
    fuel: 'Diesel',
    transmission: 'Manual',
    luggage: '4 bags',
    image: 'innova-crysta-side',
    gallery: ['innova-crysta-side', 'innova-crysta-front', 'innova-crysta-rear', 'innova-crysta-cabin'],
    tag: 'Most Popular',
    bestFor: ['Premium family tours', 'Corporate travel', 'Wedding guest transfers'],
    wedding: true,
    description: 'Premium comfort with captain seats, a refined cabin and a smooth ride. The first choice for mountain tours, business guests and wedding families.',
  },
  {
    slug: 'kia-carens',
    name: 'Kia Carens',
    category: 'MPV',
    seats: '6 + 1',
    fuel: 'Diesel',
    transmission: 'Manual',
    luggage: '3 bags + roof carrier',
    image: 'kia-carens-front',
    gallery: ['kia-carens-front', 'kia-carens-rear', 'kia-carens-rear-right'],
    tag: 'Modern MPV',
    bestFor: ['Family trips', 'Airport transfers', 'Punjab & Himachal tours'],
    wedding: false,
    description: 'A modern, feature-rich MPV with three rows, a roof carrier for extra luggage and a quiet, comfortable cabin. Great value for families and small groups.',
  },
  {
    slug: 'tempo-traveller',
    name: 'Tempo Traveller',
    category: 'Tempo Traveller',
    seats: '12 – 17',
    fuel: 'Diesel',
    transmission: 'Manual',
    luggage: 'Roof carrier + boot',
    image: 'tempo-traveller-side',
    gallery: ['tempo-traveller-side', 'tempo-traveller-front', 'tempo-traveller-cabin', 'tempo-traveller-rear'],
    tag: 'Group Travel',
    bestFor: ['Group & family tours', 'Wedding baraat & guests', 'Corporate outings'],
    wedding: true,
    description: 'Push-back seats, generous legroom and space for the whole group. Travel together to Himachal, Kashmir, Vaishno Devi or a wedding across Punjab.',
  },
  {
    slug: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    category: 'SUV',
    seats: '6 + 1',
    fuel: 'Diesel',
    transmission: 'Automatic',
    luggage: '3 bags',
    image: 'hero',
    gallery: ['hero', 'chauffeur', 'wedding'],
    tag: 'Premium SUV',
    bestFor: ['Wedding entries', 'VIP & executive travel', 'Hill-station drives'],
    wedding: true,
    description: 'Commanding road presence and SUV capability. Perfect for grand wedding arrivals, VIP guests and confident drives through the hills.',
  },
  {
    slug: 'toyota-etios',
    name: 'Toyota Etios',
    category: 'Sedan',
    seats: '4 + 1',
    fuel: 'Diesel',
    transmission: 'Manual',
    luggage: '2 large bags',
    image: 'etios',
    gallery: ['etios', 'airport'],
    tag: 'City & Outstation',
    bestFor: ['Airport transfers', 'Amritsar city tours', 'Outstation one-way trips'],
    wedding: false,
    description: 'A comfortable, economical sedan for couples and small families. Ideal for airport runs, Golden Temple visits and quick outstation trips across Punjab.',
  },
  {
    slug: 'toyota-innova',
    name: 'Toyota Innova',
    category: 'MPV',
    seats: '6 + 1',
    fuel: 'Diesel',
    transmission: 'Manual',
    luggage: '3–4 bags',
    image: 'hero-punjab',
    gallery: ['hero-punjab', 'airport'],
    tag: 'Family Favourite',
    bestFor: ['Family trips', 'Himachal & J&K tours', 'Pilgrimage journeys'],
    wedding: false,
    description: 'The trusted family carrier. Spacious seating, strong air-conditioning and plenty of room for luggage on long North India road trips.',
  },
];

export const carCategories = ['All Cars', 'Sedan', 'MPV', 'SUV', 'Tempo Traveller', 'Wedding'] as const;

export const services = [
  { title: 'Car Rental', text: 'Etios to Fortuner — the right car for every plan, with a professional driver.', image: 'etios', href: '/cars', cta: 'Explore Cars' },
  { title: 'Taxi With Driver', text: 'Relax while an experienced local driver handles the road.', image: 'chauffeur', href: '/taxi-with-driver', cta: 'Book a Taxi' },
  { title: 'Luxury Wedding Cars', text: 'Decorated cars and guest transfers for your big day.', image: 'wedding', href: '/wedding-cars', cta: 'View Wedding Cars' },
  { title: 'Tour Packages', text: 'Amritsar, Himachal, Kashmir and Ladakh — planned end to end.', image: 'manali', href: '/tours', cta: 'Explore Tours' },
];

export const destinations = [
  { slug: 'amritsar', name: 'Amritsar', image: 'amritsar', region: 'Punjab', duration: '2N / 3D', desc: 'Golden mornings, heritage lanes, Wagah Border and the flavours of Punjab.', attractions: ['Golden Temple', 'Jallianwala Bagh', 'Wagah Border ceremony'], season: 'October to March offers pleasant weather for sightseeing.' },
  { slug: 'himachal-pradesh', name: 'Himachal Pradesh', image: 'manali', region: 'Himachal Pradesh', duration: '4N / 5D', desc: 'Pine-scented valleys, mountain towns and winding roads.', attractions: ['Shimla', 'Manali', 'Dharamshala & Dalhousie'], season: 'March to June for valley trips; October–November for clear mountain views.' },
  { slug: 'spiti-valley', name: 'Spiti Valley', image: 'spiti', region: 'Himachal Pradesh', duration: '6N / 7D', desc: 'Wide skies, ancient monasteries and a high mountain desert.', attractions: ['Kaza', 'Key Monastery', 'Chandratal Lake'], season: 'June to September, depending on road openings.' },
  { slug: 'kashmir', name: 'Jammu & Kashmir', image: 'kashmir', region: 'Kashmir', duration: '5N / 6D', desc: 'Shikara rides, Mughal gardens and snow-dusted meadows.', attractions: ['Srinagar & Dal Lake', 'Gulmarg', 'Pahalgam'], season: 'April to October for sightseeing; winter trips for snow lovers.' },
  { slug: 'ladakh', name: 'Ladakh', image: 'ladakh', region: 'Ladakh', duration: '6N / 7D', desc: 'Turquoise lakes, prayer flags and the world’s highest roads.', attractions: ['Leh Palace', 'Nubra Valley', 'Pangong Lake'], season: 'May to September, subject to weather and permits.' },
];

export type Destination = (typeof destinations)[number];

const tourMeta = [
  { slug: 'amritsar-heritage', title: 'Amritsar Heritage Escape', days: 3 },
  { slug: 'himachal-tour', title: 'Himachal Mountain Getaway', days: 5 },
  { slug: 'spiti-valley', title: 'The Spiti Valley Journey', days: 7 },
  { slug: 'kashmir-tour', title: 'Kashmir Valley Discovery', days: 6 },
  { slug: 'ladakh-road-trip', title: 'Ladakh: The Open Road', days: 7 },
];

export const tours = destinations.map((d, i) => ({ ...d, ...tourMeta[i], destinationSlug: d.slug }));
export type Tour = (typeof tours)[number];

export const tourRegions = ['All Tours', 'Punjab', 'Himachal Pradesh', 'Kashmir', 'Ladakh'] as const;

export const faqGroups = ['Car Rental', 'Taxi', 'Wedding Cars', 'Tour Packages', 'Airport Transfer', 'Payments'];

export const faqs = [
  { group: 'Car Rental', q: 'How do I book a car?', a: 'Call or WhatsApp us on +91 80542 02500, or send the enquiry form with your dates, pickup point and route. We confirm the vehicle, price and inclusions before you pay anything.' },
  { group: 'Car Rental', q: 'Which vehicles are available?', a: 'Our fleet includes the Force Urbania, Toyota Innova Crysta, Kia Carens, 12–17 seater Tempo Travellers, Toyota Fortuner, Toyota Etios and Toyota Innova. Tell us your group size and we’ll suggest the best fit.' },
  { group: 'Taxi', q: 'Do you offer one-way and outstation taxis?', a: 'Yes. We run local Amritsar trips, one-way drops and round trips across Punjab, Himachal, J&K, Delhi and beyond. Share your pickup and destination for a quote.' },
  { group: 'Wedding Cars', q: 'Can the wedding car be decorated?', a: 'Yes. Share your colours, flower preferences and ceremony timings. We arrange floral decoration, a chauffeur and guest transfers as part of your wedding package.' },
  { group: 'Tour Packages', q: 'Can I customise a tour itinerary?', a: 'Absolutely. Every itinerary on this website is a starting point — tell us your dates, group size and pace, and we’ll tailor the route, vehicle and stops.' },
  { group: 'Airport Transfer', q: 'Do you pick up from Amritsar airport?', a: 'Yes. We provide pickups and drops at Sri Guru Ram Dass Jee International Airport (ATQ), as well as transfers to Chandigarh and Delhi airports. Share your flight details when booking.' },
  { group: 'Payments', q: 'Are there hidden charges?', a: 'No. Your quotation clearly lists the vehicle, distance, driver allowance, tolls, parking and taxes, so you know exactly what is included before confirming.' },
  { group: 'Payments', q: 'What is the cancellation policy?', a: 'Cancellation terms depend on the service and dates. They are shared in writing with your quotation, before you make any payment.' },
];

export const pageTitles: Record<string, string> = {
  cars: 'Find the Perfect Car for Your Journey',
  'wedding-cars': 'Make Your Grand Entrance Unforgettable',
  tours: 'Explore More. Travel Better.',
  destinations: 'A Little Further. A Lot to Discover.',
  'taxi-with-driver': 'Your Journey. Our Driver.',
  'airport-transfer': 'Land. Relax. Leave the Rest to Us.',
  about: 'Journeys Made Simple.',
  contact: 'Let’s Plan Your Journey',
  book: 'Tell Us Where You’re Headed',
  faq: 'A Few Things Before You Go',
  'privacy-policy': 'Privacy Policy',
  terms: 'Terms & Conditions',
};
