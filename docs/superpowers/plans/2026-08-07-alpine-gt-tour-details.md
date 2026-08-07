# Alpine GT 2027 Tour Detail Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a content-rich Alpine GT 2027 detail page, connect it to the existing tour listing, and add a branded contact placeholder for registration interest.

**Architecture:** Store the Alpine GT content in one framework-agnostic data module shared by the listing and detail pages. Compose the detail route from focused React components, keep all styling in Tailwind utilities, and lazy-load both new route pages through the existing React Router setup. Use local, optimised imagery sourced from the three official hotel websites and existing project photography.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4, React Router v7, Lucide React, Node's built-in test runner

## Global Constraints

- Work only on `codex/alpine-tour-details`.
- Do not add a runtime dependency or a second component library.
- Do not add custom CSS; `src/index.css` remains limited to Tailwind import, theme tokens, font loading, and global reset.
- Use Base UI primitives if a dialog, disclosure, dropdown, or other headless interactive primitive becomes necessary.
- Do not implement Supabase, authentication, bookings, payments, or a working contact form.
- Price wording is always `£2,495 total for two guests sharing one room`.
- Day 4 uses the Brünig/Gstaad/Burgundy route; Klausen Pass is not part of the primary itinerary.
- Hotel images come from the official hotel sites, are saved locally, and are never hotlinked at runtime.
- All mileage values are approximate and the route is subject to weather, road conditions, timing, and organiser adjustment.
- Every task finishes with its own verification and commit.

---

## File Map

### Create

- `src/data/tours.js` — canonical Alpine GT content used by listing and detail pages.
- `tests/tours.test.js` — Node tests for content integrity, pricing, route decisions, and public paths.
- `src/components/tours/TourHero.jsx` — hero, metrics, and first registration CTA.
- `src/components/tours/TourSectionNav.jsx` — sticky in-page links to journey, stays, and package details.
- `src/components/tours/JourneyOverview.jsx` — compact five-day summary.
- `src/components/tours/ItineraryDay.jsx` — reusable editorial day chapter.
- `src/components/tours/HotelFeature.jsx` — accommodation image, description, and official external link.
- `src/components/tours/PackageDetails.jsx` — pricing, inclusions, exclusions, and caveat.
- `src/components/tours/RegisterInterestPanel.jsx` — closing conversion panel and mobile CTA.
- `src/pages/TourDetailPage.jsx` — route-level composition for the Alpine GT.
- `src/pages/ContactPlaceholderPage.jsx` — temporary registration destination.
- `src/assets/parkhotel-adler-exterior.webp` — approved official Parkhotel Adler image.
- `src/assets/hermitage-lake-lucerne.webp` — approved official HERMITAGE image.
- `src/assets/chateau-de-chailly-courtyard.webp` — approved official Château de Chailly image.
- `src/assets/alpine-pass-hero.webp` — relevant hero/pass image, sourced from existing owned media where possible.

### Modify

- `package.json` — add `test` script using Node's built-in runner.
- `src/App.jsx` — lazy-load and register the detail and contact routes.
- `src/pages/ToursPage.jsx` — consume shared tour data and link the Alpine card.
- `public/sitemap.xml` — list both new public routes.
- `AGENTS.md` — update the current-phase table and repository layout after implementation.

---

### Task 1: Canonical Tour Data and Integrity Tests

**Files:**
- Create: `src/data/tours.js`
- Create: `tests/tours.test.js`
- Modify: `package.json`

**Interfaces:**
- Produces: `alpineGtTour` object and `getTourBySlug(slug)` function.
- `alpineGtTour.slug` is `alpine-gt-2027`.
- `getTourBySlug(slug)` returns the matching tour object or `null`.
- Later components consume the exact fields defined in this task.

- [ ] **Step 1: Add the test command**

Add this script to `package.json`:

```json
"test": "node --test"
```

- [ ] **Step 2: Write the failing content-integrity tests**

