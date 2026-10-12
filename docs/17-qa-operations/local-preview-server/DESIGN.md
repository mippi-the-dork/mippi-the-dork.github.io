# Local Preview Server - Design Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Local Preview Server > Design

**Implementation baseline:** Mippi Portfolio v2.80

**Feature summary:** Uses a tiny localhost HTTP server so local QA behaves more like static hosting than opening the site through file://.

> This page is the canonical design documentation for **Local Preview Server** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
## Design Intent

The portfolio is a static site, but it still relies on browser behavior that is more representative under HTTP than under direct file access.

The official local workflow is therefore:

```text
PreviewLocal.bat
```

rather than double-clicking:

```text
index.html
```

The local server gives QA a closer match to GitHub Pages for:

- module imports,
- relative asset paths,
- browser caching behavior,
- clipboard/security behavior,
- network-loaded Three.js.

## One-Click Workflow

The batch file should remain simple enough that local preview requires no development environment.

The intended user flow is:

1. double-click `PreviewLocal.bat`,
2. Python starts the local server,
3. browser opens automatically,
4. closing the terminal stops the preview.

## Python Resolution

The batch file tries:

1. Windows Python launcher:
   - `py`
2. direct Python executable:
   - `python`

If neither exists, it explains that another local HTTP server such as VS Code Live Server can be used.

## Ephemeral Port

The server binds to:

```text
127.0.0.1
```

on port:

```text
0
```

This asks the operating system to choose an available port.

That avoids hardcoding 8000 or creating a collision with another local development server.

## No-Cache Headers

The local server intentionally disables browser caching.

This helps QA see current files while iterating.

The no-cache response policy is stronger than the hosted site's normal browser caching behavior.

## Automatic Browser Open

The server prints the exact preview URL and opens it after a short delay.

The page includes both:

- current package version,
- unique launch token.

This helps avoid a stale local page.

## Localhost-Only Scope

The server binds only to:

```text
127.0.0.1
```

It is not intended to expose the portfolio to the local network.

It is a QA helper, not a deployment server.

## Public Package Rule

The local preview tooling is development-only.

Do not publish:

- `PreviewLocal.bat`,
- `preview_server.py`

as part of the public runtime site package.

They are useful source/release tools but not required by GitHub Pages visitors.

## Design Rules

- Prefer localhost HTTP over file://.
- Use an available ephemeral port.
- Bind only to localhost.
- Disable local preview caching.
- Auto-open the current preview URL.
- Keep fallback instructions simple.
- Do not include local preview tooling in the public runtime package.

## Success Criteria

A non-programmer can double-click one file and get a clean local preview that behaves closely enough to the hosted site for release QA.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Technical Documentation](TECHNICAL.md)
