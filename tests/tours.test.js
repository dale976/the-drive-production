import test from 'node:test';
import assert from 'node:assert/strict';
import { alpineGtTour, getTourBySlug } from '../src/data/tours.js';

test('Alpine GT exposes the public paths and exact pricing basis', () => {
  assert.equal(alpineGtTour.slug, 'alpine-gt-2027');
  assert.equal(alpineGtTour.path, '/tours/alpine-gt-2027');
  assert.equal(alpineGtTour.registerPath, '/contact');
  assert.equal(alpineGtTour.price.totalPence, 249500);
  assert.equal(alpineGtTour.price.display, '£2495');
  assert.equal(
    alpineGtTour.price.basis,
    'Based on 2 people sharing',
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
    alpineGtTour.days[3].routeOverview.includes('Klausen Pass'),
    false,
  );
  assert.equal(alpineGtTour.days[3].routeOverview.includes('Gstaad'), true);
});

test('Alpine GT days use concise premium editorial content', () => {
  for (const day of alpineGtTour.days) {
    assert.equal(typeof day.headline, 'string');
    assert.equal(typeof day.overview, 'string');
    assert.equal(typeof day.routeOverview, 'string');
    assert.ok(day.highlights.length >= 2 && day.highlights.length <= 3);
    assert.equal('stops' in day, false);
  }

  assert.match(alpineGtTour.days[2].routeOverview, /Furka.*Grimsel.*Susten/);
  assert.match(alpineGtTour.days[3].routeOverview, /Brünig.*Gstaad/);
  assert.doesNotMatch(alpineGtTour.days[3].routeOverview, /Klausen/);
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
