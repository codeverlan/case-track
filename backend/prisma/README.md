# Prisma Schema Documentation

This directory contains the Prisma schema for the Case Track application.

## Overview

The Prisma schema (`schema.prisma`) provides type-safe database access through the Prisma Client. It mirrors the SQLite database schema defined in `/database/schema.sql` and documented in `/docs/DATABASE_SCHEMA.md`.

## Database Schema

The schema includes the following models:

1. **Case** - Core legal cases being managed
2. **Contact** - Central repository of all contacts
3. **CaseContact** - Junction table linking cases and contacts with roles
4. **KanbanTask** - Visual task management for cases
5. **ContactLog** - Time tracking for interactions
6. **EvidenceReview** - Materials reviewed for court
7. **CourtDate** - Court appearances and deadlines
8. **SystemConfig** - Application configuration
9. **UserSession** - Authentication sessions
10. **AuditLog** - Complete change history

## Setup

### Initial Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Prisma Client:
   ```bash
   npm run prisma:generate
   ```

3. Create the database:
   ```bash
   npm run db:init
   ```

### Environment Variables

Create a `.env` file in the backend directory with:

```env
DATABASE_URL="file:./database/casetrack.db"
```

## Usage

### Generate Prisma Client

After modifying the schema, regenerate the client:

```bash
npm run prisma:generate
```

### Push Schema Changes

To sync the database with schema changes:

```bash
npm run prisma:push
```

### Open Prisma Studio

To browse and edit data visually:

```bash
npm run prisma:studio
```

### Using Prisma Client in Code

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Example: Get all active cases
const cases = await prisma.case.findMany({
  where: { status: 'ACTIVE' },
  include: {
    caseContacts: {
      include: {
        contact: true
      }
    }
  }
});
```

## Important Notes

### Triggers

Prisma doesn't generate SQL triggers automatically. The triggers for automatic timestamp updates are created separately via the migration file in `prisma/migrations/0_init/migration.sql`.

When initializing the database with `npm run db:init`, this migration is automatically applied.

### CHECK Constraints

The original schema includes CHECK constraints for enum-like fields (e.g., case status, task status). Prisma doesn't support CHECK constraints, so these are enforced at the application level through:

- TypeScript enums
- Prisma validation
- Application business logic

**Enum Values:**

- **Case Status**: `ACTIVE`, `WAITING_LIST`, `CLOSED`
- **Kanban Task Status**: `AGREEMENT_SIGNED`, `CLIENT_PAID`, `WORKING`, `PREPARING`
- **Evidence Material Type**: `PDF`, `AUDIO`, `VIDEO`, `DOCUMENT`, `IMAGE`, `SPREADSHEET`, `PRESENTATION`, `EMAIL`, `TEXT_MESSAGE`, `MEDICAL_RECORD`, `LEGAL_DOCUMENT`, `OTHER`
- **Audit Log Action**: `CREATE`, `UPDATE`, `DELETE`

### Timestamps

The schema uses Prisma's `@updatedAt` decorator which automatically updates the `updated_at` field at the application level. Additionally, SQL triggers are in place for compatibility with direct SQL operations.

## Migration from Legacy SQL

If you're migrating from the original `schema.sql` approach:

1. The Prisma schema is designed to be compatible with the existing SQL schema
2. All indexes, foreign keys, and relationships are preserved
3. Triggers are added via the migration file
4. Data types and constraints match the original design

## Troubleshooting

### Database locked error

If you encounter "database is locked" errors, ensure:
- Only one process is accessing the database at a time
- Close Prisma Studio when running migrations
- Check for zombie processes holding database locks

### Schema out of sync

If your database and Prisma schema are out of sync:

```bash
# Reset and recreate the database
rm database/casetrack.db
npm run db:init
```

### Prisma Client not found

If you get "Cannot find module '@prisma/client'" errors:

```bash
npm run prisma:generate
```

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [SQLite Provider](https://www.prisma.io/docs/concepts/database-connectors/sqlite)
- Database Schema Documentation: `/docs/DATABASE_SCHEMA.md`
- Database ERD: `/docs/DATABASE_ERD.md`
