# Blender Wish - Design Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Blender Wish > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Interprets Blender-related wishes as a joke about uninstalling Blender from the current universe.

> This page is the canonical design documentation for **Blender Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The Blender Wish takes a simple keyword and interprets it with maximal hostility toward the software.

The result is not:

`Blender is gone from your computer.`

It is:

`Uninstalling Blender from Earth-1218.`

The joke works because the sequence treats a personal preference as universe maintenance.

## Sequence

The popup progresses through:

- locating installations,
- finding Blender installations,
- removing Blender from local reality,
- cleaning orphaned `.blend` files,
- Uninstall Complete.

The player cannot close the popup with its OK action until the uninstall completes.

## Player Control

Once complete:

- OK becomes enabled,
- Escape can also close.

Before completion, Escape intentionally does not dismiss it.

The Wish subsystem is committed to the bit.

## Design Rules

- The sequence is fictional.
- Do not imply any real software is being modified.
- Progress should complete quickly.
- Close only becomes available after completion.
- The popup remains themed with the active rarity.
- The branch does not alter browser storage beyond the normal successful Wish progression.

## Success Criteria

The player sees a short complete gag rather than a one-line response, and the popup never actually touches local software.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
