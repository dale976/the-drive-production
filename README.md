# The Drive Touring Company

Production marketing site for The Drive Touring Company, an exclusive supercar touring company operating curated driving experiences across the UK and Europe.

## Local development

Requires Node.js 22 or later.

```bash
npm ci
npm run dev
```

The development server prints its local URL. Routes are handled client-side by React Router.

## Quality checks

```bash
npm run lint
npm run build
```

Both checks run automatically for pull requests and pushes to `main`.

## Deployment

The static frontend is built by Vite and deployed to Cloudflare Workers using Wrangler:

```bash
npm run deploy
```

Cloudflare is configured to serve `index.html` for unknown asset paths so direct requests to client-side routes work correctly. Security headers are defined in `public/_headers`.

## Current routes

- `/` — company landing page
- `/about` — company story and team
- `/tours` — upcoming tour experiences
- `/fleet` — lead and support vehicles
- `/tours/alpine-gt-2027` — Alpine GT itinerary, package and pricing
- `/contact?tour=alpine-gt-2027` — personally reviewed Alpine GT enquiry
- `/contact` — general enquiries; unknown tour queries also use this form
- `/privacy` — enquiry and analytics privacy information

## Enquiries and bookings

Event-specific enquiry links and pricing live in `src/data/tours.js`. The shared contact page resolves a known event from the `tour` query parameter; general enquiries do not require vehicle or driving-experience details. Forms are delivered by the existing Web3Forms integration. Do not send live enquiries during automated verification.

The website has no payment integration, Supabase database or member login. The team reviews enquiries personally and manages approved bookings, deposits and balance invoices manually in Stripe. An enquiry does not reserve a space; a successful deposit does, after acceptance of the final booking terms.

See [manual Stripe bookings](docs/manual-stripe-bookings.md) for the operational setup. The older June member-platform architecture is superseded for this scope by [the tour enquiry specification](docs/superpowers/specs/2026-10-22-tour-enquiries-design.md).
