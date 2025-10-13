# Solution Architecture: Mental Health Therapist Case Tracking System

**Author:** Tyler
**Date:** 2025-10-12
**Project Level:** 3
**Development Approach:** Template-based with natural language configuration
**Target Users:** 1-3 mental health therapists

---

## Executive Summary

This architecture outlines a template-based web application designed specifically for mental health therapists managing court-involved reunification cases. The system prioritizes ease of maintenance through natural language configuration and templates, enabling non-technical users to customize and extend functionality without coding expertise.

## Technology and Library Decisions

| Category | Technology | Version | Rationale |
|----------|------------|---------|-----------|
| **Frontend Framework** | React | 18.3.1 | Component-based, extensive template ecosystem |
| **Build Tool** | Vite | 5.4.0 | Fast development, simple configuration |
| **Language** | TypeScript | 5.5.0 | Type safety for template integration |
| **UI Library** | Material UI (MUI) | 5.16.0 | Rich component library, customizable themes |
| **State Management** | Zustand | 4.5.0 | Simple, template-friendly state management |
| **Backend Runtime** | Node.js | 20.18.0 | Mature ecosystem, good template support |
| **Backend Framework** | Express | 4.19.0 | Simple, well-documented, template-friendly |
| **Database** | SQLite | 3.45.3 | File-based, no server administration required |
| **Database ORM** | Prisma | 5.16.0 | Type-safe, schema-first, generates templates |
| **Form Management** | React Hook Form | 7.53.0 | Template-friendly form generation |
| **Styling** | Emotion (MUI) | 11.11.0 | Component-scoped styling, theme support |
| **File Handling** | Express File Upload | 1.5.0 | Simple file upload for evidence logging |
| **Date Handling** | Day.js | 1.11.12 | Lightweight date manipulation |
| **PDF Generation** | React PDF | 7.5.1 | Template-based court report generation |
| **Development Server** | Concurrently | 8.2.2 | Run frontend and backend together |
| **Testing** | Vitest | 1.6.0 | Fast unit testing for template validation |

## Repository and Service Architecture

### Repository Strategy: Monorepo
```
case-track/
├── frontend/                 # React frontend application
├── backend/                  # Node.js Express API
├── database/                 # Database schemas and migrations
├── templates/                # Customizable templates
├── config/                   # Natural language configuration
└── docs/                     # Documentation
```

### Architecture Style: Monolith with Template Layer
- **Frontend**: Single React application with template-based components
- **Backend**: Express API with natural language configuration
- **Database**: SQLite with schema templates
- **Templates**: Central system for UI and business logic customization

## System Architecture

### Component Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Template Layer                            │
├─────────────────────────────────────────────────────────────┤
│  Field Templates  │  UI Templates  │  Report Templates      │
├─────────────────────────────────────────────────────────────┤
│                  Frontend (React)                           │
├─────────────────────────────────────────────────────────────┤
│  Case Management  │  Contact System  │  Kanban Boards       │
├─────────────────────────────────────────────────────────────┤
│                   Backend (Express)                         │
├─────────────────────────────────────────────────────────────┤
│  API Endpoints    │  Business Logic  │  Template Engine     │
├─────────────────────────────────────────────────────────────┤
│                   Database (SQLite)                         │
├─────────────────────────────────────────────────────────────┤
│  Cases            │  Contacts        │  Evidence            │
│  Contact Logs     │  Court Dates     │  Custom Fields       │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Architecture
```
User Interface (Template-Driven)
       ↓
React Components (Template-Based)
       ↓
API Calls (Natural Language Routes)
       ↓
Express Handlers (Template Processing)
       ↓
Business Logic (Configurable Rules)
       ↓
Prisma ORM (Generated from Schema Templates)
       ↓
SQLite Database (Template-Defined Schema)
```

## Data Architecture

### Database Schema (Template-Driven)

