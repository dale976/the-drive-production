# Code Cleanup & Design Polish Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove all default Vite/Base UI template scaffolding, extract shared Nav and Footer components, apply design polish, and produce a clean production-grade codebase for the two MVP pages.

**Architecture:** Shared Nav and Footer components extracted to `src/components/`. App.jsx uses `window.location.pathname` as a minimal interim router (replaced by React Router in next MVP task). Each page hardcodes its own `activePage` value passed to Nav.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4, Base UI, Lucide React

**Spec:** `docs/superpowers/specs/2026-06-18-code-cleanup-design-polish.md`

---

## Chunk 1: Infrastructure Cleanup

### Task 1: Delete App.css and clean index.css

**Files:**
- Delete: `src/App.css`
- Modify: `src/index.css`
- Modify: `tailwind.config.js`
- Modify: `AGENTS.md`

- [ ] **Step 1: Delete `src/App.css`**

  ```bash
  rm "src/App.css"
  ```

- [ ] **Step 2: Replace `src/index.css` with clean minimal version**

  Full file contents:

  ```css
  @import "tailwindcss";

  @theme {
    --color-brandDark: #0B0F12;
    --color-brandTeal: #00A896;
    --color-brandGray: #1A2126;
  }

  @font-face {
    font-family: 'RoadRage';
    src: url('./fonts/Road_Rage.otf') format('opentype');
    font-display: swap;
  }

  body {
    margin: 0;
    background-color: #0B0F12;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  ```

- [ ] **Step 3: Replace `tailwind.config.js` with clean version**

  Full file contents:

  ```js
  /** @type {import('tailwindcss').Config} */
  export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [],
  }
  ```

- [ ] **Step 4: Fix `brandGray` value in `AGENTS.md`**

  Find the Design System table in `AGENTS.md`. The `brandGray` row currently says `#1A1F24` — change it to `#1A2126` to match the actual value in `index.css`.

- [ ] **Step 5: Verify dev server starts cleanly**

  ```bash
  npm run dev
  ```

  Open browser. Confirm the landing page renders — no broken layout, no console errors from missing CSS. The `#root` width constraint is now gone so the page should be full-width.

- [ ] **Step 6: Commit**

  ```bash
  git add src/index.css tailwind.config.js AGENTS.md
  git rm src/App.css
  git commit -m "Remove Vite template CSS, clean index.css and tailwind config"
  ```

---

## Chunk 2: Shared Components

### Task 2: Create `src/components/Nav.jsx`

**Files:**
- Create: `src/components/Nav.jsx`

- [ ] **Step 1: Create `src/components/` directory**

  ```bash
  mkdir -p src/components
  ```

- [ ] **Step 2: Write `src/components/Nav.jsx`**

  Full file contents:

  ```jsx
  import { useState } from 'react';
  import { Menu, X } from 'lucide-react';

  export default function Nav({ activePage }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = [
      { label: 'HOME', href: '/', key: 'home' },
      { label: 'ABOUT', href: '/about', key: 'about' },
    ];

    return (
      <nav className="border-b border-gray-900/80 backdrop-blur-md bg-brandDark/90 sticky top-0 z-50 h-24 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex flex-col cursor-pointer group no-underline">
            <span className="text-[10px] tracking-[0.5em] text-gray-400 font-bold transition group-hover:text-brandTeal">THE</span>
            <span
              style={{ fontFamily: 'RoadRage, sans-serif' }}
              className="text-3xl font-black italic tracking-wider text-brandTeal -mt-1.5 transform transition group-hover:scale-105"
            >
              DRIVE
            </span>
            <span className="text-[8px] tracking-[0.18em] text-gray-400 font-bold -mt-1">TOURING COMPANY</span>
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
  ```

- [ ] **Step 3: Verify Nav renders in isolation**

  Temporarily add `<Nav activePage="home" />` to App.jsx, run `npm run dev`, confirm the nav bar renders and logo font is correct (Road Rage loads from `index.css @font-face`). Revert App.jsx after confirming.

---

### Task 3: Create `src/components/Footer.jsx`

**Files:**
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Write `src/components/Footer.jsx`**

  Full file contents:

  ```jsx
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
  ```

- [ ] **Step 2: Commit components**

  ```bash
  git add src/components/
  git commit -m "Add shared Nav and Footer components"
  ```

---

## Chunk 3: Page Updates

### Task 4: Update `src/App.jsx`

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace `src/App.jsx` with pathname-based interim router**

  Full file contents:

  ```jsx
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
  ```

- [ ] **Step 2: Verify dev server still starts**

  ```bash
  npm run dev
  ```

  Landing page should render. No debug overlay at bottom of screen.

---

### Task 5: Update `src/pages/LandingPage.jsx`

**Files:**
- Modify: `src/pages/LandingPage.jsx`

