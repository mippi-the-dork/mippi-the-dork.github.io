# Money Wish - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Money Wish > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Interprets money-related wishes through the site's trickle-down gag and coin payoff.

> This page is the canonical technical documentation for **Money Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Branch Match

The validated-Wish money regex matches:

```text
$
money
buck
bucks
dollar
dollars
cash
usd
moolah
payday
```

On match:

```js
telemetryWishBranch('money');
```

Console prints the trickle-down response and a toast appears.

Then:

```js
burstMoneyFromConsole();
```

## Coin Count

The burst creates:

```text
76
```

DOM coin elements.

Each is:

```html
<i class="money-coin">
```

## Origin

If the Dev Console has a visible rectangle:

- coins originate inside its silhouette.

Otherwise the system uses a fallback region around the lower-middle viewport.

## Trajectory

Each coin gets randomized custom properties for:

- origin,
- midpoint X,
- end X,
- vertical rise,
- vertical fall,
- duration,
- delay,
- mid spin,
- end spin,
- size.

The design intentionally throws coins beyond a Console edge so the effect reads behind the higher-z Console.

## Lifetime

Each coin removes itself after:

```text
3900 ms
```

## Visual Value

CSS renders a `$` symbol on the coin.

This is separate from Rupee pickup markup.

## No Economy Mutation

The branch does not call:

- `addRupees`,
- Shop wallet persistence,
- pickup collection.

It is presentation only.

## QA

- Wish `$`,
- Wish `money`,
- Wish `bucks`,
- Wish `USD`,
- verify same branch,
- verify 76-ish simultaneous coin objects are temporary,
- inspect wallet before and after,
- confirm Rupees do not change.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
