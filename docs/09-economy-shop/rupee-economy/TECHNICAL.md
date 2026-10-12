# Rupee Economy - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Rupee Economy > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Defines how Rupees are earned, stored, spent, surfaced in the HUD, and connected to arcade and exploration systems.

> This page is the canonical technical documentation for **Rupee Economy** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Wallet State

The current wallet is:

```js
let rupeeWallet=0;
```

Startup loads:

```text
mippi-rupee-wallet-v1
```

with:

```js
rupeeWallet =
  Math.max(
    0,
    Number(localStorage.getItem(RUPEE_WALLET_KEY)||0)
  );
```

## Discovery State

The economy also stores:

```text
mippi-rupee-discovered-v1
```

At startup, `rupeeDiscovered` becomes true if any of these are true:

- discovery key exists,
- wallet is above zero,
- at least one Shop item is already owned.

This prevents a returning player with Shop ownership from losing the wallet UI because the explicit discovery key was missing.

## Award Function

All currency awards should route through:

```js
awardRupees(amount,{
  source='pickup',
  announce='pickup'
})
```

The function:

1. normalizes amount to a nonnegative integer,
2. records previous wallet,
3. adds value,
4. marks Rupees discovered,
5. records telemetry,
6. persists wallet and discovery state,
7. refreshes HUD and Shop telemetry,
8. optionally prints/toasts acquisition feedback.

## Telemetry

Currency telemetry includes:

```text
economy.rupeesEarned
economy.rupeeSources.<source>
```

and meaningful events such as:

```text
rupee_collected
rupee_reward
```

The event payload includes amount, source, and resulting wallet.

## First Pickup

When the first Rupee is collected, the player receives:

```text
WALLET UNLOCKED
```

with guidance that:

- the Rupee counter is clickable,
- `shop` can also open the store.

## 10-Rupee Milestone

When wallet crosses from below 10 to at least 10:

```text
WALLET MILESTONE
```

appears after a short delay.

The message specifically frames the choice between Production Discount and several smaller upgrades.

## Arcade Awards

Arcade systems can call:

```js
awardArcadeRupees(amount,x,y,source)
```

This first creates a short visual Rupee burst, then calls:

```js
awardRupees(value,{
  source,
  announce:'silent'
})
```

after about 180 ms.

## Spending

Shop purchases subtract the current effective price before ownership is added.

Wallet is immediately persisted after subtraction.

## Snapshot

`syncShopTelemetrySnapshot()` mirrors:

- owned IDs,
- equipped item,
- wallet

into local telemetry.

## Reset

The full reset clears all `mippi*` keys, including:

```text
mippi-rupee-wallet-v1
mippi-rupee-discovered-v1
mippi-shop-state-v1
```

## QA

- first Rupee reveals HUD,
- reload preserves wallet,
- arcade reward increases same wallet,
- purchase reduces wallet,
- insufficient purchase leaves wallet unchanged,
- Production Discount changes future price calculations,
- full reset returns wallet to zero and hides economy UI.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
