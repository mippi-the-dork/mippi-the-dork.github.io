# Progression Trace HUD - Design Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Progression Trace HUD > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Surfaces the next broad progression direction without turning the portfolio into a rigid quest checklist.

> This page is the canonical design documentation for **Progression Trace HUD** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Progression Trace HUD exists because the site eventually contains too many systems for pure hidden discovery to remain fair.

Its purpose is to answer:

> What broad thing should I be thinking about next?

It should not answer:

> Click this exact pixel now.

That distinction preserves exploration.

## Role in the Experience

The Trace HUD becomes more valuable as the experience moves from Rare discovery into Epic and Legendary progression.

Early discovery can remain mysterious.

Later progression includes:

- Wish charge,
- Blueprint repair,
- Shop state,
- Hearts,
- Castles,
- Bosses,
- Finale readiness.

At that stage, a broad directional cue prevents the experience from becoming opaque.

## Information Style

Trace language should be concise.

It should prefer high-level concepts such as:

- Find more Signals.
- Explore the new airspace.
- A Wish can be made.
- Repair the broken Wish path.
- Broaden your portfolio visit.
- The Finale is nearly ready.

It should not duplicate the full Ledger.

## Priority

If multiple systems are active, the HUD should select one broad direction rather than list everything.

Priority should favor:

1. blocked progression,
2. currently actionable major progression,
3. broad missing requirement,
4. optional exploration.

## Relationship to Attention Cues

Trace HUD is informational.

Attention cues are spatial.

For example:

- Trace says a Wish is ready.
- Dev Console pulse shows where to act.

This division keeps the HUD from needing to describe UI location every time.

## Relationship to Hint

Hint is user-requested.

Trace is ambient guidance.

Trace should remain less explicit than the Hint or Cheat systems.

## Design Rules

- One broad direction at a time.
- Do not expose unrevealed postgame requirements.
- Do not list Optional Objectives as required progression.
- Do not imply that professional browsing is blocked.
- Update when meaningful progression changes.
- Remain readable in all rarity themes.
- Avoid rapid flickering between priorities.

## Success Criteria

A player who stops for a moment should be able to infer the next category of action without receiving a full walkthrough.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
