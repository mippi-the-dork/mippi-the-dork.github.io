# Extensive QA Test Plan

**Historical base:** v2.80; see v2.89 supplement below

This is the canonical documentation copy of the v2.80 extensive release test plan.

# Mippi Portfolio v2.80 - Extensive QA Test Plan

## Purpose

This document is a full regression and progression test plan for the Mippi portfolio game layer as of v2.80.

The goal is to verify:

- First-load stability and Three.js startup.
- The public portfolio remains usable at every progression state.
- The original 10 Rare Signals work naturally.
- Epic and Legendary progression remain readable and completable.
- Wish, Blueprint, Shop, Doug, Castle, Heart, UFO, Director, Objective, Finale, postgame, and Music Player systems work together.
- Persistent state survives reloads when it should.
- `reset` returns the site to a true first-visit state.
- The temporary hidden DEV commands can rapidly reproduce important states without contaminating normal player telemetry.
- UI layout, rarity styling, attention glows, and screen-space controls do not collide.

This is intentionally much more thorough than a normal smoke test. It is designed for release-candidate testing and for reproducing bugs quickly.

---

# 1. Test Rules and Setup

## 1.1 Recommended environments

Run the complete critical path in at least these environments:

| Environment | Priority | Notes |
| --- | --- | --- |
| Local preview through `PreviewLocal.bat` | Critical | Specifically tests the local Three.js cold-start issue. |
| GitHub Pages hosted build | Critical | This is the real deployment target. |
| Chrome, current | Critical | Primary browser. |
| Edge, current | High | Chromium but catches browser-specific integration differences. |
| Firefox, current | Medium | Useful for layout, WebGL, audio, and persistence differences. |
| 1920x1080 desktop | Critical | Main reference layout. |
| 1366x768 desktop | Critical | Common smaller desktop/laptop layout. |
| 1280x720 desktop | High | Good fixed-HUD collision stress case. |
| 1024x768 | High | Narrow desktop/tablet stress case. |
| 390x844 mobile-width | Medium | Best-effort responsive check. |

## 1.2 Before every clean-run suite

Open the in-page Dev Console with `~`, then run:

```text
dev fresh
```

This clears Mippi local and session storage and reloads immediately.

For a player-facing reset test, use the normal command instead:

```text
reset
```

Important: `dev fresh` and `reset` intentionally erase progression.

## 1.3 Useful QA commands

The DEV category is intentionally hidden from normal `help` output. It still exists.

Use:

```text
dev help
```

Useful global commands:

```text
dev snapshot
dev clean
dev fresh
```

`dev snapshot` should be used frequently while testing to verify the page's internal state matches what the UI is showing.

`dev clean` clears transient Wish overlays, AI corruption, special popups, and active Super Boss state without wiping persistent progression.

## 1.4 Result notation

Use these values when checking off the plan:

- PASS: behavior matches the expected result.
- FAIL: behavior is wrong or incomplete.
- BLOCKED: another bug prevents the test.
- N/A: intentionally not applicable to this build or environment.

When logging a failure, include:

- Test ID.
- Browser and viewport.
- Local or hosted.
- Clean or existing save.
- Exact DEV commands used.
- Screenshot or video if visual.
- `dev snapshot` output if progression-related.
- Browser console error if present.
- `window.__MIPPI_RUNTIME__.snapshot()` output if Three.js/startup-related.

---

# 2. Five-Minute Critical Smoke Test

Run this after every code change before doing deeper QA.

- [ ] **SMOKE-001** - Launch through `PreviewLocal.bat`. Three.js Hero appears on the first load without manually refreshing.
- [ ] **SMOKE-002** - Open Dev Console with `~`. Run `version`. It reports v2.80.
- [ ] **SMOKE-003** - Run `help`. No DEV category or DEV commands are shown.
- [ ] **SMOKE-004** - Run `dev help`. DEV commands appear and are clickable.
- [ ] **SMOKE-005** - Run `dev attention rupees`. Rupees HUD pulses because an affordable Shop item exists.
- [ ] **SMOKE-006** - Run `dev attention wish`. Dev Console attention state indicates Wish readiness.
- [ ] **SMOKE-007** - Run `dev attention blueprint`. Dev Console attention state changes to the Blueprint repair state.
- [ ] **SMOKE-008** - Run `help` while Blueprint is broken. `blueprint` is visibly red. `wish` remains crisp, readable, and rainbow animated.
- [ ] **SMOKE-009** - Click the `blueprint` word in the Help list. It executes the command and opens BP_WishManager.
- [ ] **SMOKE-010** - Run `dev finale play`. Finale starts and the mouse cursor is visible when the two final buttons appear.
- [ ] **SMOKE-011** - Exit the Finale. After about 5 seconds the Achievement Ledger force-opens and reveals the postgame tier.
- [ ] **SMOKE-012** - Run `dev postgame complete`. Legendary 100% completion unlocks and the Music Player appears.
- [ ] **SMOKE-013** - Music Player left edge aligns with the left edge of the Mippi logo square in the header.
- [ ] **SMOKE-014** - Expand Music Player. It expands downward while its top edge remains fixed.
- [ ] **SMOKE-015** - Run `reset`. The page reloads. Three.js still works immediately after the reset reload without another manual refresh.

If any Smoke test fails, stop release-candidate testing and fix it first.

---

# 3. Startup, Local Preview, Cache, and Three.js

## 3.1 Local cold start

- [ ] **BOOT-001** - Close all tabs running the portfolio.
- [ ] **BOOT-002** - Double-click `PreviewLocal.bat`.
- [ ] **BOOT-003** - Confirm the page opens through localhost HTTP, not `file://`.
- [ ] **BOOT-004** - Confirm the first load works without pressing Refresh.
- [ ] **BOOT-005** - Confirm Hero Three.js geometry renders.
- [ ] **BOOT-006** - Confirm interactive Hero signal objects render.
- [ ] **BOOT-007** - Confirm ambient Three.js page layer renders.
- [ ] **BOOT-008** - Scroll to About and confirm the About Three.js scene renders.
- [ ] **BOOT-009** - Confirm there are no uncaught JavaScript errors in browser DevTools.
- [ ] **BOOT-010** - In the browser console, run:

```js
window.__MIPPI_RUNTIME__.snapshot()
```

Expected:

- No fatal startup error.
- Three.js source attempts are present.
- Hero renderer initialized.
- Ambient renderer initialized.
- About renderer initialized when About is reached or when its initialization path runs.

## 3.2 Hosted first load

- [ ] **BOOT-011** - Open the GitHub Pages deployment in a new Incognito or Private window.
- [ ] **BOOT-012** - Confirm Hero 3D works on the first load without refresh.
- [ ] **BOOT-013** - Confirm ambient and About 3D also work.
- [ ] **BOOT-014** - Hard refresh and confirm behavior is unchanged.
- [ ] **BOOT-015** - Confirm no stale older build is visibly running.

## 3.3 Reset reload regression

1. Run:

```text
dev legendary
```

2. Confirm Three.js is visible.
3. Run:

```text
reset
```

Expected:

- [ ] **BOOT-016** - Reset asks for or performs the intended reset flow.
- [ ] **BOOT-017** - Page performs a real document reload.
- [ ] **BOOT-018** - Site returns to first-visit Rare state.
- [ ] **BOOT-019** - Hero Three.js immediately works after the reset reload.
- [ ] **BOOT-020** - Ambient Three.js immediately works after the reset reload.
- [ ] **BOOT-021** - No additional manual browser refresh is needed.

## 3.4 Version and cache sanity

- [ ] **BOOT-022** - `version` returns v2.80.
- [ ] **BOOT-023** - `index.html` loads current `style.css`, `script.js`, and `perspective-demo.js` cache versions.
- [ ] **BOOT-024** - `PreviewLocal.bat` opens a current-version URL with its per-launch cache token.
- [ ] **BOOT-025** - Reloading locally does not accidentally show an older UI state because of cached JS/CSS.

---

# 4. Base Portfolio Navigation and Layout

Start from `dev fresh`.

- [ ] **NAV-001** - Header logo and `MIPPI THE DORK` identity render cleanly.
- [ ] **NAV-002** - Games navigation reaches Games.
- [ ] **NAV-003** - Career navigation reaches Career.
- [ ] **NAV-004** - Consulting navigation reaches Consulting.
- [ ] **NAV-005** - Crafting Play navigation reaches Crafting Play.
- [ ] **NAV-006** - Tools navigation reaches Unreal Tools.
- [ ] **NAV-007** - About navigation reaches About.
- [ ] **NAV-008** - Footer copyright is not covered by fixed screen-space controls.
- [ ] **NAV-009** - Return to Top is not covered by fixed screen-space controls.
- [ ] **NAV-010** - Return to Top works.
- [ ] **NAV-011** - Bottom-left progression controls do not cover professional content at the bottom of the page.
- [ ] **NAV-012** - Bottom-right control order is Design Mode, Inspect Mode, Interact Toggle, Hint when all are available.

