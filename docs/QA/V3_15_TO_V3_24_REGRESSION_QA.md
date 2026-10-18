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
