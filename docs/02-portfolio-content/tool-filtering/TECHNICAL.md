# Tool Filtering - Technical Documentation

**Hierarchy:** Documentation Home > Portfolio Content and Professional Presentation > Tool Filtering > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets visitors filter the Unreal Tools catalog by meaningful states such as released and work-in-progress tools.

> This page is the canonical technical documentation for **Tool Filtering** within the Portfolio Content and Professional Presentation category.

## Documentation Relationship

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
## Markup

The filter bar is:

```html
<div class="filter-bar"
     role="group"
     aria-label="Filter Unreal tools">
```

Each filter is a button with `data-filter`.

Current values:

```text
all
released
wip
public
private
```

Tool cards expose status tokens through `data-status`.

Examples:

```html
data-status="released public"
data-status="wip public"
```

## JavaScript

At startup:

```js
const filters = [...document.querySelectorAll('.filter')];
const tools = [...document.querySelectorAll('.tool-card')];
```

On click:

1. read `button.dataset.filter`,
2. record filter telemetry,
3. toggle `.active` so only the selected button is active,
4. split each card's `data-status` on spaces,
5. toggle `.hidden` unless the card matches or selected filter is `all`.

Core logic:

```js
const states = card.dataset.status?.split(' ') ?? [];
card.classList.toggle(
  'hidden',
  selected !== 'all' && !states.includes(selected)
);
```

## Achievement Hook

A second click listener checks:

```js
if (button.dataset.filter === 'wip')
  showAchievement('wip');
```

This awards `Under Construction`.

## Telemetry

Filter selection records:

- `portfolio.filters`
- meaningful event `tool_filter`

## Current Data Limitation

The public tool grid currently contains released/public and wip/public cards.

There are no `private` `.tool-card` entries in the main grid in v2.78. Private WIP concepts are represented separately in `.tool-roadmap`.

As a result, selecting `Private` may produce an empty main grid. This is consistent with the current data model, although future design may choose to integrate roadmap items.

## QA

1. All shows every public-grid card.
2. Released shows all released cards and hides Portal/Omni.
3. WIP shows Portal and Omni and awards `Under Construction`.
4. Public shows all current cards.
5. Private reflects current data accurately.
6. Rapidly switch filters and verify no stale `.hidden` state.
7. Verify active-button styling follows the selected filter.
## Related Documentation

- [Portfolio Content and Professional Presentation Index](../README.md)
- [Design Documentation](DESIGN.md)
