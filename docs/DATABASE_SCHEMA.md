# Case Track Database Schema Documentation

**Date:** 2025-10-16  
**Version:** 1.0.0  
**Database Type:** SQLite  
**Purpose:** Mental Health Therapist Case Tracking System for Court-Involved Reunification Cases

---

## Overview

This database schema supports a comprehensive case tracking system designed for mental health therapists managing court-involved reunification cases. The schema emphasizes:

- **Cross-case visibility** - Track how contacts participate across multiple cases
- **Role-based relationships** - Same contact can have different roles in different cases
- **Time tracking** - Precise logging for billing and legal compliance
- **Evidence management** - Track reviewed materials for court reports
- **Audit trail** - Complete history of all data changes

---

## Entity Relationship Summary

```
CASES (1) ←→ (Many) CASE_CONTACTS ←→ (Many) CONTACTS
  ↓                                           ↓
  ├── KANBAN_TASKS (Many)                    └── CONTACT_LOGS (Many)
  ├── CONTACT_LOGS (Many)
  ├── EVIDENCE_REVIEWS (Many)
  └── COURT_DATES (Many)

AUDIT_LOG (tracks all changes)
SYSTEM_CONFIG (application settings)
USER_SESSIONS (authentication)
```

---

## Table Definitions

### 1. CASES

**Purpose:** Core table storing individual legal cases being managed by the therapist.

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique case identifier |
| case_name | TEXT | NOT NULL | Descriptive name of the case (e.g., "Johnson Family Reunification") |
| case_number | TEXT | UNIQUE | Court-assigned case number (e.g., "CF-2024-001") |
| case_description | TEXT | NULL | Detailed description of the case |
| status | TEXT | NOT NULL, CHECK(IN 'ACTIVE', 'WAITING_LIST', 'CLOSED'), DEFAULT 'ACTIVE' | Current case status |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp (auto-updated via trigger) |

**Relationships:**
- One-to-Many with CASE_CONTACTS (a case can have many contact relationships)
- One-to-Many with KANBAN_TASKS (a case can have many tasks)
- One-to-Many with CONTACT_LOGS (a case can have many contact log entries)
- One-to-Many with EVIDENCE_REVIEWS (a case can have many evidence items)
- One-to-Many with COURT_DATES (a case can have many court dates)

**Indexes:**
- `idx_cases_status` on `status` - Fast filtering by case status
- `idx_cases_name` on `case_name` - Fast case name searches

---

### 2. CONTACTS

**Purpose:** Central repository of all contacts across all cases. A single contact can participate in multiple cases with different roles.

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique contact identifier |
| name | TEXT | NOT NULL | Full name of the contact |
| email | TEXT | UNIQUE | Email address (unique across all contacts) |
| phone | TEXT | NULL | Phone number |
| address | TEXT | NULL | Physical address |
| notes | TEXT | NULL | General notes about the contact |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp (auto-updated via trigger) |

**Relationships:**
- One-to-Many with CASE_CONTACTS (a contact can be associated with many cases)
- One-to-Many with CONTACT_LOGS (a contact can have many logged interactions)

**Indexes:**
- `idx_contacts_name` on `name` - Fast contact name searches
- `idx_contacts_email` on `email` - Fast email lookups

**Key Design Note:** Contacts are stored centrally to enable cross-case visibility and role conflict detection.

---

### 3. CASE_CONTACTS

**Purpose:** Junction table linking cases and contacts with role assignments. Enables the same contact to have different roles in different cases.

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique relationship identifier |
| case_id | INTEGER | NOT NULL, FOREIGN KEY → cases(id) ON DELETE CASCADE | Reference to the case |
| contact_id | INTEGER | NOT NULL, FOREIGN KEY → contacts(id) ON DELETE CASCADE | Reference to the contact |
| role | TEXT | NOT NULL | Role of the contact in this case (e.g., "PARENT", "ATTORNEY", "GAL", "THERAPIST", "JUDGE", "SOCIAL_WORKER", "CHILD") |
| role_notes | TEXT | NULL | Additional notes about this role assignment |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Relationship creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp (auto-updated via trigger) |
| | | UNIQUE(case_id, contact_id) | A contact can only have one role per case |

