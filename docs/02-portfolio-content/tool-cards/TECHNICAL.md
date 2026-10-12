# Tool Cards - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Tool Cards > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Presents each Unreal plugin with identity, status, links, and consistent iconography.

> This page is the canonical technical documentation for **Tool Cards** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Standard Card Structure

Cards use:

```html
<article class="tool-card" data-status="released public">
```

Common children include:

- `.tool-main-link`
- `.tool-icon`
- `.tool-state`
- tool `<strong>`
- purpose `<small>`
- `.tool-fab-cta`
- `.tool-github-link`

GitHub-only released cards add:

```text
.github-only
```

and can include `.tool-secondary-disabled`.

Public WIP cards add:

```text
.wireframe
```

## Current Tool Icons

Icons are local assets under:

```text
assets/tool-icons/
```

Examples include:

- `hue.png`
- `prune.png`
- `latch.png`
- `digit.png`
- `lux.png`
- `focus.png`
- `surface.png`
- `origin.png`
- `stem.png`
- `chroma.png`
- `link.png`
- `index.png`
- `sweep.png`
- `portal.png`
- `omni.png`

## Status Tokens

Filtering uses the space-separated `data-status` value.

Do not change visible status copy without also verifying the machine-readable tokens remain correct.

## External Link Security

External anchors use:

```html
target="_blank"
rel="noreferrer"
```

Some cards use FAB as the primary full-card link and GitHub as a secondary link.

GitHub-only cards use GitHub as the main link and show noninteractive FAB Coming Soon text.

## Accessibility

Tool icons generally use empty alt text because the card already contains the tool name as readable text.

Main links for some cards have explicit `aria-label` values.

The meaningful identity is conveyed through text, not icon alone.

## Filter Dependency

Every card in `#tool-grid` is collected by the Tool Filtering system.

Adding a card requires a valid `data-status`.

## Maintenance Checklist

For a new or updated tool card:

1. add or update local icon asset,
2. verify tool name,
3. verify short purpose copy,
4. verify public state tokens,
5. verify visible state label,
6. verify GitHub link,
7. verify FAB link if released there,
8. verify filter behavior,
9. verify keyboard focus and hover states.

## QA

Use each filter and visually inspect every card. Then tab through the grid and confirm all live links are reachable in a logical order.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
