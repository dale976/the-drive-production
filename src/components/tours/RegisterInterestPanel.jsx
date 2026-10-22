import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function RegisterInterestPanel({ tour, mobile = false }) {
  const [showMobileBar, setShowMobileBar] = useState(false);
  const { pathname } = useLocation();
  const isContactPage = pathname === '/contact';

  useEffect(() => {
    if (!mobile || isContactPage) return undefined;

    const hero = document.querySelector('[data-tour-hero]');
    const closingPanel = document.querySelector('section[aria-labelledby="register-interest-heading"]');
    if (!hero) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Required fallback when the hero is not mounted.
      setShowMobileBar(true);
      return undefined;
    }

    let heroVisible = true;
    let closingVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) heroVisible = entry.isIntersecting;
          if (entry.target === closingPanel) closingVisible = entry.isIntersecting;
        }
        setShowMobileBar(!heroVisible && !closingVisible);
      },
      { threshold: 0.05 },
    );
    observer.observe(hero);
    if (closingPanel) observer.observe(closingPanel);
    return () => observer.disconnect();
  }, [isContactPage, mobile]);

  if (mobile && (isContactPage || !showMobileBar)) return null;

  if (mobile) {
    return (
      <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-brandTeal/40 bg-brandDark/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white shadow-[0_-12px_35px_rgba(0,0,0,0.4)] backdrop-blur-md md:hidden" aria-label="Register interest">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-black uppercase leading-none text-brandTeal">{tour.shortTitle}</p>
            <p className="mt-1 truncate text-[0.7rem] font-semibold uppercase tracking-wide text-gray-400">{tour.date}</p>
          </div>
          <Link
            to={tour.registerPath}
            className="inline-flex min-h-11 shrink-0 items-center justify-center max-w-[58%] text-center bg-brandTeal px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-brandDark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {tour.enquiryLabel}
          </Link>
        </div>
      </aside>
    );
  }

  const formatPrice = (amount) => new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: tour.pricing.currency,
    maximumFractionDigits: 0,
  }).format(amount);

  return (
    <section className="bg-brandTeal px-6 py-20 text-brandDark" aria-labelledby="register-interest-heading">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em]">{tour.date}</p>
          <h2 id="register-interest-heading" className="mt-4 max-w-4xl text-4xl font-black uppercase leading-none tracking-tight md:text-7xl">
            {tour.shortTitle}
          </h2>
          <p className="mt-4 text-sm leading-6">
            <strong className="text-lg font-black">{formatPrice(tour.pricing.total)}</strong> · One car, two people sharing
          </p>
          <p className="mt-1 text-sm leading-6">
            {formatPrice(tour.pricing.deposit)} deposit · {formatPrice(tour.pricing.balance)} balance due {tour.pricing.balanceDueDays} days before departure
          </p>
        </div>
        <div className="min-w-0">
          <Link
            to={tour.registerPath}
            className="inline-flex min-h-11 w-fit max-w-full items-center justify-center border border-brandDark bg-brandDark px-7 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-brandDark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandDark"
          >
            {tour.enquiryLabel}
          </Link>
          <p className="mt-2 text-xs leading-5">Every enquiry is reviewed personally.</p>
        </div>
      </div>
    </section>
  );
}
