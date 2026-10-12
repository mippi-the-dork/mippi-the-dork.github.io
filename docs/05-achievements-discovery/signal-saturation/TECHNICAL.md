# Signal Saturation - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Signal Saturation > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards having completed all 10 original Rare Signals.

> This page is the canonical technical documentation for **Signal Saturation** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Condition

The authoritative check is:

```js
unlockedAchievements.size === ACHIEVEMENT_KEYS.length
```

## Historical Recognition

Because the postgame tier only appears after Finale, this condition is normally already true.

The postgame evaluator should therefore unlock Signal Saturation immediately when the tier becomes active.

## QA

- complete 10/10,
- reveal postgame,
- verify Signal Saturation is already earned or resolves immediately.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
