# 06. Meta Progression and Guidance

**Hierarchy:** Documentation Home > Meta Progression and Guidance

Defines how the site moves players from discovery to Epic, Wish repair, Legendary, Finale, and true completion without exposing every system immediately.

## Purpose

This category groups the canonical documentation for **Meta Progression and Guidance**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Meta Progression** | Defines the overall progression chain from first visit through Rare Signals, Epic, Wish repair, Legendary, Finale, postgame, and 100 percent completion. | [Design](meta-progression/DESIGN.md) | [Technical](meta-progression/TECHNICAL.md) |
| **Progression Trace HUD** | Surfaces the next broad progression direction without turning the portfolio into a rigid quest checklist. | [Design](progression-trace-hud/DESIGN.md) | [Technical](progression-trace-hud/TECHNICAL.md) |
| **First-Discovery Onboarding** | Introduces the existence of hidden Signals after the player has had enough time to encounter the site naturally. | [Design](first-discovery-onboarding/DESIGN.md) | [Technical](first-discovery-onboarding/TECHNICAL.md) |
| **Epic Airspace Onboarding** | Introduces late-game sky and arcade progression after the player enters the Epic phase. | [Design](epic-airspace-onboarding/DESIGN.md) | [Technical](epic-airspace-onboarding/TECHNICAL.md) |
| **Progression Guidance Hints** | Provides context-sensitive hints after major milestones so a player can recover when the next system is not obvious. | [Design](progression-guidance-hints/DESIGN.md) | [Technical](progression-guidance-hints/TECHNICAL.md) |
| **Resume and Return Guidance** | Restores enough context on later visits that returning players can understand what they were doing without replaying the entire introduction. | [Design](resume-and-return-guidance/DESIGN.md) | [Technical](resume-and-return-guidance/TECHNICAL.md) |
| **Finale Readiness Cue** | Makes the Mippi header identity glow when the normal Finale is ready to be started. | [Design](finale-readiness-cue/DESIGN.md) | [Technical](finale-readiness-cue/TECHNICAL.md) |
| **True Completion Gate** | Separates the accessible normal Finale from the stricter postgame completion requirements used to unlock the Music Player. | [Design](true-completion-gate/DESIGN.md) | [Technical](true-completion-gate/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
