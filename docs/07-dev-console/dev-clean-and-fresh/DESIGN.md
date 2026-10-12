# DEV Clean and Fresh - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > DEV Clean and Fresh > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides quick cleanup and clean-reset testing paths without requiring manual browser state management.

> This page is the canonical design documentation for **DEV Clean and Fresh** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

QA needs two different kinds of cleanup.

### DEV Clean

Remove temporary presentation clutter while preserving progression.

### DEV Fresh

Erase all Mippi state and reload immediately.

These solve different testing problems and should never be confused.

## DEV Clean

Use when:

- an authored Wish overlay is open,
- AI corruption is active,
- Shop or Blueprint is open,
- a popup is obscuring another test,
- Super Boss is active,
- a Finale or temporary effect needs to be dismissed.

The important promise is:

> persistent progression stays intact.

## DEV Fresh

Use when:

- first-visit behavior needs testing,
- persistence needs to be rebuilt from zero,
- a test state became unreliable,
- onboarding must be revalidated.

DEV Fresh intentionally skips the public Reset confirmation.

It is a QA shortcut.

## Design Rules

- Clean preserves progression.
- Fresh erases progression.
- Fresh reloads.
- Clean should be safe between regression cases.
- Neither command appears in player Help.
- Public Reset still needs separate testing.

## Success Criteria

A tester can rapidly recover the page between test cases without manually deleting storage or refreshing multiple times.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
