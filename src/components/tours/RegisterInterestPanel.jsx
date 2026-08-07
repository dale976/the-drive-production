import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterInterestPanel({ tour, mobile = false }) {
  const [showMobileBar, setShowMobileBar] = useState(false);

  useEffect(() => {
    if (!mobile) return undefined;

    const hero = document.querySelector('[data-tour-hero]');
    if (!hero) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Required fallback when the hero is not mounted.
      setShowMobileBar(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileBar(!entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [mobile]);

  if (mobile && !showMobileBar) return null;

  if (mobile) {
    return (
      <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-brandTeal/40 bg-brandDark/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white shadow-[0_-12px_35px_rgba(0,0,0,0.4)] backdrop-blur-md md:hidden" aria-label="Register interest">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-lg font-black leading-none text-brandTeal">{tour.price.display}</p>
            <p className="mt-1 truncate text-[0.6rem] font-semibold uppercase tracking-wide text-gray-400">For two guests</p>
          </div>
          <Link
            to={tour.registerPath}
            className="inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap bg-brandTeal px-4 py-2 text-xs font-bold uppercase tracking-[0.1em] text-brandDark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Register Interest
          </Link>
        </div>
      </aside>
    );
  }

  return (
    <section className="bg-brandTeal px-6 py-20 text-brandDark" aria-labelledby="register-interest-heading">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em]">{tour.date}</p>
          <h2 id="register-interest-heading" className="mt-4 max-w-4xl text-4xl font-black uppercase leading-none tracking-tight md:text-7xl">
            {tour.shortTitle}
          </h2>
          <p className="mt-6 text-3xl font-black tracking-tight">{tour.price.display}</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] opacity-75">{tour.price.basis}</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex min-h-11 w-fit items-center justify-center border border-brandDark bg-brandDark px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-brandDark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandDark"
        >
          Register Interest
        </Link>
      </div>
    </section>
  );
}
