import LandingPage from './pages/LandingPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import FleetPage from './pages/FleetPage.jsx';
import ToursPage from './pages/ToursPage.jsx';

function getPage() {
  const path = window.location.pathname;
  if (path === '/about') return 'about';
  if (path === '/fleet') return 'fleet';
  if (path === '/tours') return 'tours';
  return 'home';
}

export default function App() {
  const page = getPage();
  if (page === 'about') return <AboutPage activePage="about" />;
  if (page === 'fleet') return <FleetPage activePage="fleet" />;
  if (page === 'tours') return <ToursPage activePage="tours" />;
  return <LandingPage activePage="home" />;
}
