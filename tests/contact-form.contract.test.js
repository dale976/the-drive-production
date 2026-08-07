import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pageUrl = new URL('../src/pages/ContactPage.jsx', import.meta.url);

test('contact page submits Alpine GT enquiries through Web3Forms', async () => {
  const source = await readFile(pageUrl, 'utf8');

  assert.match(source, /https:\/\/api\.web3forms\.com\/submit/);
  assert.match(source, /formData\.append\('access_key'/);
  assert.match(source, /name="email"/);
  assert.match(source, /name="botcheck"/);
  assert.match(source, /aria-live="polite"/);
});
