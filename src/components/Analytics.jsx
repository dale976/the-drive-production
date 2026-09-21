import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { analyticsConfigured, enableAnalytics, readConsent, saveConsent, trackEvent } from '../analytics.js';

export default function Analytics() {
  const { pathname } = useLocation();
  const [consent, setConsent] = useState(readConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const open = () => setSettingsOpen(true);
    window.addEventListener('analytics-settings', open);
    return () => window.removeEventListener('analytics-settings', open);
  }, []);

  useEffect(() => {
    if (consent !== 'accepted') return;
    enableAnalytics();
    trackEvent('page_view');
    let scrolled = false;
    const scroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (!scrolled && height > 0 && window.scrollY / height >= 0.9) {
        scrolled = true;
        trackEvent('scroll', { percent_scrolled: 90 });
      }
    };
    const click = (event) => {
      const link = event.target.closest?.('a[href]');
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      if (url.protocol === 'mailto:') trackEvent('email_click');
      else if (url.hostname === 'www.instagram.com') trackEvent('social_click', { platform: 'instagram' });
      else if (url.origin === window.location.origin && url.pathname === '/contact') trackEvent('register_interest_click');
      else if (url.origin === window.location.origin && url.pathname.startsWith('/tours/')) trackEvent('view_tour_click', { tour: 'alpine_gt_2027' });
    };
    document.addEventListener('click', click);
    window.addEventListener('scroll', scroll, { passive: true });
    return () => {
      document.removeEventListener('click', click);
      window.removeEventListener('scroll', scroll);
    };
  }, [pathname, consent]);

  if (!analyticsConfigured || (consent && !settingsOpen)) return null;

  const choose = (value) => {
    if (!saveConsent(value)) return;
    // Reload after withdrawal so Google's loaded script cannot continue collecting.
    if (consent === 'accepted' && value === 'rejected') window.location.reload();
    else {
      setConsent(value);
      setSettingsOpen(false);
    }
  };

  return (
    <section aria-label="Analytics preferences" className="fixed inset-x-0 bottom-0 z-[100] border-t border-brandTeal/40 bg-brandDark p-6 text-white shadow-2xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="font-bold">Help us improve The Drive</h2>
          <p className="mt-2 text-sm text-gray-300">With your permission, we use Google Analytics to understand page visits and clicks. You can change your choice in the footer. <Link to="/privacy" className="underline">Privacy information</Link></p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button onClick={() => choose('rejected')} className="min-h-12 border border-brandTeal px-5 font-bold focus-visible:outline-2 focus-visible:outline-white">Reject analytics</button>
          <button onClick={() => choose('accepted')} className="min-h-12 border border-brandTeal px-5 font-bold focus-visible:outline-2 focus-visible:outline-white">Accept analytics</button>
        </div>
      </div>
    </section>
  );
}
