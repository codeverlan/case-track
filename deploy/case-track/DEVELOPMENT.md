# Development Guide - Case Track System

This guide covers setting up and developing the Case Track mental health therapist case management system using natural language development.

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org)
- **Git** - For version control
- **VS Code** (recommended) - For development with AI assistance

### Initial Setup

1. **Clone or Navigate to Project:**
   ```bash
   cd /path/to/case-track
   ```

2. **Install All Dependencies:**
   ```bash
   npm run setup
   ```
   This installs dependencies for both frontend and backend.

3. **Initialize Database:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
   This creates the SQLite database with sample data.

4. **Start Development Server:**
   ```bash
   npm run dev
   ```

5. **Open Your Browser:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001/health

## 🏗️ Project Structure

```
case-track/
├── frontend/           # React frontend (port 5173)
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── templates/   # Frontend templates
│   │   └── stores/      # State management
├── backend/            # Express API (port 3001)
│   ├── src/
│   │   ├── controllers/ # API endpoints
│   │   ├── services/    # Business logic
│   │   └── config/      # Database setup
├── database/           # SQLite database
│   ├── schema.sql       # Database structure
│   └── seeds/           # Sample data
├── templates/          # Customizable templates
│   └── fields/          # Field definitions
└── docs/               # Documentation
```

## 🎨 Natural Language Development

### Working with Templates

**What are Templates?**
Templates are JSON files that define how the application works without requiring code changes.

**Key Template Files:**
- `templates/fields/contactRoles.json` - Define available contact roles
- `templates/fields/evidenceTypes.json` - Define evidence material types
- `templates/fields/kanbanColumns.json` - Define workflow columns

### Adding Custom Contact Roles

1. **Open the Template:**
   ```bash
   # Edit this file:
   templates/fields/contactRoles.json
   ```

2. **Add New Role:**
   ```json
   {
     "id": "SOCIAL_WORKER_SUPERVISOR",
     "label": "Social Work Supervisor",
     "description": "Supervising social worker for the case",
     "category": "social_services"
   }
   ```

3. **Save the File** - Changes apply automatically!

### Adding Custom Evidence Types

1. **Open the Template:**
   ```bash
   # Edit this file:
   templates/fields/evidenceTypes.json
   ```

2. **Add New Type:**
   ```json
   {
     "id": "ASSESSMENT_TOOL",
     "label": "Assessment Tool",
     "description": "Standardized assessment instruments",
     "icon": "assessment",
     "color": "#9c27b0"
   }
   ```

3. **Save the File** - New type available immediately!

### Customizing Kanban Columns

1. **Open the Template:**
   ```bash
   # Edit this file:
   templates/fields/kanbanColumns.json
   ```

2. **Add New Column:**
   ```json
   {
     "id": "REVIEW_NEEDED",
     "label": "Review Needed",
     "description": "Items that need review before proceeding",
     "color": "#ff5722",
     "position": 2
   }
   ```

3. **Save the File** - Column appears in Kanban boards!

## 🔧 AI-Assisted Development

### Using AI for Code Generation

**1. Describe What You Want:**
```
"I need a new component to display contact cards with their role and case information"
```

**2. Ask AI to Generate:**
- React component with TypeScript
- Material UI styling
- Integration with existing API

**3. Review and Integrate:**
- AI provides complete code
- You review and make adjustments
- Add to appropriate directory

### Example AI Prompts

**For New Components:**
```
"Create a React component for displaying court dates in a calendar view. Use Material UI, show upcoming dates prominently, include case name and location."
```

**For API Endpoints:**
```
"Create an Express API endpoint for searching contacts across all cases. Return contact name, cases they're involved in, and their roles in each case."
```

**For Database Queries:**
```
"Write a SQL query to find all contacts that appear in more than one case, showing their names and the cases they're involved in."
```

## 📝 Making Changes

### Safe Development Workflow

1. **Always Backup Before Major Changes:**
   ```bash
   # Templates auto-backup when modified
   # Code changes tracked in Git
   ```

2. **Test in Development First:**
   ```bash
   npm run dev  # Test locally
   ```

3. **Use Natural Language:**
   - Modify templates for UI/field changes
   - Use AI for new features/components
   - Test thoroughly before deployment

### Common Tasks

**Adding a New Field to Contacts:**
1. Modify database schema (`database/schema.sql`)
2. Update contact templates
3. Ask AI to update API and frontend

**Creating New Reports:**
1. Define report template
2. Create API endpoint for report data
3. Build React component for report display

**Modifying Workflow:**
1. Update kanban columns template
2. Test workflow changes
3. Update any related components

## 🚀 Deployment

### Simple Web Hosting (Recommended)

1. **Build the Application:**
   ```bash
   npm run build
   ```

2. **Deploy Frontend:**
   - Upload `frontend/dist` to GitHub Pages
   - Or any static hosting service

3. **Deploy Backend:**
   - Use any Node.js hosting service
   - Ensure SQLite database is accessible
   - Configure environment variables

### Local Deployment

1. **Build for Production:**
   ```bash
   npm run build
   ```

2. **Start Production Server:**
   ```bash
   npm start
   ```

3. **Access Application:**
   - http://localhost:3001 (serves both frontend and backend)

## 🔍 Testing

### Manual Testing Checklist

**Before making changes:**
- [ ] Backup important data
- [ ] Test current functionality works
- [ ] Have a rollback plan

**After making changes:**
- [ ] Core features work (cases, contacts, kanban)
- [ ] Templates apply correctly
- [ ] Database operations succeed
- [ ] No console errors

### Automated Testing

```bash
# Run tests (when implemented)
npm test

# Check code quality
npm run lint
```

## 🐛 Troubleshooting

### Common Issues

**Database Not Found:**
```bash
npm run db:migrate
npm run db:seed
```

**Frontend Not Loading:**
```bash
cd frontend
npm install
npm run dev
```

**Backend Not Responding:**
```bash
cd backend
npm install
npm run dev
```

**Template Changes Not Applying:**
- Check JSON syntax is valid
- Restart development server
- Check browser console for errors

### Getting Help

**For AI Assistance:**
- Describe the problem clearly
- Include error messages
- Share relevant code sections
- Ask for specific solutions

**For Template Issues:**
- Validate JSON syntax: https://jsonlint.com/
- Check template structure examples
- Review template documentation

## 📚 Learning Resources

**Natural Language Development:**
- Prompt engineering techniques
- AI-assisted coding best practices
- Template design principles

**Technology Stack:**
- React documentation: https://react.dev/
- Material UI: https://mui.com/
- Express.js: https://expressjs.com/
- SQLite: https://sqlite.org/docs.html

---

**Remember:** This system is designed for natural language development. Start with descriptions, use AI for implementation, and customize through templates. No deep technical knowledge required!