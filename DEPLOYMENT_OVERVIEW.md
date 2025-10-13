# Case Track - Complete Deployment Overview

This document provides comprehensive deployment instructions for the Case Track mental health therapist case tracking system across multiple platforms.

## 📁 Repository Structure

You now have two optimized repositories:

### 1. Main Application Repository
- **URL**: https://github.com/codeverlan/case-track
- **Purpose**: Complete source code and development
- **Best for**: Developers, custom deployments, source access

### 2. Yunohost App Repository
- **URL**: https://github.com/codeverlan/case-track_ynh
- **Purpose**: YunoHost app integration
- **Best for**: YunoHost users, one-click installation

## 🚀 Deployment Options

### Option 1: YunoHost App Installation (Recommended for YunoHost Users)

**URL**: https://github.com/codeverlan/case-track_ynh

#### Installation via YunoHost Admin Panel:
```bash
1. Log in to YunoHost admin panel
2. Go to Applications → Install
3. Search for "Case Track"
4. Click Install and follow setup wizard
```

#### Installation via Command Line:
```bash
# Install from YunoHost app catalog (when approved)
sudo yunohost app install case-track

# Or install directly from repository
sudo yunohost app install https://github.com/codeverlan/case-track_ynh
```

#### Features:
- ✅ One-click installation
- ✅ Automatic SSL certificates
- ✅ Integrated backups
- ✅ SSO authentication
- ✅ Automatic updates
- ✅ Systemd service management
- ✅ NGINX reverse proxy

### Option 2: Download & Run (Quick Start)

**URL**: https://github.com/codeverlan/case-track/releases

#### Installation:
```bash
# Download deployment package
wget https://github.com/codeverlan/case-track/releases/download/v1.0.0/case-track-latest.tar.gz

# Extract and deploy
tar -xzf case-track-latest.tar.gz
cd case-track
./deploy.sh

# Access at http://localhost:3001
```

#### Features:
- ✅ 5-minute setup
- ✅ No technical knowledge required
- ✅ Complete application included
- ✅ Automatic database setup
- ✅ Sample data included

### Option 3: Clone & Build (Developer Option)

**URL**: https://github.com/codeverlan/case-track

#### Installation:
```bash
# Clone repository
git clone https://github.com/codeverlan/case-track.git
cd case-track

# Install and build
npm install
npm run build

# Initialize database
npm run db:migrate
npm run db:seed

# Start application
npm start

# Access at http://localhost:3001
```

#### Features:
- ✅ Full source code access
- ✅ Customizable templates
- ✅ Development environment
- ✅ Debug capabilities
- ✅ Easy updates

### Option 4: Docker Deployment

#### Installation:
```bash
# Build Docker image
git clone https://github.com/codeverlan/case-track.git
cd case-track
docker build -t case-track .

# Run container
docker run -d \
  --name case-track \
  -p 3001:3001 \
  -v case-track-data:/app/database \
  case-track

# Access at http://localhost:3001
```

#### Features:
- ✅ Containerized deployment
- ✅ Isolated environment
- ✅ Easy portability
- ✅ Volume persistence

### Option 5: Cloud Platform Deployment

#### Heroku:
```bash
# Install Heroku CLI and deploy
heroku create your-app-name
git push heroku main
```

#### Railway:
```bash
# Install Railway CLI and deploy
railway login
railway up
```

#### Features:
- ✅ Managed infrastructure
- ✅ Automatic scaling
- ✅ SSL included
- ✅ Monitoring tools

## 🔧 Configuration

### Template Customization

All deployments support natural language customization through templates:

```json
// Add custom contact roles
{
  "id": "SOCIAL_WORKER_SUPERVISOR",
  "label": "Social Work Supervisor",
  "description": "Supervising social worker for the case",
  "category": "social_services"
}
```

**Template Locations:**
- `templates/fields/contactRoles.json` - Contact roles
- `templates/fields/evidenceTypes.json` - Evidence types
- `templates/fields/kanbanColumns.json` - Workflow columns

