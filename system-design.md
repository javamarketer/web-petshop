# System Design - PetShop Jogja Finder

**Version:** 1.0  
**Last Updated:** June 2026  
**Tech Stack:** Next.js 15 + Node.js (Express.js) + MySQL 8

---

## 1. Overview

**PetShop Jogja Finder** adalah aplikasi web direktori petshop yang menyediakan informasi lengkap tentang petshop di Daerah Istimewa Yogyakarta, meliputi:

**Fitur Utama:**
* 📍 Lokasi petshop (integrasi peta interaktif)
* ℹ️ Informasi petshop (nama, alamat, kontak, jam operasional)
* 🐾 Daftar produk per petshop
* 💰 Harga produk real-time
* 🔍 Pencarian produk dengan filter advanced
* 📊 Perbandingan harga antar petshop
* 🎯 Rekomendasi berdasarkan kategori

**Target Pengguna:**
* 👨‍👩‍👧 Pemilik hewan peliharaan (cat, dog, bird, etc.)
* 🤝 Komunitas pecinta hewan
* 🏪 Pemilik petshop (untuk marketing)
* 📱 Mobile users yang mencari petshop terdekat

---

# 2. System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                      User Browser                           │
│                  (Desktop / Mobile)                         │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS
                         ▼
        ┌────────────────────────────────┐
        │  Next.js Frontend (React 19)   │
        │ ┌──────────────────────────┐   │
        │ │ Pages (App Router)       │   │
        │ │ Components               │   │
        │ │ Tailwind CSS             │   │
        │ │ Leaflet Maps             │   │
        │ │ Axios HTTP Client        │   │
        │ └──────────────────────────┘   │
        │ Deployed: Vercel               │
        └────────────────┬────────────────┘
                         │ REST API/JSON
                         ▼
        ┌────────────────────────────────┐
        │ Node.js Backend (Express.js)   │
        │ ┌──────────────────────────┐   │
        │ │ API Routes (/api/v1)     │   │
        │ │ Controllers              │   │
        │ │ Services (Business Logic)│   │
        │ │ Middleware (Auth, Error) │   │
        │ │ Validation               │   │
        │ └──────────────────────────┘   │
        │ Deployed: Railway/Render       │
        └────────────────┬────────────────┘
                         │ SQL
                         ▼
        ┌────────────────────────────────┐
        │     MySQL 8 Database           │
        │ ┌──────────────────────────┐   │
        │ │ Tables:                  │   │
        │ │ - petshops               │   │
        │ │ - products               │   │
        │ │ Indexes, Relations       │   │
        │ └──────────────────────────┘   │
        │ Deployed: Managed MySQL        │
        └────────────────────────────────┘
