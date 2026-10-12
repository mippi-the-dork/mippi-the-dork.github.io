# Validated Wish - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Validated Wish > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Successfully routes a charged Wish through the repaired Blueprint and records the Wish as a major progression milestone.

> This page is the canonical technical documentation for **Validated Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Entry Function

Successful validation calls:

```js
grantValidatedWish(wishText)
```

## Charge First

The function begins:

```js
if(!consumeWishCharge()){
  consolePrint(
    'WISH FAILED // no celestial charge. Catch another Shooting Star.',
    'warn'
  );
  updateMetaTrace();
  return;
}
```

This ensures a validated Wish cannot resolve without spending its resource.

## Success State

The function then:

```js
telemetryCount('wish','successful');
finaleWishSatisfied=true;
localStorage.setItem(FINALE_WISH_KEY,'1');
```

The Finale Wish persistence key is:

```text
mippi-finale-wish-v1
```

## Console Confirmation

It prints:

```text
IsValid: TRUE
Wish accepted: <wish text>
```

## Shared Success Presentation

`playWishSuccess()`:

- adds body class `wish-granted`,
- calls `explodeAt()` at viewport center with count 48,
- removes `wish-granted` after 4200 ms.

## Legendary Progression

Before branch matching:

```js
unlockLegendaryMode();
evaluatePostgameAchievements();
```

This means branch spectacle does not decide whether Legendary progression is earned.

## Matching Input

The Wish text is normalized to:

```js
const text=wishText.toLowerCase();
```

Branch regexes then run in fixed order.

## Branch Precedence

### 1. Mippi

```js
/mippi|mippithedork/
```

### 2. Blender

```js
/blender/
```

### 3. Money

Matches:

```text
$
money
buck / bucks
dollar / dollars
cash
usd
moolah
payday
```

### 4. HAL exact branch

```js
/^\s*wish(?:es)?\s*$/
```

### 5. Engine

First match:

```text
unreal
unity
godot
```

### 6. AI

```text
ai
llm
agi
```

### 7. Game

```text
game
games
```

### 8. Doug

```text
doug
```

### 9. Generic

Any remaining validated text.

## Branch Telemetry

Every branch calls:

```js
telemetryWishBranch('<branch>')
```

with branch IDs such as:

```text
mippi
blender
money
hal
engine
ai
game
doug
generic
```

## QA

Test one Wish for every branch.

Also test multi-keyword strings to verify precedence, for example:

```text
Mippi should port my game to Unreal
```

Expected branch:

```text
Mippi
```

because it appears first in the matcher order.

Finally test an unrecognized sentence and verify Generic still counts as successful progression.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
