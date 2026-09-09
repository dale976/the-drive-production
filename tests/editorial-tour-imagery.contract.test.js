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

  assert.deepEqual(
    alpineGtTour.days.map(({ image }) => image.layout),
    ['left', 'right', 'hero', 'left', 'quiet'],
  );

  assert.deepEqual(alpineGtTour.days[0].image, {
    src: alpineGtTour.days[0].image.src,
    alt: 'A blue Lotus Exige parked beside the painted grandstand at a historic French circuit',
    width: 1800,
    height: 1012,
    layout: 'left',
  });

  assert.deepEqual(alpineGtTour.days[1].image, {
    src: alpineGtTour.days[1].image.src,
    alt: 'A line of grand touring cars gathered in the rain during a Black Forest drive',
    width: 1800,
    height: 1013,
    layout: 'right',
  });

  assert.deepEqual(alpineGtTour.days[2].image, {
    src: alpineGtTour.days[2].image.src,
    alt: 'A red Ferrari Spider paused among snow-lined roads on a legendary Alpine pass',
    width: 1800,
    height: 1013,
    layout: 'hero',
  });

  assert.deepEqual(alpineGtTour.days[3].image, {
    src: alpineGtTour.days[3].image.src,
    alt: 'A white Porsche 911 Turbo crossing open countryside beneath a dramatic sky',
    width: 1620,
    height: 1080,
    layout: 'left',
  });

  assert.deepEqual(alpineGtTour.days[4].image, {
    src: alpineGtTour.days[4].image.src,
    alt: 'A purple Porsche 911 GT3 RS in motion on the homeward drive',
    width: 1800,
    height: 1203,
    layout: 'quiet',
  });
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
  assert.deepEqual(
    [...lifeOnTour.matchAll(/tour-life-community-[a-z-]+\.webp/g)].map(([image]) => image),
    [
      'tour-life-community-group.webp',
      'tour-life-community-driver.webp',
      'tour-life-community-alps.webp',
      'tour-life-community-all-together.webp',
      'tour-life-community-dinner.webp',
      'tour-life-community-trophy.webp',
    ],
  );
  assert.equal((lifeOnTour.match(/loading="lazy"/g) ?? []).length, 6);
  assert.match(lifeOnTour, /md:col-span-7 md:row-span-2[\s\S]*src=\{groupImage\}/);
  assert.match(lifeOnTour, /src=\{allTogetherImage\}/);
  assert.doesNotMatch(lifeOnTour, /wineImage|tour-life-community-wine/);
  assert.match(lifeOnTour, /md:grid-cols-12/);
  assert.match(lifeOnTour, /lg:grid-rows-\[18rem_18rem_15rem\]/);
  assert.match(lifeOnTour, /mx-auto mb-10 max-w-2xl text-center/);
  assert.match(lifeOnTour, /mt-5 text-center text-\[0\.7rem\]/);
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
  assert.match(source, /className="h-full w-full object-cover"/);
  assert.doesNotMatch(source, /object-contain/);
  assert.match(source, /From a previous Drive tour/);
  assert.match(source, /imageLayoutStyles\[day\.image\.layout\]/);
  assert.doesNotMatch(source, /day\.number % 2/);
});

test('hotel presentation does not expose an external website CTA', async () => {
  const source = await readFile(
    new URL('../src/components/tours/HotelFeature.jsx', import.meta.url),
    'utf8',
  );

  assert.doesNotMatch(source, /Explore the hotel|ExternalLink|href=\{hotel\.website\}/);
  assert.ok(alpineGtTour.hotels.every(({ website }) => website.startsWith('https://')));
  assert.equal(
    alpineGtTour.hotels[2].alt,
    'A purple Porsche 911 GT3 RS parked outside Château de Chailly in Burgundy',
  );
});
