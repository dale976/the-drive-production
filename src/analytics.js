export const consentKey = 'the-drive-analytics-consent';
const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
export const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId || '');
let enabled = false;

export function readConsent() {
  try { return localStorage.getItem(consentKey); } catch { return null; }
}

export function enableAnalytics() {
  if (!analyticsConfigured || enabled) return;
  enabled = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: window.location.origin + window.location.pathname,
    page_title: window.location.pathname,
    page_referrer: '',
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function trackEvent(name, parameters = {}) {
  if (!enabled || readConsent() !== 'accepted') return;
  // Never send query strings, form contents, email addresses or free-text labels.
  window.gtag('event', name, {
    page_location: window.location.origin + window.location.pathname,
    page_title: window.location.pathname,
    page_referrer: '',
    ...parameters,
  });
}

export function saveConsent(value) {
  try { localStorage.setItem(consentKey, value); } catch { return false; }
  if (value === 'accepted') enableAnalytics();
  else {
    window[`ga-disable-${measurementId}`] = true;
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (name !== '_ga' && !name.startsWith('_ga_')) continue;
      const parts = window.location.hostname.split('.');
      document.cookie = `${name}=; Max-Age=0; path=/`;
      for (let i = 0; i < parts.length - 1; i++) {
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.${parts.slice(i).join('.')}`;
      }
    }
  }
  return true;
}
