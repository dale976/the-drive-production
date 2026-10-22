# Tour Enquiries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Publish Alpine GT pricing and collect personally reviewed event enquiries alongside general enquiries.

**Architecture:** Keep the existing React contact route and Web3Forms delivery. Resolve event context from shared tour data using the `tour` query parameter. Stripe products, payment links, terms acceptance and invoices remain manual Dashboard operations.

**Tech Stack:** React 19, React Router 7, Tailwind CSS 4, Vite, Node test runner.

**Spec:** `docs/superpowers/specs/2026-10-22-tour-enquiries-design.md`

## Global Constraints

- Alpine GT costs £3,295 for one car and two people sharing accommodation.
- The deposit is £500; the remaining £2,795 is due 30 days before departure.
- An enquiry carries no obligation and does not reserve a space.
- Guests must accept the final terms before paying. A successful deposit payment reserves their space.
- No Supabase, member accounts, website payment integration or automated booking system is required.
- Do not invent a departure date or liability wording. Preserve existing styling and branding output files.

## Review Focus

- Missing or unknown event query: render general enquiry without echoing arbitrary input.
- Navigation between contact variants: event-specific fields and feedback must not leak into general enquiries.
- Failed delivery: preserve entered details, show an error and permit retry.
- Narrow mobile screens: long CTA labels remain readable; no sticky registration bar obscures the form.
- Email and analytics context: use only the resolved event; never send personal form contents to analytics.

## File responsibilities

- `src/data/tours.js`: event identity, enquiry destination, CTA label and numeric GBP payment schedule.
- `src/components/tours/TourPrice.jsx` (new): reusable presentation of a tour's price, occupancy, deposit and balance timing.
- `src/pages/ContactPage.jsx`: resolve known event, render appropriate form and submit email.
- `src/pages/TourDetailPage.jsx`: display shared pricing component.
- `src/pages/LandingPage.jsx`, `src/pages/ToursPage.jsx`, `src/components/tours/TourHero.jsx`, `src/components/tours/RegisterInterestPanel.jsx`: contextual tour CTAs.
- `src/components/Footer.jsx`: general enquiry entry point.
- `src/pages/PrivacyPage.jsx`: describe new enquiry fields.
- `README.md`, `docs/manual-stripe-bookings.md` (new): current architecture and manual operational handoff. Do not edit generated `AGENTS.md` by hand.
- Existing tests below plus `tests/enquiry-context.test.js` (new): verify routing and approved behaviour.

### Task 1: Shared event context and public pricing

**Files:** `src/data/tours.js`, new `src/components/tours/TourPrice.jsx`, `src/pages/TourDetailPage.jsx`, `tests/tours.test.js`, `tests/public-pricing.contract.test.js`.

**Interfaces:** Add `enquiryLabel: string` and `pricing: { total: number, deposit: number, balance: number, balanceDueDays: number, currency: string }` to each participating tour. Set Alpine GT `registerPath` to `/contact?tour=alpine-gt-2027`. `TourPrice({ tour })` renders the event payment schedule. Existing `getTourBySlug(slug)` remains the resolver.

- [x] Replace obsolete no-pricing assertions with failing assertions: `total === 3295`, `deposit === 500`, `balance === 2795`, `balanceDueDays === 30`, `currency === 'GBP'`, and `total === deposit + balance`. Assert the exact contextual destination.
- [x] Run `node --test tests/tours.test.js tests/public-pricing.contract.test.js`; confirm failures describe the missing pricing behaviour.
- [x] Add the specified data and render `TourPrice` on the detail page, with “One car · two people sharing accommodation” and balance due relative to departure. Keep tour identity and dates unchanged.
- [x] Run the two test files; require all tests to pass. Inspect narrow-screen pricing layout during final visual review.
- [x] Commit the scoped changes after verification.

### Task 2: Context-aware personal and general enquiry forms

