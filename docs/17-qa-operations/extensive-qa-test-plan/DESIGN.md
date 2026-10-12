# Extensive QA Test Plan - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Extensive QA Test Plan > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the comprehensive v2.78 end-to-end test matrix used to validate the full portfolio before release.

> This page is the canonical design documentation for **Extensive QA Test Plan** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio has grown beyond what can be safely validated by clicking around for a few minutes.

The extensive QA plan exists to provide repeatable release coverage across:

- progression,
- themes,
- hidden interactions,
- economy,
- combat,
- persistence,
- local preview,
- deployment,
- accessibility-oriented controls,
- endgame.

The plan is intentionally broader than a conventional website smoke test because the site now behaves like a small game.

## Scope

The v2.78 extensive plan covers:

- clean state and startup smoke,
- local vs hosted Three.js,
- reset,
- all 10 Rare Signals,
- Epic and Legendary progression,
- Help and Dev Console,
- Wish and Blueprint,
- authored Wish branches,
- Rupees and Shop,
- rarity isolation,
- Hearts and Castles,
- Doug and Coolness,
- interaction/debug modes,
- all 23 Dynamic Optional Objectives,
- Director state forcing,
- flying pickups,
- UFOs,
- normal Boss,
- Super Boss,
- Star Power,
- Mippi Bird,
- Heavy Water Perspective Visualizer,
- normal Finale,
- Session Report,
- postgame reveal,
- all nine Epic postgame achievements,
- Legendary 100 percent,
- Music Player,
- persistence,
- responsive layout,
- natural completion,
- fast DEV-assisted sweep.

## Two Release Paths

The plan intentionally has two major completion paths.

### Natural Completion Run

This validates:

- onboarding,
- actual unlock order,
- pacing,
- persistence,
- progression logic,
- authored reveal timing.

It is slower but catches sequence bugs.

### DEV-Assisted Release Sweep

This uses temporary DEV commands to reach:

- rare edge states,
- high progression,
- individual objective states,
- HUD attention states,
- Bosses,
- postgame.

It is faster and gives broad state coverage.

Neither path is sufficient alone.

## Bug Documentation

A release plan is only useful if failures are reproducible.

Every bug record should capture:

- build version,
- environment,
- current progression state,
- exact steps,
- expected result,
- actual result,
- whether reload changes behavior,
- Console error,
- runtime snapshot when relevant,
- screenshot/video if visual.

## Signoff Philosophy

A release candidate is not signed off merely because the core professional links work.

The user-visible game systems are part of the product.

Broken progression or stale overlays affect the portfolio's perceived quality even if the resume link is still clickable.

## Design Rules

- Maintain one canonical extensive test plan.
- Cover both natural and forced progression.
- Include local and hosted validation.
- Include persistence and reset.
- Include every current Optional Objective.
- Include every postgame achievement.
- Treat game-layer regressions as real release bugs.
- Record enough context to reproduce failures.
- Update the test plan whenever a new system becomes release-critical.

## Success Criteria

The same checklist can be used before every release to determine whether the complete experience is actually shippable.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