---

# 5. Section Visit Tracking

There are six major postgame sections:

- Games
- Career
- Consulting
- Crafting
- Tools
- About

Normal telemetry counts a section when at least 25 percent is intersecting under the normal IntersectionObserver path.

## Natural test

- [ ] **SECT-001** - Fresh start. Scroll through Games until clearly in view.
- [ ] **SECT-002** - Repeat for Career.
- [ ] **SECT-003** - Repeat for Consulting.
- [ ] **SECT-004** - Repeat for Crafting.
- [ ] **SECT-005** - Repeat for Tools.
- [ ] **SECT-006** - Repeat for About.
- [ ] **SECT-007** - Reload the page and verify the postgame six-section completion state persists.

## Normal Finale visit requirement

The normal Finale requires 5 of the 6 sections to have session visits.

- [ ] **SECT-008** - Visit only 4 major sections. Finale should not become eligible from section coverage alone.
- [ ] **SECT-009** - Visit a 5th major section. Section coverage requirement is now satisfied.

## Postgame Grand Tour

- [ ] **SECT-010** - Reveal postgame tier with `dev postgame reveal`.
- [ ] **SECT-011** - Verify `Grand Tour` remains `???` until all 6 have been visited.
- [ ] **SECT-012** - Visit the final missing section.
- [ ] **SECT-013** - Verify `Grand Tour` unlocks as an Epic achievement.

---

# 6. Original 10 Rare Signals

The first 10 achievements must always retain Rare blue styling in the Ledger regardless of active site theme.

For a true release-candidate run, test all 10 naturally at least once.

## 6.1 Curious Mind

- [ ] **ACH-R01-001** - `dev fresh`.
- [ ] **ACH-R01-002** - Wait about 6 seconds without finding an achievement. A discovery hint points toward the header mark.
- [ ] **ACH-R01-003** - Click the Mippi logo.
- [ ] **ACH-R01-004** - `Curious Mind` unlocks.
- [ ] **ACH-R01-005** - The first-discovery Ledger onboarding occurs.

## 6.2 Second Perspective

- [ ] **ACH-R02-001** - Use the Project Heavy Water Perspective Visualizer.
- [ ] **ACH-R02-002** - `Second Perspective` unlocks.

## 6.3 Signal Acquired

- [ ] **ACH-R03-001** - Click an interactive Three.js Hero navigation object.
- [ ] **ACH-R03-002** - Navigation works.
- [ ] **ACH-R03-003** - `Signal Acquired` unlocks.

## 6.4 Under Construction

- [ ] **ACH-R04-001** - In Unreal Tools, select the WIP filter.
- [ ] **ACH-R04-002** - `Under Construction` unlocks.

## 6.5 Ghost in the Machine

- [ ] **ACH-R05-001** - Wait for the rare ambient glowing diamond signal.
- [ ] **ACH-R05-002** - Click it before it exits.
- [ ] **ACH-R05-003** - `Ghost in the Machine` unlocks.

## 6.6 The Whole Story

- [ ] **ACH-R06-001** - Open the Long resume.
- [ ] **ACH-R06-002** - `The Whole Story` unlocks.

## 6.7 Best Boy

- [ ] **ACH-R07-001** - Click Doug repeatedly.
- [ ] **ACH-R07-002** - Confirm intermediate Doug reactions occur.
- [ ] **ACH-R07-003** - On the 5th required interaction, `Best Boy` unlocks.

## 6.8 Unmarked

- [ ] **ACH-R08-001** - In Unreal Tools, click the Unmark artwork/logo.
- [ ] **ACH-R08-002** - `Unmarked` unlocks.

## 6.9 Classified

- [ ] **ACH-R09-001** - In the Career NDA card, click the pixel-art Mob logo.
- [ ] **ACH-R09-002** - `Classified` unlocks.

## 6.10 Old Habits

Enter:

```text
Up Up Down Down Left Right Left Right B A
```

WASD may be used for the directional portion.

- [ ] **ACH-R10-001** - Correct sequence unlocks `Old Habits`.
- [ ] **ACH-R10-002** - Random key presses do not unlock it.

## 6.11 Rare completion

- [ ] **ACH-R11-001** - 10/10 Signals unlock Epic.
- [ ] **ACH-R11-002** - Ledger shows all 10 original achievements as Rare.
- [ ] **ACH-R11-003** - Change active theme to Epic. Original entries stay Rare blue.
- [ ] **ACH-R11-004** - Later change active theme to Legendary. Original entries still stay Rare blue.

Fast state shortcut:

```text
dev epic
```

---

# 7. Achievement Hints, Cheat, and Ledger Behavior

- [ ] **LEDGER-001** - Before first achievement, the Ledger is hidden.
- [ ] **LEDGER-002** - After first achievement, Ledger becomes available.
- [ ] **LEDGER-003** - Undiscovered original achievements show `???` plus a subtle hint.
- [ ] **LEDGER-004** - Hint button gives a non-explicit trace for the next normal achievement.
- [ ] **LEDGER-005** - `cheat` gives an explicit instruction for the next missing normal achievement.
- [ ] **LEDGER-006** - After postgame achievements are revealed, `cheat` still only concerns the non-Legendary achievement progression intended by design.
- [ ] **LEDGER-007** - `cheat` does not target the Legendary 100% capstone itself.
- [ ] **LEDGER-008** - Ledger frame follows the active site theme.
- [ ] **LEDGER-009** - Rare item cards remain Rare blue.
- [ ] **LEDGER-010** - Epic item cards remain Epic purple/pink.
- [ ] **LEDGER-011** - Legendary item card remains Legendary gold/teal.
- [ ] **LEDGER-012** - Each entry explicitly lists its rarity as text.

---

# 8. Theme Progression and Theme Independence

## Rare

```text
dev rare
```

- [ ] **THEME-001** - Rare palette is active.
- [ ] **THEME-002** - Legendary-only visual treatment is absent.

## Epic

```text
dev epic
```

- [ ] **THEME-003** - Epic palette is active.
- [ ] **THEME-004** - Epic ambient gameplay is enabled.
- [ ] **THEME-005** - Theme control can return to Rare without disabling Epic-unlocked gameplay systems.

## Legendary

```text
dev legendary
```

- [ ] **THEME-006** - Legendary palette is gold/amber/orange with teal/cyan support.
- [ ] **THEME-007** - Legendary Three.js geometry changes are present.
- [ ] **THEME-008** - Legendary cursor combat remains unlocked even if visual theme is switched back to Rare or Epic.
- [ ] **THEME-009** - Finale-ready Mippi header glow is visible in Legendary, not only Rare/Epic.

---

# 9. Dev Console Core and Help Interaction

## 9.1 Help visibility

- [ ] **CONSOLE-001** - Run `help`.
- [ ] **CONSOLE-002** - DEV category is absent.
- [ ] **CONSOLE-003** - No `dev ...` commands are advertised.
- [ ] **CONSOLE-004** - Run `dev help`. Hidden QA command matrix appears.

## 9.2 Clickable Help entries

- [ ] **CONSOLE-005** - Run `help`.
- [ ] **CONSOLE-006** - Click `about`. It executes and navigates to About.
- [ ] **CONSOLE-007** - Reopen console, run `help`, click `shop`. Shop opens.
- [ ] **CONSOLE-008** - Clickable command text still looks like readable console text, not oversized buttons.
- [ ] **CONSOLE-009** - Keyboard typing still works normally after clicking a Help command.

## 9.3 Wish styling

- [ ] **CONSOLE-010** - In `help`, the word `wish` is visible and readable.
- [ ] **CONSOLE-011** - `wish` has its animated rainbow treatment.
- [ ] **CONSOLE-012** - The actual glyphs remain visible. It must not collapse into a blurred glow or smudge.
- [ ] **CONSOLE-013** - Hovering the clickable `wish` command does not remove the rainbow fill.

## 9.4 Blueprint repair styling

```text
dev attention blueprint
```

