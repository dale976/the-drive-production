export default function Footer() {
  return (
    <footer className="bg-brandGray/20 border-t border-gray-900 py-16 text-center space-y-6 mt-auto z-10">
      <div className="flex justify-center space-x-6 text-gray-500">
        <a href="#" className="hover:text-brandTeal transition" aria-label="Instagram">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
        <a href="#" className="hover:text-brandTeal transition" aria-label="Facebook">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </a>
      </div>

      <div className="text-[11px] text-gray-500 tracking-[0.3em] uppercase space-y-2">
        <p>EXCLUSIVE SUPERCAR TOURS | EVENTS | EXPERIENCES</p>
        <p className="text-gray-600">© {new Date().getFullYear()} THE DRIVE TOURING COMPANY. ALL RIGHTS RESERVED.</p>
      </div>

      <div className="pt-4">
        <a
          href="https://thedrivetouringcompany.com"
          target="_blank"
          rel="noreferrer"
          className="text-brandTeal text-xs font-black tracking-[0.4em] hover:text-white transition duration-300 uppercase block"
        >
          THEDRIVETOURINGCOMPANY.COM
        </a>
      </div>
    </footer>
  );
}
