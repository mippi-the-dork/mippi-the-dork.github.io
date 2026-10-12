# Doug Interaction - Technical Documentation

**Hierarchy:** Documentation Home > Doug and Coolness > Doug Interaction > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Provides the core petting interaction chain on Doug's About card, including reactions, paws, the Best Boy achievement, and progression toward command state.

> This page is the canonical technical documentation for **Doug Interaction** within the Doug and Coolness category.

## Documentation Relationship

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
## DOM References

```js
const doug =
  document.querySelector(
    '.doug-secret'
  );

const dougCard =
  document.querySelector(
    '.doug-card'
  );

const dougReaction =
  document.querySelector(
    '#doug-reaction'
  );
```

The interactive image is:

```html
<img class="doug-photo doug-secret"
     title="Pet the Doug">
```

## Runtime Counter

```js
let dougClicks=0;
```

This counter is not persisted in long-term storage.

## Reaction Array

```js
const dougReactions=[
  'Doug notices you.',
  'Head tilt engaged.',
  'You have his full attention now.',
  'This is becoming a meeting.',
  'Morale check passed.',
  'Doug would like this task deprioritized.',
  'Pet break has entered the sprint.',
  'Doug has assumed command.'
];
```

## Reaction Index

```js
const index =
  Math.min(
    dougReactions.length-1,
    Math.floor((dougClicks-1)/2)
  );
```

This advances one reaction tier approximately every two pets.

## Reaction Lifetime

`reactDoug(message)` shows the reaction bubble for:

```text
2200 ms
```

Each new reaction clears the prior hide timer.

## Main Pet Function

All primary Doug pet interactions route through:

```js
petDoug(
  source='card',
  sourceEl=doug
)
```

The function:

1. increments Doug click count,
2. records telemetry,
3. resolves current reaction,
4. shows reaction,
5. emits paw particles,
6. handles popup-specific behavior when applicable,
7. unlocks Best Boy at five,
8. adds command state at twelve,
9. processes command-state spawn behavior,
10. refreshes theme visuals.

## Achievement

Exactly when:

```js
dougClicks===5
```

the system calls:

```js
showAchievement('doug');
```

The achievement itself persists through the shared achievement system even though `dougClicks` resets on reload.

## Command Class

When:

```js
dougClicks>=12
```

the card receives:

```text
doug-command
```

## Card Event

```js
doug?.addEventListener(
  'click',
  () => petDoug(
    'card',
    doug
  )
);
```

## Paw Count

Base:

```text
4 paws
```

When body has:

```text
theme-complete
```

the normal pet burst uses:

```text
6 paws
```

Other Doug systems can request larger bursts.

## Cursor

CSS forces:

```text
grab
```

on `.doug-secret`.

Active state uses:

```text
grabbing
```

## QA

- pet once and verify first reaction,
- pet through the reaction chain,
- verify Best Boy on click five,
- verify command class at click twelve,
- reload and verify achievement persists while pet counter resets,
- pet popup Doug and verify it advances the same shared counter.
## Related Documentation

- [Doug and Coolness Index](../README.md)
- [Design Documentation](DESIGN.md)
