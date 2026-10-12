# Full Hearts Claim State - Design Documentation

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Full Hearts Claim State > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Makes the Hearts HUD pulse at 5 out of 5 and requires the player to click the meter before the reward is granted.

> This page is the canonical design documentation for **Full Hearts Claim State** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The original Heart reward behavior automatically interrupted the player as soon as 5/5 was reached.

The claim-ready version improves player agency.

The player still receives clear completion feedback, but the reward waits until they deliberately click the completed meter.

## State Change

At 5/5, the Hearts HUD changes from passive progress display into an actionable button.

The meter:

- pulses,
- glows,
- becomes enabled,
- updates its accessible label,
- updates its tooltip,
- waits for click.

## Communication

The fifth Heart produces immediate feedback:

`FULL HEARTS`

and:

`The HEARTS panel is ready. Click it to claim the reward.`

This is important because the meter had previously been noninteractive.

The player needs to understand that its role changed.

## Why Explicit Claim

Claiming should happen when the player is ready.

The reward opens a focused community popup.

Allowing the player to finish what they are currently doing prevents:

- interruption during combat,
- interruption during reading,
- overlap with another authored event.

## Persistence

Claim readiness survives reload.

The state is derived from:

- Heart count is five,
- reward has not been claimed.

It is not stored as a separate CSS-state key.

## Design Rules

- Fifth Heart never auto-opens reward.
- Completed meter becomes a real action.
- State must remain obvious.
- The meter returns to normal completed presentation after claim.
- Claim readiness is derived from authoritative state.
- Theme-specific pulse remains readable in Rare, Epic, Legendary.

## Success Criteria

The player notices completion immediately but retains control over when the reward takes over attention.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
