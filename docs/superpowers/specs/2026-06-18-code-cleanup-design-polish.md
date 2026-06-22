# Code Cleanup & Design Polish — Landing Page + About Page

**Date:** 2026-06-18  
**Status:** Approved  
**Scope:** Production-grade code structure, dead code removal, shared component extraction, design polish — both LandingPage and AboutPage

---

## Overview

The current codebase has the default Vite/Base UI template scaffolding still present alongside the actual app code. This causes a broken `#root` width constraint, duplicate nav/footer code across pages, an inline font-loading hack, and 184 lines of completely unused CSS. This spec covers cleaning all of that up and polishing both pages to production quality without changing the established brand or layout structure.

---

## What Is Being Removed

| File / Code | Reason |
|---|---|
| `src/App.css` | 100% default Vite template CSS. Nothing in the app uses it, and it has no import in any file. Delete the file. |
| `index.css` — all template content below `@tailwind utilities` | Includes: `:root` variable block, `@media (prefers-color-scheme: dark)` block, `#root { width: 1126px }` ID rule, and all element selectors (`h1`, `h2`, `p`, `code`, `.counter`). None used by the app. The final-state `index.css` above is the complete replacement. |
| `@tailwind utilities;` directive in `index.css` | Redundant in Tailwind v4 — `@import "tailwindcss"` already includes utilities. Remove the line. |
| Inline `<style>` font tag in `LandingPage.jsx` | Road Rage font loaded inside component JSX on every render. Moved to `index.css @font-face`. |
| `import roadRageFont from '../fonts/Road_Rage.otf'` in `LandingPage.jsx` | Only used by the inline `<style>` tag being removed. Delete the import alongside the tag. |
| Debug floating nav overlay in `App.jsx` | The "View Landing / View About" switcher buttons. Remove entirely. |
| All commented-out JSX | Commented-out nav links (GARAGE, SHOP), second event card. Remove — rewritten from scratch if ever needed. |
| `theme.extend.colors` in `tailwind.config.js` | Duplicates `index.css @theme`. Tailwind v4 pattern is `@theme` in CSS. Remove from config, keep in CSS only. |

---

## New File Structure

```
src/
  components/
    Nav.jsx           # NEW — shared navigation component
    Footer.jsx        # NEW — shared footer component
  pages/
    LandingPage.jsx   # UPDATED — uses Nav + Footer, accepts activePage prop, no inline style tag
    AboutPage.jsx     # UPDATED — uses Nav + Footer, accepts activePage prop, placeholder fixed
  App.jsx             # UPDATED — debug overlay removed, pathname-based interim routing
  index.css           # UPDATED — clean minimal base: @import, @theme, @font-face, body reset only
  tailwind.config.js  # UPDATED — theme.extend.colors removed
  main.jsx            # UNCHANGED
```

---

## App.jsx (after)

The debug floating overlay and `currentPage` state are both removed. App.jsx uses `window.location.pathname` as a minimal interim router — this makes standard `<a href>` nav links work correctly and is replaced cleanly by React Router in the next MVP task without any refactor.

