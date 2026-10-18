# v3.15–v3.24 Regression QA

**Documented baseline:** v3.24. **Status:** Specification and manual acceptance checklist, not a claim of passed browser tests.

## Build and provenance
- [ ] Confirm runtime and served JS/CSS represent v3.24, with no stale cache assets.
- [ ] Verify exact release behavior against commits and PRs #35–#45, using the handoff source references.
- [ ] New and returning sessions preserve existing achievement IDs, Shop ownership, unlocks and saved state.
- [ ] Run syntax/static checks **and** visual testing in a desktop browser; source inspection is not browser QA.

## Achievement and Shop emblems (v3.16, 3.17, 3.19–3.21)
- [ ] All 10 Rare, 9 Epic and 1 Legendary achievements display distinct meaningful SVG icons.
- [ ] Locked entries still show recognizable icons and readable hints; unlock toasts use the same correct icons.
- [ ] Rarity colors belong to achievement rarity, not selected global theme; Legendary borders remain distinct.
- [ ] Shop item icons render for unowned, affordable, locked and owned states; no unused symbol definitions are referenced.
- [ ] Curious Mind brain, Signal Acquired antenna and Unmark U/down-arrow silhouettes are recognizable.
- [ ] PASSIVE // ACTIVE button displays and operates correctly under all themes.

## Economy and Dev Console (v3.17–3.21)
- [ ] Arcade Bounty adds **45 percentage points** to UFO Rupee drop chance as documented, rather than multiplying it by 1.45; confirm actual runtime implementation.
- [ ] Insert Coin makes natural UFO waves approximately **4× more frequent**; verify caps, cooldowns and pause behavior.
- [ ] Mippi Bird shield/refill appears in its combined Shop presentation; purchased refill credits lives correctly.
- [ ] Dev Console item uses Epic Shop gating and Shooting Star prerequisite; hotbar entry remains hidden until purchased.
- [ ] RESET and SHOP console access remain available without purchasing Dev Console.
- [ ] DEV commands may run before purchase, while ordinary commands still honor their normal eligibility gates.

## Hearts, projectiles and Bird (v3.22–3.23)
- [ ] Hostile projectile damages by a half Heart where intended, including half/full HUD state and zero-Heart handling.
- [ ] Ordinary Heart and Mushroom collection do **not** mint Mippi Bird lives.
- [ ] Mippi Bird refills come from Shop or explicitly credited rewards, independent of Heart overflow.
- [ ] Star Power prevents projectile damage during invulnerability.
- [ ] Mushroom cursor size falls one progression tier per hit before Hearts absorb damage; verify minimum tier.
- [ ] Doug Bones intercept friendly and hostile projectiles, are consumed or resolved correctly, and cannot leave stale projectiles.
- [ ] v3.23 **restored** Key eligibility and panel selection; v3.22 temporary placement rules must not survive.

## Pause, navigation and feedback (v3.24)
- [ ] P toggles gameplay pause and displays an actionable, accessible resume state.
- [ ] Losing window focus or visibility pauses gameplay; returning to focus requires explicit resume.
- [ ] Shop and Mippi Bird temporarily suspend background gameplay without permanently corrupting manual/focus pause state.
- [ ] Timers, spawning, projectiles, damage, animations and input consistently honor pause policy without bursts on resume.
- [ ] Heart HUD remains visible after discovery, including at zero Hearts and across reload as intended.
- [ ] Clicking a Castle produces impact VFX without double-crediting progress.
- [ ] Paused overlays, HUD, pointer, keyboard input, focus indication and mobile/narrow layouts do not interfere.

## Completion and signoff
- [ ] Test Rare, Epic, Legendary and postgame, with and without saves.
- [ ] Test reset, reload and graphics fallback.
- [ ] Inspect browser Console for uncaught errors, verify interaction and FPS under UFO load.
- [ ] Record tested browser, viewport, version, date, evidence, deviations and signoff.

## v3.25.2 Current Acceptance Extension (unverified)

