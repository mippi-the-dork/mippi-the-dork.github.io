# Developer Resource Links - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Developer Resource Links > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Highlights Unreal Source and Epic learning resources as recommended external destinations for Unreal developers.

> This page is the canonical technical documentation for **Developer Resource Links** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The resources container is:

```html
<div class="unreal-resources">
```

It contains:

- `.resource-intro`
- `.resource-card.unreal-source-card`
- `.resource-card.epic-learning-card`

## Unreal Source Card

The logo currently loads from an external URL on `unrealsource.com`.

Actions:

- Visit Website
- Join Discord

Both use `_blank` and `rel="noreferrer"`.

## Epic Learning Card

The Epic card uses a local text-based `UE` mark instead of an externally loaded logo.

Actions:

- Explore Curated Learning
- Learn Unreal

## External Dependency Note

The Unreal Source logo is externally hosted.

If the image fails:

- the card text and links remain usable,
- only the logo presentation is lost.

If a fully self-contained deployment is desired, mirror an approved local version of the logo and update the asset reference.

## Link Maintenance

External resource URLs should be validated during release QA.

The `learn.unrealengine.com` link is currently written using `http://` in the v2.78 HTML and may redirect. A future cleanup can normalize it to the preferred canonical HTTPS destination once confirmed.

## Telemetry

General external-link interactions can be captured by shared portfolio telemetry where applicable, but these cards do not own unique progression state.

## QA

1. Load Unreal Source card with network access.
2. Block external images and confirm card remains usable.
3. Test website and Discord actions.
4. Test Epic curated learning link.
5. Test Learn Unreal link and inspect redirects.
6. Verify keyboard focus styling.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
