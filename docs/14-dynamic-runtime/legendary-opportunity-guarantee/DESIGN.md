# Legendary Opportunity Guarantee - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Legendary Opportunity Guarantee > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Prevents Legendary gameplay from entering dead air by forcing a legal ambient opportunity after a short calm gap.

> This page is the canonical design documentation for **Legendary Opportunity Guarantee** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Legendary progression changes the player's expectations.

By the time the player has:

- completed all Rare Signals,
- unlocked Epic,
- caught a Shooting Star,
- repaired the Blueprint,
- made a validated Wish,
- unlocked Legendary,

the site has explicitly taught them that the world is now highly interactive.

At that point a long empty screen feels broken rather than mysterious.

The Legendary Opportunity Guarantee enforces a stronger pacing promise:

> If Legendary is unlocked, the screen is calm, and no ambient target is visible, the site should give you something to do very soon.

## Difference from Anti-Drought

Anti-Drought is subtle pacing support measured in tens of seconds.

Legendary Guarantee is a hard late-game anti-dead-air rule measured in a few seconds.

The two solve different problems.

## Target Delay

The current idle threshold is roughly:

```text
2.6 seconds
```

when all qualifying conditions are true.

This is intentionally aggressive.

Legendary is the high-activity late-game state.

## Legal Opportunity Priority

The system does not force one specific object.

It tries to create something legal in the current state.

Possible priorities include:

- Shooting Star when a Wish can be charged,
- Doug Bone when Doug is in command,
- standard pickup,
- regular UFO when arcade state allows it.

The first successful legal option wins.

## No Stacking

If an ambient object is already visible, the guarantee does nothing.

That visible object counts as current opportunity.

## Attention Respect

The guarantee does not break focused UI.

No guaranteed pickup should fly behind:

- the Shop,
- a Wish sequence,
- the Finale,
- Mippi Bird,
- the Dev Console,
- other attention-owning surfaces.

## Reduced Motion

The guarantee is disabled under reduced-motion policy.

It should not fight an accessibility choice by forcing moving objects back onto the screen.

## Visual Theme Independence

The guarantee checks Legendary gameplay progression.

It does not require the player to currently display the Legendary visual theme.

A player can use Rare presentation and still receive late-game Legendary pacing.

## Design Rules

- Require Legendary progression.
- Respect reduced motion.
- Respect attention budget.
- Do nothing while an ambient target already exists.
- Wait about 2.6 seconds of real empty opportunity state.
- Spawn one legal opportunity.
- Do not auto-complete or collect it.
- Theme choice does not disable the guarantee.

## Success Criteria

Legendary gameplay never appears to have gone dormant simply because several independent ambient timers happened to roll long delays.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
