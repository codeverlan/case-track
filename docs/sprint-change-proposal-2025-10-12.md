# Sprint Change Proposal: Legal Case Relationship Tracking System

**Date**: 2025-10-12
**User**: Tyler
**Change Scope**: Major - New Project Direction
**Execution Mode**: Batch

---

## Section 1: Issue Summary

### Problem Statement
The existing BMAD framework infrastructure, while comprehensive for business process automation, does not align with the immediate functional requirement for a legal case relationship tracking database application.

### Context & Discovery
- **Trigger**: User clarification of project requirements during workflow execution
- **Core Need**: Fast web-based database for tracking complex legal case relationships
- **Key Insight**: This is not typical legal aid software - requires modern, streamlined approach

### Supporting Evidence
- **User Requirements**: SQLite backend, web frontend, contact-centric architecture
- **Scope**: Central contacts database with customizable fields
- **Differentiator**: Focus on relationship complexity in legal cases

---

## Section 2: Impact Analysis

### Epic Impact
**Current State**: BMAD framework epics for business process automation
**Required Change**: Complete pivot to application development epics

**Impact Assessment**:
- **Existing Epics**: Not applicable to new project direction
- **New Epics Required**: Database design, frontend development, contact management, custom field framework
- **Priority**: High - foundational work required

### Story Impact
**Current Stories**: No active development stories exist
**Impact**: All future stories will focus on legal case tracking functionality

### Artifact Conflicts
- **PRD**: New document required for legal case tracking system
- **Architecture**: Complete restructure from agent system to web application
- **UI/UX**: New interface design for legal professionals
- **Technical Stack**: Node.js/React/SQLite instead of BMAD framework

### Technical Impact
- **Database**: SQLite implementation with custom field schema
- **Frontend**: Modern web application (React + TypeScript)
- **Backend**: RESTful API for database operations
- **Deployment**: Web-based application deployment

---

## Section 3: Recommended Approach

### Selected Path: Direct Adjustment with BMAD Integration

**Decision**: Leverage existing BMAD framework to build the legal case tracking system

### Rationale
1. **Infrastructure Foundation**: BMAD provides project structure and development workflows
2. **Agent System**: Can utilize development agents for rapid implementation
3. **Documentation Framework**: Existing markdown and documentation patterns
4. **Testing Framework**: BMAD testing strategies can be adapted

### Implementation Strategy
- **Hybrid Approach**: Use BMAD framework to manage development of the legal application
- **Leverage Strengths**: Agent-based development workflows and documentation
- **Maintain Flexibility**: Keep BMAD infrastructure for future process automation needs

### Effort & Risk Assessment
- **Implementation Effort**: Medium (2-3 weeks for MVP)
- **Technical Risk**: Low (well-established technology stack)
- **Timeline Impact**: Accelerated development using existing BMAD workflows
- **Success Probability**: High (clear requirements and focused scope)

---

## Section 4: Detailed Change Proposals

### PRD Creation
**File**: `docs/legal-case-tracker-prd.md`

**Core Sections**:
- Product vision for legal case relationship tracking
- MVP feature set (SQLite + web frontend + contact management)
- User personas (legal professionals)
- Key differentiators from typical legal aid software
- Success criteria and performance requirements

### Architecture Document
**File**: `docs/architecture.md`

**Technology Stack**:
- Backend: Node.js + Express + SQLite
- Frontend: React 18 + TypeScript + Vite
- Database: SQLite with custom field framework
- API: RESTful design for CRUD operations
- Styling: Tailwind CSS for rapid UI development

**Database Schema**:
```sql
-- Core contacts table
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    role TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Custom fields definition
CREATE TABLE custom_fields (
    id INTEGER PRIMARY KEY,
    field_name TEXT NOT NULL,
    field_type TEXT NOT NULL, -- text, number, date, boolean
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Custom field values for contacts
CREATE TABLE contact_custom_values (
    id INTEGER PRIMARY KEY,
    contact_id INTEGER,
    field_id INTEGER,
    value TEXT,
    FOREIGN KEY (contact_id) REFERENCES contacts(id),
    FOREIGN KEY (field_id) REFERENCES custom_fields(id)
);
```

