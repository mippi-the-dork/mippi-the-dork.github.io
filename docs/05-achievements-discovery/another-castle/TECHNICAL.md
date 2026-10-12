# Another Castle - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Another Castle > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards reaching four completed Castle checks in the Castle progression.

> This page is the canonical technical documentation for **Another Castle** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Persistent State

Castle progress uses:

```text
mippi-castle-run-progress-v1
```

Historical postgame completion uses:

```text
mippi-postgame-castle-complete-v1
```

## Evaluation

When Castle progress reaches the canonical completion state:

1. set historical flag,
2. evaluate Another Castle.

## DEV QA

Use Castle DEV progression commands to reach the completion state.

Reveal postgame afterward and verify historical recognition.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
