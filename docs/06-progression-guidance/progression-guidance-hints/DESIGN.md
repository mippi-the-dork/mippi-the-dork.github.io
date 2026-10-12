# Progression Guidance Hints - Design Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Progression Guidance Hints > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides context-sensitive hints after major milestones so a player can recover when the next system is not obvious.

> This page is the canonical design documentation for **Progression Guidance Hints** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Progression Guidance Hints are the bridge between hidden discovery and explicit walkthrough.

The game layer should not become impossible because the player missed one implication.

Hints exist to answer:

> What kind of thing should I try next?

They should not immediately answer:

> Type this exact command and click this exact object.

That stronger role belongs to Cheat.

## Guidance Escalation

The portfolio uses three broad levels of help.

### Ambient Guidance

Progression Trace HUD and attention cues.

These are always present or state-driven.

### Requested Hint

The player actively asks for a hint.

This can be more specific.

### Cheat

The player asks for the explicit solution.

This can be direct.

The three levels should not collapse into the same text.

## Major Hint Moments

Useful contexts include:

- remaining Rare Signals,
- Epic airspace,
- Wish charge availability,
- broken Blueprint repair,
- missing Finale requirements,
- postgame Epic goals.

## Context Sensitivity

A hint must reflect actual current state.

Examples:

If a Wish charge exists but BP_WishManager is broken:

- hint repair.

If the Blueprint is already repaired:

- hint the Wish path instead.

If the Finale is ready:

- hint the Mippi logo.

If postgame is revealed:

- guide toward the next incomplete Epic goal.

## Spoiler Control

Before the postgame reveal, hints should not list postgame completion requirements.

The site should preserve the normal ending as a genuine stopping point.

## Design Rules

- Hint is user-requested.
- Hint should always be truthful for current state.
- Prefer one next action category.
- Avoid repeating already completed requirements.
- Do not expose unrevealed postgame content.
- Do not mutate progression.
- Keep Cheat clearly stronger than Hint.

## Success Criteria

A player can recover from confusion without losing the satisfaction of performing the actual progression step themselves.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
