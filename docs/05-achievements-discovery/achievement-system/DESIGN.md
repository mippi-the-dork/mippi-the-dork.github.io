# Achievement System - Design Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Achievement System > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tracks achievement state, unlock behavior, persistence, rewards, and presentation across all rarity tiers.

> This page is the canonical design documentation for **Achievement System** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Achievement System is the connective tissue between the professional portfolio and the hidden game layer.

Its job is not to turn ordinary browsing into a checklist immediately.

Instead, it rewards curiosity after the visitor has already discovered that the page contains more than static content.

The system progresses through three rarity tiers:

- Rare
- Epic
- Legendary

Each tier serves a different role.

## Rare Tier

The original 10 achievements are hidden Signals.

They reward discovery of interactions that already make sense in the portfolio:

- clicking Mippi,
- using the Perspective Visualizer,
- using Hero navigation,
- filtering Unreal tools,
- noticing an ambient signal,
- opening the Long resume,
- interacting with Doug,
- interacting with Unmark,
- finding the NDA secret,
- entering the Konami sequence.

Rare achievements teach the player how the site thinks.

## Epic Tier

The nine postgame Epic achievements are completion goals.

They are not hidden in the same way.

They convert the player's broad understanding of the site into a visible mastery checklist after the normal Finale.

Epic goals include:

- all Rare Signals,
- maximum Coolness,
- Legendary unlock,
- validated Wish,
- five Hearts,
- Shop completion,
- four Castles,
- all six portfolio sections,
- Super Boss defeat.

## Legendary Tier

`100 Percent Complete` is the capstone.

It requires:

- all nine Epic achievements,
- and the Finale having been viewed.

The reward is the Music Player.

## Discovery Philosophy

The first tier should feel mysterious.

The second tier should feel intentional.

The third tier should feel definitive.

This creates a progression from:

`I found something`

to:

`I understand the systems`

to:

`I finished the experience`.

## Locked Presentation

Undiscovered achievements should not reveal their title immediately when they are still meant to be secrets.

The Rare tier uses hidden names and hints.

Postgame achievements can be clearer because the player has already completed the normal ending and is now choosing whether to continue toward mastery.

## Persistence

Earned achievements should survive reloads.

A player should not need to rediscover the same Signal every visit.

The only intended way to erase achievement progression is the full reset flow.

## Reward Philosophy

Achievements can unlock:

- visual rarity,
- new progression systems,
- postgame goals,
- true completion reward.

They should not gate professional content.

## Design Rules

- Professional content remains available without achievements.
- Rare achievements reward useful or thematic interactions.
- Epic achievements represent mastery, not random secrets.
- Legendary completion requires visible broad engagement.
- Achievement unlocks are persistent.
- Achievement toasts should celebrate without interrupting control.
- The Ledger should always distinguish locked, found, and rarity state.
- Theme choice does not alter earned achievement state.

## Success Criteria

The achievement system succeeds when a visitor can ignore it entirely, partially engage with it, or fully complete it without the professional site becoming less usable.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
