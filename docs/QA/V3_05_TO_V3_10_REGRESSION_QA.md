# v3.05–v3.10 Regression QA

**Current documented version:** v3.10. These are acceptance criteria; the handoffs do not establish that all visual/browser tests passed.

## v3.05 Star Power and side projects

- [ ] Trigger Star Power in Rare, Epic and Legendary. Verify the cursor contact ring animates rainbow hue without moving its center or changing its Mushroom-scaled radius. Reduced-motion disables hue animation. Existing Star sparks and interactions remain correct.
- [ ] Confirm **Azure Altar**, **Unmark**, **Elarsi** side-project cards in a three-column grid at >=1200px; narrower layouts stack. Test Elarsi's readable CSS waveform, line/word LRC copy, keyboard-accessible GitHub link and all themes.

## v3.06 Hero pose and achievements

- [ ] On fresh load, Hero root uses opening yaw **-0.36**, pitch **0.03**, and remains there when idle motion starts rather than snapping to another pose.
- [ ] Perspective Visualizer: 1st→3rd or 3rd→1st **does not** award Second Perspective; selecting **2nd Person** does.
- [ ] Check Signal Saturation requires all 10 original Signals, Full Hearts requires current 5/5 reserve, and Buy the Store requires every listed Shop item. Ledger hint and solution text must be accurate.

## v3.07 WebGL failure and navigation

- [ ] Simulate Three.js import failure, scene construction error, and `webglcontextlost` after a successful scene. Verify visible 2D fallback, failed canvas hidden, no rendering into lost context.
- [ ] Fallback **Games, Career, Consulting, Tools** anchors work by mouse and keyboard and navigate to correct page sections. Canvas remains `aria-hidden`.
- [ ] Signal Acquired / navigation telemetry counts legitimate fallback clicks and respects interaction-hunt exclusion; scene marked healthy only after successful initialization.

## v3.08–v3.10 Hero composition

- [ ] Current logo plane is **(0,0,1.55)** in its parent coordinate space. The centered `logoOrbit` group has `rotation.order='YXZ'` and `rotation.set(-0.35,-0.45,0)`; plane's normal remains radial to the core instead of looking detached.
- [ ] Decorative rings preserve v3.08 `ringA=(1.15,0.2,-0.12)`, `ringB=(0.62,0.9,0.65)`. Theme changes, ambient hover, resize and drag do not disturb orbital placement.
- [ ] v3.08's temporary direct logo translation **(-0.67,0.53,1.40)** must **not** be used as current behavior. WebGL failure fallback remains functional.
- [ ] Capture actual Windows/browser screenshots for the intended face/logo framing. v3.10 handoff requests live visual QA, not a claim that the angle is definitively approved.

## v3.09 Career feature

- [ ] **Your Studio Here** appears before Mob Entertainment with exactly **Design Direction / Systems Design / Game Consulting · Today**.
- [ ] Card spans 2 columns above 900px and normal stacked width at <=900px; separator borders correctly align.
- [ ] Verify the actual **2048×576** `assets/career-real/yourstudiohere.png` resource exists and renders in network and screenshot checks. A gradient-only blank card is a failure to load the art, not design intent. The handoff includes the asset, but **documentation PRs do not install it**.
- [ ] Check responsive text contrast and Rare/Epic/Legendary theme treatment.

## Release checks

- [ ] Documentation version badge, homepage, current QA menu, manifest, release history and cache-busting docs CSS/JS identify **v3.10**.
- [ ] Portfolio release metadata documented for v3.05 stylesheet, v3.06–v3.08 and v3.10 script tags; do not substitute an obsolete v3.08 logo offset.
- [ ] Preserve existing music/lyrics, combat, navigation, persistence and achievements outside the specified changes.
- [ ] End-to-end interaction and performance tests are documented as **pending** unless verified independently. Never infer visual correctness from a passed syntax check.
