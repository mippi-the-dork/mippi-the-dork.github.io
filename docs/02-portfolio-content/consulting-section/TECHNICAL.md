# Consulting Section - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Consulting Section > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Explains available design consulting services and the types of design problems the user can help solve.

> This page is the canonical technical documentation for **Consulting Section** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The section is:

```html
<section class="section alt"
         id="consulting"
         data-scene="consulting">
```

It contains:

- `.consult-grid`
- four static consulting articles
- `.consult-projects`
- `.consult-title-grid`

## Project Entries

Each project is represented with `.consult-project-item`.

Project identity uses:

```html
<span class="consult-project-name">
```

Actions can contain:

- `.project-state`
- `.project-steam-link`

This allows a project to show status, Steam link, both, or neither.

## External Links

Steam links use:

```html
target="_blank"
rel="noreferrer"
```

There is no JavaScript dependency for the project list.

## Section Tracking

`id="consulting"` is one of the six major section IDs and feeds shared visit telemetry, Finale engagement, and Grand Tour completion.

## Styling

The section uses `.alt` for full-width background treatment while maintaining content-grid alignment.

The consulting services and project list use dedicated grid styling.

Responsive rules collapse grid columns without changing DOM order.

## Maintenance

When updating a consulting project:

1. verify public naming,
2. verify current development status,
3. verify the Steam URL if present,
4. avoid adding private client information,
5. keep the visible project list curated rather than exhaustive.

## QA

- Verify each public Steam link resolves correctly.
- Verify projects without Steam pages do not present dead controls.
- Confirm all four consulting service cards remain readable.
- Confirm Consulting counts as a major-section visit.
- Test narrow viewport wrapping for long project names and action groups.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
