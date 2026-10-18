# v3.15–v3.25.2 Systems Integration: Design and Technical Reference

**Current implemented baseline:** v3.25.2, PR #55. This page replaces the brief v3.15–v3.24 summary and reconciles the version-specific source-grounded handoffs, later fixes and current runtime. Historical rules are explicitly distinguished from current rules.

## Release chronology and supersessions

| Release | What changed | Current interpretation |
| --- | --- | --- |
| 3.15.0 | Economy accessibility, 5/10/15 UFO escalation, Bird round rewards, Crafting Play and 14 studio career reveals | Bird pays once at round end relative to starting record; original studio reveals remain clipped to cards |
| 3.15.1 | Returning-visitor startup fix | Hoisted wave helpers avoid temporal-dead-zone crashes during early HUD initialization |
| 3.15.2–3.15.4 | Coolness, Invasion and Castle HUD discovery, layout/reset fixes | First Bone, first UFO kill and first Key respectively reveal tracks; undiscovered tracks occupy no space |
| 3.15.5 | Full new-visitor reset | Origin-local progress and appropriate browser caches/session traces cleared; reload recreates onboarding |
| 3.16 | Twenty distinct achievement SVG glyphs | Ten Rare, nine Epic, one Legendary; identity/presentation change, not unlock criteria |
| 3.17 | Shop item emblems, Doug Bone layering, Arcade Bounty | Original Bounty was an Epic owned passive: Rupee drop **30% → 45%**, not +45 percentage points. Became equippable in PR #51 |
| 3.18–3.18.2 | Bird refill Shop card, Insert Coin, gated Dev Console, Console HUD refinements | The console remains an Epic purchase; general/public commands retain intended access |
| 3.19–3.20 | Rare/Epic visual polish and Console ownership/command gating fixes | DEV commands and regular console access are distinct permission questions |
| 3.21 | Insert Coin tuning | Natural UFO interval factor changed from 0.60 to **0.25** while equipped |
| 3.22 | Half-Heart hostile projectiles, Bird/Heart separation, temporary Key behavior | Key eligibility experiment was reversed in v3.23; preserve only as historical |
| 3.23 | Restore Key eligibility, Star immunity, Mushroom-size protection, Bone projectile interception | Bone intercepts hostile and friendly projectile segments; regular non-forced Keys still require Epic |
| 3.24 | Shared gameplay pause, zero-Heart discovery retention, Castle impact effects | Manual P, focus/visibility and modal reasons; Bird allowed while background site is paused |
| 3.25.0 | Monotonic cursor-size Mushrooms, buffer for preexisting pickups at max size, regular UFO Hearts **5% → 20%** | The v3.25.0 Bird Shield/Spare Lives labels are historical only |
| 3.25.1 | Unified Bird LIVES, real Super Boss damage, persistent normal navigation/HUD/pickups | Current damage has no separate Super Boss player HP; encounter temporarily overrides Interact without granting Shop ownership |
| PR #49 | Expanded studio detail scrolling | Normal scroll chaining over open panels |
| PR #50 | Insert Coin early arcade | Equipped Insert Coin grants natural UFO spawning and upward shooting before Epic, without unlocking Epic progression |
| PR #51 | Simultaneous gameplay modifiers | Owned gameplay modifiers can be equipped independently, with per-item UNEQUIP and global UNEQUIP ALL. Celestial Beacon and Arcade Bounty become equippable |
| PR #52 | Storage-denied fallback, Bird bounds | Main script falls back to in-memory state; notice warns that progress may not survive reload |
| PR #53–54 | Bird completion and state hardening | No publicly writable round-state variable; protected game-over transition and regression checks |
| 3.25.2, PR #55 | Bird worker physics | Worker owns physics, lives, collision, score and ended state; renderer consumes snapshots |

## Design contracts