### Development Epics & Stories

**Epic 1: Foundation & Database Setup**
- Story 1.1: Initialize Node.js project with SQLite integration
- Story 1.2: Implement core database schema and migrations
- Story 1.3: Create basic contact CRUD operations
- Story 1.4: Setup Express API endpoints

**Epic 2: Frontend Development**
- Story 2.1: Initialize React + Vite project structure
- Story 2.2: Create contact management UI components
- Story 2.3: Implement contact list and detail views
- Story 2.4: Add contact creation and editing forms

**Epic 3: Custom Field Framework**
- Story 3.1: Design custom field data model and API
- Story 3.2: Build field definition management interface
- Story 3.3: Implement dynamic field rendering in contact forms
- Story 3.4: Add field type validation and data types

**Epic 4: Case Relationship Tracking**
- Story 4.1: Design case-contact relationship model
- Story 4.2: Create relationship management interface
- Story 4.3: Implement relationship visualization
- Story 4.4: Add search and filtering capabilities

### UI/UX Specifications
**File**: `docs/ui-ux-specs.md`

**Design Principles**:
- Clean, professional interface for legal professionals
- Fast, responsive interactions
- Intuitive contact and relationship management
- Modern, non-traditional legal software aesthetic

**Key Screens**:
1. **Contact Dashboard**: Overview of all contacts with search/filter
2. **Contact Detail**: Full contact information with custom fields
3. **Relationship Map**: Visual representation of case relationships
4. **Field Management**: Interface for defining custom fields

---

## Section 5: Implementation Handoff

### Change Scope Classification: **MAJOR**

**Rationale**: Fundamental shift from business process automation framework to functional legal application

### Handoff Plan

**Primary Route**: Product Manager / Solution Architect
- **Reasoning**: Strategic project direction change requiring architectural decisions
- **Deliverables**: Complete Sprint Change Proposal + Implementation roadmap

**Secondary Route**: Development Team (via BMAD agents)
- **Reasoning**: Technical implementation can leverage existing BMAD development workflows
- **Deliverables**: Epic breakdown + Technical specifications + Database schema

### Implementation Responsibilities

**Product Manager**:
- Finalize PRD and prioritize features
- Define MVP scope and success criteria
- Coordinate stakeholder requirements

**Solution Architect**:
- Finalize technology stack decisions
- Design database schema and API contracts
- Plan deployment and scaling strategy

**Development Team**:
- Implement database schema and migrations
- Build frontend application
- Create custom field framework
- Implement contact and relationship management

**Scrum Master**:
- Organize development sprints
- Manage backlog and story prioritization
- Facilitate team coordination

### Success Criteria

1. **Functional MVP**: Working SQLite database with web frontend
2. **Contact Management**: Full CRUD operations for contacts
3. **Custom Fields**: Working system for adding/editing custom contact fields
4. **Performance**: Fast, responsive web interface
5. **Code Quality**: Well-structured, maintainable codebase

### Timeline Estimate
- **Week 1**: Foundation setup, database design, basic CRUD operations
- **Week 2**: Frontend development, contact management UI
- **Week 3**: Custom field framework, relationship tracking
- **Week 4**: Testing, refinement, deployment preparation

---

## User Approval Required

**Question**: Do you approve this Sprint Change Proposal for implementing a Legal Case Relationship Tracking System?

**Options**:
- **Yes**: Proceed with implementation using BMAD framework for development
- **No**: Revise approach or reconsider project direction
- **Revise**: Modify specific aspects of the proposal

**Impact of Approval**:
- Immediate shift from BMAD framework maintenance to application development
- Utilization of existing BMAD development agents and workflows
- Creation of functional legal case tracking application with SQLite backend

---

*This proposal leverages existing BMAD infrastructure while delivering the functional legal case tracking system you need. The hybrid approach allows us to build quickly while maintaining the powerful development workflows already established.*