# Unmarked - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Unmarked > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards finding the hidden interaction inside the Unmark feature presentation.

> This page is the canonical technical documentation for **Unmarked** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Hook

The Unmark visual uses:

```text
.unmark-secret
```

It is a semantic button.

`script.js` attaches a click listener that unlocks Unmarked.

## Accessibility

Because the interaction is a real button, keyboard activation should trigger the same handler.

## QA

- click the logo,
- activate with Enter/Space,
- verify achievement,
- verify no private repo link appears,
- verify persistence.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