- [ ] **CONSOLE-014** - If `help` is already on screen, `blueprint` turns red live.
- [ ] **CONSOLE-015** - If `help` is printed after the break, `blueprint` is red immediately.
- [ ] **CONSOLE-016** - Click the red `blueprint` command. BP_WishManager opens.
- [ ] **CONSOLE-017** - Repair the Blueprint with Is Valid.
- [ ] **CONSOLE-018** - Visible Help output updates and `blueprint` returns to normal styling.

## 9.5 FPS and unit stats

- [ ] **CONSOLE-019** - Run `stat fps`. FPS overlay appears.
- [ ] **CONSOLE-020** - FPS value updates over time.
- [ ] **CONSOLE-021** - Value plausibly reflects browser-tab rendering rather than a permanently fixed fake number when requestAnimationFrame samples are available.
- [ ] **CONSOLE-022** - Background/minimized tab recovery does not permanently break FPS reporting.
- [ ] **CONSOLE-023** - Run `stat unit`. Frame, Game, Draw, GPU, and RHIT-style timings appear as designed.

---

# 10. Wish Charge and Blueprint Repair Loop

## 10.1 No-charge recovery

Start in Epic:

```text
dev epic
```

Run:

```text
wish
```

Expected:

- [ ] **WISH-001** - With no charge, the site does not silently dead-end.
- [ ] **WISH-002** - A Shooting Star opportunity is scheduled shortly afterward.

## 10.2 Charged broken Blueprint

```text
dev wish broken
```

- [ ] **WISH-003** - Wish charge shows 1/1.
- [ ] **WISH-004** - Blueprint is invalid.
- [ ] **WISH-005** - Dev Console button uses the stronger Blueprint repair attention state.
- [ ] **WISH-006** - `blueprint` in Help turns red.
- [ ] **WISH-007** - Attempting Wish produces the runtime error presentation.
- [ ] **WISH-008** - Error identifies `WishFulfillment` / broken reference context.
- [ ] **WISH-009** - A clear repair action is provided.
- [ ] **WISH-010** - The Shooting Star charge is preserved after the failure.

## 10.3 Blueprint repair

```text
dev blueprint broken
```

- [ ] **WISH-011** - BP_WishManager opens.
- [ ] **WISH-012** - Add/insert affordance is visually centered and readable.
- [ ] **WISH-013** - Instruction communicates that clicking `+` inserts Is Valid.
- [ ] **WISH-014** - Click `+`.
- [ ] **WISH-015** - Is Valid appears in the correct place between Wish Event and Grant Wish.
- [ ] **WISH-016** - Blueprint state becomes valid.
- [ ] **WISH-017** - Repair attention cue clears.
- [ ] **WISH-018** - Wish-ready attention cue remains because charge is still available.

## 10.4 Validated Wish

```text
dev wish fixed
```

Then run:

```text
wish
```

- [ ] **WISH-019** - Console makes the active Wish input state clear.
- [ ] **WISH-020** - Wish charge state remains visible.
- [ ] **WISH-021** - Submitting a valid wish consumes the charge.
- [ ] **WISH-022** - Validated Wish marks Finale Wish requirement satisfied.
- [ ] **WISH-023** - First successful validated Wish unlocks Legendary.

---

# 11. Authored Wish Branches

Use DEV commands to test these directly without consuming Shooting Star charges.

## Engine Port Wish

```text
dev wish engine
```

- [ ] **WISH-E01** - Unreal, Unity, and Godot port cards appear.
- [ ] **WISH-E02** - Staged porting messages progress.
- [ ] **WISH-E03** - Circular conversion joke appears.
- [ ] **WISH-E04** - Result reaches its completed state.
- [ ] **WISH-E05** - Screen does not auto-close.
- [ ] **WISH-E06** - Player must explicitly dismiss/continue.
- [ ] **WISH-E07** - Closing restores normal page interaction.

## AI / Vibe Refactor Wish

```text
dev wish ai
```

- [ ] **WISH-AI01** - AI corruption state visibly changes site copy/layout.
- [ ] **WISH-AI02** - Normal page interaction becomes intentionally degraded.
- [ ] **WISH-AI03** - `UNDO AI` remains visible and clickable above corruption.
- [ ] **WISH-AI04** - Click Undo.
- [ ] **WISH-AI05** - Original content is restored.
- [ ] **WISH-AI06** - Injected badges/panels are removed.
- [ ] **WISH-AI07** - Previous Vibe state is restored correctly.

Shortcut cleanup:

```text
dev wish undo
```

## Game Success Wish

```text
dev wish game
```

- [ ] **WISH-G01** - Fake Steam success dashboard appears.
- [ ] **WISH-G02** - Counters animate upward.
- [ ] **WISH-G03** - Player royalty remains $0.00.
- [ ] **WISH-G04** - Payout destination is Mippi.
- [ ] **WISH-G05** - Monkey-paw fine print is readable.
- [ ] **WISH-G06** - Screen remains open after animation completes.
- [ ] **WISH-G07** - Player explicitly dismisses it.

## Doug Executive Review Wish

```text
dev wish doug
```

- [ ] **WISH-D01** - Review Board opens.
- [ ] **WISH-D02** - Doug title and executive joke are visible.
- [ ] **WISH-D03** - Bark directives occur.
- [ ] **WISH-D04** - Review outcomes update.
- [ ] **WISH-D05** - Approval stamp appears.
- [ ] **WISH-D06** - Screen remains open until the player dismisses it.
- [ ] **WISH-D07** - Coolness payoff remains after temporary effects clean up.

## Other branches

```text
dev wish mippi
dev wish blender
dev wish money
dev wish hal
```

- [ ] **WISH-O01** - Mippi branch opens contact behavior correctly.
- [ ] **WISH-O02** - Blender branch performs its joke flow and is recoverable.
- [ ] **WISH-O03** - Money branch produces the intended payout spectacle.
- [ ] **WISH-O04** - HAL branch produces denial overlay and can be exited.

After all branch tests:

```text
dev clean
```

- [ ] **WISH-O05** - All temporary Wish overlays/effects are gone.
- [ ] **WISH-O06** - Persistent progression remains intact.

---

# 12. Rupees, Shop, and Affordability Attention

## 12.1 Empty shop state

```text
dev shop empty
dev rupees 0
```

- [ ] **SHOP-001** - No items are owned.
- [ ] **SHOP-002** - Rupees attention does not pulse without an affordable item.

## 12.2 Affordable item cue

```text
dev attention rupees
```

- [ ] **SHOP-003** - Wallet is set to an affordable state.
- [ ] **SHOP-004** - Rupees panel pulses/glows.
- [ ] **SHOP-005** - Open Shop. Attention pulse suppresses while player is already viewing Shop.
- [ ] **SHOP-006** - Close Shop without buying. Pulse returns if an item remains affordable.
- [ ] **SHOP-007** - Buy enough that nothing else is affordable. Pulse clears.

## 12.3 Rarity card isolation

Test in all three active site themes.

```text
dev shop legendary
```

Then cycle active theme Rare, Epic, Legendary.

Expected:

- [ ] **SHOP-008** - Rare Shop cards always stay Rare blue/cyan.
- [ ] **SHOP-009** - Epic Shop cards always stay Epic purple/pink/cyan.
- [ ] **SHOP-010** - Legendary Shop cards always stay Legendary gold/teal.
- [ ] **SHOP-011** - Hover, owned, equipped, focus, and button states preserve item rarity identity.

## 12.4 Shop progression presets

```text
dev shop epic
dev shop legendary
dev shop master
dev shop complete
```

- [ ] **SHOP-012** - Epic preset creates sensible Epic shopping state.
- [ ] **SHOP-013** - Legendary preset creates sensible Legendary shopping state.
- [ ] **SHOP-014** - Master preset owns every non-capstone item and gives 10 Rupees.
- [ ] **SHOP-015** - Design Mode capstone is available only at the intended late-game state.
- [ ] **SHOP-016** - Design Mode capstone costs 10 Rupees and is not reduced by Production Discount.
- [ ] **SHOP-017** - Complete preset owns every item and Design Mode is available.

## 12.5 All Shop item IDs

Verify purchase/equip/passive behavior for each where applicable:

- [ ] `lucky-charm`
- [ ] `dog-whistle`
- [ ] `star-extender`
- [ ] `slowpoke`
- [ ] `interact-toggle`
- [ ] `bird-extra-life`
- [ ] `production-discount`
- [ ] `celestial-beacon`
- [ ] `golden-trigger`
- [ ] `design-mode-unlock`

---

# 13. Hearts and Click-to-Claim Reward

```text
dev hearts 5
```