```jsx
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

Vite dev server serves `index.html` for all routes, so this works in development without additional config.

---

## index.css (after)

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

Note: in Tailwind v4, `@import "tailwindcss"` already includes utilities — the legacy `@tailwind utilities` directive is removed.

---

## tailwind.config.js (after)

```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
}
```

`theme` key removed entirely — brand colours live in `index.css @theme`.

---

## Nav Component (`src/components/Nav.jsx`)

**Props:**
```js
Nav({ activePage: 'home' | 'about' })
```

**Links (consistent across all pages):**
- `HOME` — `href="/"` — active when `activePage === 'home'`
- `ABOUT` — `href="/about"` — active when `activePage === 'about'`
- `EVENTS` — `href="/events"` — muted/disabled style (`opacity-40 cursor-not-allowed`) since post-MVP

The AboutPage's current in-page anchor links (OUR STORY, PILLARS, THE TEAM) are intentionally dropped. They were a workaround for the absence of a router; once React Router is wired, section navigation will use proper URLs.

**Active link treatment:** Matching link gets `text-white underline decoration-brandTeal decoration-2 underline-offset-8`.

**CTA button:** Label `Book An Experience` on all pages. `href="/events"` with same muted/disabled style as EVENTS link.

**Structure:** Sticky top, backdrop blur, `brandDark/90` background, Road Rage logo lockup, desktop links, mobile hamburger with dropdown (HOME, ABOUT, EVENTS, CTA). Mobile CTA label matches desktop.

`mobileMenuOpen` state lives inside `Nav.jsx` — it is removed from `LandingPage.jsx` and `AboutPage.jsx` as part of the extraction.

---

## Footer Component (`src/components/Footer.jsx`)

Static, no props. Extracted from both pages.

**Contents:** Instagram + Facebook SVG icons (both have `aria-label`), tagline, copyright `{new Date().getFullYear()}`, domain link. Minor spacing cleanup only.

---

## LandingPage Updates

- Remove inline `<style>` font tag and the `import roadRageFont` that feeds it
- Remove `mobileMenuOpen` state and its associated toggle handler — this moves into `Nav.jsx`
- Replace `<nav>` and `<footer>` JSX with `<Nav activePage={activePage} />` and `<Footer />`
- Remove all commented-out JSX
- **Events grid:** The single event card leaves a half-empty 2-column grid. The `upcomingEvents.map(...)` call stays unchanged. A static "Coming Soon" card is added as a JSX sibling directly after the map, inside the same `grid` div. Same `h-[420px]` height, same border/shadow treatment, `brandGray` background with a subtle `bg-gradient-to-t from-brandDark to-brandGray/40` overlay (no external image), teal `COMING SOON` badge top-left, copy: "More dates dropping soon" — centred, muted.

---

## AboutPage Updates

- Remove `mobileMenuOpen` state and its associated toggle handler — this moves into `Nav.jsx`
- Replace duplicated `<nav>` and `<footer>` JSX with `<Nav activePage={activePage} />` and `<Footer />`
- Remove all commented-out JSX
- **CTA label:** "Join The Collective" is replaced by "Book An Experience" — now driven by the shared Nav component
- **Team placeholder:** Replace Dora the Explorer `src` URL with a styled `brandGray` div, centred initials `AD` in `brandTeal` text, matching the `h-72` card image area. No external image dependency.

---

## Design Polish

| Element | Change |
|---|---|
| Feature cards (landing) | Add `group-hover:-translate-y-0.5 transition-transform duration-300` lift on card |
| Hero CTA button | `shadow-[0_0_20px_rgba(0,168,150,0.15)]` at rest → `shadow-[0_0_40px_rgba(0,168,150,0.5)]` on hover |
| Nav CTA button | Same glow treatment as hero button |

---

## What Is Not Changing

- Brand colours, Road Rage font, dark theme
- All section layouts, ordering, and copy
- `heroImage`, `aboutCarImage`, `lordBusinessImage` asset imports

---

## Housekeeping

`AGENTS.md` documents `brandGray` as `#1A1F24` but the actual value in `index.css` and `tailwind.config.js` is `#1A2126`. Update AGENTS.md to match the code.

---

## Smoke Tests

After implementation, verify:
- Road Rage font loads correctly on both pages (logo renders in the branded style)
- No `#root` width constraint visible — layout is full-width at any viewport
- Nav active state correct: HOME underlined on `/`, ABOUT underlined on `/about`
- EVENTS link renders in muted/disabled style on both pages
- Mobile hamburger opens and closes correctly (state now lives in Nav)
- "Coming Soon" event card renders alongside the existing event card in the 2-column grid
- After implementation, manually verify all hover states: card lift on feature cards, glow intensifies on hero + nav CTA buttons
