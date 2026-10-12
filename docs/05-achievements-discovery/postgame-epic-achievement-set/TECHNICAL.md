# Postgame Epic Achievement Set - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Postgame Epic Achievement Set > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the nine Epic achievements that formalize the site's true late-game completion goals.

> This page is the canonical technical documentation for **Postgame Epic Achievement Set** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Persistent State

Postgame achievement unlocks use:

```text
mippi-postgame-achievements-v1
```

Historical flags support pre-reveal completion for selected systems.

Examples:

```text
mippi-postgame-cool-maxed-v1
mippi-postgame-castle-complete-v1
mippi-postgame-superboss-v1
mippi-postgame-sections-v1
```

## Evaluation

A postgame evaluator checks each Epic condition against authoritative system state.

When a condition becomes true:

- the Epic achievement is persisted,
- Ledger updates,
- rarity-specific toast can display,
- Legendary capstone is re-evaluated.

## Ordering

The nine Epic achievements have a canonical display order.

Cheat uses that order when selecting the next incomplete Epic target.

## DEV Testing

A full matrix can be constructed with:

```text
dev signals 10
dev cool max
dev legendary
dev wish fixed
dev hearts 5
dev shop complete
dev castle key
dev superboss
```

plus section visits or appropriate state forcing.

## QA

Test each Epic condition independently.

Verify one condition cannot accidentally unlock another unless the systems genuinely overlap.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
