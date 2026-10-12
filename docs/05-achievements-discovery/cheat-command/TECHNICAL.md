# Cheat Command - Technical Documentation

**Hierarchy:** Documentation Home > Achievements and Discovery > Cheat Command > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Reveals the explicit solution for the next incomplete non-Legendary achievement without completing it automatically.

> This page is the canonical technical documentation for **Cheat Command** within the Achievements and Discovery category.

## Documentation Relationship

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
## Console Ownership

`cheat` is handled through the Dev Console command parser.

The implementation inspects achievement progression and selects the next incomplete eligible target.

## Eligible Targets

Before postgame reveal:

```text
Rare achievements
```

After postgame reveal:

```text
Epic achievements
```

The Legendary capstone is intentionally excluded.

## Output

The command prints an explicit solution string into the Console.

It does not call:

```js
showAchievement(...)
```

or mutate persistent achievement state.

## Ordering

The "next" achievement follows the canonical achievement ordering rather than random selection.

This makes repeated use deterministic.

## Completion Cases

Possible terminal outputs include:

- all Rare Signals complete,
- all Epic postgame goals complete,
- only Legendary capstone remains.

The capstone case should not provide a special shortcut.

## QA

- fresh state: run `cheat`,
- complete the revealed action,
- run `cheat` again,
- force `dev signals 10`,
- reveal postgame tier,
- run `cheat`,
- complete Epic goals one by one,
- verify Legendary is never directly cheated or completed.
## Related Documentation

- [Achievements and Discovery Index](../README.md)
- [Design Documentation](DESIGN.md)
