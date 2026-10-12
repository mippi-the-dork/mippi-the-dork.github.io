# Game Success Wish - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Game Success Wish > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Grants a wildly successful game while redirecting the financial benefit to Mippi as a monkey-paw interpretation of the Wish.

> This page is the canonical technical documentation for **Game Success Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Branch Match

Validated Wish checks:

```js
/games?/
```

Then:

```js
telemetryWishBranch('game');
gameWishSpectacle();
```

## Overlay

Dynamic root:

```text
.game-success-overlay
.wish-sequence-overlay
```

The overlay contains an `aria-live="polite"` presentation.

## Starting Display

Initial values include:

```text
Copies Sold      12
Current Players  42
Peak CCU         71
Reviews          91% POSITIVE
Wishlists        3,201
Global Trend     #87
Gross Revenue    $0
Your Royalty     $0.00
Mippi Payout     $0
```

## Target Values

The simulation targets:

```js
{
  copies: 2847291,
  ccu: 183422,
  peak: 612883,
  wishlists: 1923881,
  gross: 74883219,
  mippi: 52418253
}
```

## Progress Timing

The main growth curve runs for:

```text
9200 ms
```

using an eased interpolation.

Display refresh occurs every:

```text
70 ms
```

## Review and Rank

Review score rises toward:

```text
96% OVERWHELMINGLY POSITIVE
```

Global rank moves from:

```text
#87
```

toward:

```text
#1 GLOBAL
```

## News Rotation

Fake headlines rotate every:

```text
1450 ms
```

## Monkey-Paw Turn

At roughly 9600 ms:

- overlay adds `.monkey-paw`,
- fine print changes,
- Mippi retirement line appears,
- Console prints:
  - 2,847,291 copies sold,
  - developer payout $0.00.

## Exposure Badge

At roughly 10400 ms the overlay adds:

```text
COMPENSATION
EXPOSURE
Priceless*
```

## Close

At 11000 ms:

- sequence timers are cleared,
- close becomes active,
- label becomes:

```text
ACCEPT SUCCESS
```

Closing applies a leaving class and removes the overlay after 420 ms.

## Economy Separation

The dollar values are presentation only.

They do not modify:

- Rupee wallet,
- Shop state,
- any real monetary value.

## QA

- trigger Game Wish,
- observe numbers grow,
- verify review/rank progression,
- verify payout remains zero,
- verify Mippi payout increases,
- wait for final monkey-paw result,
- verify overlay remains,
- click Accept Success,
- confirm clean removal.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