Create `tests/tours.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { alpineGtTour, getTourBySlug } from '../src/data/tours.js';

test('Alpine GT exposes the public paths and exact pricing basis', () => {
  assert.equal(alpineGtTour.slug, 'alpine-gt-2027');
  assert.equal(alpineGtTour.path, '/tours/alpine-gt-2027');
  assert.equal(alpineGtTour.registerPath, '/contact');
  assert.equal(alpineGtTour.price.totalPence, 249500);
  assert.equal(alpineGtTour.price.display, '£2,495');
  assert.equal(
    alpineGtTour.price.basis,
    'Total for two guests sharing one room',
  );
});

test('Alpine GT contains the approved five-day journey', () => {
  assert.deepEqual(
    alpineGtTour.days.map(({ name }) => name),
    [
      'The Grand Departure',
      'Into the Black Forest',
      'The Legendary Three Passes',
      'From Alps to Vineyards',
      'The Journey Home',
    ],
  );
  assert.equal(alpineGtTour.days[2].hero, true);
  assert.deepEqual(alpineGtTour.days[2].passes, [
    'Furka Pass',
    'Grimsel Pass',
    'Susten Pass',
  ]);
  assert.equal(
    alpineGtTour.days[3].route.includes('Klausen Pass'),
    false,
  );
  assert.equal(alpineGtTour.days[3].route.includes('Gstaad'), true);
});

test('Alpine GT package details are complete', () => {
  assert.deepEqual(alpineGtTour.included, [
    "Four nights' luxury accommodation",
    'Breakfast each morning',
    'Evening meals',
    'Hotel wellness facilities',
    'Parking',
    'Swiss motorway vignettes',
    'The Drive exclusive welcome package',
  ]);
  assert.deepEqual(alpineGtTour.excluded, [
    'Fuel',
    'Lunches',
    'Drinks',
    'Travel insurance',
    'French tolls',
    'Personal expenses',
  ]);
});

test('Alpine GT uses all three official hotels', () => {
  assert.deepEqual(
    alpineGtTour.hotels.map(({ name }) => name),
    ['Parkhotel Adler', 'HERMITAGE Lake Lucerne', 'Château de Chailly'],
  );
  assert.ok(alpineGtTour.hotels.every(({ website }) => website.startsWith('https://')));
});

test('getTourBySlug returns known tours and rejects unknown slugs', () => {
  assert.equal(getTourBySlug('alpine-gt-2027'), alpineGtTour);
  assert.equal(getTourBySlug('unknown-tour'), null);
});
```

- [ ] **Step 3: Run the tests and verify the expected failure**

Run:

```bash
npm test
```

Expected: FAIL because `src/data/tours.js` does not exist.

- [ ] **Step 4: Create the canonical data module**

Create `src/data/tours.js`. Use `new URL(relativePath, import.meta.url).href` so Node tests and Vite can both resolve image references.

