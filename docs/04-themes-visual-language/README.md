# 04. Rarity Themes and Visual Language

**Hierarchy:** Documentation Home > Rarity Themes and Visual Language

Defines the Rare, Epic, and Legendary presentation hierarchy plus the rules that keep semantic rarity colors separate from the currently active global theme.

## Purpose

This category groups the canonical documentation for **Rarity Themes and Visual Language**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Rarity Theme Framework** | Defines the three-tier visual rarity system and the shared rules for switching and persisting the active site theme. | [Design](rarity-theme-framework/DESIGN.md) | [Technical](rarity-theme-framework/TECHNICAL.md) |
| **Rare Theme** | Defines the default blue and cyan visual identity used by the starting rarity tier. | [Design](rare-theme/DESIGN.md) | [Technical](rare-theme/TECHNICAL.md) |
| **Epic Theme** | Defines the purple, pink, and cyan visual identity unlocked after completing the original Signal set. | [Design](epic-theme/DESIGN.md) | [Technical](epic-theme/TECHNICAL.md) |
| **Legendary Theme** | Defines the gold, amber, and teal visual identity unlocked through the validated Wish progression. | [Design](legendary-theme/DESIGN.md) | [Technical](legendary-theme/TECHNICAL.md) |
| **Theme Cycling** | Allows unlocked rarity themes to be changed without altering the player's actual progression state. | [Design](theme-cycling/DESIGN.md) | [Technical](theme-cycling/TECHNICAL.md) |
| **Theme and Gameplay Separation** | Ensures changing visual rarity themes never grants or removes gameplay progression or feature unlocks. | [Design](theme-and-gameplay-separation/DESIGN.md) | [Technical](theme-and-gameplay-separation/TECHNICAL.md) |
| **Rarity-Isolated Components** | Keeps rarity-owned elements such as achievement rows and Shop cards visually tied to their own rarity regardless of the active global theme. | [Design](rarity-isolated-components/DESIGN.md) | [Technical](rarity-isolated-components/TECHNICAL.md) |
| **Attention Cue Language** | Defines the shared blink, pulse, flash, and glow language used to direct attention toward actionable progression UI. | [Design](attention-cue-language/DESIGN.md) | [Technical](attention-cue-language/TECHNICAL.md) |
| **Particle Presentation** | Defines the optional screen-space and event-driven particle treatments used to reinforce milestones and playful console effects. | [Design](particle-presentation/DESIGN.md) | [Technical](particle-presentation/TECHNICAL.md) |

| **Canvas-First 2D Cosmetic FX** | Shared Canvas cosmetic trails and sparks, with DOM diagnostic comparison. | [Design](canvas-first-2d-fx/DESIGN.md) | [Technical](canvas-first-2d-fx/TECHNICAL.md) |
| **Unified Game Artwork** | Fourteen themed SVG assets for HUD, collectibles and combat. | [Design](unified-game-artwork/DESIGN.md) | [Technical](unified-game-artwork/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