These checks supersede old v3.24-only assumptions and are **not** reported passed in a live browser.

### Releases and progression
- [ ] Verify v3.15.5 full reset, fresh and returning startup, and absence of temporal-dead-zone errors.
- [ ] Coolness, Invasion and Castle meters each appear only after first Bone, enemy defeat or Key, occupying no space beforehand.
- [ ] All twenty unique rarity-owned SVG achievement symbols render in Ledger, locked/hint and toast states without changing Rare unlock requirements.
- [ ] Confirm regular UFO boss sequence after 5, 10 and 15 kills, escape/reacquisition behavior and 30-contact percentage.
- [ ] Normal Keys still obey Epic eligibility, despite Insert Coin unlocking Rare arcade combat.
- [ ] Regular UFO Hearts drop at the current 20% eligible chance (statistical check, no promise on individual kills).

### Shop
- [ ] Confirm 13 current inventory definitions, base costs, discounts, availability and locked presentation against `SHOP_ITEMS`.
- [ ] Buy Insert Coin during Rare: it equips automatically; natural UFO waves and upward shooting become eligible without granting Epic achievements or Console ownership.
- [ ] Unequip Insert Coin during Rare: new natural UFOs and upward shots no longer qualify; already active encounters are not necessarily deleted.
- [ ] Buy Dog Whistle, Slowpoke and Insert Coin together: all independent effects remain active; per-item UNEQUIP changes only selected effect.
- [ ] Celestial Beacon and Arcade Bounty are independent Epic gameplay modifiers, not always-on passives: unequip switches off bonus while ownership remains.
- [ ] Bounty raises regular UFO Rupee-drop chance from **30% to 45%**, not +45 points.
- [ ] Confirm UNEQUIP ALL; reload preserves active ID array; legacy string saves migrate, including previously owned Beacon/Bounty effects.
- [ ] Bird permanent extra Life and repeatable bank purchase remain different types; refill excluded from permanent completion count.

### Combat and Super Boss
- [ ] Star immunity, Mushroom max-tier buffer, cursor-tier damage and half-Hearts resolve in that order.
- [ ] Doug Bone stops friendly and hostile projectiles across swept segments without being consumed.
- [ ] Super Boss hits use normal defense state with approximately 650ms damage lock; no separate player HP pool.
- [ ] Sticky menu, footer hotbar and world pickups work during Boss fight; forced Interact OFF applies even without ownership and restores prior preference afterward.

### Mippi Bird
- [ ] LIVES 1 ends on the first valid collision. LIVES 2 ends on the second; LIVES 5 ends on fifth, with brief invulnerability between surviving hits.
- [ ] Hearts and regular Mushrooms do not add Bird Lives; Shop refill adds persistent bank, per-round extra Life replenishes next round.
- [ ] Bird rewards only at round end: previous best 8 / result 6 → 0, 8 → 1, 11 → 4 Rupees. One payout only.
- [ ] The worker initializes on Bird open, emits limited snapshots, computes collision and score internally and terminates on close.
- [ ] Unknown worker messages cannot directly set coordinates/lives/Game Over. Verify single final-Life collision and no scoring afterward.
- [ ] Manual pause and background/tab focus pause freeze worker progress; resume without simulation time catch-up.
- [ ] Test no-worker browser environment for graceful visible unavailability rather than a broken site.

### Storage and performance
- [ ] Storage enabled: Shop arrays, achievements, Rupee wallet, Bird bank and themes survive normal reload.
- [ ] Storage denied: main gameplay boots and continues in memory; a discreet persistence warning appears. Audit independent script storage exceptions.
- [ ] Run FPS/frame-time captures with Bird closed and open, with and without heavy particles/UFOs; check no lingering worker or interval after close.
- [ ] Check all Rare, Epic and Legendary themes and narrow/touch layout, and expanded Studio page scroll chaining.

**Verification status:** Source and development mock tests inform this checklist. No end-to-end browser pass or measured performance comparison has been supplied as complete.
