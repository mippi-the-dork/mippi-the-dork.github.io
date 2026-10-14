# System Toast Stack - Technical

**Introduced:** v2.82. **Current specification:** v2.89.

## DOM and queue

`showTransientToast()` creates a card in `#system-toast-stack` appended to `document.body`. `activeSystemToasts` tracks up to **3** cards. `removeSystemToast()` cleans up; `repositionSystemToasts()` coordinates placement. On insertion beyond capacity, evict the oldest.

The stack uses flex column layout, not transform-stacked cards. The timed objective `.dynamic-objective` is an independent sibling, not a toast.

## Anchoring

The HUD publishes `--hud-height`. The timed objective is above the HUD by about 12px. When the objective is active, the toast stack is shifted upward by objective rendered height plus approximately 17px; otherwise the stack returns to the lower anchor. Later v2.83 styling uses 310px maximum desktop and 280px narrow widths.

The v2.89 profiler may observe targeted `#system-toast-stack` mutations, with counts/timestamps in exports; observation must not alter notification semantics.

## QA

Check three-toast cap, fourth-toast FIFO, expiration and manual close, objective show/hide transitions, screen resize, runtime snapshots during profiling, and no stale DOM nodes after notices end.
