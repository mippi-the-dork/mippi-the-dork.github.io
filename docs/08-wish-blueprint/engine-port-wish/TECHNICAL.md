# Engine Port Wish - Technical Documentation

**Hierarchy:** Documentation Home > Wish and Blueprint Progression > Engine Port Wish > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Simulates porting the project through Unreal, Unity, and Godot and presents the escalating technical absurdity as a persistent result screen.

> This page is the canonical technical documentation for **Engine Port Wish** within the Wish and Blueprint Progression category.

## Documentation Relationship

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
## Branch Match

Validated Wish checks:

```js
const engine=text.match(
  /(unreal|unity|godot)/
);
```

If matched:

```js
telemetryWishBranch('engine');
engineWishSpectacle(engine[1]);
```

## Overlay

The root is created dynamically:

```text
.engine-port-overlay
.wish-sequence-overlay
```

with `aria-live="polite"`.

## Tracks

Three cards use:

```text
data-engine="unreal"
data-engine="unity"
data-engine="godot"
```

## Start Offsets

```js
const starts={
  unreal:0,
  unity:850,
  godot:1650
};
```

## Durations

```js
const durations={
  unreal:6200,
  unity:6800,
  godot:7200
};
```

## Track Status Text

Unreal includes stages such as:

- Scanning Blueprints
- Fixing Redirectors
- Compiling 639,427 Shaders
- Converting C++ assumptions
- Packaging

Unity includes:

- Locating Packages
- Migrating Prefabs
- Resolving Missing Scripts
- Choosing URP and HDRP somehow
- Domain Reloading

Godot includes:

- Parenting Nodes
- Connecting Signals
- Renaming Node2D_Final_Final
- Converting Resources
- Exporting

## Log Events

Timed log events include:

```text
900 ms  Converting Blueprints to C#...
1800 ms Converting C# to GDScript...
2700 ms Converting GDScript back to Blueprints...
3650 ms ERROR // architectural circular dependency detected
4550 ms SOLUTION // ignore it
5600 ms Input mappings disagreeing productively...
6750 ms All three render pipelines now claim ownership of the same material.
7900 ms PORT COMPLETE // confidence exceeds evidence.
```

## Progress Update

The display tick runs every:

```text
90 ms
```

and uses eased progress per track.

Total migration is the average of the three percentages.

## Completion

At 8600 ms:

- timers are cleaned,
- all tracks are forced to 100 percent,
- total becomes 100 percent,
- build summary becomes:
  - `PORT COMPLETE // 3 ENGINES SUPPORTED`
  - `FINAL BUILD SIZE // 487 GB`
- Console prints success,
- close action is enabled.

## Close Label

```text
CLOSE PORT REPORT
```

## Cleanup

Closing:

- clears remaining timers,
- adds leaving animation,
- removes overlay after 420 ms,
- clears `activeWishSequenceCleanup`.

## QA

Test all three input words separately:

```text
Unreal
Unity
Godot
```

Confirm:

- source signal reflects typed engine,
- all three migration tracks still run,
- result remains after 8.6 seconds,
- Close Port Report works,
- no overlay remains afterward.
## Related Documentation

- [Wish and Blueprint Progression Index](../README.md)
- [Design Documentation](DESIGN.md)
