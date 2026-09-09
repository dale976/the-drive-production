import groupImage from '../assets/tour-life-community-group.webp';
import driverImage from '../assets/tour-life-community-driver.webp';
import alpsImage from '../assets/tour-life-community-alps.webp';
import allTogetherImage from '../assets/tour-life-community-all-together.webp';
import dinnerImage from '../assets/tour-life-community-dinner.webp';
import trophyImage from '../assets/tour-life-community-trophy.webp';

export default function LifeOnTour() {
  return (
    <section
      aria-labelledby="life-on-tour-title"
      className="overflow-hidden border-y border-white/10 bg-brandDark py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-brandTeal">
            On the road together
          </p>
          <h2
            id="life-on-tour-title"
            className="mt-4 text-3xl font-black uppercase tracking-tight md:text-5xl"
          >
            Life on tour
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-300">
            The road is only part of the story. Shared miles, relaxed social evenings and the
            people around you turn the drive into lasting connections that become the startline for your next adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 md:gap-5 lg:grid-rows-[18rem_18rem_15rem]">
          <figure className="aspect-[16/10] overflow-hidden bg-brandGray sm:col-span-2 md:col-span-7 md:row-span-2 md:aspect-auto">
            <img
              src={groupImage}
              alt="Five friends smiling together beside a red sports car on a forest road"
              width="1800"
              height="1200"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </figure>

          <figure className="aspect-[4/3] overflow-hidden bg-brandGray md:col-span-5 md:aspect-auto">
            <img
              src={allTogetherImage}
              alt="Drive tour friends gathered together on colourful grandstand steps"
              width="1800"
              height="1012"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </figure>

          <figure className="aspect-[4/3] overflow-hidden bg-brandGray md:col-span-5 md:aspect-auto">
            <img
              src={alpsImage}
              alt="Two friends smiling with their arms around each other in the Alps"
              width="1800"
              height="1200"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </figure>

          <figure className="aspect-[4/3] overflow-hidden bg-brandGray md:col-span-4 md:aspect-auto">
            <img
              src={driverImage}
              alt="A guest laughing as he fastens his racing harness during a tour activity"
              width="1800"
              height="1200"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </figure>

          <figure className="aspect-[4/3] overflow-hidden bg-brandGray md:col-span-4 md:aspect-auto">
            <img
              src={dinnerImage}
              alt="A guest laughing with friends around the dinner table on a Drive tour"
              width="1200"
              height="1800"
              loading="lazy"
              className="h-full w-full object-cover object-[center_34%]"
            />
          </figure>

          <figure className="aspect-[4/3] overflow-hidden bg-brandGray md:col-span-4 md:aspect-auto">
            <img
              src={trophyImage}
              alt="Two Drive tour guests relaxing together and celebrating with an award"
              width="1200"
              height="1800"
              loading="lazy"
              className="h-full w-full object-cover object-[center_42%]"
            />
          </figure>
        </div>

        <p className="mt-5 text-center text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gray-500">
          Moments from previous Drive tours
        </p>
      </div>
    </section>
  );
}
