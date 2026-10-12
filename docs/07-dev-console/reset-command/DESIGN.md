# Reset Command - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Reset Command > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides a two-step full reset flow that clears progression and performs a true page reload.

> This page is the canonical design documentation for **Reset Command** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Reset is destructive.

It is also essential.

Players and testers need a reliable path back to the first-visit experience.

The command therefore requires explicit confirmation.

## Flow

1. Type `reset`.
2. Console explains what will be erased.
3. Console asks for `RESET`.
4. Next submitted line is confirmation text.
5. Matching text performs reset.
6. Anything else cancels.
7. Page performs a true reload.

## Scope

The Console warns that reset clears:

- Signals,
- themes,
- Shop purchases,
- currency,
- Wishes,
- Doug progress,
- Castle progress,
- Finale state,
- telemetry,
- session progress.

The Music Player entitlement is also removed because it is stored under the Mippi namespace.

## Why Reload

Reset cannot safely mean only "set variables back."

The site contains:

- timers,
- event state,
- Three.js scenes,
- spawned objects,
- overlays,
- session telemetry,
- derived UI classes.

A real page reload is the cleanest reset boundary.

## Design Rules

- Never reset on first command alone.
- Confirmation text is clear.
- Cancellation changes nothing.
- Unrelated browser storage is preserved.
- Reset removes true completion rewards.
- Reload is mandatory.

## Success Criteria

After confirmation the site behaves like a genuine first visit without requiring the user to manually refresh again.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