### Environment Variables

Create `.env` file for advanced configuration:

```env
# Server Configuration
NODE_ENV=production
PORT=3001

# Database
DATABASE_PATH=./database/case-track.db

# Security
JWT_SECRET=your-secret-key-here
SESSION_SECRET=your-session-secret

# Application Settings
DEFAULT_LANGUAGE=en
ENABLE_BACKUPS=true
BACKUP_FREQUENCY_DAYS=7
```

## 🔐 Security Features

### Built-in Security:
- ✅ HTTPS enforcement
- ✅ Security headers
- ✅ CORS protection
- ✅ Input validation
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ Rate limiting
- ✅ Secure file handling

### Data Protection:
- ✅ Local SQLite database
- ✅ No cloud data transmission
- ✅ Encrypted sensitive data
- ✅ Audit logging
- ✅ Regular backup options

## 📊 System Requirements

### Minimum Requirements:
- **CPU**: 1 core
- **RAM**: 256MB
- **Storage**: 100MB
- **OS**: Linux, macOS, Windows
- **Node.js**: 18+
- **Database**: SQLite (included)

### Recommended Requirements:
- **CPU**: 2 cores
- **RAM**: 512MB
- **Storage**: 1GB
- **Network**: Broadband internet

## 🚨 Production Considerations

### For Production Use:
1. **Change Default Credentials**: Update admin passwords immediately
2. **Configure HTTPS**: Use SSL certificates
3. **Set Up Backups**: Regular automated backups
4. **Monitor Logs**: Check application logs regularly
5. **Update Regularly**: Keep application updated
6. **Configure Firewall**: Restrict access as needed

### For Clinical Use:
1. **HIPAA Compliance**: Ensure local regulations compliance
2. **Data Backup**: Multiple backup locations
3. **Access Control**: Proper user management
4. **Audit Trail**: Enable activity logging
5. **Emergency Plan**: Data recovery procedures

## 🆘 Support and Documentation

### Documentation:
- **Main Repo**: [GitHub Wiki](https://github.com/codeverlan/case-track/wiki)
- **YunoHost Integration**: [YunoHost App Docs](https://github.com/codeverlan/case-track_ynh)
- **Development Guide**: [DEVELOPMENT.md](https://github.com/codeverlan/case-track/blob/main/DEVELOPMENT.md)

### Community Support:
- **Issues**: [GitHub Issues](https://github.com/codeverlan/case-track/issues)
- **Discussions**: [GitHub Discussions](https://github.com/codeverlan/case-track/discussions)
- **YunoHost Forum**: [Community Support](https://forum.yunohost.org/)

### Getting Help:
1. **Check documentation** first
2. **Search existing issues**
3. **Create new issue** with details
4. **Include error logs** and system info
5. **Describe deployment method** used

## 📈 Roadmap

### Upcoming Features:
- [ ] Advanced reporting dashboard
- [ ] Calendar integration
- [ ] Mobile app companion
- [ ] Advanced user permissions
- [ ] Data export/import
- [ ] Multi-clinic support
- [ ] Telehealth integration
- [ ] Billing integration

### Platform Support:
- [ ] Official YunoHost app catalog
- [ ] Docker Hub image
- [ ] Mobile apps (iOS/Android)
- [ ] Cloud marketplace listings

---

## 🎯 Quick Decision Guide

| User Type | Recommended Deployment | Repository |
|-----------|---------------------|------------|
| YunoHost User | YunoHost App Store | `case-track_ynh` |
| Quick Start | Download & Run | `case-track` |
| Developer | Clone & Build | `case-track` |
| Enterprise | Docker/Cloud | `case-track` |
| Self-Hosting | Manual Install | `case-track` |

Choose the deployment method that best matches your technical requirements and expertise level. All options provide the same core functionality with different installation and maintenance approaches.