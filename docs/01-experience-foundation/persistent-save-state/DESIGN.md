# Persistent Save State - Design Documentation

**Hierarchy:** Documentation Home > Experience Foundation > Persistent Save State > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Stores long-term progression and feature unlocks locally while separating them from temporary per-session state.

> This page is the canonical design documentation for **Persistent Save State** within the Experience Foundation category.

## Documentation Relationship

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Persistence exists so the portfolio can feel like a continuing experience rather than a one-session novelty.

A returning visitor should keep major earned progression, purchases, rarity unlocks, and true-completion rewards.

At the same time, some temporary state should reset naturally between sessions so the page does not resume in the middle of a transient encounter.

## Persistence Categories

### Long-Term Progression

Examples:

- Rare achievements.
- Legendary unlock.
- selected theme.
- Hearts.
- Rupees.
- Shop ownership and equipped gameplay item.
- Wish charge and Wish unlock state.
- Mushroom life progression.
- Castle progress.
- Finale state.
- postgame achievement state.
- postgame section completion.
- Music Player unlock.
- Inspect and Design preferences.

These generally belong in local storage.

### Session State

Examples:

- session telemetry,
- active-time and dwell tracking,
- Coolness progress,
- Blueprint Is Valid repair state,
- one-session onboarding markers.

These generally belong in session storage.

### Transient Runtime State

Examples:

- currently open overlay,
- active Boss object,
- current projectile,
- active toast,
- Director timers,
- animation frame IDs.

These should not be serialized as save data.

## Design Rules

- Major earned rewards should survive reload.
- Reload should not recreate a half-finished temporary encounter.
- Persistence should not be required to read the professional site.
- Storage failure should degrade to a nonpersistent session, not a broken page.
- Long-term progression should have explicit ownership and naming.
- Full reset should remove all Mippi-owned persistent and session state.
- The Music Player is intentionally permanent until reset once earned.

## Theme vs Progression

Selected visual theme is saved separately from progression unlocks.

This matters because a player can unlock Legendary and later choose to display Rare. The saved visual preference does not revoke Legendary gameplay progression.

## Privacy

Save data is local browser state.

The current system does not require an account and does not send progression to a server.

## Reset Contract

The user must always have a way to remove the saved experience and return to first-visit state through the confirmed `reset` command.
## Related Documentation

- [Experience Foundation Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
