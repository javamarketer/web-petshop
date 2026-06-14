# 🚀 Development Startup Guide

Panduan untuk memulai development **PetShop Jogja Finder** setelah dokumentasi selesai.

---

## ✅ Apa yang Sudah Dibuat

### Backend (Express.js + MySQL)
✅ Project structure lengkap  
✅ Configuration (database, middleware, constants)  
✅ Models (Petshop, Product)  
✅ Controllers (petshop, product, compare)  
✅ Routes (petshops, products, compare)  
✅ Middleware (error handler, CORS)  
✅ Utilities (logger, response formatter)  
✅ package.json dengan dependencies  
✅ .env.example template  

### Frontend (Next.js + React)
✅ Project structure lengkap  
✅ TypeScript types  
✅ Axios API client  
✅ Services (petshop, product, compare)  
✅ Layout dan styling (Tailwind CSS)  
✅ Configuration files (next.config, tailwind, tsconfig)  
✅ package.json dengan dependencies  
✅ .env.example template  

---

## 🗂️ Struktur yang Sudah Ada

### Backend
```
backend/
├── src/
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server entry point
│   ├── config/
│   │   ├── database.js        # Database config
│   │   └── constants.js       # App constants
│   ├── models/
│   │   ├── Petshop.js
│   │   ├── Product.js
│   │   └── index.js
│   ├── controllers/
│   │   ├── petshopController.js
│   │   ├── productController.js
│   │   └── compareController.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── petshops.js
│   │   ├── products.js
│   │   └── compare.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── cors.js
│   └── utils/
│       ├── logger.js
│       └── response.js
├── package.json
├── .env.example
├── .eslintrc.json
└── .prettierrc
```

### Frontend
```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── page.tsx           # (akan dibuat)
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── services/
│   │   ├── petshopService.ts
│   │   ├── productService.ts
│   │   └── compareService.ts
│   ├── lib/
│   │   └── api.ts             # Axios instance
│   └── components/            # (akan dibuat)
├── package.json
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── .eslintrc.json
```

---

## 🎯 Next Steps - Apa yang Perlu Dibuat

### 1. Database Setup
```bash
# Create MySQL database
CREATE DATABASE petshop_jogja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Create tables (akan auto-sync via Sequelize)
```

### 2. Backend Pages yang Belum Dibuat
- [ ] Database migrations (untuk flexibility)
- [ ] Database seeders (sample data)
- [ ] Validations (input validation rules)
- [ ] Services layer (business logic - optional, bisa di controller)
- [ ] Tests (unit & integration)

### 3. Frontend Pages yang Belum Dibuat
- [ ] `src/app/page.tsx` - Home page
- [ ] `src/app/petshops/page.tsx` - Petshops list
- [ ] `src/app/petshops/[id]/page.tsx` - Petshop detail
- [ ] `src/app/products/page.tsx` - Products list
- [ ] `src/app/products/[id]/page.tsx` - Product detail
- [ ] `src/app/compare/page.tsx` - Price comparison
- [ ] Components (PetshopCard, ProductCard, SearchBar, Filter, Map, etc.)
- [ ] Hooks (useFetch, useFilter, etc.)

---

## 🔧 Setup & Run

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm/yarn

### Backend Setup

**Step 1: Create .env file**
```bash
cd backend
cp .env.example .env
```

**Step 2: Edit .env**
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=petshop_jogja
DB_USER=root
DB_PASSWORD=your_password
CORS_ORIGIN=http://localhost:3000
```

**Step 3: Install dependencies**
```bash
npm install
```

**Step 4: Create database**
```sql
CREATE DATABASE petshop_jogja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

**Step 5: Start server**
```bash
npm run dev
```

Server akan berjalan di: `http://localhost:5000`

---

### Frontend Setup

**Step 1: Create .env.local file**
```bash
cd frontend
cp .env.example .env.local
```

**Step 2: Install dependencies**
```bash
npm install
```

**Step 3: Start dev server**
```bash
npm run dev
```

App akan berjalan di: `http://localhost:3000`

---

## 📝 File Structure Overview

### Locations
```
e:\latihan\VC Sumir\web-petshop\
├── backend/                      # Backend project
│   └── src/                      # Source code
├── frontend/                     # Frontend project
│   └── src/                      # Source code
│
├── [Documentation Files]         # All MD files
├── .git/                         # Version control
└── .gitignore
```

---

## 🧪 Testing API Endpoints

### Using curl atau Postman

**Get Petshops:**
```bash
curl http://localhost:5000/api/v1/petshops
```

**Get Products:**
```bash
curl http://localhost:5000/api/v1/products
```

**Health Check:**
```bash
curl http://localhost:5000/health
```

