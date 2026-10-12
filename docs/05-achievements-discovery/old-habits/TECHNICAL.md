# Old Habits - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Old Habits > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards entering the classic Konami sequence as an old-school discovery path.

> This page is the canonical technical documentation for **Old Habits** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Listener

A global keydown handler tracks recent key inputs against the canonical Konami sequence.

The handler must coexist with:

- Dev Console hotkeys,
- Escape behavior,
- normal input fields.

## Input Safety

Sequence tracking should ignore or safely handle contexts where keystrokes are intended for text entry.

The achievement path should not consume normal typing.

## Unlock

On full sequence match, the shared Rare achievement path unlocks Old Habits.

The sequence state resets appropriately after match or mismatch.

## QA

- enter full sequence on page,
- verify achievement,
- enter sequence while focused in normal text input where applicable,
- verify typing is not corrupted,
- repeat sequence,
- verify no duplicate progression.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
