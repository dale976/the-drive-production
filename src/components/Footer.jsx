export default function Footer() {
  return (
    <footer className="z-10 mt-auto border-t border-gray-900 bg-brandGray/20">
      <div className="space-y-6 py-12 text-center">
        <div className="flex justify-center space-x-6 text-gray-500">
          <a href="https://www.instagram.com/thedrivetouringcompany?igsh=Y3NicDY0NTNqM29u" target="_blank" rel="noopener noreferrer" className="transition hover:text-brandTeal" aria-label="Instagram">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
            </svg>
          </a>
          <a href="mailto:info@thedrivetouringcompany.com" className="transition hover:text-brandTeal" aria-label="Email">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
        </div>

        <div className="space-y-2 text-[11px] uppercase tracking-[0.3em] text-gray-500">
          <p>EXCLUSIVE SUPERCAR TOURS | EXPERIENCES</p>
          <p className="text-gray-600">© {new Date().getFullYear()} THE DRIVE TOURING COMPANY. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
