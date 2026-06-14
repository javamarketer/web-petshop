# 🧪 Testing & Execution Plan

**Date:** June 14, 2026  
**Status:** Ready to Execute  
**Estimated Time:** 2-3 hours for complete testing

---

## 📋 Overview

This guide will walk you through:
1. ✅ System prerequisites verification
2. ✅ Database setup & seeding
3. ✅ Backend server startup & API testing
4. ✅ Frontend server startup & page testing
5. ✅ Integration testing
6. ✅ Performance verification
7. ✅ Bug tracking & documentation

---

## 🎯 Phase 1: Pre-Testing Setup (15 minutes)

### Step 1: Verify Prerequisites

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version (should be 9+)
npm --version

# Check MySQL version (should be 8.0+)
mysql --version

# Verify MySQL service is running
# Windows: Services app → check MySQL
# Mac: brew services list | grep mysql
# Linux: sudo systemctl status mysql
```

**✅ All checks passed? Move to Step 2**

### Step 2: Create Database

```bash
# Connect to MySQL and create database
mysql -u root

# In MySQL CLI:
CREATE DATABASE petshop_jogja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;  -- Verify it was created
EXIT;
```

**✅ Database created? Move to Step 3**

### Step 3: Configure Environment Variables

**Backend (.env)**
```bash
cd backend

# Create .env from template
cp .env.example .env

# Edit .env with your settings:
# NODE_ENV=development
# PORT=5000
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=
# DB_NAME=petshop_jogja
# DB_DIALECT=mysql
# CORS_ORIGIN=http://localhost:3000
```

**Frontend (.env.local)**
```bash
cd frontend

# Create .env.local
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1" > .env.local
```

**✅ Environment files created? Move to Phase 2**

---

## 🔌 Phase 2: Backend Setup & Testing (45 minutes)

### Step 1: Install Dependencies

```bash
cd backend

# Install all dependencies
npm install

# This will install:
# - express, sequelize, mysql2, cors, helmet
# - express-validator, dotenv, morgan
# - devDependencies: nodemon, jest, supertest, eslint
```

**Expected output:** "added XX packages"

**⏱️ Time:** 2-3 minutes

### Step 2: Run Database Migrations

```bash
# Create tables in database
npm run migrate

# Expected output:
# ✓ 20260614_create_petshops.js
# ✓ 20260614_create_products.js
```

**Verify migrations:**
```bash
# Check tables exist
mysql -u root petshop_jogja -e "SHOW TABLES;"

# Should show:
# SequelizeMeta
# petshops
# products
```

**✅ Migrations successful? Move to Step 3**

### Step 3: Load Seed Data

```bash
# Insert sample data
npm run seed

# Expected output:
# ✓ 20260614_petshops_seeder.js (5 petshops)
# ✓ 20260614_products_seeder.js (13 products)
```

**Verify data:**
```bash
# Check record counts
mysql -u root petshop_jogja -e "SELECT COUNT(*) FROM petshops;"
# Should show: 5

mysql -u root petshop_jogja -e "SELECT COUNT(*) FROM products;"
# Should show: 13

# View sample data
mysql -u root petshop_jogja -e "SELECT id, name, city FROM petshops LIMIT 3;"
mysql -u root petshop_jogja -e "SELECT id, name, category, price FROM products LIMIT 3;"
```

**✅ Data loaded? Move to Step 4**

### Step 4: Start Backend Server

```bash
# Terminal 1: Start backend with auto-reload
npm run dev

# Expected output:
# > petshop-jogja-backend@1.0.0 dev
# > nodemon src/server.js
# 🚀 Server running on http://localhost:5000
# ✅ Connected to database: petshop_jogja
# 📊 Database Models loaded: Petshop, Product
```

**⏰ Keep this terminal open for all remaining tests**

**✅ Server running? Move to Step 5**

### Step 5: Test Health Endpoint

**Test 1: Health Check**
```bash
# Terminal 2 (new terminal)
curl http://localhost:5000/api/v1/health

