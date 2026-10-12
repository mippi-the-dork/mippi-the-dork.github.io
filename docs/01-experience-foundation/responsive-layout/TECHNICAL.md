# Responsive Layout - Technical Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Responsive Layout > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Adapts the portfolio, fixed controls, overlays, and game systems across desktop and narrower viewport sizes.

> This page is the canonical technical documentation for **Responsive Layout** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Strategy

Responsive behavior is implemented entirely in CSS through a desktop-first base plus many feature-specific media queries.

The stylesheet currently contains breakpoints at:

- 1100px
- 980px
- 900px
- 820px
- 760px
- 720px
- 700px
- 680px
- 620px
- 560px
- 550px
- 520px
- 430px

There is also a `min-width: 901px` branch used by selected systems.

## Core Structural Breakpoints

### 980px

Common two-column layouts begin collapsing. The featured project becomes one column.

### 720px

The main compact-layout transition:

- root header height becomes 68px,
- role subtitle is hidden,
- Menu button becomes visible,
- primary nav becomes a dropdown,
- Hero typography and layout are adjusted,
- section padding drops from 104px to 72px,
- Quick Profile becomes 2 columns,
- several grids collapse,
- footer becomes a vertical column.

### 430px

Additional small-screen reductions occur for Hero actions, tool cards, project padding, and related components.

## Header Music Player

At `max-width: 760px`, the header Music Player switches from desktop grid alignment to 12px viewport insets:

```css
left: 12px;
right: 12px;
width: auto;
```

## Screen Units

The Hero uses `svh` in its desktop minimum-height calculation to reduce browser-chrome issues on modern devices.

## JavaScript

Most responsive behavior is CSS-only.

JavaScript systems should avoid caching layout measurements permanently because viewport dimensions can change. Feature systems that depend on position should recalculate when they render or on resize where appropriate.

## Testing Matrix

Minimum manual widths:

- 1440
- 1280
- 1024
- 980
- 900
- 820
- 760
- 720
- 620
- 430

Also test:

- browser zoom at 125 percent and 150 percent,
- short-height desktop windows,
- landscape narrow windows,
- Music Player expanded,
- Shop open,
- Dev Console open,
- Finale controls visible,
- postgame Achievement Ledger open.

## Known Product Constraint

The HTML source explicitly marks the current experience as not fully mobile-ready. Responsive QA should therefore distinguish:

- **bug:** professional content is unusable or controls become unreachable,
- **known scope limitation:** a desktop-oriented game interaction is awkward on touch.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Design Documentation](DESIGN.md)
