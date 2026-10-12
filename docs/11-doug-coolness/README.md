# 11. Doug and Coolness

**Hierarchy:** Documentation Home > Doug and Coolness

Documents Doug as a recurring morale character, his interaction loop, Coolness progression, command state, popups, and special reactions.

## Purpose

This category groups the canonical documentation for **Doug and Coolness**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Doug Interaction** | Lets the player repeatedly pet or interact with Doug and tracks those interactions for achievements, telemetry, and morale feedback. | [Design](doug-interaction/DESIGN.md) | [Technical](doug-interaction/TECHNICAL.md) |
| **Doug Popup Cameo** | Allows Doug to appear as an offscreen or screen-space cameo while preserving meaningful interaction and pet progression. | [Design](doug-popup-cameo/DESIGN.md) | [Technical](doug-popup-cameo/TECHNICAL.md) |
| **Coolness Meter** | Tracks Doug-related Coolness progression and clearly communicates the path to the maximum state. | [Design](coolness-meter/DESIGN.md) | [Technical](coolness-meter/TECHNICAL.md) |
| **Maximum Cool** | Marks the moment the Coolness meter reaches its cap and activates the Cool Mode payoff. | [Design](maximum-cool/DESIGN.md) | [Technical](maximum-cool/TECHNICAL.md) |
| **Cool Mode** | Applies the site's maximum-cool Doug presentation and enables special related collectible behavior. | [Design](cool-mode/DESIGN.md) | [Technical](cool-mode/TECHNICAL.md) |
| **Doug In Command** | Promotes Doug into a temporary command state used by Bone scheduling and specific progression interactions. | [Design](doug-in-command/DESIGN.md) | [Technical](doug-in-command/TECHNICAL.md) |
| **Rainbow Bones** | Provides the special Bone presentation associated with Cool Mode. | [Design](rainbow-bones/DESIGN.md) | [Technical](rainbow-bones/TECHNICAL.md) |
| **Doug Reaction System** | Selects contextual Doug reactions for pets, Bones, Star Power, console use, and authored Wish events. | [Design](doug-reaction-system/DESIGN.md) | [Technical](doug-reaction-system/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
