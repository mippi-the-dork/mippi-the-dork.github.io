# Gold Standard - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Gold Standard > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Rewards having unlocked Legendary rarity.

> This page is the canonical technical documentation for **Gold Standard** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Authority

Condition uses:

```js
legendaryUnlocked
```

or the equivalent Legendary gameplay helper.

It must not check:

```text
body.theme-legendary
```

because that is only the current visual preference.

## Persistence

Legendary unlock itself is persistent.

Gold Standard persists separately as part of the postgame achievement store.

## QA

- `dev legendary`,
- switch visual theme to Rare,
- reveal/evaluate postgame,
- verify Gold Standard remains earned.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
