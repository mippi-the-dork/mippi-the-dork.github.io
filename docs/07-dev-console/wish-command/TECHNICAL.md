# Wish Command - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Wish Command > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Consumes or requests a celestial charge and enters the console's special Wish input state.

> This page is the canonical technical documentation for **Wish Command** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Charge Check

Command handler:

```js
wish(){
  if(!hasWishCharge()){
    consolePrint(
      'WISH // no celestial charge. Something just noticed the request.',
      'warn'
    );
    scheduleWishShootingStar();
    return;
  }

  consolePending = 'wish';

  consolePrint(
    'What is your wish? // CELESTIAL CHARGE 1/1',
    'good'
  );
}
```

## No-Charge Scheduling

`scheduleWishShootingStar()` waits approximately 1500 ms, then spawns a Shooting Star if:

- no charge already exists,
- no current shooting star exists.

## Pending Input

When:

```js
consolePending === 'wish'
```

the next submitted raw line becomes `wishText`.

It bypasses normal command parsing.

## Progress Bar

The Console creates:

```text
.console-progress
```

with an inner bar.

Progress increments on a timer until 100 percent.

## Validation

If:

```js
wishHasIsValid
```

is true:

```js
grantValidatedWish(wishText)
```

runs.

Otherwise:

- failed-Wish telemetry is recorded,
- Blueprint error activates,
- repair output is printed,
- charge remains available.

## Charge Persistence

Wish charge persists in local storage.

Blueprint validation uses session storage.

This means a failed Wish can preserve the celestial charge while repair state remains part of the current session model.

## Help Styling

Wish Help buttons use:

```text
.console-wish-command
.console-wish-ready
```

## QA

- run Wish uncharged,
- verify Shooting Star scheduling,
- catch star,
- run Wish,
- submit normal command-looking text,
- verify it is treated as Wish text,
- fail validation,
- confirm charge preserved,
- repair,
- retry,
- confirm success.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