**Relationships:**
- Many-to-One with CASES (foreign key: case_id)
- Many-to-One with CONTACTS (foreign key: contact_id)

**Indexes:**
- `idx_case_contacts_case_id` on `case_id` - Fast lookup of all contacts for a case
- `idx_case_contacts_contact_id` on `contact_id` - Fast lookup of all cases for a contact (for role conflict detection)
- `idx_case_contacts_role` on `role` - Fast filtering by role type

**Key Design Note:** The unique constraint on (case_id, contact_id) prevents duplicate assignments while allowing the same contact to have different roles across different cases.

---

### 4. KANBAN_TASKS

**Purpose:** Visual task management for each case using a kanban board workflow.

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique task identifier |
| case_id | INTEGER | NOT NULL, FOREIGN KEY → cases(id) ON DELETE CASCADE | Reference to the case |
| title | TEXT | NOT NULL | Short task title |
| description | TEXT | NULL | Detailed task description |
| status | TEXT | NOT NULL, CHECK(IN 'AGREEMENT_SIGNED', 'CLIENT_PAID', 'WORKING', 'PREPARING'), DEFAULT 'WORKING' | Current task status/column |
| task_type | TEXT | DEFAULT 'OTHER' | Category of task (e.g., "ASSESSMENT", "SESSION", "DOCUMENTATION", "COURT_PREP", "COMMUNICATION") |
| position | INTEGER | NOT NULL, DEFAULT 0 | Position within the status column for ordering |
| due_date | DATETIME | NULL | Task deadline |
| completed_at | DATETIME | NULL | Completion timestamp |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Task creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp (auto-updated via trigger) |

**Relationships:**
- Many-to-One with CASES (foreign key: case_id)

**Indexes:**
- `idx_kanban_tasks_case_id` on `case_id` - Fast retrieval of all tasks for a case
- `idx_kanban_tasks_status` on `status` - Fast filtering by task status

**Kanban Columns (Status Values):**
1. **AGREEMENT_SIGNED** - Initial agreements and intake documentation
2. **CLIENT_PAID** - Financial obligations completed
3. **WORKING** - Active work in progress
4. **PREPARING** - Final preparation and court report stages

---

### 5. CONTACT_LOGS

**Purpose:** Detailed time tracking of all interactions with contacts for billing and legal compliance.

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique log entry identifier |
| case_id | INTEGER | NOT NULL, FOREIGN KEY → cases(id) ON DELETE CASCADE | Reference to the case |
| contact_id | INTEGER | NOT NULL, FOREIGN KEY → contacts(id) ON DELETE CASCADE | Reference to the contact |
| description | TEXT | NOT NULL | Description of the interaction |
| duration_minutes | INTEGER | NOT NULL, DEFAULT 0 | Duration of interaction in minutes |
| contact_date | DATETIME | NOT NULL | Date and time of the interaction |
| contact_type | TEXT | DEFAULT 'OTHER' | Type of contact (e.g., "SESSION", "COMMUNICATION", "ASSESSMENT", "REVIEW") |
| notes | TEXT | NULL | Additional notes about the interaction |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp (auto-updated via trigger) |

**Relationships:**
- Many-to-One with CASES (foreign key: case_id)
- Many-to-One with CONTACTS (foreign key: contact_id)

**Indexes:**
- `idx_contact_logs_case_id` on `case_id` - Fast retrieval of all logs for a case
- `idx_contact_logs_contact_id` on `contact_id` - Fast retrieval of all logs for a contact
- `idx_contact_logs_date` on `contact_date` - Fast date-based filtering and reporting

**Key Design Note:** This table supports billing requirements and legal documentation by providing precise time tracking.

---

### 6. EVIDENCE_REVIEWS