```

**Communication Flow:**
1. User membuka aplikasi di browser
2. Browser download Next.js aplikasi dari Vercel
3. User berinteraksi dengan UI (search, filter, dll)
4. Frontend mengirim HTTP request ke backend API
5. Backend query database dan return JSON response
6. Frontend render data dengan Tailwind CSS + Leaflet Maps

---

# 3. Technology Stack

## Frontend

**Framework & Runtime:**
* Next.js 15 (latest - React 19)
* React 19 (UI library)
* TypeScript (recommended)
* Node.js 18+ LTS

**UI & Styling:**
* Tailwind CSS 3.x
* Headless UI components
* CSS Modules (optional)

**HTTP & Data:**
* Axios (REST API client)
* SWR / React Query (optional - data fetching)
* Fetch API (native alternative)

**Maps & Location:**
* Leaflet.js (open-source mapping)
* Leaflet React wrapper
* OpenStreetMap (free tile provider)

**Performance:**
* Image Optimization (Next.js built-in)
* Code Splitting (automatic)
* Static Generation (SSG)
* Incremental Static Regeneration (ISR)

**Dev Tools:**
* ESLint
* Prettier (code formatting)
* Jest (testing)

---

## Backend

**Framework & Runtime:**
* Node.js 18+ LTS
* Express.js 4.x
* TypeScript (recommended)

**Database & ORM:**
* MySQL 8.0+
* Sequelize 6.x (ORM)
* MySQL2 driver

**Validation & Security:**
* Express Validator (input validation)
* Helmet.js (security headers)
* CORS (cross-origin requests)
* Rate Limiter (express-rate-limit)

**Environment & Config:**
* dotenv (environment variables)
* config package (alternative)

**Logging & Monitoring:**
* Morgan (HTTP request logger)
* Winston (application logger)
* Sentry (error tracking - optional)

**Testing:**
* Jest (unit tests)
* Supertest (API testing)
* Factory Boy pattern (test fixtures)

---

## Database

**DBMS:**
* MySQL 8.0+ Community Edition
* Charset: utf8mb4 (emoji & unicode support)
* Collation: utf8mb4_unicode_ci

**Tools:**
* Sequelize CLI (migrations & seeders)
* MySQL Workbench (visual management)
* adminer (web management)

---

## Deployment

### Frontend
* **Primary:** Vercel (free tier available)
* **Alternative:** Netlify, GitHub Pages, Railway

### Backend
* **Options:**
  - Railway (recommended - simple setup)
  - Render (free tier with limitations)
  - Heroku (deprecated but still active)
  - VPS: DigitalOcean, Linode, AWS EC2

### Database
* **Managed:** PlanetScale, AWS RDS, DigitalOcean Managed DB
* **Self-hosted:** VPS MySQL, Docker container
* **Development:** Local MySQL server

---

## DevOps & Infrastructure

**Containerization (optional):**
* Docker (containerize backend + MySQL)
* Docker Compose (local development)

**CI/CD:**
* GitHub Actions (free with GitHub)
* GitLab CI
* Jenkins

**Monitoring:**
* New Relic (APM - optional paid)
* CloudFlare (CDN + DDoS protection)
* Sentry (error tracking)

---

# 4. Core Modules

## 4.1 Petshop Module

**Responsibilities:**
* Menampilkan daftar petshop dengan pagination
* Pencarian petshop berdasarkan nama/alamat
* Filter petshop berdasarkan kota
* Detail petshop dengan produk list
* Lokasi petshop di peta interaktif

**Frontend Components:**
* PetshopList (halaman `/petshops`)
* PetshopCard (komponen individual)
* PetshopDetail (halaman `/petshops/[id]`)
* PetshopMap (Leaflet map)

**Backend Endpoints:**
* `GET /api/v1/petshops` - Get all petshops
* `GET /api/v1/petshops?search=name&city=Sleman` - Search & filter
* `GET /api/v1/petshops/:id` - Get detail

**Database:**
```sql
-- Petshops table
id, name, address, city, phone, email, latitude, longitude,
opening_time, closing_time, is_active, created_at, updated_at
```

**Data Sample:**
```json
{
  "id": 1,
  "name": "Pet Gallery",
  "address": "Jl. Gejayan No. 10",
  "city": "Sleman",
  "phone": "08123456789",
  "email": "info@petgallery.com",
  "latitude": -7.7601,
  "longitude": 110.3890,
  "opening_time": "08:00",
  "closing_time": "18:00"
}
```

---

## 4.2 Product Module

**Responsibilities:**
* Menampilkan daftar produk dengan pagination
* Pencarian produk berdasarkan nama/brand
* Filter produk berdasarkan kategori
* Detail produk dengan info petshop
* Price range filtering (future)

**Frontend Components:**
* ProductList (halaman `/products`)
* ProductCard (komponen individual)
* ProductDetail (halaman `/products/[id]`)
* ProductFilter (sidebar dengan filter options)

**Backend Endpoints:**
* `GET /api/v1/products` - Get all products
* `GET /api/v1/products?search=Royal&category=Makanan` - Search & filter
* `GET /api/v1/products/:id` - Get detail

**Categories:**
* Makanan Kucing
* Makanan Anjing
* Makanan Hewan Lain
* Pasir Kucing
* Vitamin & Suplemen
* Kandang & Rumah
* Aksesoris & Mainan
* Grooming

**Database:**
```sql
-- Products table
id, petshop_id, name, description, category, brand, price, stock,
is_available, image_url, created_at, updated_at
```

**Data Sample:**
```json
{
  "id": 1,
  "petshop_id": 1,
  "name": "Royal Canin Kitten 2kg",
  "category": "Makanan Kucing",
  "brand": "Royal Canin",
  "price": 245000,
  "stock": 15,
  "is_available": true
}
```

---

## 4.3 Price Comparison Module

**Responsibilities:**
* Membandingkan harga produk yang sama pada beberapa petshop
* Highlight harga termurah
* Menampilkan info petshop (kontak, alamat)
* WhatsApp quick link (future)

**Frontend:**
* Compare Page (halaman `/compare`)
* Comparison Table (responsive design)
* Product Search dengan autocomplete

**Backend Endpoint:**
* `GET /api/v1/compare?product_name=Royal%20Canin` - Price comparison

**Output Contoh:**

| Produk | Petshop | Harga | Stock | Kontak |
|--------|---------|-------|-------|--------|
| Royal Canin Kitten 2kg | Pet Gallery | Rp245.000 | 15 | 08123456789 |
| Royal Canin Kitten 2kg | Petshop Sejahtera | Rp250.000 | 20 | 08198765432 |
| Royal Canin Kitten 2kg | Pet Paradise | Rp240.000 | 8 | 08555666777 |

**Features:**
* Highlight cheapest option (green)
* Show price difference
* Display petshop address for navigation
* WhatsApp button (future v2.0)

---

## 4.4 Search & Filter Module

**Responsibilities:**
* Global search functionality
* Advanced filtering (category, brand, price)
* Autocomplete suggestions
* Search history (client-side - future)

**Search Capabilities:**
* Search by product name
* Search by brand
* Search by petshop name
* Full-text search (MySQL FULLTEXT index)

**Filter Options:**
* Category (dropdown)
* Brand (multi-select)
* Price range (slider - future)
* Stock availability (checkbox)
* Sort options (price ASC/DESC, name, newest)

---

# 5. Database Design

## 5.1 Table: petshops

```sql
CREATE TABLE petshops (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) DEFAULT 'Yogyakarta',
    postal_code VARCHAR(10),
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255),
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    opening_time TIME,
    closing_time TIME,
    is_active BOOLEAN DEFAULT TRUE,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    KEY idx_city (city),
    KEY idx_name (name),
    KEY idx_is_active (is_active),
    FULLTEXT KEY ft_search (name, address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 5.2 Table: products

```sql
CREATE TABLE products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    petshop_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100),
    price DECIMAL(12,2) NOT NULL,
    stock INT DEFAULT 0,
    is_available BOOLEAN DEFAULT TRUE,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY fk_petshop (petshop_id) REFERENCES petshops(id) ON DELETE CASCADE,
    KEY idx_petshop_id (petshop_id),
    KEY idx_category (category),
    KEY idx_brand (brand),
    KEY idx_is_available (is_available),
    FULLTEXT KEY ft_search (name, brand)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 5.3 Entity Relationship

```
┌─────────────────────────────┐
│         PETSHOPS (1)        │
├─────────────────────────────┤
│ PK: id                      │
│ name, address, city, phone  │
│ latitude, longitude         │
│ opening_time, closing_time  │
│ is_active                   │
└────────────┬────────────────┘
             │
             │ 1:N Relationship
             │ (1 petshop has many products)
             │
             ▼
┌─────────────────────────────┐
│        PRODUCTS (N)         │
├─────────────────────────────┤
│ PK: id                      │
│ FK: petshop_id              │
│ name, brand, category       │
│ price, stock                │
│ is_available                │
└─────────────────────────────┘
```

---

## 5.4 Indexes Strategy

**Petshops Table:**
* `idx_city` - untuk filter by city (frequently used)
* `idx_name` - untuk sort/search by name
* `idx_is_active` - untuk show only active petshops
* `ft_search` - FULLTEXT untuk advanced search (name + address)

**Products Table:**
* `idx_petshop_id` - untuk query products per petshop
* `idx_category` - untuk filter by category
* `idx_brand` - untuk filter by brand
* `idx_is_available` - untuk show available products
* `ft_search` - FULLTEXT untuk advanced search (name + brand)

---

# 6. API Design

## 6.1 Base Configuration

**Base URL (Production):** `https://api.petshop-jogja.com/api/v1`  
**Base URL (Development):** `http://localhost:5000/api/v1`  
**Response Format:** JSON  
**Authentication:** None (MVP v1.0 - public API)  
**Rate Limiting:** 100 requests per minute per IP

---

## 6.2 Response Format Standard

**Success Response:**
```json
{
  "success": true,
  "data": {},
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "total_pages": 10
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "search",
      "message": "Must be at least 2 characters"
    }
  ]
}
```

---

## 6.3 Petshop Endpoints

### GET /petshops
Get all petshops with pagination & filtering

**Query Parameters:**
```
page=1&limit=10&city=Sleman&search=Pet
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Pet Gallery",
      "address": "Jl. Gejayan No. 10",
      "city": "Sleman",
      "phone": "08123456789",
      "latitude": -7.7601,
      "longitude": 110.3890
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "total_pages": 5
  }
}
```

---

### GET /petshops/:id
Get detailed petshop info with products

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Pet Gallery",
    "address": "Jl. Gejayan No. 10",
    "city": "Sleman",
    "phone": "08123456789",
    "email": "info@petgallery.com",
    "latitude": -7.7601,
    "longitude": 110.3890,
    "opening_time": "08:00",
    "closing_time": "18:00",
    "products": [
      {
        "id": 1,
        "name": "Royal Canin Kitten 2kg",
        "category": "Makanan Kucing",
        "price": 245000,
        "stock": 15
      }
    ]
  }
}
```

**Response (404):**
```json
{
  "success": false,
  "message": "Petshop not found"
}
```

---

## 6.4 Product Endpoints

### GET /products
Get all products with filtering & search

**Query Parameters:**
```
page=1&limit=20&category=Makanan%20Kucing&search=Royal&sort_by=price&sort_order=asc
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Royal Canin Kitten 2kg",
      "category": "Makanan Kucing",
      "brand": "Royal Canin",
      "price": 245000,
      "stock": 15,
      "petshop_id": 1,
      "petshop_name": "Pet Gallery"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 250,
    "total_pages": 13
  }
}
```

---

### GET /products/:id
Get detailed product info

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Royal Canin Kitten 2kg",
    "description": "Nutrisi lengkap untuk anak kucing",
    "category": "Makanan Kucing",
    "brand": "Royal Canin",
    "price": 245000,
    "stock": 15,
    "petshop_id": 1,
    "petshop_name": "Pet Gallery",
    "petshop_phone": "08123456789",
    "petshop_address": "Jl. Gejayan No. 10"
  }
}
```

