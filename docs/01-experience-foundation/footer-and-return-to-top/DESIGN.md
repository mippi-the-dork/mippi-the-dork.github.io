# Footer and Return to Top - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Footer and Return to Top > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides site closure, copyright information, and a safe return-to-top action that avoids collisions with fixed HUD controls.

> This page is the canonical design documentation for **Footer and Return to Top** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The footer is intentionally ordinary.

After a portfolio full of game systems, the last utility interaction should be obvious and dependable. The Return to Top action should behave like a normal web control instead of becoming another secret or minigame.

## Content

The footer contains:

- `© 2026 MIPPI THE DORK // DESIGN SYSTEM // ONLINE`
- `Return to top ↑`

## Return to Top Behavior

The action should:

- move the visitor back to the page top,
- use smooth scrolling,
- work regardless of progression,
- work regardless of active visual theme,
- remain conventional and understandable.

## Fixed UI Clearance

The site now contains multiple fixed controls near the bottom edge.

The footer therefore requires additional bottom breathing room so its text and Return to Top action are not partially covered at maximum scroll.

This clearance is functional, not merely visual polish.

## Design Rules

- Do not place essential progression requirements in the footer.
- Do not hide Return to Top behind the game HUD.
- Keep the utility readable in every rarity theme.
- Preserve enough vertical space for fixed controls on smaller viewports.
- Return to Top should never require JavaScript knowledge or a console command.

## Success Criteria

At maximum scroll, both footer elements should be fully visible and comfortably clickable without being overlapped by fixed screen-space controls.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
