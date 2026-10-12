# Rare Signal Set - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Rare Signal Set > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the original 10 hidden Rare achievements that form the site's first major discovery progression layer.

> This page is the canonical technical documentation for **Rare Signal Set** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Canonical Count

The original Rare set contains:

```text
10 achievements
```

Epic completion checks the size of the unlocked original achievement set against the canonical key list.

## Persistence

Stored in:

```text
mippi-achievements-v2
```

## Canonical Rare Features

The original set maps to:

- Curious Mind
- Second Perspective
- Signal Acquired
- Under Construction
- Ghost in the Machine
- The Whole Story
- Best Boy
- Unmarked
- Classified
- Old Habits

## Rarity Metadata

All original entries use:

```text
rarity: rare
```

and render with Rare-owned Ledger styling regardless of world theme.

## DEV Control

Use:

```text
dev signals <0-10>
```

to force a specific original completion count for QA.

Use:

```text
dev epic
```

to jump directly to the completed Rare state and related Epic systems.

## Regression Risk

Changing the number of original Rare achievements requires updating:

- canonical achievement key list,
- Ledger numbering,
- completion checks,
- Epic unlock,
- progress HUD,
- DEV command assumptions,
- tests.

## QA

Test each Signal naturally once per release candidate, then use DEV commands for repeated state-matrix validation.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