**Files:** `src/pages/ContactPage.jsx`, `src/pages/PrivacyPage.jsx`, new `tests/enquiry-context.test.js`, `tests/contact-form.contract.test.js`, new `src/data/enquiries.js`.

**Interfaces:** `getEnquiryTour(search: string) -> Tour | null` in `src/data/enquiries.js` reads `new URLSearchParams(search).get('tour')` and calls `getTourBySlug`. Contact route consumes this resolved object. General enquiries use `null`; arbitrary query strings are never used as event labels.

- [x] Add resolver tests with exact assertions: known Alpine query returns `alpineGtTour`; empty search, `?tour=unknown`, and `?tour=%3Cscript%3E` return `null`.
- [x] Update contact contract tests to require name/email in both variants, vehicle and experience only for events, optional event circumstances, required general message, resolved email context and the existing Web3Forms endpoint/error flow. Preserve existing consent and honeypot checks.
- [x] Run `node --test tests/enquiry-context.test.js tests/contact-form.contract.test.js`; confirm failure before implementing.
- [x] Implement the resolver and form variants. Use a child form keyed by resolved slug or `general` so changing contact context clears stale status and fields. Event metadata, heading, subject, body context and analytics use the resolved tour; general uses “General enquiry” and analytics event identifier `general`.
- [x] Render shared `TourPrice` only for event enquiries. Use the approved owner/experience introduction and prompt. Event success copy promises personal review and explicitly says no space is reserved. Keep field values after failed requests and reset after success only.
- [x] Update privacy copy for names, vehicle ownership and driving experience as well as email/messages. No terms checkbox on the enquiry form; contact permission remains distinct from booking acceptance.
- [x] Run the task test files and `tests/analytics.test.js`; require all passing. During final browser review, simulate failed submission without sending a real enquiry and verify fields survive and retry remains available.
- [x] Commit the scoped changes after verification.

### Task 3: Site-wide CTA routing and operational handoff

**Files:** Homepage, tours listing, hero, registration panels, footer, `README.md`, new `docs/manual-stripe-bookings.md`; existing CTA and homepage tests affected by changed copy.

**Interfaces:** Tour-specific links consume `tour.registerPath` and `tour.enquiryLabel` from Task 1. General links use `/contact` and “Get in touch”. No additional route or checkout SDK.

- [x] Update failing contract assertions to require contextual links on Alpine hero, desktop/mobile registration panels, homepage enquiry CTA and Alpine listing CTA; general footer and future-experiences CTA remain `/contact`. Keep existing contact-page mobile-bar suppression assertions.
- [x] Run `npm test`; confirm only intended changed-behaviour assertions fail.
- [x] Update the identified CTAs with shared data. Keep “Explore Tours” as navigation. Add a visible general contact link to the footer and preserve privacy/cookie links. Ensure tour CTA labels wrap safely at mobile widths.
- [x] Update README to describe current routes, Web3Forms enquiries, no member backend and manual Stripe booking operations. Add manual setup instructions for two GBP products (£500 deposit, £2,795 balance), mandatory final-terms acceptance before deposit payment, personal review/invitation, verifying successful payment before marking reserved, and manual balance invoicing 30 days before departure. Explain that emailed links can be forwarded and that final lawyer-approved terms are pending.
- [x] Run `npm test`, `npm run lint`, `npm run build`; require all passing. Review desktop/mobile tour and contact variants, unknown-event fallback, navigation between variants and form validation using available browser tooling. Do not submit a live enquiry or payment.
- [x] Review `git diff --check` and final diff for scope; commit only implementation and documentation files. Leave `output/stripe-branding/` untouched. Report any visual verification limitation and the remaining manual Stripe/lawyer steps accurately.

## Execution choice

Recommended: native execution in this session. These three tasks are small and sequential, with shared data and form interfaces; independent implementation agents would add unnecessary coordination. Use the worktree and execution skills when implementation begins, preserve the existing checkout's unrelated output assets, and finish with the required whole-change review.
