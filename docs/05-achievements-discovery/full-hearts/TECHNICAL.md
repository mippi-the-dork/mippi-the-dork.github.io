# Full Hearts - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Full Hearts > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards collecting all five Hearts.

> This page is the canonical technical documentation for **Full Hearts** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Persistent Heart State

Heart count uses:

```text
mippi-heart-pickups-v1
```

Reward claimed state uses:

```text
mippi-heart-reward-v1
```

## Condition

Full Hearts should evaluate from Heart completion state, not only whether the reward popup is currently open.

## DEV QA

Use:

```text
dev hearts 5
```

Then evaluate postgame state.

Confirm claiming the Heart reward does not clear the achievement condition.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
