# Unified Bottom HUD - Technical

**Introduced:** v2.81. **Current specification:** v2.89.

## DOM ownership

`#site-game-hud` contains `#hud-progress`, `#hud-gameplay`, `#hud-modes`, and `#hud-utilities`. `initializeUnifiedHud()` **moves** the existing control DOM nodes (twelve relocated controls as counted by v2.87 instrumentation); it does not clone them. The original event handlers and saved-state references remain authoritative.

## Visual and logic rules

- Hearts: `updateHeartMeter()` selects the five glyph children, excluding `.hud-attention-ring`. Do not create a ring within the Heart meter. Five and only five heart symbols.
- Icon-safe text: `setHudControlText(el, value)` updates `.hud-control-text` rather than assigning `textContent` on the whole button and deleting its SVG.
- SVG controls are centered using 50%/50% translation. Hidden label text remains accessible.
- A `.hud-attention-ring` child animates border and icon for `attention-ready`, `attention-new`, `shop-ready`, or `reward-ready` where appropriate.
- Ledger only appears after at least one original Signal or postgame reveal. Docs control has `hidden` initially and only becomes available after Design Mode entitlement.
- Coolness, Invasion and Castles share a compact footprint; explanatory numbers live in title/aria data, not long visible bars.
- v2.87 pre-paint guard `html.hud-pending` hides the legacy floating containers until the relocated dock is ready. This prevents initial-layout flash.

## Layout

At desktop >=1000 CSS pixels, grouping is **Progress + Gameplay**, then flexible middle gap, then **Modes + Utilities**, with about 20px inside a pair. Narrower layout reflows; consult CSS, not a permanently fixed bar height. `syncProgressHudPosition`, `syncObjectiveHudPosition`, and toast anchors must account for the dock's actual height.

The v2.81–v2.85 spacing changes are historical stepping stones; do not revive v2.85's equally distributed four groups as the v2.89 end state.

## Profiling

`perf-lab.js` captures startup `HUD mount` count/duration and, during recording, `#site-game-hud` DOM changes. Hidden `dev profile hud off/on` isolates paint; `hudfx` isolates decorative CSS; `hudlogic` isolates selected update functions. These modes have distinct meanings, and the latter can leave UI values stale. Restore with `dev profile reset`.

## QA

Verify all controls work after relocation; full/zero Hearts; repeated status-label toggles keep SVG; mobile wrapping; idle frame; modal focus; reset; no duplicate IDs or controls; no first-paint legacy HUD flash.
