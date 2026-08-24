import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('homepage presents the founders through a shared personal story', async () => {
  const source = await readFile(
    new URL('../src/pages/LandingPage.jsx', import.meta.url),
    'utf8',
  );

  assert.match(source, /founders-driving\.webp/);
  assert.match(source, /We’re Lewis and Alan/);
  assert.match(source, /friends for more than two decades/);
  assert.match(source, /Over the past three years/);
  assert.match(source, /Great roads\. Remarkable cars\. Good company\./);
  assert.doesNotMatch(source, />LH<|>AD<|Creative & Experience Design|Routes & Logistics/);
});

test('homepage hero keeps its primary actions without a duplicate tour badge', async () => {
  const source = await readFile(
    new URL('../src/pages/LandingPage.jsx', import.meta.url),
    'utf8',
  );

  assert.match(source, />\s*Explore Tours\s*</);
  assert.match(source, />\s*Register interest\s*</);
  assert.doesNotMatch(source, /ALPINE GT 2027 · REGISTER INTEREST NOW|animate-pulse/);
});
