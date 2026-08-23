# Editorial Tour Imagery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add authentic previous-tour photography to the homepage and Alpine GT itinerary while removing the visible hotel website links.

**Architecture:** Optimised WebP files live in `src/assets/`, with Alpine chapter image metadata held beside each day in `src/data/tours.js`. A focused homepage component owns the asymmetric three-image editorial composition, while the existing itinerary component renders each day's data-driven image with layout variation based on the day number and hero flag.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 4, Node test runner, Sharp or macOS image tooling for WebP conversion.

**Spec:** `docs/superpowers/specs/2026-08-23-editorial-tour-imagery-design.md`

## Global Constraints

- Label homepage photography with the exact visible caption `Moments from previous Drive tours`.
- Label each itinerary photograph with the exact visible caption `From a previous Drive tour`.
- Do not imply that previous-tour imagery depicts the future Alpine GT 2027 departure.
- Retain hotel images, names, regions, nights and descriptions, but remove the visible `Explore the hotel` link and icon.
- Retain hotel `website` values in `src/data/tours.js`.
- Landscape assets must be no wider than 1800 pixels; portrait assets must be no taller than 1800 pixels.
- All new below-the-fold images must include intrinsic dimensions and `loading="lazy"`.
- Mobile layouts must not introduce horizontal scrolling.

---

## File Map

- Create `src/components/LifeOnTour.jsx`: homepage-only asymmetric image composition and provenance caption.
- Create `src/assets/tour-life-driving.webp`: homepage primary rolling-car image.
- Create `src/assets/tour-life-dinner.webp`: homepage candid dinner image.
- Create `src/assets/tour-life-group.webp`: homepage group portrait.
- Create `src/assets/tour-day-1-departure.webp`: Day 1 convoy image.
- Create `src/assets/tour-day-2-country-road.webp`: Day 2 rural-road image.
- Create `src/assets/tour-day-3-alpine-pass.webp`: Day 3 Alpine hero image.
- Create `src/assets/tour-day-4-lake.webp`: Day 4 lake image.
- Create `src/assets/tour-day-5-reflection.webp`: Day 5 conversation image.
- Modify `src/pages/LandingPage.jsx`: import and place `LifeOnTour` between pillars and founders.
- Modify `src/data/tours.js`: add image URL, alt text, width and height to every itinerary day.
- Modify `src/components/tours/ItineraryDay.jsx`: render the data-driven editorial figure.
- Modify `src/components/tours/HotelFeature.jsx`: remove the external hotel CTA and unused icon import.
- Create `tests/editorial-tour-imagery.contract.test.js`: assert homepage placement, provenance copy, itinerary metadata and hotel-link removal.

---

### Task 1: Optimise and Register the Selected Photography

**Files:**
- Create: `src/assets/tour-life-driving.webp`
- Create: `src/assets/tour-life-dinner.webp`
- Create: `src/assets/tour-life-group.webp`
- Create: `src/assets/tour-day-1-departure.webp`
- Create: `src/assets/tour-day-2-country-road.webp`
- Create: `src/assets/tour-day-3-alpine-pass.webp`
- Create: `src/assets/tour-day-4-lake.webp`
- Create: `src/assets/tour-day-5-reflection.webp`
- Modify: `src/data/tours.js`
- Create: `tests/editorial-tour-imagery.contract.test.js`

**Interfaces:**
- Consumes: User-supplied JPEG files listed in the approved design specification.
- Produces: Every `alpineGtTour.days[]` item gains `image: { src: string, alt: string, width: number, height: number }`.

- [ ] **Step 1: Write the failing tour-data contract test**

Create `tests/editorial-tour-imagery.contract.test.js` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { alpineGtTour } from '../src/data/tours.js';

