import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoOgColor from '../assets/Logo_OG_Colour.png';

const links = [
  { label: 'HOME', href: '/', key: 'home' },
  { label: 'TOURS', href: '/tours', key: 'tours' },
  { label: 'FLEET', href: '/fleet', key: 'fleet' },
];

export default function Nav({ activePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav aria-label="Primary navigation" className="border-b border-gray-900/80 backdrop-blur-md bg-brandDark/90 sticky top-0 z-50 h-24 shrink-0">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex flex-col items-center cursor-pointer group no-underline" aria-label="The Drive Touring Company home">
          <img src={LogoOgColor} alt="" className="w-36 h-auto" />
        </Link>

        <div className="hidden md:flex space-x-10 text-xs font-semibold tracking-[0.2em]">
          {links.map(({ label, href, key }) => (
            <Link
              key={key}
              to={href}
              aria-current={activePage === key ? 'page' : undefined}
              className={`transition-colors ${
                activePage === key
                  ? 'text-white underline decoration-brandTeal decoration-2 underline-offset-8'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="md:hidden text-gray-400 hover:text-brandTeal transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden border-t border-gray-900 bg-brandDark px-6 py-6 space-y-4">
          {links.map(({ label, href, key }) => (
            <Link
              key={key}
              to={href}
              onClick={closeMobileMenu}
              aria-current={activePage === key ? 'page' : undefined}
              className={`block text-sm font-semibold tracking-widest py-2 focus-visible:outline-2 focus-visible:outline-brandTeal ${
                activePage === key ? 'text-white' : 'text-gray-300'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
