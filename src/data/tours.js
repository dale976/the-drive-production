export const alpineGtTour = {
  slug: 'alpine-gt-2027',
  path: '/tours/alpine-gt-2027',
  registerPath: '/contact?tour=alpine-gt-2027',
  enquiryLabel: 'RESERVE YOUR PLACE',
  pricing: {
    total: 3295,
    deposit: 500,
    balance: 2795,
    balanceDueDays: 30,
    currency: 'GBP',
  },
  title: 'THE ALPINE GT',
  shortTitle: 'THE ALPINE GT',
  subtitle: 'BLACK FOREST · SWISS ALPS · BURGUNDY',
  eyebrow: '16TH TO 20TH SEPT 2027 · EUROPE',
  date: '16th to 20th September 2027',
  duration: '5 DAYS',
  nights: '4 NIGHTS',
  distance: '1,550 MILES',
  groupSize: '15 CARS',
  tagline: 'HIGH-ALTITUDE HAIRPINS & PREMIUM VENUES',
  description:
    "A grand touring journey that begins with a sweep of the Black Forest followed by a climb into Switzerland's most iconic mountain passes, and unwinds into the vineyards and old stone of Burgundy.",
  images: {
    hero: new URL('../assets/alpine-road-hero.jpg', import.meta.url).href,
    listing: new URL('../assets/fez_alpine.jpg', import.meta.url).href,
  },
  highlights: [
    'Southern Black Forest roads',
    'Furka · Grimsel · Susten',
    'Lake Lucerne',
    'Burgundy château finale',
  ],
  days: [
    {
      number: 1,
      name: 'The Grand Departure',
      theme: 'From the UK to the Black Forest',
      distance: 'Approx. 450 miles',
      drivingStyle: 'Efficient GT touring',
      intro:
        'An efficient continental launch through eastern France, followed by a rewarding final approach into the Black Forest.',
      headline: 'A confident continental opening',
      overview:
        'Settle into the continental drive before the autoroute gives way to forest roads and an evening arrival at Parkhotel Adler.',
      routeOverview:
        'Calais through eastern France, then off the autoroute for the final approach into the Black Forest and Hinterzarten.',
      highlights: [
        'A settled first-day rhythm across the continent',
        'An evening arrival at Parkhotel Adler',
      ],
      overnight: 'Parkhotel Adler',
      hero: false,
      passes: [],
      image: {
        src: new URL('../assets/tour-day-1-departure.webp', import.meta.url).href,
        alt: 'A blue Lotus Exige parked beside the painted grandstand at a historic French circuit',
        width: 1800,
        height: 1012,
        layout: 'left',
      },
    },
    {
      number: 2,
      name: 'The Black Forest',
      theme: 'Forest Roads to Lake Lucerne',
      distance: 'Approx. 220–250 miles',
      drivingStyle: 'Flowing forest roads',
      intro:
        'A full day focused on the strongest roads of the Southern Black Forest before crossing into Switzerland and arriving beside Lake Lucerne.',
      headline: 'Forest rhythm, then a lakeside reset',
      overview:
        'Flowing forest roads and changing elevations give way to the open shores of Lake Lucerne and an evening at Campus Hotel Hertenstein.',
      routeOverview:
        'The High Black Forest via Titisee, Schluchsee, St. Blasien, and the southern forest roads, then across to Lake Lucerne.',
      highlights: [
        'A gradual change from woodland to Alpine lake',
        'A lakeside evening at Campus Hotel Hertenstein',
      ],
      overnight: 'Campus Hotel Hertenstein',
      hero: false,
      passes: [],
      image: {
        src: new URL('../assets/tour-day-2-country-road.webp', import.meta.url).href,
        alt: 'A line of grand touring cars gathered in the rain during a Black Forest drive',
        width: 1800,
        height: 1013,
        layout: 'right',
      },
    },
    {
      number: 3,
      name: 'The Legendary Passes',
      theme: "Switzerland's Greatest Driving Roads",
      distance: 'Approx. 220 miles',
      drivingStyle: 'Iconic mountain passes',
      intro:
        'The hero day: an uncompromised loop joining Furka, Grimsel, and Susten—the roads this journey was built around.',
      headline: 'Three high roads, one defining day',
      overview:
        'Glacier scenery and changing light frame the tour’s defining drive, followed by a second evening at Hertenstein.',
      routeOverview:
        'Lake Lucerne to Andermatt, then Furka, Grimsel, and Susten before returning to Hertenstein.',
      highlights: [
        'High-altitude driving framed by glacier scenery',
        'A restorative return to Hertenstein',
      ],
      overnight: 'Campus Hotel Hertenstein',
      hero: true,
      passes: ['Furka Pass', 'Grimsel Pass', 'Susten Pass'],
      image: {
        src: new URL('../assets/tour-day-3-alpine-pass.webp', import.meta.url).href,
        alt: 'A red Ferrari Spider paused among snow-lined roads on a legendary Alpine pass',
        width: 1800,
        height: 1013,
        layout: 'hero',
      },
    },
    {
      number: 4,
      name: 'From Alps to Vineyards',
      theme: 'Lakes, Vineyards & Château',
      distance: 'Approx. 260–280 miles',
      drivingStyle: 'Scenic touring',
      intro:
        'A deliberately scenic westward journey through lakes and open country, leaving cities behind for a relaxed château arrival around 17:00.',
      headline: 'From Alpine scale to old-stone Burgundy',
      overview:
        'Mountain views give way to vineyards on a relaxed westward drive, ending with the final evening at Château de Chailly.',
      routeOverview:
        'Lake Lucerne via Brünig Pass, Brienz, Spiez, Gstaad, and the Jura foothills to Burgundy.',
      highlights: [
        'The Brünig Pass and the Bernese lakes',
        'A château arrival in Burgundy',
      ],
      overnight: 'Château de Chailly',
      hero: false,
      passes: ['Brünig Pass'],
      image: {
        src: new URL('../assets/tour-day-4-lake.webp', import.meta.url).href,
        alt: 'A white Porsche 911 Turbo crossing open countryside beneath a dramatic sky',
        width: 1620,
        height: 1080,
        layout: 'left',
      },
    },
    {
      number: 5,
      name: 'The Journey Home',
      theme: 'Easy Cruising Home',
      distance: 'Approx. 400 miles',
      drivingStyle: 'Relaxed autoroute',
      intro:
        'A calm, efficient run to Calais that gives the group space to reflect on the week.',
      headline: 'A polished final run home',
      overview:
        'A relaxed autoroute drive leaves time to reflect on the roads, hotels and friendships of the week.',
      routeOverview:
        'Burgundy through Troyes and Reims to Calais and the Eurotunnel.',
      highlights: [
        'An easy final day across northern France',
        'Time to reflect on the roads and the week',
      ],
      overnight: 'Homeward',
      hero: false,
      passes: [],
      image: {
        src: new URL('../assets/tour-day-5-reflection.webp', import.meta.url).href,
        alt: 'A purple Porsche 911 GT3 RS in motion on the homeward drive',
        width: 1800,
        height: 1203,
        layout: 'quiet',
      },
    },
  ],
  hotels: [
    {
      name: 'Parkhotel Adler',
      region: 'Hinterzarten · Black Forest',
      website: 'https://www.parkhoteladler.de/en/',
      image: new URL('../assets/parkhotel-adler-exterior.webp', import.meta.url).href,
      alt: 'Parkhotel Adler historic hotel and grounds in Hinterzarten',
      description:
        'A historic High Black Forest estate combining parkland, regional character, luxury accommodation, dining, and wellness.',
      nights: 'Night 1',
    },
    {
      name: 'Campus Hotel Hertenstein',
      region: 'Hertenstein · Lake Lucerne',
      website: 'https://www.campus-hotel-hertenstein.ch/en/',
      image: new URL('../assets/campus-hotel-hertenstein.webp', import.meta.url).href,
      alt: 'Campus Hotel Hertenstein on the shore of Lake Lucerne',
      description:
        'A contemporary lakeside retreat on the Hertenstein peninsula, combining direct lake access, modern rooms, dining, and restorative wellness for our two-night Swiss stay.',
      nights: 'Nights 2–3',
    },
    {
      name: 'Château de Chailly',
      region: 'Burgundy · France',
      website: 'https://www.chailly.com/',
      image: new URL('../assets/chateau-de-chailly-courtyard.webp', import.meta.url).href,
      alt: 'A purple Porsche 911 GT3 RS parked outside Château de Chailly in Burgundy',
      description:
        'A historic château finale shaped around Burgundy hospitality, gastronomy, wellness, and a car-rally-friendly courtyard.',
      nights: 'Night 4',
    },
  ],
  included: [
    "Four nights' luxury accommodation",
    'Breakfast each morning',
    'Evening meals',
    'Hotel wellness facilities',
    'Secure Parking',
    'Swiss motorway vignettes',
    'The Drive exclusive welcome package',
    'The Drive media package of your adventure',
  ],
  excluded: [
    'Fuel',
    'Lunches',
    'Drinks',
    'Travel insurance',
    'Breakdown cover',
    'French tolls',
    'Personal expenses',
  ],
  caveat:
    'Routes and mileages are approximate and may change because of weather, seasonal pass openings, road conditions, timing, safety, or organiser requirements.',
};

const tours = [alpineGtTour];

export function getTourBySlug(slug) {
  return tours.find((tour) => tour.slug === slug) ?? null;
}
