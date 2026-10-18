# Super UFO Boss - Design Documentation

## Current implementation correction (v3.25.2)

Super Boss uses the regular cursor/Heart/Mushroom damage system and respects the normal site presentation: sticky header, footer hotbar and floating pickups remain visible and usable. The fight borrows Interact OFF temporarily, without awarding the Interact Shop purchase, and restores the original choice afterward.

Earlier sections are historical where they conflict with this current specification. See [release evolution](../../V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md).

---

## Original historical specification (retained for provenance)

**Current behavior:** v3.04. **Category:** Arcade, Combat, and System Combos.

The Super Boss is the climactic optional arcade encounter. The core now takes **27 hits** (50% more than its former 18), while the regular Boss remains **6 HP**. Its health HUD visibly starts at **27 / 27**. Its attack phases remain proportional to health, escalating near **18 HP** and **9 HP**.

The core pans back and forth across the top with occasional reversals. v3.03 reduced lateral velocity by roughly half from the earlier v3.01 presentation. It stops moving during Mega Laser, alongside the orbit of **six adds**. Each add has **3 HP**, shows damage feedback and returns to its own orbital slot after a **5-second delay** if the fight continues, preventing permanent removal of threat pressure.

The Mega Laser charges from the lower-center mouth region with a rounded capsule/orb at its origin, then slowly tracks the cursor; shooting, rockets and encounter exit remain part of the existing interaction. A player can exit without completing the fight. Victory retains the same Super Boss reward rules and postgame bookkeeping.

## QA

Check 27 HP, attack phase transitions, six 3-HP respawning adds, horizontal movement speed, movement/beam freeze, laser mouth alignment, and cleanup on exit/victory. See [Technical](TECHNICAL.md), [Boss Adds](../boss-adds/DESIGN.md), and [v3.04 QA](../../QA/V3_02_TO_V3_04_QA.md).
