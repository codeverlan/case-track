# case-track Product Requirements Document (PRD)

**Author:** Tyler
**Date:** 2025-10-12
**Project Level:** 3
**Project Type:** Web application
**Target Scale:** Level 3 - Full product

---

## Description, Context and Goals

**Legal Case Relationship Tracking System** - A specialized web-based database application designed for mental health therapists managing court-involved reunification cases. The system focuses on tracking contact relationships across multiple cases, specifically identifying when individuals appear in different roles across various cases (e.g., a person serving as a Guardian Ad Litem in one case while being a Friend of the Court in another).

The core need is to prevent role conflicts and provide therapists with visibility into how contacts participate across their entire caseload. Each case requires detailed contact logging with time tracking, and the system must support dynamic role assignment since the same individual can serve different functions in different cases. Built on SQLite for reliability and speed, with a modern web interface designed for therapeutic professionals' daily workflow efficiency.

### Deployment Intent

**MVP for early users** - Initial deployment focused on single therapist use case with core functionality for contact management and relationship tracking. Future expansion to small therapy practices.

### Context

Mental health therapists handling court-involved reunification cases face a complex relationship management challenge. They must track numerous contacts across multiple cases while being alert to potential role conflicts that could impact case outcomes. Current methods typically involve spreadsheets or basic contact managers that don't provide cross-case visibility or dynamic role tracking. The need for precise time logging for billing and legal compliance adds another layer of complexity to their daily workflow.

### Goals

1. **Role Conflict Prevention** - Enable therapists to identify when contacts serve in multiple roles across different cases within 30 days of implementation
2. **Contact Management Efficiency** - Reduce time spent tracking contact information across cases by 50% through centralized database
3. **Case Documentation Compliance** - Ensure 100% of case contacts are logged with required time tracking for billing and legal compliance
4. **Cross-Case Visibility** - Provide immediate visibility into contact relationships across all active cases
5. **Therapist Workflow Integration** - Design interface that fits naturally into therapists' existing case management workflow

## Requirements

### Functional Requirements

{{functional_requirements}}

### Non-Functional Requirements

{{non_functional_requirements}}

## User Journeys

{{user_journeys}}

## UX Design Principles

{{ux_principles}}

## Epics

{{epics}}

{{epic_note}}

## Out of Scope

{{out_of_scope}}

---

## Next Steps

{{next_steps}}

## Document Status

- [ ] Goals and context validated with stakeholders
- [ ] All functional requirements reviewed
- [ ] User journeys cover all major personas
- [ ] Epic structure approved for phased delivery
- [ ] Ready for architecture phase

_Note: See technical-decisions.md for captured technical context_

---

_This PRD adapts to project level 3 - providing appropriate detail without overburden._