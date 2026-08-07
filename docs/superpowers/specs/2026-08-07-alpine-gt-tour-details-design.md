# Alpine GT 2027 Tour Detail Page — Design Specification

**Date:** 2026-08-07  
**Status:** Approved design  
**Scope:** Static Alpine GT tour detail page, tour-listing link, and contact placeholder route

## Overview

Create a content-rich detail page for **The Alpine GT 2027**, a five-day, four-night curated driving tour through the Black Forest, the Swiss Alps, and Burgundy. The page should extend the existing dark, teal, high-performance visual system while feeling more editorial and luxurious than the tour listing.

The experience is a premium digital brochure: strong destination photography, a clearly narrated five-day journey, featured hotels, transparent package details, and a focused registration path. It does not introduce authentication, bookings, payments, or a working customer form.

## Goals

- Turn the existing Alpine GT listing card into a compelling detail journey.
- Communicate the route, driving character, accommodation, price, inclusions, and exclusions clearly.
- Make Day 3—the Furka, Grimsel, and Susten loop—the visual and narrative centrepiece.
- Present accommodation as part of the experience rather than incidental lodging.
- Convert interest through a clear path to a branded placeholder contact page.
- Keep content reusable and consistent between the tour listing and detail page.

## Non-Goals

- No working contact form in this scope.
- No Supabase, authentication, database, booking, or payment functionality.
- No interactive map, GPS files, live road status, availability counter, or weather feed.
- No exact café selections until they have been finalised.
- No new component library, animation library, or other dependency.

## Routes

| Route | Purpose |
|---|---|
| `/tours` | Existing tour listing; Alpine GT card links to its detail page |
| `/tours/alpine-gt-2027` | New Alpine GT tour detail page |
| `/contact` | Branded placeholder for the future customer contact form |

Unknown tour URLs continue to render the existing 404 page.

## Visual Direction

### Chosen direction: Editorial Journey

The page uses the established `brandDark`, `brandTeal`, and `brandGray` palette with the existing system typography. It adds a more luxurious editorial rhythm through:

- Full-width destination and driving photography.
- Black overlays and gradients that preserve text contrast.
- Oversized day numbers as graphic anchors.
- Thin teal route lines connecting itinerary chapters.
- Small technical labels for mileage, driving style, and overnight destination.
- Alternating text and image compositions rather than a repetitive card grid.
- A deeper teal treatment for the Day 3 hero chapter.
- Wide hotel reveals that make arrival feel like part of the story.
- Restrained glows and borders consistent with the existing site.

The Road Rage font remains reserved for the logo. The tour page uses the existing body type system and does not add custom CSS; all production styling uses Tailwind utilities.

## Page Structure

### 1. Cinematic hero

The opening viewport contains:

- Eyebrow: `10—14 JUNE 2027 · EUROPE`
- H1: `THE ALPINE GT`
- Destination line: `BLACK FOREST · SWISS ALPS · BURGUNDY`
- Primary CTA: `REGISTER INTEREST`
- Hero photography showing an aspirational European touring setting.

The CTA links to `/contact`.

Immediately below the hero, a metric strip shows:

| Metric | Value |
|---|---|
| Duration | 5 days |
| Accommodation | 4 nights |
| Approximate distance | 1,550 miles |
| Tour size | Maximum 15 cars |
| Price | £2,495 total for two |

### 2. Opening manifesto

The introduction establishes the journey's progression: fast continental touring, flowing Black Forest roads, Switzerland's legendary passes, lakeside hospitality, and a château finish in Burgundy.

Recommended heading:

> FIVE DAYS. THREE COUNTRIES. ONE GREAT DRIVE.

Copy should be concise, confident, and evocative without overclaiming.

### 3. Five-day journey rail

The core itinerary is a vertical editorial journey. Every day displays:

- Day number and curated day name.
- Theme.
- Approximate mileage.
- Driving-style label.
- Short atmospheric introduction.
- Key route sequence.
- Highlighted stops.
- Overnight destination or homeward endpoint.

#### Day 1 — The Grand Departure

**Theme:** From the UK to the Black Forest  
**Approximate distance:** 450 miles  
**Driving style:** Efficient GT touring

**Route:**

Eurotunnel LeShuttle Terminal, Calais → Saint-Omer (comfort stop) → Reims (lunch) → Metz (coffee/fuel) → Strasbourg bypass → Offenburg → Triberg (optional scenic stop if timing permits) → Hinterzarten → Parkhotel Adler.

The copy should explain that the day favours efficient autoroutes through eastern France before the final scenic approach into the Black Forest.

#### Day 2 — Into the Black Forest

**Theme:** Forest Roads to Lake Lucerne  
**Approximate distance:** 220–250 miles  
**Driving style:** Flowing forest roads

**Morning route:**

Parkhotel Adler → Titisee → Schluchsee → St. Blasien → Todtnau → Münstertal → Badenweiler.

**Afternoon route:**

