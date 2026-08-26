import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readProjectFile = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('route changes reset the document to the top', async () => {
  const [app, scrollToTop] = await Promise.all([
    readProjectFile('src/App.jsx'),
    readProjectFile('src/components/ScrollToTop.jsx').catch(() => ''),
  ]);

  assert.match(app, /<ScrollToTop\s*\/>/);
  assert.match(scrollToTop, /useLocation/);
  assert.match(scrollToTop, /window\.scrollTo\(\{ top: 0, left: 0, behavior: 'instant' \}\)/);
});
