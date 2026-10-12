# DEV Snapshot - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > DEV Snapshot > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Prints the current progression and runtime state so testers can verify what the site believes is active.

> This page is the canonical technical documentation for **DEV Snapshot** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Command

```text
dev snapshot
```

routes to:

```js
devSnapshot()
```

## Output 1

Current first line reports:

```text
theme
signals
legendary
```

## Output 2

Second line reports:

```text
wallet
affordable Shop count
Shop owned count
Hearts
Coolness
```

## Output 3

Third line reports:

```text
Wish charge
Blueprint VALID/INVALID
Finale READY/ELIGIBLE/LOCKED
```

## Output 4

Fourth line reports:

```text
Director
Invasion
Castle
Objective
```

## Authority

The function reads runtime variables and helper output directly.

It does not read visible text except where the Invasion display value is already available.

## No Telemetry

Because the command is routed through DEV, normal command telemetry is not recorded.

## QA Uses

Use Snapshot:

- before a reproduction,
- after forcing a DEV state,
- after reload,
- after an unexpected unlock,
- before filing a bug.

A bug report should ideally include both visual state and Snapshot output.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
