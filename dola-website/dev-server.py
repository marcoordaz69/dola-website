#!/usr/bin/env python3
"""
DOLA Website Development Server with Live Reload
"""

import os
import sys
import time
import threading
from http.server import HTTPServer, SimpleHTTPRequestHandler
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import webbrowser
from pathlib import Path

class LiveReloadHandler(FileSystemEventHandler):
    def __init__(self, reload_callback):
        self.reload_callback = reload_callback
        self.last_reload = 0
        
    def on_modified(self, event):
        if event.is_directory:
            return
            
        # Only reload for web files
        file_ext = Path(event.src_path).suffix.lower()
        if file_ext in ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.svg']:
            current_time = time.time()
            # Debounce rapid file changes
            if current_time - self.last_reload > 1:
                print(f"📝 File changed: {event.src_path}")
                self.reload_callback()
                self.last_reload = current_time

class CustomHTTPRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add live reload script to HTML files
        if self.path.endswith('.html') or self.path == '/':
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()
    
    def do_GET(self):
        # Handle live reload endpoint
        if self.path == '/live-reload':
            self.send_response(200)
            self.send_header('Content-type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Keep connection alive for live reload
            try:
                while True:
                    self.wfile.write(b'data: ping\n\n')
                    self.wfile.flush()
                    time.sleep(30)
            except:
                pass
            return
        
        # Inject live reload script into HTML files
        if self.path.endswith('.html') or self.path in ['/', '/index.html']:
            try:
                # Get the file path
                if self.path == '/':
                    file_path = 'index.html'
                else:
                    file_path = self.path.lstrip('/')
                
                if os.path.exists(file_path):
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Inject live reload script before closing body tag
                    live_reload_script = """
<script>
(function() {
    let lastModified = Date.now();
    
    function checkForUpdates() {
        fetch(window.location.href, { 
            method: 'HEAD',
            cache: 'no-cache'
        })
        .then(response => {
            const modified = response.headers.get('last-modified');
            if (modified && new Date(modified).getTime() > lastModified) {
                console.log('🔄 Page updated, reloading...');
                window.location.reload();
            }
        })
        .catch(() => {
            // Server might be restarting, try to reload
            setTimeout(() => window.location.reload(), 1000);
        });
    }
    
    // Check for updates every 1 second
    setInterval(checkForUpdates, 1000);
    
    // Also check when page gains focus
    window.addEventListener('focus', checkForUpdates);
    
    console.log('🔥 Live reload enabled!');
})();
</script>
"""
                    
                    if '</body>' in content:
                        content = content.replace('</body>', live_reload_script + '</body>')
                    else:
                        content += live_reload_script
                    
                    self.send_response(200)
                    self.send_header('Content-type', 'text/html; charset=utf-8')
                    self.send_header('Content-Length', str(len(content.encode('utf-8'))))
                    self.end_headers()
                    self.wfile.write(content.encode('utf-8'))
                    return
            except Exception as e:
                print(f"Error serving HTML file: {e}")
        
        # Default behavior for other files
        super().do_GET()
    
    def log_message(self, format, *args):
        # Customize log messages
        if not self.path.startswith('/live-reload'):
            timestamp = time.strftime('%H:%M:%S')
            print(f"[{timestamp}] {self.address_string()} - {format % args}")

def start_file_watcher():
    """Start watching files for changes"""
    def reload_trigger():
        print("🔄 Changes detected - browsers will auto-refresh")
    
    event_handler = LiveReloadHandler(reload_trigger)
    observer = Observer()
    observer.schedule(event_handler, path='.', recursive=True)
    observer.start()
    print("👀 Watching for file changes...")
    return observer

def main():
    PORT = 3000
    
    print("🚀 Starting DOLA Development Server...")
    print("=" * 50)
    
    # Start file watcher
    observer = start_file_watcher()
    
    try:
        # Create and start server
        server = HTTPServer(('localhost', PORT), CustomHTTPRequestHandler)
        
        url = f"http://localhost:{PORT}"
        print(f"🌐 Server running at: {url}")
        print(f"📁 Serving directory: {os.getcwd()}")
        print("✨ Live reload enabled - changes will auto-refresh!")
        print("=" * 50)
        print("Press Ctrl+C to stop the server")
        print("=" * 50)
        
        # Open browser automatically
        try:
            webbrowser.open(url)
            print(f"🌍 Opened {url} in your default browser")
        except:
            print(f"Please open {url} in your browser")
        
        print()
        
        # Start server
        server.serve_forever()
        
    except KeyboardInterrupt:
        print("\n🛑 Shutting down server...")
        observer.stop()
        server.shutdown()
        print("✅ Server stopped successfully!")
    except Exception as e:
        print(f"❌ Server error: {e}")
        observer.stop()
    finally:
        observer.join()

if __name__ == "__main__":
    # Check if watchdog is available
    try:
        from watchdog.observers import Observer
        from watchdog.events import FileSystemEventHandler
    except ImportError:
        print("❌ Missing required package. Installing watchdog...")
        os.system(f"{sys.executable} -m pip install watchdog")
        try:
            from watchdog.observers import Observer
            from watchdog.events import FileSystemEventHandler
        except ImportError:
            print("❌ Failed to install watchdog. Using basic server without live reload.")
            os.system("python3 -m http.server 3000")
            sys.exit(1)
    
    main()