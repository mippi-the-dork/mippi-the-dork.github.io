# True Completion Gate - Technical Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > True Completion Gate > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Separates the accessible normal Finale from the stricter postgame completion requirements used to unlock the Music Player.

> This page is the canonical technical documentation for **True Completion Gate** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
## Gate Separation

The runtime should maintain separate evaluators for:

- Finale readiness,
- postgame Epic achievement completion,
- Legendary capstone completion.

Do not use one boolean to represent all three.

## Normal Finale

Relevant persistent state includes:

```text
mippi-finale-seen-v1
mippi-finale-wish-v1
mippi-finale-boss-v1
```

plus shared progression state such as Rare achievements, Legendary unlock, Hearts, Shop, and section visits.

## Postgame Reveal

The postgame tier is gated by:

```text
mippi-postgame-achievements-revealed-v1
```

This prevents true-completion requirements from being exposed before the normal ending.

## Epic Achievement Store

Postgame achievement state uses:

```text
mippi-postgame-achievements-v1
```

Historical state for selected goals includes:

```text
mippi-postgame-cool-maxed-v1
mippi-postgame-castle-complete-v1
mippi-postgame-superboss-v1
mippi-postgame-sections-v1
```

## Legendary Capstone Evaluation

The capstone evaluator requires:

```text
all nine Epic postgame achievements
AND
Finale seen
```

Finale seen authority:

```text
mippi-finale-seen-v1
```

## Music Player Reward

On capstone completion, persist:

```text
mippi-music-player-unlocked-v1
```

The Music Player should check this entitlement directly.

It must not depend on:

```text
theme-legendary
```

## Missing Audio Assets

The Music Player shell expects six planned tracks.

Missing files can disable playback or download for those tracks while the entitlement remains valid.

The true completion gate is therefore independent from whether final audio has been deployed yet.

## Reset

Full reset removes all `mippi*` keys.

This clears:

- Finale history,
- postgame achievements,
- Legendary capstone,
- Music Player entitlement.

## DEV QA

Fast test path:

```text
dev signals 10
dev cool max
dev legendary
dev wish fixed
dev hearts 5
dev shop complete
dev castle key
dev superboss
dev finale play
```

Then complete or force all section-visit requirements and evaluate postgame.

## QA

### Gate Independence

- reach Finale-ready without full postgame mastery,
- confirm Finale works.

### Postgame

- finish Finale,
- reveal Epic goals,
- complete all but one,
- confirm Legendary remains locked.

### Capstone

- complete final Epic goal,
- ensure Finale has been seen,
- confirm 100 Percent Complete,
- confirm Music Player unlock.

### Theme Separation

- switch to Rare,
- verify Music Player remains unlocked.

### Reset

- full reset,
- verify all postgame and Music Player state is removed.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
