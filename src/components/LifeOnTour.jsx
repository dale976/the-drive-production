import drivingImage from '../assets/tour-life-driving.webp';
import dinnerImage from '../assets/tour-life-dinner.webp';
import groupImage from '../assets/tour-life-group.webp';

export default function LifeOnTour() {
  return (
    <section
      aria-labelledby="life-on-tour-title"
      className="overflow-hidden border-y border-white/10 bg-brandDark py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brandTeal">
            On the road together
          </p>
          <h2
            id="life-on-tour-title"
            className="mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl"
          >
            Life on tour
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-gray-300">
            The road is only part of the story. Shared miles, unhurried evenings and the
            people around you turn a great drive into something lasting.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[15rem_15rem] md:gap-5">
          <figure className="aspect-[16/10] overflow-hidden bg-brandGray md:col-span-8 md:row-span-2">
            <img
              src={drivingImage}
              alt="A purple Porsche 911 GT3 RS in motion on a previous Drive tour"
              width="1800"
              height="1203"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>

          <figure className="aspect-[4/5] overflow-hidden bg-brandGray md:col-span-4 md:aspect-auto">
            <img
              src={dinnerImage}
              alt="Two guests sharing conversation over dinner during a previous Drive tour"
              width="1200"
              height="1800"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </figure>

          <figure className="aspect-[16/9] overflow-hidden bg-brandGray md:col-span-4 md:aspect-auto">
            <img
              src={groupImage}
              alt="Drive tour guests gathered together on sunny grandstand steps"
              width="1800"
              height="1012"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </figure>
        </div>

        <p className="mt-5 text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gray-500">
          Moments from previous Drive tours
        </p>
      </div>
    </section>
  );
}
