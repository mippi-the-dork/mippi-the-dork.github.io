# Release Checklist

**Implementation baseline:** Mippi Portfolio v2.78

Use this as the final release-candidate signoff after feature QA is already complete.

It is intentionally shorter than the [Extensive QA Test Plan](EXTENSIVE_QA_TEST_PLAN.md).

## 1. Freeze Candidate

- [ ] Confirm the candidate version.
- [ ] Stop unrelated polish until signoff finishes.
- [ ] Record package/source location.
- [ ] Confirm all intended changes are actually in this candidate.

## 2. Version Synchronization

- [ ] Runtime health version matches candidate.
- [ ] `style.css?v=<version>` matches.
- [ ] `script.js?v=<version>` matches.
- [ ] `perspective-demo.js?v=<version>` matches.
- [ ] `index-debug.html` query strings match source candidate.
- [ ] Preview server URL version matches.
- [ ] Preview server banner version matches.
- [ ] Package/release notes use the same version.

For v2.78 baseline, expected runtime asset queries are:

```text
style.css?v=2.78
script.js?v=2.78
perspective-demo.js?v=2.78
```

## 3. Public Package Hygiene

Public runtime should contain the intentional site files and assets.

Confirm these are absent:

```text
__pycache__/
*.pyc
PreviewLocal.bat
preview_server.py
index-debug.html
*_DEV.md
```

- [ ] No Python cache.
- [ ] No local preview scripts.
- [ ] No debug HTML.
- [ ] No development-only Markdown.
- [ ] No clearly obsolete unused asset files.
- [ ] All required referenced assets are present.
- [ ] File/path case matches references exactly.

Music exception during content staging:

```text
assets/music/song-01.mp3
...
assets/music/song-06.mp3
```

may intentionally be absent if the release is still using the pending-track state.

## 4. Static Validation

- [ ] JavaScript syntax check passes.
- [ ] Duplicate HTML ID scan passes.
- [ ] CSS brace/structure check passes.
- [ ] Local HTML asset references resolve.
- [ ] CSS `url(...)` references resolve.
- [ ] JavaScript dynamic image/icon references resolve.
- [ ] Minimal startup mock passes.
- [ ] DOM-enabled startup mock passes.
- [ ] `index-debug.html` differs from `index.html` only by intended diagnostic code.

## 5. Fresh Local Cold Load

Start a **new** local preview process.

Do not reuse an old browser tab as the only evidence.

- [ ] `PreviewLocal.bat` opens the expected version.
- [ ] URL contains a unique local launch token.
- [ ] Browser Console has no uncaught startup error.
- [ ] Current CSS is visibly loaded.
- [ ] Current JavaScript behavior is loaded.
- [ ] Professional navigation works.
- [ ] Heavy Water Perspective Visualizer works.
- [ ] Three.js scenes load or degrade gracefully.

Inspect:

```js
window.__MIPPI_RUNTIME__.snapshot()
```

Expected:

- [ ] version correct,
- [ ] no unexplained early errors,
- [ ] Three import attempts sensible,
- [ ] Hero state matches visible Hero,
- [ ] Ambient state matches visible ambient layer,
- [ ] About state matches visible About 3D.

## 6. Returning-State Startup

Repeat local cold startup with representative saved states.

- [ ] Rare partial state.
- [ ] Epic state.
- [ ] Legendary state.
- [ ] Postgame revealed.
- [ ] 100 percent / Music Player unlocked.

Watch specifically for Temporal Dead Zone or initialization-order regressions.

## 7. Public Reset Integrity

Use the player-facing:

```text
reset
```

flow.

- [ ] First `reset` asks for confirmation.
- [ ] Non-reset input cancels.
- [ ] Second `reset` confirms.
- [ ] Mippi localStorage state clears.
- [ ] Mippi sessionStorage state clears.
- [ ] Scroll returns to top.
- [ ] Real `location.reload()` occurs.
- [ ] Rare baseline returns.
- [ ] Shop empty.
- [ ] Rupees zero.
- [ ] Hearts zero.
- [ ] Wish charge zero.
- [ ] Postgame hidden.
- [ ] Music Player hidden.
- [ ] Three.js bootstrap runs again without requiring manual refresh.

## 8. High-Risk Regression Sweep

- [ ] Hostile projectiles always clean up after hit/miss.
- [ ] No projectile remains frozen on screen.
- [ ] Optional Objective does not overlap full progress HUD.
- [ ] Optional Objective remains readable when other focused UI opens.
- [ ] Super Boss beam freezes translation and rotates toward cursor.
- [ ] Super Boss Adds explode at current position.
- [ ] Super Boss player fire works without Legendary prerequisite.
- [ ] Super Boss restores prior Interact state.
- [ ] Finale cursor is visible over choice buttons.
- [ ] Music Player aligns to Mippi logo/header inset.
- [ ] Music Player expands downward from fixed top edge.
- [ ] `wish` Help treatment remains readable.
- [ ] `blueprint` Help state turns warning red while broken.
- [ ] Local Three.js cold load does not require a manual refresh.
- [ ] Perspective Visualizer first-person turn speed is faster than second/third.

