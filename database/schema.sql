-- Case Track Database Schema
-- Mental Health Therapist Case Tracking System

-- Core Cases Table
CREATE TABLE cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_name TEXT NOT NULL,
    case_number TEXT UNIQUE,
    case_description TEXT,
    status TEXT NOT NULL CHECK(status IN ('ACTIVE', 'WAITING_LIST', 'CLOSED')) DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contacts Table
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Case-Contact Relationships with Dynamic Roles
CREATE TABLE case_contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    role TEXT NOT NULL,
    role_notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
    UNIQUE(case_id, contact_id)
);

-- Kanban Tasks for Case Management
CREATE TABLE kanban_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL CHECK(status IN ('AGREEMENT_SIGNED', 'CLIENT_PAID', 'WORKING', 'PREPARING')) DEFAULT 'WORKING',
    task_type TEXT DEFAULT 'OTHER',
    position INTEGER NOT NULL DEFAULT 0,
    due_date DATETIME,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

-- Contact Logs for Time Tracking
CREATE TABLE contact_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL DEFAULT 0,
    contact_date DATETIME NOT NULL,
    contact_type TEXT DEFAULT 'OTHER',
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);

-- Evidence Reviews for Court Reporting
CREATE TABLE evidence_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    material_type TEXT NOT NULL CHECK(material_type IN ('PDF', 'AUDIO', 'VIDEO', 'DOCUMENT', 'IMAGE', 'SPREADSHEET', 'PRESENTATION', 'EMAIL', 'TEXT_MESSAGE', 'MEDICAL_RECORD', 'LEGAL_DOCUMENT', 'OTHER')),
    material_title TEXT NOT NULL,
    material_description TEXT,
    review_date DATETIME NOT NULL,
    reviewer_notes TEXT,
    file_reference TEXT, -- Reference to external file (not stored in DB)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

-- Court Dates with Prominent Display
CREATE TABLE court_dates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id INTEGER NOT NULL,
    court_date DATETIME NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    judge TEXT,
    outcome TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id) ON DELETE CASCADE
);

-- System Configuration for Template Values
CREATE TABLE system_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    config_key TEXT NOT NULL UNIQUE,
    config_value TEXT NOT NULL,
    config_type TEXT DEFAULT 'string',
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- User Sessions (for authentication)
CREATE TABLE user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_token TEXT NOT NULL UNIQUE,
    user_id TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Activity Audit Trail
CREATE TABLE audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT NOT NULL,
    record_id INTEGER NOT NULL,
    action TEXT NOT NULL CHECK(action IN ('CREATE', 'UPDATE', 'DELETE')),
    old_values TEXT, -- JSON string of old values
    new_values TEXT, -- JSON string of new values
    user_id TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Performance
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_cases_name ON cases(case_name);
CREATE INDEX idx_contacts_name ON contacts(name);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_case_contacts_case_id ON case_contacts(case_id);
CREATE INDEX idx_case_contacts_contact_id ON case_contacts(contact_id);
CREATE INDEX idx_case_contacts_role ON case_contacts(role);
CREATE INDEX idx_kanban_tasks_case_id ON kanban_tasks(case_id);
CREATE INDEX idx_kanban_tasks_status ON kanban_tasks(status);
CREATE INDEX idx_contact_logs_case_id ON contact_logs(case_id);
CREATE INDEX idx_contact_logs_contact_id ON contact_logs(contact_id);
CREATE INDEX idx_contact_logs_date ON contact_logs(contact_date);
CREATE INDEX idx_evidence_reviews_case_id ON evidence_reviews(case_id);
CREATE INDEX idx_evidence_reviews_date ON evidence_reviews(review_date);
CREATE INDEX idx_court_dates_case_id ON court_dates(case_id);
CREATE INDEX idx_court_dates_date ON court_dates(court_date);
CREATE INDEX idx_audit_log_record ON audit_log(table_name, record_id);

-- Triggers for Automatic Timestamp Updates
CREATE TRIGGER update_cases_timestamp
    AFTER UPDATE ON cases
    FOR EACH ROW
    BEGIN
        UPDATE cases SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_contacts_timestamp
    AFTER UPDATE ON contacts
    FOR EACH ROW
    BEGIN
        UPDATE contacts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_case_contacts_timestamp
    AFTER UPDATE ON case_contacts
    FOR EACH ROW
    BEGIN
        UPDATE case_contacts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_kanban_tasks_timestamp
    AFTER UPDATE ON kanban_tasks
    FOR EACH ROW
    BEGIN
        UPDATE kanban_tasks SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_contact_logs_timestamp
    AFTER UPDATE ON contact_logs
    FOR EACH ROW
    BEGIN
        UPDATE contact_logs SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_evidence_reviews_timestamp
    AFTER UPDATE ON evidence_reviews
    FOR EACH ROW
    BEGIN
        UPDATE evidence_reviews SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

CREATE TRIGGER update_court_dates_timestamp
    AFTER UPDATE ON court_dates
    FOR EACH ROW
    BEGIN
        UPDATE court_dates SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;