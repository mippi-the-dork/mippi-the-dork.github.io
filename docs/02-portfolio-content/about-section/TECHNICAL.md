# About Section - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > About Section > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents the personal summary, contact information, Doug, and the About-area interactive presentation.

> This page is the canonical technical documentation for **About Section** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The section is:

```html
<section class="section"
         id="about"
         data-scene="about">
```

Primary structures:

- `.about-panel`
- `.about-callout`
- `#about-canvas`
- `.about-watermark`
- `.about-years`
- `.about-links`
- `.doug-card`

## About Three.js Scene

The canvas is:

```html
<canvas id="about-canvas" aria-hidden="true"></canvas>
```

`script.js` calls `initAboutScene()` after the shared Three.js runtime is available.

The About scene is intentionally lighter than the Hero scene.

Full Three.js runtime behavior is documented in category 03.

## Watermark

The static fallback/presentation image is:

```text
assets/mippi-logo-blue-large.png
```

It remains available independently of the canvas.

## External Links

The About links are normal `_blank` anchors with `rel="noreferrer"`.

No JavaScript is required for basic access.

## Doug Integration

`.doug-card` contains `.doug-secret` and `#doug-reaction`.

Click behavior, Coolness, Bones, command state, and persistence are documented in the Doug and Coolness category.

## Section Tracking

`id="about"` participates in major-section telemetry, Finale broad engagement, and Grand Tour completion.

## Failure Behavior

If Three.js fails:

- About copy remains visible,
- watermark remains visible,
- external links remain functional,
- Doug card remains available.

## QA

- Confirm all external links resolve.
- Confirm About is readable before Three.js loads.
- Force a Three.js failure and verify graceful degradation.
- Interact with Doug and verify the card remains stable.
- Confirm About counts as a major-section visit.
- Test narrow layout stacking.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
