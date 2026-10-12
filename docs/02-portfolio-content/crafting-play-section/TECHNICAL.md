# Crafting Play Section - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Crafting Play Section > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents design frameworks, educational material, and Crafting Play resources as reusable design knowledge.

> This page is the canonical technical documentation for **Crafting Play Section** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The section is:

```html
<section class="section"
         id="crafting"
         data-scene="crafting">
```

The two primary cards are inside:

```html
<div class="card-grid two-up">
```

Both are semantic anchors with `target="_blank"` and `rel="noreferrer"`.

## External Destination

Both current cards point to:

```text
https://crafting-play.vercel.app/
```

The implementation does not fetch Crafting Play content dynamically.

## Card Types

The first card uses:

```text
.work-card.link-card
```

The second uses:

```text
.work-card.handbook-card
```

The handbook card includes a decorative `.book-mark`.

## Section Tracking

`id="crafting"` participates in:

- Primary Navigation.
- section telemetry.
- normal Finale broad engagement.
- postgame Grand Tour.

## Failure Behavior

Because the cards are ordinary anchors:

- the section works without JavaScript,
- external-site failure does not affect the portfolio itself.

## QA

1. Confirm both cards open the intended Crafting Play site.
2. Confirm links open externally.
3. Verify labels distinguish the framework collection from the handbook.
4. Confirm section visit tracking records Crafting.
5. Verify cards stack cleanly at narrow widths.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
