# Console Command Catalog

**Current documented version:** Mippi Portfolio v3.24

This document retains the original v2.98 command inventory for the in-site Dev Console.

Normal player commands are case-insensitive after normalization.

Whitespace is collapsed.

The backtick or tilde key toggles the Console when the command input is not already focused.

## Normal Help Groups

### CORE

| Command | Purpose | Notes |
| --- | --- | --- |
| `help` | Print clickable Help command groups. | `dev` is intentionally omitted from normal Help. |
| `clear` | Clear Console output. | `cls` exists as an unlisted alias. |
| `version` | Print portfolio build identity. | Reports the v2.98 portfolio build version. |
| `about` | Navigate to About. | |
| `home` | Smooth-scroll to top. | |
| `top` | Smooth-scroll to top. | Alias-like navigation command. |
| `inspect` | Toggle Inspect Mode. | Persistent preference. |
| `design` | Toggle Design Mode. | Only shown in Help when Design Mode entitlement is unlocked. |
| `theme` | Cycle available rarity themes. | Presentation only. |
| `debug` | Open source/debug viewer surface. | |

### NAV

```text
games
career
consulting
crafting
tools
resumes
projects
hero
```

These commands navigate or scroll to major portfolio content.

### LINKS

```text
github
fab
steam
unreal source
learning
```

They open the corresponding external resource.

### PROJECT

```text
heavywater
azure
unmark
nda
```

`nda` navigates to Career and prints the intentional access-denied joke.

### SYSTEM

| Command | Purpose |
| --- | --- |
| `achievements` | Open Achievement Ledger. |
| `reset` | Arm the two-step full reset confirmation. |
| `cheat` | Reveal the next Rare or Epic postgame achievement solution. |
| `stats` | Print local current-session statistics and Player Model. |
| `docs` | Open public website documentation in a new tab. |

### FUN

```text
doug
shipit
joke
ufo
twinkle
shroom
rupee
shop
hey listen
stars
wish
vibe
play
```

Important behaviors:

- `ufo` force-spawns a regular UFO.
- `twinkle` force-spawns a Star Power pickup.
- `shroom` force-spawns a Mushroom.
- `rupee` force-spawns a Rupee.
- `hey listen` force-spawns a Heart.
- `shop` opens the Rupee Shop.
- `stars` explains the Shooting Star/Wish charge relationship.
- `wish` schedules a Shooting Star when uncharged or enters Wish text mode when charged.
- `vibe` toggles Vibe AI Mode.
- `play` launches Mippi Bird.

### UNREAL

```text
stat fps
stat unit
stat none
blueprint
compile
slowmo
easy mode
lumen
nanite
```

## Removed Public Command

`particles` was removed from both public Help and dispatch in **v2.85**. Particle Boost remains an internal effect and is not directly triggered by this command.

## Hidden QA Performance Commands (v2.86–v2.89)

`dev perf` prints Three.js sampled render-call activity and visibility.

`dev profile help`, `boot`, `sample 15`, `start`, `stop`, `report`, `export`, `reset` are hidden and intended for performance diagnostics. Available isolate names include `hud`, `hudfx`, `themefx`, `cursorfx`, `ambient`, `hero`, `about`, `ambientlogic`, `projectiles`, `hudlogic`, and `objectiveclock`, each with `off/on`. `dev profile reset` restores only diagnostic isolates; the public `reset` clears progression.

See [Performance Diagnostics](17-qa-operations/performance-diagnostics/TECHNICAL.md).

## Hidden Player Commands

These are valid but not listed in normal Help.

| Command | Behavior |
| --- | --- |
| `godmode` | Unlock all original Rare Signals through the hidden God Mode path. |
| `god mode` | Same behavior as `godmode`. |
| `please` | Politely collects the current Shooting Star if one exists. |
| `i know mippi` | Unlocks Legendary after all 10 Rare Signals if Legendary is not already unlocked. |
| `cls` | Clears Console output. |
| `dev ...` | Temporary QA/state-forcing command root. |

The hidden-command telemetry path treats the four player-facing secrets as hidden commands:

```text
godmode
god mode
please
i know mippi
```

The temporary `dev` layer intentionally bypasses normal player telemetry.

## Wish Input Mode

When Console is waiting for Wish text:

```text
consolePending = "wish"
```

the next submitted line is treated as Wish content rather than a command.

