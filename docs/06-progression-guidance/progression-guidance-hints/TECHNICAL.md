# Progression Guidance Hints - Technical Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Progression Guidance Hints > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides context-sensitive hints after major milestones so a player can recover when the next system is not obvious.

> This page is the canonical technical documentation for **Progression Guidance Hints** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
## Inputs

The hint evaluator reads authoritative state such as:

- original achievement set,
- Epic unlock,
- Wish charge,
- Wish Blueprint repair,
- validated Wish history,
- Legendary unlock,
- Hearts,
- Shop ownership,
- Boss state,
- section visits,
- Finale state,
- postgame reveal,
- Epic postgame achievements.

## Priority

Hints should use a stable priority order so the same state produces the same result.

Do not use random hint selection for required progression.

## Rare Phase

While:

```js
unlockedAchievements.size < ACHIEVEMENT_KEYS.length
```

the hint system can use the next undiscovered Rare achievement hint.

## Epic / Legendary Phase

After original completion, hint content switches to higher-level progression guidance.

## Postgame Gate

Only after:

```text
mippi-postgame-achievements-revealed-v1
```

may hint logic reference the postgame Epic mastery goals.

## No Side Effects

Hint generation should be pure with respect to progression.

It may:

- show toast,
- update hint text,
- print guidance.

It must not:

- grant achievement,
- set repair state,
- grant Wish charge,
- satisfy Finale requirements.

## QA

Create each major state with DEV commands.

For each:

1. request Hint,
2. verify current-state relevance,
3. resolve the hinted step,
4. request Hint again,
5. verify it advances.

Specifically test the boundary between:

- 9/10 Rare,
- 10/10 Rare,
- Wish charged,
- Blueprint broken,
- Blueprint repaired,
- Legendary unlocked,
- Finale ready,
- postgame revealed.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
