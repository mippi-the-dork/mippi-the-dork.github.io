# Under Construction - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Under Construction > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards intentionally selecting the work-in-progress filter in the Unreal Tools section.

> This page is the canonical technical documentation for **Under Construction** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Filter Hook

The WIP filter button has:

```html
data-filter="wip"
```

The filter click listener updates card visibility.

A second achievement check detects:

```js
button.dataset.filter === 'wip'
```

and unlocks Under Construction.

## Independence

Achievement unlock does not alter:

- active filter,
- tool status,
- card visibility,
- persistent tool data.

## QA

- select Released,
- select Public,
- select WIP,
- verify WIP cards appear,
- verify achievement unlock,
- switch away,
- return to WIP,
- verify no duplicate progression.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