- [ ] **Step 1: Write the updated `LandingPage.jsx`**

  Full file contents:

  ```jsx
  import { Car, Map, Shield, Calendar, ChevronRight } from 'lucide-react';
  import heroImage from '../assets/hero_image.jpg';
  import Nav from '../components/Nav.jsx';
  import Footer from '../components/Footer.jsx';

  export default function LandingPage({ activePage = 'home' }) {
    const upcomingEvents = [
      {
        id: 1,
        title: 'The ALPINE GT 2027',
        date: 'SAT 15 JUN',
        route: 'Thrilling Alpine rush',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
      },
    ];

    const features = [
      {
        icon: <Car className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
        title: 'EXCLUSIVE SUPERCARS',
        desc: 'The world\'s most sought after cars.',
      },
      {
        icon: <Map className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
        title: 'EPIC ROUTES',
        desc: 'Hand-picked drives on Australia\'s best roads.',
      },
      {
        icon: <Shield className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
        title: 'UNFORGETTABLE EXPERIENCES',
        desc: 'Curated events. Lasting memories.',
      },
      {
        icon: <Calendar className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
        title: 'MEMBERS & EVENTS',
        desc: 'Join us for exclusive events & benefits.',
      },
    ];

    return (
      <div className="bg-brandDark text-white min-h-screen font-sans antialiased selection:bg-brandTeal selection:text-brandDark flex flex-col">

        <Nav activePage={activePage} />

        {/* HERO */}
        <header className="relative h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden flex-shrink-0">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at center, rgba(11,15,18,0) 0%, rgba(11,15,18,0.7) 85%),
                linear-gradient(to bottom, rgba(11,15,18,0.1), rgba(11,15,18,1)),
                url('${heroImage}')
              `,
            }}
          />
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:50px_50px]" />

          <div className="relative z-10 text-center max-w-5xl px-6 space-y-8">
            <div className="inline-flex items-center gap-2 border border-brandTeal/30 bg-brandDark/80 backdrop-blur-md px-5 py-2 text-[11px] font-bold tracking-[0.25em] text-brandTeal uppercase">
              <span className="w-2 h-2 rounded-full bg-brandTeal animate-pulse" /> Now Booking For 2027 Season
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
              DRIVE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandTeal via-cyan-400 to-emerald-400 italic font-black">
                EXTRAORDINARY
              </span>
            </h1>

            <div className="w-16 h-[2px] bg-brandTeal mx-auto my-4 shadow-[0_0_10px_#00A896]" />

            <p className="text-gray-300 tracking-[0.25em] text-xs md:text-sm max-w-xl mx-auto uppercase font-medium leading-loose drop-shadow-md">
              Epic Roads. Unforgettable Moments. <br />
              <span className="text-white font-bold">Live to Drive. Drive to Live.</span>
            </p>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <button className="w-full border-2 border-brandTeal text-brandTeal font-bold px-9 py-4 tracking-[0.2em] text-xs bg-brandDark/40 backdrop-blur-sm hover:bg-brandTeal hover:text-brandDark transition-all duration-300 uppercase shadow-[0_0_20px_rgba(0,168,150,0.15)] hover:shadow-[0_0_40px_rgba(0,168,150,0.5)]">
                Explore Tours
              </button>
            </div>
          </div>
        </header>

        {/* FEATURE CARDS */}
        <section id="about" className="bg-brandDark py-24 border-y border-gray-900 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-8 bg-brandGray/30 border border-gray-900 hover:border-brandTeal/40 hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="mb-6 p-4 bg-brandDark border border-gray-800 group-hover:border-brandTeal/50 transition-colors duration-300">
                    {feat.icon}
                  </div>
                  <h3 className="text-xs font-black tracking-[0.2em] mb-3 text-gray-200 group-hover:text-brandTeal transition-colors">{feat.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-[220px] font-medium">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section id="events" className="py-28 max-w-7xl mx-auto px-6 z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-4">
            <div>
              <span className="text-brandTeal text-xs font-extrabold tracking-[0.3em] uppercase block mb-2">Next Departures</span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">UPCOMING EXPERIENCES</h2>
            </div>
            <span className="text-xs font-bold text-gray-600 flex items-center gap-1 tracking-[0.2em] border-b border-gray-800 pb-1 cursor-not-allowed">
              VIEW ALL TOURS <ChevronRight className="w-4 h-4" />
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Existing event cards */}
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="group relative h-[420px] overflow-hidden border border-gray-900 cursor-pointer shadow-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{ backgroundImage: `linear-gradient(to top, rgba(11,15,18,1) 10%, rgba(11,15,18,0.4) 50%, rgba(11,15,18,0.1) 100%), url('${event.image}')` }}
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-black tracking-[0.2em] text-brandDark bg-brandTeal px-4 py-1.5">
                      {event.date}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] text-brandTeal tracking-widest font-bold block uppercase">{event.route}</span>
                    <h3 className="text-2xl md:text-3xl font-black tracking-wide text-white group-hover:translate-x-1 transition-transform duration-300">{event.title}</h3>
                    <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-xs font-bold tracking-widest text-gray-300">
                      SECURE PASS <ChevronRight className="w-4 h-4 text-brandTeal" />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coming soon companion card */}
            <div className="group relative h-[420px] overflow-hidden border border-gray-900 border-dashed shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-brandDark to-brandGray/40" />
              <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <div>
                  <span className="text-[11px] font-black tracking-[0.2em] text-brandDark bg-brandTeal/70 px-4 py-1.5 inline-block">
                    COMING SOON
                  </span>
                </div>
                <div className="space-y-3 text-center pb-8">
                  <div className="w-8 h-[1px] bg-brandTeal/40 mx-auto" />
                  <p className="text-xs font-bold tracking-[0.3em] text-gray-500 uppercase">More dates dropping soon</p>
                  <p className="text-[10px] text-gray-600 tracking-widest">Stay tuned for the next season</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
  ```

- [ ] **Step 2: Verify landing page in browser**

  Run `npm run dev`. Check:
  - Road Rage font loads on the logo
  - No inline style tag warnings in console
  - Hero is full viewport height
  - Feature cards have hover lift effect
  - Events grid shows one real card + one "Coming Soon" card side by side
  - Footer renders correctly

---

### Task 6: Update `src/pages/AboutPage.jsx`

**Files:**
- Modify: `src/pages/AboutPage.jsx`

- [ ] **Step 1: Write the updated `AboutPage.jsx`**

  Full file contents:

  ```jsx
  import { Shield, Compass, Users } from 'lucide-react';
  import lordBusinessImage from '../assets/Lord_Business.jpg';
  import aboutCarImage from '../assets/about_car.jpg';
  import Nav from '../components/Nav.jsx';
  import Footer from '../components/Footer.jsx';

  export default function AboutPage({ activePage = 'about' }) {
    const pillars = [
      {
        icon: <Compass className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
        title: 'CURATED EXPLORATION',
        desc: 'We don\'t do standard routes. Every tarmac deviation, mountain pass, and coastal corner is meticulously scouted to match the dynamics of elite machinery.',
      },
      {
        icon: <Shield className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
        title: 'UNCOMPROMISING SAFETY',
        desc: 'High performance requires absolute peace of mind. Our tours include dedicated mechanical support, trailing vehicle assistance, and advanced communication grids.',
      },
      {
        icon: <Users className="w-7 h-7 text-brandTeal" strokeWidth={1.5} />,
        title: 'ELITE COMMUNITY',
        desc: 'Beyond the cars, we curate a collective of like-minded individuals. Stripping away pretension, we unite on a shared obsession for mechanical purity and adventure.',
      },
    ];

    return (
      <div className="bg-brandDark text-white min-h-screen font-sans antialiased selection:bg-brandTeal selection:text-brandDark flex flex-col">

        <Nav activePage={activePage} />

        {/* MINI-HERO */}
        <header className="relative h-[45vh] flex items-center justify-center overflow-hidden flex-shrink-0 border-b border-gray-900">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage: `
                linear-gradient(to bottom, rgba(11,15,18,0.4), rgba(11,15,18,1)),
                url('${aboutCarImage}')
              `,
            }}
          />
          <div className="relative z-10 text-center px-6">
            <span className="text-brandTeal text-xs font-extrabold tracking-[0.4em] uppercase block mb-3">Behind The Brand</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
              WHO WE <span className="italic font-black text-transparent bg-clip-text bg-gradient-to-r from-brandTeal to-cyan-400">ARE</span>
            </h1>
            <div className="w-12 h-[2px] bg-brandTeal mx-auto mt-4" />
          </div>
        </header>

        {/* MANIFESTO */}
        <section id="story" className="py-24 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 space-y-4">
            <span className="text-brandTeal text-xs font-bold tracking-widest uppercase block">Our Manifesto</span>
            <h2 className="text-3xl font-black tracking-tight uppercase leading-none">Chasing The Perfect Drive.</h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-gray-400 text-sm leading-relaxed font-medium">
            <p>
              Founded by a collective of pure automotive purists, <strong className="text-white">THE DRIVE TOURING COMPANY</strong> was born out of a simple frustration: production tours felt too commercialized, and solo road-tripping left out the pristine logistics required to unleash proper supercars.
            </p>
            <p>
              We don't build standard holiday packages. We build visceral, loud, tire-warming driving checkpoints across the country's most isolated, technical blacktop paths. It is an exploration of engineering marvels matched against geography.
            </p>
          </div>
        </section>

        {/* PILLARS */}
        <section id="pillars" className="bg-brandGray/20 border-y border-gray-900 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
              <span className="text-brandTeal text-xs font-bold tracking-widest uppercase block">The Pillars</span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">HOW WE CORE OPERATE</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="p-8 border border-gray-900 bg-brandDark relative group hover:border-brandTeal/30 hover:-translate-y-0.5 transition-all duration-300">
                  <div className="mb-6 inline-block p-3 bg-brandGray/40 border border-gray-800 group-hover:border-brandTeal/50 transition-colors">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xs font-black tracking-[0.2em] mb-3 text-white">{pillar.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section id="team" className="py-24 max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="text-brandTeal text-xs font-bold tracking-widest uppercase block mb-2">The Organizers</span>
            <h2 className="text-3xl font-black tracking-tight uppercase">DRIVEN BY PROFESSIONALS</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Member 1 — real photo */}
            <div className="border border-gray-900 bg-brandGray/10 group">
              <div className="h-72 overflow-hidden relative">
                <img
                  src={lordBusinessImage}
                  alt="Lewis Harvey"
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="p-6 space-y-1 border-t border-gray-900 text-center">
                <span className="text-[10px] text-brandTeal font-bold uppercase tracking-widest">Lord Business</span>
                <h3 className="text-base font-black tracking-wide text-white uppercase">Lewis Harvey</h3>
              </div>
            </div>

            {/* Member 2 — initials placeholder */}
            <div className="border border-gray-900 bg-brandGray/10 group">
              <div className="h-72 overflow-hidden relative bg-brandGray flex items-center justify-center">
                <span
                  style={{ fontFamily: 'RoadRage, sans-serif' }}
                  className="text-6xl text-brandTeal/60 select-none"
                >
                  AD
                </span>
              </div>
              <div className="p-6 space-y-1 border-t border-gray-900 text-center">
                <span className="text-[10px] text-brandTeal font-bold uppercase tracking-widest">Head of Exploration</span>
                <h3 className="text-base font-black tracking-wide text-white uppercase">Alan Dale</h3>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }
  ```

- [ ] **Step 2: Verify About page in browser**

  Navigate to `/about` in the browser (or temporarily change the `getPage()` default in App.jsx to `'about'` to test, then revert). Check:
  - Nav shows ABOUT as the active link (underlined in teal)
  - No broken team member image — styled initials placeholder renders
  - Pillar cards have hover lift effect
  - Footer renders correctly

- [ ] **Step 3: Commit all page updates**

  ```bash
  git add src/App.jsx src/pages/LandingPage.jsx src/pages/AboutPage.jsx
  git commit -m "Refactor pages to use shared Nav/Footer, remove dead code, add design polish"
  ```

---

## Chunk 4: Final Verification

### Task 7: Smoke Tests & Production Build

**Files:** None — verification only

- [ ] **Step 1: Verify landing page (`/`)**

  Run `npm run dev`. Open `http://localhost:5173`.
  - Road Rage font loads on logo
  - No debug nav overlay visible
  - Full-width layout (no 1126px constraint)
  - Nav: HOME is underlined in teal, ABOUT and EVENTS are muted
  - EVENTS nav item and CTA are visibly disabled (muted/opaque)
  - Hero is full viewport height
  - "Explore Tours" button glows on hover
  - Feature cards lift slightly on hover
  - Events grid: one real event card + one "Coming Soon" dashed card side by side
  - Footer renders with correct year

