import LandingPage from './pages/LandingPage.jsx';
import AboutPage from './pages/AboutPage.jsx';

function getPage() {
  const path = window.location.pathname;
  if (path === '/about') return 'about';
  return 'home';
}

export default function App() {
  const page = getPage();
  return page === 'about'
    ? <AboutPage activePage="about" />
    : <LandingPage activePage="home" />;
}
