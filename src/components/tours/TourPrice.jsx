export default function TourPrice({ tour, compact = false }) {
  const { pricing } = tour;
  const formatPrice = (amount) => new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(amount);

  if (compact) {
    return (
      <div className="border-t border-white/15 pt-5 text-white">
        <p className="text-sm leading-7 text-gray-300">
          <strong className="mr-2 text-3xl font-black tracking-tight text-white">{formatPrice(pricing.total)}</strong>
          Based on one car · two people sharing accommodation
        </p>
        <p className="mt-3 text-sm leading-6 text-gray-300">
          {formatPrice(pricing.deposit)} deposit · final balance due no later than {pricing.balanceDueDays} days before departure
        </p>
      </div>
    );
  }

  return (
    <div className="border border-brandTeal/30 bg-brandGray/20 p-6 text-white md:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brandTeal">Your tour package</p>
      <p className="mt-4 text-5xl font-black tracking-tight">{formatPrice(pricing.total)}</p>
      <p className="mt-3 text-sm leading-6 text-gray-300">Based One car · two people sharing accommodation</p>
      <dl className="mt-6 space-y-4 border-t border-white/10 pt-6 text-sm leading-6">
        <div>
          <dt className="font-bold text-white">{formatPrice(pricing.deposit)} deposit</dt>
          <dd className="text-gray-400">Payable after personal approval and acceptance of the terms and conditions.</dd>
        </div>
        <div>
          <dt className="font-bold text-white">{formatPrice(pricing.balance)} balance</dt>
          <dd className="text-gray-400">Due no later than {pricing.balanceDueDays} days before departure. We’ll send your invoice directly.</dd>
        </div>
      </dl>
      <p className="mt-6 text-sm leading-6 text-gray-300">Your space is reserved once your deposit payment is successful.</p>
    </div>
  );
}
