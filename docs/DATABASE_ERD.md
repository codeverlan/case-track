# Entity Relationship Diagram (ERD)

**Database:** Case Track - Mental Health Therapist Case Tracking System  
**Date:** 2025-10-16

---

## Visual Entity Relationship Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                         CASE TRACK DATABASE SCHEMA                            │
└──────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐
│         CASES               │  Primary Entity: Legal Cases
├─────────────────────────────┤
│ PK  id                      │
│     case_name               │
│ UK  case_number             │
│     case_description        │
│     status                  │  ◄─── Values: ACTIVE, WAITING_LIST, CLOSED
│     created_at              │
│     updated_at              │
└────────────┬────────────────┘
             │
             │ 1
             │
             │ Many
     ┌───────┴─────────────────────────────────────────────┐
     │                                                       │
     ▼                                                       ▼
┌────────────────────────────┐                    ┌─────────────────────────┐
│    CASE_CONTACTS           │                    │     KANBAN_TASKS        │
├────────────────────────────┤                    ├─────────────────────────┤
│ PK  id                     │                    │ PK  id                  │
│ FK  case_id         ───────┤─── Relates to ────┤ FK  case_id             │
│ FK  contact_id             │                    │     title               │
│     role                   │                    │     description         │
│     role_notes             │                    │     status              │
│     created_at             │                    │     task_type           │
│     updated_at             │                    │     position            │
│ UQ  (case_id, contact_id)  │                    │     due_date            │
└─────────┬──────────────────┘                    │     completed_at        │
          │                                        │     created_at          │
          │ Many                                   │     updated_at          │
          │                                        └─────────────────────────┘
          │ 1
          │                                        ┌─────────────────────────┐
          ▼                                        │   CONTACT_LOGS          │
┌─────────────────────────────┐                   ├─────────────────────────┤
│        CONTACTS              │  Central Entity  │ PK  id                  │
├─────────────────────────────┤                   │ FK  case_id     ─────┐  │
│ PK  id                      │◄──────────────────┤ FK  contact_id       │  │
│     name                    │                   │     description      │  │
│ UK  email                   │     Many          │     duration_minutes │  │
│     phone                   │                   │     contact_date     │  │
│     address                 │                   │     contact_type     │  │
│     notes                   │                   │     notes            │  │
│     created_at              │                   │     created_at       │  │
│     updated_at              │                   │     updated_at       │  │
└─────────────────────────────┘                   └──────────────────────┼──┘
                                                                         │
          ┌──────────────────────────────────────────────────────────────┘
          │
          │                                        ┌─────────────────────────┐
          └────────────────────────────────────►  │  EVIDENCE_REVIEWS       │
                                                   ├─────────────────────────┤
                                                   │ PK  id                  │
                                                   │ FK  case_id             │
                                                   │     material_type       │
                                                   │     material_title      │
                                                   │     material_description│
                                                   │     review_date         │
                                                   │     reviewer_notes      │
                                                   │     file_reference      │
                                                   │     created_at          │
                                                   │     updated_at          │
                                                   └─────────────────────────┘

                                                   ┌─────────────────────────┐
                                                   │     COURT_DATES         │
                                                   ├─────────────────────────┤
                                                   │ PK  id                  │
                                                   │ FK  case_id             │
                                                   │     court_date          │
                                                   │     description         │
                                                   │     location            │
                                                   │     judge               │
                                                   │     outcome             │
                                                   │     created_at          │
                                                   │     updated_at          │
                                                   └─────────────────────────┘

