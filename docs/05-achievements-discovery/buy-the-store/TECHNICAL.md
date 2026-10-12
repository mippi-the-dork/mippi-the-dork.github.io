# Buy the Store - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Buy the Store > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards purchasing every item in the Shop, including the Design Mode capstone.

> This page is the canonical technical documentation for **Buy the Store** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Authority

The Shop's persistent state is stored under:

```text
mippi-shop-state-v1
```

Design Mode entitlement also has persistent state.

The evaluator should compare canonical inventory against owned item IDs.

## DEV QA

Use:

```text
dev shop complete
```

or purchase naturally.

Verify Buy the Store only unlocks when every canonical inventory item is owned.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
