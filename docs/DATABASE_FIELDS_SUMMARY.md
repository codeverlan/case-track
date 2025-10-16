# Database Fields Summary - Quick Reference

**Date:** 2025-10-16  
**Database:** Case Track - Mental Health Therapist Case Tracking System

---

## All Database Tables at a Glance

| # | Table Name | Purpose | Record Count (Typical) |
|---|------------|---------|----------------------|
| 1 | CASES | Core legal cases being managed | 10-50 |
| 2 | CONTACTS | Central repository of all contacts | 50-200 |
| 3 | CASE_CONTACTS | Links cases to contacts with roles | 100-500 |
| 4 | KANBAN_TASKS | Visual task management per case | 50-200 |
| 5 | CONTACT_LOGS | Time tracking for all interactions | 500-2000 |
| 6 | EVIDENCE_REVIEWS | Materials reviewed for court | 100-500 |
| 7 | COURT_DATES | Court appearances and deadlines | 50-200 |
| 8 | SYSTEM_CONFIG | Application configuration | 10-20 |
| 9 | USER_SESSIONS | Authentication sessions | 1-10 |
| 10 | AUDIT_LOG | Complete change history | 1000+ |

---

## Complete Field List by Table

### 1. CASES (7 fields)

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INTEGER | No | PK | AUTO | Unique identifier |
| case_name | TEXT | No | | | Case name (e.g., "Johnson Family Reunification") |
| case_number | TEXT | Yes | UNIQUE | | Court case number (e.g., "CF-2024-001") |
| case_description | TEXT | Yes | | | Detailed description |
| status | TEXT | No | INDEX | 'ACTIVE' | Status: ACTIVE, WAITING_LIST, CLOSED |
| created_at | DATETIME | No | | NOW | Creation timestamp |
| updated_at | DATETIME | No | | NOW | Last update timestamp |

### 2. CONTACTS (7 fields)

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INTEGER | No | PK | AUTO | Unique identifier |
| name | TEXT | No | INDEX | | Full name |
| email | TEXT | Yes | UNIQUE, INDEX | | Email address |
| phone | TEXT | Yes | | | Phone number |
| address | TEXT | Yes | | | Physical address |
| notes | TEXT | Yes | | | General notes |
| created_at | DATETIME | No | | NOW | Creation timestamp |
| updated_at | DATETIME | No | | NOW | Last update timestamp |

### 3. CASE_CONTACTS (7 fields)

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INTEGER | No | PK | AUTO | Unique identifier |
| case_id | INTEGER | No | FK, INDEX | | Reference to CASES table |
| contact_id | INTEGER | No | FK, INDEX | | Reference to CONTACTS table |
| role | TEXT | No | INDEX | | Role in case (PARENT, ATTORNEY, GAL, etc.) |
| role_notes | TEXT | Yes | | | Additional role notes |
| created_at | DATETIME | No | | NOW | Creation timestamp |
| updated_at | DATETIME | No | | NOW | Last update timestamp |
| | | | UNIQUE(case_id, contact_id) | | One role per contact per case |

### 4. KANBAN_TASKS (11 fields)

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INTEGER | No | PK | AUTO | Unique identifier |
| case_id | INTEGER | No | FK, INDEX | | Reference to CASES table |
| title | TEXT | No | | | Task title |
| description | TEXT | Yes | | | Detailed description |
| status | TEXT | No | INDEX | 'WORKING' | Column: AGREEMENT_SIGNED, CLIENT_PAID, WORKING, PREPARING |
| task_type | TEXT | Yes | | 'OTHER' | Type: ASSESSMENT, SESSION, DOCUMENTATION, etc. |
| position | INTEGER | No | | 0 | Position within status column |
| due_date | DATETIME | Yes | | | Task deadline |
| completed_at | DATETIME | Yes | | | Completion timestamp |
| created_at | DATETIME | No | | NOW | Creation timestamp |
| updated_at | DATETIME | No | | NOW | Last update timestamp |

