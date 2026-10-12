# Unmark Feature Presentation - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Unmark Feature Presentation > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents Unmark as a documentation-focused Unreal tool and hosts the Unmarked discovery interaction.

> This page is the canonical technical documentation for **Unmark Feature Presentation** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The feature is:

```html
<div class="tool-feature unmark-feature">
```

Its visual identity is:

```html
<button class="tool-feature-visual unmark-visual unmark-secret"
        type="button"
        aria-label="Unmark project identity">
  <img class="unmark-lockup unmark-lockup-clean"
       src="assets/unmark/unmark-logo.png"
       alt="Unmark, Markdown for Unreal Engine" />
</button>
```

## Achievement Hook

`script.js` registers:

```js
document.querySelector('.unmark-secret')
  ?.addEventListener('click', () => showAchievement('unmark'));
```

This awards the `Unmarked` Rare achievement.

## Status Content

The current feature status is rendered as:

- IN DEVELOPMENT
- Private repository
- FAB + GitHub at release

These are static HTML values and must be updated manually when release status changes.

## Asset

The lockup is local:

```text
assets/unmark/unmark-logo.png
```

The image has meaningful alt text because the logo itself communicates the project identity.

## Interaction Semantics

The visual is a real button rather than adding a click handler to a decorative `div`.

This supports keyboard activation automatically.

## Relationship to Tool Filtering

The larger Unmark feature is outside `#tool-grid`.

It is not affected by Released/WIP/Public/Private filters.

The roadmap separately includes a compact private WIP Unmark entry.

## QA

- Verify logo asset loads.
- Verify button is keyboard reachable.
- Click and press Enter/Space to trigger `Unmarked`.
- Confirm the feature remains visible under every tool filter.
- Confirm no private repository URL appears.
- Verify status copy remains accurate before each public release.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