┌─────────────────────────────┐    ┌─────────────────────────┐    ┌─────────────────────────┐
│     SYSTEM_CONFIG           │    │    USER_SESSIONS        │    │      AUDIT_LOG          │
├─────────────────────────────┤    ├─────────────────────────┤    ├─────────────────────────┤
│ PK  id                      │    │ PK  id                  │    │ PK  id                  │
│ UK  config_key              │    │ UK  session_token       │    │     table_name          │
│     config_value            │    │     user_id             │    │     record_id           │
│     config_type             │    │     expires_at          │    │     action              │
│     description             │    │     created_at          │    │     old_values (JSON)   │
│     created_at              │    └─────────────────────────┘    │     new_values (JSON)   │
│     updated_at              │                                    │     user_id             │
└─────────────────────────────┘    Standalone: Authentication     │     timestamp           │
                                                                   └─────────────────────────┘
Standalone: Configuration          Independent table              Standalone: Audit Trail
```

---

## Relationship Details

### Primary Relationships (Foreign Keys)

| Relationship | Type | From → To | Cascade | Description |
|--------------|------|-----------|---------|-------------|
| Case-to-CaseContact | 1:M | CASES → CASE_CONTACTS | DELETE CASCADE | One case has many contact relationships |
| Contact-to-CaseContact | 1:M | CONTACTS → CASE_CONTACTS | DELETE CASCADE | One contact can be in many cases |
| Case-to-KanbanTask | 1:M | CASES → KANBAN_TASKS | DELETE CASCADE | One case has many tasks |
| Case-to-ContactLog | 1:M | CASES → CONTACT_LOGS | DELETE CASCADE | One case has many contact logs |
| Contact-to-ContactLog | 1:M | CONTACTS → CONTACT_LOGS | DELETE CASCADE | One contact has many logged interactions |
| Case-to-EvidenceReview | 1:M | CASES → EVIDENCE_REVIEWS | DELETE CASCADE | One case has many evidence items |
| Case-to-CourtDate | 1:M | CASES → COURT_DATES | DELETE CASCADE | One case has many court dates |

### Junction Table

**CASE_CONTACTS** serves as a junction table with additional attributes:
- Links CASES (many) ←→ (many) CONTACTS
- Adds role information to the relationship
- Enables same contact to have different roles in different cases
- Unique constraint: (case_id, contact_id) - one role per contact per case

---

## Cardinality Notation

```
1    : One (exactly one)
M    : Many (zero or more)
1:M  : One-to-Many relationship
M:M  : Many-to-Many relationship (via junction table)
```

---

## Detailed Relationship Flow

### Case Management Flow
```
CASE (created)
  ↓
  ├─► CASE_CONTACTS (add contacts with roles)
  │     ↓
  │     └─► CONTACTS (reference existing or create new)
  │
  ├─► KANBAN_TASKS (create tasks)
  │
  ├─► COURT_DATES (schedule court dates)
  │
  ├─► EVIDENCE_REVIEWS (log evidence)
  │
  └─► CONTACT_LOGS (log interactions)
        ↓
        └─► CONTACTS (reference contact)
```

### Contact Cross-Case Visibility Flow
```
CONTACT (selected)
  ↓
  └─► CASE_CONTACTS (find all case relationships)
        ↓
        └─► CASES (display all cases where contact appears)
              ↓
              └─► Show different roles in different cases
                    (for role conflict detection)
```

### Audit Trail Flow
```
Any table modification (INSERT, UPDATE, DELETE)
  ↓
  └─► AUDIT_LOG (record change)
        ├─► table_name
        ├─► record_id
        ├─► action (CREATE/UPDATE/DELETE)
        ├─► old_values (JSON)
        ├─► new_values (JSON)
        └─► user_id
```

---

## Extended ERD with Attributes

### CASES → CASE_CONTACTS → CONTACTS (Many-to-Many)

```
┌─────────────────────┐
│       CASES         │
│ ─────────────────── │
│ • id (PK)           │
│ • case_name         │───────┐
│ • case_number       │       │ One Case
│ • case_description  │       │
│ • status            │       │
│ • created_at        │       │
│ • updated_at        │       │
└─────────────────────┘       │
                              │ has many
                              │
                              ▼
                    ┌──────────────────────────┐
                    │    CASE_CONTACTS         │
                    │ ──────────────────────── │
                    │ • id (PK)                │
                    │ • case_id (FK) ──────────┤──► Links to CASES
                    │ • contact_id (FK) ───────┤──► Links to CONTACTS
                    │ • role                   │    Stores: PARENT, ATTORNEY, 
                    │ • role_notes             │            GAL, THERAPIST, etc.
                    │ • created_at             │
                    │ • updated_at             │
                    │ • UNIQUE(case, contact)  │
                    └──────────────────────────┘
                              │
                              │ references
                              │
                              ▼
