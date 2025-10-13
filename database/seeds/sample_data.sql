-- Sample Data for Case Track System
-- Mental Health Therapist Case Tracking System

-- Insert Sample Cases
INSERT INTO cases (case_name, case_number, case_description, status) VALUES
('Johnson Family Reunification', 'CF-2024-001', 'Family reunification case involving parents and two children', 'ACTIVE'),
('Smith Therapeutic Intervention', 'CF-2024-002', 'Court-ordered therapeutic services for adolescent', 'WORKING'),
('Williams Parenting Assessment', 'CF-2024-003', 'Parenting capacity evaluation for family court', 'PREPARING');

-- Insert Sample Contacts
INSERT INTO contacts (name, email, phone, address, notes) VALUES
('Sarah Johnson', 'sarah.johnson@email.com', '555-0101', '123 Oak Street, Springfield', 'Mother in Johnson case'),
('Michael Johnson', 'michael.j@email.com', '555-0102', '123 Oak Street, Springfield', 'Father in Johnson case'),
('Emily Johnson', NULL, NULL, '123 Oak Street, Springfield', 'Child (8 years old) in Johnson case'),
('David Johnson', NULL, NULL, '123 Oak Street, Springfield', 'Child (5 years old) in Johnson case'),
('Jennifer Smith', 'jennifer.smith@email.com', '555-0201', '456 Pine Avenue, Riverside', 'Mother in Smith case'),
('Robert Smith', 'robert.smith@email.com', '555-0202', '456 Pine Avenue, Riverside', 'Father in Smith case'),
('Alex Smith', NULL, NULL, '456 Pine Avenue, Riverside', 'Child (14 years old) in Smith case'),
('Mary Williams', 'mary.williams@email.com', '555-0301', '789 Elm Road, Hillside', 'Mother in Williams case'),
('James Williams', NULL, '555-0302', '789 Elm Road, Hillside', 'Father in Williams case'),
('Lisa Williams', NULL, NULL, '789 Elm Road, Hillside', 'Child (10 years old) in Williams case'),
('Judge Patricia Brown', 'judge.brown@court.gov', '555-1001', '100 Court House, Downtown', 'Family Court Judge'),
'Therapist Robert Chen', 'r.chen@therapy.org', '555-1002', '500 Therapy Center, Medical District', 'Court-appointed therapist'),
'Dr. Amanda Foster', 'dr.foster@psychology.org', '555-1003', '250 Psychology Building, University', 'Child psychologist'),
'Guardian Ad Litem Office', 'gal@legalaid.org', '555-1004', '200 Legal Aid Center, Downtown', 'GAL office contact'),
'Child Protective Services', 'cps@socialservices.gov', '555-1005', '300 Social Services Building, Government Plaza', 'CPS main office'),
'Susan Miller, Attorney', 'susan.miller@lawfirm.com', '555-1006', '150 Law Office Tower, Downtown', 'Family law attorney');

-- Insert Case-Contact Relationships with Roles
INSERT INTO case_contacts (case_id, contact_id, role, role_notes) VALUES
-- Johnson Family Case
(1, 1, 'PARENT', 'Mother seeking reunification'),
(1, 2, 'PARENT', 'Father seeking reunification'),
(1, 3, 'CHILD', '8-year-old child'),
(1, 4, 'CHILD', '5-year-old child'),
(1, 13, 'ATTORNEY', 'Represents mother'),
(1, 12, 'THERAPIST', 'Court-appointed therapist'),
(1, 14, 'GAL', 'Guardian ad litem for children'),
(1, 11, 'JUDGE', 'Presiding judge'),
-- Smith Case
(2, 5, 'PARENT', 'Mother of adolescent'),
(2, 6, 'PARENT', 'Father of adolescent'),
(2, 7, 'CHILD', '14-year-old adolescent'),
(2, 13, 'ATTORNEY', 'Represents both parents'),
(2, 12, 'THERAPIST', 'Primary therapist'),
(2, 15, 'SOCIAL_WORKER', 'Assigned case worker'),
-- Williams Case
(3, 8, 'PARENT', 'Mother seeking assessment'),
(3, 9, 'PARENT', 'Father being assessed'),
(3, 10, 'CHILD', '10-year-old child'),
(3, 14, 'GAL', 'Guardian for child'),
(3, 13, 'ATTORNEY', 'Legal representation'),
(3, 11, 'JUDGE', 'Court oversight');

-- Insert Sample Kanban Tasks
INSERT INTO kanban_tasks (case_id, title, description, status, task_type, position) VALUES
-- Johnson Family Tasks
(1, 'Initial Assessment Completed', 'Family assessment and intake documentation', 'AGREEMENT_SIGNED', 'ASSESSMENT', 0),
(1, 'Therapy Agreement Signed', 'Parent signed therapy agreement', 'CLIENT_PAID', 'DOCUMENTATION', 0),
(1, 'Weekly Therapy Sessions', 'Ongoing family therapy sessions', 'WORKING', 'SESSION', 0),
(1, 'Progress Monitoring', 'Regular progress reports to court', 'WORKING', 'DOCUMENTATION', 1),
(1, 'Court Report Preparation', 'Preparing final court report', 'PREPARING', 'COURT_PREP', 0),
-- Smith Case Tasks
(2, 'Intake Assessment', 'Adolescent initial assessment', 'WORKING', 'ASSESSMENT', 0),
(2, 'Individual Therapy', 'Weekly individual therapy sessions', 'WORKING', 'SESSION', 1),
(2, 'Family Meetings', 'Monthly family therapy sessions', 'WORKING', 'SESSION', 2),
(2, 'School Communication', 'Coordinate with school counselor', 'WORKING', 'COMMUNICATION', 3),
-- Williams Case Tasks
(3, 'Parenting Capacity Evaluation', 'Comprehensive parenting assessment', 'PREPARING', 'ASSESSMENT', 0),
(3, 'Home Visits', 'Conduct home environment assessments', 'WORKING', 'ASSESSMENT', 1),
(3, 'Reference Interviews', 'Interview references and collateral contacts', 'PREPARING', 'REVIEW', 1),
(3, 'Final Report Writing', 'Complete parenting capacity report', 'PREPARING', 'DOCUMENTATION', 2);

