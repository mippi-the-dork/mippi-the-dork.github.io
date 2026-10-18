# Key Pickup - Design Documentation

## Current implementation correction (v3.25.2)

Keys remain a prerequisite to Castle checks. The v3.22 early-Key/panel-placement experiment was reversed in v3.23. Regular Keys still follow the Epic natural-spawn gate; owning/equipping Insert Coin does **not** independently unlock Keys.

Older sections describe historical versions where inconsistent. For the complete transition see [systems integration](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).

---

## Original historical specification (retained for provenance)

**Hierarchy:** Documentation Home > Collectibles and Claimable Milestones > Key Pickup > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the collectible needed to advance Castle checks.

> This page is the canonical design documentation for **Key Pickup** within the Collectibles and Claimable Milestones category.

## Documentation Relationship

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Key creates setup for a joke.

Collecting a Key does not immediately give a reward.

Instead it makes a suspicious little Castle appear somewhere between portfolio sections.

The player then has to find and click the Castle.

This creates a two-part micro-loop:

```text
Key -> Castle
```

Repeated Keys create repeated Castle checks.

## Why a Separate Key

If Castles simply spawned randomly, they would be another ambient object.

The Key creates anticipation.

The player knows:

> something has changed somewhere on the page.

That encourages exploration without introducing a full quest log.

## One Key, One Castle

One collected Key creates one active Castle opportunity.

While a Castle is waiting or already visible, natural pickup selection avoids spawning another Key.

This keeps the state legible.

## Forced QA Exception

DEV-forced Keys can intentionally bypass some natural scheduling rules.

Testing tools are allowed to be irresponsible.

The natural player path should remain one-Key-one-Castle.

## Spawn Destination

The Castle can appear near any of the six major section boundaries:

- Games,
- Career,
- Consulting,
- Crafting,
- Tools,
- About.

This creates a reason to move around the professional portfolio.

## Castle Run

Each Castle check increments the larger 4-Castle progression.

The Key itself does not increment that meter.

The player has to actually find and click the Castle.

## Design Rules

- Natural flow supports only one pending Castle at a time.
- Key collection activates, but does not complete, the Castle step.
- Castle can appear across major portfolio sections.
- The player is told that a Castle appeared.
- Key pickup remains a friendly low-cost opportunity.
- Missing a Key simply delays the loop.

## Success Criteria

A simple pickup creates a small search task and makes the document structure itself part of the game layer.
## Related Documentation

- [Collectibles and Claimable Milestones Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
