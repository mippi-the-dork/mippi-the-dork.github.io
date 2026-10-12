# Real FPS Sampling - Design Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Real FPS Sampling > Design

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Uses actual requestAnimationFrame timing for browser-tab FPS when available and falls back to the existing estimate when necessary.

> This page is the canonical design documentation for **Real FPS Sampling** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio originally used a purely fake FPS value for flavor.

Once `stat fps` became a visible diagnostic command, a real browser-tab FPS measurement became more useful.

The current design keeps both.

When real sampling is fresh, show it.

When it is not, preserve the playful fallback instead of displaying nothing.

## Meaning of FPS

The displayed live number means:

> requestAnimationFrame callbacks observed by this browser tab.

It does not mean:

- engine Game Thread FPS,
- GPU benchmark FPS,
- monitor refresh rate,
- system-wide rendering performance.

This distinction matters because browser tabs are affected by:

- visibility throttling,
- refresh rate,
- browser scheduling,
- CPU load.

## Live vs Estimate

The overlay explicitly labels its source.

This is the key honesty requirement.

## Design Rules

- Prefer real sample.
- Label real sample LIVE.
- Label fallback EST.
- Do not claim browser FPS is Unreal Engine FPS.
- Resume sampling after tab activity returns.
- Keep command playful.

## Success Criteria

`stat fps` gives a believable live readout without pretending the browser exposes an Unreal-style performance profiler.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
