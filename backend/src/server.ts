import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'

// Import routes
import casesRouter from './controllers/caseController'
import contactsRouter from './controllers/contactController'
import kanbanRouter from './controllers/kanbanController'
import evidenceRouter from './controllers/evidenceController'
import reportsRouter from './controllers/reportController'
import courtDatesRouter from './controllers/courtDateController'
import templatesRouter from './controllers/templateController'

// Database setup
import { initializeDatabase } from './config/database'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
})

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}))
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173'],
  credentials: true,
}))
app.use(compression())
app.use(morgan('combined'))
app.use(limiter)
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Static files for templates and uploads
app.use('/templates', express.static(path.join(__dirname, '../templates')))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// API Routes
app.use('/api/cases', casesRouter)
app.use('/api/contacts', contactsRouter)
app.use('/api/kanban', kanbanRouter)
app.use('/api/evidence', evidenceRouter)
app.use('/api/reports', reportsRouter)
app.use('/api/court-dates', courtDatesRouter)
app.use('/api/templates', templatesRouter)

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
  })
}

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Initialize database and start server
async function startServer() {
  try {
    // Initialize database
    await initializeDatabase()
    console.log('✅ Database initialized successfully')

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Case Track Backend Server running on port ${PORT}`)
      console.log(`📊 Health check: http://localhost:${PORT}/health`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully')
  process.exit(0)
})

startServer()

export default app