---

## 6.5 Price Comparison Endpoint

### GET /compare
Compare prices of the same product across petshops

**Query Parameters:**
```
product_name=Royal%20Canin%20Kitten
// or
product_id=1
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "product_name": "Royal Canin Kitten 2kg",
    "comparison": [
      {
        "petshop_id": 3,
        "petshop_name": "Pet Paradise",
        "price": 240000,
        "stock": 8,
        "phone": "08555666777",
        "address": "Jl. Malioboro No. 25"
      },
      {
        "petshop_id": 1,
        "petshop_name": "Pet Gallery",
        "price": 245000,
        "stock": 15,
        "phone": "08123456789",
        "address": "Jl. Gejayan No. 10"
      },
      {
        "petshop_id": 2,
        "petshop_name": "Petshop Sejahtera",
        "price": 250000,
        "stock": 20,
        "phone": "08198765432",
        "address": "Jl. Sosrowijayan No. 15"
      }
    ],
    "price_range": {
      "min": 240000,
      "max": 250000,
      "average": 245000,
      "savings": 10000
    }
  }
}
```

---

## 6.6 Health Check Endpoint

### GET /health
API health status

**Response (200):**
```json
{
  "status": "UP",
  "timestamp": "2026-06-14T10:30:00Z",
  "database": "CONNECTED",
  "version": "1.0.0"
}
```

