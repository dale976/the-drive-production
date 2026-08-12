import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('journey road book is hidden below the md breakpoint', async () => {
  const source = await readFile(
    new URL('../src/components/tours/JourneyOverview.jsx', import.meta.url),
    'utf8',
  );

  assert.match(source, /className="[^"]*hidden[^"]*md:block[^"]*"/);
  assert.doesNotMatch(source, /overflow-x-auto|snap-mandatory|min-w-\[/);
});
