# Attention Budget - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Attention Budget > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Prevents natural ambient opportunities and large encounters from spawning underneath high-attention UI or focused player tasks.

> This page is the canonical design documentation for **Attention Budget** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio has many systems that can demand attention.

Without coordination, the site could simultaneously show:

- Dev Console,
- Shop,
- Blueprint repair,
- Wish result,
- Achievement Ledger,
- a flying pickup,
- a UFO,
- a Boss,
- Mippi Bird,
- the Finale.

That is not emergent gameplay.

It is UI noise.

The Attention Budget gives the runtime a shared rule:

> If another system already owns focused attention, do not add a new natural ambient demand.

## Suppression vs Cancellation

The Attention Budget suppresses new natural opportunities.

It does not automatically cancel an already active Optional Objective or currently flying object.

This distinction matters.

Once a timed objective is active, hiding it because the Shop opened would make the timer unfair.

The offer/spawn decision is where attention should be managed.

## Focused Surfaces

Current attention blockers include:

- Super Boss,
- hidden/inactive browser tab,
- active form input,
- achievement toast,
- Achievement Ledger,
- Dev Console,
- Shop,
- Blueprint popup,
- Compile popup,
- special Wish popup,
- Wish sequence overlay,
- HAL overlay,
- Azure gallery,
- Mippi Bird,
- Finale,
- Session Debrief.

These represent surfaces where another new ambient event would be likely to go unnoticed or cause accidental input conflict.

## Deferred Ambient Opportunities

When a normal ambient spawn is blocked, the Director remembers that the opportunity was denied.

Later, when attention is calm, it tries to flush one deferred opportunity.

This is important.

Suppression should not become permanent loss.

## Bound on Deferred Counts

The Director does not accumulate an unlimited spawn debt.

Each ambient family is capped at a small queued value.

This prevents closing one popup from causing a flood of every missed timer event.

## Boss Relationship

Large Boss contacts also wait for a calm interaction window.

A Boss should not appear under a Wish sequence or Shop purchase simply because the ten-UFO threshold was reached in the background.

## Design Rules

- Block new natural ambient events during high-attention surfaces.
- Do not hide an already active timed objective.
- Defer, do not permanently discard, reasonable ambient opportunities.
- Never accumulate unlimited spawn debt.
- Bosses wait for calm.
- Form entry counts as focused attention.
- Hidden tab counts as blocked.
- Forced QA and Easy Mode can bypass normal ambient suppression where intentionally designed.

## Success Criteria

The player rarely sees two major systems fighting for the same few seconds of attention.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