```js
const imageUrl = (relativePath) => new URL(relativePath, import.meta.url).href;

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
    totalPence: 249500,
    display: '£2,495',
    basis: 'Total for two guests sharing one room',
  },
  images: {
    hero: imageUrl('../assets/alpine-pass-hero.webp'),
    listing: imageUrl('../assets/fez_alpine.jpg'),
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
      route: [
        'Eurotunnel LeShuttle Terminal, Calais',
        'Saint-Omer',
        'Reims',
        'Metz',
        'Strasbourg bypass',
        'Offenburg',
        'Triberg',
        'Hinterzarten',
        'Parkhotel Adler',
      ],
      stops: [
        { place: 'Saint-Omer', note: 'Comfort stop' },
        { place: 'Reims', note: 'Lunch' },
        { place: 'Metz', note: 'Coffee and fuel' },
        { place: 'Triberg', note: 'Optional if timing permits' },
      ],
      overnight: 'Parkhotel Adler',
      hero: false,
      passes: [],
    },
    {
      number: 2,
      name: 'Into the Black Forest',
      theme: 'Forest Roads to Lake Lucerne',
      distance: 'Approx. 220–250 miles',
      drivingStyle: 'Flowing forest roads',
      intro:
        'A full day focused on the strongest roads of the Southern Black Forest before crossing into Switzerland and arriving beside Lake Lucerne.',
      route: [
        'Parkhotel Adler',
        'Titisee',
        'Schluchsee',
        'St. Blasien',
        'Todtnau',
        'Münstertal',
        'Badenweiler',
        'Todtmoos',
        'Herrischried',
        'Rickenbach',
        'Waldshut-Tiengen',
        'Zug',
        'Küssnacht',
        'HERMITAGE Lake Lucerne',
      ],
      stops: [
        { place: 'Badenweiler', note: 'Midday transition' },
        { place: 'Lake Lucerne', note: 'Lakeside arrival' },
      ],
      overnight: 'HERMITAGE Lake Lucerne',
      hero: false,
      passes: [],
    },
    {
      number: 3,
      name: 'The Legendary Three Passes',
      theme: "Switzerland's Greatest Driving Roads",
      distance: 'Approx. 220 miles',
      drivingStyle: 'Iconic mountain passes',
      intro:
        'The hero day: an uncompromised loop joining Furka, Grimsel, and Susten—the roads this journey was built around.',
      route: [
        'HERMITAGE Lake Lucerne',
        'Brunnen',
        'Altdorf',
        'Wassen',
        'Andermatt',
        'Furka Pass',
        'Belvedere Hotel',
        'Gletsch',
        'Grimsel Pass',
        'Innertkirchen',
        'Meiringen',
        'Susten Pass',
        'Wassen',
        'Altdorf',
        'Brunnen',
        'Weggis',
        'HERMITAGE Lake Lucerne',
      ],
      stops: [
        { place: 'Andermatt', note: 'Coffee' },
        { place: 'Belvedere Hotel', note: 'Historic photo stop' },
        { place: 'Meiringen', note: 'Lunch' },
      ],
      overnight: 'HERMITAGE Lake Lucerne',
      hero: true,
      passes: ['Furka Pass', 'Grimsel Pass', 'Susten Pass'],
    },
    {
      number: 4,
      name: 'From Alps to Vineyards',
      theme: 'Lakes, Vineyards & Château',
      distance: 'Approx. 260–280 miles',
      drivingStyle: 'Scenic touring',
      intro:
        'A deliberately scenic westward journey through lakes and open country, leaving cities behind for a relaxed château arrival around 17:00.',
      route: [
        'HERMITAGE Lake Lucerne',
        'Küssnacht',
        'Zug',
        'Lucerne outskirts',
        'Sarnen',
        'Brünig Pass',
        'Brienz',
        'Spiez',
        'Gstaad',
        "Château-d'Oex",
        'Bulle',
        'Vallorbe',
        'Champagnole',
        'Poligny',
        'Beaune',
        'Château de Chailly',
      ],
      stops: [
        { place: 'Gstaad', note: 'Lunch' },
        { place: 'Château de Chailly', note: 'Arrival around 17:00' },
      ],
      overnight: 'Château de Chailly',
      hero: false,
      passes: ['Brünig Pass'],
    },
    {
      number: 5,
      name: 'The Journey Home',
      theme: 'Easy Cruising Home',
      distance: 'Approx. 400 miles',
      drivingStyle: 'Relaxed autoroute',
      intro:
        'A calm, efficient run to Calais that gives the group space to reflect on the week.',
      route: [
        'Château de Chailly',
        'Beaune',
        'Troyes',
        'Reims',
        'Calais',
        'Eurotunnel',
      ],
      stops: [
        { place: 'Troyes', note: 'Coffee' },
        { place: 'Reims', note: 'Lunch if required' },
      ],
      overnight: 'Homeward',
      hero: false,
      passes: [],
    },
  ],
  hotels: [
    {
      name: 'Parkhotel Adler',
      region: 'Hinterzarten · Black Forest',
      website: 'https://www.parkhoteladler.de/en/',
      image: imageUrl('../assets/parkhotel-adler-exterior.webp'),
      alt: 'Parkhotel Adler historic hotel and grounds in Hinterzarten',
      description:
        'A historic High Black Forest estate combining parkland, regional character, luxury accommodation, dining, and wellness.',
      nights: 'Night 1',
    },
    {
      name: 'HERMITAGE Lake Lucerne',
      region: 'Weggis · Switzerland',
      website: 'https://www.hermitage.ch/en',
      image: imageUrl('../assets/hermitage-lake-lucerne.webp'),
      alt: 'HERMITAGE hotel beside Lake Lucerne with Alpine views',
      description:
        "A calm lakeside base for two nights and the perfect counterpoint to Switzerland's greatest driving roads.",
      nights: 'Nights 2–3',
    },
    {
      name: 'Château de Chailly',
      region: 'Burgundy · France',
      website: 'https://www.chailly.com/',
      image: imageUrl('../assets/chateau-de-chailly-courtyard.webp'),
      alt: 'Historic Château de Chailly and its inner courtyard in Burgundy',
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
```

