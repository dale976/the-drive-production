import HotelFeature from './HotelFeature.jsx';

const chapterStyles = {
  1: 'bg-brandDark',
  2: 'bg-brandGray bg-[radial-gradient(circle_at_85%_20%,rgba(0,168,150,0.12),transparent_38%)]',
  3: 'bg-[#071d20] bg-[radial-gradient(circle_at_75%_15%,rgba(0,168,150,0.25),transparent_44%)]',
  4: 'bg-[#17130f] bg-[radial-gradient(circle_at_15%_80%,rgba(160,116,64,0.16),transparent_38%)]',
  5: 'bg-brandDark',
};

export default function ItineraryDay({ day, align = 'left', hotel = null, reverseHotel = false }) {
  const contentPlacement = align === 'right'
    ? 'lg:col-span-8 lg:col-start-5'
    : 'lg:col-span-8 lg:col-start-4';

  return (
    <article
      id={`day-${day.number}`}
      className={`relative scroll-mt-28 overflow-hidden border-b border-white/10 px-6 text-white ${
        day.number === 5 ? 'py-16 md:py-20' : 'py-20 md:py-28'
      } ${chapterStyles[day.number]}`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-8">
        <header className="lg:col-span-3 lg:border-r lg:border-white/15 lg:pr-8">
          <div className="flex items-end gap-5 lg:block">
            <p className={`font-black leading-[0.72] tracking-[-0.08em] text-brandTeal ${
              day.hero ? 'text-8xl md:text-9xl' : 'text-7xl md:text-8xl'
            }`}>
              {String(day.number).padStart(2, '0')}
            </p>
            <div className="pb-1 lg:mt-7 lg:pb-0">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.26em] text-brandTeal">
                Chapter {String(day.number).padStart(2, '0')}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-gray-400">
                {day.distance}<br />{day.drivingStyle}
              </p>
            </div>
          </div>
        </header>

        <div className={contentPlacement}>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brandTeal">
            {day.theme}
          </p>
          <h3 className={`mt-4 max-w-4xl font-black uppercase leading-[0.92] tracking-[-0.04em] ${
            day.hero ? 'text-5xl md:text-7xl' : 'text-4xl md:text-6xl'
          }`}>
            {day.name}
          </h3>
          <p className="mt-8 max-w-2xl text-xl font-bold leading-8 text-white md:text-2xl">
            {day.headline}
          </p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-300">
            {day.overview}
          </p>

          <figure className={`relative mt-12 overflow-hidden bg-brandGray ${
            day.hero
              ? 'aspect-[16/9] md:-mx-8 lg:-mx-16'
              : day.number % 2 === 0
                ? 'aspect-[16/10] md:ml-12'
                : 'aspect-[16/10] md:mr-12'
          }`}>
            <img
              src={day.image.src}
              alt={day.image.alt}
              width={day.image.width}
              height={day.image.height}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent"
            />
            <figcaption className="absolute bottom-4 left-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white md:bottom-5 md:left-5">
              From a previous Drive tour
            </figcaption>
          </figure>

          <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brandTeal">
                Route overview
              </h4>
              <p className="mt-3 max-w-xl leading-7 text-gray-300">{day.routeOverview}</p>
            </div>
            <div>
              <h4 className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brandTeal">
                The day in moments
              </h4>
              <ol className="mt-3 space-y-3">
                {day.highlights.map((highlight, index) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-6 text-gray-200">
                    <span className="font-bold tabular-nums text-brandTeal">0{index + 1}</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {day.hero && (
            <div className="mt-14 grid gap-5 border-y border-brandTeal/35 py-8 md:grid-cols-3">
              {day.passes.map((passName, index) => (
                <div key={passName} className="md:border-l md:border-brandTeal/40 md:pl-5">
                  <span className="text-[0.7rem] font-bold uppercase tracking-[0.25em] text-brandTeal">
                    Pass 0{index + 1}
                  </span>
                  <p className="mt-2 text-3xl font-black uppercase leading-none tracking-tight md:text-4xl">
                    {passName}
                  </p>
                </div>
              ))}
            </div>
          )}

          <p className="mt-10 text-[0.7rem] font-bold uppercase tracking-[0.24em] text-gray-500">
            {day.number === 5 ? 'Journey end' : 'Overnight'}
            <span className="ml-4 text-sm tracking-[0.1em] text-white">{day.overnight}</span>
          </p>
        </div>
      </div>

      {hotel && (
        <HotelFeature
          hotel={hotel}
          reverse={reverseHotel}
          dayNumber={day.number}
        />
      )}
    </article>
  );
}
