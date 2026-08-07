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
