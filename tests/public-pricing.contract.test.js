import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readProjectFile = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('tour detail publishes the shared payment schedule and occupancy', async () => {
  const page = await readProjectFile('src/pages/TourDetailPage.jsx');
  assert.match(page, /<TourPrice tour={tour}/);
  const price = await readProjectFile('src/components/tours/TourPrice.jsx');
  for (const field of ['total', 'deposit', 'balance', 'balanceDueDays']) {
    assert.ok(price.includes(`pricing.${field}`));
  }
  assert.match(price, /One car · two people sharing accommodation/);
  assert.match(price, /days before departure/);
});