- [ ] **Step 5: Run the data tests**

Run:

```bash
npm test
```

Expected: 5 tests pass, 0 fail.

- [ ] **Step 6: Run lint**

Run:

```bash
npm run lint
```

Expected: exit 0 with no ESLint errors.

- [ ] **Step 7: Commit the data foundation**

```bash
git add package.json src/data/tours.js tests/tours.test.js
git commit -m "Add canonical Alpine GT tour data"
```

---

### Task 2: Source and Optimise Destination Imagery

**Files:**
- Create: `src/assets/parkhotel-adler-exterior.webp`
- Create: `src/assets/hermitage-lake-lucerne.webp`
- Create: `src/assets/chateau-de-chailly-courtyard.webp`
- Create: `src/assets/alpine-pass-hero.webp`

**Interfaces:**
- Consumes: exact asset paths referenced by `src/data/tours.js`.
- Produces: four optimised WebP images with stable local paths.

- [ ] **Step 1: Select images from authorised sources**

Use the official sites and choose:

- Parkhotel Adler: an exterior or estate image clearly identifiable as the Hinterzarten hotel.
- HERMITAGE: an exterior image that visibly establishes Lake Lucerne and the Alpine setting.
- Château de Chailly: a château exterior or inner-courtyard image that communicates the car-rally arrival.
- Alpine hero: an owned or approved image showing an Alpine driving road; prefer existing project photography if it meets the requirement.

Record the exact source page and original image URL in the commit body. Do not use screenshots containing website UI, text, cookies, or navigation.

- [ ] **Step 2: Download originals into a temporary directory**

Use a temporary directory outside the repository:

```bash
asset_tmp=$(mktemp -d)
```

Download each original with `curl --fail --location` to that directory. Do not write unoptimised originals into `src/assets`.

- [ ] **Step 3: Convert and size assets**

Use an available image conversion tool such as `magick` or `cwebp`:

```bash
magick "$asset_tmp/parkhotel-original" -auto-orient -resize '1800x1200>' -quality 82 src/assets/parkhotel-adler-exterior.webp
magick "$asset_tmp/hermitage-original" -auto-orient -resize '1800x1200>' -quality 82 src/assets/hermitage-lake-lucerne.webp
magick "$asset_tmp/chailly-original" -auto-orient -resize '1800x1200>' -quality 82 src/assets/chateau-de-chailly-courtyard.webp
magick "$asset_tmp/alpine-original" -auto-orient -resize '2200x1400>' -quality 84 src/assets/alpine-pass-hero.webp
```

If ImageMagick is unavailable, use the workspace image tooling to produce the same filenames, maximum dimensions, and WebP quality range.

- [ ] **Step 4: Verify each image**

Run:

```bash
file src/assets/parkhotel-adler-exterior.webp src/assets/hermitage-lake-lucerne.webp src/assets/chateau-de-chailly-courtyard.webp src/assets/alpine-pass-hero.webp
du -h src/assets/parkhotel-adler-exterior.webp src/assets/hermitage-lake-lucerne.webp src/assets/chateau-de-chailly-courtyard.webp src/assets/alpine-pass-hero.webp
```

Expected:

- All four files report WebP image data.
- No hotel image exceeds 500 KB.
- The hero image does not exceed 700 KB.
- Visual inspection confirms every hotel image matches its named property.

- [ ] **Step 5: Run data tests and production build**

```bash
npm test
npm run build
```

Expected: tests and build pass; Vite resolves every new image reference.

- [ ] **Step 6: Commit the image assets**

```bash
git add src/assets/parkhotel-adler-exterior.webp src/assets/hermitage-lake-lucerne.webp src/assets/chateau-de-chailly-courtyard.webp src/assets/alpine-pass-hero.webp
git commit -m "Add Alpine GT destination imagery"
```

Include the official image source URLs in the commit body.

---

