# v2.99 Canvas-First FX QA

**Historical implementation test:** v2.99. **Current documentation:** v3.01.

Test Epic and Legendary pointer Trail, Star Power rainbow sparks, Doug Bone Cool wake, Command/Particle Boost and DOM cursor Aura. `dev fx renderer canvas` and `dev fx renderer dom` select independent cosmetic FX implementations, not `dev combat renderer`. Verify two Canvas layers mount on demand, return to zero active sprites and detach after expiry. Switching or `dev fx reset` must not change pickups, hit tests, music or progression.

Repeat a controlled Legendary 30-second combined combat A/B/A with similar deliberate pointer motion: Canvas, DOM, Canvas. Keep actual Mushroom level fixed, Scoped Big visual, same viewport, combat geometry on, combat particles Canvas, all combat visuals enabled, and compare per-capture `POINTER` event counts and traveled distance alongside rAF interval p95/p99, long tasks and `fxInitial/fxFinal`. Refresh before separate runs if necessary; disclose differences in timed objectives or background work.

v2.99 Chromium smoke checks covered four effect kinds, Canvas/DOM toggle, layer cleanup, 105 player and 164 hostile shots and 1,350 combat-effect particles across ten seconds. These are not Windows benchmarks or guarantees of Canvas/DOM pixel fidelity. v3.00 later sharpened glow sprites and retained Canvas default. Test Rare/Epic/Legendary colors and no stuck native cursor after blur/modal focus. Do not claim a measured 60 FPS or compare only synthetic rAF callback rates with GPU-present frames.