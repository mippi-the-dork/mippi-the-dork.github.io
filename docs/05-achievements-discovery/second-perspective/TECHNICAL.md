# Second Perspective - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Second Perspective > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards using the Project Heavy Water Perspective Visualizer.

> This page is the canonical technical documentation for **Second Perspective** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Event Source

`perspective-demo.js` dispatches:

```text
mippi:perspective-change
```

when perspective mode changes.

## Listener

`script.js` listens for that custom event.

It uses the event to:

- record telemetry,
- track visualizer usage,
- recognize second-person interaction,
- unlock `Second Perspective`.

## Dependency

The achievement therefore depends on the visualizer script functioning.

If the visualizer fails, Heavy Water remains readable but this specific achievement cannot be earned naturally.

## DEV QA

Use natural interaction for release testing.

For broader achievement matrix tests use:

```text
dev signals <n>
```

rather than requiring repeated visualizer operation.

## QA

- load Heavy Water,
- select first person,
- select third person,
- select second person,
- verify achievement,
- reload,
- verify persistence.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)


## v3.05–v3.10 Current Specification

v3.06 checks `if(mode==='2nd') showAchievement('secondPerson')` in the visualizer mode handler after telemetry; merely switching perspective is no longer sufficient. The achievement hint and solution reference the specific 2nd Person choice.
