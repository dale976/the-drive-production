# Alpine GT Content Update Design

## Scope

Update the published Alpine GT tour without changing its established visual direction or itinerary structure.

## Price

- Increase the total tour price from £2495 to £2595.
- Update the shared tour data, price in pence, structured-data offer, and contract tests.
- Preserve the existing wording: “Based on 2 people sharing”.

## Lake Lucerne Hotel

- Replace every HERMITAGE Lake Lucerne reference with Campus Hotel Hertenstein.
- Retain the existing two-night Lake Lucerne stay.
- Update the hotel name, official URL, descriptive copy, overnight labels, itinerary prose, image and image alternative text.
- Use an official Campus Hotel Hertenstein image and optimise it for the site before replacing the old asset reference.
- Adjust route and arrival wording where necessary so it accurately refers to Hertenstein rather than Weggis or HERMITAGE.

## Mobile Road Book

- Hide the entire Journey Overview / chapter road-book section below the existing `md` breakpoint.
- Keep the desktop and tablet presentation and behaviour unchanged from `md` upwards.
- On mobile, flow directly from the tour hero into the five itinerary chapters, avoiding horizontal scrolling and an orphaned road-book heading.

## Verification

- Contract tests confirm the new price and hotel identity.
- Search confirms that no old price or HERMITAGE references remain in live source files.
- Responsive browser checks confirm the road book is absent on mobile and visible on desktop.
- Run the complete test, lint and production-build suite.