### Task 3: Build the Editorial Tour Components

**Files:**
- Create: `src/components/tours/TourHero.jsx`
- Create: `src/components/tours/TourSectionNav.jsx`
- Create: `src/components/tours/JourneyOverview.jsx`
- Create: `src/components/tours/ItineraryDay.jsx`
- Create: `src/components/tours/HotelFeature.jsx`
- Create: `src/components/tours/PackageDetails.jsx`
- Create: `src/components/tours/RegisterInterestPanel.jsx`

**Interfaces:**
- Consumes: the `alpineGtTour` field structure from Task 1.
- Produces:
  - `TourHero({ tour })`
  - `TourSectionNav()`
  - `JourneyOverview({ days })`
  - `ItineraryDay({ day, align = 'left' })`
  - `HotelFeature({ hotel, reverse = false })`
  - `PackageDetails({ price, included, excluded, caveat })`
  - `RegisterInterestPanel({ tour, mobile = false })`

- [ ] **Step 1: Create `TourHero`**

Implement a semantic `header` with:

- Full-bleed `tour.images.hero` background.
- A `data-tour-hero` attribute used only to control the mobile CTA visibility.
- Dark radial and bottom gradients.
- `tour.eyebrow`, `tour.shortTitle`, and `tour.subtitle`.
- A React Router `Link` to `tour.registerPath` labelled `Register Interest`.
- A five-cell metric strip for duration, nights, distance, group size, and price.
- Hero image preloading is not added here; Vite handles the local asset and the background must remain readable if it fails.

Use `min-h-[calc(100svh-6rem)]`, `bg-cover`, `bg-center`, `text-5xl md:text-8xl`, and the existing teal glow vocabulary. Give the CTA visible `focus-visible` outline utilities and a minimum 44px height.

- [ ] **Step 2: Create `TourSectionNav`**

Render a desktop-only sticky navigation landmark:

```jsx
const sections = [
  { href: '#journey', label: 'Journey' },
  { href: '#stays', label: 'Stays' },
  { href: '#included', label: 'Included' },
];
```

Use ordinary anchor links, `aria-label="Tour sections"`, `top-24`, and `scroll-mt-40` on destinations. Do not introduce scroll-state JavaScript.

- [ ] **Step 3: Create `JourneyOverview`**

Render an ordered list of five day summaries. Each row shows the zero-padded number, name, and driving style. Day 3 uses teal border and text treatment when `day.hero` is true. Keep all content visible without interaction.

- [ ] **Step 4: Create `ItineraryDay`**

Render each day as an `article` with:

- Day number, name, theme, distance, and driving style.
- Introductory paragraph.
- Ordered route sequence with arrow separators that wrap safely on mobile.
- Stop notes rendered as compact labelled items.
- Overnight destination.
- For the hero day, render the three `day.passes` as oversized typographic blocks and use a deeper teal background.

Use `align` only to alternate desktop grid placement. DOM reading order must remain number → title → summary → route → stops → overnight for every day.

- [ ] **Step 5: Create `HotelFeature`**

Render a two-column `article` with image and copy. Use a real `<img>` with:

```jsx
<img
  src={hotel.image}
  alt={hotel.alt}
  width="1800"
  height="1200"
  loading="lazy"
  className="h-full min-h-80 w-full object-cover"
/>
```

The official-site link uses `target="_blank"`, `rel="noopener noreferrer"`, and accessible text `Visit the official {hotel.name} website`.

- [ ] **Step 6: Create `PackageDetails`**

Render the exact price display and basis above two semantic lists. Included items use teal check icons; excluded items use muted minus icons. Render the route caveat in a bordered note below the lists.

- [ ] **Step 7: Create `RegisterInterestPanel`**

For `mobile={false}`, render the full closing panel with date, title, price, basis, and a `/contact` link.

For `mobile={true}`, render a fixed `md:hidden` bottom bar with price and CTA after the hero leaves the viewport. Implement this without a dependency:

```jsx
const [showMobileBar, setShowMobileBar] = useState(false);

useEffect(() => {
  if (!mobile) return undefined;

  const hero = document.querySelector('[data-tour-hero]');
  if (!hero) {
    setShowMobileBar(true);
    return undefined;
  }

  const observer = new IntersectionObserver(
    ([entry]) => setShowMobileBar(!entry.isIntersecting),
    { threshold: 0.05 },
  );
  observer.observe(hero);
  return () => observer.disconnect();
}, [mobile]);
```

