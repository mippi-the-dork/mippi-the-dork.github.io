# Epic Airspace Onboarding - Technical Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > Epic Airspace Onboarding > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Introduces late-game sky and arcade progression after the player enters the Epic phase.

> This page is the canonical technical documentation for **Epic Airspace Onboarding** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
## Session Marker

Epic airspace onboarding uses:

```text
mippi-epic-airspace-welcome-v1
```

in session storage.

## Progression Gate

The onboarding is tied to original Rare completion:

```js
unlockedAchievements.size === ACHIEVEMENT_KEYS.length
```

or the equivalent Epic gameplay helper.

It should not check:

```text
body.theme-complete
```

as the authority.

## Why Session Storage

The message is onboarding, not progression.

Session storage prevents repeated presentation during one browser session without creating another permanent progression key.

## Trigger Opportunities

The onboarding can be evaluated after:

- the 10th Rare achievement unlocks,
- startup if the player already has Epic progression but has not seen the session welcome,
- relevant airspace initialization.

## Theme Cycling Safety

Switching:

```text
Epic -> Rare -> Epic
```

must not replay the onboarding.

The session marker should remain authoritative for that session.

## QA

- `dev signals 9`,
- earn final Rare naturally or force 10,
- verify welcome once,
- cycle themes repeatedly,
- verify no repeat,
- reload in same session,
- verify session behavior,
- verify airborne systems remain available in Rare visual theme.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
