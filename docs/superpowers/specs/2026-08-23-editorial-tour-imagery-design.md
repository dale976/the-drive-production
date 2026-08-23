# Editorial Tour Imagery Design

## Objective

Use authentic photography from previous Drive tours to make the homepage and Alpine GT detail page feel warmer, more credible and more representative of the complete touring experience. The images should support the existing narrative rather than form a separate gallery.

## Editorial Principle

- Treat photography as evidence of the roads, people and atmosphere behind The Drive Touring Company.
- Clearly identify historic imagery as coming from previous Drive tours; do not imply it depicts the future Alpine GT 2027 departure.
- Use a restrained selection and retain unused photographs for future tours, About content and social media.
- Preserve the established dark, premium visual direction and teal accent system.

## Homepage

Add a compact editorial section titled `Life on tour` between `How We Operate` and the founders section.

Use:

- `_A125527.jpeg` as the primary landscape image: purple Porsche in motion.
- `_A124211.jpeg` as a supporting portrait image: candid conversation over dinner.
- `_A125078.jpeg` as a supporting landscape image: relaxed group portrait.

The composition should be asymmetric, with the moving-car image leading and the people photographs supporting it. Include the visible provenance caption `Moments from previous Drive tours`. Do not add links, carousel controls or hover-only information.

On mobile, stack the images into a simple reading order without horizontal scrolling. Preserve useful crops and ensure every person remains recognisable.

## Alpine GT Detail Page

Add one editorial photograph within each itinerary chapter after the main overview and before the detailed route/moments content:

| Day | Source image | Editorial role |
|---|---|---|
| 1 | `IMG_1396.jpeg` | Convoy and historic circuit atmosphere |
| 2 | `DSC_0208.jpeg` | A car on a quiet, flowing rural road |
| 3 | `IMG_2615.jpeg` | Porsche against an Alpine landscape |
| 4 | `_A123990.jpeg` | Lake and destination atmosphere |
| 5 | `_A124163_2.jpeg` | Conversation and reflection after the drive |

Each photograph must carry the visible caption `From a previous Drive tour`. Captions should be discreet and consistently positioned.

The images should not appear as five identical cards:

- Day 3 is the visual centrepiece and receives the largest treatment.
- Days 1, 2, 4 and 5 alternate restrained landscape or editorial crops in keeping with each chapter’s existing alignment.
- Images remain subordinate to the day number and title hierarchy.
- Mobile layouts use full-width images within the chapter content and do not introduce horizontal scrolling.

Store the image path and alternative text with each day in the shared tour data so the itinerary remains data-driven.

## Hotel Presentation

- Retain each hotel image, name, region, nights and description.
- Remove the visible `Explore the hotel` external link and external-link icon from the hotel presentation.
- Retain hotel website values in shared tour data for possible internal or future use.
- Do not replace hotel photography with previous-tour imagery; the two types serve different purposes.

## Asset Processing

- Create descriptive WebP assets in `src/assets/` from the selected originals.
- Correct image orientation before resizing.
- Limit landscape assets to a maximum width of 1800 pixels.
- Limit portrait assets to a maximum height of 1800 pixels.
- Use approximately 80–85% WebP quality, adjusting only where needed to avoid visible degradation.
- Record intrinsic width and height on rendered images to reduce layout shift.
- Use lazy loading for all new below-the-fold images.
- Write factual, useful alternative text that describes the visible scene.

## Accessibility and Performance

- The provenance captions must remain visible without hover or interaction.
- Images must not contain essential text or serve as the only way information is communicated.
- Layouts must not cause horizontal overflow at mobile widths.
- New photography should be loaded only on the pages where it appears.

## Verification

- Contract tests confirm the selected day images, provenance copy and removal of the hotel link.
- Test, lint and production-build commands pass.
- Browser QA at approximately 390px and 1440px confirms image loading, crop quality, readable captions, chapter hierarchy and absence of horizontal overflow.
- Browser console contains no errors.
