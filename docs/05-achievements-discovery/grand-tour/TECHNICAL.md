# Grand Tour - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Grand Tour > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards visiting all six major professional sections of the portfolio.

> This page is the canonical technical documentation for **Grand Tour** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Canonical Set

```js
POSTGAME_MAJOR_SECTIONS = [
  'games',
  'career',
  'consulting',
  'crafting',
  'tools',
  'about'
];
```

## Persistence

Visited postgame sections use:

```text
mippi-postgame-sections-v1
```

## Evaluation

When a qualifying section visit is recorded, the section ID is added to persistent postgame state.

Grand Tour unlocks when all six canonical IDs are present.

## QA

- clear state,
- visit five sections,
- verify locked,
- visit sixth,
- verify Grand Tour,
- reload,
- verify persistence.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
