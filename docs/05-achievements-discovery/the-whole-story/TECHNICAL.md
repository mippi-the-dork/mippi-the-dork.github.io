# The Whole Story - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > The Whole Story > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards choosing the Long resume rather than only viewing the shorter career summaries.

> This page is the canonical technical documentation for **The Whole Story** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Hook

The Long resume anchor has:

```text
.resume-long
```

`script.js` listens for clicks on that element and unlocks the corresponding Rare achievement.

## External Navigation

The resume still uses its external `_blank` behavior.

Achievement handling runs independently from the external-document opening logic.

## QA

- click 1 Page: no achievement,
- click Short: no achievement,
- click Long: achievement,
- modifier-click Long: verify link behavior,
- reload: achievement persists.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
