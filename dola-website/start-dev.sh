#!/bin/bash

echo "🚀 Starting DOLA Development Server with Live Reload..."
echo "========================================================="
echo "📁 Directory: $(pwd)"
echo "🌐 URL: http://localhost:3000"
echo "✨ Auto-refresh enabled!"
echo "========================================================="
echo ""

# Kill any existing processes on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# Start the development server
python3 dev-server.py