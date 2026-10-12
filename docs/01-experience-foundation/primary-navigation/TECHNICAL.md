# Primary Navigation - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Primary Navigation > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides direct navigation between the six major portfolio sections while remaining compatible with the site game layer.

> This page is the canonical technical documentation for **Primary Navigation** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

Primary navigation is a semantic `nav`:

```html
<button class="nav-toggle"
        type="button"
        aria-expanded="false"
        aria-controls="site-nav">Menu</button>

<nav class="site-nav" id="site-nav" aria-label="Primary">
  <a href="#games">Games</a>
  <a href="#career">Career</a>
  <a href="#consulting">Consulting</a>
  <a href="#crafting">Crafting Play</a>
  <a href="#tools">Tools</a>
  <a href="#about">About</a>
</nav>
```

The section IDs are treated as a public contract because console commands, Three.js Hero signals, ordinary links, and telemetry all depend on them.

## Desktop CSS

`.site-nav` is a flex row.

Navigation anchors receive:

- minimum height,
- horizontal padding,
- muted default color,
- transparent border,
- hover and `:focus-visible` treatment.

## Compact CSS

At `max-width: 720px`:

- `.nav-toggle` becomes visible.
- `.site-nav` becomes an absolutely positioned dropdown beneath the header.
- `.site-nav.open` switches the navigation to a grid.
- each link receives a 46px minimum height.

## JavaScript

`script.js` caches:

```js
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
```

The Menu button toggles `.open` and synchronizes `aria-expanded`.

Each navigation link removes `.open` and resets `aria-expanded` to `false` after selection.

## Anchor Behavior

The destination sections use `scroll-margin-top` to account for the sticky header.

The page also enables smooth scrolling at the HTML level.

Other systems may call `scrollIntoView({behavior:'smooth'})` for the same destinations, but conventional anchor navigation remains valid.

## Telemetry

Trusted clicks on anchors whose `href` begins with `#` increment local session navigation-click telemetry.

This telemetry is descriptive and does not alter navigation behavior.

## QA

- Verify all six links navigate to the correct section.
- Verify section headings are not obscured by the sticky header.
- Verify keyboard Tab focus reaches every link.
- Verify the Menu button updates `aria-expanded`.
- Verify selecting a compact-menu link closes the menu.
- Verify navigation remains usable if Three.js fails.
- Verify theme changes do not change destination order or labels.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
