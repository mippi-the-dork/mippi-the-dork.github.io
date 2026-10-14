# Unified Bottom HUD - Design

**Introduced:** v2.81. **Current specification:** v2.89.

## Purpose

The old floating HUD competed with the professional portfolio. v2.81 moved the existing controls into one bottom dock, preserving their handlers, unlocks and meaning. The music player remains under the header, never inside the dock.

| Group | Responsibilities |
| --- | --- |
| Progress | Achievement Ledger, Rupees, five Hearts |
| Gameplay | Coolness, Invasion and Castles |
| Modes | Design, Documentation, Inspect, Interact |
| Utilities | Hint, Theme, Dev Console |

The gameplay meters have a consistent compact shape. Coolness and Invasion are informational; Castles becomes clickable when the reward is claimable. At 5/5, Hearts becomes clickable for its original reward, and post-cap Hearts do not create a sixth meter symbol.

## Evolution

- **v2.81:** Four-column dock, shared compact meters, accessible tooltips and responsive two-row fallback. Original DOM controls are relocated rather than duplicated.
- **v2.82:** Icon scale/contrast and three-bar visual consistency; no permanent group dividers; timed objectives are independently anchored above the dock.
- **v2.83:** Every control has a faint resting frame, with stronger hover/focus and actionable attention states; console roughly 800px wide and notices roughly 310px.
- **v2.84:** The full interactive button border and icon pulse via a child attention ring, subject to reduced-motion preference. Ledger and Documentation buttons now respect unlock gating.
- **v2.85:** Exactly five Hearts and stable SVG icons through text changes. Desktop tracks use max-content sizing with distributed gaps.
- **v2.87:** Desktop >=1000px arranges two close visual pairs (Progress + Gameplay, Modes + Utilities), 20px within each pair and flexible middle separation; narrower layouts keep the responsive grid.

**Current layout is the later v2.87 paired grouping.** The v2.85 distribution is historical, not the final desktop policy.

## Interaction and attention

Only actionable controls may imply clickability. New Wish/Blueprint needs a visible Console label as well as a pulse. Documentation attention activates only when Design Mode is active and the docs have not been visited. Accessibility labels, tooltips and keyboard focus should communicate the hidden numerical meter details.

## Acceptance

Test all rarities; first visit, Epic and fully unlocked states; >=1000px and below; reduced motion; long tooltips; ledger and console opening above the dock; no clipping/overlap with objectives and toasts. The header-attached music player must stay outside the dock.
