# Finale Trigger - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Finale Trigger > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Turns the header Mippi logo into the ending trigger once eligibility is complete and the screen is calm.

> This page is the canonical technical documentation for **Finale Trigger** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Readiness Runtime

```js
let finaleReady=false;
let finaleRunning=false;
```

## Attention Check

```js
function finaleAttentionClear(){
  if(
    superBossActive ||
    ufoBossActive ||
    document.querySelector(
      '.dev-console.open,'+
      '.shop-popup.open,'+
      '.blueprint-popup.open,'+
      '.compile-popup.open,'+
      '.wish-special-popup.open,'+
      '.wish-sequence-overlay,'+
      '.hal-overlay.show,'+
      '.azure-gallery[aria-hidden="false"],'+
      '.flappy-game,'+
      '.session-debrief.show'
    )
  )
    return false;

  return (
    !achievement?.classList.contains(
      'show'
    ) &&
    !ledger?.classList.contains(
      'open'
    )
  );
}
```

## Arming

`updateFinaleReady()` returns when any are true:

```text
not eligible
already ready
attention not clear
```

Otherwise:

```js
finaleReady=true;
document.body.classList.add(
  'finale-ready'
);
```

## Brand Accessibility

The function updates `.brand`:

```text
aria-label:
Mippi The Dork home. Something has changed.

title:
Something has changed.
```

## First-Time Toast

When:

```js
!finaleSeen
```

it shows the `SYSTEM STATUS` transient toast.

## Telemetry

Readiness records:

```text
finale_ready
```

with the full current eligibility object as event detail.

## Poll Cadence

Startup:

```js
window.setTimeout(
  updateFinaleReady,
  2500
);
```

Recurring:

```js
window.setInterval(
  updateFinaleReady,
  6500
);
```

The ready cue can therefore appear up to roughly one poll interval after the final requirement becomes true.

## Logo Click

The brand mark handler:

```js
document.querySelector(
  '.brand-mark'
)?.addEventListener(
  'click',
  event => {
    event.preventDefault();

    if(finaleReady){
      startFinale();
      return;
    }

    showAchievement(
      'curious'
    );
  }
);
```

## Base Pulse

General Finale-ready styling uses:

```text
finale-logo-pulse
```

with:

- 1.45 second loop,
- scale to about 1.08,
- brightness increase,
- cyan glow.

## Legendary Override

Legendary receives a dedicated stronger override:

```text
finale-logo-pulse-legendary
```

with:

- gold glow,
- teal secondary glow,
- 1.35 second loop,
- scale about 1.09.

## Current Epic Nuance

Epic uses the general Finale-ready animation rather than a separate named Epic keyframe in v2.78.

The surrounding Epic brand styling still affects the visual context.

## QA

- Become eligible while Shop is open.
- Wait through a poll.
- Verify Finale does not arm.
- Close Shop.
- Wait through next poll.
- Verify header pulse.
- Click logo.
- Verify Finale starts.
- Test Rare, Epic, Legendary visual modes.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)


## v2.89 Technical Supersession

v2.84 `finaleAttentionClear()` checks `.flappy-game.open`, not mere `.flappy-game` element presence, so a previously used but closed Mippi Bird panel doesn't indefinitely suppress Finale readiness.

See [Release History](../../RELEASE_HISTORY.md).
