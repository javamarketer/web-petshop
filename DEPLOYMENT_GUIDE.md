# 🚀 Deployment Guide

**Date:** June 14, 2026  
**Status:** Ready After Testing  
**Estimated Time:** 1-2 days

---

## 📋 Deployment Overview

```
Local Development
       ↓
Testing & Bug Fixes
       ↓
Staging Deployment
       ↓
Production Deployment
       ↓
Monitoring & Maintenance
```

---

## 🎯 Phase 1: Pre-Deployment Checklist

### Code Quality
- [ ] All tests passing (26/26)
- [ ] No console errors
- [ ] No network errors
- [ ] Code linting passes
- [ ] TypeScript compilation clean
- [ ] All pages responsive

### Functionality
- [ ] All 6 pages working
- [ ] All 7 API endpoints working
- [ ] Search functionality working
- [ ] Filters working
- [ ] Pagination working
- [ ] Price comparison working
- [ ] Error handling working
- [ ] Loading states working

### Database
- [ ] Migrations working
- [ ] Seed data loaded
- [ ] Relationships configured
- [ ] Indexes created
- [ ] Data integrity verified

### Documentation
- [ ] README.md updated
- [ ] API docs complete
- [ ] Setup guide clear
- [ ] Known issues documented
- [ ] Roadmap defined

---

## 🌐 Phase 2: Prepare for Deployment

### Step 1: Create Production Build

**Frontend Build**
```bash
cd frontend

# Create optimized production build
npm run build

# Expected:
# - Next.js automatic optimizations
# - Code splitting
# - Image optimization
# - Output in .next/ folder
# - Build time: 1-2 minutes
```

**Verify Build:**
```bash
# Test production build locally
npm start

# Open http://localhost:3000
# Test key pages load
# Verify API calls work
```

### Step 2: Environment Configuration

**Create Production `.env` Files**

**Backend (.env.production)**
```
NODE_ENV=production
PORT=5000
LOG_LEVEL=info

# Database (Production)
DB_HOST=your-db-host.com
DB_PORT=3306
DB_NAME=petshop_jogja
DB_USER=db_user
DB_PASSWORD=secure_password_here
DB_DIALECT=mysql

# CORS - Only allow your frontend domain
CORS_ORIGIN=https://petshop-jogja.com

# Security
API_VERSION=v1
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (.env.production.local)**
```
NEXT_PUBLIC_API_BASE_URL=https://api.petshop-jogja.com/api/v1
NEXT_PUBLIC_APP_NAME=PetShop Jogja Finder
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### Step 3: Security Audit

**Backend Security**
- [ ] Environment variables not in code
- [ ] No hardcoded secrets
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Security headers (Helmet) active
- [ ] Input validation working
- [ ] SQL injection prevention (Sequelize ORM)

**Frontend Security**
- [ ] No API keys exposed
- [ ] HTTPS enforced
- [ ] CSP headers configured
- [ ] XSS protection active
- [ ] CSRF tokens present

---

## ☁️ Phase 3: Deploy Backend

### Option A: Deploy to Railway (Recommended)

**Railway.com Setup**
```
1. Sign up at https://railway.app
2. Create new project
3. Connect GitHub repository
4. Select "backend" directory
5. Configure environment variables
6. Enable automatic deployments
```

**Railway Deployment Steps:**

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Link project
cd backend
railway link

# 4. Set environment variables
railway variables:set DB_HOST=your-db.railway.internal
railway variables:set DB_USER=postgres
railway variables:set DB_PASSWORD=your_secure_password
railway variables:set CORS_ORIGIN=https://petshop-jogja.com

# 5. Deploy
railway deploy

# 6. View logs
railway logs

# 7. Get deployment URL
railway status
```

**Expected Output:**
```
✓ Build successful
✓ Deployment successful
✓ Running on: https://petshop-api.railway.app
```

### Option B: Deploy to Render.com

**Render.com Setup**
```
1. Sign up at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure build & start commands
5. Set environment variables
6. Deploy
```

**Render Deployment Steps:**

```
Build Command: npm install && npm run migrate && npm run seed
Start Command: npm run start
```

**Environment Variables:**
```
NODE_ENV=production
DB_HOST=your-db-host
DB_NAME=petshop_jogja
DB_USER=db_user
DB_PASSWORD=***
CORS_ORIGIN=https://petshop-jogja.com
```

### Option C: Deploy to AWS EC2

**EC2 Setup (Advanced)**
```bash
# 1. Launch EC2 instance (Ubuntu 22.04)
# 2. SSH into instance
ssh -i key.pem ubuntu@your-instance.amazonaws.com

# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Install MySQL
sudo apt-get install -y mysql-server

# 5. Clone repository
git clone https://github.com/your-repo/web-petshop.git
cd web-petshop/backend

# 6. Install dependencies
npm install

# 7. Configure .env
nano .env
# Add production settings

# 8. Run migrations
npm run migrate

# 9. Start with PM2 (process manager)
npm install -g pm2
pm2 start src/server.js --name "petshop-api"
pm2 save
pm2 startup

# 10. Configure Nginx reverse proxy
# ... (Nginx setup)

