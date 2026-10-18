# Achievement Ledger - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Achievement Ledger > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Displays discovered and undiscovered achievements with rarity-owned styling, hints, progress, and postgame additions.

> This page is the canonical technical documentation for **Achievement Ledger** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Rendering Model

The Ledger is generated from achievement metadata rather than being fully hard-coded row by row in HTML.

A helper similar to:

```js
ledgerEntryMarkup(...)
```

builds each row.

## Row Classes

Rows use semantic rarity classes:

```text
ledger-entry rarity-rare
ledger-entry rarity-epic
ledger-entry rarity-legendary
```

## Tier Headers

Rarity groups use tier headers:

```text
ledger-tier-head rare
ledger-tier-head epic
ledger-tier-head legendary
```

## Locked State

Locked achievements render with undiscovered presentation.

For Rare entries this includes hidden title treatment and hint text.

Unlocked entries render their actual title and completed styling.

## Postgame Reveal Gate

Postgame achievement content is hidden until the persistent reveal flag is set:

```text
mippi-postgame-achievements-revealed-v1
```

The reveal is triggered after the normal Finale exit path.

## Persistent State

Rare unlock state:

```text
mippi-achievements-v2
```

Postgame unlock state:

```text
mippi-postgame-achievements-v1
```

The Ledger merges those two logical groups for display.

## Theme Isolation

The Ledger outer chrome can use body-theme selectors.

Rows use local rarity selectors with sufficient specificity to resist world-theme recoloring.

## Progress Summary

The Ledger can display counts such as original Signal completion and postgame progress.

Count logic should derive from authoritative sets rather than parsing visible DOM.

## Re-render Triggers

The Ledger should refresh when:

- an achievement unlocks,
- postgame tier is revealed,
- progression changes affect an Epic condition,
- reset occurs through full page reload.

## QA

- open at 0/10 Rare,
- verify locked mystery state,
- unlock one Rare,
- verify only that row reveals,
- complete 10/10,
- run Finale,
- wait for postgame reveal,
- verify Epic and Legendary tiers appear,
- change global theme,
- verify row rarity colors remain stable.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.89 Technical Supersession

v2.82 Rare blue/Epic purple/Legendary gold remains rarity-owned under Legendary world theme. v2.84 Ledger trigger only visible after first Rare Signal/postgame reveal and now uses centered inline SVG trophy. v2.85 hover wheel scrolling works without prior focus, with page scrolling allowed when the Ledger reaches its limit.

See [Release History](../../RELEASE_HISTORY.md).


## Current implementation correction (v3.25.2)

Current icon markup is keyed to achievement metadata and shared across the Ledger and notifications. `epicGameplayUnlocked()` still requires all ten original Rare achievements; the equipped Insert Coin early-combat permission does not change achievement state.

Older sections describe historical versions where inconsistent. For the complete transition see [systems integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).
