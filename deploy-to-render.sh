#!/bin/bash

# D-Bac AI Tea - Production Deployment Script
# This script deploys the updated website with CSS fixes to Render.com

echo "🚀 Deploying D-Bac AI Tea to Production..."

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please initialize git first."
    exit 1
fi

# Add all changes
echo "📝 Adding all changes to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Fix CSS styling for Tea Sessions section in production

- Added static file serving to Express server
- Added cache-busting headers for CSS files
- Fixed production CSS loading issues
- Updated server to serve frontend files properly"

# Push to main branch
echo "📤 Pushing to main branch..."
git push origin main

echo "✅ Deployment initiated!"
echo ""
echo "🔧 What was fixed:"
echo "   - Added express.static() middleware to serve HTML/CSS/JS files"
echo "   - Added cache-busting headers for styles.css"
echo "   - Added root route to serve index.html"
echo "   - Fixed production CSS loading issues"
echo ""
echo "⏳ Render.com will automatically deploy these changes."
echo "🌐 Your website will be updated in 2-3 minutes."
echo ""
echo "📧 Admin notifications will continue to be sent to: darren.bihms@gmail.com"
echo "🎯 The Tea Sessions section should now display correctly in production!"
