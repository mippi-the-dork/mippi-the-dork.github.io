# Reset Integrity QA - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Reset Integrity QA > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Verifies that the public reset returns the portfolio to a true first-visit state and performs a real document reload so bootstrap systems such as Three.js restart correctly.

> This page is the canonical technical documentation for **Reset Integrity QA** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
## Namespace Clearer

```js
function clearMippiStorage(
  storage
){
  try{
    const keys=[];

    for(
      let i=0;
      i<storage.length;
      i++
    ){
      const key=
        storage.key(i);

      if(
        key &&
        key.toLowerCase()
          .startsWith(
            'mippi'
          )
      )
        keys.push(key);
    }

    keys.forEach(
      key =>
        storage.removeItem(
          key
        )
    );
  }
  catch(_){}
}
```

## Full Reset

```js
function performFullReset(){
  clearMippiStorage(
    localStorage
  );

  clearMippiStorage(
    sessionStorage
  );

  try{
    history.scrollRestoration=
      'manual';
  }
  catch(_){}

  window.scrollTo(
    0,
    0
  );

  consolePrint(
    'FULL RESET // confirmed. Reinitializing first-visit state.',
    'warn'
  );

  window.setTimeout(
    () => {
      try{
        history.replaceState(
          null,
          '',
          location.pathname+
          location.search
        );
      }
      catch(_){}

      location.reload();
    },
    420
  );
}
```

## Public Confirmation

First `reset` command sets:

```text
consolePending=
reset_confirmation
```

and asks the player to type `reset` again.

When pending:

```js
if(
  raw.toLowerCase()===
  'reset'
)
  performFullReset();
else
  cancel;
```

## DEV Fresh

Temporary QA command root:

```text
dev fresh
```

executes:

```js
clearMippiStorage(
  localStorage
);

clearMippiStorage(
  sessionStorage
);

location.reload();
```

without confirmation.

## Three.js Requirement

`THREE_RUNTIME_DEV.md` explicitly states that reset must use a real reload because Three.js scenes are document-bootstrap systems.

## Reset Matrix

After public reset verify:

```text
Rare Signals         0
Theme                Rare
Legendary            locked
Wish charge          0
Blueprint repair     fresh-session default
Rupees               0
Shop                  empty
Hearts                0
Mushroom bank         0
Castle progress       0
postgame reveal       false
postgame achievements empty
Music Player          hidden
Inspect/Design prefs  reset
session telemetry     new session
scroll                top
```

## QA

- Reset from normal midgame.
- Reset from Epic.
- Reset from Legendary.
- Reset from postgame.
- Reset while Music is unlocked.
- Compare post-reset runtime health against manual fresh browser load.
- Verify Three.js scenes bootstrap without needing a second refresh.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