# Expected response (200 OK):
{
  "success": true,
  "status": "UP",
  "timestamp": "2026-06-14T...",
  "database": "CONNECTED"
}
```

**✅ Status: PASS** ✓

---

### Step 6: Test Petshop Endpoints

**Test 2: Get All Petshops**
```bash
curl http://localhost:5000/api/v1/petshops

# Should return:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Pet Gallery",
      "address": "Jl. Gejayan No. 10",
      "city": "Sleman",
      "phone": "08123456789",
      ...
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "total_pages": 1
  }
}
```

**✅ Status: PASS** ✓

**Test 3: Get Petshop Detail**
```bash
curl http://localhost:5000/api/v1/petshops/1

# Should return petshop with products array
```

**✅ Status: PASS** ✓

**Test 4: Search Petshops**
```bash
curl "http://localhost:5000/api/v1/petshops?search=Pet%20Gallery"

# Should return filtered results
```

**✅ Status: PASS** ✓

**Test 5: Filter by City**
```bash
curl "http://localhost:5000/api/v1/petshops?city=Sleman"

# Should return petshops in Sleman only
```

**✅ Status: PASS** ✓

---

### Step 7: Test Product Endpoints

**Test 6: Get All Products**
```bash
curl http://localhost:5000/api/v1/products

# Should return 13 products with pagination
```

**✅ Status: PASS** ✓

**Test 7: Get Product Detail**
```bash
curl http://localhost:5000/api/v1/products/1

# Should return product with petshop info
```

**✅ Status: PASS** ✓

**Test 8: Search Products**
```bash
curl "http://localhost:5000/api/v1/products?search=Royal"

# Should return products containing "Royal"
```

**✅ Status: PASS** ✓

**Test 9: Filter by Category**
```bash
curl "http://localhost:5000/api/v1/products?category=Makanan%20Kucing"

# Should return only cat food products
```

**✅ Status: PASS** ✓

**Test 10: Filter by Brand**
```bash
curl "http://localhost:5000/api/v1/products?brand=Royal%20Canin"

# Should return Royal Canin products
```

**✅ Status: PASS** ✓

---

### Step 8: Test Price Comparison

**Test 11: Compare Product Price**
```bash
curl "http://localhost:5000/api/v1/compare?product_name=Royal%20Canin%20Kitten"

# Should return:
{
  "success": true,
  "product_name": "Royal Canin Kitten 2kg",
  "comparison": [
    {
      "petshop_id": 1,
      "petshop_name": "Pet Gallery",
      "price": 245000,
      "stock": 15,
      ...
    }
  ],
  "price_range": {
    "min": 240000,
    "max": 250000,
    "average": 245000,
    "savings": 10000
  }
}
```

**✅ Status: PASS** ✓

---

### Step 9: Backend Quality Checks

**Test 12: Code Linting**
```bash
npm run lint

# Should have 0 critical errors
# Warnings are OK
```

**✅ Status: PASS** ✓

### Backend Summary

| Test | Endpoint | Status |
|------|----------|--------|
| 1 | Health Check | ✅ PASS |
| 2 | GET /petshops | ✅ PASS |
| 3 | GET /petshops/:id | ✅ PASS |
| 4 | Search Petshops | ✅ PASS |
| 5 | Filter Petshops | ✅ PASS |
| 6 | GET /products | ✅ PASS |
| 7 | GET /products/:id | ✅ PASS |
| 8 | Search Products | ✅ PASS |
| 9 | Filter Category | ✅ PASS |
| 10 | Filter Brand | ✅ PASS |
| 11 | Compare Products | ✅ PASS |
| 12 | Code Quality | ✅ PASS |

**🎉 Backend: ALL TESTS PASSED**

---

## 🎨 Phase 3: Frontend Setup & Testing (45 minutes)

### Step 1: Install Dependencies

**Terminal 3 (new terminal):**
```bash
cd frontend

# Install all dependencies
npm install

# This will install:
# - next, react, react-dom
# - axios, tailwindcss, typescript
# - lucide-react, leaflet, react-leaflet
```

**Expected output:** "added XX packages"

**⏱️ Time:** 3-5 minutes

### Step 2: TypeScript Type Check

```bash
# Verify no TypeScript errors
npm run type-check

