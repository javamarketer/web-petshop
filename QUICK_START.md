# 🚀 QUICK START GUIDE

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Next.js | 15.x |
| | React | 19.x |
| | Tailwind CSS | 3.x |
| | TypeScript | Latest |
| **Backend** | Node.js | 18+ LTS |
| | Express.js | 4.x |
| | Sequelize | 6.x |
| **Database** | MySQL | 8.0+ |

---

## Development Setup

### Prerequisites
```bash
# Node.js 18+
node --version

# npm or yarn
npm --version

# MySQL 8.0+
mysql --version

# Git
git --version
```

### Backend Setup

```bash
# Clone repository
git clone <repo-url>
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan database credentials

# Database setup
npm run migrate      # Create tables
npm run seed         # Load sample data

# Start development
npm run dev          # Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development
npm run dev          # App runs on http://localhost:3000
```

---

## Key Files & Locations

### Backend Core Files
```
backend/src/
├── app.js              # Express app initialization
├── server.js           # Server entry point
├── models/             # Database models
├── routes/             # API routes
├── controllers/        # Business logic
├── services/           # Data access layer
└── middlewares/        # Request processing
```

### Frontend Core Files
```
frontend/src/
├── app/                # Next.js pages & routes
├── components/         # Reusable React components
├── services/           # API client
├── types/              # TypeScript types
├── lib/                # Utilities
└── styles/             # CSS modules
```

---

## API Endpoints (MVP v1.0)

### Petshops
```
GET    /api/v1/petshops              # List all
GET    /api/v1/petshops?search=name  # Search
GET    /api/v1/petshops/:id          # Detail
```

### Products
```
GET    /api/v1/products              # List all
GET    /api/v1/products?search=name  # Search
GET    /api/v1/products?category=cat # Filter
GET    /api/v1/products/:id          # Detail
```

### Price Comparison
```
GET    /api/v1/compare?product_name=Royal%20Canin
```

### Health Check
```
GET    /api/v1/health
```

---

## Frontend Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Home page | MVP |
| `/petshops` | List all petshops | MVP |
| `/petshops/[id]` | Petshop detail | MVP |
| `/products` | List all products | MVP |
| `/products/[id]` | Product detail | MVP |
| `/compare` | Price comparison | MVP |

---

## Database Schema Quick Reference

### Petshops Table
```sql
Fields: id, name, address, city, phone, email, 
        latitude, longitude, opening_time, closing_time, 
        is_active, created_at, updated_at
```

### Products Table
```sql
Fields: id, petshop_id, name, category, brand, 
        price, stock, is_available, created_at, updated_at
```

---

## Common Commands

### Backend
```bash
npm run dev              # Start dev server
npm run test             # Run tests
npm run lint             # Lint code
npm run lint:fix         # Fix linting issues
npm run migrate          # Run migrations
npm run seed             # Seed database
```

### Frontend
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run test             # Run tests
npm run lint             # Lint code
npm run format           # Format code with prettier
```

---

## Environment Variables Template

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=petshop_jogja
DB_USER=root
DB_PASSWORD=password
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

---

## Testing

### Backend API Test
```bash
# Using curl
curl http://localhost:5000/api/v1/petshops

# Response:
{
  "success": true,
  "data": [...],
  "pagination": {...}
}
```

### Frontend Test
```bash
# Navigate to http://localhost:3000
# Test pages:
# - Home page loads
# - Search functionality works
# - Filters work correctly
# - API calls successful
```

---

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Check database connection
# Verify .env credentials
# Run migrations: npm run migrate
```

### Database connection error
```bash
# Ensure MySQL is running
# Check database exists
mysql -u root -p -e "USE petshop_jogja;"

# Run migrations
npm run migrate
```

### Frontend won't load
```bash
# Clear .next cache
rm -r .next

# Clear node_modules
rm -r node_modules
npm install

# Restart: npm run dev
```

---

## Deployment

### Frontend (Vercel)
```bash
# Push to GitHub
# Connect repository to Vercel
# Set environment variables
# Auto-deploy on git push
```

### Backend (Railway)
```bash
# Connect repository to Railway
# Set environment variables
# Deploy from main branch
# URL: https://your-app.railway.app
```

### Database
```bash
# MySQL Managed Service
# Configure backups
# Setup monitoring
# Connection pooling enabled
```

---

## Performance Checklist

- [ ] API response < 500ms
- [ ] Frontend load < 3 seconds
- [ ] Images optimized
- [ ] Database indexes set
- [ ] Rate limiting enabled
- [ ] Caching configured
- [ ] Error handling complete
- [ ] Logging configured

---

## Security Checklist

- [ ] HTTPS enabled
- [ ] CORS configured
- [ ] Rate limiting active
- [ ] Input validation enabled
- [ ] SQL injection protected
- [ ] Environment variables secured
- [ ] Error messages sanitized
- [ ] Security headers set

---

## Documentation Files

| File | Purpose |
|------|---------|
| `system-design.md` | Architecture & design decisions |
| `system-document.md` | Detailed specifications & APIs |
| `SYNCHRONIZATION_SUMMARY.md` | Changes & improvements made |
| `QUICK_START.md` | This file - quick reference |

---

## Support & References

- **Next.js Docs:** https://nextjs.org/docs
- **Express.js Docs:** https://expressjs.com/
- **Sequelize Docs:** https://sequelize.org/
- **MySQL Docs:** https://dev.mysql.com/doc/
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## Project Status

**Version:** 1.0 (MVP)  
**Status:** 🟡 Development Ready  
**Target Launch:** Q3 2026 (July-September)

- [x] Documentation complete
- [ ] Development started
- [ ] API development
- [ ] Frontend development
- [ ] Testing phase
- [ ] Deployment
- [ ] Production launch

---

**Last Updated:** June 14, 2026  
**Ready for Development:** ✅
