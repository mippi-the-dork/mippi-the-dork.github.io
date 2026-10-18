# Mippi Bird Extra Lives - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Mippi Bird Extra Lives > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Combines the Shop shield and Mushroom progression to give Mippi Bird additional survivability.

> This page is the canonical design documentation for **Mippi Bird Extra Lives** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Mippi Bird has two Extra Life sources that intentionally behave differently.

This keeps a permanent Shop purchase and a repeatable collectible progression from becoming redundant.

## Shop Extra Life

The Shop item:

`Mippi Bird Extra Life`

provides one shield at the start of every new round.

Properties:

- permanent ownership,
- passive,
- recharges every round,
- absorbs one collision.

It is the reliable safety net.

## Mushroom Extra Lives

Every:

```text
20 Mushroom pickups
```

banks one consumable life.

Properties:

- persistent bank,
- spent permanently when used,
- can accumulate,
- requires repeated site interaction.

It is the earned reserve.

## Consumption Priority

When a hit occurs:

1. Shop shield is consumed first.
2. If no Shop shield remains, one banked Mushroom life is consumed.
3. If neither exists, the run ends.

This protects the rarer consumable bank when the player has purchased the rechargeable Shop item.

## Round Reset

Starting a new Mippi Bird round refreshes the Shop shield if owned.

It does not restore consumed Mushroom lives.

## HUD

The Mippi Bird footer always communicates all three life states:

- Shop shield,
- Mushroom bank,
- progress toward next Mushroom life.

Example:

```text
EXTRA LIVES // SHOP 1 · BANK 2 · SHROOMS 7/20
```

## No Health Bar

Extra Lives do not create a multi-heart health system.

Each life absorbs one discrete collision.

This keeps Mippi Bird mechanically narrow.

## Design Rules

- Shop shield recharges every round.
- Mushroom bank persists across rounds and reloads.
- Shop shield is consumed before Mushroom bank.
- One collision consumes one available life.
- Extra Life use grants brief invulnerability.
- HUD must make source and remaining resources explicit.
- No Extra Life source affects the professional portfolio.

## Success Criteria

The player can immediately understand why they survived a crash and which resource was consumed.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current implementation correction (v3.25.2)

At v3.25.2 the unified LIVES count equals one base Life plus a per-round Life if the permanent Bird item is owned plus purchased banked refill Lives. The fifth valid hit when showing LIVES 5 ends the round. Hearts and Mushrooms no longer add Bird Lives.

Older sections describe historical versions where inconsistent. For the complete transition see [systems integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).
