# Case Track - Mental Health Therapist Case Tracking System

A template-based web application for mental health therapists managing court-involved reunification cases.

## Quick Start

### Prerequisites
- Node.js 18+ installed
- Modern web browser
- Text editor (VS Code recommended)

### Installation

1. **Install dependencies:**
   ```bash
   npm run setup
   ```

2. **Initialize database:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:5173`

## Project Structure

```
case-track/
├── frontend/           # React frontend application
├── backend/            # Express API with database
├── database/           # Database schema and seeds
├── templates/          # Customizable templates
├── config/             # Configuration files
└── docs/               # Documentation
```

## Features

- ✅ **Contact Management** - Track contacts with role-based relationships
- ✅ **Case Management** - Organize cases with status tracking
- ✅ **Cross-Case Visibility** - See shared contacts across all cases
- ✅ **Kanban Boards** - Visual task management for each case
- ✅ **Evidence Tracking** - Log reviewed materials for court reports
- ✅ **Court Date Tracking** - Prominent display of upcoming dates
- ✅ **Contact Logging** - Track time and descriptions for interactions
- ✅ **Template System** - Customize fields and UI through JSON

## Natural Language Development

This system is designed for natural language development:

### Adding New Features
1. Describe the feature in natural language
2. Select appropriate templates from `templates/` directory
3. Configure through JSON files in `config/`
4. Use AI assistance to generate code

### Customizing Templates
- Edit JSON files in `templates/` directory
- Modify field definitions, UI layouts, and report formats
- Changes apply automatically without restart

### Adding Custom Fields
1. Edit `templates/fields/customFields.json`
2. Add field definitions with type and validation
3. Fields automatically appear in forms and reports

## Configuration

### Field Templates
Located in `templates/fields/`:
- `contactRoles.json` - Define contact role options
- `evidenceTypes.json` - Define evidence material types
- `customFields.json` - Add custom data fields

### UI Templates
Located in `templates/ui/`:
- `dashboard.json` - Configure dashboard layout
- `caseViews.json` - Customize case interface
- `contactViews.json` - Modify contact display

### Report Templates
Located in `templates/reports/`:
- `evidenceReport.json` - Customize evidence reports
- `contactLogReport.json` - Modify contact log reports

## Deployment

### 🚀 GitHub Deployment (Recommended)

#### Option 1: Download & Run (5 minutes)
1. Go to [GitHub Releases](https://github.com/yourusername/case-track/releases)
2. Download the latest `case-track-*.tar.gz` file
3. Extract and run: `./deploy.sh`
4. Access at `http://localhost:3001`

#### Option 2: Clone & Build
```bash
git clone https://github.com/yourusername/case-track.git
cd case-track
npm install
npm run build
npm start
```

### 🏠 Local Deployment
```bash
npm run build
npm start
# Access at http://localhost:3001
```

### 🌐 Cloud Deployment Options

#### Heroku
```bash
heroku create your-app-name
git push heroku main
```

#### Railway
```bash
railway login
railway up
```

#### Docker
```bash
docker build -t case-track .
docker run -p 3001:3001 case-track
```

### 📋 Full Documentation
- [GitHub Deployment Guide](./GITHUB_DEPLOYMENT.md) - Complete deployment instructions
- [Yunohost Deployment](./YUNOHOST_DEPLOYMENT.md) - Self-hosting on Yunohost
- [Development Guide](./DEVELOPMENT.md) - Local development setup

## Data Privacy

- All data stored locally in SQLite database
- No cloud data transmission
- Automatic local backups
- Export functionality for data portability

## Support

For technical support:
1. Check `docs/` directory for detailed guides
2. Review template configuration examples
3. Use AI assistance for code generation and debugging

---

**Built with natural language development in mind for mental health professionals.**