---

# 7. Frontend Pages & Routes

## 7.1 Pages Overview

### Home Page `/`

**Route:** `https://petshop-jogja.com/`

**Components:**
* Header/Navbar (with logo, search bar, nav links)
* Hero Banner (with CTA)
* Global Search Bar
* Featured Petshops Section (top 6)
* Popular Products Section (top 12)
* Statistics Section (total petshops, products, cities)
* Footer

**Data Fetching:**
* 6 newest petshops
* 12 popular products
* Aggregated stats

---

### Petshops Page `/petshops`

**Route:** `https://petshop-jogja.com/petshops`

**Components:**
* Header/Navbar
* Search Bar
* Filter Sidebar (by city)
* Petshop Grid (cards)
* Pagination / Infinite Scroll
* Footer

**Features:**
* Search by name/address
* Filter by city (DIY cities)
* Sort by name/rating (future)
* Responsive grid layout

---

### Petshop Detail `/petshops/[id]`

**Route:** `https://petshop-jogja.com/petshops/1`

**Components:**
* Header/Navbar
* Petshop Hero Section
* Petshop Information Card
  - Name, address, phone, email
  - Opening hours
  - Description
* Petshop Location Map (Leaflet)
* Products Tab
  - Products table/grid
  - Filter by category
* Related Petshops (same city)
* Footer

