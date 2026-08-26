import Footer from '../components/Footer.jsx';
import Nav from '../components/Nav.jsx';
import PageMeta from '../components/PageMeta.jsx';
import ItineraryDay from '../components/tours/ItineraryDay.jsx';
import JourneyOverview from '../components/tours/JourneyOverview.jsx';
import PackageDetails from '../components/tours/PackageDetails.jsx';
import RegisterInterestPanel from '../components/tours/RegisterInterestPanel.jsx';
import TourHero from '../components/tours/TourHero.jsx';
import { alpineGtTour } from '../data/tours.js';

const metaDescription =
  "Five days through the Black Forest, Switzerland's legendary Alpine passes and Burgundy, with four nights of luxury accommodation.";

const tourSchema = {
  '@context': 'https://schema.org',
  '@type': 'TouristTrip',
  name: alpineGtTour.title,
  description: alpineGtTour.description,
  url: 'https://thedrivetouringcompany.com/tours/alpine-gt-2027',
  image: 'https://thedrivetouringcompany.com/alpine-gt-2027-social.jpg',
  touristType: 'Supercar touring enthusiasts',
  provider: {
    '@type': 'Organization',
    name: 'The Drive Touring Company',
    url: 'https://thedrivetouringcompany.com/',
  },
  itinerary: {
    '@type': 'ItemList',
    numberOfItems: alpineGtTour.days.length,
    itemListElement: alpineGtTour.days.map((day) => ({
      '@type': 'ListItem',
      position: day.number,
      name: `Day ${day.number} — ${day.name}`,
      description: day.routeOverview,
    })),
  },
};

export default function TourDetailPage() {
  const tour = alpineGtTour;

  return (
    <div className="min-h-screen bg-brandDark pb-20 font-sans text-white antialiased md:pb-0">
      <PageMeta
        title="The Alpine GT 2027"
        description={metaDescription}
        path={tour.path}
        structuredData={tourSchema}
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
          className="scroll-mt-28"
        >
          {tour.days.map((day, index) => {
            const hotelIndex = day.number === 1 ? 0 : day.number === 2 ? 1 : day.number === 4 ? 2 : null;

            return (
              <ItineraryDay
                key={day.number}
                day={day}
                align={index % 2 === 0 ? 'left' : 'right'}
                hotel={hotelIndex !== null ? tour.hotels[hotelIndex] : null}
                reverseHotel={day.number === 2}
              />
            );
          })}
        </section>

        <PackageDetails
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
