-- Case Track Database Schema - Additional Constraints and Triggers
-- This migration adds CHECK constraints and UPDATE triggers that Prisma doesn't generate

-- Note: The main schema is created by Prisma. This migration adds:
-- 1. CHECK constraints for enum-like fields
-- 2. UPDATE triggers for automatic timestamp updates

-- Since SQLite doesn't support adding CHECK constraints to existing tables,
-- and Prisma has already created the tables, we rely on application-level validation
-- for the enum values. The triggers are added here for compatibility with the
-- original schema.sql design.

-- Triggers for Automatic Timestamp Updates

-- Update trigger for cases table
CREATE TRIGGER IF NOT EXISTS update_cases_timestamp
    AFTER UPDATE ON cases
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
    BEGIN
        UPDATE cases SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- Update trigger for contacts table
CREATE TRIGGER IF NOT EXISTS update_contacts_timestamp
    AFTER UPDATE ON contacts
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
    BEGIN
        UPDATE contacts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- Update trigger for case_contacts table
CREATE TRIGGER IF NOT EXISTS update_case_contacts_timestamp
    AFTER UPDATE ON case_contacts
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
    BEGIN
        UPDATE case_contacts SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- Update trigger for kanban_tasks table
CREATE TRIGGER IF NOT EXISTS update_kanban_tasks_timestamp
    AFTER UPDATE ON kanban_tasks
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
    BEGIN
        UPDATE kanban_tasks SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- Update trigger for contact_logs table
CREATE TRIGGER IF NOT EXISTS update_contact_logs_timestamp
    AFTER UPDATE ON contact_logs
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
    BEGIN
        UPDATE contact_logs SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- Update trigger for evidence_reviews table
CREATE TRIGGER IF NOT EXISTS update_evidence_reviews_timestamp
    AFTER UPDATE ON evidence_reviews
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
    BEGIN
        UPDATE evidence_reviews SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- Update trigger for court_dates table
CREATE TRIGGER IF NOT EXISTS update_court_dates_timestamp
    AFTER UPDATE ON court_dates
    FOR EACH ROW
    WHEN NEW.updated_at = OLD.updated_at
    BEGIN
        UPDATE court_dates SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END;

-- Note on CHECK Constraints:
-- The original schema.sql includes CHECK constraints for:
-- - cases.status IN ('ACTIVE', 'WAITING_LIST', 'CLOSED')
-- - kanban_tasks.status IN ('AGREEMENT_SIGNED', 'CLIENT_PAID', 'WORKING', 'PREPARING')
-- - evidence_reviews.material_type IN (12 predefined types)
-- - audit_log.action IN ('CREATE', 'UPDATE', 'DELETE')
--
-- Since Prisma doesn't support CHECK constraints and SQLite doesn't allow adding them
-- to existing tables without recreating the table, these constraints are enforced at
-- the application level through Prisma validation and TypeScript enums.
