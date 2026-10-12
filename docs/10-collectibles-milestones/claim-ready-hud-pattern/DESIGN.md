# Claim-Ready HUD Pattern - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Claim-Ready HUD Pattern > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the consistent glowing HUD behavior used when a completed meter is waiting for an explicit player claim.

> This page is the canonical design documentation for **Claim-Ready HUD Pattern** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Claim-ready HUD is a reusable player-agency pattern.

It exists for milestones where:

- progress is complete,
- a larger reward is waiting,
- automatically firing the reward could interrupt something else.

The meter becomes the claim button.

Current users:

- Full Hearts,
- Castle completion.

## State Model

A claimable meter has three broad phases.

### Progressing

The meter is visible but passive.

It cannot be clicked.

### Claim Ready

The meter:

- becomes enabled,
- glows,
- pulses,
- changes text where useful,
- updates tooltip and accessible label.

### Claimed / Reset

The reward resolves and the meter either:

- remains as completed history, as with Hearts,
- resets for a repeatable loop, as with Castles.

## Why Disabled Buttons

Hearts and Castles are implemented as buttons even while they are still passive.

This lets the same DOM element become interactive without replacing it at completion.

CSS explicitly preserves normal visual weight for disabled meter state.

## Visual Language

The pattern follows active world rarity.

### Rare

Blue/cyan glow, with feature-specific semantic accent allowed.

### Epic

Hot pink/violet/cyan.

### Legendary

Gold/teal.

The glow is intentionally stronger than ordinary HUD animation because it communicates immediate action.

## Feature-Specific Identity

Shared pulse does not mean identical meters.

Hearts use a pink Heart accent at Rare.

Castles use cyan/white.

The shared pattern is:

- actionable pulse,
- enabled state,
- claim copy,
- accessible communication.

## Attention Philosophy

Claim-ready is a strong but local cue.

It should not open anything automatically.

This makes it compatible with the larger attention-budget philosophy.

The player can finish a Boss fight, close a Wish, or finish reading before clicking the reward.

## Design Rules

- Only completed actionable meters pulse.
- Disabled progressing meter stays visually readable.
- Claim readiness is derived from feature state.
- Tooltip and ARIA change with state.
- Theme parity is required.
- Reward does not auto-open.
- Claim removes or changes attention state immediately.
- The pattern should be reused for future progress meters with interruptive rewards.

## Success Criteria

The player intuitively understands:

> This meter was progress before. Now it is ready for me to click.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