Keep hooks unconditional at the top of the component. When `mobile && !showMobileBar`, return `null`. The visible bar must:

- Use `z-40` so the primary navigation remains above it.
- Leave safe-area padding with Tailwind arbitrary value `pb-[max(0.75rem,env(safe-area-inset-bottom))]`.
- Keep the CTA label visible at 320px width.
- Not render on the contact placeholder page.

- [ ] **Step 8: Run lint and build**

```bash
npm run lint
npm run build
```

Expected: both commands exit 0 and all component modules compile.

- [ ] **Step 9: Commit the component system**

```bash
git add src/components/tours
git commit -m "Build Alpine GT editorial components"
```

---

### Task 4: Compose and Register the Tour Detail Route

**Files:**
- Create: `src/pages/TourDetailPage.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `alpineGtTour` and all components from Task 3.
- Produces: lazy public route `/tours/alpine-gt-2027`.

- [ ] **Step 1: Capture the failing route behaviour**

Run the development server:

```bash
npm run dev
```

Open `http://localhost:5173/tours/alpine-gt-2027`.

Expected before implementation: the existing `This road ends here` 404 page.

- [ ] **Step 2: Compose `TourDetailPage`**

Create `src/pages/TourDetailPage.jsx` with this section order:

```jsx
<PageMeta
  title="The Alpine GT 2027"
  description="Five days through the Black Forest, Switzerland's legendary Alpine passes and Burgundy, with four nights of luxury accommodation."
  path={tour.path}
/>
<Nav activePage="tours" />
<main id="main-content">
  <TourHero tour={tour} />
  <TourSectionNav />
  <section aria-labelledby="experience-heading">
    <h2 id="experience-heading">
      Five days. Three countries. One great drive.
    </h2>
    <p>{tour.description}</p>
  </section>
  <JourneyOverview days={tour.days} />
  <section id="journey" aria-label="Five-day itinerary">
    {tour.days.map((day, index) => (
      <ItineraryDay
        key={day.number}
        day={day}
        align={index % 2 === 0 ? 'left' : 'right'}
      />
    ))}
  </section>
  <section id="stays" aria-labelledby="stays-heading">
    <h2 id="stays-heading">Three remarkable stays</h2>
    {tour.hotels.map((hotel, index) => (
      <HotelFeature
        key={hotel.name}
        hotel={hotel}
        reverse={index === 1}
      />
    ))}
  </section>
  <PackageDetails
    price={tour.price}
    included={tour.included}
    excluded={tour.excluded}
    caveat={tour.caveat}
  />
  <RegisterInterestPanel tour={tour} />
</main>
<RegisterInterestPanel tour={tour} mobile />
<Footer />
```

Implementation requirements:

- Add a visually hidden-until-focus skip link before `Nav` targeting `#main-content` using Tailwind utilities.
- The experience section uses the heading `Five days. Three countries. One great drive.` and `tour.description`.
- Render all five days in order.
- Insert hotel features in a separate `#stays` section after the complete journey so users can scan either storyline cleanly.
- Alternate `HotelFeature.reverse` for the centre hotel only.
- Add `scroll-mt-40` to `#journey`, `#stays`, and `#included`.
- Add bottom padding on mobile so the fixed CTA never covers the footer or closing content.

- [ ] **Step 3: Register the lazy route**

Add to `src/App.jsx`:

```jsx
const TourDetailPage = lazy(() => import('./pages/TourDetailPage.jsx'));
```

Add before the wildcard route:

```jsx
<Route path="/tours/alpine-gt-2027" element={<TourDetailPage />} />
```

- [ ] **Step 4: Verify the route now passes**

Open `http://localhost:5173/tours/alpine-gt-2027` directly and verify:

- H1 is `THE ALPINE GT`.
- Page title is `The Alpine GT 2027 | The Drive Touring Company`.
- All five named days render.
- Day 3 renders Furka, Grimsel, and Susten prominently.
- Price reads `£2,495` and `Total for two guests sharing one room`.
- Browser console contains no errors.