Badenweiler → Todtmoos → Herrischried → Rickenbach → Waldshut-Tiengen → Zug → Küssnacht → HERMITAGE Lake Lucerne.

The page should state the route philosophy—selecting the strongest southern Black Forest roads from the hotel location—without referring to unfinished café selection work.

#### Day 3 — The Legendary Three Passes

**Theme:** Switzerland's Greatest Driving Roads  
**Approximate distance:** 220 miles  
**Driving style:** Iconic mountain passes

**Route:**

HERMITAGE Lake Lucerne → Brunnen → Altdorf → Wassen → Andermatt (coffee) → Furka Pass → Belvedere Hotel → Gletsch → Grimsel Pass → Innertkirchen → Meiringen (lunch) → Susten Pass → Wassen → Altdorf → Brunnen → Weggis → HERMITAGE Lake Lucerne.

This is the hero day. Its visual treatment is larger and more dramatic than every other chapter. Furka, Grimsel, and Susten are displayed prominently as a three-part typographic motif.

#### Day 4 — From Alps to Vineyards

**Theme:** Lakes, Vineyards & Château  
**Approximate distance:** 260–280 miles  
**Driving style:** Scenic touring

**Primary route:**

HERMITAGE Lake Lucerne → Küssnacht → Zug → Lucerne outskirts → Sarnen → Brünig Pass → Brienz → Spiez → Gstaad (lunch) → Château-d'Oex → Bulle → Vallorbe → Champagnole → Poligny → Beaune → Château de Chailly.

The page uses this recommended westward route. It does not present the Liechtenstein, Walensee, Glarus, or Klausen Pass alternative as part of the primary itinerary. The narrative emphasises avoiding cities, maintaining a scenic and relaxed pace, and arriving at the château at approximately 17:00.

#### Day 5 — The Journey Home

**Theme:** Easy Cruising Home  
**Approximate distance:** 400 miles  
**Driving style:** Relaxed autoroute

**Route:**

Château de Chailly → Beaune → Troyes (coffee) → Reims (lunch if required) → Calais → Eurotunnel.

The close should feel reflective: an efficient return journey that gives guests time to absorb the week.

### 4. Accommodation features

Hotel features are placed between the relevant itinerary chapters and presented as destination reveals.

#### Parkhotel Adler, Hinterzarten

Official source: <https://www.parkhoteladler.de/en/>

Positioning:

- Historic luxury estate in the High Black Forest.
- A natural end point for the grand departure and launch point for the Southern Black Forest roads.
- Editorial emphasis on heritage, parkland, wellness, and regional hospitality.

#### HERMITAGE Lake Lucerne

Official source: <https://www.hermitage.ch/en>

Positioning:

- Lakeside Swiss base for two nights.
- The calm counterpoint to the tour's most intense driving day.
- Editorial emphasis on Lake Lucerne views, Alpine setting, hospitality, and wellness.

#### Château de Chailly, Burgundy

Official source: <https://www.chailly.com/>

Positioning:

- Historic château arrival in Burgundy.
- A celebratory final night after the transition from Alpine roads to vineyards.
- Editorial emphasis on old stone, gastronomy, wellness, and suitability for car rallies.
- The official site notes that car-rally groups can use the château as a stopover or base and may privatise the inner courtyard for cars.

Each feature links to the hotel's official website in a new tab with appropriate accessible external-link text.

### 5. Tour-at-a-glance summary

| Day | Name | Driving style |
|---|---|---|
| 1 | The Grand Departure | Efficient GT touring |
| 2 | Into the Black Forest | Flowing forest roads |
| 3 | The Legendary Three Passes | Iconic mountain passes |
| 4 | From Alps to Vineyards | Scenic touring |
| 5 | The Journey Home | Relaxed autoroute |

### 6. Package details

Price wording must always be explicit:

> **£2,495 total for two guests sharing one room**

#### Included

- Four nights' luxury accommodation.
- Breakfast each morning.
- Evening meals.
- Hotel wellness facilities.
- Parking.
- Swiss motorway vignettes.
- The Drive exclusive welcome package.

#### Excluded

- Fuel.
- Lunches.
- Drinks.
- Travel insurance.
- French tolls.
- Personal expenses.

### 7. Registration close

The closing panel repeats the date, price basis, and `REGISTER INTEREST` CTA. It links to `/contact`.

The `/contact` page is a branded placeholder only. It confirms that the customer enquiry form is coming soon and provides a route back to the tour. Building and submitting the actual form is a separate follow-up feature.

## Interaction Design

- Desktop: sticky section navigation for `Journey`, `Stays`, and `Included`.
- Mobile: persistent but unobtrusive `Register Interest` bar after the hero leaves view.
- In-page links use smooth native navigation where compatible with reduced-motion preferences.
- Interactive imagery may use a restrained scale effect on hover/focus.
- Route-line and chapter reveals are subtle and must not hide content if scripting is unavailable.
- All interactive primitives use Base UI where a headless primitive is appropriate.
- No information relies on hover alone.

