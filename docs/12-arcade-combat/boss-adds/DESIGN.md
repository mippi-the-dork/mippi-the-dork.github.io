# Boss Adds - Design Documentation

**Current behavior:** v3.04. **Category:** Arcade, Combat, and System Combos.

The Super Boss encounter begins with **six orbiting adds**, equally spaced around its moving core. Each has **3 HP** (half the normal Boss's 6 HP), and each incoming player shot takes one HP. Damaged adds show a short HP bar and hit reaction.

Destroying an add clears its orbital slot and reduces incoming fire **temporarily**. Unless the encounter has ended, that same slot respawns approximately **5 seconds later** with full 3 HP, returning pressure to the fight. The player must decide whether to keep thinning the orbit or focus on the 27-HP core. This deliberately replaces the older permanent one-shot-add behavior.

The add orbit uses the parent Boss's movement clock, so the orbit and the Boss pause during Mega Laser. A destroyed add explodes at its current location, not at the arena origin. Adds can block player shots intended for the core, and a defeated add retains its chance to drop a Heart, without awarding Rupees directly.

## Acceptance

Verify six slots, 3 distinct hits per add, readable damaged HP bar, correct world-space explosion, independent 5-second respawn, no resurrection after exit/victory, valid shooting/telemetry and synchronized beam freeze. See [Technical](TECHNICAL.md) and [v3.04 QA](../../QA/V3_02_TO_V3_04_QA.md).
