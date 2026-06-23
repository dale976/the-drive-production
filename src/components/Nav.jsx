import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import LogoOgColor from '../assets/Logo_OG_Colour.png';

export default function Nav({ activePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: 'HOME', href: '/', key: 'home' },
    { label: 'ABOUT', href: '/about', key: 'about' },
  ];

  return (
    <nav className="border-b border-gray-900/80 backdrop-blur-md bg-brandDark/90 sticky top-0 z-50 h-24 shrink-0">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex flex-col items-center cursor-pointer group no-underline">
            <img src={LogoOgColor} alt="The Drive Logo" className="w-36 h-auto"/>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-10 text-xs font-semibold tracking-[0.2em]">
          {links.map(({ label, href, key }) => (
            <a
              key={key}
              href={href}
              className={`transition-colors ${
                activePage === key
                  ? 'text-white underline decoration-brandTeal decoration-2 underline-offset-8'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
          <a href="/events" className="text-gray-600 opacity-40 cursor-not-allowed tracking-[0.2em]">EVENTS</a>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="/events"
            className="inline-block bg-brandTeal text-brandDark font-bold px-7 py-3 tracking-[0.15em] text-xs uppercase opacity-40 cursor-not-allowed shadow-[0_0_20px_rgba(0,168,150,0.15)] hover:shadow-[0_0_40px_rgba(0,168,150,0.5)] transition-shadow duration-300"
          >
            Book An Experience
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-brandTeal transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-900 bg-brandDark px-6 py-6 space-y-4">
          {links.map(({ label, href, key }) => (
            <a
              key={key}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-sm font-semibold tracking-widest py-2 ${
                activePage === key ? 'text-white' : 'text-gray-300'
              }`}
            >
              {label}
            </a>
          ))}
          <a href="/events" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold tracking-widest py-2 text-gray-600 cursor-not-allowed opacity-40">EVENTS</a>
          <a
            href="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full bg-brandTeal text-brandDark font-bold py-3 tracking-widest text-xs mt-2 text-center opacity-40 cursor-not-allowed"
          >
            BOOK AN EXPERIENCE
          </a>
        </div>
      )}
    </nav>
  );
}
