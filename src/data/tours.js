export const alpineGtTour = {
  slug: 'alpine-gt-2027',
  path: '/tours/alpine-gt-2027',
  registerPath: '/contact',
  title: 'THE ALPINE GT 2027',
  shortTitle: 'THE ALPINE GT',
  subtitle: 'BLACK FOREST · SWISS ALPS · BURGUNDY',
  eyebrow: '10—14 JUNE 2027 · EUROPE',
  date: '10–14 JUNE 2027',
  duration: '5 DAYS',
  nights: '4 NIGHTS',
  distance: 'APPROX. 1,550 MILES',
  groupSize: 'MAX 15 CARS',
  tagline: 'HIGH-ALTITUDE HAIRPINS & PREMIUM VENUES',
  description:
    "A grand touring journey that begins with the sweep of the Black Forest, climbs into Switzerland's most celebrated mountain passes, and unwinds among the vineyards and old stone of Burgundy.",
  price: {
    totalPence: 259500,
    display: '£2595',
    basis: 'Based on 2 people sharing',
  },
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
        'The journey begins with a composed crossing into France and an easy crew rhythm on the road east. As the autoroute gives way to the High Black Forest, the drive narrows into a proper sense of occasion before the Parkhotel Adler reveal.',
      routeOverview:
        'Calais through eastern France, then off the autoroute for the final approach into the Black Forest and Hinterzarten.',
      highlights: [
        'A settled first-day rhythm across the continent',
        'The final forest approach into Hinterzarten',
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
      name: 'Into the Black Forest',
      theme: 'Forest Roads to Lake Lucerne',
      distance: 'Approx. 220–250 miles',
      drivingStyle: 'Flowing forest roads',
      intro:
        'A full day focused on the strongest roads of the Southern Black Forest before crossing into Switzerland and arriving beside Lake Lucerne.',
      headline: 'Forest rhythm, then a lakeside reset',
      overview:
        'Long, flowing sections draw the best from the Southern Black Forest, with changing elevation and a measured pace throughout. By late afternoon the landscape opens toward Lake Lucerne and a composed arrival at Campus Hotel Hertenstein.',
      routeOverview:
        'The High Black Forest via Titisee, Schluchsee, St. Blasien, and the southern forest roads, then across to Lake Lucerne.',
      highlights: [
        'The strongest Southern Black Forest roads',
        'A gradual change from woodland to Alpine lake',
        'A lakeside evening at Campus Hotel Hertenstein',
      ],
      overnight: 'Campus Hotel Hertenstein',
      hero: false,
      passes: [],
      image: {
        src: new URL('../assets/tour-day-2-country-road.webp', import.meta.url).href,
        alt: 'A white Porsche 911 paused on a quiet country road beneath a wide sky',
        width: 640,
        height: 427,
        layout: 'right',
      },
    },
    {
      number: 3,
      name: 'The Legendary Three Passes',
      theme: "Switzerland's Greatest Driving Roads",
      distance: 'Approx. 220 miles',
      drivingStyle: 'Iconic mountain passes',
      intro:
        'The hero day: an uncompromised loop joining Furka, Grimsel, and Susten—the roads this journey was built around.',
      headline: 'Three high roads, one defining day',
      overview:
        'This is the uncompromised centrepiece: a rare, expertly paced circuit of Switzerland’s great high roads. Glacier scenery, fast-changing light, and the return to the calm of Hertenstein give the day its lasting shape.',
      routeOverview:
        'Lake Lucerne to Andermatt, then Furka, Grimsel, and Susten before returning to Hertenstein.',
      highlights: [
        'A complete Furka, Grimsel, and Susten circuit',
        'High-altitude driving framed by glacier scenery',
        'A restorative return to Hertenstein',
      ],
      overnight: 'Campus Hotel Hertenstein',
      hero: true,
      passes: ['Furka Pass', 'Grimsel Pass', 'Susten Pass'],
      image: {
        src: new URL('../assets/tour-day-3-alpine-pass.webp', import.meta.url).href,
        alt: 'A silver Porsche 911 overlooking a snow-capped Alpine valley',
        width: 640,
        height: 480,
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
        'The route turns west with a generous scenic rhythm, carrying the group from the last great mountain views into vineyard country. There is no city slog—only a relaxed, considered approach to Château de Chailly as the final evening begins.',
      routeOverview:
        'Lake Lucerne via Brünig Pass, Brienz, Spiez, Gstaad, and the Jura foothills to Burgundy.',
      highlights: [
        'The Brünig Pass and the Bernese lakes',
        'A scenic westward run through Gstaad',
        'A château arrival in Burgundy',
      ],
      overnight: 'Château de Chailly',
      hero: false,
      passes: ['Brünig Pass'],
      image: {
        src: new URL('../assets/tour-day-4-lake.webp', import.meta.url).href,
        alt: 'A red Toyota Supra sweeping through open countryside on a previous Drive tour',
        width: 1800,
        height: 1200,
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
        'The return is calm and efficient, with enough space to replay the passes, the hotels, and the company that shaped the week. Burgundy recedes in the mirrors as the group settles into the final continental miles.',
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
        alt: 'A purple Porsche 911 GT3 RS driving home on a wet road beneath dark skies',
        width: 1800,
        height: 1200,
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
    'Parking',
    'Swiss motorway vignettes',
    'The Drive exclusive welcome package',
  ],
  excluded: [
    'Fuel',
    'Lunches',
    'Drinks',
    'Travel insurance',
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