### 5. CONTACT_LOGS (10 fields)

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INTEGER | No | PK | AUTO | Unique identifier |
| case_id | INTEGER | No | FK, INDEX | | Reference to CASES table |
| contact_id | INTEGER | No | FK, INDEX | | Reference to CONTACTS table |
| description | TEXT | No | | | Interaction description |
| duration_minutes | INTEGER | No | | 0 | Duration in minutes |
| contact_date | DATETIME | No | INDEX | | Date and time of interaction |
| contact_type | TEXT | Yes | | 'OTHER' | Type: SESSION, COMMUNICATION, ASSESSMENT, REVIEW |
| notes | TEXT | Yes | | | Additional notes |
| created_at | DATETIME | No | | NOW | Creation timestamp |
| updated_at | DATETIME | No | | NOW | Last update timestamp |

### 6. EVIDENCE_REVIEWS (10 fields)

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INTEGER | No | PK | AUTO | Unique identifier |
| case_id | INTEGER | No | FK, INDEX | | Reference to CASES table |
| material_type | TEXT | No | | | Type: PDF, AUDIO, VIDEO, DOCUMENT, etc. (12 types) |
| material_title | TEXT | No | | | Title of material |
| material_description | TEXT | Yes | | | Detailed description |
| review_date | DATETIME | No | INDEX | | Date reviewed |
| reviewer_notes | TEXT | Yes | | | Review observations |
| file_reference | TEXT | Yes | | | External file reference (not stored in DB) |
| created_at | DATETIME | No | | NOW | Creation timestamp |
| updated_at | DATETIME | No | | NOW | Last update timestamp |

### 7. COURT_DATES (9 fields)

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INTEGER | No | PK | AUTO | Unique identifier |
| case_id | INTEGER | No | FK, INDEX | | Reference to CASES table |
| court_date | DATETIME | No | INDEX | | Date and time of court event |
| description | TEXT | No | | | Event description (e.g., "Status Review Hearing") |
| location | TEXT | Yes | | | Court location (e.g., "Family Court, Room 201") |
| judge | TEXT | Yes | | | Presiding judge name |
| outcome | TEXT | Yes | | | Result (filled after event) |
| created_at | DATETIME | No | | NOW | Creation timestamp |
| updated_at | DATETIME | No | | NOW | Last update timestamp |

### 8. SYSTEM_CONFIG (7 fields)

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INTEGER | No | PK | AUTO | Unique identifier |
| config_key | TEXT | No | UNIQUE | | Configuration key name |
| config_value | TEXT | No | | | Configuration value |
| config_type | TEXT | Yes | | 'string' | Data type hint (string, integer, boolean) |
| description | TEXT | Yes | | | Human-readable description |
| created_at | DATETIME | No | | NOW | Creation timestamp |
| updated_at | DATETIME | No | | NOW | Last update timestamp |

### 9. USER_SESSIONS (5 fields)

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INTEGER | No | PK | AUTO | Unique identifier |
| session_token | TEXT | No | UNIQUE | | Unique session token |
| user_id | TEXT | No | | | User identifier |
| expires_at | DATETIME | No | | | Session expiration |
| created_at | DATETIME | No | | NOW | Session creation |

### 10. AUDIT_LOG (8 fields)

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INTEGER | No | PK | AUTO | Unique identifier |
| table_name | TEXT | No | INDEX | | Table that was modified |
| record_id | INTEGER | No | INDEX | | ID of modified record |
| action | TEXT | No | | | Action: CREATE, UPDATE, DELETE |
| old_values | TEXT | Yes | | | JSON of old values |
| new_values | TEXT | Yes | | | JSON of new values |
| user_id | TEXT | Yes | | | User who made change |
| timestamp | DATETIME | No | | NOW | When change occurred |

---

## Total Field Count