**Data Fetching:**
* Petshop detail (SSG or ISR)
* Products in petshop
* Related petshops

---

### Products Page `/products`

**Route:** `https://petshop-jogja.com/products`

**Components:**
* Header/Navbar
* Search Bar
* Filter Sidebar
  - Category multi-select
  - Brand multi-select
  - Price range slider (future)
  - Stock filter
* Product Grid/List
* Pagination / Infinite Scroll
* Sort dropdown
* Footer

**Features:**
* Search with autocomplete
* Multi-select filters
* Live filtering
* Multiple sort options

---

### Product Detail `/products/[id]`

**Route:** `https://petshop-jogja.com/products/1`

**Components:**
* Header/Navbar
* Product Image/Gallery
* Product Information
  - Name, brand, category, description
  - Price, stock status
* Petshop Card (clickable to detail)
* Price Comparison Section (3-5 cheapest)
* Related Products (same category)
* Footer

**Data Fetching:**
* Product detail (SSG or ISR)
* Price comparison data
* Related products

---

### Compare Page `/compare`

**Route:** `https://petshop-jogja.com/compare`

**Components:**
* Header/Navbar
* Product Search/Selector
* Comparison Table
  - Product info (left column)
  - Petshop columns (price, stock, phone)
  - Highlighting for cheapest
* Add More Products Button
* WhatsApp Quick Links
* Footer

**Features:**
* Multi-product comparison
* Sticky header
* Highlight cheapest price
* WhatsApp button per petshop (future)
* Mobile-friendly table

---

## 7.2 Next.js App Router Structure

```
app/
├── layout.tsx              # Root layout (Header, Footer)
├── page.tsx                # Home page
├── globals.css             # Global styles
│
├── petshops/
│   ├── page.tsx            # /petshops
│   ├── [id]/
│   │   └── page.tsx        # /petshops/[id]
│
├── products/
│   ├── page.tsx            # /products
│   ├── [id]/
│   │   └── page.tsx        # /products/[id]
│
├── compare/
│   └── page.tsx            # /compare
│
└── api/                    # Optional API routes
    └── health/
        └── route.ts
```

---

# 8. Folder Structure

## Frontend (Next.js)

```
frontend/
├── .env.example                 # Environment template
├── .env.local                   # Local environment
├── next.config.js               # Next.js config
├── tailwind.config.js           # Tailwind config
├── tsconfig.json                # TypeScript config
├── package.json
│
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   └── logo.png
│
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── petshops/
│   │   ├── products/
│   │   ├── compare/
│   │   └── api/
│   │
│   ├── components/              # Reusable components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── PetshopCard/
│   │   ├── ProductCard/
│   │   ├── PriceComparison/
│   │   ├── SearchBar/
│   │   ├── Filter/
│   │   └── Map/
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useFetch.ts
│   │   ├── useFilter.ts
│   │   └── useMap.ts
│   │
│   ├── services/                # API client services
│   │   ├── api.ts               # Axios instance
│   │   ├── petshopService.ts
│   │   ├── productService.ts
│   │   └── compareService.ts
│   │
│   ├── types/                   # TypeScript types
│   │   ├── petshop.ts
│   │   ├── product.ts
│   │   └── common.ts
│   │
│   ├── lib/                     # Utility functions
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── formatters.ts
│   │
│   └── styles/                  # CSS modules
│       └── components/
│
└── .gitignore
```

