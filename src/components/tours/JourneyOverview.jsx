import { useEffect, useState } from 'react';

export default function JourneyOverview({ days }) {
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (activeEntry) {
          setActiveDay(Number(activeEntry.target.id.replace('day-', '')));
        }
      },
      { rootMargin: '-20% 0px -75%', threshold: 0 },
    );

    days.forEach((day) => {
      const chapter = document.getElementById(`day-${day.number}`);

      if (chapter) observer.observe(chapter);
    });

    return () => observer.disconnect();
  }, [days]);

  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#11171b] px-6 py-16 text-white md:py-20" aria-labelledby="journey-overview-heading">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandTeal">
              Your road book
            </p>
            <h2 id="journey-overview-heading" className="mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl">
              Five distinct chapters
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-gray-400">
            Select a chapter to move through the journey.
          </p>
        </div>

        <ol className="mt-10 flex snap-x snap-mandatory overflow-x-auto border-y border-white/10 md:grid md:grid-cols-5 md:overflow-visible">
          {days.map((day) => (
            <li key={day.number} className="min-w-[76%] snap-start border-r border-white/10 sm:min-w-[46%] md:min-w-0">
              <a
                href={`#day-${day.number}`}
                aria-current={activeDay === day.number ? 'location' : undefined}
                className={`group flex min-h-48 flex-col justify-between px-5 py-6 transition-colors hover:bg-white/[0.04] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brandTeal ${
                  activeDay === day.number ? 'bg-white/[0.06]' : ''
                }`}
              >
                <span className={`text-5xl font-black tabular-nums leading-none tracking-[-0.06em] transition-colors ${
                  activeDay === day.number ? 'text-brandTeal' : 'text-white/20 group-hover:text-brandTeal'
                }`}>
                  0{day.number}
                </span>
                <span>
                  <span className="block text-base font-bold uppercase leading-5 tracking-wide text-white">
                    {day.name}
                  </span>
                  <span className="mt-3 block text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gray-500">
                    {day.drivingStyle}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
