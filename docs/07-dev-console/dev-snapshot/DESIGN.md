# DEV Snapshot - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > DEV Snapshot > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Prints the current progression and runtime state so testers can verify what the site believes is active.

> This page is the canonical design documentation for **DEV Snapshot** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

DEV Snapshot is the tester's sanity check.

When a visual result looks wrong, the first question should be:

> What state does the runtime think it is in?

Snapshot answers that in a compact form.

## Current Information

The snapshot includes:

- current visual theme,
- Signal count,
- Legendary state,
- Rupee wallet,
- affordable Shop item count,
- Shop ownership count,
- Heart count,
- Coolness,
- Wish charge,
- Blueprint validity,
- Finale state,
- Director state,
- Invasion meter,
- Castle progress,
- active Objective.

## Design Rules

- Snapshot is compact.
- Snapshot is readable in Console text.
- It should report authoritative runtime state.
- It should not mutate anything.
- It is allowed to expose QA-level system details because DEV is hidden tooling.

## Success Criteria

A tester can compare what the screen shows against what the runtime reports without opening browser storage manually.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
