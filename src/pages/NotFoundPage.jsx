import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Nav from '../components/Nav.jsx';
import PageMeta from '../components/PageMeta.jsx';

export default function NotFoundPage() {
  return (
    <div className="bg-brandDark text-white min-h-screen font-sans antialiased flex flex-col">
      <PageMeta
        title="Page Not Found"
        description="The requested page could not be found. Return to The Drive Touring Company."
        path={window.location.pathname}
        robots="noindex, follow"
      />
      <Nav />
      <main className="flex-1 flex items-center justify-center px-6 py-24 text-center">
        <div className="max-w-xl space-y-6">
          <span className="text-brandTeal text-xs font-bold tracking-[0.4em] uppercase">404 — Route Not Found</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">This road ends here.</h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            The page you were looking for has moved or does not exist.
          </p>
          <Link
            to="/"
            className="inline-block bg-brandTeal text-brandDark font-black px-8 py-4 tracking-[0.2em] text-xs uppercase hover:scale-105 transition-transform"
          >
            Return Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
