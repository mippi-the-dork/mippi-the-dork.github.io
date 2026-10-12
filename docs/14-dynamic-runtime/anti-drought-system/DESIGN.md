# Anti-Drought System - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Anti-Drought System > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Creates an extra friendly opportunity after long periods without meaningful ambient activity while preserving the requirement that the player still interact successfully.

> This page is the canonical design documentation for **Anti-Drought System** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Randomness can create dead air.

Even carefully tuned spawn schedules occasionally line up badly:

- player misses an object,
- attention blocks the next one,
- a long random delay rolls,
- the player is actively looking for game-layer activity and sees nothing.

The Anti-Drought system prevents that experience from lasting too long.

## Opportunity, Not Reward

The system never grants:

- Rupees,
- a pickup collection,
- a Wish,
- a Boss kill,
- an achievement.

It only creates one extra legal opportunity.

The player still has to:

- notice,
- click,
- shoot,
- collect,
- react.

This preserves player agency.

## State-Sensitive Threshold

The drought threshold depends on Director state.

A struggling or engaged player should not sit idle as long as a Quiet professional reader.

Current non-Legendary thresholds are approximately:

- Struggling: 45 seconds,
- Engaged: 60 seconds,
- Mastery: 66 seconds,
- Curious: 68 seconds,
- Quiet: 72 seconds.

Legendary has a shorter general threshold here, but Legendary also has a separate stronger opportunity guarantee.

## Professional Respect

The anti-drought system is disabled when Epic gameplay is not unlocked.

A visitor who has not entered the active game layer is not "in drought."

It is also disabled when a focused attention surface is active.

## Recent Meaningful Activity

For non-Struggling, non-Legendary cases, the system can hold off when the player recently performed another meaningful action.

This prevents it from firing simply because there has not been a flying object while the player is already busy doing something interesting.

## Visible Ambient Check

If a relevant flying object is already on screen, drought help is unnecessary.

The system waits.

## Design Rules

- Epic progression required.
- Easy Mode does not need drought help.
- No help while attention is blocked.
- No help while an ambient target is already visible.
- Threshold varies with current pacing state.
- Extra opportunity never counts as automatic success.
- Recent meaningful activity can delay help.
- The assist should be rare enough to remain invisible as a system.

## Success Criteria

An engaged player does not spend an unreasonable amount of time waiting for the site to give them something interactable.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
