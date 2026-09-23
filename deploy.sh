#!/bin/bash
# deploy.sh — Nandini Layout Club deployment script
# Run this on your VPS after uploading files

set -e

echo "🚀 Deploying Nandini Layout Club..."

# ─── Backend setup ───────────────────────────────
echo "📦 Installing backend dependencies..."
cd backend
npm install --production
cd ..

# ─── Frontend build ──────────────────────────────
echo "🔨 Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Build complete. Files in frontend/dist/"

# ─── PM2 (if available) ──────────────────────────
if command -v pm2 &>/dev/null; then
  echo "🔄 Restarting PM2..."
  pm2 restart ecosystem.config.js --update-env 2>/dev/null || pm2 start ecosystem.config.js
  pm2 save
  echo "✅ PM2 running."
else
  echo "⚠️  PM2 not found. Start backend manually: cd backend && node server.js"
fi

echo ""
echo "════════════════════════════════════════"
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "  1. Make sure MySQL is running and schema.sql has been imported"
echo "  2. Verify .env files in /backend have correct values"
echo "  3. Point your Nginx/Apache to frontend/dist for the frontend"
echo "  4. Point Nginx to localhost:5000 for the API"
echo "  5. Visit /admin/login with: admin@nandinilayoutclub.in / password"
echo "     (CHANGE THE PASSWORD IMMEDIATELY)"
echo "════════════════════════════════════════"
