# Temporary DEV Commands - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Temporary DEV Commands > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides hidden state-forcing commands for rapid QA without advertising them in the normal Help command.

> This page is the canonical design documentation for **Temporary DEV Commands** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The DEV command layer exists to make a large systemic portfolio testable.

Natural progression is important for release validation, but it is too slow for every regression pass.

DEV commands provide controlled state forcing.

They are not player-facing cheats.

They are QA infrastructure.

## Discovery Policy

Normal `help` does not mention DEV.

A tester who already knows the command can use:

```text
dev
dev help
```

to reveal the full state matrix.

This keeps development tooling available without accidentally teaching normal visitors how to bypass the entire experience.

## Philosophy

A DEV command should force the same state that the real system would ultimately use.

It should not create a separate fake testing universe.

This means DEV forcing often writes:

- the same local storage,
- the same session storage,
- the same runtime variables,
- the same UI update functions.

That makes it useful for regression testing.

## Telemetry Policy

DEV commands intentionally bypass normal Console command telemetry.

A tester should be able to force 100 states without turning the Player Model into nonsense.

The state being forced can still update the real feature state under test.

## Command Areas

Current DEV Help exposes:

- Progress
- Economy
- Meters
- Wish
- Arcade
- Director
- Modes
- Attention
- Utility
- Objective

## Design Rules

- DEV is hidden from normal Help.
- DEV command output begins with `DEV //`.
- State forcing should be deterministic.
- Bad arguments should print expected values.
- DEV should not contaminate player-command telemetry.
- Natural end-to-end QA is still required.
- `dev fresh` is destructive and immediate by design.

## Success Criteria

A tester can move from a clean page to any major game state in seconds and verify the real UI and persistence behavior.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
