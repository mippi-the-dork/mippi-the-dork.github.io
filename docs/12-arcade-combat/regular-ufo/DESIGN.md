# Regular UFO - Design Documentation

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Regular UFO > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the baseline hostile arcade target and begins the site's invasion escalation loop.

> This page is the canonical design documentation for **Regular UFO** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The regular UFO is the baseline hostile interaction in the arcade layer.

It starts as something visually similar to the site's other airborne curiosities, then reveals that the portfolio can fire back.

One UFO is a small interruption.

Repeated UFOs become an invasion arc.

## One-Hit Target

A regular UFO is destroyed by one valid collection or combat interaction.

This keeps the basic target readable.

The challenge comes from:

- noticing it,
- avoiding hostile fire,
- increasing threat tier,
- building toward the Boss.

The normal UFO does not need its own health bar.

## Threat Tiers

The current ten-contact cycle has three pressure tiers.

### Tier 1

Early-cycle contact.

Uses basic single-shot behavior and the longest average flight.

### Tier 2

Mid-cycle contact.

Fires more frequently and can add a follow-up shot.

### Tier 3

Late-cycle contact.

Has a hotter presentation, shorter flight, more aggressive cadence, and stronger follow-up behavior.

The threat increase makes the tenth kill feel like a built encounter rather than ten identical random targets.

## Escalation Messaging

The player receives additional feedback during the cycle.

Around the midpoint, the site explicitly warns that hostile response is increasing.

Later in the cycle, it warns that something larger is paying attention.

The Invasion meter provides the persistent version of this information.

## Rupee Relationship

Regular UFO kills have a 30 percent chance to award:

```text
1 Rupee
```

This connects arcade play to the Shop without making every UFO a guaranteed currency farm.

## Star Power

Star Power can destroy a regular UFO through cursor contact.

The first discovery produces the `Star Power + UFO` system-combo acknowledgement.

## Legendary Combat

Legendary cursor targeting can acquire regular UFOs like other airborne targets.

This provides a second late-game interaction style.

## Escape

If the UFO completes its flight:

- it counts as escaped,
- it does not increment the kill cycle,
- it removes itself,
- no player penalty is applied.

## Design Rules

- One successful hit destroys a regular UFO.
- Threat tier rises through the current ten-kill cycle.
- Regular kills are the primary path to Boss contact.
- 30 percent Rupee reward chance.
- Escape carries no currency or progression loss.
- Star Power and Legendary combat use the same underlying kill route.
- Regular UFOs remain optional and ignorable.

## Success Criteria

Regular UFOs establish the arcade vocabulary quickly while repeated kills clearly increase pressure toward a larger encounter.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
