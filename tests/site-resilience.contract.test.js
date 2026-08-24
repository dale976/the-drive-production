import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readProjectFile = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('homepage hero headline scales at narrow mobile widths', async () => {
  const landingPage = await readProjectFile('src/pages/LandingPage.jsx');

  assert.match(landingPage, /text-\[clamp\(/);
  assert.doesNotMatch(landingPage, /text-brandTeal italic font-black pr-4/);
});

test('production content security policy permits Web3Forms submissions', async () => {
  const headers = await readProjectFile('public/_headers');

  assert.match(headers, /connect-src[^\n]*https:\/\/api\.web3forms\.com/);
});