### Portfolio first
The site remains a professional portfolio with optional discoverable interactive systems. Main navigation, portfolio click targets, and the footer HUD are not sacrificed to arcade overlays. The v3.25.1 Super Boss is an encounter rather than a second site mode. Keep the menu, hotbar, and world pickups visible and functioning while combat is active.

### Achievement presentation versus progression
Ten original Rare achievements open Epic progression when the entire set is collected. Nine Epic postgame achievements and one Legendary capstone appear through the established reveal path. The twenty custom emblems improve recognition and convey rarity, but do not themselves change achievement unlock conditions. The early-arcade Insert Coin alternative unlocks only combat, not Epic Shop or achievement entitlements.

### Shop and equipping
Shop ownership and equipment are **different states**. All purchased gameplay modifiers can be equipped simultaneously; each may be independently deactivated. The Shop persists an array of equipped IDs rather than the historical single `equipped` string. Older single-item saves migrate without losing ownership. Previously owned Celestial Beacon and Arcade Bounty retain their prior active effects during conversion, but can be unequipped afterward. Other passive items activate through ownership and consumables are repeatable.

Insert Coin: Rare item; when equipped, activates natural UFO encounters and upward shooting even before ten Rare achievements, and uses a **0.25** natural wave-delay multiplier when normal pacing applies. Unequipping removes the early permission if Epic/Legendary progression does not otherwise grant it. Existing enemies are not automatically erased.

Arcade Bounty: Epic equippable modifier; regular UFO defeat drop chance is **45% equipped**, **30% unequipped**. It does not modify Boss rewards, direct wallet credits or unrelated pickups. Celestial Beacon: Epic equippable modifier; more frequent and longer-lived shooting stars **when equipped**, and frequency reschedules when toggled. Slowpoke, Star Extender, Dog Whistle and Golden Trigger coexist without slot eviction.

### UFO escalation and combat
Regular UFO wave thresholds are **5, then 10, then 15** kills in a recurring boss cycle; completed stages represent 0, 5 and 15 contacts for the 30-contact meter. Boss escape preserves a short reacquisition state rather than resetting the full campaign. Natural UFO spawn intervals are director-adjusted: initially 30–79 seconds, falling toward 17.5–51 seconds with progress, then optionally multiplied by Insert Coin. Formations grow from solo contacts to groups of four. Reduced Motion, attention/modal blockers, boss state and regular UFO caps still matter.

Hostile damage resolves through the existing unified defense priority: Star immunity; max-tier Mushroom hit buffer when available; cursor-size tier reduction; then half-Heart damage. Regular UFO Heart-drop eligibility was increased to 20% in v3.25.0. Doug Bones can intercept incoming and outgoing projectiles using swept segment tests, without consuming the Bone. Lab projectiles remain isolated from production rewards.

### Mippi Bird Lives
A round has **one base Life**, plus one extra round Life when the permanent Bird Shop upgrade is owned, plus any banked purchased refills. The displayed HUD uses just `LIVES N`; it never adds an invisible extra last hit. Every valid collision consumes one Life. LIVES 1 → first collision → LIVES 0 / Game Over. LIVES 5 → fifth collision ends the round. Shop extra-life availability resets each new round; banked refills are spent and do not regenerate. Post-hit invulnerability prevents the same collision burst from consuming multiple Lives.

Bird Rupee reward is paid **once** at round end relative to the high score at round start: new score lower than starting best earns zero; equal earns one; greater earns `score - startingBest + 1`. A completed run scoring 11 against a starting high of 8 earns four Rupees. Mippi Bird scoring is independent of Hearts.

### Super Boss interaction and HUD
Super Boss damage calls the shared ordinary cursor damage pipeline, with an encounter hit lock around 650 ms. No independent Boss player health is substituted for Hearts/Mushroom defenses. Arena combat is layered beneath sticky navigation, unified HUD and flying items; boss UI is repositioned to avoid overlapping the header. Interact OFF is borrowed for the encounter even for visitors without the Interact purchase; the original Interact selection returns afterward, without granting entitlement.