| Table | Fields | Primary Key | Foreign Keys | Indexes |
|-------|--------|-------------|--------------|---------|
| CASES | 7 | 1 | 0 | 2 |
| CONTACTS | 7 | 1 | 0 | 2 |
| CASE_CONTACTS | 7 | 1 | 2 | 3 |
| KANBAN_TASKS | 11 | 1 | 1 | 2 |
| CONTACT_LOGS | 10 | 1 | 2 | 3 |
| EVIDENCE_REVIEWS | 10 | 1 | 1 | 2 |
| COURT_DATES | 9 | 1 | 1 | 2 |
| SYSTEM_CONFIG | 7 | 1 | 0 | 0 |
| USER_SESSIONS | 5 | 1 | 0 | 0 |
| AUDIT_LOG | 8 | 1 | 0 | 1 |
| **TOTAL** | **81** | **10** | **8** | **17** |

---

## Relationship Matrix

| From Table | To Table | Relationship Type | Foreign Key | On Delete |
|------------|----------|-------------------|-------------|-----------|
| CASE_CONTACTS | CASES | Many-to-One | case_id | CASCADE |
| CASE_CONTACTS | CONTACTS | Many-to-One | contact_id | CASCADE |
| KANBAN_TASKS | CASES | Many-to-One | case_id | CASCADE |
| CONTACT_LOGS | CASES | Many-to-One | case_id | CASCADE |
| CONTACT_LOGS | CONTACTS | Many-to-One | contact_id | CASCADE |
| EVIDENCE_REVIEWS | CASES | Many-to-One | case_id | CASCADE |
| COURT_DATES | CASES | Many-to-One | case_id | CASCADE |

---

## Enumerated Values (Predefined Options)

### Case Status Options
- `ACTIVE` - Currently active case
- `WAITING_LIST` - Case on waiting list
- `CLOSED` - Case closed/completed

### Kanban Task Status (Board Columns)
- `AGREEMENT_SIGNED` - Initial agreements and intake
- `CLIENT_PAID` - Financial obligations met
- `WORKING` - Active work in progress
- `PREPARING` - Final preparation and reports

### Contact Roles (Common Values)
- `PARENT` - Parent in the case
- `CHILD` - Child in the case
- `ATTORNEY` - Legal counsel
- `GAL` - Guardian Ad Litem
- `THERAPIST` - Treating therapist
- `JUDGE` - Presiding judge
- `SOCIAL_WORKER` - Case worker
- `FOC` - Friend of the Court

### Task Types
- `ASSESSMENT` - Assessment activities
- `SESSION` - Therapy sessions
- `DOCUMENTATION` - Documentation tasks
- `COURT_PREP` - Court preparation
- `COMMUNICATION` - Communications
- `REVIEW` - Review activities
- `OTHER` - Other tasks

### Contact Log Types
- `SESSION` - Therapy session
- `COMMUNICATION` - Phone/email/meeting
- `ASSESSMENT` - Assessment activity
- `REVIEW` - Review activity
- `OTHER` - Other contact types

### Evidence Material Types
- `PDF` - PDF documents
- `AUDIO` - Audio recordings
- `VIDEO` - Video recordings
- `DOCUMENT` - General documents
- `IMAGE` - Image files
- `SPREADSHEET` - Spreadsheet files
- `PRESENTATION` - Presentation files
- `EMAIL` - Email communications
- `TEXT_MESSAGE` - Text messages
- `MEDICAL_RECORD` - Medical records
- `LEGAL_DOCUMENT` - Legal documents
- `OTHER` - Other material types

### Audit Log Actions
- `CREATE` - Record created
- `UPDATE` - Record updated
- `DELETE` - Record deleted

---

## Index Summary

