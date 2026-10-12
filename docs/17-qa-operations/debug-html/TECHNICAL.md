# Debug HTML - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Debug HTML > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides a local-only index-debug.html variant that records top-level errors and unhandled promise rejections directly into the rendered page.

> This page is the canonical technical documentation for **Debug HTML** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
## Current Diff

In v2.78, `diff -u index.html index-debug.html` shows one functional addition:

```html
<script>
window.__errs=[];

window.addEventListener(
  'error',
  e => {
    window.__errs.push(
      'ERR:'+
      e.message+
      ' @ '+
      e.filename+
      ':'+
      e.lineno+
      ':'+
      e.colno
    );
  }
);

window.addEventListener(
  'unhandledrejection',
  e => {
    window.__errs.push(
      'REJ:'+
      String(e.reason)
    );
  }
);

setTimeout(
  () => {
    const p=
      document.createElement(
        'pre'
      );

    p.id='debug-errors';

    p.textContent=
      window.__errs.join(
        '\n'
      ) ||
      'NO_TOPLEVEL_ERRORS';

    document.body.appendChild(p);
  },
  4500
);
</script>
```

This appears immediately before:

```text
script.js?v=2.78
perspective-demo.js?v=2.78
```

## Error Format

Global errors:

```text
ERR:<message> @ <filename>:<line>:<column>
```

Unhandled rejection:

```text
REJ:<reason>
```

## Output ID

The rendered diagnostics element is:

```text
#debug-errors
```

## Delay

Output is appended after:

```text
4500 ms
```

This gives early startup and promise failures time to occur.

## Shared Cache/Three Setup

The debug page includes the same:

- stylesheet version,
- Three.js preconnect,
- modulepreload,
- runtime scripts,
- perspective script

as the normal page.

## Release Validation

Before using it for a final regression check:

1. compare `index.html` and `index-debug.html`,
2. verify the only meaningful difference is the diagnostic script,
3. run local preview,
4. navigate directly to `/index-debug.html`,
5. wait for the output,
6. expect:
   - `NO_TOPLEVEL_ERRORS`.

## Public Exclusion

Do not include:

```text
index-debug.html
```

in the deployed runtime package.

It can remain in development/source archives.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
