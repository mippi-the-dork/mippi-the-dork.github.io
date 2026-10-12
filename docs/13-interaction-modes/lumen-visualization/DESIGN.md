# Lumen Visualization - Design Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Lumen Visualization > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides a deliberately unstable faux Lumen lighting visualization with screen-space light and dark artifacts.

> This page is the canonical design documentation for **Lumen Visualization** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Lumen Visualization is an Unreal joke disguised as a debug view.

It does not attempt to reproduce Unreal Engine's real global-illumination visualization.

Instead, it exaggerates the feeling of unstable lighting:

- bright regions breathe,
- dark regions drift,
- parts of the field disappear,
- hot areas flare,
- turning it off can produce the classic warning:
  - `LIGHTING MUST BE REBUILT`.

The mode belongs in the Console's Unreal category because the audience recognizes the reference immediately.

## Why Faux Rather Than Accurate

The website has no real Lumen scene data.

Pretending the overlay is a technical renderer would be misleading.

The feature is deliberately theatrical.

Its Console output even reports:

`sample quality questionable`.

The mode should look like a debug visualization while remaining obviously playful.

## Screen-Space Model

The visualization lives in a fixed layer over the page.

It does not:

- relight DOM elements,
- change Three.js light calculations,
- alter image assets,
- change actual browser rendering.

This keeps the effect reversible and cheap.

## Instability

The layer contains many large blurred light and dark blobs.

Each blob independently changes state over time.

It can:

- disappear briefly,
- become hotter/brighter,
- resume breathing.

The randomness is part of the joke.

## Theme Treatment

Light regions adapt to site rarity:

- Rare: cool blue,
- Epic: purple,
- Legendary: warm amber.

Legendary dark blobs become slightly warmer/darker to match the page.

The mode remains recognizable regardless of theme.

## Shutdown Warning

Turning Lumen off after it was active triggers:

`LIGHTING MUST BE REBUILT`

for roughly 4.2 seconds.

This is pure flavor.

The page is not actually invalidated.

## Runtime Nature

Lumen Visualization is not persistent.

A reload restores normal presentation.

## Design Rules

- Never imply it is real lighting analysis.
- Keep the effect pointer-transparent.
- Theme light blobs with world rarity.
- Random cuts and hot states create instability.
- Turning off triggers the rebuild warning.
- Mode does not alter layout or progression.
- Reload must return to normal.

## Success Criteria

An Unreal developer immediately gets the joke, while everyone else can still understand that this is a reversible visualization toy.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
