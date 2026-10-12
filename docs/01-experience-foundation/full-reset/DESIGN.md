# Full Reset - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Full Reset > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Clears all persistent and session progression and reloads the site into a true first-visit state.

> This page is the canonical design documentation for **Full Reset** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Reset is the explicit escape hatch from the portfolio's accumulated state.

It exists for:

- visitors who want to replay from the beginning,
- testers validating first-visit behavior,
- developers recovering from malformed local state,
- true-completion players who deliberately want to erase the Music Player unlock.

Because reset destroys meaningful progress, it must require confirmation.

## User Flow

1. Open the Dev Console.
2. Enter `reset`.
3. The console explains the scope of the reset.
4. The console asks the user to type `RESET` to confirm.
5. Typing anything else cancels.
6. On confirmation, Mippi-owned local and session state is cleared.
7. The page returns to the top and performs a real reload.
8. The site initializes as a first visit.

## Why a Real Reload Is Required

Reset is not only a data operation.

Several systems, especially the Three.js scenes, initialize during document startup. A reset that only mutates state in-place risks leaving stale timers, scene objects, event listeners, or partially initialized UI.

The final step is therefore a full document reload.

## Reset Scope

The confirmation message communicates that reset affects systems such as:

- Signals.
- themes.
- Shop purchases.
- currency.
- Wishes.
- Doug progress.
- Castle progress.
- Finale state.
- telemetry.
- session progress.
- Music Player reward through its storage key.

## Design Rules

- No single accidental click should trigger full reset.
- The destructive scope must be described before confirmation.
- Cancellation must leave all state untouched.
- Reset must return to a first-visit experience, not a visually fresh page with hidden old progression.
- Reset must remove the true-completion Music Player reward.
- Reset must not intentionally erase unrelated browser storage that does not belong to Mippi.

## QA Shortcut

`dev fresh` exists as a developer-only immediate clean-state tool. It is not a replacement for testing the public confirmed `reset` interaction.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
