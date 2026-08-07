import { ExternalLink } from 'lucide-react';

export default function HotelFeature({ hotel, reverse = false, dayNumber }) {
  return (
    <section aria-label={`${hotel.name} accommodation`} className="mx-auto mt-16 max-w-7xl text-white md:mt-24">
      <div className="grid overflow-hidden border border-white/15 bg-brandGray shadow-[0_28px_80px_rgba(0,0,0,0.32)] lg:grid-cols-12">
        <div className={`relative min-h-72 lg:col-span-7 lg:min-h-[34rem] ${reverse ? 'lg:order-2' : ''}`}>
          <img
            src={hotel.image}
            alt={hotel.alt}
            width="1800"
            height="1200"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none lg:hover:scale-[1.02]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent lg:hidden" />
          <p className="absolute bottom-5 left-5 text-[0.7rem] font-bold uppercase tracking-[0.24em] text-white lg:hidden">
            Arrival · Day {dayNumber}
          </p>
        </div>

        <div className={`relative flex flex-col justify-center px-7 py-12 md:px-12 lg:col-span-5 lg:py-16 ${reverse ? 'lg:order-1' : ''}`}>
          <span aria-hidden="true" className="absolute right-6 top-4 text-7xl font-black leading-none tracking-[-0.08em] text-white/[0.035] md:text-9xl">
            {String(dayNumber).padStart(2, '0')}
          </span>
          <p className="relative text-xs font-bold uppercase tracking-[0.28em] text-brandTeal">
            The arrival · {hotel.nights}
          </p>
          <h3 className="relative mt-4 text-3xl font-black uppercase leading-none tracking-tight md:text-5xl">
            {hotel.name}
          </h3>
          <p className="relative mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            {hotel.region}
          </p>
          <p className="relative mt-7 max-w-xl text-base leading-7 text-gray-300">
            {hotel.description}
          </p>
          <a
            href={hotel.website}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mt-8 inline-flex min-h-11 w-fit items-center gap-2 border-b border-brandTeal py-2 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:text-brandTeal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
          >
            Explore the hotel
            <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
            <span className="sr-only">: {hotel.name} official website</span>
          </a>
        </div>
      </div>
    </section>
  );
}
