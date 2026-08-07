import { Link } from 'react-router-dom';

export default function TourHero({ tour }) {
  const metrics = [
    { label: 'Duration', value: tour.duration },
    { label: 'Accommodation', value: tour.nights },
    { label: 'Distance', value: tour.distance },
    { label: 'Group size', value: tour.groupSize },
    { label: 'Price', value: `${tour.price.display} TOTAL FOR TWO` },
  ];

  return (
    <header
      data-tour-hero
      className="relative flex min-h-[calc(100svh-6rem)] flex-col justify-end overflow-hidden bg-brandDark bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${tour.images.hero})` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,transparent_0%,rgba(11,15,18,0.35)_42%,rgba(11,15,18,0.9)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-brandDark/30 via-transparent to-brandDark"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-6 pb-12 pt-20 md:pb-16">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-brandTeal">
          {tour.eyebrow}
        </p>
        <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.88] tracking-[-0.05em] md:text-8xl">
          {tour.shortTitle}
        </h1>
        <p className="mt-6 max-w-3xl text-sm font-semibold uppercase tracking-[0.18em] text-gray-200 md:text-base">
          {tour.subtitle}
        </p>
        <Link
          to={tour.registerPath}
          className="mt-9 inline-flex min-h-11 w-fit items-center justify-center border border-brandTeal bg-brandTeal px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] text-brandDark shadow-[0_0_30px_rgba(0,166,166,0.28)] transition-colors hover:bg-white hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
        >
          Register Interest
        </Link>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <dl className="grid grid-cols-2 border border-white/15 bg-brandDark/85 backdrop-blur-md md:grid-cols-5">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`min-h-24 px-5 py-5 md:px-6 ${
                index === metrics.length - 1 ? 'col-span-2 md:col-span-1' : ''
              } border-b border-r border-white/10 md:border-b-0`}
            >
              <dt className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-gray-500">
                {metric.label}
              </dt>
              <dd className="mt-2 text-sm font-semibold uppercase tracking-wide text-white">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
