# Authored Spawn Motion - Design

**Introduced:** v3.01. **Current documented version:** v3.01.

## Intent

Not every game-layer object should fly generically across the viewport. Each entity now has a recognizable **spawn source, path, lifetime and player interaction** while coexisting with scrolling portfolio cards, the bottom hotbar, and the existing economy and combat systems.

| Entity | Current route / rule |
| --- | --- |
| Collectible Star | Bounces side-to-side just above hotbar for multiple laps before expiry |
| Rupee | Emitted from meaningful UI/link interactions or enemy rewards, falls with gravity, bounces over HUD ground, then must be clicked |
| Mushroom | Moves around an eligible content panel's perimeter, retained as a panel child while scrolling |
| Heart | Natural source: enemy defeats; drops and bounces physically, then must be clicked |
| Doug Bone | Ambient fall from top with spin until it passes hotbar ground |
| Hidden Key | One at a time at the bottom-right of an eligible content panel; no natural expiration; starts Castle quest when collected |
| Regular UFO | Equal-probability corner cubic-Bezier swoop or vertical sine flight on left/right |
| Regular Boss | Repeated top/right/bottom/left diamond until killed or escape timer |
| Super Boss | Top-of-page horizontal pan with occasional reversals; **pauses during Mega Laser** |
| Six Super Boss adds | Circular orbit following the moving Super Boss, paused with its movement clock during beam |
| Shooting Star | **Unchanged** original fast Shooting Star movement |

Most actors are optional, finite-lived and click/touch sensitive; the Key is an intentional stationary exception. Timing, viewport dimensions and scroll can affect where they are seen.

## UX and acceptance

Movement must be readable without obscuring the portfolio. Star stays over the hotbar without silently escaping the viewport; Mushroom stays visibly attached to one panel's border, even when scrolling; Key remains reachable; drops don't hide behind HUD. Boss bullets align with their visible launch points. No gameplay/achievement behavior is changed merely to implement routes.

**Important:** Successful source syntax checks do not establish that all paths, hotbar collisions, panel clipping or real-browser frame pacing are correct. See [Technical](TECHNICAL.md) and [v3.01 Gameplay QA](../../QA/V3_00_V3_01_GAMEPLAY_QA.md).


## Current v3.04 Specification

v3.02 moves Mushroom sprites out of content-panel DOM, maintaining panel-perimeter motion as a **body-level fixed overlay** so panel clipping/inherited styles no longer affect art. v3.03 keeps these overlays above content but below sticky header and bottom HUD. Maximum three Mushrooms, one per unique panel; one active bouncing Star. v3.02 added ~380ms expiry fade/lift/shrink; v3.04 adds ~380ms entrance from bright to normal only for initially onscreen actors, skipped for reduced motion and offscreen entrants.
