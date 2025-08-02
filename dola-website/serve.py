#!/usr/bin/env python3
"""
Simple HTTP server to serve the DOLA website locally
Run with: python3 serve.py
Then open: http://localhost:3000
"""

import http.server
import socketserver
import os
import sys

# Change to the directory containing this script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 3000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers for better local development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        # Handle root path
        if self.path == '/':
            self.path = '/index.html'
        
        # Handle paths without .html extension
        if not '.' in self.path and not self.path.endswith('/'):
            # Try to serve .html version
            html_path = self.path + '.html'
            if os.path.exists('.' + html_path):
                self.path = html_path
        
        return super().do_GET()

def main():
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 DOLA Website running at:")
            print(f"   http://localhost:{PORT}")
            print(f"   http://127.0.0.1:{PORT}")
            print(f"\n📁 Serving files from: {os.getcwd()}")
            print(f"🛑 Press Ctrl+C to stop the server\n")
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print(f"\n🛑 Server stopped")
        sys.exit(0)
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"❌ Port {PORT} is already in use. Try a different port or stop other servers.")
            sys.exit(1)
        else:
            raise

if __name__ == "__main__":
    main()