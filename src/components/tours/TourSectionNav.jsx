const sections = [
  { href: '#journey', label: 'Journey' },
  { href: '#stays', label: 'Stays' },
  { href: '#included', label: 'Included' },
];

export default function TourSectionNav() {
  return (
    <nav
      aria-label="Tour sections"
      className="sticky top-24 z-30 hidden border-b border-white/10 bg-brandDark/95 backdrop-blur-md md:block"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-12 px-6 py-4">
        {sections.map((section) => (
          <a
            key={section.href}
            href={section.href}
            className="text-xs font-bold uppercase tracking-[0.24em] text-gray-400 transition-colors hover:text-brandTeal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brandTeal"
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
