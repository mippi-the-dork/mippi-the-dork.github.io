# Stat Overlay - Design Documentation

**Hierarchy:** Documentation Home > Interaction and Debug Modes > Stat Overlay > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides Unreal-style `stat fps` and `stat unit` overlays with live browser FPS sampling and intentionally simulated engine timing values.

> This page is the canonical design documentation for **Stat Overlay** within the Interaction and Debug Modes category.

## Documentation Relationship

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Stat Overlay is part useful browser diagnostic, part Unreal joke.

The player can type familiar commands:

```text
stat fps
stat unit
stat none
```

and receive a compact upper-right performance readout.

The visual silhouette should feel recognizable to Unreal developers.

The data must remain honest about what is real and what is simulated.

## FPS Mode

`stat fps` tries to show the actual requestAnimationFrame cadence of the current browser tab.

This is useful because it can expose:

- heavy page load,
- hidden-tab throttling,
- refresh-rate behavior,
- browser scheduling.

The overlay labels the source.

### Live

```text
STAT FPS // LIVE
```

when a recent sample exists.

### Estimate

```text
STAT FPS // EST
```

when the sample is not yet fresh enough.

The estimate preserves the gag while avoiding a blank overlay.

## Unit Mode

`stat unit` presents familiar engine timing categories:

- Frame,
- Game,
- Draw,
- GPU,
- RHIT.

Those millisecond values are simulated.

The mode also includes:

`Morale`

which reports the real current Doug Bone count.

This makes the fake performance display intentionally cross over into the site's real systems.

## Toggle Behavior

Running the active stat command again turns it off.

Examples:

```text
stat fps
stat fps
```

produces:

```text
ON
OFF
```

`stat none` always hides the overlay.

## Theme

The compact engine-stat silhouette remains the same, but color follows the current rarity.

This keeps the debug surface visually integrated with the portfolio.

## Pointer Behavior

The overlay never accepts pointer input.

It is informational only.

## Persistence

Stat mode is runtime-only.

Reload hides it.

## Design Rules

- Clearly label real vs estimated FPS.
- Do not present simulated Unit values as real browser profiling.
- Keep layout compact.
- Do not block pointer input.
- Reuse familiar Unreal command vocabulary.
- Theme the display without changing meaning.
- `stat none` always clears it.
- Reload begins with no stat overlay.

## Success Criteria

An Unreal developer recognizes the command instantly, while the overlay remains honest enough that a visitor never mistakes the fake Unit timings for a real profiler capture.
## Related Documentation

- [Interaction and Debug Modes Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
