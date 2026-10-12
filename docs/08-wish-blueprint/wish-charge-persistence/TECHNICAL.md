# Wish Charge Persistence - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Wish Charge Persistence > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Preserves the celestial charge through the intended Blueprint failure so the player can repair the error and retry without waiting for another star.

> This page is the canonical technical documentation for **Wish Charge Persistence** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Storage Key

Wish charge uses:

```text
mippi-wish-charge-v1
```

## Startup Load

At startup:

```js
wishCharge=Math.max(
  0,
  Math.min(
    1,
    Number(localStorage.getItem(WISH_CHARGE_KEY)||0)
  )
);
```

The value is therefore clamped to:

```text
0 or 1
```

for normal stored numeric input.

## Persistence Helper

`persistWishCharge()` writes:

```js
localStorage.setItem(
  WISH_CHARGE_KEY,
  String(wishCharge)
);
```

It then refreshes:

- Wish Help styling,
- Console attention,
- Meta Trace,
- Achievement Ledger,
- progression HUD position.

This ensures charge state is reflected across all relevant UI.

## Grant

`grantWishCharge()` sets:

```js
wishCharge=1;
```

then calls:

```js
persistWishCharge();
```

It separately handles:

- first Wish command unlock,
- already-charged forced catch,
- normal recharge.

## Consumption

`consumeWishCharge()`:

```js
if(wishCharge<=0)
  return false;

wishCharge=0;
persistWishCharge();

telemetryCount('wish','chargesSpent');
telemetryMeaningful('wish_charge_spent');

return true;
```

## Critical Validation Ordering

The Console pending-Wish path does not call `consumeWishCharge()` before validation.

Invalid path:

```text
wishHasIsValid == false
```

results in:

- failed telemetry,
- Blueprint error state,
- repair output,
- preserved charge.

Valid path calls:

```js
grantValidatedWish(wishText)
```

and that function begins with:

```js
if(!consumeWishCharge()){
  ...
  return;
}
```

This function boundary is the main technical guarantee that intended validation failure does not consume the charge.

## Wish Command Unlock

The first collected star also persists:

```text
mippiWishUnlocked
```

This key records that the Console concept has been discovered.

It is separate from current charge.

## Reset

Full reset clears all keys beginning with `mippi`, including:

```text
mippi-wish-charge-v1
mippiWishUnlocked
```

## QA

### Failure Preservation

1. Force `dev wish broken`.
2. Confirm charge 1/1.
3. Run `wish`.
4. Submit any text.
5. Wait for runtime error.
6. Run `dev snapshot`.
7. Confirm charge remains 1/1.

### Success Consumption

1. Repair Is Valid.
2. Run `wish`.
3. Submit text.
4. Confirm successful validation.
5. Run `dev snapshot`.
6. Confirm charge is 0/1.

### Reload

1. Charge star.
2. Reload before wishing.
3. Confirm charge remains.
4. Verify Console attention reconstructs from stored charge.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
