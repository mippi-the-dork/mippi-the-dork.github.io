# Dynamic Optional Objectives - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Dynamic Optional Objectives > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Offers one short, timed, Director-paced challenge at a time to turn the site's many optional systems into lightweight invitations without creating a mandatory quest log.

> This page is the canonical design documentation for **Dynamic Optional Objectives** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

Dynamic Optional Objectives solve a problem created by having many optional systems active at once.

Once the portfolio reaches Epic progression, the player can potentially interact with:

- flying pickups,
- UFOs,
- Shop loadouts,
- Castles,
- Doug Bones,
- Star Power,
- Legendary shots,
- Inspect Mode,
- the Dev Console,
- theme changes,
- system combinations.

That breadth is valuable, but it can also create decision paralysis.

Optional Objectives provide one short-term suggestion at a time.

The intended feeling is:

> Here is one interesting thing you could try next.

It is not:

> Here is your mandatory quest list.

## One Objective at a Time

The system never creates a backlog.

There is only one active Optional Objective.

This is a deliberate constraint.

A traditional quest log would make the portfolio feel like a game interface first and a professional site second.

One active card gives direction without converting exploration into task management.

## Optional Means Optional

Objectives never gate:

- professional portfolio content,
- Rare Signals,
- Epic unlock,
- Legendary unlock,
- the Shop,
- Design Mode,
- the normal Finale,
- postgame completion.

The player can dismiss an objective with no penalty.

Failure also has no progression penalty beyond missing that objective's Rupee reward.

## Timed Micro-Challenges

v2.66 changed objectives from passive suggestions into timed challenges.

Every objective now has:

- an authored time limit,
- a visible countdown,
- a draining bar,
- explicit completion,
- explicit failure.

This makes the objective feel like a temporary opportunity rather than another static instruction card.

## Reward Philosophy

Objectives pay small Rupee rewards.

Current rewards range from:

```text
1 to 3 Rupees
```

The reward should be enough to make the challenge worth considering without turning objectives into the dominant economy source.

Harder or more specific challenges pay more.

Examples:

- one valid command: 1 Rupee,
- two UFOs: 2 Rupees,
- Star Power contact kill: 3 Rupees,
- two Legendary shots: 3 Rupees.

## Failure Philosophy

Failure should be clear but low-friction.

When time expires:

- the timer freezes at zero,
- the card says `OBJECTIVE FAILED`,
- no Rupees are awarded,
- the card remains briefly so the player can read what happened,
- the objective can return later.

Failed objectives are not permanently removed from the session pool.

This is important because failure often means:

- a seeded target was missed,
- the player was distracted,
- the timing was bad.

It should not permanently remove content.

## Completion and Dismissal

Completed objectives are removed from the current-session rotation.

Manually dismissed objectives are also removed from that session's normal pool.

The distinction is intentional:

- failure means "I tried and missed, let it come back",
- dismissal means "I do not want this objective right now".

## Advanced Objectives

Some objectives are marked advanced.

Examples include:

- Star Power contact damage,
- System Combo,
- Legendary shots.

Under normal pacing these are offered only when the Director currently reads the player as:

- Engaged,
- Mastery.

Easy Mode can bypass that restriction.

This reduces the chance that an early or low-engagement visitor receives a challenge involving systems they have barely touched.

## Contextual Objective

`Destroy a UFO with Star Power contact` is special.

When Star Power begins and no objective is active, the system can immediately try to offer this objective.

The time limit is only six seconds.

The system seeds the required UFO quickly.

This creates a compact "you have the power now, use it" moment.

## Reduced Motion

Objectives that depend on moving airborne objects are not eligible when reduced motion is active.

This avoids offering a task that the site has intentionally suppressed or changed for accessibility.

Non-flying objectives remain available.

## Design Rules

- One objective at a time.
- Objectives are never mandatory progression.
- Every objective has an authored timer.
- Rewards are small and explicit.
- Failure awards nothing but does not permanently remove the objective.
- Manual dismissal is penalty-free.
- Completion and dismissal remove the objective from normal current-session rotation.
- Flying-object objectives require motion availability.
- Advanced objectives require appropriate engagement under normal pacing.
- The system should prefer variety instead of repeatedly offering the same category.
- Objective difficulty should come from interaction, not hidden rules.

## Success Criteria

Dynamic Optional Objectives succeed when they help a player discover systems they might otherwise ignore while still feeling completely safe to dismiss.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
