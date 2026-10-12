# Integration QA - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Integration QA > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Tests the boundaries where independent systems share state, input, timing, UI space, or recovery behavior.

> This page is the canonical technical documentation for **Integration QA** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
## Historical Integration Regressions

`INTEGRATION_QA_DEV.md` records several important examples.

### Stale `lensToggle`

The Heavy Water visualizer changed, but one old line remained:

```text
lensToggle?.addEventListener(...)
```

Optional chaining does not protect an undeclared identifier.

The reference threw before Three.js loader startup.

### Interact Semantics

Final expected rule:

```text
INTERACT // ON
normal portfolio clickable

INTERACT // OFF
normal portfolio suppressed
game layer remains active
popup Doug remains pettable
```

### Wish Recovery

No charge:

```text
wish
```

schedules a Shooting Star after about 1.5 seconds.

Blueprint runtime failure:

- preserves charge,
- prints clickable FIX NOW control,
- keeps Help `blueprint` entry red until repaired.

### HUD

Meta Trace can be wider than collection meters, but absolute positioning prevents it from determining their widths.

### Hostile Projectiles

Projectile resolution must be idempotent.

Both animation/path resolution and fallback cleanup can exist, but the shot must settle only once and never remain at impact.

## Cross-System Test Matrix

At minimum include:

### Theme x Major UI

```text
Rare / Epic / Legendary
x
Shop / Ledger / Music / Finale / Objectives
```

### Interaction Mode x Targets

```text
normal links
Hero 3D
Perspective canvas
Castle
pickup
UFO
Doug peek
Super Boss
```

### Shop Modifier x Runtime

```text
Lucky Charm
Dog Whistle
Star Extender
Slowpoke
Golden Trigger
Celestial Beacon
Production Discount
```

### Attention Blocker x Ambient

```text
Console
Shop
Blueprint
Wish overlay
Gallery
Mippi Bird
Finale
Session Debrief
```

### Persistence State x Reload

```text
fresh
Rare partial
Epic
Legendary
postgame
100%
```

## Error Policy

Keep browser Console open during combination QA.

Any uncaught:

```text
ReferenceError
TypeError
Unhandled rejection
```

is a release failure even if the UI appears to recover.

## QA Hooks

Use:

```text
__MIPPI_RUNTIME__
__MIPPI_DIRECTOR__
__MIPPI_PLAYER_MODEL__
__MIPPI_OBJECTIVES__
__MIPPI_DEBRIEF__
__MIPPI_SUPERBOSS__
```

where relevant.

They are inspection aids, not replacements for visible user-flow testing.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
