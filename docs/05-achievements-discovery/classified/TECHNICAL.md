# Classified - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Classified > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards interacting with the NDA project's pixel-art identity hint without revealing protected information.

> This page is the canonical technical documentation for **Classified** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Hook

The NDA identity control uses:

```text
.nda-secret
```

and is implemented as a real button.

The click listener unlocks the `nda` achievement key corresponding to Classified.

## Security / Privacy Audit

Release QA should inspect:

- visible text,
- HTML attributes,
- image alt text,
- console output,
- data attributes,
- source comments.

No protected project identity should exist in any of those surfaces.

## QA

- activate with pointer,
- activate with keyboard,
- verify Classified,
- inspect DOM/source for accidental protected text,
- reload and verify persistence.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
