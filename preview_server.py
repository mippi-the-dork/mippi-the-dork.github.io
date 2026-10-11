from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os, webbrowser, threading

ROOT = Path(__file__).resolve().parent
os.chdir(ROOT)

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

server = ThreadingHTTPServer(("127.0.0.1", 0), NoCacheHandler)
port = server.server_address[1]
url = f"http://127.0.0.1:{port}/?v=2.72"
print(f"Mippi Portfolio v2.72 preview: {url}")
print("Close this window to stop the preview server.")
threading.Timer(0.6, lambda: webbrowser.open(url)).start()
server.serve_forever()
