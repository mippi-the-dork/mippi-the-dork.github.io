# Stats Commands - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Stats Commands > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides FPS, unit timing, session stats, and other readable runtime information through console commands and overlays.

> This page is the canonical design documentation for **Stats Commands** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Stats commands borrow Unreal Engine language in a playful browser context.

They serve two roles:

- a joke recognizable to Unreal developers,
- useful lightweight runtime/session information.

## Command Set

Current stats-related commands include:

- `stat fps`
- `stat unit`
- `stat none`
- `stats`

## Stat FPS

Shows current browser rendering frequency.

It tries to use actual requestAnimationFrame sampling.

If a recent measurement is unavailable, it falls back to an estimate.

The overlay visibly labels whether the number is:

- LIVE
- EST

## Stat Unit

Presents Unreal-like timing categories:

- Frame
- Game
- Draw
- GPU
- RHIT
- Morale

Most timing values are intentionally simulated.

`Morale` humorously reports Doug Bone count.

## Stats

The general `stats` command prints session telemetry summaries rather than opening the compact performance overlay.

## Design Rules

- Never present fake values as exact browser diagnostics.
- Label FPS estimate state.
- Keep Unreal parody recognizable.
- `stat none` is the universal close command.
- `stats` should remain readable text, not require another panel.

## Success Criteria

The feature is useful enough to inspect and funny enough to fit the portfolio's Unreal identity.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