The text itself is not stored in session telemetry.

The runtime records only:

- an attempt occurred,
- whether validation state was ready,
- branch/result telemetry.

## Reset Confirmation Mode

First:

```text
reset
```

sets:

```text
consolePending = "reset_confirmation"
```

Second:

```text
reset
```

confirms.

Any other input cancels without changing state.

## Command History

Up Arrow:

```text
previous command
```

Down Arrow:

```text
next command
```

History exists only for the current runtime session.

## Clickable Help

Help commands render as buttons carrying:

```text
data-console-command
```

Clicking one routes through the same command execution function as typed input.

This keeps telemetry and command behavior consistent.

## Special Help Styling

### `wish`

Receives the animated rainbow Help treatment when relevant.

### `blueprint`

Turns into the repair-warning/red treatment while the Blueprint reference is broken.

These visual states update live.

## Console Attention Cue

When Console is closed:

### Charged Wish

```text
WISH READY // ~ DEV CONSOLE
```

### Broken Blueprint

```text
FIX WISH // ~ DEV CONSOLE
```

The broken Blueprint state takes priority over ordinary charged-Wish attention.

Attention is suppressed while Console itself is open.

## Temporary QA Root

Type:

```text
dev
```

or:

```text
dev help
```

for the state matrix.

### PROGRESS

```text
dev fresh
dev signals 0
dev signals 5
dev signals 10
dev rare
dev epic
dev legendary
dev finale ready
dev finale play
dev postgame reveal
dev postgame complete
dev music
```

### ECONOMY

```text
dev rupees 0
dev rupees 2
dev rupees 10
dev shop empty
dev shop affordable
dev shop epic
dev shop legendary
dev shop master
dev shop complete
dev hearts 0
dev hearts 5
```

### METERS

```text
dev cool 0
dev cool 50
dev cool max
dev castle 0
dev castle 3
dev castle 4
dev castle key
dev invasion 0
dev invasion 33
dev invasion 66
dev invasion near
```

### WISH

```text
dev wish charge
dev wish broken
dev wish fixed
dev wish engine
dev wish ai
dev wish undo
dev wish game
dev wish doug
dev wish mippi
dev wish blender
dev wish money
dev wish hal
dev blueprint broken
dev blueprint fixed
```

### ARCADE

```text
dev pickup heart
dev pickup rupee
dev pickup star
dev pickup 1up
dev pickup key
dev ufo
dev boss
dev superboss
dev starpower
dev flappy
```

### DIRECTOR

```text
dev director quiet
dev director curious
dev director engaged
dev director struggling
dev director mastery
```

### MODES / DOUG

```text
dev mode inspect on
dev mode inspect off
dev mode design on
dev mode design off
dev mode interact on
dev mode interact off
dev doug command
dev doug cool
dev doug review
```

### ATTENTION

```text
dev attention rupees
dev attention wish
dev attention blueprint
```

### UTILITY

```text
dev snapshot
dev clean
```

### OBJECTIVES

```text
dev objective random
dev objective complete
dev objective fail
dev objective <objective-id>
```

All 23 valid objective IDs are listed in [Objective Catalog](OBJECTIVE_CATALOG.md).

## DEV Behavioral Rules

- DEV commands intentionally do not count toward normal player command telemetry.
- `dev fresh` clears Mippi local/session state and performs a real reload.
- `dev clean` prepares a known clean runtime state without the full public confirmation flow.
- DEV forcing may bypass normal eligibility by design.
- A DEV state does not prove the natural progression path works.
- Natural-flow QA remains required before release.

## Command Catalog Maintenance

When changing the Console:

1. update `COMMANDS`,
2. update Help group if player-visible,
3. update `devPrintHelp()` if QA-visible,
4. update this catalog,
5. update `07-dev-console/`,
6. update the extensive QA plan.


## v2.90–v2.92 Hidden Combat Commands

`dev combat`, `dev combat run idle|player|ufo|combined|explosions [10–45 seconds]`, `dev combat stop`, `dev combat report`, `dev combat export`. v2.91 adds `dev combat geometry on/off` (cannot switch while a run is active, default on per load). In v2.92 optimized on mode prefers authored flying-object geometry, with cache fallback; off mode uses legacy v2.90 DOM reads. Report data is local and opt-in. See [Combat Performance Lab](17-qa-operations/combat-performance-lab/TECHNICAL.md).


