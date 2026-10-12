# Castle Claim State - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Castle Claim State > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Makes the Castles HUD pulse at 4 out of 4 and waits for the player to click it before firing the completion reward.

> This page is the canonical design documentation for **Castle Claim State** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Castle claim follows the same player-agency rule as Full Hearts.

Completing the progression meter should not immediately interrupt the player.

Instead, the completed meter becomes the action.

## Transition

At the fourth Castle check:

- progress reaches 4/4,
- a completion toast appears,
- Console says reward is ready,
- Castle meter displays `CLAIM`,
- meter pulses,
- meter becomes clickable.

The player chooses when to fire the reward.

## Why Explicit Claim

The fourth Castle can be found while the player is:

- reading a section,
- fighting a UFO,
- following a Wish sequence,
- interacting with another HUD system.

Immediate fireworks and currency feedback could compete with that moment.

The claim-ready state gives the payoff a clean timing boundary.

## Reward Preview

The tooltip explicitly tells the player what clicking will do:

- fireworks,
- 3 Rupees.

Unlike a secret achievement, there is no reason to hide the reward at this stage.

## Persistence

4/4 claim readiness survives reload.

The meter derives the state from persistent Castle run progress.

## Design Rules

- 4/4 never auto-fires fireworks.
- Meter changes value text to CLAIM.
- Meter becomes enabled only at completion.
- Claim state survives reload.
- After claim, meter resets.
- Theme-specific pulse matches Heart claim pattern.

## Success Criteria

The player can immediately see that the Castle run is complete and can choose the exact moment to collect its payoff.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