```sql
-- Core Cases Table
CREATE TABLE cases (
    id INTEGER PRIMARY KEY,
    case_name TEXT NOT NULL,
    case_number TEXT UNIQUE,
    status TEXT CHECK(status IN ('ACTIVE', 'WAITING_LIST', 'CLOSED')) DEFAULT 'ACTIVE',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contacts Table with Template-Driven Custom Fields
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Case-Contact Relationships with Dynamic Roles
CREATE TABLE case_contacts (
    id INTEGER PRIMARY KEY,
    case_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    role TEXT NOT NULL, -- Template-driven roles
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id),
    FOREIGN KEY (contact_id) REFERENCES contacts(id)
);

-- Kanban Tasks
CREATE TABLE kanban_tasks (
    id INTEGER PRIMARY KEY,
    case_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT CHECK(status IN ('AGREEMENT_SIGNED', 'CLIENT_PAID', 'WORKING', 'PREPARING')),
    position INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id)
);

-- Contact Logs
CREATE TABLE contact_logs (
    id INTEGER PRIMARY KEY,
    case_id INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    duration_minutes INTEGER NOT NULL,
    contact_date DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id),
    FOREIGN KEY (contact_id) REFERENCES contacts(id)
);

-- Evidence Reviews
CREATE TABLE evidence_reviews (
    id INTEGER PRIMARY KEY,
    case_id INTEGER NOT NULL,
    material_type TEXT NOT NULL, -- PDF, AUDIO, VIDEO
    material_title TEXT NOT NULL,
    review_date DATETIME NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id)
);

-- Court Dates
CREATE TABLE court_dates (
    id INTEGER PRIMARY KEY,
    case_id INTEGER NOT NULL,
    court_date DATETIME NOT NULL,
    description TEXT NOT NULL,
    location TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (case_id) REFERENCES cases(id)
);
```

### Template Configuration Schema
```json
{
  "fieldTemplates": {
    "contactRoles": {
      "GAL": "Guardian Ad Litem",
      "FOC": "Friend of the Court",
      "Attorney": "Legal Counsel",
      "Therapist": "Treating Professional",
      "Social Worker": "Case Worker"
    },
    "evidenceTypes": ["PDF", "AUDIO", "VIDEO", "DOCUMENT"],
    "kanbanColumns": [
      {"id": "AGREEMENT_SIGNED", "label": "Agreement Signed"},
      {"id": "CLIENT_PAID", "label": "Client Paid"},
      {"id": "WORKING", "label": "Working"},
      {"id": "PREPARING", "label": "Preparing"}
    ]
  }
}
```

## API/Interface Design

### RESTful API Endpoints (Template-Driven)

#### Case Management
- `GET /api/cases` - List all cases with status filtering
- `POST /api/cases` - Create new case
- `GET /api/cases/:id` - Get case details with relationships
- `PUT /api/cases/:id` - Update case information
- `DELETE /api/cases/:id` - Archive case

#### Contact Management
- `GET /api/contacts` - Search contacts with cross-case visibility
- `POST /api/contacts` - Create new contact
- `GET /api/contacts/:id` - Get contact with all associated cases
- `PUT /api/contacts/:id` - Update contact information
- `GET /api/contacts/:id/cases` - Get all cases for contact

#### Case-Contact Relationships
- `POST /api/cases/:caseId/contacts/:contactId` - Add contact to case with role
- `PUT /api/cases/:caseId/contacts/:contactId` - Update contact role in case
- `DELETE /api/cases/:caseId/contacts/:contactId` - Remove contact from case

