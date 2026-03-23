#!/usr/bin/env python3
"""Simple static server for the Silabusnic starter app."""

from __future__ import annotations

import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
APP_DIR = ROOT / "silabusnic"
HOST = os.getenv("SILABUSNIC_HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", os.getenv("SILABUSNIC_PORT", "8010")))


def main() -> None:
  handler = partial(SimpleHTTPRequestHandler, directory=str(ROOT))
  with ThreadingHTTPServer((HOST, PORT), handler) as httpd:
    print(f"Serving Silabusnic at http://{HOST}:{PORT}/silabusnic/index.html")
    httpd.serve_forever()


if __name__ == "__main__":
  main()
