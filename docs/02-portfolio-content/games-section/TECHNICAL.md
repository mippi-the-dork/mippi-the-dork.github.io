# Games Section - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Games Section > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents game design work and featured projects as the primary creative portfolio destination.

> This page is the canonical technical documentation for **Games Section** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup Ownership

The section is the semantic element:

```html
<section class="section" id="games" data-scene="games">
```

The stable `id="games"` is used by:

- Primary Navigation.
- Dev Console navigation.
- Three.js Hero signals.
- session telemetry.
- section visit tracking.
- Finale eligibility.
- postgame completion.

The `data-scene="games"` attribute is part of the site's section identity convention.

## Internal Structure

The section contains:

- `.section-heading`
- `.featured-project.heavy-water`
- `.perspective-demo`
- `.games-support-grid`
- `.consulting-summary-card`
- `.azure-teaser`
- `.games-tools-callout`

The Heavy Water feature and Perspective Visualizer have separate canonical documentation.

## Cross-Section Navigation

Supporting links use ordinary anchors:

- consulting summary: `href="#consulting"`
- Azure teaser: `href="#tools"`
- Unreal Tools callout: `href="#tools"`

These remain functional without JavaScript.

## Telemetry and Visits

The Games section is included in the major section tracking set. When a meaningful amount enters the viewport, telemetry records section activity and persistent postgame section completion.

No Games-specific storage key exists. It participates through the shared section tracking systems.

## Styling

The section uses the shared `.section` layout system.

Important child styling lives in `style.css` under selectors for:

- `.featured-project`
- `.heavy-water`
- `.project-visual`
- `.project-copy`
- `.games-support-grid`
- `.games-tools-callout`
- `.games-tools-icons`

Responsive behavior reduces multi-column layouts at narrower widths.

## Dependencies

The Games section is intentionally resilient.

Required for basic content:

- `index.html`
- `style.css`
- local images and icons

Optional enhancement dependencies:

- `script.js` for telemetry and game-layer interactions
- `perspective-demo.js` for the embedded Perspective Visualizer

If the visualizer fails, the Heavy Water copy remains readable.

## QA

1. Navigate to `#games` from the header.
2. Confirm Heavy Water is the primary visual focus.
3. Confirm consulting teaser navigates to `#consulting`.
4. Confirm Azure Altar teaser navigates to `#tools`.
5. Confirm Unreal Tools callout navigates to `#tools`.
6. Confirm the section counts as a major-section visit.
7. Disable JavaScript and verify the professional content and anchor links still work.
8. Test narrow widths for overflow and content-order preservation.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
