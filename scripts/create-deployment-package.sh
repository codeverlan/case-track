#!/bin/bash
# Create deployment package without building

set -e

echo "🚀 Creating Case Track deployment package..."

# Create deployment directory
mkdir -p deploy/case-track

# Copy source files (not built files)
cp -r backend deploy/case-track/
cp -r frontend deploy/case-track/
cp -r database deploy/case-track/
cp -r templates deploy/case-track/
cp package.json deploy/case-track/
cp LICENSE deploy/case-track/
cp README.md deploy/case-track/
cp GITHUB_DEPLOYMENT.md deploy/case-track/
cp YUNOHOST_DEPLOYMENT.md deploy/case-track/
cp DEVELOPMENT.md deploy/case-track/

# Create deployment script
cat > deploy/case-track/deploy.sh << 'EOF'
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
EOF

chmod +x deploy/case-track/deploy.sh

# Create package
cd deploy
VERSION=$(git describe --tags --abbrev=0 2>/dev/null || echo "latest")
PACKAGE_NAME="case-track-${VERSION}.tar.gz"

echo "📦 Creating deployment package: ${PACKAGE_NAME}"
tar -czf "${PACKAGE_NAME}" case-track/

echo "✅ Deployment package created: deploy/${PACKAGE_NAME}"
echo "🚀 Ready to upload to GitHub releases!"