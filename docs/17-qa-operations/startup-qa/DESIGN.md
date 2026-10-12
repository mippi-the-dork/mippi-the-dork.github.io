# Startup QA - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Startup QA > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Validates that the portfolio can complete early initialization without JavaScript ordering regressions, missing DOM paths, or a pre-Three.js crash.

> This page is the canonical design documentation for **Startup QA** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Startup QA protects the most important technical property of the portfolio:

> The page must boot far enough that every later system has a chance to work.

The site contains many interdependent systems initialized from one large runtime script.

That creates a specific class of risk.

A new HUD read, storage migration, or stale variable reference can throw before Three.js or the game layer even begins.

When that happens, the visible symptom can look like:

- Three.js failed,
- Hero scene disappeared,
- ambient scene disappeared,
- About 3D disappeared,
- controls stopped working.

The root cause can actually be an ordinary JavaScript initialization-order bug.

Startup QA exists to distinguish those cases.

## Regression History

Two important regressions shaped the current policy.

### v2.57

An early HUD refresh reached:

```text
updateCoolMeter()
```

before:

```text
dougBoneCount
```

had been initialized.

This produced a Temporal Dead Zone `ReferenceError`.

All later code stopped.

Because Three.js initialization happens later, every 3D scene appeared broken even though the Three.js scene code had not changed.

### v2.62

New Invasion and Castle HUD reads introduced the same class of problem.

Startup reached:

```text
updateHeartMeter()
-> updateProgressHudVisibility()
-> updateCastleMeter()
```

before later `let` declarations such as:

- `castleQuestActive`,
- `activeCastle`,
- `ufoBossActive`

were initialized.

Again, startup failed before the Three.js loader.

## Core Rule

Any state that can be read by a function reachable from the initial HUD refresh must be initialized before that refresh occurs.

This is a stronger rule than:

> Declare variables before the function that normally uses them.

The real dependency is the startup call graph.

## Null-DOM Mocks Are Not Enough

A startup test that replaces every DOM query with `null` can miss the exact bug the real page contains.

If an update function begins with:

```text
if (!element) return;
```

then a null-DOM mock may skip all of the logic that reads later state.

The current validation philosophy therefore includes a DOM-enabled startup mock where critical HUD elements actually exist.

That forces the same early read paths a real returning visitor can trigger.

## Returning-State Importance

Fresh-state testing is not enough.

A returning Epic or Legendary visitor can activate startup paths that a first-time user does not.

Startup QA should include stored-state scenarios such as:

- all Signals complete,
- Legendary unlocked,
- Hearts present,
- Shop ownership,
- Castle progress,
- postgame state.

The goal is to catch failures caused by restored persistent state.

## Runtime Health as Evidence

The site exposes:

```text
window.__MIPPI_RUNTIME__.snapshot()
```

for QA.

The snapshot helps answer:

- Did the script reach the Three.js loader?
- Did an error occur before that point?
- Which Three.js source was attempted?
- Which scenes successfully initialized?

This prevents a broad "Three.js is broken" diagnosis when the actual failure happened hundreds of lines earlier.

## Design Rules

- Startup failures are release blockers.
- Test fresh and returning save states.
- Treat early HUD call graphs as startup-critical.
- Use DOM-enabled startup validation.
- Distinguish pre-Three runtime failure from CDN/WebGL failure.
- Keep startup diagnostics local and read-only.
- Do not rely on one successful warm reload as proof of cold-load stability.

## Success Criteria

A cold first load and a returning-progress load both reach a stable interactive page with no uncaught startup error and with clear diagnostics if Three.js itself is unavailable.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
