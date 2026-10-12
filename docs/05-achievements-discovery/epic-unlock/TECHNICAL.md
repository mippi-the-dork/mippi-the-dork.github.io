# Epic Unlock - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Epic Unlock > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Unlocks the Epic progression tier once all 10 original Rare Signals have been found.

> This page is the canonical technical documentation for **Epic Unlock** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Gate

Epic unlock derives from:

```js
unlockedAchievements.size === ACHIEVEMENT_KEYS.length
```

## Theme Availability

Once true, `availableThemeModes()` includes:

```text
epic
```

## Gameplay

Epic gameplay helpers should also use original achievement completion rather than checking the active Epic body class.

## Onboarding

One-session Epic onboarding state may use:

```text
mippi-epic-airspace-welcome-v1
```

to avoid repeating the same introductory message every time in a session.

## QA

- force `dev signals 9`,
- verify Epic unavailable,
- earn 10th Signal,
- verify Epic unlock,
- switch visual theme back to Rare,
- confirm Epic gameplay remains active.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
