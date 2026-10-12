# Responsive Layout - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Responsive Layout > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Adapts the portfolio, fixed controls, overlays, and game systems across desktop and narrower viewport sizes.

> This page is the canonical design documentation for **Responsive Layout** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio is desktop-first.

The current goal is **best-effort narrow-window support**, not a promise that every playful system has been redesigned as a touch-first mobile product.

Professional content should remain readable as the viewport narrows. Game-layer systems should avoid catastrophic overlap, but some experiences are intentionally optimized for a desktop pointer and keyboard.

## Priority Order

When space becomes constrained, preserve in this order:

1. Professional content readability.
2. Primary navigation.
3. Core actionable controls.
4. Progression state readability.
5. Decorative treatment.
6. Nonessential motion and flourish.

## Header Behavior

On compact layouts:

- the role subtitle can disappear,
- the six-link nav collapses behind Menu,
- navigation links become larger vertical targets,
- the Music Player uses viewport-edge insets rather than desktop content-grid positioning.

## Content Behavior

Typical changes include:

- two-column content becoming one column,
- four-column grids becoming two columns,
- some tool grids reducing column count,
- section vertical padding becoming smaller,
- footer switching from row to column.

## Fixed UI Behavior

Fixed screen-space controls are the highest collision risk.

Each new fixed system must be checked against:

- Achievement toast.
- Progress HUD.
- mode controls.
- Hint.
- Dev Console access.
- Optional Objective.
- Music Player.
- Footer at max scroll.

## Mobile Scope

The source currently includes an explicit warning that the site is not considered fully mobile-ready.

That is a truthful product constraint. Responsive rules should still prevent basic breakage, but completion of a dedicated mobile experience is separate scope.

## Touch Considerations

Professional links and buttons should remain usable on touch.

Some hidden game interactions, Three.js manipulation, arcade encounters, and keyboard-driven console behavior may be less natural on mobile. Those systems must not block the professional portfolio.

## Success Criteria

At narrower widths:

- text remains readable,
- no professional section requires horizontal scrolling,
- main navigation remains reachable,
- modal actions remain reachable,
- fixed UI does not permanently hide essential content,
- the professional site remains useful even if game-layer usability is reduced.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
