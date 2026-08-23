import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { alpineGtTour } from '../src/data/tours.js';

test('every Alpine GT chapter has factual previous-tour imagery metadata', () => {
  assert.deepEqual(
    alpineGtTour.days.map(({ image }) => image?.src.match(/tour-day-[^/]+\.webp/)?.[0]),
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

test('homepage places the Life on tour story between operations and founders', async () => {
  const landing = await readFile(
    new URL('../src/pages/LandingPage.jsx', import.meta.url),
    'utf8',
  );
  const lifeOnTour = await readFile(
    new URL('../src/components/LifeOnTour.jsx', import.meta.url),
    'utf8',
  ).catch(() => '');

  assert.ok(landing.indexOf('<LifeOnTour') > landing.indexOf('id="pillars"'));
  assert.ok(landing.indexOf('<LifeOnTour') < landing.indexOf('id="team"'));
  assert.match(lifeOnTour, /Life on tour/);
  assert.match(lifeOnTour, /Moments from previous Drive tours/);
  assert.match(lifeOnTour, /tour-life-driving\.webp/);
  assert.match(lifeOnTour, /tour-life-dinner\.webp/);
  assert.match(lifeOnTour, /tour-life-group\.webp/);
  assert.equal((lifeOnTour.match(/loading="lazy"/g) ?? []).length, 3);
  assert.match(lifeOnTour, /md:grid-rows-\[15rem_15rem\]/);
});

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
