# Doug Executive Review Wish - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Doug Executive Review Wish > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Lets Doug perform an executive design review with bark-driven directives before approving the site for production.

> This page is the canonical technical documentation for **Doug Executive Review Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Branch Match

Validated Wish checks:

```js
/doug/
```

Then:

```js
telemetryWishBranch('doug');
dougWishSpectacle();
```

## Overlay

Dynamic root classes:

```text
.doug-review-overlay
.wish-sequence-overlay
```

## Review Rows

Rows are created for:

```text
art
design
engineering
production
morale
bones
```

## Prior State Capture

Before applying temporary changes:

```js
const priorParticles =
  document.body.classList.contains(
    'particle-boost'
  );

const priorCommand =
  !!dougCard?.classList.contains(
    'doug-command'
  );
```

## Bark Timeline

Approximate timings:

| Time | Directive |
| ---: | --- |
| 700 ms | MORE JUICE |
| 2050 ms | TOO MANY WORDS |
| 3350 ms | ENGINEERING LOOKS SUSPICIOUS |
| 4550 ms | BIGGER |
| 5750 ms | MORE BONES |
| 7350 ms | SHIP IT |

## Effects

### More Juice

If Particle Boost was previously off:

```js
setParticleBoost(true);
```

### Bigger

Adds body class:

```text
doug-review-bigger
```

### More Bones

If Doug was not already in command:

```text
doug-command
```

is temporarily added.

Four forced Doug Bones are scheduled at 260 ms spacing.

### Ship It

Review row states are changed to final values and a `.doug-approval-stamp` is created.

## Coolness Payoff

At 8050 ms:

```js
dougCoolProgress=100;
activateDougCoolMode({source:'wish'});
```

Console prints final approval.

## Close Readiness

At 8500 ms the close button becomes active:

```text
END EXECUTIVE REVIEW
```

## Cleanup

The cleanup function:

- clears sequence timers,
- removes overlay,
- removes approval stamp,
- removes `doug-review-bigger`,
- disables Particle Boost only if it was originally off,
- removes Doug command state only if it was originally absent.

It does not undo max Coolness.

## QA

Run review in four prior-state combinations:

1. particles off, Doug command off,
2. particles on, Doug command off,
3. particles off, Doug command on,
4. both on.

After closing, confirm prior temporary mode state is restored correctly and Coolness remains maxed.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
