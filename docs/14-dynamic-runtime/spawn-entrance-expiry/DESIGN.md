# Spawn Entrance and Expiry - Design Documentation

**Introduced:** v3.02 expiry polish; **entrance added:** v3.04. **Current version:** v3.04.

## Visual intent

A visible spawn should arrive intentionally rather than popping into the page. A departing transient sprite should feel like it exits gracefully rather than disappearing abruptly. These changes are presentation-only: click targets, game rewards, spawn odds and object lifetimes still follow their owning systems.

## Spawn entrance

From v3.04, **new moving objects whose first calculated position is onscreen** fade from bright to their normal appearance over roughly **380 milliseconds**. A sprite entering from offscreen continues naturally without an added on-screen arrival flash. Reduced-motion preference bypasses the transition. Super Boss adds receive an entrance treatment on their initial appearance and whenever they respawn.

The transition triggers **once at spawn**, never every time a panel scrolls into view or when the same actor moves back across the viewport.

## Expiry

v3.02 introduced about **380 milliseconds** of opacity fade and small lift/shrink for supported pickups, Bones and ordinary UFOs on natural expiry. A successful click, death or encounter teardown must not become a second duplicated reward/telemetry event while the visual leaves.

Mushrooms are body-level overlays following their assigned content panel. They must appear above page cards but **below the header and bottom gameplay HUD** (v3.03); this is distinct from the general entrance effect.

## QA

Check Star, Mushroom, Heart, Rupee, Bone, UFO and Boss spawn positions, natural expiry, reduced motion, resize/scroll, hit targets and layering. Do not apply the entrance effect repeatedly through scrolling.

See [Technical](TECHNICAL.md) and [v3.04 QA](../../QA/V3_02_TO_V3_04_QA.md).
