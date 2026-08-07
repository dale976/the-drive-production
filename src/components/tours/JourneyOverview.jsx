export default function JourneyOverview({ days }) {
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
            <li
              key={day.number}
              className={`grid gap-3 border-b px-4 py-6 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-6 ${
                day.hero
                  ? 'border-brandTeal bg-brandTeal/10 text-brandTeal'
                  : 'border-white/10 text-white'
              }`}
            >
              <span className="text-3xl font-black tabular-nums tracking-tight">
                {String(day.number).padStart(2, '0')}
              </span>
              <span className="text-lg font-bold uppercase tracking-wide">
                {day.name}
              </span>
              <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${day.hero ? 'text-brandTeal' : 'text-gray-400'}`}>
                {day.drivingStyle}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