## Content and Data Architecture

Tour content moves to a structured data module shared by the listing and detail page. The model includes:

- Stable slug.
- Title, subtitle, tagline, description, and dates.
- Duration, nights, approximate distance, group size, and exact pricing basis.
- Highlights.
- Five itinerary-day records.
- Three accommodation records.
- Inclusions and exclusions.
- Image references and alt text.

The existing `/tours` page reads its Alpine card from this shared record. The detail page composes focused components from the same data.

Recommended component boundaries:

| Component | Responsibility |
|---|---|
| `TourHero` | Hero imagery, identity, metrics, and primary CTA |
| `JourneyOverview` | Compact five-day summary |
| `ItineraryDay` | Reusable daily editorial chapter |
| `HotelFeature` | Hotel image, positioning copy, and official link |
| `PackageDetails` | Price, inclusions, and exclusions |
| `RegisterInterestPanel` | Closing conversion section |
| `ContactPlaceholderPage` | Temporary destination for registration CTAs |

The route-level detail page composes these units and contains minimal presentation logic.

## Image Policy

- Use relevant road, pass, lake, vineyard, château, and hotel imagery throughout.
- Hotel imagery may be selected from the three official hotel websites, as authorised by the project owner.
- Download selected images into local project assets; do not hotlink production images.
- Optimise images for the web and generate sensible display dimensions before committing.
- Use explicit aspect ratios or dimensions to prevent layout shifts.
- Provide descriptive alt text based on the visible image content.
- Decorative imagery uses empty alt text.
- Use the existing dark background as the visual fallback if an image cannot load.
- Do not reuse an image for a different hotel or imply that existing automotive photography depicts a hotel when it does not.

## Route and Operational Caveats

- All mileage values are approximate.
- Triberg is timing-dependent.
- Mountain-pass access is subject to weather, seasonal opening, and road conditions.
- The published itinerary may be adjusted by the organisers for safety, timing, or operational reasons.
- The primary Day 4 route excludes Klausen Pass.
- Do not present draft café selections as confirmed.

## Accessibility

- One H1 and a logical heading hierarchy.
- Semantic `main`, `section`, `article`, and navigation landmarks.
- A skip link to the main content.
- Visible keyboard focus states.
- Touch targets at least 44px where practical.
- Text contrast at WCAG AA or better.
- Descriptive link names; no ambiguous `Click here` labels.
- Reduced-motion variants for every animation or transition that creates meaningful movement.
- Mobile content order matches the visual and keyboard-reading order.
- Sticky elements must not obscure focused content or the footer.

## Metadata and SEO

- Unique page title: `The Alpine GT 2027 | The Drive Touring Company`.
- Description summarising the five-day Black Forest, Swiss Alps, and Burgundy experience.
- Canonical URL for `/tours/alpine-gt-2027`.
- `/contact` receives its own placeholder metadata.
- Update `sitemap.xml` with both public routes.
- Use meaningful image alternative text; do not keyword-stuff copy.

## Error and Fallback Behaviour

- Unknown routes use the existing 404 page.
- Missing optional tour sections do not prevent the page from rendering.
- Images retain their layout area and dark fallback treatment if unavailable.
- Official hotel links remain ordinary external links and do not affect core page navigation.
- The placeholder contact page is always reachable without authentication.

## Verification and Acceptance Criteria

### Content

- All five named days, themes, distances, and primary routes match this specification.
- Day 3 is the visual and narrative centrepiece.
- Day 4 uses the Brünig/Gstaad/Burgundy route and excludes Klausen from the primary itinerary.
- Price is always described as £2,495 total for two guests sharing one room.
- Inclusions and exclusions match this specification exactly.
- All three hotels appear with relevant, correctly attributed local imagery and official links.

### Navigation

- The Alpine card on `/tours` links to `/tours/alpine-gt-2027`.
- Hero and closing registration CTAs link to `/contact`.
- The placeholder contact page links back to the Alpine tour.
- Browser back and forward navigation work correctly.

### Responsive and accessible behaviour

- Layout is verified at mobile, tablet, and desktop widths.
- Desktop section navigation remains usable and does not overlap content.
- Mobile registration bar remains unobtrusive and does not cover important content.
- Keyboard focus order and visible focus styling are correct.
- Reduced-motion preferences are respected.
- Images have appropriate alt text and stable dimensions.

### Quality checks

- `npm run lint` passes.
- `npm run build` passes.
- Browser smoke tests cover the tour listing, detail route, contact placeholder, CTAs, mobile navigation, metadata, and 404 behaviour.
- No new runtime dependency is introduced.

## Follow-Up Feature

After this detail page is complete, design and implement the customer contact form as a separate scoped feature. The form will replace the `/contact` placeholder and collect customer details for registration enquiries. Its fields, data destination, consent wording, spam protection, and submission workflow require their own design specification.
