# Yunohost Deployment Guide - Case Track System

This guide covers deploying the Case Track mental health therapist case management system on Yunohost.

## 🏗️ Yunohost Architecture

For Yunohost deployment, we'll use:
- **Yunohost User Directory**: `/var/www/case-track/`
- **Systemd Service**: For the Node.js backend
- **Nginx Configuration**: Yunohost manages this automatically
- **SQLite Database**: Stored in user directory
- **Backup Integration**: Yunohost backup system

## 🚀 Deployment Steps

### 1. Prepare Yunohost Environment

**SSH into your Yunohost server:**
```bash
ssh admin@your-domain.com
```

**Create application directory:**
```bash
sudo mkdir -p /var/www/case-track
sudo chown admin:www-data /var/www/case-track
sudo chmod 755 /var/www/case-track
```

**Install Node.js (if not already installed):**
```bash
# Check current Node.js version
node --version

# If not installed or old version:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Deploy Application Files

**Upload your case-track project:**
```bash
# Option 1: Using SCP (from your local machine)
scp -r /path/to/case-track admin@your-domain.com:/tmp/

# Option 2: Using Git (if you have a repository)
git clone https://github.com/yourusername/case-track.git /tmp/case-track
```

**Move to Yunohost directory:**
```bash
sudo mv /tmp/case-track/* /var/www/case-track/
sudo mv /tmp/case-track/.* /var/www/case-track/ 2>/dev/null || true
sudo chown -R admin:www-data /var/www/case-track
sudo chmod -R 755 /var/www/case-track
```

### 3. Build and Configure Application

**Navigate to application directory:**
```bash
cd /var/www/case-track
```

**Install dependencies:**
```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

**Build frontend:**
```bash
cd frontend
npm run build
cd ..
```

**Initialize database:**
```bash
cd backend
npm run db:migrate
npm run db:seed
cd ..
```

### 4. Create Systemd Service

**Create service file:**
```bash
sudo nano /etc/systemd/system/case-track.service
```

**Add this configuration:**
```ini
[Unit]
Description=Case Track Backend Service
After=network.target

[Service]
Type=simple
User=admin
WorkingDirectory=/var/www/case-track/backend
Environment=NODE_ENV=production
Environment=PORT=3001
ExecStart=/usr/bin/node dist/server.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=case-track

[Install]
WantedBy=multi-user.target
```

**Enable and start service:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable case-track
sudo systemctl start case-track
```

**Check service status:**
```bash
sudo systemctl status case-track
```

### 5. Configure Yunohost App

**Create Yunohost app manifest:**
```bash
sudo nano /var/www/case-track/manifest.json
```

**Add this content:**
```json
{
    "name": "Case Track",
    "id": "case-track",
    "description": "Mental health therapist case management system",
    "version": "1.0.0",
    "url": "case-track",
    "license": "MIT",
    "maintainer": {
        "name": "Tyler",
        "email": "your-email@example.com"
    },
    "requirements": {
        "yunohost": ">= 4.0"
    },
    "multi_instance": false,
    "services": [
        {
            "name": "case-track-backend",
            "port": 3001,
            "needs_expose": false
        }
    ],
    "arguments": {
        "install": [
            {
                "name": "domain",
                "type": "domain",
                "ask": {
                    "en": "Choose a domain for Case Track"
                },
                "example": "domain.tld"
            },
            {
                "name": "path",
                "type": "path",
                "ask": {
                    "en": "Choose a path for Case Track"
                },
                "example": "/case-track",
                "default": "/case-track"
            }
        ]
    }
}
```

### 6. Configure Nginx

**Create Nginx configuration:**
```bash
sudo nano /etc/nginx/conf.d/case-track.conf
```

**Add this configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend static files
    location /case-track/ {
        alias /var/www/case-track/frontend/dist/;
        try_files $uri $uri/ /case-track/index.html;

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    }

    # API proxy
    location /case-track/api/ {
        proxy_pass http://localhost:3001/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # CORS headers
        add_header Access-Control-Allow-Origin "*" always;
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
        add_header Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization" always;

        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Max-Age 1728000;
            add_header Content-Type 'text/plain; charset=utf-8';
            add_header Content-Length 0;
            return 204;
        }
    }

    # Templates and static files
    location /case-track/templates/ {
        alias /var/www/case-track/templates/;
        add_header Access-Control-Allow-Origin "*" always;
    }

    # Health check
    location /case-track/health {
        proxy_pass http://localhost:3001/health;
    }
}
```

**Test and reload Nginx:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### 7. Configure Backups

**Add to Yunohost backup:**
```bash
sudo nano /etc/yunohost/apps.d/case-track.yml
```

**Add backup configuration:**
```yaml
backup:
  - /var/www/case-track/database
  - /var/www/case-track/templates
  - /var/www/case-track/config
```

### 8. SSL Certificate (Optional but Recommended)

Yunohost will automatically handle SSL for your domain. Just make sure your domain is properly configured in Yunohost admin panel.

## 🛠️ Maintenance

### Updating the Application

**To update the app:**
```bash
cd /var/www/case-track
git pull origin main  # or upload new files
npm install
npm run build  # from frontend directory
sudo systemctl restart case-track
```

### Checking Logs

**Application logs:**
```bash
# Systemd service logs
sudo journalctl -u case-track -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Database Management

**Backup database:**
```bash
cp /var/www/case-track/database/case-track.db /var/www/case-track/database/backup-$(date +%Y%m%d).db
```

**Restore database:**
```bash
sudo systemctl stop case-track
cp /path/to/backup.db /var/www/case-track/database/case-track.db
sudo systemctl start case-track
```

### Template Management

Templates work exactly the same as in development:
```bash
# Edit templates
nano /var/www/case-track/templates/fields/contactRoles.json

# Changes apply immediately (no restart needed)
```

## 🔒 Security Considerations

### File Permissions
```bash
# Ensure correct permissions
sudo chown -R admin:www-data /var/www/case-track
sudo chmod -R 755 /var/www/case-track
sudo chmod 644 /var/www/case-track/database/case-track.db
```

### Firewall
Yunohost manages firewall automatically. Ensure ports 80 and 443 are open.

### Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade

# Update Node.js (if needed)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 📊 Monitoring

### Check Application Health
```bash
# Health endpoint
curl http://localhost:3001/health

# Service status
sudo systemctl status case-track

# Check if API is responding
curl http://localhost:3001/api/cases
```

### Performance Monitoring
```bash
# System resources
htop

# Disk usage
df -h /var/www/case-track

# Memory usage
free -h
```

## 🚨 Troubleshooting

### Common Issues

**Service won't start:**
```bash
# Check logs
sudo journalctl -u case-track -n 50

# Check configuration
sudo nano /etc/systemd/system/case-track.service
```

**Frontend not loading:**
```bash
# Check Nginx configuration
sudo nginx -t

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
```

**Database errors:**
```bash
# Check database file permissions
ls -la /var/www/case-track/database/

# Recreate database
cd /var/www/case-track/backend
npm run db:migrate
npm run db:seed
```

**Template changes not applying:**
```bash
# Check file permissions
ls -la /var/www/case-track/templates/

# Restart backend if needed
sudo systemctl restart case-track
```

---

## ✅ Deployment Complete!

Your Case Track system is now running on Yunohost at:
**http://your-domain.com/case-track**

**Key Benefits of Yunohost Deployment:**
- ✅ Automatic SSL certificates
- ✅ Integrated backup system
- ✅ User management through Yunohost
- ✅ Automatic security updates
- ✅ Email notifications for system events
- ✅ Centralized administration

**Next Steps:**
1. Test all functionality in your browser
2. Customize templates for your specific needs
3. Set up regular backups
4. Monitor system performance

**Remember:** All template customization works exactly the same as in development - just edit the JSON files and changes apply immediately!