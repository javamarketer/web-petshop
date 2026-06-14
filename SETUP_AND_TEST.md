# 🚀 Setup and Testing Guide

**Date:** June 14, 2026  
**Status:** Ready for local testing  
**Target:** Complete MVP testing before deployment

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Backend Setup & Testing](#backend-setup--testing)
5. [Frontend Setup & Testing](#frontend-setup--testing)
6. [API Integration Testing](#api-integration-testing)
7. [Troubleshooting](#troubleshooting)
8. [Next Steps](#next-steps)

---

## 📦 Prerequisites

### System Requirements
- **Node.js**: 18.x or higher (LTS recommended)
- **npm**: 9.x or higher
- **MySQL**: 8.0 or higher
- **Git**: Latest version
- **Code Editor**: VS Code (recommended)

### Installation Verification

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MySQL version
mysql --version
```

---

## 🔧 Environment Setup

### 1. Backend Environment Configuration

**File:** `backend/.env`

Create `.env` file from `.env.example`:

```bash
# Backend .env configuration
NODE_ENV=development
PORT=5000
LOG_LEVEL=debug

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=petshop_jogja
DB_USER=root
DB_PASSWORD=
DB_DIALECT=mysql

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# API Configuration
API_VERSION=v1
API_BASE_URL=http://localhost:5000/api/v1

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### 2. Frontend Environment Configuration

**File:** `frontend/.env.local`

Create `.env.local` file:

```bash
# Frontend environment variables
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_APP_NAME=PetShop Jogja Finder
NEXT_PUBLIC_APP_VERSION=1.0.0
```

---

## 💾 Database Setup

### Step 1: Create MySQL Database

```bash
# Connect to MySQL
mysql -u root -p

# Create database (in MySQL CLI)
CREATE DATABASE petshop_jogja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Verify
SHOW DATABASES;
EXIT;
```

### Step 2: Run Migrations

```bash
# Navigate to backend
cd backend

# Install dependencies (if not done)
npm install

# Run migrations
npm run migrate

# Expected output:
# ✓ 20260614_create_petshops.js
# ✓ 20260614_create_products.js
```

### Step 3: Load Seed Data

```bash
# Seed the database with sample data
npm run seed

# Expected output:
# ✓ 20260614_petshops_seeder.js (5 petshops inserted)
# ✓ 20260614_products_seeder.js (13 products inserted)
```

### Step 4: Verify Database

```bash
# Connect to MySQL and check data
mysql -u root petshop_jogja

# Check tables
SHOW TABLES;

# Check petshops
SELECT COUNT(*) FROM petshops;
# Expected: 5

# Check products
SELECT COUNT(*) FROM products;
# Expected: 13

# Sample query
SELECT p.name, COUNT(pr.id) as total_products 
FROM petshops p 
LEFT JOIN products pr ON p.id = pr.petshop_id 
GROUP BY p.id;

EXIT;
```

---

## 🔌 Backend Setup & Testing

### Step 1: Install Dependencies

```bash
# Navigate to backend
cd backend

# Install all dependencies
npm install

# Expected: ~200+ packages installed
# Time: 2-3 minutes depending on internet speed
```

### Step 2: Start Development Server

```bash
# Terminal 1: Start backend
npm run dev

# Expected output:
# > petshop-jogja-backend@1.0.0 dev
# > nodemon src/server.js
# 
# 🚀 Server running on http://localhost:5000
# ✅ Connected to database: petshop_jogja
# 📊 Database Models loaded: Petshop, Product
```

### Step 3: Test API Endpoints

**Using curl or Postman**

#### 3.1 Health Check

```bash
curl http://localhost:5000/api/v1/health

# Expected Response (200 OK):
# {
#   "success": true,
#   "status": "UP",
#   "timestamp": "2026-06-14T...",
#   "database": "CONNECTED"
# }
```

#### 3.2 Get All Petshops

```bash
curl http://localhost:5000/api/v1/petshops

# Expected Response (200 OK):
# {
#   "success": true,
#   "data": [
#     {
#       "id": 1,
#       "name": "Pet Gallery",
#       "address": "Jl. Gejayan No. 10",
#       "city": "Sleman",
#       "phone": "08123456789",
#       ...
#     }
#   ],
#   "pagination": {
#     "page": 1,
#     "limit": 10,
#     "total": 5,
#     "total_pages": 1
#   }
# }
```

#### 3.3 Get Petshop by ID

```bash
curl http://localhost:5000/api/v1/petshops/1

# Expected Response (200 OK):
# {
#   "success": true,
#   "data": {
#     "id": 1,
#     "name": "Pet Gallery",
#     "products": [...]
#   }
# }
```

#### 3.4 Get All Products

```bash
curl http://localhost:5000/api/v1/products

# Expected Response (200 OK):
# {
#   "success": true,
#   "data": [
#     {
#       "id": 1,
#       "name": "Royal Canin Kitten 2kg",
#       "category": "Makanan Kucing",
#       "price": 245000,
#       "stock": 15,
#       "petshop_id": 1
#     }
#   ],
#   "pagination": {...},
#   "filters": {
#     "categories": [...],
#     "brands": [...]
#   }
# }
```

#### 3.5 Search Products

```bash
curl "http://localhost:5000/api/v1/products?search=Royal%20Canin"

# Expected Response: Products matching "Royal Canin"
```

#### 3.6 Filter Products by Category

```bash
curl "http://localhost:5000/api/v1/products?category=Makanan%20Kucing"

# Expected Response: Products in "Makanan Kucing" category
```

#### 3.7 Compare Product Prices

```bash
curl "http://localhost:5000/api/v1/compare?product_name=Royal%20Canin%20Kitten"

# Expected Response (200 OK):
# {
#   "success": true,
#   "product_name": "Royal Canin Kitten 2kg",
#   "comparison": [
#     {
#       "petshop_id": 1,
#       "petshop_name": "Pet Gallery",
#       "price": 245000,
#       "stock": 15,
#       ...
#     }
#   ],
#   "price_range": {
#     "min": 240000,
#     "max": 250000,
#     "average": 245000,
#     "savings": 10000
#   }
# }
```

### Step 4: Check Linting & Code Quality

```bash
# Lint backend code
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

---

## 🎨 Frontend Setup & Testing

### Step 1: Install Dependencies

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Expected: ~500+ packages
# Time: 3-5 minutes depending on internet speed
```

### Step 2: Start Development Server

```bash
# Terminal 2: Start frontend (keep backend running in Terminal 1)
npm run dev

# Expected output:
# > petshop-jogja-frontend@1.0.0 dev
# > next dev
#
# ▲ Next.js 15.0.0
# - Local: http://localhost:3000
# - Environments: .env.local
#
# ✓ Ready in 2.5s
```

### Step 3: Test Frontend Pages

Open browser and navigate to:

#### 3.1 Home Page
**URL:** http://localhost:3000

**Expected Elements:**
- ✅ Header with logo and navigation
- ✅ Search bar
- ✅ Featured petshops section (6 cards)
- ✅ Popular products section (12 cards)
- ✅ Statistics cards
- ✅ Quick links & CTA buttons
- ✅ Footer

**Test Actions:**
- Click on petshop card → should navigate to petshop detail
- Click on product card → should navigate to product detail
- Type in search bar → should search (if API is working)

#### 3.2 Petshops Page
**URL:** http://localhost:3000/petshops

**Expected Elements:**
- ✅ Petshop list with cards
- ✅ Search input
- ✅ City filter dropdown
- ✅ Pagination
- ✅ Loading states

**Test Actions:**
- Search by petshop name
- Filter by city
- Navigate between pages
- Click on petshop card → petshop detail page

#### 3.3 Petshop Detail Page
**URL:** http://localhost:3000/petshops/1

**Expected Elements:**
- ✅ Hero section with petshop info
- ✅ Contact information card
- ✅ Map preview
- ✅ Products tab with product grid
- ✅ Info tab with tips
- ✅ WhatsApp & call buttons
- ✅ Back navigation

**Test Actions:**
- Click products tab → show products
- Click info tab → show tips
- Click WhatsApp button → open WhatsApp (or URL if installed)

#### 3.4 Products Page
**URL:** http://localhost:3000/products

**Expected Elements:**
- ✅ Product grid (12 per page)
- ✅ Sidebar filters (category, brand, search)
- ✅ Sort dropdown
- ✅ Pagination
- ✅ Results counter

**Test Actions:**
- Search products by name
- Filter by category
- Filter by brand
- Sort by price/name
- Paginate through results

#### 3.5 Product Detail Page
**URL:** http://localhost:3000/products/1

**Expected Elements:**
- ✅ Product info (name, price, stock, category, brand)
- ✅ Petshop info card
- ✅ Price comparison sidebar
- ✅ Related products section
- ✅ WhatsApp buttons per petshop

**Test Actions:**
- See price comparison
- Click WhatsApp button
- Click on related product

#### 3.6 Compare Page
**URL:** http://localhost:3000/compare

**Expected Elements:**
- ✅ Search input
- ✅ Product info header
- ✅ Price range summary (4 cards)
- ✅ Comparison table
- ✅ Info cards at bottom

**Test Actions:**
- Search for product name
- See comparison table
- Click WhatsApp button
- Click "Search Another Product"

### Step 4: Test Responsiveness

**Desktop (1920px)**
- All layouts should be full width
- 3-4 columns for product/petshop grids
- Sidebar filters visible

**Tablet (768px)**
- 2 columns for grids
- Filters might collapse or stack
- Navigation should be accessible

**Mobile (375px)**
- 1 column for grids
- Stack all elements vertically
- Hamburger menu for navigation (if implemented)
- Buttons should be large and touchable

### Step 5: Check TypeScript & Linting

```bash
# Type check frontend code
npm run type-check

# Lint frontend code
npm run lint

# Format code
npm run format
```

---

## 🔗 API Integration Testing

### Test Checklist

- [ ] Backend server starts without errors
- [ ] MySQL database connects successfully
- [ ] Migrations run successfully (5 petshops, 13 products)
- [ ] Health check endpoint responds
- [ ] All GET endpoints return 200 OK
- [ ] Pagination works correctly
- [ ] Search works for petshops and products
- [ ] Filter by city/category/brand works
- [ ] Price comparison endpoint works
- [ ] Frontend can fetch and display petshops
- [ ] Frontend can fetch and display products
- [ ] Navigation between pages works
- [ ] All buttons are clickable and functional
- [ ] WhatsApp links generate correct URLs
- [ ] Google Maps links work
- [ ] Loading states appear during data fetch
- [ ] Error states appear on failed requests

### Integration Test Example (with curl)

**Scenario:** Search for a product and compare prices

```bash
# 1. Search for product
curl "http://localhost:5000/api/v1/products?search=Royal%20Canin"
# ✅ Returns products with "Royal Canin" in name

# 2. Get product detail
curl "http://localhost:5000/api/v1/products/1"
# ✅ Returns full product info with petshop details

# 3. Compare prices
curl "http://localhost:5000/api/v1/compare?product_name=Royal%20Canin%20Kitten"
# ✅ Returns comparison across all petshops

# 4. Frontend flow
# - Navigate to /products
# - Search "Royal Canin"
# - Click on product
# - See comparison sidebar
# - All features should work smoothly
```

---

## 🛠️ Troubleshooting

### Backend Issues

#### Issue: Port 5000 Already in Use
```bash
# Kill process on port 5000
# Windows (PowerShell):
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force

# Or change PORT in .env to 5001
```

#### Issue: Database Connection Failed
```bash
# Check MySQL is running
# Windows: Services > MySQL... should be running
# Or start MySQL manually

# Check credentials in .env
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD= (empty if default)
```

#### Issue: Migrations Won't Run
```bash
# Drop and recreate database
mysql -u root -e "DROP DATABASE petshop_jogja;"
mysql -u root -e "CREATE DATABASE petshop_jogja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Re-run migrations
npm run migrate
npm run seed
```

#### Issue: Nodemon Not Working
```bash
# Reinstall nodemon
npm uninstall nodemon
npm install --save-dev nodemon

# Or run without nodemon
npm start
```

### Frontend Issues

#### Issue: Port 3000 Already in Use
```bash
# Kill process on port 3000
# Or change next.config.js port

# In terminal, Ctrl+C to stop and restart on different port
# next dev -p 3001
```

#### Issue: Modules Not Found
```bash
# Reinstall dependencies
rm -r node_modules package-lock.json
npm install
```

#### Issue: API Not Connecting
```bash
# Check .env.local has correct API URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

# Check backend is running on correct port
# Browser console (F12) should show API calls
```

#### Issue: Build Fails
```bash
# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint

# Try clean build
npm run build
```

### Database Issues

#### Issue: Seed Data Not Inserting
```bash
# Check database connection
mysql -u root petshop_jogja -e "SELECT COUNT(*) FROM petshops;"

# Manually verify tables exist
mysql -u root petshop_jogja -e "SHOW TABLES;"

# Re-run seeders
npm run seed:undo
npm run seed
```

#### Issue: Foreign Key Constraint Errors
```bash
# This usually means products table references petshops that don't exist
# Make sure migrations run in correct order

# Reset database
npm run migrate:undo:all
npm run migrate
npm run seed
```

---

## ✅ Testing Checklist

### Backend Testing
- [ ] Dependencies installed successfully
- [ ] `.env` file configured
- [ ] MySQL database created
- [ ] Migrations ran successfully
- [ ] Seed data loaded (5 petshops, 13 products)
- [ ] `npm run dev` starts server
- [ ] Health check endpoint working
- [ ] All CRUD endpoints working
- [ ] Pagination working
- [ ] Search working
- [ ] Filters working
- [ ] Price comparison working
- [ ] No console errors
- [ ] Linting passed (`npm run lint`)

### Frontend Testing
- [ ] Dependencies installed successfully
- [ ] `.env.local` configured
- [ ] `npm run dev` starts server
- [ ] All 6 pages load without errors
- [ ] Components render correctly
- [ ] API calls successful (check Network tab)
- [ ] Navigation between pages works
- [ ] Search functionality works
- [ ] Filters work
- [ ] Pagination works
- [ ] Responsive design works (test mobile/tablet)
- [ ] No console errors
- [ ] TypeScript compilation clean (`npm run type-check`)
- [ ] Linting passed (`npm run lint`)

### Integration Testing
- [ ] Home page displays featured petshops & products
- [ ] Petshops page searches and filters correctly
- [ ] Can navigate to petshop detail page
- [ ] Petshop detail shows products
- [ ] Products page searches, filters, and sorts
- [ ] Can navigate to product detail page
- [ ] Product detail shows price comparison
- [ ] Compare page searches and compares products
- [ ] All WhatsApp buttons generate correct URLs
- [ ] All links are working

---

## 🎯 Next Steps

After successful testing:

1. **Fix Any Bugs**
   - Document all issues found
   - Create fixes for each issue
   - Re-test after fixes

2. **Optimize Performance**
   - Add database indexes for frequently queried fields
   - Implement caching (Redis)
   - Optimize images and assets
   - Minify CSS/JS

3. **Add Missing Features**
   - SearchBar component
   - Advanced filter component
   - Map component (Leaflet)
   - ErrorBoundary component
   - Loading skeletons

4. **Add Tests**
   - Write unit tests for components
   - Write API integration tests
   - Write E2E tests with Cypress
   - Achieve 80%+ code coverage

5. **Deployment Preparation**
   - Setup CI/CD pipeline (GitHub Actions)
   - Configure production environment
   - Setup monitoring and logging
   - Security audit

6. **Deployment**
   - Deploy backend to Railway/Render
   - Deploy frontend to Vercel
   - Setup custom domain
   - Configure DNS
   - Monitor production

---

## 📞 Quick Commands Reference

```bash
# Backend
cd backend
npm install              # Install dependencies
npm run dev             # Start development server
npm run migrate         # Run database migrations
npm run seed            # Load seed data
npm run lint            # Check code style
npm run test            # Run tests

# Frontend
cd frontend
npm install             # Install dependencies
npm run dev             # Start development server
npm run build           # Build for production
npm run lint            # Check code style
npm run type-check      # Check TypeScript types
npm run format          # Format code

# Database
mysql -u root petshop_jogja
SHOW TABLES;            # List tables
SELECT COUNT(*) FROM petshops;
SELECT * FROM petshops;
SELECT * FROM products;
EXIT;
```

---

## 📝 Notes

- Keep both backend and frontend servers running during development
- Check browser Network tab if API calls fail
- Check browser Console for JavaScript errors
- Check backend console for server-side errors
- Use `curl` or Postman to test API endpoints independently
- Test on multiple screen sizes for responsive design
- Clear browser cache if changes don't appear

---

**Created:** June 14, 2026  
**Last Updated:** June 14, 2026  
**Status:** Ready for Testing ✅
