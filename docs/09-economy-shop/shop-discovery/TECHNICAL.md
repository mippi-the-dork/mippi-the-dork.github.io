# Shop Discovery - Technical Documentation

**Hierarchy:** Documentation Home > Rupee Economy and Shop > Shop Discovery > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Controls when the Shop becomes meaningful and how the player is taught that Rupees can be spent.

> This page is the canonical technical documentation for **Shop Discovery** within the Rupee Economy and Shop category.

## Documentation Relationship

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
## Discovery Key

```text
mippi-rupee-discovered-v1
```

## Startup Reconstruction

After Shop state loads:

```js
rupeeDiscovered =
  localStorage.getItem(RUPEE_DISCOVERED_KEY)==='1' ||
  rupeeWallet>0 ||
  shopOwned.size>0;
```

If true, the discovery key is rewritten for consistency.

## First Award

`awardRupees()` checks:

```js
const first=!rupeeDiscovered;
```

Then:

```js
rupeeDiscovered=true;
```

and persists the key.

If `first` is true, the system shows:

```text
WALLET UNLOCKED
```

with instructions to:

- click the Rupees counter,
- or type `shop`.

## Console Access

The player-facing command registry always includes:

```text
shop
```

in the FUN group.

Its handler simply calls:

```js
openShop();
```

There is no discovery gate.

## HUD Visibility

The Rupee HUD checks `rupeeDiscovered`.

Therefore direct Shop browsing with zero Rupees does not necessarily expose the persistent wallet HUD until economy discovery state is established.

## DEV

QA wallet forcing can update discovery state through DEV economy helpers.

## QA

- fresh state: no Rupee HUD,
- type `shop`: Shop opens at zero,
- close Shop: persistent HUD remains in intended discovery state,
- collect first Rupee: onboarding appears,
- reload: onboarding does not repeat,
- load a save with owned Shop item and zero wallet: Rupee HUD reconstructs as discovered.
## Related Documentation

- [Rupee Economy and Shop Index](../README.md)
- [Design Documentation](DESIGN.md)
