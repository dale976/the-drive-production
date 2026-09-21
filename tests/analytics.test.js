import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

async function setup(id = 'G-TEST123') {
  const source = (await readFile(new URL('../src/analytics.js', import.meta.url), 'utf8'))
    .replace('import.meta.env.VITE_GA_MEASUREMENT_ID', JSON.stringify(id))
    .replaceAll('export ', '');
  const storage = new Map();
  const scripts = [];
  const window = { location: { origin: 'https://example.com', pathname: '/contact', hostname: 'example.com' } };
  const document = { cookie: '', createElement: () => ({}), head: { appendChild: (script) => scripts.push(script) } };
  const context = vm.createContext({ window, document, localStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) } });
  vm.runInContext(source, context);
  return { window, scripts, run: (code) => vm.runInContext(code, context) };
}

test('analytics remains off until accepted and stops on withdrawal', async () => {
  const app = await setup();
  app.run("trackEvent('generate_lead')");
  assert.equal(app.scripts.length, 0);
  app.run("saveConsent('accepted'); trackEvent('page_view')");
  assert.equal(app.scripts.length, 1);
  const event = app.window.dataLayer.at(-1);
  assert.equal(event[1], 'page_view');
  assert.equal(event[2].page_location, 'https://example.com/contact');
  app.run("enableAnalytics()");
  assert.equal(app.scripts.length, 1);
  app.run("saveConsent('rejected')");
  const length = app.window.dataLayer.length;
  app.run("trackEvent('generate_lead')");
  assert.equal(app.window.dataLayer.length, length);
  assert.equal(app.window['ga-disable-G-TEST123'], true);
});

test('missing measurement ID never loads Google', async () => {
  const app = await setup('');
  app.run("saveConsent('accepted'); trackEvent('page_view')");
  assert.equal(app.scripts.length, 0);
});