- [ ] **HEART-001** - HUD shows HEARTS 5/5.
- [ ] **HEART-002** - Panel visibly pulses/glows as ready-to-claim.
- [ ] **HEART-003** - Unreal Source reward does not auto-open merely because 5/5 is reached.
- [ ] **HEART-004** - Click the Heart panel.
- [ ] **HEART-005** - Unreal Source reward opens.
- [ ] **HEART-006** - Reward is marked claimed.
- [ ] **HEART-007** - Ready-to-claim glow stops after claim.
- [ ] **HEART-008** - Reload. Claimed state persists and reward does not reopen automatically.

Natural pickup test:

```text
dev hearts 0
dev pickup heart
```

Repeat until 5/5.

- [ ] **HEART-009** - Each pickup increments exactly once.
- [ ] **HEART-010** - Fifth pickup arms the claim cue but does not force the reward UI.

---

# 14. Castles and Click-to-Claim Reward

## Fast test

```text
dev castle 4
```

- [ ] **CASTLE-001** - HUD shows CASTLES 4/4.
- [ ] **CASTLE-002** - Castle panel visibly pulses/glows as ready-to-claim.
- [ ] **CASTLE-003** - Fireworks/reward do not auto-trigger just by reaching 4/4.
- [ ] **CASTLE-004** - Click Castle panel.
- [ ] **CASTLE-005** - Fireworks trigger.
- [ ] **CASTLE-006** - Firework particle count remains restrained.
- [ ] **CASTLE-007** - Individual firework pixels/particles are large enough to notice clearly.
- [ ] **CASTLE-008** - Reward grants the intended 3 Rupees.
- [ ] **CASTLE-009** - Castle run resets appropriately after claiming.

## Natural sequence

Use:

```text
dev pickup key
```

or:

```text
dev castle key
```

Expected sequence is strictly Key -> Castle -> Key -> Castle.

- [ ] **CASTLE-010** - A Key creates one Castle opportunity.
- [ ] **CASTLE-011** - Key pickups are suppressed while a Castle is already active.
- [ ] **CASTLE-012** - Clicking Castle increments progress exactly once.
- [ ] **CASTLE-013** - Castle does not automatically respawn without another Key.
- [ ] **CASTLE-014** - Repeat through 4/4.
- [ ] **CASTLE-015** - 4/4 arms the clickable claim state.

---

# 15. Doug, Bones, Coolness, and Command State

## Coolness presets

```text
dev cool 0
dev cool 50
dev cool max
```

- [ ] **DOUG-001** - 0% shows empty/initial Coolness state.
- [ ] **DOUG-002** - 50% shows correct partial progress.
- [ ] **DOUG-003** - 100% activates Cool Mode.
- [ ] **DOUG-004** - Full Coolness meter uses its special maxed attention treatment.
- [ ] **DOUG-005** - Max Coolness is recorded for the postgame achievement even if the meter later drains.

## Doug command

```text
dev doug command
```

- [ ] **DOUG-006** - Doug command state is active.
- [ ] **DOUG-007** - Doug can authorize legal flying interactions.
- [ ] **DOUG-008** - Boss/cooldown/Wish-charge constraints are respected.

## Cool Mode Bones

```text
dev doug cool
```

- [ ] **DOUG-009** - Active and new Bones use rainbow Cool Mode treatment.
- [ ] **DOUG-010** - Rainbow Bone trail is visible.
- [ ] **DOUG-011** - Visual treatment stops when Cool Mode ends.

---

# 16. Interact, Inspect, and Design Modes

## Interact

```text
dev mode interact off
```

- [ ] **MODE-001** - INTERACT // OFF suppresses normal portfolio links/controls.
- [ ] **MODE-002** - Hero Three.js navigation is suppressed.
- [ ] **MODE-003** - Game-layer interactions remain usable.
- [ ] **MODE-004** - Doug remains visible and pettable.

Then:

```text
dev mode interact on
```

- [ ] **MODE-005** - Normal portfolio interaction returns.

## Inspect

```text
dev mode inspect on
```

- [ ] **MODE-006** - Inspect annotations appear on supported content.
- [ ] **MODE-007** - Inspect annotations do not shift layout or hit testing.

## Design

```text
dev mode design on
```

- [ ] **MODE-008** - Design commentary appears on supported systems.
- [ ] **MODE-009** - Design Mode does not alter layout or hit testing.
- [ ] **MODE-010** - Enabling Design turns Inspect off if Inspect was active.
- [ ] **MODE-011** - Enabling Inspect turns Design off if Design was active.
- [ ] **MODE-012** - Fixed control order remains Design, Inspect, Interact, Hint.

---

# 17. Dynamic Optional Objectives

There are 23 objective definitions in v2.80.

Use:

```text
dev objective <objective-id>
```

Then use either:

```text
dev objective complete
```

or:

```text
dev objective fail
```

## 17.1 General objective behavior

- [ ] **OBJ-001** - Objective HUD remains fully opaque/readable.
- [ ] **OBJ-002** - Countdown bar starts full and drains continuously.
- [ ] **OBJ-003** - Footer shows progress and time.
- [ ] **OBJ-004** - Completion before timeout awards listed Rupees.
- [ ] **OBJ-005** - Completed objective freezes appropriately before leaving.
- [ ] **OBJ-006** - Forced failure shows `OBJECTIVE FAILED / TIME EXPIRED` behavior.
- [ ] **OBJ-007** - Failed objective pays no reward.
- [ ] **OBJ-008** - Failed objective can return later.
- [ ] **OBJ-009** - Objective positions above the live progression HUD.
- [ ] **OBJ-010** - Expanding/collapsing Achievement Ledger does not leave objective floating at a stale vertical position.

## 17.2 Individual objective IDs

Force and visually inspect each at least once:

- [ ] **OBJ-ID-01** `signal-sweep`
- [ ] **OBJ-ID-02** `field-trip`
- [ ] **OBJ-ID-03** `inspection`
- [ ] **OBJ-ID-04** `command-line`
- [ ] **OBJ-ID-05** `theme-shift`
- [ ] **OBJ-ID-06** `pickup-catch`
- [ ] **OBJ-ID-07** `pickup-double`
- [ ] **OBJ-ID-08** `pickup-variety`
- [ ] **OBJ-ID-09** `heart-signal`
- [ ] **OBJ-ID-10** `rupee-hunt`
- [ ] **OBJ-ID-11** `bone-run`
- [ ] **OBJ-ID-12** `doug-pet`
- [ ] **OBJ-ID-13** `castle-check`
- [ ] **OBJ-ID-14** `airspace-one`
- [ ] **OBJ-ID-15** `airspace`
- [ ] **OBJ-ID-16** `contact-damage`
- [ ] **OBJ-ID-17** `system-combo`
- [ ] **OBJ-ID-18** `legendary-shot`
- [ ] **OBJ-ID-19** `legendary-double`
- [ ] **OBJ-ID-20** `field-test`
- [ ] **OBJ-ID-21** `loadout`
- [ ] **OBJ-ID-22** `shop-buy`
- [ ] **OBJ-ID-23** `slowmo-test`

For objectives that rely on random flying interactions:

- [ ] **OBJ-011** - The objective seeds fair opportunities rather than requiring an unreasonable random wait.

---

# 18. Adaptive Director

Use each forced state:

```text
dev director quiet
dev director curious
dev director engaged
dev director struggling
dev director mastery
```

## State presentation and pacing

- [ ] **DIR-001** - Quiet reduces ambient pressure but does not create extreme dead air.
- [ ] **DIR-002** - Curious feels neutral/exploratory.
- [ ] **DIR-003** - Engaged increases opportunities appropriately.
- [ ] **DIR-004** - Struggling makes friendly targets more forgiving and hostile pressure lighter.
- [ ] **DIR-005** - Mastery modestly increases challenge/opportunity without changing rewards.

## Attention budget

Open each high-attention UI and observe natural ambient spawning:

- [ ] **DIR-006** - Achievement Ledger suppresses competing ambient events.
- [ ] **DIR-007** - Achievement toast suppresses competing ambient events.
- [ ] **DIR-008** - Dev Console suppresses competing ambient events.
- [ ] **DIR-009** - Shop suppresses competing ambient events.
- [ ] **DIR-010** - Blueprint editor suppresses competing ambient events.
- [ ] **DIR-011** - Compile popup suppresses competing ambient events.
- [ ] **DIR-012** - Wish authored screens suppress competing ambient events.
- [ ] **DIR-013** - HAL overlay suppresses competing ambient events.
- [ ] **DIR-014** - Azure gallery suppresses competing ambient events.
- [ ] **DIR-015** - Mippi Bird suppresses competing ambient events.
- [ ] **DIR-016** - Active form input suppresses competing ambient events.

