# First-Discovery Onboarding - Technical Documentation

**Hierarchy:** Documentation Home > Meta Progression and Guidance > First-Discovery Onboarding > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Introduces the existence of hidden Signals after the player has had enough time to encounter the site naturally.

> This page is the canonical technical documentation for **First-Discovery Onboarding** within the Meta Progression and Guidance category.

## Documentation Relationship

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
## Session Persistence

First-discovery onboarding uses a session-scoped marker:

```text
mippi-achievement-intro-hint-v1
```

The marker exists to prevent the same introductory explanation from replaying repeatedly during the same browser session.

## Trigger

The onboarding is associated with the player's first meaningful achievement discovery.

The exact first achievement can vary.

The logic should therefore respond to the first Rare unlock rather than requiring one specific Signal.

## Separation from Achievement State

The onboarding marker is not an achievement.

Clearing or losing the session marker must not affect:

```text
mippi-achievements-v2
```

## Session Scope

Using `sessionStorage` is intentional.

A future browser session may reintroduce lightweight guidance if product design chooses to do so, while long-term achievement completion remains persistent.

## Attention Coordination

The onboarding should avoid fighting with the current achievement toast.

If necessary, delay the hint or show it after the toast transitions away.

## QA

1. `dev fresh`.
2. Earn first Rare achievement.
3. Verify achievement feedback.
4. Verify first-discovery onboarding appears once.
5. Earn another Rare achievement.
6. Verify onboarding does not repeat in the same session.
7. Reload in same browser session.
8. Verify no redundant repeat.
9. Start a new session and evaluate intended behavior.
## Related Documentation

- [Meta Progression and Guidance Index](../README.md)
- [Design Documentation](DESIGN.md)
