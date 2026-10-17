# Career Section - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Career Section > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents the user's professional history, leadership roles, and selected studio experience.

> This page is the canonical technical documentation for **Career Section** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The Career section is:

```html
<section class="section career-section"
         id="career"
         data-scene="career">
```

Its main structures are:

- `.career-board`
- `.career-primary`
- `.career-direction`
- `.career-nda`
- `.studio-wall`
- `.studio-grid`
- `.career-timeline`
- `.resume-panel`

## Selected Studio Cards

The current studio wall includes:

- Mob Entertainment
- Oberha5li
- Seven20 & deadmau5
- Square Enix
- Gamigo
- Aeria Games
- NCSoft
- ChangYou
- Electronic Arts
- Insomniac Games
- Naughty Dog
- Rockstar Games
- Sony Computer Entertainment America

Studio artwork is loaded from local files under `assets/career-real/`.

Most artwork images use empty alt text and `aria-hidden="true"` because they are presentation context. The readable company and role text is separate HTML.

## Timeline

The selected timeline is static HTML and currently groups milestones into broad periods rather than one entry per job.

No JavaScript is required to render the timeline.

## NDA Integration

`.career-nda` contains `.nda-secret`, a real button that can award the `Classified` Rare achievement.

The NDA card is documented separately under NDA Project Card.

## Resume Integration

`.resume-panel` contains three external resume links.

The Long link has class `.resume-long`, which is used by the achievement system.

Resume behavior is documented separately.

## Section Tracking

`id="career"` participates in:

- Primary Navigation.
- section telemetry.
- Finale broad-engagement checks.
- Grand Tour postgame completion.
- optional exploration objectives.

## Styling

The section uses several Career-specific grid systems in `style.css`.

Responsive rules collapse the career board, studio grid, timeline, and resume panel at narrower widths while preserving DOM reading order.

## QA

1. Confirm recent role is visually prominent.
2. Confirm all studio cards render with readable company and role text.
3. Block studio images and confirm the section remains understandable.
4. Verify NDA hint is keyboard reachable.
5. Verify all three resume links work.
6. Verify Career counts as a major-section visit.
7. Test narrow layouts for horizontal overflow.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)


## v3.14 Current Behavior

Current v3.14 `.studio-grid` click and keyboard delegation toggles `.studio-expanded` and reveal `inert`, aria-hidden/expanded, plus focus management. Panels slide upward; compact v3.14 text and minimum card heights avoid internal scrolling. Imagery remains full-color, with accent overlay rather than v3.13 grayscale. See [Studio Career Reveals](../studio-career-reveals/TECHNICAL.md).
