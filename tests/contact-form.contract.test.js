import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pageUrl = new URL('../src/pages/ContactPage.jsx', import.meta.url);

test('contact page submits enquiries through Web3Forms', async () => {
  const source = await readFile(pageUrl, 'utf8');

  assert.match(source, /https:\/\/api\.web3forms\.com\/submit/);
  assert.match(source, /formData\.append\('access_key'/);
  assert.match(source, /name="email"/);
  assert.match(source, /name="botcheck"/);
  assert.match(source, /aria-live="polite"/);
});

test('contact variants collect relevant details and isolate form state', async () => {
  const source = await readFile(pageUrl, 'utf8');
  assert.match(source, /getEnquiryTour\(search\)/);
  assert.match(source, /key={tour\?\.slug \?\? 'general'}/);
  assert.match(source, /name="name"[^>]*required/);
  assert.match(source, /name="email"[^>]*required/);
  assert.match(source, /name="Vehicle"[^>]*required/);
  assert.doesNotMatch(source, /name="Experience"/);
  assert.match(source, /name="message"[^>]*required={!tour}/);
  assert.match(source, /name="Consent"/);
  assert.match(source, /<TourPrice tour={tour}/);
  assert.match(source, /no space has been reserved/i);
});

test('email and analytics use resolved context and failures retain the form', async () => {
  const source = await readFile(pageUrl, 'utf8');
  assert.match(source, /tour\?\.title \?\? 'General enquiry'/);
  assert.match(source, /tour: tour\?\.slug \?\? 'general'/);
  assert.ok(source.indexOf('if (!response.ok || !data.success)') < source.indexOf('form.reset()'));
  assert.doesNotMatch(source.slice(source.indexOf('} catch')), /form\.reset\(\)/);
  assert.match(source, /disabled={status === 'submitting'}/);
  assert.doesNotMatch(source, /name="Terms"/);
});
