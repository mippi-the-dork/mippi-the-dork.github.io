# Reality Validated - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Reality Validated > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards successfully completing a validated Wish.

> This page is the canonical technical documentation for **Reality Validated** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Historical Finale/Wish State

The site already persists Wish success for progression.

Relevant state includes the normal Finale Wish requirement key:

```text
mippi-finale-wish-v1
```

The postgame evaluator can rely on the authoritative validated-Wish state rather than parsing Console history.

## QA

- charge Wish,
- fail before Blueprint repair,
- verify no Epic completion,
- repair Blueprint,
- submit valid Wish,
- verify Reality Validated.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
