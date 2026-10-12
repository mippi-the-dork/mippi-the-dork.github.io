# Rupee HUD - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Rupee HUD > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Displays the current wallet and becomes an attention cue when the player can afford at least one available unowned Shop item.

> This page is the canonical technical documentation for **Rupee HUD** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Visibility

`updateProgressHudVisibility()` applies:

```js
rupeeMeter?.classList.toggle(
  'visible',
  rupeeDiscovered
);
```

The wider progress HUD remains visible if any progression meter is active.

## Value

`updateRupeeMeter()` writes:

```js
rupeeCount.textContent=String(rupeeWallet);
```

It also mirrors the same value into the open Shop wallet display.

## Open Shop

The meter owns:

```js
rupeeMeter?.addEventListener(
  'click',
  openShop
);
```

## Attention

Every wallet update calls:

```js
updateRupeeAttention();
```

The meter receives:

```text
shop-ready
```

when an actionable purchase exists.

## Accessible State

Affordable:

```text
Rupees: N. X shop items are affordable. Open Shop.
```

Normal:

```text
Rupees: N. Open Shop.
```

The `title` includes cheapest current affordable price.

## Layout

The Rupee meter participates in the same progression HUD that also contains:

- Hearts,
- Meta Trace,
- Coolness,
- Invasion,
- Castles.

HUD position is recalculated after updates to avoid overlap with Optional Objectives.

## Shop Interaction

Opening or closing the Shop explicitly refreshes Rupee attention so the pulse disappears and returns at the correct time.

## QA

- clean state: Rupee meter hidden,
- collect first Rupee: visible,
- click meter: Shop opens,
- afford no item: no pulse,
- reach affordable state: pulse,
- open Shop: pulse stops,
- close Shop: pulse returns if still actionable.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