## 9. Fast DEV State Sweep

Use DEV for breadth.

### Progress

```text
dev rare
dev epic
dev legendary
dev finale ready
dev finale play
dev postgame reveal
dev postgame complete
dev music
```

- [ ] Rare visual/state.
- [ ] Epic visual/state.
- [ ] Legendary visual/state.
- [ ] Finale readiness.
- [ ] Finale sequence.
- [ ] Postgame reveal.
- [ ] True Completion.
- [ ] Music Player.

### Economy / Milestones

```text
dev rupees 10
dev shop affordable
dev shop complete
dev hearts 5
dev cool max
dev castle 4
```

- [ ] Shop affordability cue.
- [ ] Shop completion.
- [ ] Hearts claim-ready.
- [ ] Cool Mode.
- [ ] Castle claim-ready.

### Arcade

```text
dev ufo
dev boss
dev superboss
dev starpower
dev flappy
```

- [ ] Regular UFO.
- [ ] Normal Boss.
- [ ] Super Boss.
- [ ] Star Power.
- [ ] Mippi Bird.

### Director

```text
dev director quiet
dev director curious
dev director engaged
dev director struggling
dev director mastery
```

- [ ] All five states force successfully.
- [ ] Snapshot profile changes.

### Objectives

```text
dev objective random
dev objective complete
dev objective fail
```

- [ ] Offer.
- [ ] Completion.
- [ ] Failure.

### Attention

```text
dev attention rupees
dev attention wish
dev attention blueprint
```

- [ ] Rupee affordability attention.
- [ ] Wish-ready Console attention.
- [ ] Broken Blueprint Console attention.

## 10. Natural Critical Path

Do not use DEV for this pass.

- [ ] Find all 10 Rare Signals.
- [ ] Epic unlocks naturally.
- [ ] Catch a Shooting Star.
- [ ] `wish` has charge.
- [ ] First broken-Wish attempt preserves charge.
- [ ] Open BP_WishManager.
- [ ] Insert Is Valid.
- [ ] Complete a validated Wish.
- [ ] Legendary unlocks naturally.
- [ ] Satisfy normal Finale gates.
- [ ] Finale-ready Mippi logo appears.
- [ ] Trigger Finale.
- [ ] Continue or view Session Report.
- [ ] Wait approximately 5 seconds after leaving ending/report.
- [ ] Postgame Ledger force-opens.

## 11. Postgame Smoke

- [ ] 9 Epic postgame entries visible.
- [ ] 1 Legendary capstone visible.
- [ ] Locked entries show hidden/appropriate hint treatment.
- [ ] Cheat stops before Legendary walkthrough assistance.
- [ ] `100% Complete` requires all nine Epic plus Finale seen.
- [ ] Music Player unlocks on Legendary capstone.
- [ ] Music Player persists through reload.
- [ ] Full reset removes it.

## 12. Music Player

### Missing Track Package

- [ ] Six slots visible.
- [ ] Missing tracks report pending.
- [ ] Play does not break.
- [ ] Download remains disabled.

### Installed Track Package

For every installed song:

- [ ] Metadata loads.
- [ ] READY appears.
- [ ] Play.
- [ ] Pause.
- [ ] Previous.
- [ ] Next.
- [ ] Ended auto-advance.
- [ ] Download.
- [ ] Collapse while playing.
- [ ] Expand without playback reset.

## 13. Responsive Smoke

Test at least:

```text
wide desktop
narrow desktop/tablet
mobile-width
```

- [ ] Header/navigation readable.
- [ ] Music Player usable.
- [ ] Progress HUD usable.
- [ ] Optional Objective avoids overlap.
- [ ] Mode strip order remains Design, Inspect, Interact, Hint.
- [ ] Bottom-left discovery controls remain accessible.
- [ ] Achievement toasts do not hide fixed controls.
- [ ] Finale buttons reachable.
- [ ] Session Report scrollable.
- [ ] Perspective Visualizer stacks correctly.

## 14. Hosted Deployment Smoke

After deployment, open a fresh private/incognito context.

- [ ] Correct production version.
- [ ] Current CSS/JS served.
- [ ] No case-sensitive asset failures.
- [ ] Three.js cold load.
- [ ] Professional navigation.
- [ ] Major external links.
- [ ] Dev Console.
- [ ] Shop.
- [ ] Perspective Visualizer.
- [ ] Persistence after reload.
- [ ] Public reset.
- [ ] No unexplained Console errors.

Inspect:

```js
window.__MIPPI_RUNTIME__.snapshot()
```

again on the hosted build.

## 15. Release Signoff

Record:

```text
Build/version:
Date:
Tester:
Local cold load:
Returning-state startup:
Hosted cold load:
Natural critical path:
DEV state sweep:
Responsive smoke:
Reset integrity:
Known nonblocking issues:
Release approved:
```

### Automatic Release Blockers

Do not ship with any known:

- startup crash,
- progression blocker,
- stuck overlay,
- stuck hostile projectile,
- inaccessible required control,
- broken public professional link,
- broken reset,
- unexplained uncaught runtime error.

A bug does not become acceptable merely because a manual refresh makes it disappear.
