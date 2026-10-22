# Tour enquiries and manual Stripe bookings

## Agreed outcome

The website explains each event and collects enquiries for personal review. All approval, payment links and invoices are managed manually in the Stripe Dashboard. No Supabase, member accounts, website payment integration or automated booking system is required. This supersedes the corresponding member-platform and payment assumptions in the June architecture proposal.

## Pricing and reservation

Alpine GT costs £3,295 for one car and two people sharing accommodation. The deposit is £500; the remaining £2,795 is due 30 days before departure. Show this on the tour detail page and in its enquiry context. Do not invent a departure date.

An enquiry carries no obligation and does not reserve a space. After personal approval, the team sends a Stripe deposit payment link. Guests must accept the final terms before paying. A successful deposit payment reserves their space. The team manually invoices the balance.

## Calls to action and event context

Use the existing shared tour data as the source for event identity, pricing, CTA wording and enquiry destination. Alpine GT-specific CTAs on the homepage, tour listing, detail hero and registration panels link to `/contact?tour=alpine-gt-2027` and use “Enquire about Alpine GT”. Future events supply their own slug and data to the same flow.

Keep general enquiries available through `/contact`, including the future-events enquiry and a clearly labelled footer link. The general page must not assume Alpine GT. Resolve only known tour slugs; unknown values fall back to general enquiry without reflecting arbitrary query text into emails or analytics.

## Enquiry experience

Reuse the existing dedicated contact page and Web3Forms delivery. For a known event, show its title, pricing and personal-review explanation. For general enquiries, show a general introduction and message field without requiring vehicle or driving history.

Event enquiries require name, email, car make/model and ownership/driving experience. Additional circumstances or questions are optional. General enquiries require name, email and message. Retain the existing contact consent, honeypot, submitting state, accessible feedback and retry behaviour. Reset only after successful delivery.

Suggested introduction: “Alpine GT is designed for owners who enjoy driving their performance cars and sharing the experience with like-minded people. We personally review each enquiry, considering the car, your driving experience and the group as a whole. If your circumstances are different, tell us a little more—we’re happy to have a conversation.”

Ask about ownership duration, driving similar performance cars, road trips, tours and driver training. Do not promise that no experience is needed or impose a blanket ban on hired cars. Exceptions remain a personal decision.

Each email identifies the selected event or general enquiry in its subject and body. Success copy explains personal follow-up and, for events, that no space has been reserved. Analytics records only the known event identifier or general enquiry, never form contents. Update privacy copy to describe the fields actually collected.

## Manual Stripe setup and terms

Create two GBP products manually: Alpine GT deposit (£500) and Alpine GT balance (£2,795). Configure deposit Payment Links to require acceptance of the published final terms before payment. A personally emailed link is not an identity restriction and can be forwarded; approval remains manually managed.

The lawyer’s terms are pending. Do not publish invented liability wording or enable public checkout. Website enquiry improvements can ship independently. Product creation, link configuration, payment verification and balance invoicing remain Dashboard operations, outside the website implementation.

## Scope and verification

Keep existing page styling and layout patterns. Update outdated pricing assertions and add meaningful coverage for known-event versus general enquiry resolution, CTA destinations, pricing and required fields. Run the existing test suite, lint and production build. Review desktop and mobile enquiry layouts where browser tooling is available. Do not send real enquiries during verification.

No unrelated redesign, new backend, new payment SDK or changes to existing branding output files.
