import { ExternalLink } from 'lucide-react';

export default function HotelFeature({ hotel, reverse = false }) {
  return (
    <article className="grid overflow-hidden border border-white/10 bg-brandGray text-white lg:grid-cols-2">
      <div className={reverse ? 'lg:order-2' : undefined}>
        <img
          src={hotel.image}
          alt={hotel.alt}
          width="1800"
          height="1200"
          loading="lazy"
          className="h-full min-h-80 w-full object-cover"
        />
      </div>

      <div className={`flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 ${reverse ? 'lg:order-1' : ''}`}>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-brandTeal">
          {hotel.nights}
        </p>
        <h3 className="mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl">
          {hotel.name}
        </h3>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
          {hotel.region}
        </p>
        <p className="mt-7 max-w-xl text-base leading-7 text-gray-300">
          {hotel.description}
        </p>
        <a
          href={hotel.website}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-11 w-fit items-center gap-2 border-b border-brandTeal py-2 text-sm font-bold uppercase tracking-[0.14em] text-white transition-colors hover:text-brandTeal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
        >
          Visit the official {hotel.name} website
          <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" />
        </a>
      </div>
    </article>
  );
}
