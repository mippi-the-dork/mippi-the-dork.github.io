# UI Surface Map

**Implementation baseline:** Mippi Portfolio v2.78

This document maps the major user-facing and runtime UI surfaces, their location, owner, and interaction priority.

It is not a DOM dump.

It is the cross-system map used to reason about:

- fixed-screen collisions,
- attention ownership,
- interaction suppression,
- z-order,
- persistence,
- responsive layout.

## Header and Navigation Layer

| Surface | Primary selector / ID | Location | Owner | Notes |
| --- | --- | --- | --- | --- |
| Site Header | `.site-header` | Sticky top | Experience Foundation | Main identity/navigation anchor. |
| Brand / Mippi mark | `.brand`, `.brand-mark` | Header left | Foundation / Finale | Rare Signal early, Finale trigger when ready. |
| Primary Navigation | Header nav links | Header | Portfolio Content | Major professional section navigation. |
| Music Player | `#music-player` | Direct child of header | Finale / Postgame | Hidden until 100 percent reward. Expands downward. |

## Bottom-Left Discovery Dock

| Surface | Selector / ID | Role |
| --- | --- | --- |
| Discovery controls | `#discovery-controls` | Fixed container for discovery/system access. |
| Achievement Ledger trigger | `#ledger-trigger` | Opens Ledger. |
| Theme cycle | `#theme-cycle` | Cycles available visual themes. |
| Dev Console tip | `#console-tip-button` | Visible Console discovery affordance. |

The Dev Console tip deliberately remains outside the Achievement Ledger so Console discovery is not hidden behind another panel.

## Bottom-Right Mode / Assistance Controls

Visual order:

```text
Design
Inspect
Interact
Hint
```

| Surface | ID | Visibility |
| --- | --- | --- |
| Design Mode | `#design-toggle` | Hidden until Design Mode entitlement. |
| Inspect Mode | `#inspect-toggle` | Always available. |
| Interact Mode | `#interact-toggle` | Hidden until Shop Interact Toggle ownership. |
| Hint | `#hint-trigger` | Always available. |

Design, Inspect, and Interact live in:

```text
#play-mode-controls
```

Hint is a separate fixed sibling at the far right.

## Persistent Progress HUD

Root:

```text
#progress-hud
```

Current child surfaces:

| Surface | ID | Visibility trigger |
| --- | --- | --- |
| Hearts | `#heart-meter` | First Heart onward. |
| Rupees | `#rupee-meter` | Rupee/Shop discovery. |
| Coolness | `#cool-meter` | Doug Coolness/Bone progression. |
| Invasion | `#invasion-meter` | Epic gameplay. |
| Castles | `#castle-meter` | Active/past Castle-run state. |
| Meta Trace | `#meta-trace` | Progression guidance logic. |

Claim-ready meters:

```text
#heart-meter.reward-ready
#castle-meter.reward-ready
```

become actual buttons only when their reward is ready.

## Dynamic Optional Objective

Root:

```text
#dynamic-objective
```

Important children:

```text
#objective-kicker
#objective-title
#objective-detail
#objective-progress-text
#objective-reward
#objective-progress-fill
#objective-dismiss
```

The objective sits above the persistent progression HUD and must reposition as that HUD grows or shrinks.

## Achievement Surfaces

### Achievement Toast

Transient completion notification.

Acts as an attention blocker for new ambient opportunities.

### Achievement Ledger

```text
#achievement-ledger
#ledger-close
#ledger-list
#ledger-count
```

After postgame reveal, new Epic/Legendary entries render above the original Rare tier.

## Dev Console

Primary root:

```text
.dev-console
```

Key runtime pieces:

```text
Console output
Console form
Console input
close control
clickable data-console-command actions
```

The Console can own a pending mode:

```text
reset_confirmation
wish
```

It is an attention blocker while open.

## Shop

Root:

```text
#shop-popup
```

Key children:

```text
#shop-close
#shop-items
#shop-wallet-count
#shop-equipped-name
#shop-unequip
#shop-merchant
```

The Shop is modal-like focus UI but remains part of the page rather than a navigation route.

## Wish / Blueprint Surfaces

### Blueprint

```text
.blueprint-popup
```

Represents `BP_WishManager`.

### Compile

```text
.compile-popup
```

Shader compilation joke/progress surface.

### Special Wish Popup

```text
.wish-special-popup
```

Shared authored Wish-result presentation family.

### Wish Sequence Overlay

```text
.wish-sequence-overlay
```

Used for longer staged Wish sequences.

### HAL Overlay