test('every Alpine GT chapter has factual previous-tour imagery metadata', () => {
  assert.deepEqual(
    alpineGtTour.days.map(({ image }) => image.src.match(/tour-day-[^/]+\.webp/)?.[0]),
    [
      'tour-day-1-departure.webp',
      'tour-day-2-country-road.webp',
      'tour-day-3-alpine-pass.webp',
      'tour-day-4-lake.webp',
      'tour-day-5-reflection.webp',
    ],
  );

  for (const { image } of alpineGtTour.days) {
    assert.ok(image.alt.length > 20);
    assert.ok(Number.isInteger(image.width) && image.width > 0);
    assert.ok(Number.isInteger(image.height) && image.height > 0);
  }
});
```

- [ ] **Step 2: Run the new contract test and verify it fails**

Run: `node --test tests/editorial-tour-imagery.contract.test.js`

Expected: FAIL because `day.image` is undefined.

- [ ] **Step 3: Convert the eight approved source images to WebP**

Use orientation-aware image conversion at quality 82. Constrain landscape images to 1800px wide and the portrait dinner image to 1800px high. Map the sources exactly:

```text
/Users/daleal/Desktop/The Drive/assets/jpg/_A125527.jpeg -> src/assets/tour-life-driving.webp
/Users/daleal/Desktop/The Drive/assets/jpg/_A124211.jpeg -> src/assets/tour-life-dinner.webp
/Users/daleal/Desktop/The Drive/assets/jpg/_A125078.jpeg -> src/assets/tour-life-group.webp
/Users/daleal/Desktop/The Drive/IMG_1396.jpeg -> src/assets/tour-day-1-departure.webp
/Users/daleal/Desktop/The Drive/DSC_0208.jpeg -> src/assets/tour-day-2-country-road.webp
/Users/daleal/Desktop/The Drive/IMG_2615.jpeg -> src/assets/tour-day-3-alpine-pass.webp
/Users/daleal/Desktop/The Drive/assets/jpg/_A123990.jpeg -> src/assets/tour-day-4-lake.webp
/Users/daleal/Desktop/The Drive/assets/jpg/_A124163_2.jpeg -> src/assets/tour-day-5-reflection.webp
```

Run this from the repository root; Sharp is already available through the installed workspace dependencies:

```bash
node --input-type=module -e "import sharp from 'sharp'; const jobs = [['/Users/daleal/Desktop/The Drive/assets/jpg/_A125527.jpeg','src/assets/tour-life-driving.webp',1800,undefined],['/Users/daleal/Desktop/The Drive/assets/jpg/_A124211.jpeg','src/assets/tour-life-dinner.webp',undefined,1800],['/Users/daleal/Desktop/The Drive/assets/jpg/_A125078.jpeg','src/assets/tour-life-group.webp',1800,undefined],['/Users/daleal/Desktop/The Drive/IMG_1396.jpeg','src/assets/tour-day-1-departure.webp',1800,undefined],['/Users/daleal/Desktop/The Drive/DSC_0208.jpeg','src/assets/tour-day-2-country-road.webp',1800,undefined],['/Users/daleal/Desktop/The Drive/IMG_2615.jpeg','src/assets/tour-day-3-alpine-pass.webp',1800,undefined],['/Users/daleal/Desktop/The Drive/assets/jpg/_A123990.jpeg','src/assets/tour-day-4-lake.webp',1800,undefined],['/Users/daleal/Desktop/The Drive/assets/jpg/_A124163_2.jpeg','src/assets/tour-day-5-reflection.webp',1800,undefined]]; for (const [input,output,width,height] of jobs) await sharp(input).rotate().resize({width,height,fit:'inside',withoutEnlargement:true}).webp({quality:82}).toFile(output);"
```

After conversion, inspect the actual pixel dimensions and file sizes. Re-encode any landscape wider than 1800px, any portrait taller than 1800px, or any file with obvious visible degradation.

- [ ] **Step 4: Add exact day image metadata**

Add an `image` object to each corresponding day in `src/data/tours.js` using these exact encoded dimensions:

```js
image: {
  src: new URL('../assets/tour-day-1-departure.webp', import.meta.url).href,
  alt: 'A convoy of sports cars passing the grandstand at a historic French road circuit',
  width: 640,
  height: 480,
},
```

Add the other four objects with these exact values:

```js
// Day 2
image: {
  src: new URL('../assets/tour-day-2-country-road.webp', import.meta.url).href,
  alt: 'A white Porsche 911 paused on a quiet country road beneath a wide sky',
  width: 640,
  height: 427,
},

