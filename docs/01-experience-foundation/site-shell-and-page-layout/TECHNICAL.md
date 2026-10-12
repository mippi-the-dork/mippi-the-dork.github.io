# Site Shell and Page Layout - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Site Shell and Page Layout > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the global page structure, content containers, spacing rules, fixed UI layers, and the relationship between portfolio content and game-space UI.

> This page is the canonical technical documentation for **Site Shell and Page Layout** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## DOM Structure

The high-level document structure is:

```text
body
  skip link
  ambient canvas
  header.site-header
    brand
    nav toggle
    nav.site-nav
    music player
  hardware warning
  main#main
    hero
    quick profile
    games
    career
    consulting
    crafting
    tools
    about
  footer.site-footer
  modal and overlay surfaces
  dev console
  script includes
```

Professional content lives inside `main#main`. Most modal and screen-space systems are appended after the footer in `index.html`.

## Core CSS Tokens

The root layout uses CSS custom properties including:

- `--max: 1220px`
- `--header: 76px`
- `--radius: 6px`

The primary section width is:

```css
.section {
  width: min(var(--max), calc(100% - 40px));
  margin: 0 auto;
  padding: 104px 0;
  scroll-margin-top: 92px;
}
```

This provides a maximum content width plus a 20 pixel minimum side inset on each side.

## Alternate Sections

`.section.alt` expands to viewport width while preserving the same effective content inset:

```css
padding-left: max(20px, calc((100vw - var(--max)) / 2));
padding-right: max(20px, calc((100vw - var(--max)) / 2));
```

This is the main mechanism for full-width section bands that still align with the content grid.

## Sticky Header

`.site-header` is sticky at `top: 0` and receives a high stacking order. Later polish rules currently enforce `z-index: 120`.

Sections use `scroll-margin-top` so anchor navigation does not place headings underneath the sticky header.

## Stacking Contexts

Important examples in the current stylesheet include:

- body scanline decoration around `z-index: 100`
- sticky header around `z-index: 120`
- Achievement toast around `z-index: 250`
- authored modal and full-screen systems at feature-specific higher values

Because the page contains many fixed surfaces, new systems should not pick arbitrary stacking values without checking existing layers.

## Footer Clearance

The footer receives additional bottom padding to avoid fixed bottom controls:

- 40px default
- 52px at widths up to 760px

This is a layout contract, not decorative padding.

## Header Music Player

The Music Player is positioned absolutely relative to the sticky header. Its left edge uses the same header content inset as the Mippi logo square:

```css
left: max(20px, calc((100vw - var(--max)) / 2));
top: calc(100% + 1px);
```

Expansion grows downward so the header anchor does not move.

## Responsive Ownership

Core responsive layout is handled in `style.css`, with additional feature-specific media queries. The main structural breakpoints include 980px, 720px, and 430px, with several later systems using 1100, 900, 820, 760, 700, 680, 620, 560, 550, and 520px.

## QA

- Verify all section left edges align at desktop widths.
- Verify `.section.alt` content aligns with standard `.section`.
- Verify anchor navigation leaves section headings visible below the sticky header.
- Verify fixed controls do not cover the footer.
- Verify the Music Player aligns to the left edge of the Mippi logo square.
- Verify modal close and continue paths remain on top of lower-priority UI.
- Verify changing themes does not change layout geometry.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