## Drought protection

- [ ] **DIR-017** - In Legendary, ambient clickables do not permanently stop spawning.
- [ ] **DIR-018** - Blocked opportunities retry after modal/UI attention clears.
- [ ] **DIR-019** - Shooting Star opportunity is not permanently lost if originally blocked.

Optional browser console check:

```js
window.__MIPPI_DIRECTOR__.snapshot()
```

- [ ] **DIR-020** - Snapshot state matches the intended forced Director state.

---

# 19. Flying Pickups and Arcade Interactions

Use:

```text
dev pickup heart
dev pickup rupee
dev pickup star
dev pickup 1up
dev pickup key
```

- [ ] **PICKUP-001** - Heart pickup is clickable and cleans itself up.
- [ ] **PICKUP-002** - Rupee pickup increments wallet exactly once.
- [ ] **PICKUP-003** - Shooting Star grants one Wish charge.
- [ ] **PICKUP-004** - Wish charge caps at intended maximum.
- [ ] **PICKUP-005** - 1UP integrates with Mippi Bird life behavior.
- [ ] **PICKUP-006** - Key starts Castle path.
- [ ] **PICKUP-007** - Collected objects do not remain stuck onscreen.
- [ ] **PICKUP-008** - Missed objects clean themselves up after leaving.

Slow motion:

```text
slowmo
```

- [ ] **PICKUP-009** - Flying object speed visibly slows.
- [ ] **PICKUP-010** - Slowed flying targets remain active for their full trajectory instead of being removed on an old fixed timer.

---

# 20. UFO, Boss, Invasion, and Super Boss

## Regular UFO

```text
dev ufo
```

- [ ] **UFO-001** - Regular UFO spawns.
- [ ] **UFO-002** - It is interactable/destroyable as intended.
- [ ] **UFO-003** - It cleans up after resolution.

## Boss

```text
dev boss
```

- [ ] **UFO-004** - Boss spawns in a calm-enough state.
- [ ] **UFO-005** - Boss can be defeated.
- [ ] **UFO-006** - Regular Boss victory satisfies the normal Finale boss requirement.

## Invasion meter presets

```text
dev invasion 0
dev invasion 33
dev invasion 66
dev invasion near
```

- [ ] **UFO-007** - Meter shows expected progression at 0.
- [ ] **UFO-008** - Meter shows expected progression at 33.
- [ ] **UFO-009** - Meter shows expected progression at 66.
- [ ] **UFO-010** - `near` places progression one normal UFO before Super Boss contact threshold.

## Super Boss

```text
dev superboss
```

- [ ] **UFO-011** - Super Boss arena opens.
- [ ] **UFO-012** - Interact Off behavior is temporarily applied through the shared Interact system if needed.
- [ ] **UFO-013** - Left click always fires player projectiles during Super Boss even if normal Legendary shooting would otherwise be unavailable.
- [ ] **UFO-014** - Player projectiles originate at cursor and travel upward.
- [ ] **UFO-015** - Player projectiles can hit Adds.
- [ ] **UFO-016** - Player projectiles can hit Boss core.
- [ ] **UFO-017** - Adds explode in place when killed. They do not fly/snap toward another origin.
- [ ] **UFO-018** - Hostile projectiles disappear after resolving or hitting the player.
- [ ] **UFO-019** - Mega Laser freezes Boss translation.
- [ ] **UFO-020** - Boss slowly rotates/tracks toward cursor during Mega Laser.
- [ ] **UFO-021** - After Mega Laser, Boss resumes from its previous location with no teleport/jump caused by a global animation clock.
- [ ] **UFO-022** - Exit Boss Fight remains available.
- [ ] **UFO-023** - Victory screen appears before normal interaction returns.
- [ ] **UFO-024** - Previous Interact state is restored after victory/exit.
- [ ] **UFO-025** - Super Boss victory persists for the postgame achievement.

---

# 21. Mippi Bird

```text
dev flappy
```

- [ ] **BIRD-001** - Mippi Bird opens.
- [ ] **BIRD-002** - Player is rendered as transparent Mippi logo, not a square fallback.
- [ ] **BIRD-003** - Input works.
- [ ] **BIRD-004** - Score increments correctly.
- [ ] **BIRD-005** - Extra lives from Shop and Mushroom systems behave correctly.
- [ ] **BIRD-006** - Share UI uses the site's X / LinkedIn / Facebook / Copy controls, not native Windows share sheet.
- [ ] **BIRD-007** - Closing Mippi Bird returns to the page cleanly.

---

# 22. Heavy Water Perspective Visualizer

## Initial layout

- [ ] **PERS-001** - Player starts in the middle of the bottom-right quarter of the top-down play area.
- [ ] **PERS-002** - Player does not start in the center of the entire play area.
- [ ] **PERS-003** - Companion NPC position is distinct and readable.
- [ ] **PERS-004** - Legend reads `PLAYER - Player Controlled`.
- [ ] **PERS-005** - Legend reads `COMPANION NPC - AI Controlled`.

## Perspective controls

- [ ] **PERS-006** - 1st-person mode works.
- [ ] **PERS-007** - 1st-person turn speed is faster than 2nd/3rd as intended.
- [ ] **PERS-008** - 2nd-person mode works from NPC-controlled camera perspective.
- [ ] **PERS-009** - 3rd-person mode works from outside player perspective.
- [ ] **PERS-010** - Header labels and panel labels match the approved copy.
- [ ] **PERS-011** - Dragging Player updates the right-side view live.
- [ ] **PERS-012** - Using the visualizer unlocks `Second Perspective` once.

---

# 23. Normal Finale Eligibility

Current normal Finale eligibility requires all of these:

1. 10/10 original Signals.
2. Legendary unlocked.
3. Validated Wish completed.
4. At least one normal Boss or Super Boss defeated.
5. 5 Hearts collected.
6. At least one Shop item owned.
7. At least 5 of the 6 major portfolio sections visited in the session.

## Fast forced setup

```text
dev finale ready
```

- [ ] **FIN-001** - Mippi header enters Finale-ready attention state.
- [ ] **FIN-002** - Rare theme has a visible Finale-ready glow.
- [ ] **FIN-003** - Epic theme has a visible Finale-ready glow.
- [ ] **FIN-004** - Legendary theme has a visible Finale-ready gold/teal glow.

## Start Finale

```text
dev finale play
```

- [ ] **FIN-005** - Finale takes over presentation cleanly.
- [ ] **FIN-006** - Sequence shows `THANKS FOR PLAYING.`
- [ ] **FIN-007** - Follow-up copy appears in sequence.
- [ ] **FIN-008** - Identity screen shows white Mippi logo above `MIPPI THE DORK`.
- [ ] **FIN-009** - Player profile line is visible.
- [ ] **FIN-010** - Mouse cursor is visible on the identity/action screen.
- [ ] **FIN-011** - `Continue Exploring` is easily clickable.
- [ ] **FIN-012** - `View Session Report` is easily clickable.

---

# 24. Session Report and Post-Finale Reveal Timing

## Continue Exploring path

1. Run `dev finale play`.
2. Wait for controls.
3. Click Continue Exploring.

Expected:

- [ ] **POST-001** - Finale closes.
- [ ] **POST-002** - Site returns to exploration.
- [ ] **POST-003** - About 5 seconds later, Achievement Ledger force-opens.
- [ ] **POST-004** - Nine Epic achievements plus one Legendary capstone are revealed at the top of the Ledger.

## Session Report path

1. Run `dev finale play`.
2. Choose View Session Report.
3. Inspect report.
4. Close report or use its Continue action.

Expected:

- [ ] **POST-005** - Report displays session-derived stats/observations.
- [ ] **POST-006** - Closing report starts the same 5-second postgame reveal timer.
- [ ] **POST-007** - Report Continue starts the same 5-second postgame reveal timer.
- [ ] **POST-008** - Ledger opens once, not multiple times because of duplicate timers.

Fast shortcut:

```text
dev postgame reveal
```

---

# 25. Nine Epic Postgame Achievements

After reveal, incomplete entries should display `???` with a hint. Completed conditions may immediately reveal as already earned.

## 25.1 Signal Saturation

Requirement: 10/10 original Signals.

Fast state:

```text
dev signals 10
dev postgame reveal
```

- [ ] **EPIC-001** - `Signal Saturation` unlocks.

## 25.2 Maximum Cool

