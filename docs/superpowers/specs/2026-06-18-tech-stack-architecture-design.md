# Tech Stack & Architecture Design — The Drive Touring Company

**Date:** 2026-06-18  
**Status:** Approved  
**Scope:** Full platform architecture + MVP definition

---

## Overview

The Drive Touring Company is a React web application for booking and managing exclusive supercar touring experiences. The platform supports public marketing pages, authenticated member accounts, and a GoCardless-powered installment payment system for event bookings.

---

## Tech Stack

### Frontend
| Layer | Choice | Rationale |
|---|---|---|
| Framework | React 19 | Already in use. Concurrent features, modern patterns. |
| Build tool | Vite 8 | Already in use. Fast dev server, optimised builds. |
| Styling | Tailwind CSS v4 | Already in use. Pairs with the existing dark/teal brand. |
| Component library | Base UI (`@base-ui/react`) | Already installed. Headless, accessible, styled with Tailwind. |
| Icons | Lucide React | Already in use. |
| Router | React Router v7 | Replaces current state-based page switching. URL routing, protected route guards, browser history. |

### Backend (BaaS)
| Layer | Choice | Rationale |
|---|---|---|
| Platform | Supabase | PostgreSQL DB, Auth, Storage, and Edge Functions in one managed service. |
| Database | PostgreSQL (via Supabase) | Relational model is a natural fit for bookings and installment payment scheduling. |
| Auth | Supabase Auth — magic link | No passwords. Users receive a one-time login link via email. Consistent with the premium brand feel. |
| Serverless functions | Supabase Edge Functions (Deno) | Handles GoCardless webhooks and installment scheduling logic. |

### Payments
| Layer | Choice |
|---|---|
| Provider | GoCardless (Direct Debit) |
| Model | One-off event bookings, each split into 3 installments: deposit → 2nd payment → final payment |
| Integration point | Supabase Edge Function receives GoCardless webhooks and updates payment state |

### Hosting & Deployment
| Layer | Choice |
|---|---|
| Frontend | Vercel |
| Backend | Supabase (managed) |
| CI/CD | Vercel GitHub integration (auto-deploy on push to `main`) |

---

## Application Routes

### Public
| Route | Page |
|---|---|
| `/` | Landing page |
| `/about` | About page |
| `/events` | Tour listing |
| `/events/:id` | Tour detail + booking entry point |
| `/login` | Magic link login |
| `/bookings/callback` | GoCardless mandate redirect callback — reads `booking_id` from `state` param, completes booking confirmation |

### Protected (auth required)
| Route | Page |
|---|---|
| `/dashboard` | Member home |
| `/dashboard/bookings` | My bookings list |
| `/dashboard/bookings/:id` | Booking detail + payment schedule |
| `/dashboard/profile` | My profile |

Unauthenticated users hitting protected routes are redirected to `/login`.

---

## Database Schema

```sql
-- Extends Supabase auth.users (created automatically on first sign-in via trigger)
profiles (
  id             uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name      text,
  phone          text,
  avatar_url     text,
  created_at     timestamptz DEFAULT now()
)

-- Tour/event catalogue
events (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title               text NOT NULL,
  date                date NOT NULL,
  route               text,
  description         text,
  price_cents         integer NOT NULL,
  capacity            integer NOT NULL,
  deposit_pct         integer NOT NULL DEFAULT 25,  -- % of price_cents
  second_pct          integer NOT NULL DEFAULT 25,  -- % of price_cents; final = remainder
  second_offset_days  integer NOT NULL DEFAULT 90,  -- days before event date
  final_offset_days   integer NOT NULL DEFAULT 14,  -- days before event date
  status              text DEFAULT 'draft', -- draft | published | closed
  created_at          timestamptz DEFAULT now()
)

-- A member's registration for an event
bookings (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL REFERENCES profiles(id),
  event_id       uuid NOT NULL REFERENCES events(id),
  status         text DEFAULT 'pending', -- pending | confirmed | cancelled
  created_at     timestamptz DEFAULT now()
)

-- Deposit, 2nd payment, final payment per booking
payment_installments (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id     uuid NOT NULL REFERENCES bookings(id),
  type           text NOT NULL, -- deposit | second | final
  amount_cents   integer NOT NULL,
  due_date       date NOT NULL,
  paid_at        timestamptz,
  gc_payment_id  text, -- GoCardless payment reference
  status         text DEFAULT 'scheduled' -- scheduled | collected | failed
)

-- Direct Debit mandate per user (set up once, reused for all bookings)
gc_mandates (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL REFERENCES profiles(id),
  mandate_id     text NOT NULL, -- GoCardless mandate ID
  status         text DEFAULT 'pending_submission', -- pending_submission | active | cancelled | failed
  created_at     timestamptz DEFAULT now()
)
```

Row-level security (RLS) is enabled on all tables. Users may only read/write their own rows.

---

## GoCardless Payment Flow