- [ ] **Step 5: Run automated checks**

```bash
npm test
npm run lint
npm run build
```

Expected: all tests pass and both quality commands exit 0.

- [ ] **Step 6: Commit the detail route**

```bash
git add src/pages/TourDetailPage.jsx src/App.jsx
git commit -m "Add Alpine GT tour detail route"
```

---

### Task 5: Connect the Listing and Add the Contact Placeholder

**Files:**
- Modify: `src/pages/ToursPage.jsx`
- Create: `src/pages/ContactPlaceholderPage.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `alpineGtTour.path`, `alpineGtTour.registerPath`, and listing fields.
- Produces: clickable Alpine listing card and lazy `/contact` placeholder route.

- [ ] **Step 1: Capture the failing registration destination**

With the dev server running, click `Register Interest` on the detail page.

Expected before implementation: `/contact` renders the existing 404 page.

- [ ] **Step 2: Create `ContactPlaceholderPage`**

Follow the existing `NotFoundPage` shell pattern:

- `PageMeta` title: `Register Interest`.
- Description: `Register your interest in The Drive Touring Company's curated supercar tours.`
- Canonical path: `/contact`.
- `Nav activePage="tours"` and shared `Footer`.
- Eyebrow: `REGISTER INTEREST`.
- H1: `THE NEXT STAGE IS COMING.`
- Body: `Our customer enquiry form is being prepared. In the meantime, explore the full Alpine GT journey or contact us by email.`
- Primary React Router link back to `/tours/alpine-gt-2027`: `Return to The Alpine GT`.
- Secondary `mailto:info@thedrivetouringcompany.com?subject=Alpine GT 2027 Interest` link: `Email The Drive`.
- No form fields, fake submission, or disabled controls.

- [ ] **Step 3: Register the lazy contact route**

Add to `src/App.jsx`:

```jsx
const ContactPlaceholderPage = lazy(() => import('./pages/ContactPlaceholderPage.jsx'));
```

Add before the wildcard route:

```jsx
<Route path="/contact" element={<ContactPlaceholderPage />} />
```

- [ ] **Step 4: Refactor the listing to shared data**

In `src/pages/ToursPage.jsx`:

- Import `Link` from `react-router-dom`.
- Import `alpineGtTour` from `../data/tours.js`.
- Remove the local `tour` object and use `const tour = alpineGtTour`.
- Update listing image access from `tour.image` to `tour.images.listing` and retain `tour.highlights`.
- Replace the current brochure mail link with a React Router detail link:

```jsx
<Link
  to={tour.path}
  aria-label={`Explore ${tour.title}`}
  className="inline-flex min-h-11 items-center border-2 border-brandTeal px-6 py-3 text-[10px] font-black tracking-[0.2em] text-brandTeal transition-colors hover:bg-brandTeal hover:text-brandDark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
>
  EXPLORE THE TOUR
</Link>
```

- Make the tour image/title region a second accessible link to `tour.path` without nesting interactive elements.
- Update the visible price from `TBC` to `tour.price.display` and add a small `FOR TWO SHARING` label.
- Keep the existing `REGISTER INTEREST` link in the lower page section unchanged unless it specifically references the Alpine GT; Alpine-specific CTAs use `/contact`.

- [ ] **Step 5: Verify navigation**

In the browser:

1. Open `/tours`.
2. Confirm the price is `£2,495` with the sharing basis.
3. Click `Explore the Tour`; confirm the URL becomes `/tours/alpine-gt-2027` without a full document reload.
4. Click both detail-page registration CTAs; confirm each reaches `/contact`.
5. Click `Return to The Alpine GT`; confirm the detail page returns.
6. Use browser back and forward; confirm all route transitions work.

- [ ] **Step 6: Run quality checks**

```bash
npm test
npm run lint
npm run build
```

Expected: all commands pass.

- [ ] **Step 7: Commit listing and placeholder changes**

```bash
git add src/pages/ToursPage.jsx src/pages/ContactPlaceholderPage.jsx src/App.jsx
git commit -m "Connect Alpine tour registration journey"
```

---

### Task 6: SEO, Documentation, and Full Responsive QA

