# Temporary DEV Commands - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Temporary DEV Commands > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides hidden state-forcing commands for rapid QA without advertising them in the normal Help command.

> This page is the canonical technical documentation for **Temporary DEV Commands** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Command Routing

The main command registry contains:

```js
dev(args=''){
  devCommand(args);
}
```

`executeConsoleCommand()` detects:

```js
normalized === 'dev' ||
normalized.startsWith('dev ')
```

and routes the full remaining argument string into `devCommand()`.

## Telemetry Exclusion

The normal player-command telemetry path contains:

```js
if(command !== 'dev')
  telemetryRecordCommand(...);
```

Therefore DEV commands do not count as player Console use.

## DEV Help

`devPrintHelp()` prints clickable command groups.

Current groups include:

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

### MODES

```text
dev mode inspect on/off
dev mode design on/off
dev mode interact on/off
dev doug command
dev doug cool
dev doug review
```

### ATTN

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

### OBJECTIVE

```text
dev objective random
dev objective complete
dev objective fail
dev objective <objective-id>
```

## State Forcing

DEV helpers update real state and then call the same UI refresh functions used by natural progression.

Examples include:

```js
updateAchievementProgress()
applyThemeMode()
updateRupeeMeter()
persistShopState()
updateHeartMeter()
evaluatePostgameAchievements()
updateConsoleAttention()
renderLedger()
```

## QA

- verify `help` hides DEV,
- verify `dev help`,
- click every DEV Help button at least once in development,
- test invalid arguments,
- verify `dev snapshot`,
- verify `dev clean`,
- verify DEV use does not increment normal command telemetry.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
