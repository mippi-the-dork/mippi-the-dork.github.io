# Air Superiority - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Air Superiority > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards defeating the Super UFO Boss.

> This page is the canonical technical documentation for **Air Superiority** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Historical Key

Super Boss completion history uses:

```text
mippi-postgame-superboss-v1
```

## Evaluation

On Super Boss victory:

1. persist historical flag,
2. evaluate Air Superiority,
3. update Ledger,
4. evaluate Legendary capstone if postgame is active.

## DEV QA

Use:

```text
dev superboss
```

for encounter testing.

Use actual victory flow at least once in release QA.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