Requirement: Coolness reached 100% at least once.

```text
dev cool max
```

- [ ] **EPIC-002** - `Maximum Cool` unlocks.
- [ ] **EPIC-003** - It stays earned after Coolness later drains.

## 25.3 Gold Standard

Requirement: Legendary unlocked.

```text
dev legendary
```

- [ ] **EPIC-004** - `Gold Standard` unlocks.

## 25.4 Reality Validated

Requirement: validated Wish completed.

Use real Wish flow when possible. For fast setup, use the postgame complete helper only for broad state QA.

- [ ] **EPIC-005** - Validated Wish unlocks `Reality Validated`.

## 25.5 Full Hearts

Requirement: collect 5 Hearts.

```text
dev hearts 5
```

- [ ] **EPIC-006** - `Full Hearts` unlocks at 5/5.
- [ ] **EPIC-007** - Achievement does not require clicking the Heart reward panel. Collection and reward claim are separate states.

## 25.6 Buy the Store

Requirement: own every Shop item including Design Mode.

```text
dev shop complete
```

- [ ] **EPIC-008** - `Buy the Store` unlocks.

## 25.7 Another Castle

Requirement: reach four Castle checks.

```text
dev castle 4
```

- [ ] **EPIC-009** - `Another Castle` unlocks at 4/4.
- [ ] **EPIC-010** - Achievement does not depend on separately clicking the Castle reward claim if the design intent remains collection-based.

## 25.8 Grand Tour

Requirement: visit all 6 major sections.

- [ ] **EPIC-011** - At 5/6, `Grand Tour` remains incomplete.
- [ ] **EPIC-012** - At 6/6, `Grand Tour` unlocks.

## 25.9 Air Superiority

Requirement: defeat the Super UFO Boss.

```text
dev superboss
```

Defeat it.

- [ ] **EPIC-013** - `Air Superiority` unlocks.
- [ ] **EPIC-014** - A regular Boss does not satisfy this specific postgame achievement.

---

# 26. Legendary 100% Complete Achievement

Requirement:

- All nine Epic postgame achievements.
- Finale has been viewed.

Fast state:

```text
dev postgame complete
```

Expected:

- [ ] **LEG-001** - Nine Epic achievements are complete.
- [ ] **LEG-002** - `100% Complete` Legendary achievement unlocks.
- [ ] **LEG-003** - Legendary achievement uses Legendary gold/teal treatment independent of active site theme.
- [ ] **LEG-004** - Legendary unlock communicates the Music Player reward.
- [ ] **LEG-005** - Music Player becomes permanently available until `reset`.

Negative tests:

- [ ] **LEG-006** - Eight of nine Epics plus Finale does not unlock 100% Complete.
- [ ] **LEG-007** - All nine Epics without Finale viewed does not unlock 100% Complete.

---

# 27. Music Player

## 27.1 Unlock and placement

```text
dev music
```

or:

```text
dev postgame complete
```

- [ ] **MUSIC-001** - Music Player appears only after unlock.
- [ ] **MUSIC-002** - Player is anchored to the header/main menu area.
- [ ] **MUSIC-003** - Player moves with the header rather than floating at bottom-right.
- [ ] **MUSIC-004** - Player left edge aligns with the left edge of the square Mippi logo container.
- [ ] **MUSIC-005** - Collapsed top edge remains stable.
- [ ] **MUSIC-006** - Expanding the player expands downward only.
- [ ] **MUSIC-007** - Expanding does not move the top edge upward/downward.
- [ ] **MUSIC-008** - Unlock copy communicates twelve soundtrack tracks.
- [ ] **MUSIC-009** - Track counter initializes as `TRACK 1 / 12`.

## 27.2 Canonical soundtrack

Verify all 12 installed MP3s and their exact order:

```text
01 Literally Unplayable
02 Just Add Gameplay
03 Great Again
04 Inside My Head
05 I Made This
06 Come Back
07 Stat FPS
08 Every Byte
09 She Was Almost Gold
10 Everybody's Right
11 One Player Too Many
12 L-E-A-R-N
```

- [ ] **MUSIC-010** - All 12 rows are visible when expanded.
- [ ] **MUSIC-011** - Every displayed title matches the canonical order.
- [ ] **MUSIC-012** - Every MP3 reaches READY when selected.
- [ ] **MUSIC-013** - Play starts the selected song.
- [ ] **MUSIC-014** - Pause works.
- [ ] **MUSIC-015** - Manual Previous works.
- [ ] **MUSIC-016** - Manual Next works.
- [ ] **MUSIC-017** - Switching tracks replaces prior playback cleanly.
- [ ] **MUSIC-018** - Automatic track switching waits for metadata and does not race the new source.

## 27.3 Repeat behavior

Cycle the Repeat button through all states.

- [ ] **MUSIC-R01** - Default is `LOOP OFF` when no valid preference exists.
- [ ] **MUSIC-R02** - Click order is `LOOP OFF -> LOOP ALL -> LOOP 1 -> LOOP OFF`.
- [ ] **MUSIC-R03** - LOOP OFF stops automatic sequential playback after track 12.
- [ ] **MUSIC-R04** - LOOP ALL wraps sequential playback from track 12 to track 01.
- [ ] **MUSIC-R05** - LOOP 1 restarts the same MP3 from time 0.
- [ ] **MUSIC-R06** - Manual Next can still wrap when Repeat is Off.
- [ ] **MUSIC-R07** - Button text, tooltip, aria-label, aria-pressed, and data-mode match the current state.

## 27.4 Shuffle behavior

- [ ] **MUSIC-S01** - Shuffle toggles independently from Repeat.
- [ ] **MUSIC-S02** - Shuffle On builds a randomized cycle excluding the current track.
- [ ] **MUSIC-S03** - No track is intentionally reused before the current Shuffle bag is exhausted.
- [ ] **MUSIC-S04** - Previous moves through actual visited Shuffle history.
- [ ] **MUSIC-S05** - After moving backward, Next walks forward through existing history before choosing another random track.
- [ ] **MUSIC-S06** - Manually selecting a song while Shuffle is on updates history and removes that track from the pending bag.
- [ ] **MUSIC-S07** - LOOP OFF stops after the current Shuffle cycle.
- [ ] **MUSIC-S08** - LOOP ALL starts a new randomized cycle.
- [ ] **MUSIC-S09** - LOOP 1 takes priority over Shuffle when a song ends.

## 27.5 Playback preference persistence

- [ ] **MUSIC-P01** - Repeat mode survives reload.
- [ ] **MUSIC-P02** - Shuffle On/Off survives reload.
- [ ] **MUSIC-P03** - Exact Shuffle bag/order does not survive reload.
- [ ] **MUSIC-P04** - Shuffle navigation history does not survive reload.
- [ ] **MUSIC-P05** - Selected song resets to track 01 on fresh initialization.
- [ ] **MUSIC-P06** - Playback time does not resume.
- [ ] **MUSIC-P07** - Player does not autoplay on reload.
- [ ] **MUSIC-P08** - Normal full `reset` clears entitlement, Repeat, and Shuffle preferences.

## 27.6 Lyrics controls

For every playlist row:

- [ ] **MUSIC-L01** - Song title/row and circled `?` are separate interactive targets.
- [ ] **MUSIC-L02** - Clicking `?` opens lyrics for that row without changing selected/playing audio.
- [ ] **MUSIC-L03** - Clicking the same row's `?` again closes the lyrics panel.
- [ ] **MUSIC-L04** - `#music-lyrics-close` closes the panel.
- [ ] **MUSIC-L05** - Changing selected track while lyrics are open updates the panel to the newly selected track.
- [ ] **MUSIC-L06** - Lyrics synchronization only runs when viewed lyrics match the selected track.

## 27.7 Current metadata-only LRC package

The v2.80 package includes:

```text
assets/music/song-01.lrc
...
assets/music/song-12.lrc
```

Each shipped file currently contains metadata only.

- [ ] **MUSIC-L07** - Metadata-only file shows `Lyrics coming soon`.
- [ ] **MUSIC-L08** - Missing LRC falls back gracefully without breaking audio.
- [ ] **MUSIC-L09** - LRC fetch uses no-store behavior so close/reopen can pick up edits.

## 27.8 LRC parser and synchronization

Use a temporary authored test LRC in local QA.