---

## Backend (Node.js + Express)

```
backend/
├── .env.example                 # Environment template
├── .env                         # Local environment (gitignored)
├── package.json
├── tsconfig.json                # TypeScript config (optional)
├── .eslintrc.js                 # ESLint config
│
├── src/
│   ├── server.js                # Entry point
│   ├── app.js                   # Express app setup
│   │
│   ├── config/                  # Configuration
│   │   ├── database.js
│   │   ├── env.js
│   │   └── constants.js
│   │
│   ├── models/                  # Sequelize models
│   │   ├── Petshop.js
│   │   ├── Product.js
│   │   └── index.js
│   │
│   ├── controllers/             # Request handlers
│   │   ├── petshopController.js
│   │   ├── productController.js
│   │   └── compareController.js
│   │
│   ├── routes/                  # API routes
│   │   ├── index.js
│   │   ├── petshops.js
│   │   ├── products.js
│   │   ├── compare.js
│   │   └── health.js
│   │
│   ├── services/                # Business logic
│   │   ├── petshopService.js
│   │   ├── productService.js
│   │   └── compareService.js
│   │
│   ├── middlewares/             # Custom middlewares
│   │   ├── errorHandler.js
│   │   ├── validationHandler.js
│   │   └── cors.js
│   │
│   ├── validations/             # Input validation
│   │   ├── petshopValidation.js
│   │   └── productValidation.js
│   │
│   └── utils/                   # Utility functions
│       ├── logger.js
│       ├── successResponse.js
│       └── errorResponse.js
│
├── migrations/                  # Sequelize migrations
├── seeders/                     # Seed data
│
├── tests/                       # Test files
│   ├── unit/
│   └── integration/
│
└── .gitignore
```

---

## Project Structure Alternatives

### Monorepo Setup (Optional)

```
petshop-jogja/
├── apps/
│   ├── frontend/               # Next.js app
│   └── backend/                # Express app
├── packages/
│   ├── shared/                 # Types, constants
│   └── config/
├── pnpm-workspace.yaml
├── package.json
└── turbo.json
```

---

# 9. Security

## 9.1 Security Layers

**Frontend Security:**
* HTTPS only
* Content Security Policy (CSP) headers
* XSS protection
* Input sanitization

**Backend Security:**
* Helmet.js (security headers)
* CORS (whitelist origins)
* Rate limiting (100 req/min per IP)
* Input validation (express-validator)
* SQL injection prevention (Sequelize ORM)
* Password hashing (bcrypt - for future v2.0)

**Database Security:**
* Charset: utf8mb4
* Prepared statements (via ORM)
* Regular backups
* Principle of least privilege

---

## 9.2 Implementation Details

### Helmet.js
```javascript
app.use(helmet());
// Sets: X-Content-Type-Options, X-Frame-Options, HSTS, CSP, etc.
```

