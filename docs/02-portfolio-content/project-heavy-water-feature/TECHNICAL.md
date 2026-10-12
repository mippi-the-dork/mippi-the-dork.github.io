# Project Heavy Water Feature - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Project Heavy Water Feature > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents Project Heavy Water as a featured design project with supporting context and the interactive Perspective Visualizer.

> This page is the canonical technical documentation for **Project Heavy Water Feature** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

Project Heavy Water is represented by:

```html
<div class="featured-project heavy-water" data-project="heavy-water">
```

It contains:

- `.project-visual`
- `.visual-copy`
- `.project-copy`
- `.meta-row`
- `.project-facts`
- nested `.perspective-demo`

## Static Content

The current metadata displayed is:

| Field | Value |
| --- | --- |
| Status | In Development |
| Role | Game Design / Direction |
| Perspective | Second Person |
| Genre | Horror |
| Focus | Navigation, Vulnerability, Tension |

The current implementation does not fetch project data from an API or CMS.

## Perspective Visualizer Dependency

The embedded visualizer uses:

```html
<script defer src="perspective-demo.js?v=2.78"></script>
```

Its two canvases are:

- `#mapCanvas`
- `#viewCanvas`

Mode buttons use `data-mode="1st"`, `"2nd"`, and `"3rd"`.

The visualizer dispatches a custom event:

```text
mippi:perspective-change
```

`script.js` listens for that event to:

- record telemetry,
- count second-person toggles,
- mark meaningful perspective interaction,
- award the `Second Perspective` achievement.

## Styling

Heavy Water uses project-specific visual styling in `style.css`, including layout, project visual treatment, fact rows, and embedded demo spacing.

Responsive CSS collapses the featured project to a single-column presentation at narrower widths.

## Data Notes

`data-project="heavy-water"` provides a stable project identity hook.

`data-dev-note` and `data-design-note` attributes are used by Inspect Mode and Design Mode documentation overlays.

## Failure Behavior

If `perspective-demo.js` fails:

- title and project copy remain present,
- project facts remain readable,
- the surrounding Games section remains navigable.

The interactive canvases may remain inactive, but the project content is not constructed by JavaScript.

## QA

1. Confirm Heavy Water title and facts render before interaction.
2. Switch 1st, 2nd, and 3rd person modes.
3. Confirm the visualizer emits the perspective-change event.
4. Confirm selecting second person can award `Second Perspective`.
5. Confirm the feature remains readable if `perspective-demo.js` is blocked.
6. Test the feature at desktop and narrow breakpoints.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