// Day 3
image: {
  src: new URL('../assets/tour-day-3-alpine-pass.webp', import.meta.url).href,
  alt: 'A silver Porsche 911 overlooking a snow-capped Alpine valley',
  width: 640,
  height: 480,
},

// Day 4
image: {
  src: new URL('../assets/tour-day-4-lake.webp', import.meta.url).href,
  alt: 'A boat crossing calm blue water with a lakeside town and hills beyond',
  width: 1800,
  height: 1200,
},

// Day 5
image: {
  src: new URL('../assets/tour-day-5-reflection.webp', import.meta.url).href,
  alt: 'Two tour guests relaxing in armchairs and talking at the end of the day',
  width: 1800,
  height: 1200,
},
```

- [ ] **Step 5: Run the data-focused test**

Run: `node --test tests/editorial-tour-imagery.contract.test.js`

Expected: PASS.

- [ ] **Step 6: Commit the assets, metadata and test**

```bash
git add src/assets/tour-*.webp src/data/tours.js tests/editorial-tour-imagery.contract.test.js
git commit -m "feat: add previous tour imagery assets"
```

---

### Task 2: Add the Homepage `Life on tour` Editorial Strip

**Files:**
- Create: `src/components/LifeOnTour.jsx`
- Modify: `src/pages/LandingPage.jsx`
- Modify: `tests/editorial-tour-imagery.contract.test.js`

**Interfaces:**
- Consumes: `tour-life-driving.webp`, `tour-life-dinner.webp`, and `tour-life-group.webp` created in Task 1.
- Produces: A no-props `<LifeOnTour />` component placed between `#pillars` and `#team`.

- [ ] **Step 1: Add a failing homepage composition test**

Append to `tests/editorial-tour-imagery.contract.test.js`:

```js
test('homepage places the Life on tour story between operations and founders', async () => {
  const landing = await readFile(
    new URL('../src/pages/LandingPage.jsx', import.meta.url),
    'utf8',
  );
  const lifeOnTour = await readFile(
    new URL('../src/components/LifeOnTour.jsx', import.meta.url),
    'utf8',
  );

  assert.ok(landing.indexOf('<LifeOnTour') > landing.indexOf('id="pillars"'));
  assert.ok(landing.indexOf('<LifeOnTour') < landing.indexOf('id="team"'));
  assert.match(lifeOnTour, /Life on tour/);
  assert.match(lifeOnTour, /Moments from previous Drive tours/);
  assert.match(lifeOnTour, /tour-life-driving\.webp/);
  assert.match(lifeOnTour, /tour-life-dinner\.webp/);
  assert.match(lifeOnTour, /tour-life-group\.webp/);
  assert.equal((lifeOnTour.match(/loading="lazy"/g) ?? []).length, 3);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/editorial-tour-imagery.contract.test.js`

Expected: FAIL with `ENOENT` for `src/components/LifeOnTour.jsx`.

- [ ] **Step 3: Implement the focused homepage component**

Create `src/components/LifeOnTour.jsx`. Import the three image assets, render a semantic `<section aria-labelledby="life-on-tour-title">`, and use this structure:

