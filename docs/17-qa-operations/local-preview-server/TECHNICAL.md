# Local Preview Server - Technical Documentation

**Hierarchy:** Documentation Home > QA, Runtime Operations, and Deployment > Local Preview Server > Technical

**Implementation baseline:** Mippi Portfolio v2.78

**Feature summary:** Uses a tiny localhost HTTP server so local QA behaves more like static hosting than opening the site through file://.

> This page is the canonical technical documentation for **Local Preview Server** within the QA, Runtime Operations, and Deployment category.

## Documentation Relationship

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
## Batch File

Current `PreviewLocal.bat`:

```bat
@echo off
setlocal
cd /d "%~dp0"
```

It first searches for:

```text
py
```

Then:

```text
python
```

If found, it runs:

```text
preview_server.py
```

and exits with that process's error code.

## Missing Python

If neither executable is found:

```text
Python was not found on PATH.
Install Python or use VS Code Live Server to preview the site over localhost.
```

The batch pauses before returning error code 1.

## Server

`preview_server.py` imports:

```text
SimpleHTTPRequestHandler
ThreadingHTTPServer
Path
os
webbrowser
threading
time
```

## Working Directory

The script changes working directory to its own containing folder:

```py
ROOT =
  Path(__file__).resolve().parent

os.chdir(ROOT)
```

This makes relative site assets resolve from the package root.

## No-Cache Handler

Custom handler adds:

```text
Cache-Control:
no-store, no-cache, must-revalidate, max-age=0

Pragma:
no-cache

Expires:
0
```

to every response.

## Bind Address

```py
server =
  ThreadingHTTPServer(
    ("127.0.0.1",0),
    NoCacheHandler
  )
```

Port `0` requests an available OS-assigned port.

## URL

Current v2.78 URL:

```py
url =
  f"http://127.0.0.1:{port}/?v=2.78&local={int(time.time())}"
```

## Console Output

```text
Mippi Portfolio v2.78 preview: <URL>
Close this window to stop the preview server.
```

## Browser Open

The script waits approximately:

```text
0.6 seconds
```

then calls:

```py
webbrowser.open(url)
```

## Concurrency

`ThreadingHTTPServer` allows multiple asset requests to be served concurrently.

This is useful for:

- HTML,
- CSS,
- JavaScript,
- images,
- MP3 metadata,
- other static files.

## Shutdown

The main process runs:

```py
server.serve_forever()
```

Closing the terminal ends the local preview.

## Public Deployment Exclusion

Release/deployment cleanup should exclude:

```text
PreviewLocal.bat
preview_server.py
```

from the published runtime package.

They can remain in a source/archive package intended for development.
## Related Documentation

- [QA, Runtime Operations, and Deployment Index](../README.md)
- [Design Documentation](DESIGN.md)
