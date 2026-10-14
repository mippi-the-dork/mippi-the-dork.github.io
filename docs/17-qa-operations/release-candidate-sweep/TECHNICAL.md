# Release Candidate Sweep - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Release Candidate Sweep > Technical

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Defines the final packaging, validation, local smoke, hosted smoke, and signoff sequence for a shippable portfolio release.

> This page is the canonical technical documentation for **Release Candidate Sweep** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
## Recommended RC Checklist

### A. Version

Confirm all coordinated version surfaces match the candidate:

```text
runtime health version
HTML CSS query
HTML JS query
Perspective JS query
debug HTML queries
preview server URL
preview server banner
package label
```

## B. Package Exclusions

Search final public folder for:

```text
__pycache__
*.pyc
PreviewLocal.bat
preview_server.py
index-debug.html
*_DEV.md
```

Expected:

```text
none
```

## C. Static Checks

Validate:

```text
JavaScript syntax
duplicate IDs
CSS brace balance
local asset references
startup mock
DOM-enabled startup mock
```

## D. Local Runtime Snapshot

After a fresh local launch:

```js
window.__MIPPI_RUNTIME__
  .snapshot()
```

Expected:

- version matches candidate,
- no unexpected early errors,
- boot reached post-core stage,
- Three attempt list is sensible,
- Hero/Ambient/About states match visual result.

## E. DEV Sweep

Useful commands:

```text
dev snapshot
dev clean
dev fresh

dev rare
dev epic
dev legendary

dev finale ready
dev finale play

dev postgame reveal
dev postgame complete
dev music

dev director quiet
dev director curious
dev director engaged
dev director struggling
dev director mastery

dev objective random
dev objective complete
dev objective fail

dev ufo
dev boss
dev superboss
```

Also test attention states:

```text
dev attention rupees
dev attention wish
dev attention blueprint
```

## F. High-Risk Regression Checks

Explicitly retest:

```text
Three.js cold local load
startup returning-state TDZ
stuck hostile projectiles
objective/progress-HUD overlap
Super Boss cursor + Interact restore
reset -> real reload
Music Player header alignment
Wish Help rainbow styling
broken Blueprint Help red state
```

## G. Natural Progression

Do not use DEV for this path.

Verify actual authored order and persistence.

## H. Hosted Smoke

After deploy, use a fresh browser context.

Check:

```text
production source version
Three runtime
Hero fallback
all major sections
Shop
Console
Perspective Visualizer
Finale entry
external links
storage persistence
reset
```

## I. Release Archive

Keep separate concepts clear:

### Source / QA archive

May include:

```text
DEV docs
PreviewLocal.bat
preview_server.py
index-debug.html
```

### Public runtime deployment

Excludes them.

Do not accidentally use the source archive as the GitHub Pages publish artifact.

## Signoff

Recommended final signoff record:

```text
Build/version:
Date:
Tester:
Local cold load:
Hosted cold load:
Natural critical path:
DEV state sweep:
Responsive smoke:
Reset integrity:
Known nonblocking issues:
Release approved:
```
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.89 Technical Supersession

v2.89 release smoke includes published `perf-lab.js` before script, `dev perf`, profiler boot and sample/export, v2.89 timer/UI correlation, and restore `dev profile reset` before full progression QA. Recheck HUD moved controls, 5 Hearts exactly, bonus Mippi Bird life, Castle auto-collection, bounded Invasion, Rare pickups, closed Bird not blocking, docs unlock/attention, Loop order, and removed public `particles` command. Performance regression remains unverified on Windows.

For chronological attribution see [Release History](../../RELEASE_HISTORY.md).