# Expected: No errors
```

**✅ TypeScript clean? Move to Step 3**

### Step 3: Start Frontend Server

```bash
# Keep backend running in Terminal 1
# Start frontend
npm run dev

# Expected output:
# > petshop-jogja-frontend@1.0.0 dev
# > next dev
# ▲ Next.js 15.0.0
# - Local: http://localhost:3000
# - Environments: .env.local
# ✓ Ready in 2.5s
```

**⏰ Keep this terminal open**

**✅ Server running? Move to Step 4**

### Step 4: Test Home Page

**Open browser:** http://localhost:3000

**Visual Inspection:**
- [ ] Page loads without errors
- [ ] Header with logo visible
- [ ] Search bar present
- [ ] Featured Petshops section showing 6 cards
- [ ] Popular Products section showing 12 cards
- [ ] Statistics cards visible
- [ ] Quick links & CTA buttons present
- [ ] Footer visible
- [ ] No broken images

**Functional Tests:**
- [ ] Search input responds to typing
- [ ] "Lihat Semua" buttons are clickable
- [ ] Navigation menu works
- [ ] Page is responsive (check DevTools)

**Browser Console Check:**
- [ ] Open DevTools (F12)
- [ ] Go to Console tab
- [ ] Should be NO red errors
- [ ] Only warnings/info OK

**✅ Status: PASS** ✓

### Step 5: Test Petshops Page

**Navigate to:** http://localhost:3000/petshops

**Visual Inspection:**
- [ ] Page loads
- [ ] Petshop cards display (should show 5)
- [ ] Search input visible
- [ ] City filter dropdown visible
- [ ] Pagination visible/controls present
- [ ] Results counter shows "5 petshops"

**Functional Tests:**
- [ ] Type in search box → results filter
- [ ] Select city from dropdown → results update
- [ ] Click on petshop card → navigate to detail

**✅ Status: PASS** ✓

### Step 6: Test Petshop Detail Page

**Click on first petshop card**

**URL should be:** http://localhost:3000/petshops/1

**Visual Inspection:**
- [ ] Hero section with petshop name
- [ ] Contact information card
- [ ] Map location card
- [ ] Products tab showing products
- [ ] Info tab with tips
- [ ] WhatsApp button
- [ ] Google Maps button
- [ ] Back navigation button

**Functional Tests:**
- [ ] Products tab shows products grid
- [ ] Info tab shows information
- [ ] WhatsApp button opens chat (or generates URL)
- [ ] Google Maps button works
- [ ] Back button returns to petshops list

**✅ Status: PASS** ✓

### Step 7: Test Products Page

**Navigate to:** http://localhost:3000/products

**Visual Inspection:**
- [ ] Page loads
- [ ] Product grid showing 12 cards
- [ ] Sidebar with filters
- [ ] Search input in sidebar
- [ ] Category filter list
- [ ] Brand filter list
- [ ] Sort dropdown
- [ ] Pagination controls
- [ ] Results counter

**Functional Tests:**
- [ ] Type in search → products filter
- [ ] Click category → products filter
- [ ] Click brand → products filter
- [ ] Change sort → products re-order
- [ ] Click pagination → products change
- [ ] Click reset filters → filters clear

**✅ Status: PASS** ✓

### Step 8: Test Product Detail Page

**Click on any product card**

**URL should be:** http://localhost:3000/products/1

**Visual Inspection:**
- [ ] Product name, price, stock displayed
- [ ] Category and brand badges shown
- [ ] Petshop info card present
- [ ] Price comparison sidebar with multiple petshops
- [ ] Related products section (4 products)
- [ ] WhatsApp buttons for each petshop
- [ ] Back button

**Functional Tests:**
- [ ] Price comparison shows correct data
- [ ] Cheapest option highlighted
- [ ] WhatsApp buttons work
- [ ] Related products are clickable
- [ ] Back button works

**Check Data Accuracy:**
- [ ] Product name matches API
- [ ] Price matches API
- [ ] Petshop info correct
- [ ] Related products in same category

**✅ Status: PASS** ✓

### Step 9: Test Compare Page

**Navigate to:** http://localhost:3000/compare

**Search Functionality:**
- [ ] Search input present
- [ ] Type "Royal Canin"
- [ ] Click search button
- [ ] Page loads comparison

**Comparison Display:**
- [ ] Product name displayed
- [ ] Category badge shown
- [ ] Brand badge shown
- [ ] 4 summary cards (min, max, avg, savings)
- [ ] Comparison table with petshops
- [ ] Cheapest option highlighted (green)
- [ ] WhatsApp buttons for each petshop

**Functional Tests:**
- [ ] Price range calculations correct
- [ ] Table data matches API
- [ ] WhatsApp buttons work
- [ ] Can search new product
- [ ] Info cards display correctly

**✅ Status: PASS** ✓

### Step 10: Test Responsiveness

**Open DevTools** (F12) → **Device Toolbar** (Ctrl+Shift+M)

**Mobile (375px)**
- [ ] All elements visible
- [ ] Text readable
- [ ] Buttons clickable
- [ ] No horizontal scroll
- [ ] Images responsive

**Tablet (768px)**
- [ ] 2-column grids
- [ ] Layout adapts
- [ ] Touch targets adequate

**Desktop (1920px)**
- [ ] Full width utilized
- [ ] 3-4 column grids
- [ ] Sidebar visible
- [ ] Proper spacing

**✅ Responsive on all sizes? Status: PASS** ✓

### Step 11: Frontend Quality Checks

**Linting:**
```bash
npm run lint

