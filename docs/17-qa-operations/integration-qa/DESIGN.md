# Integration QA - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Integration QA > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tests the boundaries where independent systems share state, input, timing, UI space, or recovery behavior.

> This page is the canonical design documentation for **Integration QA** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Most serious bugs in this portfolio do not live inside one isolated feature.

They appear where two systems meet.

Examples from previous passes include:

- a removed visualizer variable crashing the whole runtime,
- a removed Shop item still referenced by projectile cleanup,
- new HUD meters reading later state during startup,
- Optional Objectives colliding with expanding progression HUD,
- Interact Mode making a valid Doug cameo appear disabled,
- reset clearing state without reliably restarting 3D bootstrap.

Integration QA treats these seams as first-class test areas.

## Why Feature-Only QA Is Insufficient

A feature can pass in isolation and still fail in the real portfolio.

For example:

- UFO projectile works,
- Shop works,
- but a removed Shop modifier reference inside projectile code throws only when the projectile resolves.

Or:

- Heart meter works,
- Castle meter works,
- but calling one during startup reaches the other's state too early.

The release process therefore needs combination testing.

## High-Risk Integration Areas

### Startup + HUD + Persistent State

Returning-state initialization.

### Three.js + General Runtime

Pre-Three errors vs actual module failures.

### Interact Mode + Game Layer

Suppressed professional content while game targets remain usable.

### Wish + Blueprint + Help

Charge preservation, repair state, command styling.

### HUD + Optional Objectives + Ledger

Dynamic stack positioning.

### Shop + Gameplay Modifiers

Owned vs equipped vs passive behavior.

### Arcade + Projectiles + Removed Features

Cleanup paths and stale dependencies.

### Finale + Postgame

Delayed reveal, Session Report, continued exploration.

### Reset + Three.js

True fresh restart.

## Regression-Driven QA

Every significant fixed bug should contribute a regression test.

This is more valuable than repeatedly testing only the happy path.

If a bug once caused:

- stuck projectiles,
- broken startup,
- overlapping HUD,
- local preview cold-load failures,

the release sweep should explicitly try to reproduce it.

## Natural and Forced Testing

DEV commands are excellent for reaching edge states.

They are not a substitute for at least one natural progression pass.

Both are required.

### DEV

Fast state matrix.

### Natural

Validates the actual sequence of unlocks, timers, onboarding, and state dependencies.

## Design Rules

- Test seams, not only components.
- Turn every major fixed bug into a regression case.
- Include returning-state startup.
- Include attention/overlay combinations.
- Include theme combinations.
- Include reload/reset combinations.
- Use DEV for coverage, natural play for flow.
- Treat silent Console errors as failures even if the visible feature seems fine.

## Success Criteria

The release candidate remains stable when multiple systems are used in the combinations real visitors will actually create.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
