# Resume and Return Guidance - Technical Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Resume and Return Guidance > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Restores enough context on later visits that returning players can understand what they were doing without replaying the entire introduction.

> This page is the canonical technical documentation for **Resume and Return Guidance** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
## Startup Reconstruction

Most return guidance is reconstructed from persistent state during normal startup.

Examples include:

- unlocked achievements,
- active theme preference,
- Legendary entitlement,
- Wish charge,
- Shop ownership,
- Heart count,
- Castle progress,
- Finale seen,
- postgame reveal,
- Music Player unlock.

The runtime then calls the relevant UI update functions.

## Attention Recalculation

Actionable attention should be recomputed at startup.

Examples:

```text
updateRupeeAttention()
updateConsoleAttention()
updateHeartMeter()
updateCastleMeter()
updateFinaleReady()
```

Exact helper names may vary by subsystem, but the pattern is to derive UI from restored state rather than persist the visual class itself.

## Why Classes Are Not Persisted

CSS classes such as:

```text
shop-ready
reward-ready
finale-ready
attention-wish
```

are derived UI state.

They should be rebuilt from authoritative persistence.

Persisting those classes directly would create stale visual state after feature rules change.

## Session Onboarding

Session-scoped onboarding markers should not be confused with long-term progression.

Returning in a new session can still receive lightweight context where appropriate, but should not replay earned achievements.

## Trace and Hint

Progression Trace and Hint systems should evaluate current state after startup.

They should not assume the previous session ended on a particular step.

## QA

Create several return snapshots.

### Snapshot A

Epic unlocked, no Wish charge.

Reload and verify Epic progression remains understandable.

### Snapshot B

Wish charged, Blueprint broken.

Reload and verify Console repair attention.

### Snapshot C

Hearts at 5/5, reward unclaimed.

Reload and verify claim-ready Heart meter.

### Snapshot D

Finale ready.

Reload and verify brand mark cue.

### Snapshot E

Postgame revealed, several Epic goals incomplete.

Reload and verify Ledger and Hint reflect remaining goals.

### Snapshot F

100 Percent Complete.

Reload and verify Music Player entitlement remains.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