---

## 🔗 API Base URL

- Development: `http://localhost:5000/api/v1`
- Frontend akan hit: `process.env.NEXT_PUBLIC_API_URL`

---

## 📦 Dependencies Already Installed (via package.json)

### Backend Dependencies
- express 4.18.2
- sequelize 6.35.2
- mysql2 3.6.5
- dotenv 16.3.1
- cors 2.8.5
- helmet 7.1.0
- express-validator 7.0.0
- morgan 1.10.0

### Frontend Dependencies
- next 15.0.0
- react 19.0.0
- axios 1.6.2
- tailwindcss 3.3.0
- leaflet & react-leaflet

---

## 🎨 Components to Create Next

### Frontend Components
1. **Header/Navbar** - Navigation
2. **Footer** - Footer section
3. **PetshopCard** - Petshop item card
4. **ProductCard** - Product item card
5. **SearchBar** - Global search
6. **Filter** - Product filters
7. **Map** - Leaflet map component
8. **PriceComparison** - Comparison table
9. **Pagination** - Pagination controls
10. **Loading** - Loading skeleton

---

## 📋 Development Checklist

### Week 1-2: Backend API
- [ ] Setup database & migrations
- [ ] Create sample data (seeders)
- [ ] Test all API endpoints
- [ ] Add input validation
- [ ] Setup error handling
- [ ] Add logging

### Week 2-3: Frontend Pages
- [ ] Create Home page
- [ ] Create Petshops page & detail
- [ ] Create Products page & detail
- [ ] Create Compare page
- [ ] Integrate with backend API
- [ ] Add loading states

### Week 3-4: Polish & Deploy
- [ ] Add error handling on frontend
- [ ] Optimize performance
- [ ] Add tests
- [ ] Setup CI/CD
- [ ] Deploy to staging
- [ ] Deploy to production

---

## 🚀 Quick Commands

### Backend
```bash
npm run dev              # Start dev server
npm run lint             # Check code style
npm run lint:fix         # Fix linting issues
npm run test             # Run tests
npm run migrate          # Run migrations
npm run seed             # Load seed data
```

### Frontend
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Check code style
npm run format           # Format code
npm run type-check       # Check TypeScript
```

---

## 🗂️ Created Files Summary

### Backend Files
1. server.js - Entry point
2. app.js - Express setup
3. config/database.js - Database config
4. config/constants.js - App constants
5. models/Petshop.js - Petshop model
6. models/Product.js - Product model
7. models/index.js - Models aggregator
8. controllers/petshopController.js
9. controllers/productController.js
10. controllers/compareController.js
11. routes/index.js
12. routes/petshops.js
13. routes/products.js
14. routes/compare.js
15. middlewares/errorHandler.js
16. middlewares/cors.js
17. utils/logger.js
18. utils/response.js
19. package.json
20. .env.example
21. .eslintrc.json
22. .prettierrc

### Frontend Files
1. app/layout.tsx - Root layout
2. app/globals.css - Global styles
3. types/index.ts - TypeScript types
4. lib/api.ts - Axios client
5. services/petshopService.ts
6. services/productService.ts
7. services/compareService.ts
8. package.json
9. next.config.js
10. tailwind.config.js
11. tsconfig.json
12. postcss.config.js
13. .eslintrc.json
14. .prettierrc
15. .env.example

**Total: 35+ files sudah ready for development**

---

## ✅ Status

- Backend: ✅ Structure ready
- Frontend: ✅ Structure ready
- Documentation: ✅ Complete
- Database: ⏳ Awaiting setup
- API: ⏳ Awaiting testing
- Pages: ⏳ To be created

---

## 📞 Quick Reference

| Item | Location | Status |
|------|----------|--------|
| Database Config | backend/src/config/database.js | ✅ Ready |
| API Routes | backend/src/routes/ | ✅ Ready |
| Controllers | backend/src/controllers/ | ✅ Ready |
| API Services | frontend/src/services/ | ✅ Ready |
| Types | frontend/src/types/ | ✅ Ready |
| Layout | frontend/src/app/layout.tsx | ✅ Ready |
| Styling | frontend/src/app/globals.css | ✅ Ready |

---

## 🎯 Ready to Start?

1. ✅ Read START_HERE.md and documentation
2. ✅ Backend & Frontend structure ready
3. ✅ Setup database
4. ✅ Install dependencies (npm install)
5. ✅ Start backend: npm run dev
6. ✅ Start frontend: npm run dev
7. 🎨 Create pages & components
8. 🧪 Test API
9. 🚀 Deploy!

---

**Happy Coding! 🐾**

Everything is ready. Now start building pages and components!
