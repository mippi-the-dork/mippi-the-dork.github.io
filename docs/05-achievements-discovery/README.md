# 05. Achievements and Discovery

**Hierarchy:** Documentation Home > Achievements and Discovery

Documents the discovery layer from the original 10 Rare Signals through the post-Finale Epic tier and Legendary 100 percent completion achievement.

## Purpose

This category groups the canonical documentation for **Achievements and Discovery**. Every feature listed below has two planned pages: a **Design** document covering player-facing intent, rules, UX, and product decisions, and a **Technical** document covering implementation, state, data, dependencies, runtime behavior, and QA concerns.

## Feature documentation

| Feature | Summary | Design | Technical |
| --- | --- | --- | --- |
| **Achievement System** | Tracks achievement state, unlock behavior, persistence, rewards, and presentation across all rarity tiers. | [Design](achievement-system/DESIGN.md) | [Technical](achievement-system/TECHNICAL.md) |
| **Achievement Toasts** | Provides transient achievement, hint, and system notifications without requiring the Ledger to be open. | [Design](achievement-toasts/DESIGN.md) | [Technical](achievement-toasts/TECHNICAL.md) |
| **Achievement Ledger** | Displays discovered and undiscovered achievements with rarity-owned styling, hints, progress, and postgame additions. | [Design](achievement-ledger/DESIGN.md) | [Technical](achievement-ledger/TECHNICAL.md) |
| **Discovery Hint Control** | Provides contextual hints for the next undiscovered Rare Signal and later progression guidance when all original Signals are complete. | [Design](discovery-hint-control/DESIGN.md) | [Technical](discovery-hint-control/TECHNICAL.md) |
| **Cheat Command** | Reveals the explicit solution for the next incomplete non-Legendary achievement without completing it automatically. | [Design](cheat-command/DESIGN.md) | [Technical](cheat-command/TECHNICAL.md) |
| **Rare Signal Set** | Defines the original 10 hidden Rare achievements that form the site's first major discovery progression layer. | [Design](rare-signal-set/DESIGN.md) | [Technical](rare-signal-set/TECHNICAL.md) |
| **Curious Mind** | Rewards clicking the Mippi header logo and teaches that apparently decorative UI may be interactive. | [Design](curious-mind/DESIGN.md) | [Technical](curious-mind/TECHNICAL.md) |
| **Second Perspective** | Rewards using the Project Heavy Water Perspective Visualizer. | [Design](second-perspective/DESIGN.md) | [Technical](second-perspective/TECHNICAL.md) |
| **Signal Acquired** | Rewards using a 3D Hero signal as navigation instead of treating the scene as decoration. | [Design](signal-acquired/DESIGN.md) | [Technical](signal-acquired/TECHNICAL.md) |
| **Under Construction** | Rewards intentionally selecting the work-in-progress filter in the Unreal Tools section. | [Design](under-construction/DESIGN.md) | [Technical](under-construction/TECHNICAL.md) |
| **Ghost in the Machine** | Rewards catching the rare transient ambient signal before it disappears. | [Design](ghost-in-the-machine/DESIGN.md) | [Technical](ghost-in-the-machine/TECHNICAL.md) |
| **The Whole Story** | Rewards choosing the Long resume rather than only viewing the shorter career summaries. | [Design](the-whole-story/DESIGN.md) | [Technical](the-whole-story/TECHNICAL.md) |
| **Best Boy** | Rewards repeatedly interacting with Doug and establishes him as a persistent morale system rather than a one-shot gag. | [Design](best-boy/DESIGN.md) | [Technical](best-boy/TECHNICAL.md) |
| **Unmarked** | Rewards finding the hidden interaction inside the Unmark feature presentation. | [Design](unmarked/DESIGN.md) | [Technical](unmarked/TECHNICAL.md) |
| **Classified** | Rewards interacting with the NDA project's pixel-art identity hint without revealing protected information. | [Design](classified/DESIGN.md) | [Technical](classified/TECHNICAL.md) |
| **Old Habits** | Rewards entering the classic Konami sequence as an old-school discovery path. | [Design](old-habits/DESIGN.md) | [Technical](old-habits/TECHNICAL.md) |
| **Epic Unlock** | Unlocks the Epic progression tier once all 10 original Rare Signals have been found. | [Design](epic-unlock/DESIGN.md) | [Technical](epic-unlock/TECHNICAL.md) |
| **Post-Finale Achievement Reveal** | Adds the Epic and Legendary achievement tier after the player has experienced the normal Finale and deliberately reveals it after a short delay. | [Design](post-finale-achievement-reveal/DESIGN.md) | [Technical](post-finale-achievement-reveal/TECHNICAL.md) |
| **Postgame Epic Achievement Set** | Defines the nine Epic achievements that formalize the site's true late-game completion goals. | [Design](postgame-epic-achievement-set/DESIGN.md) | [Technical](postgame-epic-achievement-set/TECHNICAL.md) |
| **Signal Saturation** | Rewards having completed all 10 original Rare Signals. | [Design](signal-saturation/DESIGN.md) | [Technical](signal-saturation/TECHNICAL.md) |
| **Maximum Cool** | Rewards having maxed the Coolness meter and activated Cool Mode at least once. | [Design](maximum-cool/DESIGN.md) | [Technical](maximum-cool/TECHNICAL.md) |
| **Gold Standard** | Rewards having unlocked Legendary rarity. | [Design](gold-standard/DESIGN.md) | [Technical](gold-standard/TECHNICAL.md) |
| **Reality Validated** | Rewards successfully completing a validated Wish. | [Design](reality-validated/DESIGN.md) | [Technical](reality-validated/TECHNICAL.md) |
| **Full Hearts** | Rewards collecting all five Hearts. | [Design](full-hearts/DESIGN.md) | [Technical](full-hearts/TECHNICAL.md) |
| **Buy the Store** | Rewards purchasing every item in the Rupee Shop, including the Design Mode capstone. | [Design](buy-the-store/DESIGN.md) | [Technical](buy-the-store/TECHNICAL.md) |
| **Another Castle** | Rewards reaching four completed Castle checks in the Castle progression. | [Design](another-castle/DESIGN.md) | [Technical](another-castle/TECHNICAL.md) |
| **Grand Tour** | Rewards visiting all six major professional sections of the portfolio. | [Design](grand-tour/DESIGN.md) | [Technical](grand-tour/TECHNICAL.md) |
| **Air Superiority** | Rewards defeating the Super UFO Boss. | [Design](air-superiority/DESIGN.md) | [Technical](air-superiority/TECHNICAL.md) |
| **100 Percent Complete** | The Legendary capstone requires all nine Epic postgame achievements plus viewing the Finale and permanently unlocks the Music Player until reset. | [Design](100-percent-complete/DESIGN.md) | [Technical](100-percent-complete/TECHNICAL.md) |

## Documentation rules

- This README is the category index and should stay concise.
- Each feature has one canonical folder in this category.
- `DESIGN.md` is the source of truth for intended user-facing behavior.
- `TECHNICAL.md` is the source of truth for implementation and runtime behavior.
- Cross-system relationships should link to the other feature's canonical documentation rather than duplicating it.
- Major behavior changes should update both the affected feature page and this index if the hierarchy changes.

## Navigation

[Back to Documentation Home](../README.md)
