# Galaga Formations - Technical Documentation

**Introduced:** v3.02; **current configuration:** v3.03–v3.04.

## Ownership

`script.js` owns natural UFO opportunities, invasion-dependent formation selection, caps and the ship-spawn scheduler. `spawn-motion.js` supplies the shared authored screen-space position authority.

Regular UFOs retain their original hit button, target class, hostile fire and reward handlers. Forming a group must not grant free kills or combine the ships into one hitbox.

## Formation invariants

| Parameter | Current rule |
| --- | --- |
| Natural regular UFO concurrency | At most 6 simultaneously |
| Formation size | At most 4 |
| Flight family | Identical within a formation |
| Flight duration | **Identical** for all ships within a formation |
| Initial spawn staggering | **1,050 ms** between ships (v3.03, superseding v3.02's 280 ms) |
| Difficulty | Natural spawn opportunity and formation complexity grow with invasion progression |
| Sine-path containment | Inward path positioning and reduced X amplitude |

For a formation, choose path parameters and flight duration **once**, then spawn each member at its staggered interval. Cleanup of a destroyed/expired ship must not affect its siblings or leave queued ships outside natural-spawn limits. The authored paths still include corner swoops and vertical sine motion.

## Historical corrections

v3.02's first 280 ms spacing made ships stack; v3.03 resolves that by increasing the interval and sharing duration. Avoid describing v3.02 timing as the current setting. Developer-forced spawns can have distinct limits from ordinary natural scheduling.

## QA

Run the [v3.04 release regression](../../QA/V3_02_TO_V3_04_QA.md) with multiple invasions and window widths. Check formation timing, active counts, projectile positioning and no orphaned scheduled spawn after a Boss contact or encounter reset.