**Purpose:** Track all materials reviewed for court reports and therapeutic assessment.

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique review record identifier |
| case_id | INTEGER | NOT NULL, FOREIGN KEY → cases(id) ON DELETE CASCADE | Reference to the case |
| material_type | TEXT | NOT NULL, CHECK(IN 'PDF', 'AUDIO', 'VIDEO', 'DOCUMENT', 'IMAGE', 'SPREADSHEET', 'PRESENTATION', 'EMAIL', 'TEXT_MESSAGE', 'MEDICAL_RECORD', 'LEGAL_DOCUMENT', 'OTHER') | Type of material reviewed |
| material_title | TEXT | NOT NULL | Title or name of the material |
| material_description | TEXT | NULL | Detailed description of the material |
| review_date | DATETIME | NOT NULL | Date when the material was reviewed |
| reviewer_notes | TEXT | NULL | Notes and observations from the review |
| file_reference | TEXT | NULL | Reference to external file location (files not stored in database) |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp (auto-updated via trigger) |

**Relationships:**
- Many-to-One with CASES (foreign key: case_id)

**Indexes:**
- `idx_evidence_reviews_case_id` on `case_id` - Fast retrieval of all evidence for a case
- `idx_evidence_reviews_date` on `review_date` - Fast date-based filtering

**Material Types:**
- **PDF** - Portable Document Format files
- **AUDIO** - Audio recordings
- **VIDEO** - Video recordings
- **DOCUMENT** - General documents
- **IMAGE** - Image files
- **SPREADSHEET** - Spreadsheet files
- **PRESENTATION** - Presentation files
- **EMAIL** - Email communications
- **TEXT_MESSAGE** - Text message records
- **MEDICAL_RECORD** - Medical documentation
- **LEGAL_DOCUMENT** - Legal filings and documents
- **OTHER** - Other material types

**Key Design Note:** Files are NOT stored in the database; only references and review notes are stored.

---

### 7. COURT_DATES

**Purpose:** Track all court appearances, hearings, and important deadlines with prominent display capability.

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique court date identifier |
| case_id | INTEGER | NOT NULL, FOREIGN KEY → cases(id) ON DELETE CASCADE | Reference to the case |
| court_date | DATETIME | NOT NULL | Date and time of the court event |
| description | TEXT | NOT NULL | Description of the court event (e.g., "Status Review Hearing") |
| location | TEXT | NULL | Court location (e.g., "Family Court, Room 201") |
| judge | TEXT | NULL | Name of the presiding judge |
| outcome | TEXT | NULL | Result of the court event (filled after the event) |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp (auto-updated via trigger) |

**Relationships:**
- Many-to-One with CASES (foreign key: case_id)

**Indexes:**
- `idx_court_dates_case_id` on `case_id` - Fast retrieval of all court dates for a case
- `idx_court_dates_date` on `court_date` - Fast date-based filtering and chronological ordering

**Key Design Note:** The system can query upcoming court dates for dashboard display and alerts.

---

### 8. SYSTEM_CONFIG

**Purpose:** Store application-wide configuration settings that can be modified without code changes.

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique config entry identifier |
| config_key | TEXT | NOT NULL, UNIQUE | Configuration key name |
| config_value | TEXT | NOT NULL | Configuration value (stored as text) |
| config_type | TEXT | DEFAULT 'string' | Data type hint (e.g., "string", "integer", "boolean") |
| description | TEXT | NULL | Human-readable description of the configuration |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Record creation timestamp |
| updated_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Last update timestamp (auto-updated via trigger) |

**Relationships:** None (standalone configuration table)

**Example Configuration Keys:**
- `app_name` - Application name
- `version` - Application version
- `default_session_duration` - Default contact log duration in minutes
- `upcoming_court_days` - Days to look ahead for upcoming court dates
- `max_file_size` - Maximum file size in bytes
- `backup_retention_days` - Days to retain backup files
- `default_timezone` - Default timezone
- `currency_symbol` - Currency symbol for financial displays

---

### 9. USER_SESSIONS

**Purpose:** Manage user authentication sessions for secure access to the system.

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique session identifier |
| session_token | TEXT | NOT NULL, UNIQUE | Unique session token for authentication |
| user_id | TEXT | NOT NULL | User identifier |
| expires_at | DATETIME | NOT NULL | Session expiration timestamp |
| created_at | DATETIME | DEFAULT CURRENT_TIMESTAMP | Session creation timestamp |

