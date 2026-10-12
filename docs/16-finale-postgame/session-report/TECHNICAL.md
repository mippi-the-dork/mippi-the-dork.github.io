# Session Report - Technical Documentation

**Hierarchy:** Documentation Home > Finale and Postgame > Session Report > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the optional post-Finale Session Debrief using local telemetry, current Player Model, curated observations, assistance disclosure, and explicit sharing controls.

> This page is the canonical technical documentation for **Session Report** within the Finale and Postgame category.

## Documentation Relationship

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
## Opening

Finale button:

```text
VIEW SESSION REPORT
```

listener:

```js
finaleStats?.addEventListener(
  'click',
  () => {
    telemetryMeaningful(
      'finale_report'
    );

    endFinale();

    window.setTimeout(
      openSessionDebrief,
      120
    );
  }
);
```

The 120 ms gap separates Finale close from report open.

## Report Open

```js
openSessionDebrief()
```

calls:

```js
renderSessionDebrief();
```

then records:

```text
debrief.opens
session_debrief_opened
```

The report receives:

```text
show
aria-hidden=false
```

and body receives:

```text
debrief-active
```

## Input Lock

CSS:

```css
body.debrief-active
>*:not(.session-debrief){
  pointer-events:none!important;
}
```

The report therefore owns pointer interaction while open.

## Metrics

`renderSessionDebrief()` uses:

```js
sessionStatsSnapshot();
```

so Stats and Debrief share the same underlying current-session summary.

Current grid rows:

```text
TIME EXPLORING
SECTIONS
SIGNALS
UFOs
BOSS WINS
DOUG BONES
HEARTS
RUPEES
MIPPI BIRD
COMMANDS
WISHES
OBJECTIVES
THEMES
```

## Notable Behavior

`sessionDebriefObservationsFor(x)` builds an array from current session thresholds and returns:

```js
notes.slice(
  0,
  4
);
```

Therefore at most four authored observations render.

## Assistance

The report builds an explicit list from:

```text
x.assistance.easy
x.assistance.hints
x.assistance.cheats
x.assistance.godmode
```

No use becomes:

```text
ASSISTANCE // NONE
```

## Share Text

```js
I finished Mippi's portfolio as <MODEL>.
<SIGNALS>/<TOTAL> Signals,
<UFOs> UFOs,
<BOSSES> boss/bosses,
Mippi Bird high <SCORE>.
```

## External Shares

X:

```text
twitter.com/intent/tweet
```

LinkedIn:

```text
linkedin.com/sharing/share-offsite/
```

Facebook:

```text
facebook.com/sharer/sharer.php
```

Each opens in a new context with:

```text
noopener
```

## Copy

Clipboard copy writes:

```text
share text + current page URL
```

and displays a transient copied-result toast.

## No Native Share

v2.78 has no `navigator.share()` path for the report.

## Close

`closeSessionDebrief()` removes:

```text
show
debrief-active
```

and restores `aria-hidden=true`.

## Browser QA Hook

```js
window.__MIPPI_DEBRIEF__
```

exposes:

```text
open()
snapshot()
```

for real browser DevTools QA.

## QA

- Compare report metrics against `stats`.
- Compare Player Model label against Player Model QA snapshot.
- Trigger enough behavior for more than four observation rules and verify only four show.
- Test assistance NONE and mixed assistance.
- Test every share action.
- Close with X and Continue.
## Related Documentation

- [Finale and Postgame Index](../README.md)
- [Design Documentation](DESIGN.md)
