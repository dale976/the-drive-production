import test from 'node:test';
import assert from 'node:assert/strict';
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