**Relationships:** None (standalone authentication table)

**Key Design Note:** Sessions expire automatically based on the `expires_at` timestamp.

---

### 10. AUDIT_LOG

**Purpose:** Comprehensive audit trail of all data changes for compliance and troubleshooting.

| Field Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT | Unique audit log entry identifier |
| table_name | TEXT | NOT NULL | Name of the table that was modified |
| record_id | INTEGER | NOT NULL | ID of the record that was modified |
| action | TEXT | NOT NULL, CHECK(IN 'CREATE', 'UPDATE', 'DELETE') | Type of action performed |
| old_values | TEXT | NULL | JSON string of old values (for UPDATE and DELETE) |
| new_values | TEXT | NULL | JSON string of new values (for CREATE and UPDATE) |
| user_id | TEXT | NULL | ID of the user who made the change |
| timestamp | DATETIME | DEFAULT CURRENT_TIMESTAMP | When the change occurred |

**Relationships:** None (tracks all tables generically)

**Indexes:**
- `idx_audit_log_record` on `(table_name, record_id)` - Fast retrieval of audit history for specific records

**Key Design Note:** This table provides a complete audit trail for legal compliance and data recovery.

---

## Database Triggers

The schema includes automatic timestamp update triggers for all primary tables:

1. **update_cases_timestamp** - Auto-updates `updated_at` on CASES modifications
2. **update_contacts_timestamp** - Auto-updates `updated_at` on CONTACTS modifications
3. **update_case_contacts_timestamp** - Auto-updates `updated_at` on CASE_CONTACTS modifications
4. **update_kanban_tasks_timestamp** - Auto-updates `updated_at` on KANBAN_TASKS modifications
5. **update_contact_logs_timestamp** - Auto-updates `updated_at` on CONTACT_LOGS modifications
6. **update_evidence_reviews_timestamp** - Auto-updates `updated_at` on EVIDENCE_REVIEWS modifications
7. **update_court_dates_timestamp** - Auto-updates `updated_at` on COURT_DATES modifications

---

## Performance Optimizations

### Indexing Strategy

All indexes are designed to support common query patterns:

- **Lookup by ID** - Primary keys provide automatic indexing
- **Filtering by status/type** - Indexed for dashboard views
- **Name searches** - Indexed for autocomplete and search features
- **Date-based queries** - Indexed for chronological reports and date filtering
- **Foreign key relationships** - Indexed for join performance
- **Cross-case queries** - Contact-based indexes support role conflict detection

### Cascade Deletes

All foreign key relationships use `ON DELETE CASCADE` to automatically clean up related records when a parent record is deleted:

- Deleting a CASE automatically deletes all related CASE_CONTACTS, KANBAN_TASKS, CONTACT_LOGS, EVIDENCE_REVIEWS, and COURT_DATES
- Deleting a CONTACT automatically deletes all related CASE_CONTACTS and CONTACT_LOGS

---

## Key Design Patterns

### 1. Central Contact Repository
Contacts are stored once and referenced by multiple cases, enabling:
- Cross-case visibility
- Role conflict detection
- Efficient contact management

### 2. Dynamic Role Assignment
The CASE_CONTACTS junction table allows:
- Same person in different roles across cases
- Flexible role definitions
- Role-based reporting

### 3. Time Tracking for Compliance
The CONTACT_LOGS table provides:
- Precise duration tracking
- Billing documentation
- Legal compliance records

### 4. Evidence Tracking for Court Reports
The EVIDENCE_REVIEWS table supports:
- Comprehensive material documentation
- Court report generation
- Review history

### 5. Audit Trail for Accountability
The AUDIT_LOG table ensures:
- Complete change history
- Compliance with legal requirements
- Data recovery capability

---

## Common Query Patterns

### Find All Contacts for a Case
```sql
SELECT c.*, cc.role, cc.role_notes
FROM contacts c
JOIN case_contacts cc ON c.id = cc.contact_id
WHERE cc.case_id = ?
ORDER BY c.name;
```

