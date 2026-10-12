# Wish Result Overlay Framework - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Wish Result Overlay Framework > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides player-dismissible result screens for authored Wishes that need enough time to be read and understood.

> This page is the canonical design documentation for **Wish Result Overlay Framework** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Some Wish results are too elaborate for a three-second toast.

Engine Port, Game Success, and Doug Executive Review contain sequences with staged information that the player needs time to watch and understand.

These results use a shared authored-sequence pattern.

The key design decision is:

> When the sequence finishes, do not dismiss it for the player.

Instead, enable an explicit close or continue action.

## Why Player-Dismissed

Earlier timed versions could disappear while the player was still reading.

That is especially harmful in comedic sequences where the final punchline is the reason the sequence exists.

The v2.72 approach separates:

- sequence timing,
- result dismissal.

The sequence can finish on schedule.

The final screen stays until the player chooses to leave.

## Shared Sequence Family

Three Wishes use the primary sequence framework:

### Multi-Engine Port

Finishes with:

`CLOSE PORT REPORT`

### Game Success

Finishes with:

`ACCEPT SUCCESS`

### Doug Executive Review

Finishes with:

`END EXECUTIVE REVIEW`

Their close button begins disabled.

It becomes active only when the authored result is complete.

## AI Exception

AI Vibe Refactor intentionally does not use the normal result-close model.

Its corrupted state persists until:

`UNDO AI`

This makes cleanup part of the joke and part of the player's action.

## Other Wish Presentations

Not every branch needs the same framework.

### Mippi

Dedicated contact popup.

### Blender

Dedicated uninstall popup whose OK button becomes active after completion.

### Money

Coin spectacle plus toast.

### HAL

Three-second denial overlay.

### Generic

Console and toast only.

This is intentional proportionality.

## Shared Cleanup Rule

Starting another Engine, Game, or Doug authored sequence should clear stale sequence presentation from the prior one.

Temporary effects also need explicit restoration where appropriate.

For example, Doug Review temporarily changes:

- particle boost,
- Doug command state,
- scale treatment.

Cleanup restores prior values instead of blindly forcing them off.

## Attention Relationship

Active Wish overlays count as high-attention states.

They can delay other systems such as the Finale invitation or Adaptive Director ambient opportunities.

## Design Rules

- Use a full sequence only when the content justifies it.
- Sequence completion and dismissal are separate states.
- Final result remains until player action.
- Close action gains keyboard focus when it becomes ready.
- Temporary effects must clean up.
- Starting a new authored sequence clears stale prior sequence state.
- AI remains intentionally persistent until Undo.
- Lightweight Wish branches stay lightweight.

## Success Criteria

The player always has enough time to understand an authored Wish payoff and never loses the punchline because an automatic timer dismissed the result.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
