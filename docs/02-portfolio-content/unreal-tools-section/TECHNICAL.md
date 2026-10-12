# Unreal Tools Section - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Unreal Tools Section > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents the user's Unreal Engine editor plugins and related workflow tools as a browsable portfolio catalog.

> This page is the canonical technical documentation for **Unreal Tools Section** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The section begins:

```html
<section class="section alt"
         id="tools"
         data-scene="tools">
```

Major structures:

- `.filter-bar`
- `.tool-store-note`
- `#tool-grid`
- `.tool-roadmap`
- `.tool-feature-grid`
- `.unreal-resources`
- `.section-action-row`

## Current Public Tool Grid

The v2.78 grid contains 15 cards:

| Tool | State |
| --- | --- |
| Hue | Released, Public |
| Prune | Released, Public |
| Latch | Released, Public |
| Digit | Released, Public |
| Lux | Released, Public |
| Focus | Released, Public |
| Surface | Released, Public |
| Origin | Released, Public |
| Stem | Released, Public |
| Chroma | Released, Public |
| Link | Released, Public |
| Index | Released, Public |
| Sweep | Released, Public |
| Portal | WIP, Public |
| Omni | WIP, Public |

Tool filtering and card structure are documented separately.

## Current Private Roadmap

The roadmap lists:

- Metric
- Unmark
- Static
- Rescue
- Sniff
- Axis
- Aid
- Confine
- Graze
- Badge
- Flow
- Husk

These are static roadmap entries, not filterable public tool cards.

## Feature Integrations

Azure Altar:

- opens a 10-image modal gallery.

Unmark:

- includes an interactive identity button that can award `Unmarked`.

Resources:

- Unreal Source.
- Epic Learning Center.

## External Links

The section includes direct links to the user's GitHub profile and FAB seller page.

All external public destinations use normal anchors and remain usable without JavaScript.

## Section Tracking

`id="tools"` is a major tracked section used by telemetry, Finale engagement, and postgame completion.

## QA

- Test every filter.
- Verify all 15 public cards have the correct visible state.
- Verify WIP cards do not imply FAB availability.
- Verify all released external links.
- Verify Portal and Omni official icons load.
- Open Azure Altar gallery.
- Trigger the Unmark secret.
- Test Unreal Source and Epic Learning Center links.
- Verify the section at desktop and narrow widths.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