## v2.93–v2.94 Combat Visual and Renderer Commands

```text
dev combat visual status
dev combat visual player off/on
dev combat visual ufo off/on
dev combat visual explosions off/on
dev combat visual explosionpaint off/on
dev combat visual glow off/on
dev combat visual all on
dev combat renderer status
dev combat renderer dom
dev combat renderer canvas
```

Visual controls are diagnostic and session-only; the first two suppress projectile paint but **not** simulation/hits; `explosions off` skips cosmetic emissions; `explosionpaint off` retains emission and particle lifecycles but hides output; `glow off` removes selected combat shadows/filters. `dev profile reset` restores all visual modes, but does **not** change geometry or renderer. v2.94 defaults to Canvas; DOM remains an opt-in parity/benchmark backend or unavailable-Canvas fallback. Changes cannot be made during a benchmark. See [Combat Visual Isolation](17-qa-operations/combat-visual-isolation/TECHNICAL.md) and [Canvas Particle Renderer](12-arcade-combat/shared-canvas-particle-renderer/TECHNICAL.md).


## v2.95–v2.97 Hidden Diagnostics

```text
dev stability help
dev stability start
dev stability report
dev stability export
dev stability stop
dev stability soak 10

dev cursor help
dev cursor status
dev cursor size gameplay|normal|big|verybig
dev cursor style universal|inherit
dev cursor native on|off
dev cursor aura on|off
dev cursor glow on|off
dev cursor trail on|off
dev cursor starsparks on|off
dev cursor reset
```

Stability Lab samples opt-in (~5s), can orchestrate 2–60 nominal minutes of production-path synthetic combat and v2.96 excludes focus-interrupted runs rather than counting them as normal foreground FPS. Cursor Lab is visual-only and memory-only; its style-inheritance alternative is an **experimental diagnostic**, not the production default. `dev profile reset` does not reset Cursor Lab; use `dev cursor reset`. See [Stability Lab](17-qa-operations/long-session-stability-lab/TECHNICAL.md) and [Cursor Lab](17-qa-operations/cursor-rendering-lab/TECHNICAL.md).


## v2.98 Scoped Cursor Commands

`dev cursor architecture scoped` selects the new default cursor architecture, while `dev cursor architecture legacy` restores the original broad `cursor-grown` styling as an A/B control. `dev cursor style universal|inherit` affects **Legacy architecture only**; the state can still be reported/exported while Scoped but does not change Scoped CSS. `dev cursor status` includes architecture, and `dev cursor reset` now restores **Scoped** with gameplay-derived visual level and all visual effects ON. All settings remain session-only. See [Scoped Mushroom Cursor](01-experience-foundation/scoped-mushroom-cursor/TECHNICAL.md).


## v2.99 to v3.01 Command Changes

`dev fx status`, `dev fx help`, `dev fx renderer canvas|dom`, `dev fx reset` operate the cosmetic FX renderer separately from `dev combat renderer`. `dev invasion 0|33|66|near` sets stages and resets pending encounters. `dev pickup heart` remains a testing override, but normal `hey listen` provides Heart sourcing guidance rather than spawning one. `dev ufo`, `dev boss`, `dev superboss` are controlled encounter shortcuts. Current shooting is vertical/enemy-only, not target-seeking. `dev cursor size` still changes visual size only. See [Cursor Shooting](12-arcade-combat/cursor-interaction-and-upward-shooting/TECHNICAL.md) and [FX Renderer](04-themes-visual-language/canvas-first-2d-fx/TECHNICAL.md).


## v3.14 Consolidated Update

Current documented target **v3.14**: Console HUD and tilde/backtick both toggle visibility in either direction, even while the input is focused. TRY WISH and OPEN BLUEPRINT cues pulse. Console availability remains independent of hardware Three.js capability; browser graphical fallback uses existing Hero links.


## v3.24 Console Entitlements

From v3.18 onward Dev Console is an Epic Shop purchase gated by Shooting Star eligibility. v3.18.1 retains public RESET and SHOP access; v3.18.2 hides the Console hotbar control until purchase. From v3.20 DEV commands can execute without purchase, but ordinary player-facing gates must remain intact. See [v3.24 integration](V3_15_TO_V3_24_SYSTEMS_INTEGRATION.md). Confirm exact input/dispatch UI against runtime before using this older command table for current implementation.