- [ ] **Step 2: Verify About page (`/about`)**

  Navigate to `http://localhost:5173/about`.
  - Nav: ABOUT is underlined in teal, HOME is muted
  - Styled `AD` initials placeholder renders in team section (no broken image)
  - Pillar cards have hover lift
  - Footer renders correctly

- [ ] **Step 3: Verify navigation between pages**

  Click HOME in nav from About page → lands on `/` showing landing page.
  Click ABOUT in nav from landing page → lands on `/about` showing About page.

- [ ] **Step 3: Verify mobile hamburger**

  Resize browser to mobile width (< 768px). Hamburger icon should appear. Click it — dropdown opens with HOME, ABOUT, EVENTS (muted), and CTA. Click the hamburger again (now an X) — dropdown closes. Confirm `mobileMenuOpen` state correctly lives inside Nav (no state in the page components).

- [ ] **Step 4: Run production build**

  ```bash
  npm run build
  ```

  Expected: build completes with no errors. Output in `dist/`.

- [ ] **Step 5: Verify hover states manually**

  On the landing page: hover over feature cards (subtle lift), hover over "Explore Tours" (glow intensifies). On the About page: hover over pillar cards (lift). On nav: hover over CTA button (glow).

- [ ] **Step 6: Final commit**

  ```bash
  git add docs/superpowers/plans/
  git commit -m "Add cleanup and polish implementation plan"
  git push
  ```