#### Kanban Management
- `GET /api/cases/:caseId/tasks` - Get kanban tasks for case
- `POST /api/cases/:caseId/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task status and position
- `DELETE /api/tasks/:id` - Remove task

#### Contact Logging
- `GET /api/cases/:caseId/contact-logs` - Get contact logs for case
- `POST /api/cases/:caseId/contact-logs` - Log contact interaction
- `PUT /api/contact-logs/:id` - Update contact log entry

#### Evidence Tracking
- `GET /api/cases/:caseId/evidence` - Get evidence reviews for case
- `POST /api/cases/:caseId/evidence` - Log evidence review
- `GET /api/reports/:caseId/evidence` - Generate court report evidence list

#### Court Dates
- `GET /api/court-dates` - Get upcoming court dates
- `POST /api/cases/:caseId/court-dates` - Add court date
- `PUT /api/court-dates/:id` - Update court date
- `DELETE /api/court-dates/:id` - Remove court date

## Cross-Cutting Concerns

### Natural Language Configuration System
- **Configuration Files**: JSON-based templates for field definitions
- **Template Engine**: Dynamic component generation from configuration
- **Hot Reloading**: Configuration changes apply without restart
- **Validation**: Automatic validation of natural language inputs

### Security
- **Local Authentication**: Simple username/password system
- **Session Management**: Secure session handling
- **Data Privacy**: All data stored locally in SQLite
- **Audit Trail**: Automatic logging of all data changes

### Performance
- **Local Database**: SQLite provides fast local access
- **Lazy Loading**: Components load data as needed
- **Caching**: Template caching for faster rendering
- **Optimized Queries**: Indexed database queries for performance

## Component and Integration Overview

### Frontend Components (Template-Based)
```
src/
├── components/
│   ├── common/                 # Reusable template components
│   ├── cases/                  # Case management components
│   ├── contacts/               # Contact management components
│   ├── kanban/                 # Kanban board components
│   └── reports/                # Report generation components
├── templates/                  # Template definitions
│   ├── fields/                 # Form field templates
│   ├── layouts/                # Layout templates
│   └── components/             # Component templates
├── stores/                     # Zustand state management
└── utils/                      # Template processing utilities
```

### Backend Structure (Configuration-Driven)
```
src/
├── controllers/                # API endpoint handlers
├── services/                   # Business logic services
├── templates/                  # Template processing
├── config/                     # Configuration management
└── database/                   # Database schema and migrations
```

## Implementation Guidance

### Development Workflow (Natural Language)
1. **Define Requirements**: Describe features in natural language
2. **Template Selection**: Choose appropriate templates from library
3. **Configuration**: Modify JSON configuration files
4. **AI-Assisted Generation**: Use AI to generate code from specifications
5. **Template Customization**: Fine-tune templates through configuration
6. **Testing**: Validate functionality through template testing

### Maintenance Strategy
1. **Configuration Updates**: Modify JSON files for changes
2. **Template Updates**: Add or modify component templates
3. **AI-Assisted Updates**: Describe changes, AI generates updates
4. **Version Control**: Track configuration and template changes

### Deployment Strategy
1. **Simple Web Hosting**: GitHub Pages or similar static hosting
2. **Build Process**: Automated build from templates
3. **Configuration Deployment**: Deploy configuration files
4. **Database Setup**: Automatic SQLite initialization

## Proposed Source Tree

```
case-track/
├── README.md                   # Project documentation
├── package.json                # Dependencies and scripts
├── .gitignore                  # Git ignore rules
├── docker-compose.yml          # Local development setup
│
├── frontend/                   # React frontend
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── main.tsx           # Application entry point
│   │   ├── App.tsx            # Main application component
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Layout.tsx
│   │   │   │   ├── Navigation.tsx
│   │   │   │   └── Loading.tsx
│   │   │   ├── cases/
│   │   │   │   ├── CaseList.tsx
│   │   │   │   ├── CaseDetail.tsx
│   │   │   │   └── CaseForm.tsx
│   │   │   ├── contacts/
│   │   │   │   ├── ContactList.tsx
│   │   │   │   ├── ContactDetail.tsx
│   │   │   │   └── ContactForm.tsx
│   │   │   ├── kanban/
│   │   │   │   ├── KanbanBoard.tsx
│   │   │   │   ├── TaskCard.tsx
│   │   │   │   └── TaskForm.tsx
│   │   │   └── reports/
│   │   │       ├── EvidenceReport.tsx
│   │   │       └── ContactLogReport.tsx
│   │   ├── templates/
│   │   │   ├── fields/
│   │   │   │   ├── ContactFields.tsx
│   │   │   │   ├── CaseFields.tsx
│   │   │   │   └── EvidenceFields.tsx
│   │   │   ├── layouts/
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   └── CaseLayout.tsx
│   │   │   └── components/
│   │   │       ├── DataTable.tsx
│   │   │       ├── SearchForm.tsx
│   │   │       └── StatusBadge.tsx
│   │   ├── stores/
│   │   │   ├── caseStore.ts
│   │   │   ├── contactStore.ts
│   │   │   └── uiStore.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   └── templates.ts
│   │   ├── utils/
│   │   │   ├── dateUtils.ts
│   │   │   ├── validation.ts
│   │   │   └── templateUtils.ts
│   │   └── styles/
│   │       └── theme.ts
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                    # Express API
│   ├── src/
│   │   ├── app.ts             # Express application
│   │   ├── server.ts          # Server startup
│   │   ├── controllers/
│   │   │   ├── caseController.ts
│   │   │   ├── contactController.ts
│   │   │   ├── kanbanController.ts
│   │   │   ├── evidenceController.ts
│   │   │   └── reportController.ts
│   │   ├── services/
│   │   │   ├── caseService.ts
│   │   │   ├── contactService.ts
│   │   │   ├── evidenceService.ts
│   │   │   └── reportService.ts
│   │   ├── templates/
│   │   │   ├── fieldTemplates.json
│   │   │   ├── uiTemplates.json
│   │   │   └── reportTemplates.json
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   └── app.ts
│   │   └── middleware/
│   │       ├── auth.ts
│   │       └── validation.ts
│   ├── prisma/
│   │   ├── schema.prisma     # Database schema
│   │   └── migrations/        # Database migrations
│   └── package.json
│
├── database/                   # Database setup
│   ├── schema.sql             # Initial database schema
│   ├── seeds/                 # Sample data
│   └── backups/               # Database backups
│
├── templates/                  # User-customizable templates
│   ├── fields/
│   │   ├── contactRoles.json
│   │   ├── evidenceTypes.json
│   │   └── customFields.json
│   ├── ui/
│   │   ├── dashboard.json
│   │   ├── caseViews.json
│   │   └── contactViews.json
│   └── reports/
│       ├── evidenceReport.json
│       └── contactLogReport.json
│
├── config/                     # Configuration files
│   ├── app.json               # Application configuration
│   ├── database.json          # Database configuration
│   └── ui.json                # UI configuration
│
└── docs/                       # Documentation
    ├── README.md               # Setup instructions
    ├── TEMPLATES.md            # Template customization guide
    ├── DEPLOYMENT.md           # Deployment instructions
    ├── MAINTENANCE.md          # Maintenance guide
    ├── PRD.md                  # Product requirements
    ├── project-workflow-analysis.md
    ├── sprint-change-proposal-2025-10-12.md
    ├── bmad-implementation-plan.md
    └── solution-architecture.md
