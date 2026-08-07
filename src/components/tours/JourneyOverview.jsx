import { useEffect, useState } from 'react';

export default function JourneyOverview({ days }) {
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries.find((entry) => entry.isIntersecting);

        if (activeEntry) {
          setActiveDay(Number(activeEntry.target.id.replace('day-', '')));
        }
      },
      { rootMargin: '-25% 0px -55%', threshold: 0 },
    );

    days.forEach((day) => {
      const chapter = document.getElementById(`day-${day.number}`);

      if (chapter) observer.observe(chapter);
    });

    return () => observer.disconnect();
  }, [days]);

  return (
    <section className="bg-brandGray px-6 py-20 text-white" aria-labelledby="journey-overview-heading">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandTeal">
          Tour at a glance
        </p>
        <h2 id="journey-overview-heading" className="mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl">
          Five days on the road
        </h2>

        <ol className="mt-10 border-t border-white/10">
          {days.map((day) => (
            <li key={day.number}>
              <a
                href={`#day-${day.number}`}
                aria-current={activeDay === day.number ? 'location' : undefined}
                className={`grid min-h-16 gap-3 border-b border-white/10 px-4 py-6 transition-colors hover:border-brandTeal/60 hover:bg-white/[0.03] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brandTeal sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-6 ${
                  activeDay === day.number ? 'bg-white/[0.06] text-white' : 'text-white'
                }`}
              >
                <span className="text-3xl font-black tabular-nums tracking-tight">
                  {String(day.number).padStart(2, '0')}
                </span>
                <span className="text-lg font-bold uppercase tracking-wide">
                  {day.name}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  {day.drivingStyle}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
