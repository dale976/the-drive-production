export default function ItineraryDay({ day, align = 'left' }) {
  const contentPlacement = align === 'right'
    ? 'lg:col-span-10 lg:col-start-3'
    : 'lg:col-span-10 lg:col-start-1';

  return (
    <article
      id={`day-${day.number}`}
      className={`relative scroll-mt-28 overflow-hidden border-b border-white/10 px-6 py-20 text-white md:py-28 ${
        day.hero
          ? 'bg-[#071d20] bg-[radial-gradient(circle_at_top_right,rgba(0,166,166,0.24),transparent_52%)]'
          : 'bg-brandDark'
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12">
        <div className={contentPlacement}>
          <p className={`text-7xl font-black leading-none tracking-[-0.06em] md:text-9xl ${day.hero ? 'text-brandTeal' : 'text-white/10'}`}>
            {String(day.number).padStart(2, '0')}
          </p>

          <div className="mt-6 border-l-2 border-brandTeal pl-5 md:pl-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brandTeal">
              Day {day.number}
            </p>
            <h3 className="mt-3 max-w-4xl text-3xl font-black uppercase tracking-tight md:text-6xl">
              {day.name}
            </h3>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
              {day.theme}
            </p>
          </div>

          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-y border-white/10 py-5">
            <div>
              <dt className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gray-500">Distance</dt>
              <dd className="mt-1 text-sm font-semibold uppercase tracking-wide">{day.distance}</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gray-500">Driving style</dt>
              <dd className="mt-1 text-sm font-semibold uppercase tracking-wide">{day.drivingStyle}</dd>
            </div>
          </dl>

          <p className="mt-8 max-w-3xl text-xl font-bold leading-8 text-white md:text-2xl">
            {day.headline}
          </p>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
            {day.overview}
          </p>

          <div className="mt-10 max-w-3xl border-l border-brandTeal/50 pl-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-brandTeal">Route overview</h4>
            <p className="mt-3 leading-7 text-gray-300">{day.routeOverview}</p>
          </div>

          <div className="mt-10">
            <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-brandTeal">Highlights</h4>
            <ul className="mt-4 grid max-w-3xl gap-3 sm:grid-cols-2">
              {day.highlights.map((highlight) => (
                <li key={highlight} className="border border-white/10 bg-black/15 px-4 py-3 text-sm font-semibold text-gray-200">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gray-500">Overnight</p>
            <p className="mt-2 text-lg font-bold uppercase tracking-wide text-white">{day.overnight}</p>
          </div>

          {day.hero && (
            <div className="mt-14 grid gap-3 border-t border-brandTeal/40 pt-10 md:grid-cols-3">
              {day.passes.map((passName, index) => (
                <div key={passName} className="border-l border-brandTeal/50 py-3 pl-5">
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-brandTeal">
                    0{index + 1}
                  </span>
                  <p className="mt-2 text-3xl font-black uppercase leading-none tracking-tight md:text-5xl">
                    {passName}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