**Files:**
- Modify: `public/sitemap.xml`
- Modify: `AGENTS.md`
- Modify files identified by QA only when necessary to satisfy this task's acceptance checks.

**Interfaces:**
- Consumes: completed routes and components from Tasks 1–5.
- Produces: documented, discoverable, verified feature ready for review.

- [ ] **Step 1: Update the sitemap**

Add these URLs after `/tours`:

```xml
<url>
  <loc>https://thedrivetouringcompany.com/tours/alpine-gt-2027</loc>
</url>
<url>
  <loc>https://thedrivetouringcompany.com/contact</loc>
</url>
```

- [ ] **Step 2: Update `AGENTS.md`**

Update the repository layout to include:

- `src/data/tours.js`
- `src/components/tours/`
- `src/pages/TourDetailPage.jsx`
- `src/pages/ContactPlaceholderPage.jsx`

Update the current-phase table with:

- `Done | Alpine GT static tour detail page`
- `Done | Register-interest contact placeholder`
- Keep the actual customer contact form pending.
- Do not mark Supabase, login, dashboard, bookings, or payments complete.

- [ ] **Step 3: Run the complete automated verification**

```bash
npm test
npm run lint
npm run build
git diff --check
```

Expected:

- All Node tests pass.
- ESLint exits 0.
- Vite production build exits 0.
- `git diff --check` reports no whitespace errors.

- [ ] **Step 4: Verify desktop layout at 1440×1000**

Use the browser at `/tours/alpine-gt-2027` and confirm:

- Hero content remains readable over the image.
- Metric strip remains one row.
- Sticky Journey/Stays/Included navigation stays below the 96px primary nav.
- Day chapters alternate cleanly and Day 3 is visually dominant.
- Hotel images match the correct properties.
- Package columns align and the closing CTA is visible.
- No horizontal overflow exists.

- [ ] **Step 5: Verify tablet layout at 768×1024**

Confirm:

- Day and hotel grids collapse without awkward empty columns.
- Technical labels remain readable.
- Sticky section navigation does not obscure headings.
- Every interactive target has visible focus treatment.

- [ ] **Step 6: Verify mobile layout at 390×844 and 320×568**

Confirm:

- Hero uses `svh` safely and the title does not clip.
- Metrics wrap into a readable grid.
- Route sequences wrap without horizontal overflow.
- The fixed registration bar remains readable at 320px.
- The bar does not cover focused content or the footer.
- Mobile primary navigation opens, closes, and responds to Escape.
- All hotel links and CTAs have at least 44px practical tap height.

- [ ] **Step 7: Verify reduced motion and keyboard flow**

Enable reduced motion in the browser and confirm meaningful content never depends on animation. Keyboard through the page from the skip link to the footer and verify logical order, visible focus, and no focus obstruction from sticky elements.

- [ ] **Step 8: Verify metadata, routes, and errors**

Confirm in the browser:

- `/tours/alpine-gt-2027` title and canonical URL are unique.
- `/contact` title and canonical URL are unique.
- Direct reload of both routes succeeds through Cloudflare's SPA fallback.
- `/tours/not-a-tour` renders the existing 404.
- Browser console has zero errors on `/tours`, the detail page, and `/contact`.

- [ ] **Step 9: Review final Git scope**

Run:

```bash
git status --short
git diff --stat HEAD
```

Expected: only Alpine GT implementation, authorised imagery, sitemap, tests, and documentation changes are present. `.superpowers/` remains ignored.

- [ ] **Step 10: Commit final SEO and documentation**

```bash
git add public/sitemap.xml AGENTS.md
git commit -m "Document and index Alpine GT detail page"
```

---

## Final Review Checklist

- [ ] Re-read `docs/superpowers/specs/2026-08-07-alpine-gt-tour-details-design.md` and confirm every acceptance criterion is implemented.
- [ ] Confirm exact price wording wherever the price appears.
- [ ] Confirm Day 4 contains Gstaad and does not contain Klausen Pass.
- [ ] Confirm all three official hotel links and correct local images.
- [ ] Confirm both registration CTAs lead to the placeholder `/contact` route.
- [ ] Confirm no working form, backend, booking, or payment code was introduced.
- [ ] Run `npm test`, `npm run lint`, and `npm run build` once more before requesting code review.
