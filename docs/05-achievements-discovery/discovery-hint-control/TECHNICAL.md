# Discovery Hint Control - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Discovery Hint Control > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides contextual hints for the next undiscovered Rare Signal and later progression guidance when all original Signals are complete.

> This page is the canonical technical documentation for **Discovery Hint Control** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Input

The Hint control reads current progression state.

During Rare progression it determines which original achievement key remains incomplete.

## Output

The system displays a short transient hint rather than opening a large modal.

Hints should be sourced from achievement metadata or a stable mapping so they stay synchronized with achievement definitions.

## Completion Branch

When all original Rare achievements are unlocked:

```js
unlockedAchievements.size === ACHIEVEMENT_KEYS.length
```

the control switches to later-stage progression guidance.

## Control Strip

The current fixed control ordering is:

```text
Design Mode
Inspect Mode
Interact Toggle
Hint
```

The Hint control should not be moved without rechecking bottom-screen collision behavior.

## Accessibility

The Hint control is a real interactive element and should expose readable text/title state.

Hint content should not rely on color alone.

## QA

- fresh state: request Hint,
- unlock first Rare and request again,
- force `dev signals 9`,
- verify final Rare hint,
- force `dev signals 10`,
- verify later-stage guidance,
- test Rare, Epic, Legendary visual themes.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
