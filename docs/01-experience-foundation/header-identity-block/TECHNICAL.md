# Header Identity Block - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Header Identity Block > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents the Mippi logo, name, role, and persistent identity treatment at the top of the site.

> This page is the canonical technical documentation for **Header Identity Block** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The header identity is defined in `index.html`:

```html
<a class="brand" href="#top" aria-label="Mippi The Dork home">
  <span class="brand-mark" aria-hidden="true">
    <img class="brand-logo" src="assets/mippi-logo-blue.png" alt="" />
  </span>
  <span class="brand-copy">
    <strong>MIPPI THE DORK</strong>
    <small>GAME DESIGNER // DESIGN DIRECTOR</small>
  </span>
</a>
```

The brand remains a real anchor even though JavaScript adds secondary behavior to `.brand-mark`.

## Core Styling

`.brand` uses inline flex layout with a 12px gap.

`.brand-mark` is currently 44 by 44 pixels and uses the rarity-dependent border, background, and glow treatment.

`.brand-logo` is 28 by 28 pixels.

The role line is hidden at narrower widths to protect horizontal space.

## Click Behavior

`script.js` attaches a click listener to `.brand-mark`.

The behavior prioritizes Finale state:

1. If `finaleReady` is true, the click starts the Finale.
2. Otherwise the early logo Signal behavior is processed.

The listener calls `preventDefault()` so clicking the mark does not also trigger the parent brand anchor navigation when the mark is being used as a game-layer control.

Clicking outside the mark but inside the `.brand` anchor still behaves as a conventional `#top` link.

## Finale Styling

Finale readiness is represented through body or element state classes and theme-specific CSS. The Rare, Epic, and Legendary variants must all define a visible attention animation.

When adding a new theme, Finale-ready styling must be added for that theme rather than relying on inherited color.

## Music Player Anchor

The Music Player is a sibling of the brand and navigation inside `.site-header`.

Current header placement:

```css
.site-header > .music-player {
  position: absolute;
  top: calc(100% + 1px);
  left: max(20px, calc((100vw - var(--max)) / 2));
}
```

This expression intentionally matches the left content inset used by the header, which is also the left edge of the logo square.

## Responsive Behavior

At widths up to 720px:

- the role subtitle is hidden,
- navigation switches to a Menu button,
- the identity mark remains visible.

At widths up to 760px, the header Music Player uses 12px left and right insets.

## QA

- Click the brand copy and verify normal top navigation.
- Click the logo mark in a fresh state and verify the intended Signal behavior.
- Force Finale-ready state with `dev finale ready` and verify the mark glows and starts the Finale.
- Test Rare, Epic, and Legendary Finale-ready appearance.
- Force Music Player state with `dev music` and verify its left edge matches the logo square.
- Expand the Music Player and verify the header does not reflow vertically.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