### Find All Cases for a Contact (Role Conflict Detection)
```sql
SELECT ca.*, cc.role
FROM cases ca
JOIN case_contacts cc ON ca.id = cc.case_id
WHERE cc.contact_id = ?
ORDER BY ca.case_name;
```

### Get Contact Logs for a Case with Time Totals
```sql
SELECT cl.*, c.name as contact_name,
       SUM(cl.duration_minutes) OVER (PARTITION BY cl.contact_id) as total_minutes
FROM contact_logs cl
JOIN contacts c ON cl.contact_id = c.id
WHERE cl.case_id = ?
ORDER BY cl.contact_date DESC;
```

### Get Upcoming Court Dates
```sql
SELECT cd.*, ca.case_name, ca.case_number
FROM court_dates cd
JOIN cases ca ON cd.case_id = ca.id
WHERE cd.court_date >= datetime('now')
  AND cd.court_date <= datetime('now', '+14 days')
ORDER BY cd.court_date ASC;
```

### Get Evidence Review Summary for Court Report
```sql
SELECT material_type, COUNT(*) as count,
       GROUP_CONCAT(material_title, '; ') as titles
FROM evidence_reviews
WHERE case_id = ?
GROUP BY material_type
ORDER BY material_type;
```

---

## Data Validation Rules

### CASES
- `status` must be one of: 'ACTIVE', 'WAITING_LIST', 'CLOSED'
- `case_number` must be unique if provided

### CONTACTS
- `email` must be unique across all contacts
- `name` is required

### CASE_CONTACTS
- Each (case_id, contact_id) pair must be unique
- `role` should follow predefined role types (enforced at application level)

### KANBAN_TASKS
- `status` must be one of: 'AGREEMENT_SIGNED', 'CLIENT_PAID', 'WORKING', 'PREPARING'
- `position` used for ordering within each status column

### CONTACT_LOGS
- `duration_minutes` must be non-negative (enforced at application level)
- `contact_date` cannot be in the future (enforced at application level)

### EVIDENCE_REVIEWS
- `material_type` must be one of the predefined types
- `review_date` typically not in the future

### COURT_DATES
- `court_date` typically in the future for upcoming dates

### AUDIT_LOG
- `action` must be one of: 'CREATE', 'UPDATE', 'DELETE'
- Values stored as JSON strings for flexibility

---

## Migration and Versioning

The database schema is maintained in `/database/schema.sql` and includes:

- **Version control** - Schema changes tracked via git
- **Seed data** - Sample data in `/database/seeds/sample_data.sql`
- **Initialization** - Fresh installation via `npm run db:migrate`
- **Backup strategy** - Regular backups configured via system_config

---

## Security Considerations

1. **Session Management** - USER_SESSIONS table provides secure authentication
2. **Audit Trail** - AUDIT_LOG tracks all changes for accountability
3. **Cascade Deletes** - Automatic cleanup prevents orphaned records
4. **Data Privacy** - All data stored locally in SQLite (no cloud transmission)
5. **Input Validation** - CHECK constraints and application-level validation

---

## Future Extensibility

The schema is designed for easy extension:

1. **Custom Fields** - SYSTEM_CONFIG table supports dynamic configuration
2. **New Roles** - Role types can be added without schema changes
3. **Additional Material Types** - Evidence material types expandable
4. **Task Types** - Kanban task types configurable
5. **Contact Types** - Contact log types extensible

---

## Summary

This database schema provides a comprehensive foundation for managing mental health therapist case tracking with emphasis on:

- **Relationship tracking** across multiple cases
- **Role conflict detection** through central contact repository
- **Time and billing compliance** through detailed logging
- **Court reporting** through evidence and date tracking
- **Audit and accountability** through comprehensive logging
- **Performance** through strategic indexing
- **Data integrity** through constraints and triggers

The schema balances flexibility with data integrity, supporting the complex workflows of court-involved reunification case management while maintaining simplicity for a small-team deployment.
