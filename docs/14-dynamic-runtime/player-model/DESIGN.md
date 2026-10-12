# Player Model - Design Documentation

**Hierarchy:** Documentation Home > Dynamic Runtime Systems > Player Model > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Interprets local session behavior as a mutable play-style archetype without treating the result as a personality test.

> This page is the canonical design documentation for **Player Model** within the Dynamic Runtime Systems category.

## Documentation Relationship

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Player Model is a mirror, not a judgment.

The site already tracks enough local behavior to notice meaningful differences between sessions.

One visitor might:

- read every professional section,
- open resumes,
- ignore the game layer.

Another might:

- live in the Console,
- repair Blueprints,
- toggle debug modes.

Another might:

- fight UFOs,
- replay Mippi Bird,
- chase every collectible.

The Player Model gives those patterns a playful name.

It should never imply:

> This is who you are.

The intended message is:

> This is how you used this portfolio during this session.

## Archetypes

### EXPLORER

Broad exploration, Inspect use, galleries, hidden interaction discovery.

### COMPLETIONIST

Signals, Objectives, Hearts, Keys, hints, progression follow-through.

### TINKERER

Console use, debug modes, Blueprint repair, Inspect use, Shop loadout experimentation.

### ARCADE RAT

UFO combat, Bosses, Legendary hits, Star Power combat, Mippi Bird.

### CHAOS GREMLIN

Hidden commands, invalid commands, forced interactions, repeated debug/theme experimentation.

### PROFESSIONAL

Strong portfolio reading, resumes, professional links, relatively low game-layer activity.

### CORRECT

A session with the frankly appropriate quantity of Doug interaction and Bone collection.

### SPEEDRUNNER

Cheats, shortcuts, God Mode, Easy Mode, hidden progression behavior, unusually fast progression.

## Mutable Classification

The classification is not locked after the first few minutes.

A player can move from:

- Professional,
- to Tinkerer,
- to Arcade Rat

as their behavior changes.

v2.55 deliberately added a strong recent-behavior window so the model does not become a lifetime score that grows impossible to change.

## Hybrid Labels

When the top two archetypes are close and there is enough evidence, the site can report a hybrid:

```text
EXPLORER / TINKERER
```

This is preferable to pretending one arbitrary point difference represents certainty.

## Forming State

Before enough behavioral evidence exists, the model reports:

```text
FORMING
```

The site explicitly says it needs more behavior.

This is an honesty rule.

## Uses

The current model appears in:

- `stats`,
- Session Debrief,
- QA snapshot.

The Adaptive Director uses its own classification logic rather than directly using the Player Model archetype.

That separation prevents a playful archetype label from becoming a hidden difficulty setting.

## Local Privacy

Everything remains in the current browser session.

No server receives:

- archetype,
- scores,
- behavior timeline.

## Design Rules

- Describe session behavior, not personality.
- Use FORMING when evidence is weak.
- Allow classification to change.
- Allow hybrid labels.
- Keep scoring transparent enough for QA.
- Never gate content based on archetype.
- Never punish an archetype.
- Assistance can influence Speedrunner/Chaos interpretation without invalidating progression.
- Keep the model local.

## Success Criteria

The final label feels recognizably connected to what the player actually did while remaining lighthearted enough that no archetype feels like a failure state.
## Related Documentation

- [Dynamic Runtime Systems Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
