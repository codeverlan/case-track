import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Database file path - must match DATABASE_URL in .env
const dbPath = path.join(__dirname, '../../database/casetrack.db')
const schemaPath = path.join(__dirname, '../../../database/schema.sql')
const seedPath = path.join(__dirname, '../../../database/seeds/sample_data.sql')

let db: Database.Database | null = null

export function getDatabase(): Database.Database {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDatabase() first.')
  }
  return db
}

export async function initializeDatabase(): Promise<void> {
  try {
    // Create database directory if it doesn't exist
    const dbDir = path.dirname(dbPath)
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }

    // Connect to database
    db = new Database(dbPath)

    // Enable foreign keys
    db.pragma('foreign_keys = ON')

    // Set WAL mode for better performance
    db.pragma('journal_mode = WAL')

    console.log('📦 Connected to SQLite database:', dbPath)

    // Check if database needs initialization
    const result = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all()

    if (result.length === 0) {
      console.log('🔧 Database schema is empty - please run "npm run prisma:push" or "npx prisma migrate deploy" to initialize')
      console.log('📋 Database connected but not initialized')
    } else {
      console.log('📋 Database already initialized')
    }

    // Prepare statements for common queries
    prepareStatements()

  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    throw error
  }
}

async function initializeSchema(): Promise<void> {
  if (!db) throw new Error('Database not initialized')

  try {
    const schema = fs.readFileSync(schemaPath, 'utf8')
    const statements = schema.split(';').filter(stmt => stmt.trim())

    // Run each statement
    for (const statement of statements) {
      if (statement.trim()) {
        db.exec(statement)
      }
    }

    console.log('✅ Database schema created')
  } catch (error) {
    console.error('❌ Schema initialization failed:', error)
    throw error
  }
}

async function seedDatabase(): Promise<void> {
  if (!db) throw new Error('Database not initialized')

  try {
    const seedData = fs.readFileSync(seedPath, 'utf8')
    const statements = seedData.split(';').filter(stmt => stmt.trim())

    // Run each statement
    for (const statement of statements) {
      if (statement.trim()) {
        db.exec(statement)
      }
    }

    console.log('✅ Sample data inserted')
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    throw error
  }
}

function prepareStatements(): void {
  if (!db) throw new Error('Database not initialized')

  // Prepare commonly used statements for performance
  console.log('⚡ Preparing database statements...')
}

// Utility functions for common operations
export class DatabaseService {
  static async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
    const db = getDatabase()
    try {
      const stmt = db.prepare(sql)
      return stmt.all(...params) as T[]
    } catch (error) {
      console.error('Query error:', error)
      throw error
    }
  }

  static async get<T = any>(sql: string, params: any[] = []): Promise<T | undefined> {
    const db = getDatabase()
    try {
      const stmt = db.prepare(sql)
      return stmt.get(...params) as T
    } catch (error) {
      console.error('Get error:', error)
      throw error
    }
  }

  static async run(sql: string, params: any[] = []): Promise<Database.RunResult> {
    const db = getDatabase()
    try {
      const stmt = db.prepare(sql)
      return stmt.run(...params)
    } catch (error) {
      console.error('Run error:', error)
      throw error
    }
  }

  static async transaction<T>(callback: () => T): Promise<T> {
    const db = getDatabase()
    try {
      return db.transaction(callback)()
    } catch (error) {
      console.error('Transaction error:', error)
      throw error
    }
  }
}

// Export for testing and debugging
export function closeDatabase(): void {
  if (db) {
    db.close()
    db = null
  }
}