| Index Name | Table | Column(s) | Purpose |
|------------|-------|-----------|---------|
| idx_cases_status | CASES | status | Filter by case status |
| idx_cases_name | CASES | case_name | Search cases by name |
| idx_contacts_name | CONTACTS | name | Search contacts by name |
| idx_contacts_email | CONTACTS | email | Lookup by email |
| idx_case_contacts_case_id | CASE_CONTACTS | case_id | Get all contacts for case |
| idx_case_contacts_contact_id | CASE_CONTACTS | contact_id | Get all cases for contact |
| idx_case_contacts_role | CASE_CONTACTS | role | Filter by role type |
| idx_kanban_tasks_case_id | KANBAN_TASKS | case_id | Get tasks for case |
| idx_kanban_tasks_status | KANBAN_TASKS | status | Filter by task status |
| idx_contact_logs_case_id | CONTACT_LOGS | case_id | Get logs for case |
| idx_contact_logs_contact_id | CONTACT_LOGS | contact_id | Get logs for contact |
| idx_contact_logs_date | CONTACT_LOGS | contact_date | Filter by date |
| idx_evidence_reviews_case_id | EVIDENCE_REVIEWS | case_id | Get evidence for case |
| idx_evidence_reviews_date | EVIDENCE_REVIEWS | review_date | Filter by date |
| idx_court_dates_case_id | COURT_DATES | case_id | Get court dates for case |
| idx_court_dates_date | COURT_DATES | court_date | Filter by date |
| idx_audit_log_record | AUDIT_LOG | table_name, record_id | Get audit history |

---

## Database Size Estimates

Based on typical usage for a single therapist:

| Table | Avg Row Size | 1 Year Data | Storage |
|-------|--------------|-------------|---------|
| CASES | ~200 bytes | 20 cases | 4 KB |
| CONTACTS | ~300 bytes | 100 contacts | 30 KB |
| CASE_CONTACTS | ~150 bytes | 200 relationships | 30 KB |
| KANBAN_TASKS | ~250 bytes | 100 tasks | 25 KB |
| CONTACT_LOGS | ~300 bytes | 1000 logs | 300 KB |
| EVIDENCE_REVIEWS | ~400 bytes | 200 reviews | 80 KB |
| COURT_DATES | ~250 bytes | 100 dates | 25 KB |
| SYSTEM_CONFIG | ~200 bytes | 15 configs | 3 KB |
| USER_SESSIONS | ~150 bytes | 5 sessions | 1 KB |
| AUDIT_LOG | ~500 bytes | 5000 entries | 2.5 MB |
| **TOTAL** | | | **~3 MB/year** |

---

## Key Points for Implementation

1. **All tables use INTEGER AUTOINCREMENT for primary keys**
2. **All main tables have automatic timestamp tracking** (created_at, updated_at)
3. **All foreign keys use CASCADE DELETE** for automatic cleanup
4. **Strategic indexing on frequently queried columns**
5. **CHECK constraints for data validation** on status and type fields
6. **UNIQUE constraints** on business-critical fields (email, case_number, session_token)
7. **Triggers automatically update timestamps** on all updates
8. **No files stored in database** - only references

---

## Usage Guidelines

### Adding a New Case
1. Insert into CASES table
2. Add contacts via CASE_CONTACTS with appropriate roles
3. Create initial tasks in KANBAN_TASKS
4. Add court dates to COURT_DATES

### Tracking Contact Time
1. Log each interaction in CONTACT_LOGS
2. Specify duration_minutes for billing
3. Reference both case_id and contact_id

### Recording Evidence Review
1. Insert into EVIDENCE_REVIEWS
2. Store file externally (not in DB)
3. Save file path/reference in file_reference field

### Role Conflict Detection
1. Query CASE_CONTACTS by contact_id
2. Check if same contact has multiple roles across cases
3. Alert user if potential conflict exists

---

## For More Details

See the complete documentation in `DATABASE_SCHEMA.md` for:
- Detailed field descriptions
- Common query patterns
- Performance considerations
- Security guidelines
- Migration strategies