# 11. Setup SSL with Let's Encrypt
# ... (Certbot setup)
```

---

## 🌍 Phase 4: Deploy Frontend

### Option A: Deploy to Vercel (Recommended)

**Vercel Setup**
```
1. Sign up at https://vercel.com
2. Import GitHub repository
3. Select "frontend" directory
4. Add environment variables
5. Deploy
```

**Vercel Deployment Steps:**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd frontend
vercel --prod

# 4. Set production environment
# In Vercel dashboard:
# - Settings → Environment Variables
# - Add NEXT_PUBLIC_API_BASE_URL=https://api.petshop-jogja.com/api/v1

# 5. Configure custom domain
# - Settings → Domains
# - Add your domain
# - Update DNS records
```

**Expected Output:**
```
✓ Deployed to https://petshop-jogja.vercel.app
✓ Production URL: https://petshop-jogja.com
```

### Option B: Deploy to Netlify

**Netlify Setup**
```
1. Sign up at https://netlify.com
2. Connect GitHub repository
3. Configure build settings
4. Set environment variables
5. Deploy
```

**Netlify Build Settings:**
```
Build command: npm run build
Publish directory: .next
```

### Option C: Deploy with Docker

**Create Dockerfile**
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

**Build & Push to Docker Hub**
```bash
cd frontend
docker build -t petshop-frontend:1.0 .
docker tag petshop-frontend:1.0 yourname/petshop-frontend:1.0
docker push yourname/petshop-frontend:1.0
```

---

## 💾 Phase 5: Database Setup for Production

### Option A: PlanetScale (Recommended for MySQL)

**PlanetScale Setup**
```
1. Sign up at https://planetscale.com
2. Create database "petshop_jogja"
3. Get connection string
4. Update backend .env with connection string
5. Run migrations
6. Run seeders
```

**Connection String Format:**
```
mysql://user:password@db.planetscale.com/petshop_jogja?ssl={"rejectUnauthorized":true}
```

**Run Migrations on PlanetScale:**
```bash
# Connection string from PlanetScale
mysql -h db.planetscale.com -u root -p petshop_jogja < migrations.sql

# Or use Sequelize CLI
DB_HOST=db.planetscale.com npm run migrate
```

### Option B: AWS RDS

**AWS RDS Setup**
```
1. Go to AWS Console → RDS
2. Create MySQL database
3. Configure instance (db.t2.micro for testing)
4. Enable public accessibility (temporary for setup)
5. Get endpoint
6. Update backend .env
```

### Option C: Self-Hosted MySQL

**VPS MySQL Setup**
```bash
# Install MySQL on your VPS
sudo apt-get update
sudo apt-get install -y mysql-server

# Configure MySQL
sudo mysql_secure_installation

# Create database
mysql -u root -p -e "CREATE DATABASE petshop_jogja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Create user
mysql -u root -p -e "CREATE USER 'petshop'@'%' IDENTIFIED BY 'secure_password';"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON petshop_jogja.* TO 'petshop'@'%';"
mysql -u root -p -e "FLUSH PRIVILEGES;"
```

---

## 🔗 Phase 6: Connect All Services

### DNS Configuration

**Domain Setup** (assuming petshop-jogja.com)

```
DNS Records:
1. Frontend (Vercel):
   - Type: CNAME
   - Name: www
   - Value: cname.vercel-dns.com
   
2. Backend API (Railway):
   - Type: CNAME
   - Name: api
   - Value: api.railway.app

3. Root Domain:
   - Type: A
   - Name: @
   - Value: your-frontend-ip
```

**Update Frontend .env:**
```
NEXT_PUBLIC_API_BASE_URL=https://api.petshop-jogja.com/api/v1
```

**Update Backend .env:**
```
CORS_ORIGIN=https://petshop-jogja.com
```

### SSL/TLS Setup

**Automatic (Vercel/Netlify):**
- ✅ Already configured by platforms
- ✅ Auto-renews certificates

**Manual (Railway/Render):**
- ✅ Provided by platforms
- ✅ Free SSL certificates

**Self-Hosted:**
```bash
# Use Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d petshop-jogja.com -d api.petshop-jogja.com
```

---

## ✅ Phase 7: Post-Deployment Testing

### Verify Backend

```bash
# Test health endpoint
curl https://api.petshop-jogja.com/api/v1/health

# Expected response:
# {"success":true,"status":"UP","database":"CONNECTED"}

# Test API endpoints
curl https://api.petshop-jogja.com/api/v1/petshops
curl https://api.petshop-jogja.com/api/v1/products
curl https://api.petshop-jogja.com/api/v1/compare?product_name=Royal
```

### Verify Frontend

**Open Browser:**
```
1. Go to https://petshop-jogja.com
2. Verify home page loads
3. Test all 6 pages
4. Verify API calls work
5. Check browser console for errors
6. Test on mobile
```

### Database Verification

```bash
# Connect to production database
mysql -h api.petshop-jogja.com -u petshop -p petshop_jogja

# Verify tables
SHOW TABLES;

# Verify data
SELECT COUNT(*) FROM petshops;
SELECT COUNT(*) FROM products;
```

---

