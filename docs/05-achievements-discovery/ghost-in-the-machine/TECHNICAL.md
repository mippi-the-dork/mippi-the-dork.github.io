# Ghost in the Machine - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Ghost in the Machine > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards catching the rare transient ambient signal before it disappears.

> This page is the canonical technical documentation for **Ghost in the Machine** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Runtime Ownership

The transient ambient Signal is part of the game-layer opportunity system rather than the Three.js Ambient canvas.

It is a clickable DOM/game object with a limited lifetime.

## Scheduling

Spawn cadence participates in shared anti-drought and Director logic.

The system should not rely on one unrepeatable random event.

## Unlock

A successful click calls the Rare achievement unlock path for Ghost in the Machine.

## Cleanup

Expired objects must remove:

- DOM element,
- timers,
- event listeners or closures through garbage collection,
- any active opportunity bookkeeping.

## QA

- force or wait for transient Signal,
- allow one to expire,
- verify no unlock,
- catch next Signal,
- verify unlock,
- confirm object cleanup,
- reload and verify persistence.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