- [ ] **MUSIC-L10** - Untimed lines render as ordinary text.
- [ ] **MUSIC-L11** - `[mm:ss.xx]` timestamps render beside timed lines.
- [ ] **MUSIC-L12** - One source line with multiple timestamps produces multiple timed entries.
- [ ] **MUSIC-L13** - Metadata tags are ignored as lyric text.
- [ ] **MUSIC-L14** - Positive and negative `[offset:]` values alter timestamps correctly.
- [ ] **MUSIC-L15** - UTF-8 BOM does not appear as lyric content.
- [ ] **MUSIC-L16** - Seconds above 59 are not accepted as valid timed entries.
- [ ] **MUSIC-L17** - Timed lines sort chronologically.
- [ ] **MUSIC-L18** - Mixed untimed lines display after timed entries.
- [ ] **MUSIC-L19** - timeupdate advances the current-line highlight.
- [ ] **MUSIC-L20** - seeked updates the current line immediately.
- [ ] **MUSIC-L21** - Auto-scroll stays inside the lyrics panel rather than moving the webpage.
- [ ] **MUSIC-L22** - HTML-like lyric text displays literally and never executes.

## 27.9 Theme, collapse, and responsive behavior

Switch among Rare, Epic, Legendary.

- [ ] **MUSIC-T01** - Rare uses Rare blue/cyan treatment.
- [ ] **MUSIC-T02** - Epic uses Epic purple/pink/cyan treatment.
- [ ] **MUSIC-T03** - Legendary uses Legendary gold/teal treatment.
- [ ] **MUSIC-T04** - Repeat/Shuffle active states remain readable in every theme.
- [ ] **MUSIC-T05** - Lyrics current-line/timestamp emphasis remains readable in every theme.
- [ ] **MUSIC-T06** - Collapsing hides playback options and lyrics without pausing audio.
- [ ] **MUSIC-T07** - Expanding restores the full interface without rebuilding playback state.
- [ ] **MUSIC-T08** - At 760 px or below, song rows use the intended narrow layout.
- [ ] **MUSIC-T09** - Reduced-motion preference disables smooth lyric scrolling/transitions without changing sync timing.

## 27.10 Downloads

For all 12 songs:

- [ ] **MUSIC-D01** - Download targets the selected track, not a separately viewed lyrics track.
- [ ] **MUSIC-D02** - Download uses the correct numbered MP3 source.
- [ ] **MUSIC-D03** - Download filename uses the human-readable song title.
- [ ] **MUSIC-D04** - Invalid filename characters are replaced with hyphens.
- [ ] **MUSIC-D05** - Missing/unavailable audio disables Download safely.

---

# 28. Footer and Fixed HUD Collision Tests

Run at 1920x1080, 1366x768, and 1280x720.

- [ ] **LAYOUT-001** - Scroll to absolute page bottom.
- [ ] **LAYOUT-002** - Copyright sits above fixed controls.
- [ ] **LAYOUT-003** - Return to Top sits above fixed controls.
- [ ] **LAYOUT-004** - Design/Inspect/Interact/Hint controls do not cover footer links.
- [ ] **LAYOUT-005** - Dev Console/Theme controls do not cover footer text.
- [ ] **LAYOUT-006** - Music Player does not overlap footer because it is header-anchored.

---

# 29. Persistence and Reload Matrix

For each state below, set it, reload, and verify expected persistence.

| State | Setup | Expected after reload |
| --- | --- | --- |
| 10 Signals | `dev signals 10` | Persists. |
| Legendary unlocked | `dev legendary` | Persists. |
| Rupees | `dev rupees 10` | Persists if wallet is designed as persistent. |
| Shop ownership | `dev shop complete` | Persists. |
| Heart count | `dev hearts 5` | Persists. |
| Heart reward claimed | Manually click 5/5 Hearts | Persists. |
| Max Coolness ever reached | `dev cool max` then let meter change | Postgame completion flag persists. |
| Castle completion ever reached | `dev castle 4` | Postgame achievement flag persists. |
| Super Boss defeated | Defeat Super Boss | Persists for postgame. |
| Six postgame sections | Visit all six | Persists for postgame. |
| Finale viewed | Run/complete Finale | Persists. |
| Postgame tier revealed | `dev postgame reveal` | Persists. |
| 100% Complete | `dev postgame complete` | Persists. |
| Music Player unlock | `dev music` or true 100% | Persists until reset. |
| Music Repeat mode | Set LOOP ALL or LOOP 1 | Persists until reset. |
| Music Shuffle preference | Turn Shuffle On | Persists until reset; randomized bag/history rebuilds. |
| AI Wish corruption | `dev wish ai` | Should not become permanent across a normal page reload unless explicitly designed that way. |
| Temporary Wish overlays | `dev wish engine` etc. | Should not resurrect unexpectedly after reload. |

Test each row and record PASS/FAIL.

---

# 30. Reset Integrity

Build a heavily progressed state first:

```text
dev postgame complete
dev rupees 99
dev music
```

Then use normal player command:

```text
reset
```

Verify:

- [ ] **RESET-001** - Original 10 Signals are cleared.
- [ ] **RESET-002** - Epic/Legendary unlocks are cleared.
- [ ] **RESET-003** - Wish state is cleared.
- [ ] **RESET-004** - Shop ownership is cleared.
- [ ] **RESET-005** - Rupees are cleared.
- [ ] **RESET-006** - Heart progress/reward state is cleared.
- [ ] **RESET-007** - Castle progression/postgame completion is cleared.
- [ ] **RESET-008** - Coolness postgame completion is cleared.
- [ ] **RESET-009** - Super Boss postgame completion is cleared.
- [ ] **RESET-010** - Postgame section visit completion is cleared.
- [ ] **RESET-011** - Finale viewed state is cleared.
- [ ] **RESET-012** - Postgame tier reveal is cleared.
- [ ] **RESET-013** - Postgame Epic/Legendary achievements are cleared.
- [ ] **RESET-014** - Music Player unlock is cleared.
- [ ] **RESET-015** - Page visibly returns to first-visit Rare state.
- [ ] **RESET-016** - Three.js works immediately after the reset reload.

Then run:

```text
dev snapshot
```

- [ ] **RESET-017** - Snapshot matches a fresh state.

---

# 31. Attention Cue Matrix

## Rupees

```text
dev attention rupees
```

- [ ] **ATTN-001** - Rupees box glows only when at least one currently available item is affordable.
- [ ] **ATTN-002** - Locked progression items do not falsely trigger affordability.
- [ ] **ATTN-003** - Production Discount is respected when calculating affordability.
- [ ] **ATTN-004** - Opening Shop suppresses the glow.

## Wish

```text
dev attention wish
```

- [ ] **ATTN-005** - Dev Console button gets Wish-ready attention state.
- [ ] **ATTN-006** - Opening console suppresses or appropriately resolves the external attention cue.

## Blueprint

```text
dev attention blueprint
```

- [ ] **ATTN-007** - Dev Console button gets stronger repair attention state.
- [ ] **ATTN-008** - Help `blueprint` command becomes red.
- [ ] **ATTN-009** - Repairing Blueprint clears repair-specific attention state.

## Hearts

```text
dev hearts 5
```

- [ ] **ATTN-010** - Hearts panel glows until clicked/claimed.

## Castles

```text
dev castle 4
```

- [ ] **ATTN-011** - Castles panel glows until clicked/claimed.

## Finale

```text
dev finale ready
```

- [ ] **ATTN-012** - Mippi header icon visibly attracts attention in Rare.
- [ ] **ATTN-013** - Same in Epic.
- [ ] **ATTN-014** - Same in Legendary.

---

# 32. Rarity Visual Isolation Matrix

Test this matrix in all three active site themes.

| UI element | Required rarity-owned appearance |
| --- | --- |
| Original 10 achievement entries | Rare blue/cyan |
| Nine postgame achievement entries | Epic purple/pink/cyan |
| 100% Complete achievement entry | Legendary gold/teal |
| Rare Shop cards | Rare blue/cyan |
| Epic Shop cards | Epic purple/pink/cyan |
| Legendary Shop cards | Legendary gold/teal |
| Achievement Ledger frame | Current active site theme |
| Music Player | Current active site theme |

- [ ] **RARITY-001** - Rare active theme matrix passes.
- [ ] **RARITY-002** - Epic active theme matrix passes.
- [ ] **RARITY-003** - Legendary active theme matrix passes.

---

# 33. Modal and Overlay Cleanup Stress Tests

Use a sequence like:

```text
dev wish engine
dev clean
dev wish ai
dev clean
dev wish game
dev clean
dev wish doug
dev clean
dev superboss
dev clean
```

Verify after every cleanup:

- [ ] **CLEAN-001** - No invisible overlay blocks clicks.
- [ ] **CLEAN-002** - Body classes from temporary states are removed.
- [ ] **CLEAN-003** - Cursor returns to normal.
- [ ] **CLEAN-004** - Scroll is restored.
- [ ] **CLEAN-005** - Interact state returns to prior state.
- [ ] **CLEAN-006** - No duplicate overlay appears on next activation.
- [ ] **CLEAN-007** - Three.js continues rendering.

---

# 34. Responsive and Narrow-Viewport QA

At 1024x768 and 390x844:

- [ ] **RESP-001** - Header does not clip navigation disastrously.
- [ ] **RESP-002** - Music Player remains attached to header and does not render offscreen.
- [ ] **RESP-003** - Expanded Music Player remains usable.
- [ ] **RESP-004** - Achievement Ledger remains closable.
- [ ] **RESP-005** - Dev Console remains closable and scrollable.
- [ ] **RESP-006** - Shop remains usable.
- [ ] **RESP-007** - Blueprint popup remains usable.
- [ ] **RESP-008** - Finale action buttons remain on screen.
- [ ] **RESP-009** - Session Report remains usable.
- [ ] **RESP-010** - Dynamic Objective does not cover progression HUD.
- [ ] **RESP-011** - Bottom-right controls do not cover key footer content.
- [ ] **RESP-012** - Perspective Visualizer controls stack correctly on narrow widths.
- [ ] **RESP-013** - Super Boss exit control remains reachable.

---

# 35. Keyboard and Focus Sanity

This is not intended to redefine every game interaction as keyboard-only, but standard buttons/links should remain operable.

- [ ] **A11Y-001** - Tab focus is visibly indicated on main navigation links.
- [ ] **A11Y-002** - Tab focus is visible on Finale buttons.
- [ ] **A11Y-003** - Tab focus is visible on Music Player controls.
- [ ] **A11Y-004** - Tab focus is visible on Shop buttons.
- [ ] **A11Y-005** - Dev Console input can regain focus after clicking Help commands.
- [ ] **A11Y-006** - Escape/close controls behave consistently where implemented.
- [ ] **A11Y-007** - Rarity is not communicated by color alone because achievement entries also contain rarity text.

---

# 36. Full Natural Player Completion Run

This is the most important final test. Do it without DEV progression forcing except for diagnosing a bug after a failure.

## Stage A: First visit

- [ ] Start from `reset` or `dev fresh`.
- [ ] Confirm first-visit discovery hint.
- [ ] Find all 10 original Signals naturally.
- [ ] Confirm Epic unlock.

## Stage B: Epic continuation

- [ ] Follow progression trace toward Shooting Star.
- [ ] Catch Shooting Star.
- [ ] Use `wish`.
- [ ] Experience broken BP_WishManager flow.
- [ ] Repair with Is Valid.
- [ ] Submit validated Wish.
- [ ] Confirm Legendary unlock.

## Stage C: Normal Finale requirements

- [ ] Defeat at least one regular Boss.
- [ ] Collect 5 Hearts.
- [ ] Buy at least one Shop item.
- [ ] Visit at least 5 of the 6 major sections.
- [ ] Confirm Mippi header enters Finale-ready state.
- [ ] Play Finale.
- [ ] Use either Continue Exploring or View Session Report.

## Stage D: Postgame reveal

- [ ] Wait about 5 seconds after leaving the Finale/report.
- [ ] Confirm Ledger force-opens.
- [ ] Confirm nine Epic + one Legendary postgame achievements appear at the top.
- [ ] Confirm already-completed conditions immediately show as earned where appropriate.

## Stage E: True completion

Complete any missing postgame goals naturally:

- [ ] 10/10 Signals.
- [ ] Max Coolness reached.
- [ ] Legendary unlocked.
- [ ] Validated Wish completed.
- [ ] 5 Hearts collected.
- [ ] Every Shop item purchased, including Design Mode.
- [ ] 4 Castles checked.
- [ ] All 6 major sections visited.
- [ ] Super UFO Boss defeated.
- [ ] Finale viewed.

Expected:

- [ ] `100% Complete` unlocks.
- [ ] Music Player unlocks.
- [ ] Reload preserves Music Player.
- [ ] `reset` removes Music Player and returns to first-visit state.

---

# 37. Fast Release-Candidate State Sweep

This is a DEV-assisted sweep designed to hit almost every major state in 15 to 25 minutes.

Run these one by one and visually verify each result before moving on:

```text
dev fresh
dev snapshot
dev rare
dev signals 5
dev epic
dev attention rupees
dev shop master
dev legendary
dev attention wish
dev attention blueprint
dev blueprint broken
dev blueprint fixed
dev wish engine
dev clean
dev wish ai
dev wish undo
dev wish game
dev clean
dev wish doug
dev clean
dev hearts 5
dev castle 4
dev cool max
dev invasion near
dev superboss
dev clean
dev director quiet
dev director struggling
dev director mastery
dev objective random
dev objective complete
dev objective random
dev objective fail
dev finale ready
dev finale play
dev postgame reveal
dev postgame complete
dev music
dev snapshot
```

Then finish with:

```text
reset
```

Confirm first-load Three.js returns correctly after reset.

---

# 38. Bug Report Template

Copy this when filing a bug:

```markdown
## Bug

**Test ID:**
**Build:** v2.80
**Environment:** Local Preview / GitHub Pages
**Browser:**
**Viewport:**
**Clean save?:** Yes / No

### Reproduction
1.
2.
3.

### DEV commands used
```text

```

### Expected


### Actual


### dev snapshot
```text

```

### Runtime snapshot if startup/Three.js related
```js
window.__MIPPI_RUNTIME__.snapshot()
```

### Console errors


### Screenshot/video

```

---

# 39. Final Signoff Checklist

Do not call the build release-ready until all Critical items are green.

- [ ] Local first load works with Three.js without manual refresh.
- [ ] Hosted first load works with Three.js without manual refresh.
- [ ] Reset reload preserves Three.js startup.
- [ ] All 10 original Signals pass naturally.
- [ ] Epic and Legendary progression pass naturally.
- [ ] Wish and Blueprint repair loop pass naturally.
- [ ] All major Wish authored screens are dismissible by the player.
- [ ] Rupees, Hearts, Castles, Blueprint, Wish, and Finale attention cues are correct.
- [ ] Shop rarity isolation passes in Rare/Epic/Legendary themes.
- [ ] Achievement rarity isolation passes in Rare/Epic/Legendary themes.
- [ ] All 23 Dynamic Objectives can be forced and resolve correctly.
- [ ] Regular UFO, Boss, and Super Boss pass.
- [ ] Finale cursor and action buttons pass.
- [ ] Postgame reveal occurs after about 5 seconds on both Finale exit paths.
- [ ] Nine Epic postgame achievements evaluate correctly.
- [ ] Legendary 100% achievement evaluates correctly.
- [ ] Music Player unlock, header alignment, expansion, and theme styling pass.
- [ ] Six final songs pass playback, switching, title, and download tests once authored audio is installed.
- [ ] Full natural player completion run passes from clean state.
- [ ] Normal `reset` returns every progression system to clean state.
- [ ] Footer and fixed controls do not overlap at common desktop sizes.
- [ ] No uncaught browser-console errors remain.

When this checklist is fully green, the remaining work should be content/audio finalization rather than gameplay-system development.


## v2.89 Required Addendum

The original checklist is preserved as historical baseline. The current release must additionally execute [v2.81–v2.89 Regression Matrix](V2_81_TO_V2_89_REGRESSION_MATRIX.md) and [v2.89 Performance Profiling Procedure](PERFORMANCE_PROFILING_V2.89.md). Validate the unified HUD and all unlock states, bonus Heart lives, Castle friendly auto-collection, bounded Invasion, Early Rare pickups, closed Mippi Bird attention, inline SVG/Native cursor focus, Docs access, Wish guidance, 12-song icon transport and Enhanced LRC, repeat Off/One/All, removed public `particles`, and `perf-lab.js` export/isolate recovery. **v2.86–v2.89 do not establish a verified FPS fix.**


## v2.92 Combat Lab QA Addendum

Run [Combat Benchmark QA](COMBAT_BENCHMARK_V2_92.md) and review [Performance Investigation Findings](PERFORMANCE_INVESTIGATION_FINDINGS.md) before treating the lab as validated. The five benchmark scenarios and two geometry modes must exercise production projectile paths without crediting player progression. Verify cleanup and accurate movement under real browser conditions. The handoff does not confirm a solved Windows FPS regression.