```jsx
import drivingImage from '../assets/tour-life-driving.webp';
import dinnerImage from '../assets/tour-life-dinner.webp';
import groupImage from '../assets/tour-life-group.webp';

export default function LifeOnTour() {
  return (
<section className="overflow-hidden border-y border-white/10 bg-brandDark py-20 md:py-28" aria-labelledby="life-on-tour-title">
  <div className="mx-auto max-w-7xl px-6">
    <div className="mb-10 max-w-2xl md:mb-14">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-brandTeal">On the road together</p>
      <h2 id="life-on-tour-title" className="mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl">Life on tour</h2>
      <p className="mt-5 max-w-xl text-base leading-7 text-gray-300">The road is only part of the story. Shared miles, unhurried evenings and the people around you turn a great drive into something lasting.</p>
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-5">
      <figure className="aspect-[16/10] overflow-hidden bg-brandGray md:col-span-8 md:row-span-2">
        <img src={drivingImage} alt="A purple Porsche 911 GT3 RS in motion on a previous Drive tour" width="1800" height="1204" loading="lazy" className="h-full w-full object-cover" />
      </figure>
      <figure className="aspect-[4/5] overflow-hidden bg-brandGray md:col-span-4 md:aspect-auto">
        <img src={dinnerImage} alt="Two guests sharing conversation over dinner during a previous Drive tour" width="1200" height="1800" loading="lazy" className="h-full w-full object-cover" />
      </figure>
      <figure className="aspect-[16/9] overflow-hidden bg-brandGray md:col-span-4 md:aspect-auto">
        <img src={groupImage} alt="Drive tour guests gathered together on sunny grandstand steps" width="1800" height="1013" loading="lazy" className="h-full w-full object-cover" />
      </figure>
    </div>
    <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gray-500">Moments from previous Drive tours</p>
  </div>
</section>
  );
}
```

Do not add links, carousel controls, or hover-only content.

- [ ] **Step 4: Place the component in the homepage reading order**

In `src/pages/LandingPage.jsx`, import:

```js
import LifeOnTour from '../components/LifeOnTour.jsx';
```

Render `<LifeOnTour />` immediately after the closing `</section>` for `id="pillars"` and immediately before the founders comment and `id="team"` section.

- [ ] **Step 5: Run the focused tests**

Run: `node --test tests/editorial-tour-imagery.contract.test.js tests/homepage-founders.contract.test.js`

Expected: All focused tests PASS.

- [ ] **Step 6: Commit the homepage section**

```bash
git add src/components/LifeOnTour.jsx src/pages/LandingPage.jsx tests/editorial-tour-imagery.contract.test.js
git commit -m "feat: add life on tour homepage story"
```

---

### Task 3: Integrate Chapter Photography and Remove the Hotel CTA

**Files:**
- Modify: `src/components/tours/ItineraryDay.jsx`
- Modify: `src/components/tours/HotelFeature.jsx`
- Modify: `tests/editorial-tour-imagery.contract.test.js`

**Interfaces:**
- Consumes: `day.image.src`, `day.image.alt`, `day.image.width`, `day.image.height`, and `day.hero` from `src/data/tours.js`.
- Produces: One visible, captioned editorial `<figure>` per itinerary chapter and no visible external hotel link.

- [ ] **Step 1: Add a failing itinerary-rendering test**

Append to `tests/editorial-tour-imagery.contract.test.js`:

```js
import { readFile } from 'node:fs/promises';

test('itinerary renders one lazy previous-tour figure from each day', async () => {
  const source = await readFile(
    new URL('../src/components/tours/ItineraryDay.jsx', import.meta.url),
    'utf8',
  );

  assert.match(source, /src=\{day\.image\.src\}/);
  assert.match(source, /alt=\{day\.image\.alt\}/);
  assert.match(source, /width=\{day\.image\.width\}/);
  assert.match(source, /height=\{day\.image\.height\}/);
  assert.match(source, /loading="lazy"/);
  assert.match(source, /From a previous Drive tour/);
  assert.match(source, /day\.hero/);
});

test('hotel presentation does not expose an external website CTA', async () => {
  const source = await readFile(
    new URL('../src/components/tours/HotelFeature.jsx', import.meta.url),
    'utf8',
  );

  assert.doesNotMatch(source, /Explore the hotel|ExternalLink|href=\{hotel\.website\}/);
  assert.ok(alpineGtTour.hotels.every(({ website }) => website.startsWith('https://')));
});
```

Place the new `readFile` import with the existing imports at the top of the test file rather than directly above the test.

- [ ] **Step 2: Run the test and verify it fails**

Run: `node --test tests/editorial-tour-imagery.contract.test.js`

Expected: FAIL because `ItineraryDay.jsx` does not render `day.image`, and because the hotel CTA remains.