```text
.hal-overlay.show
```

Semantic red denial presentation.

### Unreal Source Reward

```text
#unreal-gift-popup
#unreal-gift-accept
#unreal-gift-decline
```

### Other Wish-Specific Popups

Includes authored Blender/contact/result surfaces as implemented in v2.78.

These focused Wish surfaces are part of the Attention Budget.

## Azure Altar Gallery

Attention blocker selector:

```text
.azure-gallery[aria-hidden="false"]
```

The gallery is professional project presentation, not a game-layer pickup.

## Mippi Bird

Dynamic root:

```text
.flappy-game
```

Contains:

- canvas,
- score/high score,
- life HUD,
- Share menu,
- Quit.

It is a focused-attention surface while open.

## Finale

Root:

```text
#finale-overlay
```

Important children:

```text
#finale-line
#finale-subline
#finale-profile
#finale-controls
#finale-continue
#finale-stats
```

While active:

```text
body.finale-active
```

blocks pointer interaction with normal page siblings.

## Session Debrief

Root:

```text
#session-debrief
```

Important children:

```text
#session-debrief-title
#session-debrief-summary
#session-debrief-grid
#session-debrief-observations
#session-debrief-assistance
#session-debrief-close
#session-debrief-continue
```

Body state:

```text
debrief-active
```

## Music Player

Root:

```text
#music-player
```

Important children:

```text
#music-collapse
#music-track-title
#music-track-status
#music-track-count
#music-prev
#music-play
#music-next
#music-download
#music-track-list
#music-audio
```

It is header-attached and not part of the bottom fixed control cluster.

## Heavy Water Perspective Visualizer

Canvases:

```text
#mapCanvas
#viewCanvas
```

Mode buttons:

```text
[data-mode="1st"]
[data-mode="2nd"]
[data-mode="3rd"]
```

The visualizer is professional content.

When Interact Mode suppresses normal portfolio input, its canvases stop accepting pointer interaction.

## Three.js Surfaces

### Hero

Interactive Hero scene and signal navigation.

### Ambient

Full-page noninteractive ambient 3D layer.

### About

Local About-section 3D scene.

The ambient layer is pointer-transparent.

The Hero interaction is suppressed with professional content during Interact Mode.

## Flying / Game-Layer Surfaces

Common dynamic selectors:

```text
.shooting-star
.game-pickup
.doug-bone
.galaga-secret
.boss-ufo
.section-castle
.doug-peek
.superboss-arena
```

These are the surfaces most likely to require explicit Interact Mode exceptions.

## Super Boss

Root:

```text
.superboss-arena
```

Internal surfaces include:

```text
Super Boss core
Adds
enemy projectiles
Mega Laser
gameplay cursor
player projectiles
Exit Boss Fight
Victory panel
```

The arena owns focused combat input.

It temporarily suppresses ordinary portfolio interaction when needed.

## Debug / Presentation Layers

### Vibe AI

```text
.vibe-agent
body.vibe-mode
```

### Lumen

```text
.lumen-artifacts
```

### Nanite

No major screen-space panel. It swaps registered Three.js mesh geometry/material state.

### Particle Boost

```text
.command-particle
body.particle-boost
```

### Stat Overlay

```text
#fps-stat
```

Pointer-transparent informational overlay.

## Cursor Layers

The site can use:

- native browser cursor,
- Mushroom/custom cursor scaling,
- Legendary/power cursor layer,
- Super Boss gameplay cursor.

Focused overlays such as Finale explicitly restore a normal visible native cursor.

## Attention Ownership

The runtime treats the following as focused surfaces that can block new natural ambient activity:

```text
Super Boss
hidden browser tab
active form control
achievement toast
Achievement Ledger
Dev Console
Shop
Blueprint
Compile
special Wish popup
Wish sequence overlay
HAL overlay
Azure gallery
Mippi Bird
Finale
Session Debrief
```

This list is a runtime contract.

Adding a new major focused overlay should include an Attention Budget audit.

## Z-Order Rule

Do not solve collisions by continuously increasing z-index.

First determine whether surfaces should:

- coexist,
- defer,
- reposition,
- suppress one another.

The Attention Budget and stable HUD anchoring should do most of the coordination work.

## Responsive Rule

Every fixed surface should be tested at:

```text
desktop
narrow desktop/tablet
mobile-width
```

High-risk combinations:

```text
Objective + full progress HUD
mode strip + Hint + toast
header Music + mobile navigation
Ledger + bottom-left controls
Super Boss + Exit control
Finale + cursor
```
