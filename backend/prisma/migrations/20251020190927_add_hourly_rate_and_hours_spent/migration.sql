-- CreateTable
CREATE TABLE "cases" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "case_name" TEXT NOT NULL,
    "case_number" TEXT,
    "case_description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "hourly_rate" REAL DEFAULT 0.0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "case_contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "case_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "role_notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "case_contacts_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "cases" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "case_contacts_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "kanban_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "case_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'WORKING',
    "task_type" TEXT DEFAULT 'OTHER',
    "position" INTEGER NOT NULL DEFAULT 0,
    "due_date" DATETIME,
    "completed_at" DATETIME,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "kanban_tasks_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "cases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contact_logs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "case_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "duration_minutes" INTEGER NOT NULL DEFAULT 0,
    "hours_spent" REAL DEFAULT 0.0,
    "contact_date" DATETIME NOT NULL,
    "contact_type" TEXT DEFAULT 'OTHER',
    "notes" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "contact_logs_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "cases" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "contact_logs_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contacts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "evidence_reviews" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "case_id" INTEGER NOT NULL,
    "material_type" TEXT NOT NULL,
    "material_title" TEXT NOT NULL,
    "material_description" TEXT,
    "review_date" DATETIME NOT NULL,
    "reviewer_notes" TEXT,
    "file_reference" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "evidence_reviews_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "cases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "court_dates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "case_id" INTEGER NOT NULL,
    "court_date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "judge" TEXT,
    "outcome" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "court_dates_case_id_fkey" FOREIGN KEY ("case_id") REFERENCES "cases" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "system_config" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "config_key" TEXT NOT NULL,
    "config_value" TEXT NOT NULL,
    "config_type" TEXT DEFAULT 'string',
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "audit_log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "table_name" TEXT NOT NULL,
    "record_id" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "old_values" TEXT,
    "new_values" TEXT,
    "user_id" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "cases_case_number_key" ON "cases"("case_number");

-- CreateIndex
CREATE INDEX "idx_cases_status" ON "cases"("status");

-- CreateIndex
CREATE INDEX "idx_cases_name" ON "cases"("case_name");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- CreateIndex
CREATE INDEX "idx_contacts_name" ON "contacts"("name");

-- CreateIndex
CREATE INDEX "idx_contacts_email" ON "contacts"("email");

-- CreateIndex
CREATE INDEX "idx_case_contacts_case_id" ON "case_contacts"("case_id");

-- CreateIndex
CREATE INDEX "idx_case_contacts_contact_id" ON "case_contacts"("contact_id");

-- CreateIndex
CREATE INDEX "idx_case_contacts_role" ON "case_contacts"("role");

-- CreateIndex
CREATE UNIQUE INDEX "case_contacts_case_id_contact_id_key" ON "case_contacts"("case_id", "contact_id");

-- CreateIndex
CREATE INDEX "idx_kanban_tasks_case_id" ON "kanban_tasks"("case_id");

-- CreateIndex
CREATE INDEX "idx_kanban_tasks_status" ON "kanban_tasks"("status");

-- CreateIndex
CREATE INDEX "idx_contact_logs_case_id" ON "contact_logs"("case_id");

-- CreateIndex
CREATE INDEX "idx_contact_logs_contact_id" ON "contact_logs"("contact_id");

-- CreateIndex
CREATE INDEX "idx_contact_logs_date" ON "contact_logs"("contact_date");

-- CreateIndex
CREATE INDEX "idx_evidence_reviews_case_id" ON "evidence_reviews"("case_id");

-- CreateIndex
CREATE INDEX "idx_evidence_reviews_date" ON "evidence_reviews"("review_date");

-- CreateIndex
CREATE INDEX "idx_court_dates_case_id" ON "court_dates"("case_id");

-- CreateIndex
CREATE INDEX "idx_court_dates_date" ON "court_dates"("court_date");

-- CreateIndex
CREATE UNIQUE INDEX "system_config_config_key_key" ON "system_config"("config_key");

-- CreateIndex
CREATE UNIQUE INDEX "user_sessions_session_token_key" ON "user_sessions"("session_token");

-- CreateIndex
CREATE INDEX "idx_audit_log_record" ON "audit_log"("table_name", "record_id");
