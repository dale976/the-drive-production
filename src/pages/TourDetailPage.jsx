import Footer from '../components/Footer.jsx';
import Nav from '../components/Nav.jsx';
import PageMeta from '../components/PageMeta.jsx';
import HotelFeature from '../components/tours/HotelFeature.jsx';
import ItineraryDay from '../components/tours/ItineraryDay.jsx';
import JourneyOverview from '../components/tours/JourneyOverview.jsx';
import PackageDetails from '../components/tours/PackageDetails.jsx';
import RegisterInterestPanel from '../components/tours/RegisterInterestPanel.jsx';
import TourHero from '../components/tours/TourHero.jsx';
import TourSectionNav from '../components/tours/TourSectionNav.jsx';
import { alpineGtTour } from '../data/tours.js';

const metaDescription =
  "Five days through the Black Forest, Switzerland's legendary Alpine passes and Burgundy, with four nights of luxury accommodation.";

export default function TourDetailPage() {
  const tour = alpineGtTour;

  return (
    <div className="min-h-screen bg-brandDark pb-20 font-sans text-white antialiased md:pb-0">
      <PageMeta
        title="The Alpine GT 2027"
        description={metaDescription}
        path={tour.path}
      />
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] bg-brandTeal px-4 py-3 font-bold text-brandDark focus:not-sr-only focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
      >
        Skip to main content
      </a>
      <Nav activePage="tours" />
      <main id="main-content">
        <TourHero tour={tour} />
        <TourSectionNav />

        <section
          aria-labelledby="experience-heading"
          className="bg-brandDark px-6 py-24 text-white"
        >
          <div className="mx-auto max-w-7xl border-l-2 border-brandTeal pl-6 md:pl-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandTeal">
              The experience
            </p>
            <h2
              id="experience-heading"
              className="mt-4 max-w-5xl text-4xl font-black uppercase leading-none tracking-tight md:text-7xl"
            >
              Five days. Three countries. One great drive.
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300 md:text-xl">
              {tour.description}
            </p>
          </div>
        </section>

        <JourneyOverview days={tour.days} />

        <section
          id="journey"
          aria-label="Five-day itinerary"
          className="scroll-mt-40"
        >
          {tour.days.map((day, index) => (
            <ItineraryDay
              key={day.number}
              day={day}
              align={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </section>

        <section
          id="stays"
          aria-labelledby="stays-heading"
          className="scroll-mt-40 bg-brandDark px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brandTeal">
              Along the way
            </p>
            <h2
              id="stays-heading"
              className="mt-4 text-4xl font-black uppercase tracking-tight md:text-6xl"
            >
              Three remarkable stays
            </h2>
            <div className="mt-12 space-y-8">
              {tour.hotels.map((hotel, index) => (
                <HotelFeature
                  key={hotel.name}
                  hotel={hotel}
                  reverse={index === 1}
                />
              ))}
            </div>
          </div>
        </section>

        <PackageDetails
          price={tour.price}
          included={tour.included}
          excluded={tour.excluded}
          caveat={tour.caveat}
        />
        <RegisterInterestPanel tour={tour} />
      </main>
      <RegisterInterestPanel tour={tour} mobile />
      <Footer />
    </div>
  );
}
