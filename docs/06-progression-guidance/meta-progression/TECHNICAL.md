# Meta Progression - Technical Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Meta Progression > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines the overall progression chain from first visit through Rare Signals, Epic, Wish repair, Legendary, Finale, postgame, and 100 percent completion.

> This page is the canonical technical documentation for **Meta Progression** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
## State Model

Meta progression is derived from multiple authoritative systems rather than one giant numeric progression variable.

Important state groups include:

- original Rare achievements,
- Epic availability,
- Legendary unlock,
- Wish charge and repair state,
- validated Wish history,
- Boss history,
- Heart progress,
- Shop ownership,
- major section visits,
- Finale seen state,
- postgame reveal state,
- postgame Epic achievement state,
- Music Player entitlement.

## Core Persistent Keys

Relevant long-term storage includes:

```text
mippi-achievements-v2
mippi-legendary-unlocked
mippi-wish-charge-v1
mippiWishUnlocked
mippi-finale-wish-v1
mippi-finale-boss-v1
mippi-heart-pickups-v1
mippi-heart-reward-v1
mippi-shop-state-v1
mippi-finale-seen-v1
mippi-postgame-sections-v1
mippi-postgame-achievements-revealed-v1
mippi-postgame-achievements-v1
mippi-music-player-unlocked-v1
```

Additional feature-specific keys contribute to postgame completion.

## Session Keys

Progression guidance also uses session state for one-time onboarding:

```text
mippi-achievement-intro-hint-v1
mippi-epic-airspace-welcome-v1
```

These prevent repeated introductory messaging during one browser session.

## Derived Milestones

### Rare Completion

```js
unlockedAchievements.size === ACHIEVEMENT_KEYS.length
```

### Legendary Progression

Authoritative state:

```js
legendaryUnlocked
```

or the equivalent Legendary gameplay helper.

### Finale Seen

Persistent state:

```text
mippi-finale-seen-v1
```

### Postgame Reveal

Persistent state:

```text
mippi-postgame-achievements-revealed-v1
```

### True Completion

Derived from:

- all nine postgame Epic achievements,
- Finale seen.

The reward persists through:

```text
mippi-music-player-unlocked-v1
```

## Evaluation Strategy

Progression is re-evaluated after meaningful state changes such as:

- achievement unlock,
- Wish completion,
- Boss victory,
- Heart update,
- Shop purchase,
- section visit,
- Castle completion,
- Coolness milestone,
- Super Boss victory,
- Finale completion.

This avoids requiring a centralized polling loop for every progression condition.

## Dependency Direction

The intended dependency direction is:

```text
feature state
    ->
derived progression
    ->
guidance / attention / unlock presentation
```

Guidance should observe progression.

Guidance should not become the authority that creates progression.

For example, a Finale-ready glow reflects eligibility but does not itself grant eligibility.

## Theme Separation

Never derive meta progression from:

```text
theme-complete
theme-legendary
```

Those classes represent presentation only.

Use actual achievement or unlock state.

## Optional Objectives

Dynamic Optional Objectives are not part of the required meta progression.

Their rewards and telemetry may support the player's broader experience, but no Finale or capstone gate should depend on completing them.

## DEV Matrix

Useful QA commands:

```text
dev fresh
dev snapshot
dev signals 0
dev signals 10
dev epic
dev legendary
dev wish charge
dev wish broken
dev wish fixed
dev hearts 5
dev shop complete
dev cool max
dev castle key
dev boss
dev superboss
dev finale ready
dev finale play
```

These allow testing individual transitions without replaying the entire site.

## QA

Test the progression chain in two ways.

### Natural Full Run

Complete the site without DEV state forcing.

Validate that each layer becomes understandable before the next layer is required.

### DEV-Assisted Matrix

Jump directly to each major milestone and verify:

- correct UI appears,
- prior progression remains intact,
- next guidance becomes available,
- no unrelated progression is accidentally granted,
- reload preserves long-term state,
- full reset returns to Layer 0.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
