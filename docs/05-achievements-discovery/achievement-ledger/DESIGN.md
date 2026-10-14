# Achievement Ledger - Design Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Achievement Ledger > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Displays discovered and undiscovered achievements with rarity-owned styling, hints, progress, and postgame additions.

> This page is the canonical design documentation for **Achievement Ledger** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Achievement Ledger is the persistent reference surface for the discovery game.

It should feel like a game system without making the player forget they are still inside a portfolio.

The Ledger answers:

- how many Signals have been found,
- what is still hidden,
- what each discovered achievement was,
- what postgame completion goals remain,
- which rarity each achievement belongs to.

## Initial State

Before postgame reveal, the Ledger focuses on the 10 Rare Signals.

Locked Rare entries should preserve mystery.

They can show:

- `???`,
- a hint,
- an undiscovered state.

The Ledger should not simply spoil every secret from the beginning.

## Postgame State

After the normal Finale, the Ledger expands.

The new tier appears at the top.

It introduces:

- nine Epic achievements,
- one Legendary capstone.

This intentionally reframes the experience after the player thought they had reached an ending.

## Ordering

Postgame achievements appear above the original Rare tier.

This communicates:

> these are now the current goals.

Rare remains below as the historical discovery layer.

## Rarity Ownership

The Ledger frame follows the active site theme.

Individual achievement rows keep their own rarity colors:

- Rare blue,
- Epic purple/pink,
- Legendary gold/teal.

Each row also labels rarity in text.

## Locked Epic Goals

Epic achievements can be more explicit than Rare Signals because the player has already demonstrated broad system knowledge.

The Ledger should communicate meaningful mastery goals without requiring the player to rediscover the whole rule set from scratch.

## Legendary Capstone

The Legendary achievement remains the clearest expression of total completion.

It should visibly sit above the Epic tier and remain locked until all required conditions are met.

## Player Agency

Opening the Ledger is voluntary except for the one-time post-Finale reveal, where it is intentionally opened to show that the experience has expanded.

After that reveal, the player remains in control.

## Design Rules

- Locked Rare entries preserve mystery.
- Found entries become explicit.
- Rarity is visible through both color and text.
- Postgame goals appear only after reveal.
- Legendary remains clearly distinct from Epic.
- The Ledger should remain readable in every global theme.
- The frame follows world theme, rows follow item rarity.

## Success Criteria

The Ledger gives enough information to continue progression without turning the entire discovery experience into a spoiler list.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)


## Current Release Note (v2.89)

v2.82 preserves Rare/Epic/Legendary colors on achievement items independently of world theme. v2.84 keeps Ledger button hidden until first Signal or postgame reveal. v2.85 enables wheel scrolling while hovering the Ledger, without requiring a click first.
