# Super Boss Interaction Override - Design Documentation

## Current implementation correction (v3.25.2)

The Super Boss temporarily forces Interact OFF for **all visitors**, including those who have not bought the Interact toggle, without unlocking its Shop entitlement. When the encounter ends, normal interaction state and controls resume.

Earlier sections are historical where they conflict with this current specification. See [release evolution](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).

---

## Original historical specification (retained for provenance)

**Hierarchy:** Documentation Home > Arcade, Combat, and System Combos > Super Boss Interaction Override > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Temporarily manages Interact Mode and cursor behavior so the Super Boss remains playable regardless of the player's previous interaction setting.

> This page is the canonical design documentation for **Super Boss Interaction Override** within the Arcade, Combat, and System Combos category.

## Documentation Relationship

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Super Boss needs focused input.

The player must be able to:

- move a combat cursor,
- fire without clicking portfolio links,
- dodge attacks,
- use the Exit control.

The site already has a system for suppressing ordinary portfolio interaction:

`Interact Off`.

The Super Boss deliberately borrows that same rule instead of inventing a second unrelated page-lock system.

## Prior-State Rule

There are two cases.

### Portfolio Interaction Already Off

If the player already enabled Interact Mode hunting:

- nothing needs to change,
- the encounter uses the already-suppressed state,
- the player's preference remains theirs.

### Portfolio Interaction On

If normal content was interactive:

- Super Boss temporarily forces Interact Off,
- the control reflects the suppressed state,
- the override remains through Victory,
- the original state is restored when the encounter ends.

This avoids leaving the player in an interaction mode they did not choose.

## Override Priority

While the encounter owns the override, manually clicking the Interact toggle is rejected.

The site explains that the Super Boss temporarily owns interaction state.

This prevents the player from accidentally re-enabling portfolio controls underneath the combat arena.

## Native Cursor

The browser cannot safely or legitimately reposition the operating-system pointer.

The Super Boss therefore hides the native cursor over the arena and renders its own gameplay cursor.

Pointer movement updates the intended cursor target.

Enemy hits add a temporary knockback offset to the gameplay cursor.

This gives the player a mechanical knockback effect without moving the OS cursor.

## Always-Available Fire

Super Boss shooting does not depend on Legendary progression.

Left click always fires during the encounter.

This prevents a late-game arcade encounter from becoming impossible for a player who arrived through DEV testing or an alternate progression path.

## Exit Safety

The Exit Boss Fight button explicitly restores a normal pointer cursor.

It remains above the encounter layer and is excluded from player-shot input.

The player can always leave.

## Wheel Input

The arena suppresses wheel scrolling while active.

This prevents the underlying document from moving during the focused fight.

## Design Rules

- Reuse Interact Off rather than inventing a second content-lock system.
- Preserve the player's prior interaction preference.
- Reject manual Interact changes while forced override owns state.
- Restore prior state after exit or Victory.
- Hide native cursor only inside the encounter.
- Use a gameplay cursor for knockback.
- Left-click fire must always work.
- Exit button and Escape remain available.
- Underlying portfolio state is never destroyed.

## Success Criteria

The Super Boss can safely take over input for a few seconds and then return the portfolio to exactly the interaction state the player had before combat.
## Related Documentation

- [Arcade, Combat, and System Combos Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
