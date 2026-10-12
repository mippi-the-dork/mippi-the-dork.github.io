# Console Command Catalog

**Implementation baseline:** Mippi Portfolio v2.78

This is the authoritative v2.78 command catalog for the in-site Dev Console.

Normal player commands are case-insensitive after normalization.

Whitespace is collapsed.

The backtick or tilde key toggles the Console when the command input is not already focused.

## Normal Help Groups

### CORE

| Command | Purpose | Notes |
| --- | --- | --- |
| `help` | Print clickable Help command groups. | `dev` is intentionally omitted from normal Help. |
| `clear` | Clear Console output. | `cls` exists as an unlisted alias. |
| `version` | Print portfolio build identity. | Reports v2.78 static GitHub Pages build. |
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
| `particles` | Toggle Particle Boost. |

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