### CORS
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://petshop-jogja.com'],
  credentials: true,
}));
```

### Rate Limiting
```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,                   // limit each IP to 100 requests
});
app.use('/api/', limiter);
```

### Input Validation
```javascript
const { body, query, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};
```

### Environment Variables
```env
# Never commit .env file
# Use .env.example as template
DB_PASSWORD=secret_password
JWT_SECRET=your_jwt_secret
API_KEY=your_api_key
```

---

# 10. Performance Optimization

## 10.1 Frontend Optimization

**Next.js Built-in:**
* Image optimization (automatic webp conversion)
* Code splitting (per route)
* Static Generation (SSG) for petshop/product pages
* Incremental Static Regeneration (ISR) for dynamic content
* Automatic compression

**Additional Strategies:**
* Lazy loading for components
* CSS module scoping
* Tree shaking
* Minification

---

## 10.2 Backend Optimization

**Database:**
* Indexes on frequently queried columns
* Connection pooling (Sequelize)
* Query optimization (avoid N+1)
* Caching with Redis (future)

**API:**
* Pagination (reduce payload size)
* Response compression (gzip)
* Rate limiting
* CDN for static assets

---

## 10.3 Performance Targets

* API Response: < 500ms (95th percentile)
* Frontend Load: < 3 seconds
* Database Query: < 200ms
* Concurrent Users: 1,000+

---

## 10.4 Monitoring

* Application Performance Monitoring (New Relic/DataDog)
* Error tracking (Sentry)
* Analytics (Google Analytics / PostHog)
* Uptime monitoring (Pingdom / UptimeRobot)

---

# 11. Estimated Scale

Versi MVP:

* 100 Petshop
* 10.000 Produk
* 1.000 Pengunjung per hari

Spesifikasi Server:

* 2 vCPU
* 2 GB RAM
* 40 GB SSD

Sudah cukup untuk menjalankan aplikasi PetShop Jogja Finder versi awal.


---

# 11. Scalability & Infrastructure

## 11.1 Current Architecture (MVP)

```
Vercel CDN
    |
    v
Next.js Frontend (1 instance)
    |
    v
API Gateway (Railway/Render)
    |
    v
Express Backend (1 instance)
    |
    v
MySQL Database (1 instance)
```

---

## 11.2 Scalable Architecture (Future)

```
CloudFlare CDN
    |
    v
Vercel (Multiple regions)
    |
    v
Load Balancer (nginx)
    |
    v
Express Cluster (horizontal scaling)
    |
    v
MySQL Replication (master-slave)
    |
Redis Cache
```

---

## 11.3 Scaling Strategies

**Frontend Scaling:**
* Vercel auto-scaling
* Regional deployments
* CDN edge caching

**Backend Scaling:**
* Horizontal scaling (add more instances)
* Load balancing (nginx/HAProxy)
* Stateless API design

**Database Scaling:**
* Read replicas for high traffic
* Sharding by city (future)
* Redis caching layer

---

## 11.4 Infrastructure Estimate

**MVP (Current):**
* 2 vCPU
* 2 GB RAM
* 40 GB SSD
* Cost: ~$20-50/month

**Growth Stage (100+ petshops):**
* 4 vCPU
* 8 GB RAM
* 100 GB SSD
* Multi-region deployment
* Cost: ~$100-200/month

---

# 12. Future Enhancements (Roadmap)

## Version 1.0 (MVP - Current)
✅ Daftar petshop dengan peta  
✅ Daftar produk dengan filter  
✅ Pencarian produk  
✅ Perbandingan harga  
✅ Public API

---

## Version 2.0 (Q4 2026)
* User registration & login
* Petshop dashboard
* Product image uploads
* Review & rating system
* Wishlist / favorites
* WhatsApp integration
* Google Maps advanced features
* Admin dashboard
* Analytics

---

## Version 3.0 (2027)
* Payment gateway (Stripe, Midtrans)
* Order management system
* Delivery tracking
* Inventory management
* Email notifications
* Mobile app (React Native)
* Expand to nationwide scope
* Vendor analytics

---

## Version 4.0+ (Long-term)
* Full marketplace features
* Vendor management system
* Multi-language support
* AI recommendations
* Loyalty program
* Blockchain verification
* IoT inventory integration
* Advanced analytics & reporting

---

# 13. Summary

**PetShop Jogja Finder** adalah solusi modern untuk menemukan petshop dan membandingkan harga produk hewan peliharaan di Yogyakarta.

**Keunggulan Teknis:**
- ✅ **Modern Stack:** Next.js 15 + Express.js + MySQL 8
- ✅ **Scalable:** Architecture siap growth 10x
- ✅ **Secure:** Best practices security implementation
- ✅ **Performant:** Target API response < 500ms
- ✅ **User-Friendly:** Responsive design, intuitive navigation
- ✅ **Maintainable:** Clean code structure, well documented

**Ready for Production MVP Deployment Q3 2026**