┌─────────────────────┐
│     CONTACTS        │
│ ─────────────────── │
│ • id (PK)           │◄──────┘
│ • name              │  One Contact
│ • email (UNIQUE)    │  can be in many Cases
│ • phone             │
│ • address           │
│ • notes             │
│ • created_at        │
│ • updated_at        │
└─────────────────────┘
```

### Time Tracking Relationships

```
┌─────────────────┐           ┌──────────────────┐           ┌─────────────────┐
│     CASES       │           │  CONTACT_LOGS    │           │   CONTACTS      │
│ ─────────────── │           │ ──────────────── │           │ ─────────────── │
│ • id            │──────────►│ • case_id (FK)   │           │ • id            │
│ • case_name     │   1:M     │ • contact_id (FK)│──────────►│ • name          │
│ • status        │           │ • description    │    M:1    │ • email         │
└─────────────────┘           │ • duration_min   │           └─────────────────┘
                              │ • contact_date   │
        Enables:              │ • contact_type   │              Enables:
        - Case-level          │ • notes          │              - Contact-level
          time reports        └──────────────────┘                time reports
        - Billing by case                                        - Billing by contact
```

### Evidence and Court Date Management

```
┌─────────────────┐
│     CASES       │
│ ─────────────── │
│ • id            │──────┬──────────┬
│ • case_name     │      │          │
│ • case_number   │      │          │
└─────────────────┘      │          │
         1               │          │
         │               │          │
    ┌────┴────┐     ┌────▼──────────▼───┐
    │  Many   │     │   Many       Many │
    ▼         ▼     ▼                   ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│EVIDENCE_     │   │COURT_DATES   │   │KANBAN_TASKS  │
│REVIEWS       │   │              │   │              │
│──────────────│   │──────────────│   │──────────────│
│• case_id(FK) │   │• case_id(FK) │   │• case_id(FK) │
│• material    │   │• court_date  │   │• title       │
│• title       │   │• description │   │• status      │
│• review_date │   │• location    │   │• position    │
│• notes       │   │• judge       │   │• due_date    │
└──────────────┘   └──────────────┘   └──────────────┘
```

---

## Cascade Delete Behavior

When a **CASE** is deleted:
```
DELETE CASES WHERE id = X
  ↓ (CASCADE)
  ├─► DELETE CASE_CONTACTS WHERE case_id = X
  ├─► DELETE KANBAN_TASKS WHERE case_id = X
  ├─► DELETE CONTACT_LOGS WHERE case_id = X
  ├─► DELETE EVIDENCE_REVIEWS WHERE case_id = X
  └─► DELETE COURT_DATES WHERE case_id = X
```

When a **CONTACT** is deleted:
```
DELETE CONTACTS WHERE id = Y
  ↓ (CASCADE)
  ├─► DELETE CASE_CONTACTS WHERE contact_id = Y
  └─► DELETE CONTACT_LOGS WHERE contact_id = Y
```

**Important:** CONTACTS are never automatically deleted when cases are removed. They remain in the system for historical purposes and potential reuse.

---

## Index Coverage Map

```
CASES
  └─► [idx_cases_status] on status
  └─► [idx_cases_name] on case_name

CONTACTS
  └─► [idx_contacts_name] on name
  └─► [idx_contacts_email] on email

