# Finale Readiness Cue - Technical Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Finale Readiness Cue > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Makes the Mippi header identity glow when the normal Finale is ready to be started.

> This page is the canonical technical documentation for **Finale Readiness Cue** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
## Eligibility

Finale readiness is derived from multiple persisted and live states.

The current broad requirement set includes:

1. original Signals 10/10,
2. Legendary unlocked,
3. validated Wish history,
4. at least one Boss defeat,
5. five-Heart reward completed,
6. at least one Shop item owned,
7. at least five of six major sections visited.

## Relevant Persistent State

Examples include:

```text
mippi-achievements-v2
mippi-legendary-unlocked
mippi-finale-wish-v1
mippi-finale-boss-v1
mippi-heart-reward-v1
mippi-shop-state-v1
mippi-postgame-sections-v1
```

The exact eligibility helper should evaluate authoritative state rather than infer from visual UI.

## Body Class

When ready, the runtime applies:

```text
finale-ready
```

to `body`.

The brand mark CSS reacts to that class.

## Brand Click Priority

The `.brand-mark` click handler checks Finale readiness first.

If ready:

- start Finale.

Otherwise:

- process the earlier logo discovery behavior.

This gives the same UI surface different meaning over progression without creating a new Finale-only button.

## Theme CSS

Rare/Epic use the base Finale pulse.

Legendary uses a dedicated rule:

```text
body.theme-complete.theme-legendary.finale-ready .brand-mark
```

and a dedicated animation:

```text
finale-logo-pulse-legendary
```

This prevents the active Legendary palette from washing out the cue.

## Attention Suppression

Finale readiness may be logically true while the visual cue is temporarily suppressed by focused experiences.

The cue should reappear after those experiences resolve.

## DEV Testing

Use:

```text
dev finale ready
```

Then test:

```text
Rare
Epic
Legendary
```

via theme cycling.

## QA

- not eligible: no glow,
- become eligible: glow appears,
- open Shop or other focused overlay,
- confirm cue does not conflict,
- close overlay,
- confirm cue returns,
- click logo,
- Finale starts,
- test all three themes.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