```

## Architecture Decision Records

### ADR-001: Template-Based Development Approach
**Decision**: Use template-based development with natural language configuration
**Status**: Accepted
**Context**: User has no technical experience and needs natural language development
**Consequences**: Enables non-technical maintenance, requires template design investment

### ADR-002: SQLite Database Choice
**Decision**: Use SQLite for local data storage
**Status**: Accepted
**Context**: Small team (1-3 users), need simple deployment, no server administration
**Consequences**: Simple deployment, good performance, limited scalability

### ADR-003: Monorepo Structure
**Decision**: Use monorepo with clear component separation
**Status**: Accepted
**Context**: Small team, simpler maintenance, better for template management
**Consequences**: Easier to manage, potential coupling concerns

### ADR-004: React + Express Stack
**Decision**: Use React for frontend, Express for backend
**Status**: Accepted
**Context**: Extensive template ecosystem, good documentation, AI-friendly
**Consequences**: Good development experience, requires learning both technologies

## Implementation Timeline

### Phase 1: Foundation (Week 1)
- Set up project structure and build tools
- Implement basic database schema with Prisma
- Create core API endpoints
- Set up authentication and basic security

### Phase 2: Core Features (Week 2)
- Implement case management functionality
- Create contact management with cross-case visibility
- Build basic UI components from templates
- Set up template processing system

### Phase 3: Advanced Features (Week 3)
- Implement Kanban board functionality
- Add evidence review tracking
- Create court report generation
- Implement court date tracking

### Phase 4: Templates & Polish (Week 4)
- Develop template system for customization
- Create user documentation
- Testing and bug fixes
- Deployment preparation

---

## Next Steps

1. **Template Development**: Create initial template library
2. **AI Integration**: Set up AI-assisted development workflow
3. **Prototype Development**: Build minimum viable prototype
4. **Template Testing**: Validate template-based customization
5. **User Testing**: Test with actual therapist workflow

This architecture prioritizes maintainability through natural language configuration while providing a robust foundation for therapist case management needs.