### Pausing, persistence and runtime integrity
v3.24 uses a reason-set pause coordinator: explicit P pause, focus/visibility pause and modal sources including Shop and Bird. Timer and animation callbacks are coordinated through the shared pause system; the Bird game has a specific background-pause exception. v3.25.2 extends pause coordination to the worker's physics timer.

The primary script uses fallbacks for browsers that deny `localStorage` or `sessionStorage`: gameplay remains usable for the current page lifetime, but persistence cannot be promised. An unobtrusive notice explains this. Do not claim that other standalone modules are fully covered without auditing them.

Client-side game state cannot be made authoritative against a browser owner. The Bird worker, fixed-step simulation, private state, bounds and tests raise the effort required for casual console tampering; they do not provide server-side validation. Code and design remain documentable rather than intentionally deceptive.

## Technical implementation map

| Owner | Current responsibility | Critical contract |
| --- | --- | --- |
| `script.js` | Overall economy, rewards, equipment, progression, HUD, canvas rendering and worker events | Shop equipment is a Set internally and serialized as an array; worker snapshots are presentation/events, not arbitrary state setters |
| `mippi-bird-worker.js` | Bird fixed-step simulation, pipe collision, Lives, score and Game Over | Dedicated worker created when Bird opens, terminated on close; 60 Hz timestep, bounded 4-step catch-up, ~30 Hz snapshots plus meaningful events |
| `style.css` | Theme visuals, item/HUD stacking, modal composition, studio reveal scrolling | Expanded studio cards allow page scroll chaining; Super Boss does not cover site controls |
| `index.html` | Shop descriptions/buttons and served main script version | Per-item equip/unequip and UNEQUIP ALL; v3.25.2 script version |
| `tests/mippi-bird-integrity.test.cjs` | Bird regression checks | Parse, worker lifecycle, message rejection, finite bank, final-Life death and pause/resume tests |

The worker accepts narrow reset, flap, slow, pause and stop messages, not arbitrary coordinate, score or Life assignments. The main thread renders 520 × 280 Canvas frames and processes worker event messages for HUD, telemetry and reward attribution. Fixed step and snapshot cadence are *design targets validated in source/mock checks*, not claimed measured FPS.

## QA priorities and known evidence limits

1. First-visit and returning-visitor startup, full reset, hidden HUD tracks and correct 5/10/15 wave cycle.
2. Confirm every current Shop entry and price against `SHOP_ITEMS`, including ownership/equipment distinction, both upgraded Epic modifiers, and save migration.
3. Validate the Rare Insert Coin alternate combat entry, then unequip to confirm its natural-spawn and shooting gate drops without erasing existing contacts.
4. Verify all Lives examples with Bird base, permanent upgrade and purchased refill combinations; last hit ends round and reward fires once.
5. Verify Super Boss impacts consume the same cursor, buffer and Heart layers as ordinary UFO impacts; menu/hotbar/pickups remain accessible.
6. Browser storage deliberately denied, ordinary storage, private browsing and reset. Note which standalone scripts still use native storage directly.
7. With Bird opened and closed, inspect Worker lifecycle and FPS/frame times under normal site load, particle-heavy combat and background/foreground transitions.

**Validation:** Source reviews and selected worker/mock checks were performed during development. No comprehensive real-browser performance or privacy-mode regression suite has been reported as passed.

## Provenance and release references

- Historical handoff: `mippi-v3.15-to-v3.25.1-complete-documentation-handoffs`, nine files per version, v3.15 through v3.25.1. Read version-specific design, technical, state and QA files before revising deeper feature pages.
- Development PRs: [#49](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/49), [#50](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/50), [#51](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/51), [#52](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/52), [#53](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/53), [#54](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/54), [#55](https://github.com/mippi-the-dork/mippi-the-dork.github.io/pull/55).
