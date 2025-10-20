# Prisma Migrations

This directory contains database migration files managed by Prisma.

## Available Migrations

### 20251020190927_add_hourly_rate_and_hours_spent

Added support for time tracking and income management:
- Added `hourly_rate` (REAL, default 0.0) to `cases` table
- Added `hours_spent` (REAL, default 0.0) to `contact_logs` table

These fields enable automatic income calculation: `Total Income = Σ(hours_spent × hourly_rate)`

## Running Migrations

### Development
```bash
npm run prisma:push  # Quick schema sync without migration
# OR
npx prisma migrate dev  # Create and apply migration
```

### Production
```bash
npx prisma migrate deploy  # Apply pending migrations
```

## Migration Files

- `migration.sql` - Contains the SQL statements to update the database schema
- Migration names follow the pattern: `<timestamp>_<description>`
