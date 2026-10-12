# Reset Integrity QA - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Reset Integrity QA > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Verifies that the public reset returns the portfolio to a true first-visit state and performs a real document reload so bootstrap systems such as Three.js restart correctly.

> This page is the canonical design documentation for **Reset Integrity QA** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

`reset` is more than a progression wipe.

It is the public guarantee that the entire experience can be replayed from the beginning.

A correct reset must clear:

- persistent unlocks,
- session progression,
- current telemetry,
- temporary repaired states,
- postgame history,
- Music Player entitlement.

Then it must restart the document.

Anything less creates a partially reset world.

## Confirmation Barrier

The public Console command should not immediately erase progress.

Typing:

```text
reset
```

once arms a confirmation state.

The user must type:

```text
reset
```

again.

Any other input cancels.

This protects accidental command execution.

## Mippi Namespace Rule

The reset helper clears storage keys whose names start with:

```text
mippi
```

case-insensitively.

It does this for both:

- localStorage,
- sessionStorage.

This lets new Mippi-owned keys participate automatically without needing a hand-maintained list.

## Real Reload Requirement

The reset must finish with:

```text
location.reload()
```

A previous approach that replaced the current URL was not reliable enough for bootstrap systems.

Three.js scenes are created during document startup.

If reset does not perform a genuine document reload, the player can end up with cleared progression but missing 3D systems.

## Scroll Reset

Before reload:

- scroll restoration is switched to manual when possible,
- page scrolls to top.

The reset should return the user to the beginning of the experience.

## URL Preservation

Before reload, the runtime uses `history.replaceState` with:

```text
location.pathname + location.search
```

This keeps the current site URL/query while avoiding stale history behavior.

## DEV Fresh

The QA shortcut:

```text
dev fresh
```

uses the same storage-clearing helper and performs an immediate real reload.

It exists for rapid testing and does not require public confirmation.

## Design Rules

- Public reset requires confirmation.
- Clear both local and session Mippi state.
- Use namespace-based cleanup.
- Scroll to top.
- Perform real document reload.
- Do not use same-URL replace as a reload substitute.
- Music Player and postgame history must disappear.
- Three.js should re-bootstrap exactly as on manual refresh.

## Success Criteria

After reset finishes, the site is indistinguishable from a genuine first visit on that origin.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
