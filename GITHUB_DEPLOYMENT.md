# GitHub Deployment Guide - Case Track System

This guide covers deploying the Case Track mental health therapist case management system from GitHub.

## 🚀 Quick Deployment Options

### Option 1: Download & Run (Recommended)

1. **Download the Latest Release:**
   - Go to [Releases](https://github.com/yourusername/case-track/releases)
   - Download the latest `case-track-v*.tar.gz` file
   - Extract to your desired location

2. **Run the Deployment Script:**
   ```bash
   cd case-track
   ./deploy.sh
   ```

3. **Access Your Application:**
   - Open http://localhost:3001
   - Default admin credentials: admin / admin123

### Option 2: Clone & Build

1. **Clone Repository:**
   ```bash
   git clone https://github.com/yourusername/case-track.git
   cd case-track
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Build Application:**
   ```bash
   npm run build
   ```

4. **Initialize Database:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. **Start Application:**
   ```bash
   npm start
   ```

## 🏗️ Architecture Overview

```
case-track/
├── frontend/           # React frontend (builds to /dist)
├── backend/            # Express API (builds to /dist)
├── database/           # SQLite database files
├── templates/          # Customizable JSON templates
├── docs/              # Documentation
└── deploy/            # Deployment packages
```

## 📦 What You Get

### Core Features
- ✅ Contact management with cross-case visibility
- ✅ Kanban workflow boards (Agreement Signed → Client Paid → Working → Preparing)
- ✅ Court date tracking with prominent alerts
- ✅ Evidence review logging (PDFs, audio, video metadata)
- ✅ Contact time logging for billing
- ✅ Template-based natural language customization
- ✅ SQLite database with sample data

### Technical Stack
- **Frontend**: React 18 + TypeScript + Material UI
- **Backend**: Express.js + TypeScript
- **Database**: SQLite with full-text search
- **Deployment**: Node.js + npm scripts

## 🔧 Configuration Options

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=production
PORT=3001

# Database
DATABASE_PATH=./database/case-track.db

# Security
JWT_SECRET=your-secret-key-here
SESSION_SECRET=your-session-secret

# Optional: External Database
# DATABASE_TYPE=postgresql
# DATABASE_URL=postgresql://user:password@localhost/case-track
```

### Template Customization

All templates are in the `templates/fields/` directory:

- `contactRoles.json` - Define contact roles (GAL, FOC, Attorney, etc.)
- `evidenceTypes.json` - Define evidence material types
- `kanbanColumns.json` - Customize workflow columns

**No coding required** - just edit JSON files and restart!

## 🌐 Deployment Options

### Local Development
```bash
npm run dev  # Starts both frontend and backend with hot reload
```

### Production Server
```bash
npm start    # Starts production server on port 3001
```

### Docker Deployment
```bash
docker build -t case-track .
docker run -p 3001:3001 case-track
```

### Cloud Deployment

#### Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
git push heroku main
```

#### Railway
```bash
# Install Railway CLI
railway login
railway up
```

#### Vercel (Frontend Only)
```bash
# Deploy frontend to Vercel
cd frontend
npm run build
vercel --prod
```

## 🔍 Post-Deployment Setup

### 1. Configure Templates

Edit templates in `templates/fields/` to match your specific needs:

```json
// Add custom contact roles
{
  "id": "SOCIAL_WORKER",
  "label": "Social Worker",
  "description": "Department social services worker",
  "category": "social_services"
}
```

### 2. Set Up Users

Access http://localhost:3001/admin to:
- Create user accounts
- Set permissions
- Configure system settings

### 3. Import Existing Data

If you have existing data:
1. Export to CSV format
2. Use the import tool at `/admin/import`
3. Map fields to your data structure

### 4. Configure Backups

```bash
# Automated backups (Linux/macOS)
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/case-track/scripts/backup.sh
```

## 📊 Monitoring & Maintenance

### Health Checks

```bash
# Check if application is running
curl http://localhost:3001/health

# Check database status
curl http://localhost:3001/api/health
```

### Logs

```bash
# Application logs
tail -f logs/application.log

# Error logs
tail -f logs/error.log

# Database logs
tail -f logs/database.log
```

### Updates

```bash
# Update from GitHub
git pull origin main
npm install
npm run build
npm restart
```

## 🔒 Security Considerations

### Production Security
1. **Change default passwords** immediately
2. **Use HTTPS** in production
3. **Set strong JWT secrets**
4. **Enable CORS** for your domain only
5. **Regular backups** to secure location

### Data Protection
- SQLite database is encrypted by default
- All sensitive data is hashed
- Audit logs track all changes
- Templates validate all inputs

## 🚀 Performance Optimization

### Database Optimization
- SQLite WAL mode enabled by default
- Indexes on frequently queried fields
- Connection pooling for multiple users

### Frontend Optimization
- Code splitting by route
- Lazy loading for large data sets
- Service worker for offline support

### Caching
- Static assets cached for 1 year
- API responses cached when appropriate
- Database query result caching

## 🛠️ Troubleshooting

### Common Issues

**Application won't start:**
```bash
# Check Node.js version
node --version  # Should be 18+

# Check dependencies
npm ls

# Rebuild if needed
npm run build
```

**Database errors:**
```bash
# Reset database
rm database/case-track.db
npm run db:migrate
npm run db:seed
```

**Template changes not applying:**
```bash
# Restart application
npm restart
```

### Getting Help

1. **Check the logs**: `tail -f logs/application.log`
2. **Review documentation**: [README.md](README.md)
3. **Search issues**: [GitHub Issues](https://github.com/yourusername/case-track/issues)
4. **Create new issue**: Include logs and steps to reproduce

## 📈 Scaling Options

### Multiple Users
- Built-in user management system
- Role-based permissions
- Concurrent user support

### Data Growth
- SQLite can handle millions of records
- Archiving system for old cases
- Export functionality for data portability

### High Availability
- Database replication options
- Load balancing with nginx
- Container orchestration with Kubernetes

## 🎯 Next Steps

1. **Configure templates** for your specific use case
2. **Import existing data** if applicable
3. **Train users** on the interface
4. **Set up regular backups**
5. **Monitor performance** and adjust as needed

---

## 📞 Support

- **Documentation**: [Full documentation](./docs/)
- **Issues**: [GitHub Issues](https://github.com/yourusername/case-track/issues)
- **Updates**: Follow [releases](https://github.com/yourusername/case-track/releases)

**Deployment typically takes 5-10 minutes from download to first use.**