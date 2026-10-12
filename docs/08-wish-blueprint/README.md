# 08. Wish and Blueprint Progression

**Hierarchy:** Documentation Home > Wish and Blueprint Progression

Covers the celestial charge loop, intentionally broken Blueprint path, validated Wish progression, special Wish outcomes, and Legendary unlock.

## Purpose

This category groups the canonical documentation for **Wish and Blueprint Progression**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Shooting Star Charge** | Introduces a catchable celestial event that grants the single-use charge required to make a Wish. | [Design](shooting-star-charge/DESIGN.md) | [Technical](shooting-star-charge/TECHNICAL.md) |
| **Wish Charge Persistence** | Preserves the celestial charge through the intended Blueprint failure so the player can repair the error and retry without waiting for another star. | [Design](wish-charge-persistence/DESIGN.md) | [Technical](wish-charge-persistence/TECHNICAL.md) |
| **Wish Input State** | Transforms the console from normal command mode into an explicit prompt that waits for the player's Wish text. | [Design](wish-input-state/DESIGN.md) | [Technical](wish-input-state/TECHNICAL.md) |
| **BP_WishManager** | Provides the deliberately broken Blueprint-themed repair screen used as the central Epic-to-Legendary progression puzzle. | [Design](bp-wishmanager/DESIGN.md) | [Technical](bp-wishmanager/TECHNICAL.md) |
| **Is Valid Repair** | Lets the player insert an Is Valid node to repair the intentionally broken Wish reference path. | [Design](is-valid-repair/DESIGN.md) | [Technical](is-valid-repair/TECHNICAL.md) |
| **Validated Wish** | Successfully routes a charged Wish through the repaired Blueprint and records the Wish as a major progression milestone. | [Design](validated-wish/DESIGN.md) | [Technical](validated-wish/TECHNICAL.md) |
| **Legendary Unlock** | Unlocks Legendary progression after the player successfully completes the validated Wish path. | [Design](legendary-unlock/DESIGN.md) | [Technical](legendary-unlock/TECHNICAL.md) |
| **Wish Result Overlay Framework** | Provides player-dismissible result screens for authored Wishes that need enough time to be read and understood. | [Design](wish-result-overlay-framework/DESIGN.md) | [Technical](wish-result-overlay-framework/TECHNICAL.md) |
| **Engine Port Wish** | Simulates porting the project through Unreal, Unity, and Godot and presents the escalating technical absurdity as a persistent result screen. | [Design](engine-port-wish/DESIGN.md) | [Technical](engine-port-wish/TECHNICAL.md) |
| **AI Vibe Refactor Wish** | Temporarily corrupts the website with overconfident AI-driven changes and requires the player to use the dedicated Undo AI action. | [Design](ai-vibe-refactor-wish/DESIGN.md) | [Technical](ai-vibe-refactor-wish/TECHNICAL.md) |
| **Game Success Wish** | Grants a wildly successful game while redirecting the financial benefit to Mippi as a monkey-paw interpretation of the Wish. | [Design](game-success-wish/DESIGN.md) | [Technical](game-success-wish/TECHNICAL.md) |
| **Doug Executive Review Wish** | Lets Doug perform an executive design review with bark-driven directives before approving the site for production. | [Design](doug-executive-review-wish/DESIGN.md) | [Technical](doug-executive-review-wish/TECHNICAL.md) |
| **Mippi Wish** | Interprets wishes involving Mippi as a route to the contact panel. | [Design](mippi-wish/DESIGN.md) | [Technical](mippi-wish/TECHNICAL.md) |
| **Blender Wish** | Interprets Blender-related wishes as a joke about uninstalling Blender from the current universe. | [Design](blender-wish/DESIGN.md) | [Technical](blender-wish/TECHNICAL.md) |
| **Money Wish** | Interprets money-related wishes through the site's trickle-down gag and coin payoff. | [Design](money-wish/DESIGN.md) | [Technical](money-wish/TECHNICAL.md) |
| **HAL Denial Wish** | Responds to exact wish or wishes inputs with the intentionally unhelpful HAL-style denial branch. | [Design](hal-denial-wish/DESIGN.md) | [Technical](hal-denial-wish/TECHNICAL.md) |
| **Generic Wish** | Provides a safe fallback response for validated Wish text that does not match an authored special branch. | [Design](generic-wish/DESIGN.md) | [Technical](generic-wish/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
