# Alpine GT Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Raise the Alpine GT price to £2595, replace HERMITAGE with Campus Hotel Hertenstein throughout, and remove the horizontally scrolling road book from mobile layouts.

**Architecture:** Keep commercial and itinerary content in the existing `alpineGtTour` data object so listing, detail, contact, and CTA views remain consistent. Keep search structured data derived from that object where possible, replace the hotel asset locally, and use Tailwind responsive visibility on the existing road-book section rather than adding JavaScript viewport logic.

**Tech Stack:** React 19, React Router, Tailwind CSS 4, Vite 8, Node test runner.

## Global Constraints

- The total tour price is exactly `£2595`, stored as `259500` pence.
- Preserve the wording `Based on 2 people sharing`.
- The Lake Lucerne hotel is `Campus Hotel Hertenstein` for nights 2–3.
- Use the official URL `https://www.campus-hotel-hertenstein.ch/en/` and an image sourced from that official website.
- Hide the complete road-book section below the existing `md` breakpoint; do not create a replacement mobile control.
- Do not alter the five-day itinerary structure or the established visual direction.

---

### Task 1: Price and Search Offer

**Files:**
- Modify: `tests/tours.test.js`
- Modify: `src/data/tours.js`
- Modify: `src/pages/TourDetailPage.jsx`

**Interfaces:**
- Consumes: `alpineGtTour.price` with `totalPence`, `display`, and `basis`.
- Produces: A single visible price of `£2595` and a structured-data offer price derived from `alpineGtTour.price.totalPence`.

- [ ] **Step 1: Update the price contract to fail on the current data**

```js
assert.equal(alpineGtTour.price.totalPence, 259500);
assert.equal(alpineGtTour.price.display, '£2595');
assert.equal(alpineGtTour.price.basis, 'Based on 2 people sharing');
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="exact pricing basis" tests/tours.test.js`

Expected: FAIL because the current values are `249500` and `£2495`.

- [ ] **Step 3: Update shared price data and derive the schema price**

In `src/data/tours.js`:

```js
price: {
  totalPence: 259500,
  display: '£2595',
  basis: 'Based on 2 people sharing',
},
```

In `src/pages/TourDetailPage.jsx`:

```js
price: String(alpineGtTour.price.totalPence / 100),
```

- [ ] **Step 4: Run the focused test and source search**

Run: `node --test --test-name-pattern="exact pricing basis" tests/tours.test.js`

Expected: PASS.

Run: `rg -n "2495|249500" src tests public`

Expected: no matches.

- [ ] **Step 5: Commit the price update**

```bash
git add src/data/tours.js src/pages/TourDetailPage.jsx tests/tours.test.js
git commit -m "feat: update Alpine GT price"
```

---

### Task 2: Campus Hotel Hertenstein Replacement

**Files:**
- Create: `src/assets/campus-hotel-hertenstein.webp`
- Delete: `src/assets/hermitage-lake-lucerne.webp`
- Modify: `src/data/tours.js`
- Modify: `tests/tours.test.js`

**Interfaces:**
- Consumes: The second item in `alpineGtTour.hotels`, used by day 2 through `TourDetailPage`.
- Produces: A complete Campus Hotel Hertenstein record and itinerary copy with no live HERMITAGE references.

- [ ] **Step 1: Update the hotel contract to fail on the current data**

Replace the expected hotel list and add exact checks:

```js
assert.deepEqual(
  alpineGtTour.hotels.map(({ name }) => name),
  ['Parkhotel Adler', 'Campus Hotel Hertenstein', 'Château de Chailly'],
);
assert.equal(
  alpineGtTour.hotels[1].website,
  'https://www.campus-hotel-hertenstein.ch/en/',
);
assert.equal(alpineGtTour.hotels[1].nights, 'Nights 2–3');
assert.match(alpineGtTour.hotels[1].image, /campus-hotel-hertenstein/);
```

- [ ] **Step 2: Run the focused test and verify failure**

Run: `node --test --test-name-pattern="official hotels" tests/tours.test.js`

Expected: FAIL because the second hotel is currently HERMITAGE.

- [ ] **Step 3: Download and optimise an official exterior/lakeside image**

Inspect the official homepage or gallery HTML, select its landscape exterior image showing the hotel’s Lake Lucerne setting, download the original, then optimise it to a maximum width of 1800px as WebP at approximately 80% quality. Save the final asset as:

```text
src/assets/campus-hotel-hertenstein.webp
```

Verify with `sips -g pixelWidth -g pixelHeight src/assets/campus-hotel-hertenstein.webp` and ensure the image is landscape and no wider than 1800px. Remove `src/assets/hermitage-lake-lucerne.webp` only after the source reference has been replaced.

- [ ] **Step 4: Replace the hotel data and itinerary references**

Use this hotel record in `src/data/tours.js`:

```js
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
```

Update day 2 to end with a composed arrival at Campus Hotel Hertenstein, include `A lakeside evening at Campus Hotel Hertenstein`, and set its overnight value to `Campus Hotel Hertenstein`. Update day 3’s return wording to Hertenstein and set its overnight value to `Campus Hotel Hertenstein`.

- [ ] **Step 5: Run hotel tests and eliminate stale references**

Run: `node --test --test-name-pattern="official hotels" tests/tours.test.js`

Expected: PASS.

Run: `rg -ni "hermitage|hermitage-lake-lucerne" src tests public`

Expected: no matches.

- [ ] **Step 6: Commit the hotel replacement**

```bash
git add src/data/tours.js src/assets/campus-hotel-hertenstein.webp tests/tours.test.js
git add -u src/assets/hermitage-lake-lucerne.webp
git commit -m "feat: update Alpine GT Lake Lucerne hotel"
```

---

### Task 3: Desktop-Only Road Book

**Files:**
- Create: `tests/journey-overview.contract.test.js`
- Modify: `src/components/tours/JourneyOverview.jsx`

**Interfaces:**
- Consumes: `days` from `alpineGtTour.days`.
- Produces: The same road-book UI at `md` and above, with no rendered layout below `md` because its section uses `hidden md:block`.

- [ ] **Step 1: Add a failing responsive visibility contract**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('journey road book is hidden below the md breakpoint', async () => {
  const source = await readFile(
    new URL('../src/components/tours/JourneyOverview.jsx', import.meta.url),
    'utf8',
  );

  assert.match(source, /className="[^"]*hidden[^"]*md:block[^"]*"/);
  assert.doesNotMatch(source, /overflow-x-auto|snap-mandatory|min-w-\[/);
});
```

- [ ] **Step 2: Run the contract and verify failure**

Run: `node --test tests/journey-overview.contract.test.js`

Expected: FAIL because the section is visible and the rail still contains mobile horizontal-scroll classes.

- [ ] **Step 3: Make the section desktop-only and simplify desktop classes**

Change the outer section class to include `hidden md:block`, remove mobile-only `flex`, `snap-x`, `snap-mandatory`, `overflow-x-auto`, `min-w-*`, and `snap-start` classes, and keep the five-column desktop grid:

```jsx
<section className="hidden overflow-hidden border-y border-white/10 bg-[#11171b] px-6 py-20 text-white md:block" ...>
```

```jsx
<ol className="mt-10 grid grid-cols-5 border-y border-white/10">
```

- [ ] **Step 4: Run the contract and verify it passes**

Run: `node --test tests/journey-overview.contract.test.js`

Expected: PASS.

- [ ] **Step 5: Commit responsive behaviour**

```bash
git add src/components/tours/JourneyOverview.jsx tests/journey-overview.contract.test.js
git commit -m "fix: hide tour road book on mobile"
```

---

### Task 4: Release Verification

**Files:**
- Verify only; no planned production edits.

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: A release-ready branch with verified content, responsive behaviour, and build output.

- [ ] **Step 1: Run all automated checks**

Run: `npm test && npm run lint && npm run build && git diff --check`

Expected: all tests pass, ESLint reports no errors, Vite builds successfully, and the diff check is clean.

- [ ] **Step 2: Run final stale-content searches**

Run: `rg -ni "£2495|249500|hermitage|hermitage-lake-lucerne" src tests public`

Expected: no matches.

- [ ] **Step 3: Verify responsive rendering in a browser**

Start the Vite development server and inspect `/tours/alpine-gt-2027` at approximately 390px and 1440px viewport widths. At 390px, verify the experience section flows directly into day 1 and no horizontal road-book rail appears. At 1440px, verify all five road-book chapters appear, the Campus Hotel Hertenstein image and copy render in day 2, and every visible price is `£2595`.

- [ ] **Step 4: Review branch state**

Run: `git status --short && git log --oneline main..HEAD`

Expected: clean working tree and the specification plus three focused implementation commits.
