#!/bin/bash
# Deployment script for D-Bac AI Tea Server to Render.com

echo "🚀 Deploying D-Bac AI Tea Backend to Render.com"
echo "================================================"

# Check if required files exist
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

if [ ! -f "server.js" ]; then
    echo "❌ server.js not found"
    exit 1
fi

echo "✅ Required files found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Creating template..."
    cat > .env << EOF
# Resend API Configuration
RESEND_API_KEY=your_resend_api_key_here

# Admin Email
ADMIN_EMAIL=darren.bihms@gmail.com

# Server Configuration
PORT=10000
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://your-domain.com
EOF
    echo "📝 Created .env template. Please update with your actual values."
fi

# Test the application
echo "🧪 Testing application..."
node -e "
const app = require('./server.js');
console.log('✅ Server loads successfully');
"

echo ""
echo "🎉 Backend is ready for deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Update .env file with your Resend API key"
echo "2. Push to GitHub repository"
echo "3. Connect repository to Render.com"
echo "4. Set environment variables in Render dashboard"
echo "5. Deploy!"
echo ""
echo "📧 Admin email configured for: darren.bihms@gmail.com"
echo "🔗 API endpoint will be: https://your-app-name.onrender.com/api/waitlist"
