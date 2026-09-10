import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const readProjectFile = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('public pages expose search metadata without a global sales CTA', async () => {
  const [footer, pageMeta, robots, sitemap] = await Promise.all([
    readProjectFile('src/components/Footer.jsx'),
    readProjectFile('src/components/PageMeta.jsx'),
    readProjectFile('public/robots.txt'),
    readProjectFile('public/sitemap.xml'),
  ]);

  assert.doesNotMatch(footer, /site-contact-cta|Register interest in The Alpine GT/);
  assert.match(footer, /mailto:info@thedrivetouringcompany\.com/);
  assert.match(pageMeta, /application\/ld\+json/);
  assert.match(pageMeta, /max-image-preview:large/);
  assert.match(robots, /Sitemap: https:\/\/thedrivetouringcompany\.com\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/thedrivetouringcompany\.com\/contact/);
});

test('social previews use the dedicated landscape brand card', async () => {
  const [index, pageMeta, tourPage, imageMetadata] = await Promise.all([
    readProjectFile('index.html'),
    readProjectFile('src/components/PageMeta.jsx'),
    readProjectFile('src/pages/TourDetailPage.jsx'),
    sharp(fileURLToPath(new URL('../public/social-preview.jpg', import.meta.url))).metadata(),
  ]);

  assert.match(index, /https:\/\/thedrivetouringcompany\.com\/social-preview\.jpg/);
  assert.match(pageMeta, /const defaultImage = '\/social-preview\.jpg'/);
  assert.match(tourPage, /https:\/\/thedrivetouringcompany\.com\/social-preview\.jpg/);
  assert.equal(imageMetadata.width, 1200);
  assert.equal(imageMetadata.height, 630);
});