- [ ] **Step 3: Render the editorial figure inside each chapter**

In `src/components/tours/ItineraryDay.jsx`, insert the figure after `day.overview` and before the route overview grid:

```jsx
<figure className={`relative mt-12 overflow-hidden bg-brandGray ${
  day.hero
    ? 'aspect-[16/9] md:-mx-8 lg:-mx-16'
    : day.number % 2 === 0
      ? 'aspect-[16/10] md:ml-12'
      : 'aspect-[16/10] md:mr-12'
}`}>
  <img
    src={day.image.src}
    alt={day.image.alt}
    width={day.image.width}
    height={day.image.height}
    loading="lazy"
    className="h-full w-full object-cover"
  />
  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent" />
  <figcaption className="absolute bottom-4 left-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white md:bottom-5 md:left-5">
    From a previous Drive tour
  </figcaption>
</figure>
```

Keep the existing route grid's `mt-12`; the figure and route detail should breathe as separate editorial beats. If browser QA shows the Day 3 negative margins clipping important content, reduce them to `md:-mx-4 lg:-mx-8` rather than adding overflow or horizontal scrolling.

- [ ] **Step 4: Remove only the visible hotel website CTA**

In `src/components/tours/HotelFeature.jsx`:

- Delete `import { ExternalLink } from 'lucide-react';`.
- Delete the complete `<a href={hotel.website}>…</a>` block.
- Do not alter the hotel image, name, region, nights, description, or layout.

- [ ] **Step 5: Run focused and regression tests**

Run: `node --test tests/editorial-tour-imagery.contract.test.js tests/tours.test.js tests/journey-overview.contract.test.js`

Expected: All tests PASS.

- [ ] **Step 6: Commit the tour integration**

```bash
git add src/components/tours/ItineraryDay.jsx src/components/tours/HotelFeature.jsx tests/editorial-tour-imagery.contract.test.js
git commit -m "feat: enrich Alpine tour chapters with imagery"
```

---

### Task 4: Full Verification and Visual QA

**Files:**
- Modify only if verification exposes a defect directly caused by Tasks 1–3.

**Interfaces:**
- Consumes: Completed homepage and tour-page implementation.
- Produces: Verified production-ready branch with no layout overflow or console errors.

- [ ] **Step 1: Run the complete automated suite**

Run:

```bash
npm test
npm run lint
npm run build
git diff --check
```

Expected: Every command exits successfully with no warnings attributable to the new work.

- [ ] **Step 2: Start the local preview**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite reports a local URL and serves the homepage and `/tours/alpine-gt-2027`.

- [ ] **Step 3: Verify the homepage at desktop and mobile widths**

At approximately 1440px and 390px, confirm:

- `Life on tour` appears between `How We Operate` and `The organisers`.
- The primary driving image leads the composition.
- The dinner and group images retain recognisable people and useful crops.
- The provenance caption is visible without interaction.
- Mobile presents a vertical sequence with no horizontal overflow.

- [ ] **Step 4: Verify the Alpine GT page at desktop and mobile widths**

At approximately 1440px and 390px, confirm:

- Every day has exactly one previous-tour figure before `Route overview`.
- Day 3 is visibly larger than the other four figures.
- Alternating Day 1/2/4/5 positioning supports rather than disrupts the title hierarchy.
- Hotel imagery and descriptions remain present.
- No `Explore the hotel` link appears.
- No image or chapter causes horizontal scrolling.
- Browser console contains no errors.

- [ ] **Step 5: Inspect asset payload and repository status**

Run: `du -h src/assets/tour-*.webp && git status --short`

Expected: All eight WebPs are reasonably compressed for their displayed sizes, and only intended implementation files are modified or untracked.

- [ ] **Step 6: Commit any verification-only corrections**

If QA required a direct crop, spacing, or overflow correction, stage only the affected implementation file or files by their literal paths, then commit:

```bash
git commit -m "fix: refine editorial imagery presentation"
```

If no correction was required, do not create an empty commit.
