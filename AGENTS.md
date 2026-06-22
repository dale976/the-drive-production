# AGENTS.md — The Drive Touring Company

This file is the source of truth for AI agents and developers working on this codebase.
Read it before writing any code.

---

## Project

**The Drive Touring Company** — a web platform for booking and managing exclusive supercar touring experiences. Members browse events, register, and pay via Direct Debit in installments.

Full architecture spec: `docs/superpowers/specs/2026-06-18-tech-stack-architecture-design.md`

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Component library | Base UI (`@base-ui/react`) — headless, styled with Tailwind |
| Icons | Lucide React |
| Router | React Router v7 |
| Backend | Supabase (PostgreSQL + Auth + Edge Functions) |
| Auth | Supabase magic link (email, no passwords) |
| Payments | GoCardless Direct Debit — 3-installment model (deposit → 2nd → final) |
| Hosting | Vercel (frontend) + Supabase (backend) |
| CI/CD | Vercel GitHub integration — auto-deploys on push to `main` |

---

## Repository Layout

```
src/
  assets/            # Images, fonts
  components/        # Shared UI components (nav, footer, layout wrappers)
  pages/             # Route-level page components
    LandingPage.jsx
    AboutPage.jsx
    LoginPage.jsx
    ComingSoonPage.jsx   # Shared stub for post-MVP routes
    events/
    dashboard/
  lib/
    supabase.js      # Supabase client (initialised once, imported everywhere)
    auth.js          # Auth helpers (getSession, requireAuth, signOut)
  hooks/             # Custom React hooks (useSession, useBookings, etc.)
  router.jsx         # All route definitions + auth guards
  main.jsx
  index.css
docs/
  superpowers/specs/ # Architecture and feature design documents
```

---

## Routing

Defined in `src/router.jsx`. Two categories:

**Public** — accessible without login:
- `/` Landing page
- `/about` About page
- `/events` Tour listing (post-MVP → ComingSoonPage)
- `/events/:id` Tour detail (post-MVP → ComingSoonPage)
- `/login` Magic link login
- `/bookings/callback` GoCardless mandate redirect handler (post-MVP → ComingSoonPage)

**Protected** — redirect to `/login` if unauthenticated:
- `/dashboard` Member home
- `/dashboard/bookings` My bookings (post-MVP → ComingSoonPage)
- `/dashboard/bookings/:id` Payment schedule (post-MVP → ComingSoonPage)
- `/dashboard/profile` Profile (post-MVP → ComingSoonPage)

Auth guard pattern: read session from Supabase client in the route loader or a wrapper component; redirect to `/login` if null.

---

## Database (Supabase PostgreSQL)

Five tables. RLS enabled on all — users read/write their own rows only.

```
profiles             id · full_name · phone · avatar_url
events               id · title · date · route · description · price_cents · capacity
                     deposit_pct · second_pct · second_offset_days · final_offset_days · status
bookings             id · user_id → profiles · event_id → events · status
payment_installments id · booking_id · type (deposit|second|final) · amount_cents · due_date · paid_at · gc_payment_id · status
gc_mandates          id · user_id → profiles · mandate_id · status
```

`profiles` is auto-created on first sign-in via a Supabase database trigger on `auth.users`.

---

## Authentication

- Magic link only (no passwords)
- Flow: enter email → Supabase sends link → user clicks → session created → redirect to `/dashboard`
- Session stored in `localStorage` via the Supabase JS client (accepted trade-off for MVP; reviewed before Phase 2 payment flows go live)
- Use `src/lib/auth.js` helpers — do not call Supabase auth methods directly in components

---

## Payments (GoCardless)

Direct Debit. Each booking has 3 installments calculated from the event's `deposit_pct`, `second_pct`, `second_offset_days`, and `final_offset_days` fields.

**New member (no mandate):**
1. Frontend creates `bookings` row (status: `pending`), then redirects to GoCardless with `booking_id` in the `state` param
2. GoCardless `mandates/active` webhook → Edge Function creates installments and schedules all 3 payments via GoCardless API

**Returning member (mandate exists):**
1. Frontend creates `bookings` row, then calls `create-booking-payments` Edge Function directly
2. Edge Function schedules all 3 payments and confirms the booking

**Webhook handler** — a Supabase Edge Function:
- Receives GoCardless webhooks (must verify HMAC-SHA256 signature in Phase 2)
- `payments/confirmed` → set `payment_installments.status = collected`
- `payments/failed` → set `status = failed`, notify member, flag for manual review

---

## Design System

Dark theme. Brand colours:

| Token | Value |
|---|---|
| `brandDark` | `#0B0F12` |
| `brandTeal` | `#00A896` |
| `brandGray` | `#1A2126` |

Custom font: **Road Rage** (`src/fonts/Road_Rage.otf`) — used for the logo only.  
Body font: system sans-serif stack via Tailwind.

Always use Base UI primitives for interactive components (dialogs, selects, dropdowns). Style with Tailwind utility classes. Do not introduce a second component library.

---

## Environment Variables

Required in `.env.local` (never commit):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Required in Supabase Edge Function secrets (set via Supabase dashboard):

```
GOCARDLESS_API_KEY=
GOCARDLESS_WEBHOOK_SECRET=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Current Phase

**MVP** — foundation only. No booking or payment flows yet.

| Status | Feature |
|---|---|
| Done | Landing page |
| Done | About page |
| Done | Git repo + .gitignore |
| Pending | React Router v7 |
| Pending | Supabase project + schema |
| Pending | Magic link login page |
| Pending | Protected dashboard shell |

---

## Phase Roadmap

| Phase | Scope |
|---|---|
| **MVP** | Landing page · Router · Supabase setup · Login · Dashboard shell |
| **Phase 2** | Events listing/detail · GoCardless booking flow · Installment payments · Member dashboard |
| **Phase 3** | Admin panel · Email notifications · Waitlist · Automated payment retry |

Before starting Phase 2, a dedicated spec document must be written covering the full booking + payment flow, including GoCardless webhook signature verification.

---

## Key Rules

- **Do not introduce new dependencies without updating this file.** If a new package is added, document it in the Tech Stack table.
- **Do not call Supabase methods directly in page components.** Use `src/lib/` helpers and custom hooks.
- **Do not add custom CSS.** Use Tailwind utilities. The existing `index.css` handles global resets and font loading only.
- **Post-MVP routes render `ComingSoonPage`.** Do not build features before their phase is in scope.
- **Admin work is done in the Supabase dashboard** until Phase 3. Do not build admin UI prematurely.
