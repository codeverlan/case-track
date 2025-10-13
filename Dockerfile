# Multi-stage build for optimal image size
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

# Install sqlite3 for runtime
RUN apk add --no-cache sqlite

# Create app user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=nodejs:nodejs /app/backend/dist ./backend/dist
COPY --from=builder --chown=nodejs:nodejs /app/frontend/dist ./frontend/dist
COPY --from=builder --chown=nodejs:nodejs /app/database ./database
COPY --from=builder --chown=nodejs:nodejs /app/templates ./templates
COPY --from=builder --chown=nodejs:nodejs /app/backend/node_modules ./backend/node_modules
COPY --from=builder --chown=nodejs:nodejs /app/backend/package*.json ./backend/
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Create necessary directories
RUN mkdir -p logs && chown -R nodejs:nodejs logs

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["npm", "start"]