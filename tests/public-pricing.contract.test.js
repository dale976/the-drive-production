import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readProjectFile = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('public tour surfaces do not publish pricing', async () => {
  const files = await Promise.all([
    'src/pages/ToursPage.jsx',
    'src/pages/TourDetailPage.jsx',
    'src/pages/ContactPage.jsx',
    'src/components/tours/TourHero.jsx',
    'src/components/tours/PackageDetails.jsx',
    'src/components/tours/RegisterInterestPanel.jsx',
  ].map(readProjectFile));

  for (const source of files) {
    assert.doesNotMatch(source, /\.price|totalPence|priceCurrency|£2595/);
  }
});
