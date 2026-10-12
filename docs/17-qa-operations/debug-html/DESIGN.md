# Debug HTML - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Debug HTML > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Provides a local-only index-debug.html variant that records top-level errors and unhandled promise rejections directly into the rendered page.

> This page is the canonical design documentation for **Debug HTML** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

`index-debug.html` exists for a specific failure mode:

> The page looks dead and the person testing it may not have browser DevTools open.

The debug page captures top-level runtime failures and prints them into the document after startup.

This gives local QA a visible answer even when the normal UI did not initialize far enough to expose diagnostic commands.

## Minimal Delta

The debug page should remain as close as possible to:

```text
index.html
```

The smaller the delta, the more trustworthy the reproduction.

In v2.80 the functional difference is one inline error-capture script inserted before the normal runtime scripts.

That is ideal.

The debug file is not a second product variant.

It is the normal page plus one diagnostic probe.

## Captured Failures

The debug probe records:

- global JavaScript errors,
- unhandled promise rejections.

After 4.5 seconds it appends a `<pre>` element.

If nothing was captured:

```text
NO_TOPLEVEL_ERRORS
```

is displayed.

Otherwise the element contains the captured failures.

## Why Page-Level Output

Browser console remains the preferred deep diagnostic tool.

The page output is useful when:

- startup crashes before Dev Console,
- QA is being performed quickly,
- screenshots need to capture the failure,
- the tester wants a binary smoke result.

## Not Public

The debug page should never be the deployed portfolio entry point.

Do not upload it as part of the public runtime package.

There is no reason visitors should receive a second page whose only purpose is exposing errors.

## Synchronization Rule

Whenever `index.html` changes structurally, the debug copy should be regenerated or diffed.

A stale debug page is worse than no debug page because it may reproduce an old bug rather than the current site.

The expected diff should remain diagnostic-only.

## Design Rules

- Debug HTML mirrors normal HTML.
- Keep delta minimal.
- Capture global errors and unhandled rejections.
- Print visible result after startup window.
- Do not use it as production entry point.
- Exclude it from public package.
- Diff it against `index.html` before release.
- Browser DevTools remains the authoritative deeper diagnostic surface.

## Success Criteria

A tester can open the debug page and quickly determine whether a top-level runtime failure occurred without needing the rest of the portfolio UI to initialize.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