## 📊 Phase 8: Monitoring & Maintenance

### Setup Monitoring

**Backend Monitoring**
```
Services:
- Railway/Render: Built-in monitoring
- Uptime Robot: External uptime monitoring
- Sentry: Error tracking
- LogRocket: User session replay
```

**Frontend Monitoring**
```
Services:
- Vercel Analytics: Built-in
- Google Analytics: User behavior
- Sentry: Error tracking
```

### Setup Alerts

**Email Alerts:**
```
- Backend down
- Database connection lost
- High error rate
- Performance degradation
- Disk space low
```

### Logging

**Backend Logs:**
```bash
# View Railway logs
railway logs

# View Render logs
# Dashboard → Logs tab

# View AWS CloudWatch logs
aws logs tail /aws/ecs/petshop-api --follow
```

### Backup Strategy

**Daily Backups:**
```
- Database: Automated (PlanetScale/RDS)
- Code: GitHub repository
- Configuration: Version controlled
- Backup Frequency: Daily
- Retention: 30 days
```

---

## 🔄 Phase 9: Update & Rollback

### Update Process

**Deploy New Version:**
```bash
# 1. Test locally
npm run dev

# 2. Commit to git
git add .
git commit -m "feat: new feature"

# 3. Push to main
git push origin main

# 4. Platform auto-deploys
# Vercel/Railway automatically deploys

# 5. Verify in production
curl https://api.petshop-jogja.com/api/v1/health
```

### Rollback If Issues

**Quick Rollback:**
```bash
# Revert last commit
git revert HEAD

# Push
git push origin main

# Platform auto-deploys reverted version

# Verify
curl https://api.petshop-jogja.com/api/v1/health
```

---

## 💰 Phase 10: Cost Estimation

### Monthly Costs

| Service | Plan | Cost | Notes |
|---------|------|------|-------|
| Vercel (Frontend) | Hobby/Pro | $0-20 | Free tier available |
| Railway (Backend) | Pay-as-you-go | $5-20 | Includes free credits |
| PlanetScale (Database) | Pro | $29+ | $0.80 per million rows |
| Domain | Yearly | $10-15 | Domain registrar |
| Monitoring | Basic | $0-10 | Uptime Robot free tier |
| **Total** | - | **$50-100/mo** | Scalable |

### Cost Optimization

- Use free tiers during development
- Scale as traffic increases
- Use caching to reduce database queries
- Optimize images and assets
- Use CDN for static files

---

## 🎯 Deployment Checklist

### Pre-Deployment
- [ ] All tests pass (26/26)
- [ ] Code reviewed
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations tested
- [ ] Security audit passed
- [ ] Performance tested

### During Deployment
- [ ] Backend deployed successfully
- [ ] Frontend deployed successfully
- [ ] Database migrated successfully
- [ ] DNS updated
- [ ] SSL certificates installed
- [ ] Monitoring configured
- [ ] Alerts setup

### Post-Deployment
- [ ] Health check passes
- [ ] All pages load
- [ ] All API endpoints work
- [ ] Search/filters work
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] Database accessible

---

## 🚨 Troubleshooting

### Frontend Deployment Issues

**Issue: API calls fail in production**
```bash
# Check CORS configuration
# Backend .env: CORS_ORIGIN=https://petshop-jogja.com

# Check API URL
# Frontend .env: NEXT_PUBLIC_API_BASE_URL=https://api.petshop-jogja.com/api/v1

# Verify DNS is working
nslookup api.petshop-jogja.com
```

**Issue: Build fails on Vercel**
```
1. Check build logs in Vercel dashboard
2. Verify all dependencies installed locally
3. Check for TypeScript errors
4. Verify environment variables set
5. Clear build cache: Settings → Git → Clear Cache
```

### Backend Deployment Issues

**Issue: Database connection fails**
```bash
# Test connection string
mysql -h your-db-host -u user -p database_name

# Verify credentials in .env
# Check network/firewall rules
# Ensure public accessibility enabled (if needed)
```

**Issue: Migrations fail in production**
```bash
# SSH into server
# Run migrations manually
npm run migrate

# Check for errors
# Verify database schema
```

---

## 📞 Support Resources

**Deployment Platforms:**
- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)

**Database:**
- [PlanetScale Docs](https://planetscale.com/docs)
- [AWS RDS Docs](https://docs.aws.amazon.com/rds)

**Monitoring:**
- [Sentry Docs](https://docs.sentry.io)
- [Uptime Robot](https://uptimerobot.com)

---

## ✨ Summary

**After following this guide, you will have:**
- ✅ Production-ready backend API
- ✅ Production-ready frontend application
- ✅ Scalable database
- ✅ Monitoring & alerting
- ✅ Automated deployments
- ✅ Custom domain
- ✅ SSL certificates
- ✅ Backup strategy

**Estimated Timeline:**
- Planning: 1 hour
- Setup: 2-3 hours
- Testing: 1-2 hours
- **Total: 4-6 hours for complete deployment**

---

**Ready to deploy? Let's go! 🚀**

---

**Created:** June 14, 2026  
**Status:** Ready for Production  
**Next:** Monitor & Maintain
