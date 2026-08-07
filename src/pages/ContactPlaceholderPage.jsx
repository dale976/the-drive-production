import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Nav from '../components/Nav.jsx';
import PageMeta from '../components/PageMeta.jsx';
import { alpineGtTour } from '../data/tours.js';

export default function ContactPlaceholderPage() {
  return (
    <div className="bg-brandDark text-white min-h-screen font-sans antialiased flex flex-col">
      <PageMeta
        title="Register Interest"
        description="Register your interest in The Drive Touring Company's curated supercar tours."
        path="/contact"
      />
      <Nav activePage="tours" />
      <main className="flex-1 flex items-center justify-center px-6 py-24 text-center">
        <div className="max-w-2xl space-y-6">
          <span className="text-brandTeal text-xs font-bold tracking-[0.4em] uppercase">
            REGISTER INTEREST
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            THE NEXT STAGE IS COMING.
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Our customer enquiry form is being prepared. In the meantime, explore the full Alpine GT journey or contact us by email.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
            <Link
              to={alpineGtTour.path}
              className="inline-flex min-h-11 items-center bg-brandTeal px-8 py-4 text-xs font-black tracking-[0.2em] text-brandDark transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
            >
              Return to The Alpine GT
            </Link>
            <a
              href="mailto:info@thedrivetouringcompany.com?subject=Alpine GT 2027 Interest"
              className="inline-flex min-h-11 items-center border border-brandTeal px-8 py-4 text-xs font-black tracking-[0.2em] text-brandTeal transition-colors hover:bg-brandTeal hover:text-brandDark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
            >
              Email The Drive
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
