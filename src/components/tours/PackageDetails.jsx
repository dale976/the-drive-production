import { Check, Minus } from 'lucide-react';

export default function PackageDetails({ included, excluded, caveat }) {
  return (
    <section id="included" className="scroll-mt-40 bg-brandDark px-6 py-24 text-white" aria-labelledby="package-details-heading">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandTeal">The package</p>
        <div className="mt-4 border-b border-white/10 pb-10">
          <h2 id="package-details-heading" className="text-4xl font-black uppercase tracking-tight md:text-6xl">
            Package details
          </h2>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white">Included</h3>
            <ul className="mt-6 space-y-4">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-gray-300">
                  <Check aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-brandTeal" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-white">Not included</h3>
            <ul className="mt-6 space-y-4">
              {excluded.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-gray-400">
                  <Minus aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-gray-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-14 border border-white/10 bg-brandGray/60 px-5 py-4 text-sm leading-6 text-gray-400">
          {caveat}
        </p>
      </div>
    </section>
  );
}
