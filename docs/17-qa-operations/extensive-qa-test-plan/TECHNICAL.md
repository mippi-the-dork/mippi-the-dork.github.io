# Extensive QA Test Plan - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Extensive QA Test Plan > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the comprehensive v2.78 end-to-end test matrix used to validate the full portfolio before release.

> This page is the canonical technical documentation for **Extensive QA Test Plan** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
## Canonical Artifact

The current comprehensive plan exists as:

```text
MIPPI_PORTFOLIO_V2.78_EXTENSIVE_QA_TEST_PLAN.md
```

The planned documentation hierarchy places the canonical copy at:

```text
docs/QA/EXTENSIVE_QA_TEST_PLAN.md
```

## Coverage Groups

Recommended execution order:

```text
1. Environment / clean state
2. Startup / Three.js
3. Core professional navigation
4. Rare Signals
5. Epic unlock
6. Wish / Blueprint / Legendary
7. Economy / Shop
8. Collectibles / milestones
9. Doug / Coolness
10. Modes
11. Objectives
12. Director
13. Arcade
14. Mippi Bird
15. Perspective Visualizer
16. Finale / Debrief
17. Postgame
18. Music Player
19. Persistence / reload
20. Responsive / layout
21. Natural end-to-end
22. DEV-assisted sweep
23. Hosted production smoke
```

## Objective Coverage

The plan should explicitly contain all 23 objective IDs:

```text
signal-sweep
field-trip
inspection
command-line
theme-shift
pickup-catch
pickup-double
pickup-variety
heart-signal
rupee-hunt
bone-run
doug-pet
castle-check
airspace-one
airspace
contact-damage
system-combo
legendary-shot
legendary-double
field-test
loadout
shop-buy
slowmo-test
```

## Postgame Coverage

All nine Epic conditions:

```text
Signal Saturation
Maximum Cool
Gold Standard
Reality Validated
Full Hearts
Buy the Store
Another Castle
Grand Tour
Air Superiority
```

plus:

```text
100% Complete
```

must be tested.

## Music Coverage

Test both package states:

### MP3s absent

Expected:

```text
MUSIC FILE PENDING
play disabled by availability
download disabled
```

### MP3 installed

Expected:

```text
READY
play/pause
prev/next
ended auto-advance
download
```

## Browser Evidence

For startup/runtime failures capture:

```js
window.__MIPPI_RUNTIME__
  .snapshot()
```

For adaptive systems capture the relevant QA snapshot.

## Pass/Fail Rule

Do not mark an item passed when:

- it only passed after manual refresh,
- it emitted an uncaught Console error,
- it used a DEV shortcut but the item is specifically validating natural progression,
- the tester could not reproduce the expected state.

## Release Copy

When placing the test plan under `docs/QA`, keep the source plan synchronized rather than maintaining two divergent checklists.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