-- Insert Sample Contact Logs
INSERT INTO contact_logs (case_id, contact_id, description, duration_minutes, contact_date, contact_type, notes) VALUES
(1, 1, 'Individual therapy session with mother', 60, '2024-10-01 10:00:00', 'SESSION', 'Discussed parenting strategies and progress'),
(1, 2, 'Phone consultation with father', 30, '2024-10-02 14:30:00', 'COMMUNICATION', 'Discussed visitation schedule'),
(1, 3, 'Child therapy session', 45, '2024-10-03 15:00:00', 'SESSION', 'Play therapy with 8-year-old'),
(1, 14, 'GAL consultation', 45, '2024-10-04 11:00:00', 'COMMUNICATION', 'Discussed case progress and recommendations'),
(2, 5, 'Family therapy session', 90, '2024-10-01 13:00:00', 'SESSION', 'Family counseling with all members'),
(2, 7, 'Individual therapy with adolescent', 60, '2024-10-02 16:00:00', 'SESSION', 'Discussed school and peer relationships'),
(2, 15, 'Case coordination meeting', 30, '2024-10-03 10:00:00', 'COMMUNICATION', 'Coordinated services with CPS'),
(3, 8, 'Parenting assessment interview', 120, '2024-10-01 09:00:00', 'ASSESSMENT', 'Comprehensive parenting capacity interview'),
(3, 9, 'Father assessment interview', 120, '2024-10-02 09:00:00', 'ASSESSMENT', 'Assessed father involvement and capabilities'),
(3, 10, 'Child observation session', 60, '2024-10-03 14:00:00', 'ASSESSMENT', 'Observed parent-child interaction');

-- Insert Sample Evidence Reviews
INSERT INTO evidence_reviews (case_id, material_type, material_title, material_description, review_date, reviewer_notes, file_reference) VALUES
(1, 'PDF', 'Previous CPS Reports', 'Child Protective Services investigation reports from 2023', '2024-09-15 09:00:00', 'Reviewed for history and patterns', 'CPS_Reports_2023.pdf'),
(1, 'AUDIO', 'Parent Interviews', 'Audio recordings of initial parent interviews', '2024-09-20 14:00:00', 'Transcribed and analyzed for themes', 'Parent_Interviews_Sept2024.mp3'),
(1, 'DOCUMENT', 'School Records', 'Educational records and progress reports', '2024-09-25 10:00:00', 'Reviewed academic performance and behavior', 'School_Records_Johnson.pdf'),
(2, 'VIDEO', 'Family Therapy Sessions', 'Video recordings of family therapy sessions', '2024-09-18 15:00:00', 'Analyzed family dynamics and communication', 'Session_Recording_Sept18.mp4'),
(2, 'MEDICAL_RECORD', 'Psychological Evaluation', 'Previous psychological evaluation report', '2024-09-22 11:00:00', 'Reviewed diagnostic information and recommendations', 'Psych_Eval_Smith_2023.pdf'),
(3, 'LEGAL_DOCUMENT', 'Court Order', 'Original court order for parenting assessment', '2024-09-10 09:00:00', 'Reviewed specific requirements and timeline', 'Court_Order_Williams.pdf'),
(3, 'DOCUMENT', 'Reference Letters', 'Character references from community members', '2024-09-28 13:00:00', 'Evaluated parent reputation and community standing', 'Reference_Letters.pdf');

-- Insert Sample Court Dates
INSERT INTO court_dates (case_id, court_date, description, location, judge, outcome) VALUES
(1, '2024-11-15 09:00:00', 'Status Review Hearing', 'Family Court, Room 201', 'Judge Patricia Brown', NULL),
(1, '2024-12-20 14:00:00', 'Progress Report Due', 'Family Court, Room 201', 'Judge Patricia Brown', NULL),
(2, '2024-10-30 10:30:00', 'Therapy Progress Review', 'Juvenile Court, Room 105', 'Judge Patricia Brown', NULL),
(3, '2024-11-08 13:00:00', 'Assessment Report Submission', 'Family Court, Room 201', 'Judge Patricia Brown', NULL),
(3, '2024-11-22 09:00:00', 'Finding of Fact Hearing', 'Family Court, Room 201', 'Judge Patricia Brown', NULL);

-- Insert System Configuration
INSERT INTO system_config (config_key, config_value, config_type, description) VALUES
('app_name', 'Case Track', 'string', 'Application name'),
('version', '1.0.0', 'string', 'Application version'),
('default_session_duration', '60', 'integer', 'Default contact log duration in minutes'),
('upcoming_court_days', '14', 'integer', 'Days to look ahead for upcoming court dates'),
('max_file_size', '10485760', 'integer', 'Maximum file size in bytes (10MB)'),
('backup_retention_days', '90', 'integer', 'Days to retain backup files'),
('default_timezone', 'America/New_York', 'string', 'Default timezone for the application'),
('currency_symbol', '$', 'string', 'Currency symbol for financial displays');