import { useEffect } from 'react';

const siteName = 'The Drive Touring Company';
const siteUrl = 'https://thedrivetouringcompany.com';
const defaultImage = '/alpine-gt-2027-social.jpg';

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

export default function PageMeta({
  title,
  description,
  path = '/',
  image = defaultImage,
  robots = 'index, follow, max-image-preview:large',
  structuredData,
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteName}` : siteName;
    const canonicalUrl = new URL(path, siteUrl).toString();
    const imageUrl = new URL(image, siteUrl).toString();

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robots);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:image:alt', `${title || siteName} — The Drive Touring Company`);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageUrl);

    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', canonicalUrl);

    const scriptId = 'page-structured-data';
    let schemaScript = document.getElementById(scriptId);

    if (structuredData) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = scriptId;
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(structuredData);
    } else {
      schemaScript?.remove();
    }

    return () => document.getElementById(scriptId)?.remove();
  }, [description, image, path, robots, structuredData, title]);

  return null;
}
