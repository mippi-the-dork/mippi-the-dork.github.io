# Mippi Bird Extra Life - Design Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Mippi Bird Extra Life > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** An Epic passive item that gives each Mippi Bird round a rechargeable hit shield.

> This page is the canonical design documentation for **Mippi Bird Extra Life** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Mippi Bird Extra Life makes the minigame more forgiving without removing its core failure state.

It acts as one free impact shield per new round.

The player still has to play.

They simply get one mistake.

## Per-Round Behavior

At the start of every Mippi Bird round:

- Shop shield is available if the item is owned.

On the first collision:

- the shield is consumed,
- the run continues,
- Mippi becomes briefly invulnerable,
- the player receives visible feedback.

The shield is restored on the next new round.

## Relationship to Mushroom Lives

The game has two Extra Life sources.

Priority is:

1. Shop shield,
2. banked Mushroom life.

This means the permanent Shop item protects the player's rarer banked lives.

## Rechargeable Meaning

"Rechargeable" means:

- once per new round.

It does not recharge during the same run.

## Passive

The item is permanently active when owned.

It does not use the gameplay slot.

## Cost

```text
4 Rupees
```

## Design Rules

- One Shop shield per round.
- Shop shield consumed before Mushroom bank.
- Temporary invulnerability after hit.
- New round restores Shop shield.
- Ownership persists.
- No manual equip.

## Success Criteria

The minigame becomes noticeably more approachable while still preserving meaningful failure and Mushroom progression.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current implementation correction (v3.25.2)

**Current design (v3.25.2).** The permanent Mippi Bird Shop upgrade adds **one Life to each new round**. One Life permits one future valid collision; no free extra hit exists after the counter reaches zero. The separate repeatable refill adds one **banked** Life, which is consumed as required and does not regenerate between rounds. Mippi Bird displays one LIVES counter, not Shields and Spare Lives.

For historical evolution and superseded rules see [v3.15–v3.25.2 Systems Integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md). Older sections above may describe the original implementation baseline; this section is the current release-specific override.
