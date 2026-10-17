# Spawn Entrance and Expiry - Technical Documentation

**Introduced:** v3.02/v3.04. **Current version:** v3.04.

## Shared movement integration

`spawn-motion.js` manages world/panel-relative actor records and owns each actor's initial calculated position. On registration, when the **first modeled position** lies inside the viewport, apply the entrance state for approximately **380 ms**. Offscreen starting actors skip this treatment. Respect `prefers-reduced-motion`.

The CSS entrance treatment transitions from bright to normal opacity; encounter Super Boss adds have a corresponding one-time entrance class on initial creation and per-slot respawn. This does not replace the actor's gameplay movement, use a separate sprite simulation loop or alter hit testing.

For v3.02 expiry, supported pickup, Bone and ordinary UFO elements retain their final movement position during roughly 380 ms opacity fade with lift and shrink. The expiry animation must not cancel already-earned rewards, call collection handlers or resurrect an expired entity.

## Layering and clipping

Mushrooms are positioned as **body-level, fixed overlays**. Their modeled route still follows a selected content panel's perimeter and scroll offset, but they are **not DOM children of the panel**, so panel overflow and inherited styles do not crop them.

v3.03 places overlay Mushrooms at CSS z-index **110**, below the then-current header **120** and game HUD **255**. These are historical styling values; the enduring invariant is that Mushrooms stay under both UI layers but above content.

## QA and cleanup

Capture first-frame in-viewport state, transitions after tab refocus, natural expiry, reduced-motion preference, one-time entry after scrolling, click/damage while fading, and disposal of element/movement handles. See [v3.04 QA](../../QA/V3_02_TO_V3_04_QA.md).
