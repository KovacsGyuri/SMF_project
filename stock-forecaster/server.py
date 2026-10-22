"""
AlphaStock AI - Egyszerű helyi webszerver futtató
Automatikusan megnyitja a böngészőt a http://localhost:8080 címen.
Futtatás: py server.py
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def start_server():
    os.chdir(DIRECTORY)
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        url = f"http://localhost:{PORT}"
        print("=" * 60)
        print("  AlphaStock AI - Tőzsdei Előrejelző Rendszer elindult!")
        print(f"  Elérhetőség: {url}")
        print("  A leállításhoz nyomj Ctrl+C billentyűkombinációt a terminálban.")
        print("=" * 60)
        
        # Böngésző automatikus megnyitása
        try:
            webbrowser.open(url)
        except Exception as e:
            print(f"Nem sikerült automatikusan megnyitni a böngészőt: {e}")
            
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nSzerver leállítva.")
            httpd.server_close()

if __name__ == "__main__":
    start_server()
