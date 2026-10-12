# Site Shell and Page Layout - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Site Shell and Page Layout > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the global page structure, content containers, spacing rules, fixed UI layers, and the relationship between portfolio content and game-space UI.

> This page is the canonical design documentation for **Site Shell and Page Layout** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The shell must provide a stable professional reading experience while allowing a large number of optional game systems to coexist around it.

The page should always have an obvious visual hierarchy:

1. Identity and navigation.
2. Hero statement.
3. Quick professional profile.
4. Major portfolio sections.
5. Footer.
6. Optional game and progression UI layered around the page.

The shell is intentionally conventional. The unusual behavior belongs inside features, not in the basic page structure.

## Reading Flow

The default reading flow is vertical:

- Sticky header.
- Hero.
- Quick Profile.
- Games.
- Career.
- Consulting.
- Crafting Play.
- Tools.
- About.
- Footer.

This order prioritizes shipped and in-development game work, then professional history, services, thinking, tooling, and personal context.

## Content Width

Core content uses a shared maximum width so sections feel like one system rather than a collection of unrelated pages.

Wide background treatments may extend to the viewport edge, but their actual content remains aligned to the central content grid.

## Section Rhythm

Major sections use generous vertical spacing because the portfolio contains dense information and multiple interactive surfaces.

Alternating sections may use full-width background treatment to create pacing without changing navigation or document order.

Section headings pair:

- a category and number,
- a strong headline,
- a supporting explanatory paragraph.

## Fixed and Floating UI

Screen-space systems may sit outside document flow, including:

- Achievement toasts.
- Achievement Ledger and progress HUD.
- Design and Inspect controls.
- Interact control.
- Hint control.
- Dev Console access.
- Optional Objectives.
- encounter or Wish overlays.

These systems must not permanently cover essential professional actions.

The footer receives additional bottom space specifically because the page now has persistent fixed controls near the bottom edge.

## Overlay Priority

A high-attention authored sequence may temporarily sit above the portfolio. Examples include the Finale, Super Boss, Shop, Blueprint repair, Session Report, and Wish result screens.

Overlay use should follow these rules:

- The user must understand what has taken focus.
- A close, continue, or completion path must be visible when the event is intended to be dismissible.
- Returning to the page must restore usable interaction.
- The underlying document should not be structurally rewritten by the overlay.

## Layout Invariants

- Professional content remains in normal document flow.
- Fixed game UI does not become the only route to professional information.
- The sticky header remains available during ordinary browsing.
- Section anchor destinations account for the sticky header.
- Full-width visual bands preserve the same content alignment as standard sections.
- Footer utility remains reachable at maximum scroll.
- Theme changes may change color and atmosphere but not the page's information hierarchy.

## Success Criteria

The shell is successful when the site still feels readable after the game layer becomes busy. A visitor should be able to mentally separate "the portfolio" from "the systems around the portfolio" even though both belong to the same experience.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
