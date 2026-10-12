# Maximum Cool - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Maximum Cool > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards having maxed the Coolness meter and activated Cool Mode at least once.

> This page is the canonical technical documentation for **Maximum Cool** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Historical Key

Max Coolness history uses:

```text
mippi-postgame-cool-maxed-v1
```

## Evaluation

When the Coolness system reaches its maximum:

1. record persistent historical flag,
2. run postgame achievement evaluation.

If postgame is already revealed, Maximum Cool can unlock immediately.

If not, the flag is consumed later when the tier appears.

## DEV QA

Use:

```text
dev cool max
```

Then reveal postgame and verify recognition.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
