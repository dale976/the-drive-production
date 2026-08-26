import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';

const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx'));
const FleetPage = lazy(() => import('./pages/FleetPage.jsx'));
const ToursPage = lazy(() => import('./pages/ToursPage.jsx'));
const TourDetailPage = lazy(() => import('./pages/TourDetailPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function PageFallback() {
  return (
    <div className="min-h-screen bg-brandDark text-white flex items-center justify-center">
      <span className="text-xs font-bold tracking-[0.3em] text-brandTeal uppercase">
        Loading The Drive
      </span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage activePage="home" />} />
          <Route path="/about" element={<AboutPage activePage="about" />} />
          <Route path="/tours" element={<ToursPage activePage="tours" />} />
          <Route path="/fleet" element={<FleetPage activePage="fleet" />} />
          <Route path="/tours/alpine-gt-2027" element={<TourDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
