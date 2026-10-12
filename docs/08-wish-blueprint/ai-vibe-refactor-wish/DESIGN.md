# AI Vibe Refactor Wish - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > AI Vibe Refactor Wish > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Temporarily corrupts the website with overconfident AI-driven changes and requires the player to use the dedicated Undo AI action.

> This page is the canonical design documentation for **AI Vibe Refactor Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The AI Wish is intentionally destructive in presentation.

The joke is not:

`AI is bad.`

The joke is overconfident automated refactoring that reports perfect outcomes while making obviously questionable changes and running no tests.

The sequence should feel like a system confidently "improving" a site it does not understand.

## Trigger Family

Validated Wishes containing:

- AI,
- LLM,
- AGI

enter the same Vibe Refactor.

## Corruption Effects

The site temporarily:

- turns on Vibe Mode,
- replaces selected human-authored headings with generic enterprise language,
- distorts selected layout,
- shifts saturation and hue,
- disables a portion of normal main-content interaction,
- adds fake optimization badges,
- reports impossible confidence,
- adds an AI refactor status surface.

## Core Safety Requirement

The player must always have a visible escape.

`UNDO AI`

is deliberately placed above the corrupted state.

The feature should never require:

- page reload,
- Console knowledge,
- browser back,
- developer tools

to recover.

## Persistence

The corrupted state is intentionally not persisted.

A page reload naturally clears it.

That makes the sequence safe to experiment with.

## Vibe State Restoration

If Vibe Mode was already active before the Wish, Undo should leave it active.

If the Wish turned Vibe on, Undo turns it back off.

This preserves player state rather than treating cleanup as a global reset.

## Player-Dismissal Exception

AI is intentionally different from Engine, Game, and Doug.

There is no "continue" button after a timed sequence.

The broken state is the result.

The player must choose Undo.

## Design Rules

- Corruption must look obviously wrong but remain recoverable.
- Undo is always prominent.
- Normal portfolio interaction can be partially disabled, not permanently lost.
- Original human-authored content must be restorable exactly.
- Do not persist corrupted copy.
- Preserve pre-Wish Vibe state.
- Re-triggering while already corrupted focuses the existing Undo instead of stacking corruption.

## Success Criteria

The player understands the joke immediately and never worries that the website has actually been permanently damaged.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
