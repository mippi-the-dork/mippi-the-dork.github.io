# Console Navigation Commands - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > Console Navigation Commands > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides command shortcuts for major portfolio sections, projects, resumes, and external destinations.

> This page is the canonical technical documentation for **Console Navigation Commands** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## Internal Commands

Current command handlers include:

```text
about
home
top
games
career
consulting
crafting
tools
projects
resumes
heavywater
azure
unmark
nda
hero
```

## Section Jumps

Major sections generally use:

```js
jumpTo(id)
```

or:

```js
element.scrollIntoView({
  behavior:'smooth'
});
```

Home/top use:

```js
window.scrollTo({
  top:0,
  behavior:'smooth'
});
```

## Project Shortcuts

Heavy Water:

```js
document.querySelector('.heavy-water')
```

Azure:

```js
document.querySelector('.azure-altar')
```

Unmark:

```js
document.querySelector('.unmark-feature')
```

## External Commands

GitHub and FAB use `window.open()` with `noopener`.

Unreal Source and Epic learning also open new destinations.

Steam delegates to an existing Steam anchor when available.

## NDA

The `nda` handler:

1. jumps to Career,
2. prints an access-denied warning.

No hidden project data is referenced.

## QA

- run every NAV command from top and bottom,
- run every PROJECT command,
- verify smooth target,
- run each LINKS command,
- confirm new tab/window behavior,
- run `nda`,
- inspect output for confidentiality.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
