# Music Player Header Placement - Design Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Music Player Header Placement > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Anchors the postgame Music Player directly below the sticky header and aligns its left edge with the Mippi logo/header content inset.

> This page is the canonical design documentation for **Music Player Header Placement** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Music Player originally lived near the bottom-right system controls.

That placement became crowded.

The lower screen already contains:

- progression HUD,
- mode controls,
- Hint,
- Dev Console discovery,
- Optional Objectives,
- transient notifications.

The final v2.78 direction moves Music into the header.

This makes it feel like a persistent site utility rather than another gameplay control.

## Header Relationship

The player sits directly beneath the sticky header.

It visually travels with the header/navigation.

As the page scrolls, the sticky header remains the anchor.

The player does not float independently at the bottom of the viewport.

## Horizontal Alignment

The left edge is intended to align with the left edge of the square Mippi logo container.

This was specifically corrected after an earlier pass aligned the player closer to the `MIPPI THE DORK` text block.

The final target is:

> logo square left edge

not:

> brand text left edge.

The implementation uses the same responsive horizontal content-inset expression as the header.

## Vertical Anchor

The top edge is fixed to the bottom of the header.

Expanded content grows downward.

This is important.

The player should not jump upward or move its title bar when expanded.

The header/title remains visually anchored.

## Mobile

On narrow screens the player spans the available width with small left/right margins.

This avoids trying to preserve a narrow desktop panel when the viewport can no longer support it.

## Stacking

The Music Player lives inside the header DOM.

The header explicitly allows overflow so the expanded player can extend below it.

Its local stacking level keeps it above ordinary page content without competing with the much higher Finale overlay.

## Legacy CSS

The stylesheet still contains older generic `.music-player` fixed bottom-right declarations from the earlier design.

The more specific:

```text
.site-header > .music-player
```

rules override them for the actual v2.78 markup.

Documentation and future maintenance should treat the header-specific rules as authoritative.

## Design Rules

- Music belongs to sticky header.
- Top edge anchors to header bottom.
- Expansion grows downward only.
- Left edge aligns with Mippi logo/header content inset.
- Do not align to brand text.
- Do not return Music to bottom-right control strip.
- Header overflow must remain visible.
- Mobile can use full available width.

## Success Criteria

The Music Player feels attached to the site identity/navigation layer and never competes with the lower gameplay HUD cluster.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
