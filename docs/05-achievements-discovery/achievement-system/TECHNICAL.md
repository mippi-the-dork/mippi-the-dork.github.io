# Achievement System - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Achievement System > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tracks achievement state, unlock behavior, persistence, rewards, and presentation across all rarity tiers.

> This page is the canonical technical documentation for **Achievement System** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## State Ownership

The original Rare achievement set is stored persistently in:

```text
mippi-achievements-v2
```

The runtime loads these into an in-memory collection:

```js
unlockedAchievements
```

Postgame achievement state is stored separately so the original discovery tier and the post-Finale completion tier can evolve independently.

## Primary Postgame Keys

Current postgame keys include:

```text
mippi-postgame-achievements-revealed-v1
mippi-postgame-achievements-v1
```

Related historical completion keys include:

```text
mippi-postgame-sections-v1
mippi-postgame-cool-maxed-v1
mippi-postgame-castle-complete-v1
mippi-postgame-superboss-v1
```

## Original Achievement Count

The Rare tier contains 10 canonical achievement keys.

Epic visual unlock checks:

```js
unlockedAchievements.size === ACHIEVEMENT_KEYS.length
```

This makes original achievement completion an authoritative progression condition.

## Unlock Flow

The general unlock path:

1. feature interaction detects qualifying behavior,
2. `showAchievement(key)` or equivalent unlock helper runs,
3. duplicate unlock is ignored,
4. persistent achievement state is updated,
5. achievement toast is populated,
6. Ledger state is refreshed,
7. progression checks are re-run,
8. telemetry can record the unlock.

## Duplicate Safety

Achievements should be idempotent.

Triggering the same condition again must not:

- duplicate persistent entries,
- replay unlock progression,
- corrupt counts,
- unlock Epic twice.

A toast may or may not replay depending on the caller, but authoritative achievement state remains singular.

## Rarity Data

Achievement presentation includes rarity metadata.

Rare:

```text
rarity-rare
```

Epic:

```text
rarity-epic
```

Legendary:

```text
rarity-legendary
```

Rarity-owned styling is independent of the active page theme.

## Derived Progression

Original Rare completion feeds:

- Epic theme availability,
- Epic gameplay state,
- postgame `Signal Saturation`,
- overall progress UI.

Postgame Epic completion feeds:

- Legendary capstone check.

Legendary capstone feeds:

- Music Player unlock.

## Reset

The public reset clears all keys beginning with:

```text
mippi
```

Therefore original and postgame achievement stores are erased together.

## DEV Support

Useful commands include:

```text
dev signals <0-10>
dev epic
dev legendary
dev finale ready
dev finale play
dev cool max
dev hearts 5
dev shop complete
dev castle key
dev superboss
```

These commands exist to test achievement state quickly without needing a full natural playthrough.

## QA

- unlock each original Rare achievement,
- reload after each,
- confirm persistence,
- verify 10/10 unlocks Epic,
- complete each postgame Epic requirement independently,
- verify capstone stays locked until all nine plus Finale,
- unlock capstone,
- confirm Music Player unlock,
- full reset,
- verify all achievement tiers return to starting state.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
