# 14. Dynamic Runtime Systems

**Hierarchy:** Documentation Home > Dynamic Runtime Systems

Covers the systems that observe player behavior, schedule opportunities, create timed goals, adapt pacing, and record anonymous local session information.

## Purpose

This category groups the canonical documentation for **Dynamic Runtime Systems**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Dynamic Optional Objectives** | Provides timed optional challenges that reward Rupees without becoming mandatory for Finale or 100 percent completion. | [Design](dynamic-optional-objectives/DESIGN.md) | [Technical](dynamic-optional-objectives/TECHNICAL.md) |
| **Objective HUD** | Displays objective category, goal, reward, progress, remaining time, completion, and failure states. | [Design](objective-hud/DESIGN.md) | [Technical](objective-hud/TECHNICAL.md) |
| **Objective Timer and Failure** | Drains the objective timer continuously, freezes successful objectives, and allows failed objectives to return later. | [Design](objective-timer-and-failure/DESIGN.md) | [Technical](objective-timer-and-failure/TECHNICAL.md) |
| **Objective Opportunity Seeding** | Creates or encourages the game opportunities needed by an active objective so the player is not assigned impossible dead-air tasks. | [Design](objective-opportunity-seeding/DESIGN.md) | [Technical](objective-opportunity-seeding/TECHNICAL.md) |
| **Objective Catalog** | Defines the discovery, collection, morale, arcade, system-combo, mastery, loadout, and systems objective pool. | [Design](objective-catalog/DESIGN.md) | [Technical](objective-catalog/TECHNICAL.md) |
| **Adaptive Game Director** | Observes recent player behavior and controls pacing without becoming a visible score or explicit difficulty selector. | [Design](adaptive-game-director/DESIGN.md) | [Technical](adaptive-game-director/TECHNICAL.md) |
| **Director State Machine** | Moves between Quiet, Curious, Engaged, Struggling, and Mastery using hysteresis rather than reacting to every individual action. | [Design](director-state-machine/DESIGN.md) | [Technical](director-state-machine/TECHNICAL.md) |
| **Attention Budget** | Suppresses or delays competing events when the screen already contains an important interaction, overlay, or progression moment. | [Design](attention-budget/DESIGN.md) | [Technical](attention-budget/TECHNICAL.md) |
| **Anti-Drought System** | Prevents long periods with no clickable opportunities by tracking blocked spawns, retry debt, and time since meaningful ambient activity. | [Design](anti-drought-system/DESIGN.md) | [Technical](anti-drought-system/TECHNICAL.md) |
| **Legendary Opportunity Guarantee** | Ensures Legendary players cannot become progression-soft-locked by an extended absence of ambient clickable opportunities. | [Design](legendary-opportunity-guarantee/DESIGN.md) | [Technical](legendary-opportunity-guarantee/TECHNICAL.md) |
| **Player Model** | Builds a lightweight local profile of play tendencies such as explorer, completionist, tinkerer, arcade, chaos, speedrunner, and professional behavior. | [Design](player-model/DESIGN.md) | [Technical](player-model/TECHNICAL.md) |
| **Player Model Confidence** | Tracks how strongly the current session supports each player-model interpretation rather than treating one action as a fixed identity. | [Design](player-model-confidence/DESIGN.md) | [Technical](player-model-confidence/TECHNICAL.md) |
| **Recent Behavior Window** | Biases selected runtime decisions toward recent actions so the model can adapt during a session. | [Design](recent-behavior-window/DESIGN.md) | [Technical](recent-behavior-window/TECHNICAL.md) |
| **Telemetry Foundation** | Records local session events and system usage for debriefing and adaptive behavior without sending analytics to an external service. | [Design](telemetry-foundation/DESIGN.md) | [Technical](telemetry-foundation/TECHNICAL.md) |
| **Session Statistics** | Summarizes meaningful local telemetry into readable player-facing stats and console output. | [Design](session-statistics/DESIGN.md) | [Technical](session-statistics/TECHNICAL.md) |
| **Cross-System Cohesion** | Defines deliberate interactions between otherwise separate mechanics so the game layer behaves like one connected system instead of isolated easter eggs. | [Design](cross-system-cohesion/DESIGN.md) | [Technical](cross-system-cohesion/TECHNICAL.md) |

| **Authored Spawn Motion** | Entity-specific paths powered by one shared movement clock. | [Design](authored-spawn-motion/DESIGN.md) | [Technical](authored-spawn-motion/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
