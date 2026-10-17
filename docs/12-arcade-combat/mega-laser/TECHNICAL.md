# Mega Laser - Technical Documentation

**Current behavior:** v3.04. **Category:** Arcade, Combat, and System Combos.

`superBossMegaLaser()` returns if there is no active encounter, it has ended, or another beam is live. It sets `laserActive`, freezing the Super Boss's movement clock and its six orbiting adds.

**Authoritative v3.04 beam origin:**

```js
const x = s.bossX;
const y = s.bossY + 62;
```

Both the beam element position and its `distancePointToSegment()` collision use this origin. The **+62px** offset is tuned to the lower-center mouth of the SVG from known dimensions, not independently visually validated. The beam's CSS provides a rounded boss-side capsule and a separate glowing orb.

Normal timing: **900ms charge**, **1,750ms active**, **0.88 radians/second** capped turn toward cursor. Slowmo: **1,250ms charge**, **2,300ms active**, **0.62 radians/second**. Its length spans ~1.4 times the viewport diagonal and collision uses a ~34px segment distance. As the beam ends, both beam rAF and movement freeze are cleared. Encounter cleanup removes remaining beam state.

## QA

Validate visual/collision mouth alignment, capsule shape and orb on narrow/wide screens, cursor tracking and dodging, Slowmo timings, freezing of parent/adds, and exit mid-charge or active beam with no orphan rAF. See [v3.04 QA](../../QA/V3_02_TO_V3_04_QA.md).
