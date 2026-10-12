# DEV Clean and Fresh - Technical Documentation

**Hierarchy:** Documentation Home > Dev Console and Command Surface > DEV Clean and Fresh > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides quick cleanup and clean-reset testing paths without requiring manual browser state management.

> This page is the canonical technical documentation for **DEV Clean and Fresh** within the Dev Console and Command Surface category.

## Documentation Relationship

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
## DEV Fresh

`devCommand()` handles:

```js
if(root === 'fresh'){
  clearMippiStorage(localStorage);
  clearMippiStorage(sessionStorage);
  location.reload();
  return;
}
```

It uses the same Mippi-prefix storage clearing helper as public Reset.

Differences from public Reset:

- no confirmation,
- no 420 ms delay,
- no Console warning flow,
- immediate reload.

## DEV Clean

`devClean()` currently:

- clears active Wish sequence,
- undoes AI Wish corruption without announcement,
- closes Shop,
- closes Blueprint,
- closes Blender popup,
- closes Contact popup,
- closes Unreal gift,
- cancels compile popup,
- ends Finale,
- hides HAL overlay,
- ends active Super Boss,
- removes temporary Wish spectacle elements,
- removes Doug directive/approval elements.

It then prints:

```text
DEV // Temporary overlays and authored Wish effects cleaned. Persistent progression left intact.
```

## Persistence Contract

DEV Clean must not:

- clear achievements,
- clear Shop ownership,
- clear Rupees,
- clear Hearts,
- clear Legendary,
- clear Music Player entitlement.

## QA

### Clean

1. force several persistent states,
2. open an authored overlay,
3. run `dev clean`,
4. verify overlay removed,
5. run `dev snapshot`,
6. verify progression unchanged.

### Fresh

1. create broad progression,
2. run `dev fresh`,
3. verify immediate reload,
4. verify first-visit state,
5. verify Three.js starts normally.
## Related Documentation

- [Dev Console and Command Surface Index](../README.md)
- [Design Documentation](DESIGN.md)
