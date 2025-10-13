#!/bin/bash
# Case Track System Deployment Script

set -e

echo "🚀 Deploying Case Track System..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required. Please install Node.js 18+"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if ! node -e "process.exit(require('semver').gte('$NODE_VERSION', '$REQUIRED_VERSION') ? 0 : 1)" 2>/dev/null; then
    echo "❌ Node.js $REQUIRED_VERSION or higher is required. Found: $NODE_VERSION"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build application
echo "🔨 Building application..."
npm run build

# Initialize database
echo "🗄️ Initializing database..."
cd backend
npm run db:migrate
npm run db:seed
cd ..

# Set permissions
echo "🔒 Setting permissions..."
chmod +x deploy.sh

echo "✅ Case Track System deployed successfully!"
echo "🌐 Start with: npm start"
echo "📊 Dashboard will be available at: http://localhost:3001"
echo ""
echo "📚 Next steps:"
echo "1. Test the application: npm test"
echo "2. Start development: npm run dev"
echo "3. View documentation: cat README.md"