1. Member clicks **Book** on an event page; a `bookings` row is created with `status: pending`
2. **If no active mandate exists:** redirect to GoCardless mandate setup (Direct Debit authorisation). The `booking_id` is stored in the redirect `state` parameter so the callback route (`/bookings/callback`) can resume the correct booking
3. GoCardless sends `mandates/active` webhook → Edge Function updates `gc_mandates` row, creates 3 `payment_installments` rows for the pending booking, and advances booking status to `confirmed`
4. Edge Function calls the GoCardless API to create the **deposit** payment immediately
5. Edge Function calls the GoCardless API to schedule the **2nd payment** at `event.date - second_offset_days` for `price_cents * second_pct / 100`
6. Edge Function calls the GoCardless API to schedule the **final payment** at `event.date - final_offset_days` for the remainder
7. **If an active mandate already exists** (returning member): steps 2–3 are skipped. The frontend calls a Supabase Edge Function (`create-booking-payments`) directly with the `booking_id`. The Edge Function runs steps 4–6 and advances booking status to `confirmed` synchronously.
8. Each `payments/confirmed` webhook updates `payment_installments.status = collected` and sets `paid_at`
9. On `payments/failed`: mark installment `failed`, send member notification email (via Supabase Auth email or SendGrid), and flag the booking for manual review — no automatic retry in MVP

**Installment amounts** are stored as percentages on the `events` table (`deposit_pct`, `second_pct`; final = remainder). Concrete values are set per event by the operator in the Supabase dashboard.

**Payment failure scope:** In Phase 2, failures are flagged for manual operator review. Automated retry logic is Phase 3.

---

## Authentication Flow

1. User enters email on `/login`
2. Supabase sends a magic link to the email address
3. User clicks link → Supabase validates token, creates session
4. React Router redirects to `/dashboard`
5. Session is persisted in `localStorage` via Supabase JS client
6. Protected routes read session from Supabase client; unauthenticated users are redirected to `/login`

---

## MVP Scope

The MVP delivers a clean, deployable foundation. No booking or payment flows are included — these are post-MVP.

### In MVP
- Landing page (already built — `/`)
- React Router v7 wired up with all route definitions; post-MVP routes render a shared `ComingSoonPage` placeholder
- `/bookings/callback` renders a `ComingSoonPage` stub in MVP — full GoCardless callback handling is Phase 2
- Supabase project created with schema applied
- Magic link login page (`/login`)
- Protected dashboard shell (`/dashboard`) — placeholder content
- `AGENTS.md` committed to repo root — documents stack decisions and architecture for AI agents and developers

### Post-MVP (Phase 2)
- Events listing and detail pages
- GoCardless mandate setup + booking flow
- Installment scheduling and collection
- Member bookings and payment schedule pages
- Profile page

### Post-MVP (Phase 3)
- Admin panel (event management, booking oversight)
- Email notifications (booking confirmation, payment reminders)
- Waitlist management

---

## Project Structure (target)

```
src/
  assets/          # Images, fonts
  components/      # Shared UI components (nav, footer, layout)
  pages/           # Route-level page components
    LandingPage.jsx
    AboutPage.jsx
    LoginPage.jsx
    ComingSoonPage.jsx   # Shared stub for all post-MVP routes
    events/
      EventsPage.jsx         # Post-MVP — wired to ComingSoonPage in MVP
      EventDetailPage.jsx    # Post-MVP — wired to ComingSoonPage in MVP
    dashboard/
      DashboardPage.jsx
      BookingsPage.jsx       # Post-MVP — wired to ComingSoonPage in MVP
      BookingDetailPage.jsx  # Post-MVP — wired to ComingSoonPage in MVP
      ProfilePage.jsx        # Post-MVP — wired to ComingSoonPage in MVP
  lib/
    supabase.js    # Supabase client initialisation
    auth.js        # Auth helpers
  hooks/           # Custom React hooks (useSession, useBookings, etc.)
  router.jsx       # React Router route definitions + auth guards
  main.jsx
  index.css
```

In MVP, post-MVP route definitions point to `ComingSoonPage`. Individual page files are created when the feature is implemented.

---

## Key Constraints & Decisions

- **No custom API server for MVP.** All server-side logic runs in Supabase Edge Functions. If installment scheduling logic grows complex, a dedicated Node API (Railway/Fly.io) can be added later without changing the frontend.
- **Base UI over Shadcn/Radix directly.** Already installed and paired with Tailwind v4. Provides accessible primitives without opinion on styling.
- **GoCardless Direct Debit only.** No card payments in scope. Direct Debit is appropriate for the Australian market and recurring installment model.
- **Admin via Supabase dashboard for MVP.** No custom admin UI. Events and capacity managed directly in Supabase Table Editor until Phase 3.
- **Session storage via `localStorage` (Supabase default).** This is a known XSS trade-off. Acceptable for MVP given the low-risk public nature of the landing page. Reviewed before payment flows go live in Phase 2.
- **Capacity enforcement.** Overbooking prevention is handled at the application layer on booking creation — query `COUNT(bookings WHERE event_id = X AND status != 'cancelled')` and reject if `>= events.capacity`. A database-level check constraint is added in Phase 2.
- **Phase 2 payment spec required.** The booking + payment flow (mandate setup, installment creation, webhook handlers) must be fully specced in a separate design document before Phase 2 implementation planning begins. The Phase 2 spec must include GoCardless webhook signature verification (HMAC-SHA256 using the webhook secret) — this is a security requirement, not an enhancement.
