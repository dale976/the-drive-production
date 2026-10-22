import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const componentUrl = new URL(
  '../src/components/tours/RegisterInterestPanel.jsx',
  import.meta.url,
);

test('mobile registration is suppressed on the contact route', async () => {
  const source = await readFile(componentUrl, 'utf8');

  assert.match(source, /useLocation/);
  assert.match(source, /pathname === '\/contact'/);
  assert.match(source, /if \(!mobile \|\| isContactPage\) return undefined/);
  assert.match(
    source,
    /if \(mobile && \(isContactPage \|\| !showMobileBar\)\) return null/,
  );
});

test('all event calls to action carry event context and general enquiries remain available', async () => {
  const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
  const panel = await read('src/components/tours/RegisterInterestPanel.jsx');
  assert.equal((panel.match(/to={tour.registerPath}/g) ?? []).length, 2);
  assert.equal((panel.match(/{tour.enquiryLabel}/g) ?? []).length, 2);
  assert.doesNotMatch(panel, /whitespace-nowrap/);
  const hero = await read('src/components/tours/TourHero.jsx');
  assert.match(hero, /to={tour.registerPath}/);
  assert.match(hero, /{tour.enquiryLabel}/);
  const listing = await read('src/pages/ToursPage.jsx');
  assert.match(listing, /to={tour.registerPath}/);
  assert.match(listing, /{tour.enquiryLabel}/);
  assert.match(listing, /to="\/contact"/);
  const footer = await read('src/components/Footer.jsx');
  assert.match(footer, /to="\/contact"[^>]*>Get in touch/);
});

test('mobile registration observes the closing panel as well as the hero', async () => {
  const source = await readFile(componentUrl, 'utf8');
  assert.match(source, /register-interest-heading/);
  assert.match(source, /entry\.target === closingPanel/);
  assert.match(source, /observer\.observe\(closingPanel\)/);
  assert.match(source, /setShowMobileBar\(!heroVisible && !closingVisible\)/);
  assert.match(source, /observer\.disconnect\(\)/);
});
