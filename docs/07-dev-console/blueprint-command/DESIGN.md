# Blueprint Command - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Blueprint Command > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Opens BP_WishManager and becomes visually urgent when the Wish path is broken.

> This page is the canonical design documentation for **Blueprint Command** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

`blueprint` is the bridge between the Console and the Wish repair puzzle.

The command uses Unreal Engine language familiar to the intended audience.

When the Wish path fails, Blueprint changes from optional curiosity into the next progression step.

## Normal State

Running:

```text
blueprint
```

opens BP_WishManager.

The Console hints that a familiar runtime problem may exist.

## Broken State

After an unvalidated Wish attempts to read the missing reference:

- Console reports Accessed None,
- Blueprint becomes an urgent Help command,
- visible Console dock says FIX WISH,
- Console can offer a direct `[FIX NOW] Open Blueprint` action.

## Repair Goal

The player adds an Is Valid node to repair the path.

The Blueprint experience is intentionally simplified and game-like.

It references Unreal workflow without pretending to be a full Blueprint editor.

## Design Rules

- Blueprint command remains available before failure.
- Broken state must be obvious after failure.
- Wish charge is preserved through the failure.
- Repair state should immediately clear error styling.
- The command must not expose arbitrary editor-like scripting.

## Success Criteria

An Unreal-aware visitor recognizes the joke immediately, while a non-programmer can still follow the visual repair path.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