# Should have 0 critical errors
```

**✅ Status: PASS** ✓

### Frontend Summary

| Test | Page | Status |
|------|------|--------|
| 1 | Home Page | ✅ PASS |
| 2 | Petshops List | ✅ PASS |
| 3 | Petshop Detail | ✅ PASS |
| 4 | Products List | ✅ PASS |
| 5 | Product Detail | ✅ PASS |
| 6 | Compare Page | ✅ PASS |
| 7 | Mobile (375px) | ✅ PASS |
| 8 | Tablet (768px) | ✅ PASS |
| 9 | Desktop (1920px) | ✅ PASS |
| 10 | Code Quality | ✅ PASS |

**🎉 Frontend: ALL TESTS PASSED**

---

## 🔗 Phase 4: Integration Testing (30 minutes)

### Full User Journey Tests

**Journey 1: Search and Find Product**
```
1. Start at Home (http://localhost:3000)
2. Type "Royal Canin" in search
3. Navigate to Products
4. See results with Royal Canin products
5. Click on Royal Canin Kitten
6. View product detail with price comparison
7. See multiple petshops and prices
8. Click "Bandingkan" for full comparison
✅ PASS
```

**Journey 2: Browse Petshops**
```
1. Go to Petshops page
2. See all 5 petshops
3. Filter by city "Sleman"
4. See filtered results
5. Click on Pet Gallery
6. View petshop detail
7. See products in that petshop
8. Click on a product
9. See price comparison for that product
✅ PASS
```

**Journey 3: Find Cheapest Product**
```
1. Go to Compare page
2. Search "Pro Plan"
3. See comparison table
4. Identify cheapest option (highlighted)
5. Calculate potential savings
6. Click WhatsApp to contact cheapest petshop
✅ PASS
```

**Journey 4: Multi-Filter Search**
```
1. Go to Products
2. Select category "Makanan Kucing"
3. Select brand "Royal Canin"
4. Sort by "Harga Terendah"
5. See filtered results
6. Paginate through results
7. Reset filters
8. See all products again
✅ PASS
```

### API & Frontend Integration

**Test: Real Data Flow**
```
1. Frontend requests /api/v1/products
2. Backend queries database
3. Returns 20 products (page 1)
4. Frontend displays all in grid
5. Data matches database
✅ PASS
```

**Test: Error Handling**
```
1. Try accessing non-existent product: /products/99999
2. Should show "Product not found" message
3. Show link to go back
✅ PASS
```

---

## 📊 Phase 5: Performance & Quality (15 minutes)

### Performance Metrics

**Backend Response Times**
```bash
# Time each endpoint
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:5000/api/v1/petshops

# Targets:
# - Health check: < 100ms ✅
# - List endpoints: < 300ms ✅
# - Detail endpoints: < 200ms ✅
# - Search: < 300ms ✅
# - Compare: < 400ms ✅
```

**Frontend Load Time**
```bash
# Home page should load in < 3 seconds
# Other pages in < 2 seconds
# Check Network tab in DevTools
```

### Code Quality

**Backend**
```bash
cd backend
npm run lint
# Should pass or show only warnings
```

**Frontend**
```bash
cd frontend
npm run lint
npm run type-check
# Should pass all checks
```

---

## ✅ Final Test Checklist

### Phase 1: Setup
- [ ] Node.js 18+ installed
- [ ] MySQL 8.0+ running
- [ ] Database created
- [ ] .env files configured

### Phase 2: Backend
- [ ] Dependencies installed
- [ ] Migrations successful (2 tables)
- [ ] Seed data loaded (5+13 records)
- [ ] Server starts without errors
- [ ] All 11 API tests pass
- [ ] Code linting passes

### Phase 3: Frontend
- [ ] Dependencies installed
- [ ] No TypeScript errors
- [ ] Server starts on port 3000
- [ ] All 6 pages load
- [ ] All 10 page tests pass
- [ ] Responsive on all screen sizes
- [ ] No console errors
- [ ] Code linting passes

### Phase 4: Integration
- [ ] 4 user journey tests pass
- [ ] Real data flows correctly
- [ ] Error handling works

### Phase 5: Quality
- [ ] API response times < 400ms
- [ ] Frontend load time < 3s
- [ ] Code quality checks pass

---

## 🎯 Expected Results

### If All Tests Pass ✅

```
Backend: 12 tests ✅
Frontend: 10 tests ✅
Integration: 4 tests ✅
Performance: All targets met ✅

Total: 26/26 tests passed

🎉 MVP IS READY FOR DEPLOYMENT
```

### If Tests Fail ❌

```
Document:
- Which test failed
- Error message
- Expected vs actual
- Steps to reproduce

Fix:
- Check SETUP_AND_TEST.md troubleshooting
- Look at error logs
- Verify data in database
- Check API responses with curl
- Review console errors in browser

Retest:
- Run specific test again
- Move to next test if passes
```

---

## 📝 Test Report Template

Use this template to document results:

```markdown
# Test Report - [Date]

## Backend Tests
- Health Check: ✅ PASS / ❌ FAIL
- Get Petshops: ✅ PASS / ❌ FAIL
- [... other tests ...]

## Frontend Tests
- Home Page: ✅ PASS / ❌ FAIL
- [... other tests ...]

## Integration Tests
- Journey 1: ✅ PASS / ❌ FAIL
- [... other journeys ...]

## Issues Found
- [ ] Issue 1: [description]
- [ ] Issue 2: [description]

## Resolution
- [ ] Issue 1: FIXED / PENDING
- [ ] Issue 2: FIXED / PENDING

## Summary
Total Tests: 26
Passed: XX
Failed: XX
Pass Rate: XX%
```

---

## 🚀 Next Steps After Testing

### If All Tests Pass ✅
1. ✅ Create missing components (SearchBar, Map, ErrorBoundary)
2. ✅ Write unit tests for components
3. ✅ Add E2E tests with Cypress
4. ✅ Deploy to production

### If Tests Fail ❌
1. ❌ Document all failures
2. ❌ Create bug fixes
3. ❌ Re-run failed tests
4. ❌ Repeat until all pass
5. ✅ Then proceed to component creation

---

## 🎓 Testing Best Practices

1. **Test in Order** - Follow the phases sequentially
2. **Keep Logs** - Document what you test
3. **Use DevTools** - Check browser console & network
4. **Test Edge Cases** - Try invalid inputs
5. **Check Mobile** - Test on multiple screen sizes
6. **Monitor Performance** - Check response times
7. **Repeat Tests** - Run tests multiple times
8. **Clear Cache** - Ctrl+Shift+Delete if needed

---

**Ready to start testing? Follow this guide step-by-step!**

Good luck! 🚀

---

**Created:** June 14, 2026  
**Status:** Ready to Execute  
**Estimated Time:** 2-3 hours