CASE_CONTACTS
  └─► [idx_case_contacts_case_id] on case_id
  └─► [idx_case_contacts_contact_id] on contact_id
  └─► [idx_case_contacts_role] on role

KANBAN_TASKS
  └─► [idx_kanban_tasks_case_id] on case_id
  └─► [idx_kanban_tasks_status] on status

CONTACT_LOGS
  └─► [idx_contact_logs_case_id] on case_id
  └─► [idx_contact_logs_contact_id] on contact_id
  └─► [idx_contact_logs_date] on contact_date

EVIDENCE_REVIEWS
  └─► [idx_evidence_reviews_case_id] on case_id
  └─► [idx_evidence_reviews_date] on review_date

COURT_DATES
  └─► [idx_court_dates_case_id] on case_id
  └─► [idx_court_dates_date] on court_date

AUDIT_LOG
  └─► [idx_audit_log_record] on (table_name, record_id)
```

---

## Query Optimization Paths

### Get Case with All Related Data
```
CASES (id lookup)
  ↓ via idx_case_contacts_case_id
  ├─► CASE_CONTACTS
  │     ↓ via contact_id
  │     └─► CONTACTS
  │
  ↓ via idx_kanban_tasks_case_id
  ├─► KANBAN_TASKS
  │
  ↓ via idx_contact_logs_case_id
  ├─► CONTACT_LOGS
  │     ↓ via contact_id
  │     └─► CONTACTS
  │
  ↓ via idx_evidence_reviews_case_id
  ├─► EVIDENCE_REVIEWS
  │
  └─► via idx_court_dates_case_id
      └─► COURT_DATES
```

### Find Role Conflicts (Cross-Case Contact Analysis)
```
CONTACTS (contact_id lookup)
  ↓ via idx_case_contacts_contact_id
  └─► CASE_CONTACTS (all cases for this contact)
        ↓ group by case_id
        └─► Show different roles across cases
```

---

## Legend

```
PK   = Primary Key
FK   = Foreign Key
UK   = Unique Key
M    = Many
1    = One
─►   = Relationship direction
├─►  = Branch in relationship
└─►  = Last branch in relationship
```

---

## Design Principles Applied

1. **Normalization**: Third Normal Form (3NF) to minimize redundancy
2. **Central Contact Repository**: Single source of truth for contact data
3. **Junction Table Pattern**: CASE_CONTACTS enables flexible many-to-many with attributes
4. **Referential Integrity**: Foreign keys with CASCADE DELETE maintain consistency
5. **Audit Trail**: Non-intrusive logging via separate AUDIT_LOG table
6. **Performance**: Strategic indexing on frequently queried columns
7. **Timestamp Tracking**: Automatic created_at/updated_at on all main tables
8. **Soft Constraints**: Role and type values enforced at application level for flexibility

---

## Usage Scenarios

### Scenario 1: Creating a New Case
```
1. INSERT INTO CASES
2. INSERT INTO CASE_CONTACTS (link existing/new contacts with roles)
3. INSERT INTO KANBAN_TASKS (initial tasks)
4. INSERT INTO COURT_DATES (scheduled dates)
```

### Scenario 2: Detecting Role Conflicts
```
1. SELECT FROM CONTACTS WHERE name = ?
2. SELECT FROM CASE_CONTACTS WHERE contact_id = ? (get all cases)
3. GROUP BY case_id, show different roles
4. ALERT if same person has conflicting roles (e.g., GAL in one case, Attorney in another)
```

### Scenario 3: Generating Court Report
```
1. SELECT FROM CASES WHERE id = ?
2. SELECT FROM EVIDENCE_REVIEWS WHERE case_id = ?
3. SELECT FROM CONTACT_LOGS WHERE case_id = ? (time summary)
4. SELECT FROM COURT_DATES WHERE case_id = ?
5. Generate formatted report
```

---

This ERD documentation provides a complete visual and textual representation of the Case Track database schema, showing all relationships, cardinalities, and key design decisions.
