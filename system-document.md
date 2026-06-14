# SYSTEM DOCUMENT

# PetShop Jogja Finder

**Version:** 1.0  
**Author:** Development Team  
**Date:** June 2026  
**Stack:** Next.js + Node.js (Express.js) + MySQL

---

# 1. Introduction

## 1.1 Purpose

Dokumen ini menjelaskan spesifikasi sistem, arsitektur, fitur, teknologi, database, API, dan alur kerja aplikasi **PetShop Jogja Finder** yang dibangun dengan Next.js sebagai frontend framework dan Node.js (Express.js) untuk backend API.

Aplikasi ini bertujuan menyediakan informasi petshop di Daerah Istimewa Yogyakarta beserta daftar produk dan harga yang tersedia pada masing-masing petshop.

---

## 1.2 Scope

### Fitur Sistem

Sistem menyediakan:

* Daftar petshop di DIY dengan lokasi geografis
* Informasi lengkap petshop (alamat, kontak, lokasi)
* Daftar produk per petshop
* Harga produk dengan pembaruan
* Pencarian produk (search/filter)
* Perbandingan harga antar petshop
* Peta interaktif lokasi petshop

Sistem tidak menangani:

* Pembayaran online (untuk MVP v1.0)
* Pengiriman barang
* Marketplace penuh dengan transaksi
* Manajemen stok real-time
* Review dan rating pengguna

---

## 1.3 Objectives

Tujuan sistem:

* Memudahkan pengguna mencari petshop terdekat
* Membandingkan harga produk antar petshop
* Menemukan produk hewan peliharaan dengan cepat dan akurat
* Menyediakan direktori petshop lengkap DIY
* Memberikan pengalaman pengguna yang responsif dan cepat

---

# 2. System Overview

## 2.1 Architecture

Sistem menggunakan arsitektur **Client-Server** dengan Next.js sebagai full-stack framework dan Node.js untuk backend REST API.

```text
┌─────────────────────────────────────────────────────────────┐
│                      User Browser                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  Next.js Frontend (React)      │
        │ ┌──────────────────────────┐   │
        │ │ App Router (app/)        │   │
        │ │ Components, Hooks, Pages │   │
        │ │ Tailwind CSS             │   │
        │ └──────────────────────────┘   │
        └────────────────┬────────────────┘
                         │
                    REST API v1
                         │
        ┌────────────────▼────────────────┐
        │  Node.js Backend (Express.js)   │
        │ ┌──────────────────────────┐   │
        │ │ API Routes               │   │
        │ │ Controllers, Services    │   │
        │ │ Middleware, Validation   │   │
        │ └──────────────────────────┘   │
        └────────────────┬────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │     MySQL 8 Database           │
        │ ┌──────────────────────────┐   │
        │ │ petshops, products       │   │
        │ │ Relationships, Indexes   │   │
        │ └──────────────────────────┘   │
        └────────────────────────────────┘
```

---

## 2.2 Technology Stack

### Frontend (Next.js 15)

**Framework & Runtime:**
* Next.js 15 (React 19)
* TypeScript (recommended)
* Node.js 18+

**UI & Styling:**
* React 19
* Tailwind CSS 3
* Headless UI components

**HTTP Client:**
* Axios untuk REST API calls
* Fetch API (built-in alternative)

**Maps & Location:**
* Leaflet JS
* Leaflet React wrapper

**Build & Performance:**
* Next.js Image Optimization
* Code Splitting (automatic)
* Static Generation & SSR (hybrid rendering)

---

### Backend (Node.js + Express.js)

**Framework & Runtime:**
* Node.js 18+ (LTS recommended)
* Express.js 4.x
* TypeScript (recommended)

**Database ORM:**
* Sequelize 6.x (MySQL dialect)

**Validation & Sanitization:**
* Express Validator
* Joi (alternative)

**Security & CORS:**
* Helmet.js (security headers)
* CORS middleware
* Rate limiting (express-rate-limit)
* Input validation

**Environment Management:**
* dotenv untuk .env files

**Logging:**
* Morgan (HTTP request logging)
* Winston (application logging)

**Testing:**
* Jest or Mocha
* Supertest (API testing)

---

### Database

* **MySQL 8.0+**
* Charset: utf8mb4 (emoji support)
* Collation: utf8mb4_unicode_ci

**ORM:** Sequelize 6.x dengan MySQL2 driver

---

### Deployment

**Frontend:**
* Vercel (recommended untuk Next.js)
* Netlify
* GitHub Pages

**Backend:**
* Railway
* Render
* Heroku
* VPS (DigitalOcean, Linode, AWS EC2)

**Database:**
* MySQL Server (managed: PlanetScale, AWS RDS)
* atau VPS local MySQL

---

# 3. Project Structure

## 3.1 Frontend (Next.js) Structure

```text
frontend/
├── .env.local                    # Environment variables
├── .env.example                  # Template env
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── package.json
├── package-lock.json
│
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/
│   ├── app/                      # App Router (Next.js 13+)
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home page
│   │   ├── globals.css           # Global styles
│   │   │
│   │   ├── (admin)/              # Admin routes group
│   │   │   └── dashboard/
│   │   │
│   │   ├── petshops/             # Petshop routes
│   │   │   ├── page.tsx          # /petshops
│   │   │   └── [id]/
│   │   │       └── page.tsx      # /petshops/[id]
│   │   │
│   │   ├── products/             # Product routes
│   │   │   ├── page.tsx          # /products
│   │   │   └── [id]/
│   │   │       └── page.tsx      # /products/[id]
│   │   │
│   │   ├── compare/              # Compare routes
│   │   │   └── page.tsx          # /compare
│   │   │
│   │   └── api/                  # API routes (if needed)
│   │       └── health/
│   │
│   ├── components/               # Reusable React components
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Navbar/
│   │   ├── PetshopCard/
│   │   ├── ProductCard/
│   │   ├── PriceComparison/
│   │   ├── SearchBar/
│   │   ├── Filter/
│   │   ├── Map/
│   │   └── common/
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useFetch.ts
│   │   ├── useFilter.ts
│   │   └── useMap.ts
│   │
│   ├── services/                 # API services
│   │   ├── api.ts                # Axios instance
│   │   ├── petshopService.ts
│   │   ├── productService.ts
│   │   └── compareService.ts
│   │
│   ├── types/                    # TypeScript types
│   │   ├── petshop.ts
│   │   ├── product.ts
│   │   └── common.ts
│   │
│   ├── lib/                      # Utility functions
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── helpers.ts
│   │
│   └── styles/                   # CSS modules / styles
│       └── components/
│
└── .gitignore
```

---

## 3.2 Backend (Node.js + Express) Structure

```text
backend/
├── .env                          # Environment variables
├── .env.example                  # Template env
├── package.json
├── package-lock.json
├── tsconfig.json                 # TypeScript config (optional)
├── .eslintrc.js                  # ESLint config
├── .prettierrc                   # Prettier config
│
├── src/
│   ├── app.js                    # Express app setup
│   ├── server.js                 # Server entry point
│   │
│   ├── config/                   # Configuration files
│   │   ├── database.js           # Sequelize database connection
│   │   ├── env.js                # Environment variables
│   │   └── constants.js          # App constants
│   │
│   ├── database/
│   │   ├── migrations/           # Database migrations
│   │   └── seeders/              # Data seeders
│   │
│   ├── models/                   # Sequelize models
│   │   ├── Petshop.js
│   │   └── Product.js
│   │
│   ├── controllers/              # Request handlers
│   │   ├── petshopController.js
│   │   ├── productController.js
│   │   └── compareController.js
│   │
│   ├── routes/                   # API routes
│   │   ├── index.js              # Route aggregator
│   │   ├── petshops.js
│   │   ├── products.js
│   │   ├── compare.js
│   │   └── health.js
│   │
│   ├── services/                 # Business logic
│   │   ├── petshopService.js
│   │   ├── productService.js
│   │   └── compareService.js
│   │
│   ├── middlewares/              # Custom middlewares
│   │   ├── errorHandler.js
│   │   ├── validationHandler.js
│   │   ├── cors.js
│   │   └── logger.js
│   │
│   ├── validations/              # Input validation schemas
│   │   ├── petshopValidation.js
│   │   └── productValidation.js
│   │
│   └── utils/                    # Utility functions
│       ├── logger.js
│       ├── errorResponse.js
│       └── successResponse.js
│
├── tests/                        # Test files
│   ├── unit/
│   ├── integration/
│   └── __mocks__/
│
└── .gitignore
```

---

## 3.3 Monorepo Option

Alternatif: Menggunakan monorepo dengan pnpm workspaces atau yarn workspaces:

```text
petshop-jogja/
├── apps/
│   ├── frontend/                 # Next.js app
│   └── backend/                  # Express.js app
├── packages/
│   ├── shared/                   # Shared types & constants
│   └── config/                   # Shared config
├── pnpm-workspace.yaml
├── package.json (root)
└── turbo.json                    # For monorepo build optimization
```

---

# 4. User Roles & Access Control

## 4.1 Public User (Visitor)

**Permissions:**

* ✅ Melihat daftar petshop
* ✅ Melihat detail petshop
* ✅ Melihat daftar produk
* ✅ Melihat detail produk
* ✅ Mencari produk
* ✅ Memfilter produk berdasarkan kategori
* ✅ Membandingkan harga produk
* ✅ Melihat lokasi petshop di peta

---

## 4.2 Administrator (Future v2.0)

**Permissions:**

* ✅ All public user permissions
* ✅ Menambah petshop
* ✅ Mengubah informasi petshop
* ✅ Menghapus petshop
* ✅ Menambah produk
* ✅ Mengubah harga dan stock produk
* ✅ Menghapus produk
* ✅ Mengakses dashboard analytics
* ✅ Mengelola user reviews

---

## 4.3 Petshop Owner (Future v2.0)

**Permissions:**

* ✅ Melihat profil petshop sendiri
* ✅ Update produk sendiri
* ✅ Upload gambar produk
* ✅ Lihat notifikasi WhatsApp incoming
* ✅ Analytics penjualan (future)

---

# 5. Functional Requirements

## FR-01 View Petshops List

**Deskripsi:** Pengguna dapat melihat daftar petshop dengan informasi dasar

**Input:** 
* Tidak ada (default)
* Optional: page, limit untuk pagination

**Output:**
* Array of petshops dengan fields: id, name, address, city, phone

**API Endpoint:**
```http
GET /api/v1/petshops?page=1&limit=10
```

---

## FR-02 Search Petshops

**Deskripsi:** Pengguna dapat mencari petshop berdasarkan nama atau alamat

**Input:**
* `query` (string) - Nama atau alamat petshop

**Output:**
* Array of matching petshops

**API Endpoint:**
```http
GET /api/v1/petshops?search=Pet%20Gallery
```

---

## FR-03 View Petshop Detail

**Deskripsi:** Pengguna dapat melihat detail lengkap 1 petshop + produk yang dijual

**Input:**
* `id` (petshop id)

**Output:**
* Petshop detail: id, name, address, city, phone, latitude, longitude
* Array of products in petshop

**API Endpoint:**
```http
GET /api/v1/petshops/:id
```

---

## FR-04 View Products List

**Deskripsi:** Pengguna dapat melihat daftar seluruh produk

**Input:**
* Optional: page, limit untuk pagination

**Output:**
* Array of products dengan fields: id, name, category, brand, price, petshop_id

**API Endpoint:**
```http
GET /api/v1/products?page=1&limit=20
```

---

## FR-05 Search Products

**Deskripsi:** Pengguna dapat mencari produk berdasarkan nama atau brand

**Input:**
* `search` (string) - Nama atau brand produk

**Output:**
* Array of matching products

**API Endpoint:**
```http
GET /api/v1/products?search=Royal%20Canin
```

---

## FR-06 Filter Products by Category

**Deskripsi:** Pengguna dapat memfilter produk berdasarkan kategori

**Category Options:**
* Makanan Kucing
* Makanan Anjing
* Pasir Kucing
* Vitamin & Suplemen
* Kandang & Rumah
* Aksesoris
* Grooming
* Mainan

**API Endpoint:**
```http
GET /api/v1/products?category=Makanan%20Kucing
```

---

## FR-07 View Product Detail

**Deskripsi:** Pengguna dapat melihat detail lengkap 1 produk

**Input:**
* `id` (product id)

**Output:**
* Product detail: id, name, category, brand, price, stock, petshop_id, petshop name

**API Endpoint:**
```http
GET /api/v1/products/:id
```

---

## FR-08 Compare Product Prices

**Deskripsi:** Pengguna dapat membandingkan harga produk yang sama di petshop berbeda

**Input:**
* `product_name` atau `product_id` (string)

**Output:**
* Array dengan fields: petshop_id, petshop_name, price, stock

**Example:**
| Product | Petshop | Price |
|---------|---------|-------|
| Royal Canin Kitten 2kg | Pet Gallery | Rp245.000 |
| Royal Canin Kitten 2kg | Petshop Sejahtera | Rp250.000 |
| Royal Canin Kitten 2kg | Pet Paradise | Rp240.000 |

**API Endpoint:**
```http
GET /api/v1/compare?product_name=Royal%20Canin%20Kitten
```

---

## FR-09 View Petshop Locations on Map

**Deskripsi:** Pengguna dapat melihat lokasi semua petshop di peta interaktif

**Output:**
* Peta dengan marker untuk setiap petshop
* Marker dapat diklik untuk melihat info petshop

**Technology:** Leaflet Maps + OpenStreetMap

---

# 6. Non-Functional Requirements

## 6.1 Performance

* **API Response Time:** < 500 ms untuk 95th percentile
* **Frontend Load Time:** < 3 seconds untuk full page load
* **Database Query:** < 200 ms untuk single query
* **Concurrent Users:** Support 1,000+ concurrent users
* **Cache Strategy:** Redis caching untuk frequently accessed data

---

## 6.2 Availability & Reliability

* **Uptime Target:** 99% (43 minutes downtime per month)
* **Database Backup:** Daily automatic backup
* **Disaster Recovery:** RPO (Recovery Point Objective) = 1 day

---

## 6.3 Security

* **Input Validation:** All inputs must be validated server-side
* **SQL Injection Prevention:** Use parameterized queries (Sequelize ORM)
* **CORS Protection:** Whitelist allowed origins
* **HTTPS:** Force all connections via HTTPS/TLS
* **Rate Limiting:** 100 requests per minute per IP
* **Security Headers:** Implement via Helmet.js
* **Environment Variables:** Never hardcode secrets
* **Password Hashing:** Bcrypt (for admin v2.0)

---

## 6.4 Scalability

* Sistem dapat dikembangkan menjadi marketplace petshop nasional
* Database partitioning ready (city-based sharding)
* API stateless untuk horizontal scaling
* CDN integration untuk static assets
* Microservices architecture ready

---

# 7. Database Schema & Design

## 7.1 Table: petshops

```sql
CREATE TABLE petshops (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    province VARCHAR(100) DEFAULT 'Yogyakarta',
    postal_code VARCHAR(10),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    opening_time TIME,
    closing_time TIME,
    is_active BOOLEAN DEFAULT TRUE,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_city (city),
    INDEX idx_name (name),
    INDEX idx_is_active (is_active),
    FULLTEXT INDEX ft_search (name, address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 7.2 Table: products

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
    
    FOREIGN KEY (petshop_id) REFERENCES petshops(id) ON DELETE CASCADE,
    INDEX idx_petshop_id (petshop_id),
    INDEX idx_category (category),
    INDEX idx_brand (brand),
    INDEX idx_is_available (is_available),
    FULLTEXT INDEX ft_search (name, brand)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 7.3 Entity Relationship Diagram

```text
┌─────────────────────────────┐
│         PETSHOPS            │
├─────────────────────────────┤
│ id (PK)                     │
│ name                        │
│ address                     │
│ city                        │
│ phone                       │
│ latitude                    │
│ longitude                   │
│ created_at                  │
│ updated_at                  │
└────────────┬────────────────┘
             │
             │ 1:N
             │
             ▼
┌─────────────────────────────┐
│        PRODUCTS             │
├─────────────────────────────┤
│ id (PK)                     │
│ petshop_id (FK)             │
│ name                        │
│ category                    │
│ brand                       │
│ price                       │
│ stock                       │
│ created_at                  │
│ updated_at                  │
└─────────────────────────────┘

Relationship: 1 Petshop → N Products
```

---

## 7.4 Database Indexes

**Petshops Table:**
- `idx_city` - untuk filter by city
- `idx_name` - untuk search by name
- `idx_is_active` - untuk filter active petshops
- `ft_search` - FULLTEXT untuk advanced search

**Products Table:**
- `idx_petshop_id` - untuk query products by petshop
- `idx_category` - untuk filter by category
- `idx_brand` - untuk filter by brand
- `idx_is_available` - untuk filter available products
- `ft_search` - FULLTEXT untuk advanced search

---

## 7.5 Sample Data

**Petshops:**
```json
[
  {
    "id": 1,
    "name": "Pet Gallery",
    "address": "Jl. Gejayan No. 10",
    "city": "Sleman",
    "phone": "08123456789",
    "email": "info@petgallery.com",
    "latitude": -7.7601,
    "longitude": 110.3890
  }
]
```

**Products:**
```json
[
  {
    "id": 1,
    "petshop_id": 1,
    "name": "Royal Canin Kitten 2kg",
    "category": "Makanan Kucing",
    "brand": "Royal Canin",
    "price": 245000,
    "stock": 15
  }
]
```

---

# 8. REST API Specification

## 8.1 API Base Configuration

**Base URL:** `https://api.petshop-jogja.com/api/v1` (production)  
**Base URL:** `http://localhost:5000/api/v1` (development)

**Authentication:** None (public API untuk MVP v1.0)  
**Content-Type:** `application/json`

---

## 8.2 Petshop Endpoints

### GET /petshops
**Description:** Get all petshops with pagination

**Query Parameters:**
```
page (int, optional): Page number, default 1
limit (int, optional): Items per page, default 10
city (string, optional): Filter by city
search (string, optional): Search by name/address
```

**Request:**
```http
GET /api/v1/petshops?page=1&limit=10&city=Sleman
```

**Response (200 OK):**
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
      "email": "info@petgallery.com",
      "latitude": -7.7601,
      "longitude": 110.3890,
      "opening_time": "08:00:00",
      "closing_time": "18:00:00"
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
**Description:** Get detailed information of a specific petshop with its products

**Request:**
```http
GET /api/v1/petshops/1
```

**Response (200 OK):**
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
    "description": "Petshop terpercaya di Yogyakarta...",
    "opening_time": "08:00:00",
    "closing_time": "18:00:00",
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

**Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Petshop not found"
}
```

---

## 8.3 Product Endpoints

### GET /products
**Description:** Get all products with filtering and search

**Query Parameters:**
```
page (int, optional): Page number, default 1
limit (int, optional): Items per page, default 20
category (string, optional): Filter by category
brand (string, optional): Filter by brand
search (string, optional): Search by name/brand
petshop_id (int, optional): Filter by petshop
sort_by (string, optional): Sort field (price, name, created_at)
sort_order (string, optional): asc or desc
```

**Request:**
```http
GET /api/v1/products?category=Makanan%20Kucing&sort_by=price&sort_order=asc
```

**Response (200 OK):**
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
  },
  "filters": {
    "categories": ["Makanan Kucing", "Makanan Anjing", "..."],
    "brands": ["Royal Canin", "Pro Plan", "..."]
  }
}
```

---

### GET /products/:id
**Description:** Get detailed information of a specific product

**Request:**
```http
GET /api/v1/products/1
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Royal Canin Kitten 2kg",
    "description": "Makanan kucing dengan nutrisi lengkap...",
    "category": "Makanan Kucing",
    "brand": "Royal Canin",
    "price": 245000,
    "stock": 15,
    "is_available": true,
    "petshop_id": 1,
    "petshop_name": "Pet Gallery",
    "petshop_phone": "08123456789",
    "petshop_address": "Jl. Gejayan No. 10"
  }
}
```

---

## 8.4 Price Comparison Endpoint

### GET /compare
**Description:** Compare prices of the same product across petshops

**Query Parameters:**
```
product_name (string, required): Name of product to compare
or
product_id (int, required): ID of product to compare
```

**Request:**
```http
GET /api/v1/compare?product_name=Royal%20Canin%20Kitten
```

**Response (200 OK):**
```json
{
  "success": true,
  "product_name": "Royal Canin Kitten 2kg",
  "comparison": [
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
      "address": "Jl. Malioboro No. 5"
    }
  ],
  "price_range": {
    "min": 240000,
    "max": 250000,
    "average": 245000
  }
}
```

---

## 8.5 Health Check Endpoint

### GET /health
**Description:** Health check for monitoring

**Request:**
```http
GET /api/v1/health
```

**Response (200 OK):**
```json
{
  "status": "UP",
  "timestamp": "2026-06-14T10:30:00Z",
  "database": "CONNECTED"
}
```

---

## 8.6 Error Responses

**400 Bad Request:**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "search",
      "message": "Search parameter must be at least 2 characters"
    }
  ]
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "message": "Internal server error",
  "error_id": "ERR_5000_001"
}
```

---

## 8.7 Response Format Standard

Semua response harus mengikuti format:

```typescript
// Success Response
{
  success: true,
  data: T,           // Generic data type
  message?: string,  // Optional message
  pagination?: {
    page: number,
    limit: number,
    total: number,
    total_pages: number
  }
}

// Error Response
{
  success: false,
  message: string,
  errors?: Array<{
    field: string,
    message: string
  }>
}
```

---

# 9. Frontend Documentation (Next.js)

## 9.1 Page Structure

### Home Page `/`

**URL:** `https://petshop-jogja.com/`

**Components:**
* Header/Navbar
* Hero Banner
* Search Bar (search by petshop/product)
* Featured Petshops Section
* Popular Products Section
* Location Statistics
* Call-to-Action Section
* Footer

**Data Fetched:**
* Top 6 petshops
* Top 12 products
* Total stats (petshops, products)

---

### Petshops Page `/petshops`

**URL:** `https://petshop-jogja.com/petshops`

**Components:**
* Header
* Filter Sidebar (by city)
* Search Bar
* Petshop Grid Cards
* Pagination
* Footer

**Features:**
* Infinite scroll or pagination
* Search by name/address
* Filter by city
* Sort by name/rating (future)

---

### Petshop Detail Page `/petshops/[id]`

**URL:** `https://petshop-jogja.com/petshops/1`

**Components:**
* Header
* Petshop Banner/Hero
* Petshop Information Card
  - Name, address, phone, email
  - Opening hours
  - Map with location
* Products Section (tab view)
  - Products table/grid
  - Filter by category
* Related Petshops
* Footer

**Data Fetched:**
* Petshop detail (by id)
* Products in petshop
* Related petshops (same city)

---

### Products Page `/products`

**URL:** `https://petshop-jogja.com/products`

**Components:**
* Header
* Filter Sidebar
  - Category filter (multi-select)
  - Brand filter (multi-select)
  - Price range slider
* Search Bar
* Product Grid/List
* Pagination/Infinite Scroll
* Footer

**Features:**
* Advanced search with autocomplete
* Multi-select filters
* Sort options (price, name, newest)
* Product preview on hover

---

### Product Detail Page `/products/[id]`

**URL:** `https://petshop-jogja.com/products/1`

**Components:**
* Header
* Product Image/Gallery
* Product Information
  - Name, brand, category
  - Price, stock status
  - Description
* Petshop Information Card (clickable to detail page)
* Price Comparison (3-5 cheapest options)
* Related Products
* Footer

**Data Fetched:**
* Product detail (by id)
* Price comparison data
* Related products (same category)

---

### Compare Page `/compare`

**URL:** `https://petshop-jogja.com/compare`

**Components:**
* Header
* Search Bar / Product Selector
* Comparison Table
  - Product name
  - Petshop names (columns)
  - Prices (with highlight for cheapest)
  - Stock status
  - Petshop contact buttons
* Add more products button
* Footer

**Features:**
* Multi-product comparison
* Sticky header
* Highlight cheapest option
* WhatsApp quick link to petshop

---

## 9.2 Reusable Components

### PetshopCard
```typescript
interface PetshopCardProps {
  id: number;
  name: string;
  city: string;
  image?: string;
  rating?: number;
  productCount?: number;
}
```

### ProductCard
```typescript
interface ProductCardProps {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  image?: string;
  petshopName: string;
}
```

### SearchBar
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
}
```

### FilterPanel
```typescript
interface FilterPanelProps {
  categories: string[];
  brands: string[];
  onCategoryChange: (categories: string[]) => void;
  onBrandChange: (brands: string[]) => void;
}
```

### Map
```typescript
interface MapProps {
  petshops: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  }>;
  onMarkerClick?: (id: number) => void;
}
```

---

## 9.3 Next.js App Router Structure Example

```typescript
// app/layout.tsx - Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

```typescript
// app/petshops/page.tsx - Petshops List
export default async function PetshopsPage({
  searchParams,
}: {
  searchParams: { page?: string; city?: string; search?: string };
}) {
  const petshops = await fetchPetshops(searchParams);
  
  return (
    <div>
      <SearchBar />
      <FilterSidebar />
      <PetshopsGrid petshops={petshops} />
    </div>
  );
}
```

```typescript
// app/petshops/[id]/page.tsx - Petshop Detail
export async function generateStaticParams() {
  const petshops = await fetchAllPetshops();
  return petshops.map((petshop) => ({
    id: petshop.id.toString(),
  }));
}

export default async function PetshopDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const petshop = await fetchPetshopById(params.id);
  const products = await fetchProductsByPetshop(params.id);
  
  return (
    <div>
      <PetshopHeader petshop={petshop} />
      <ProductTable products={products} />
      <PetshopMap petshop={petshop} />
    </div>
  );
}
```

---

## 9.4 Data Fetching Patterns

### Server-Side Fetching (Recommended)
```typescript
// app/products/page.tsx
async function fetchProducts(filters: FilterParams) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?${new URLSearchParams(filters)}`,
    {
      next: { revalidate: 60 }, // ISR - revalidate every 60 seconds
    }
  );
  return response.json();
}

export default async function ProductsPage() {
  const { data: products } = await fetchProducts();
  return <ProductGrid products={products} />;
}
```

### Client-Side Fetching (for interactive filters)
```typescript
// components/ProductFilter.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export function ProductFilter() {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const response = await fetch(
        `/api/v1/products?${searchParams.toString()}`
      );
      const { data } = await response.json();
      setProducts(data);
    };

    fetchFilteredProducts();
  }, [searchParams]);

  return <ProductGrid products={products} />;
}
```

---

# 10. Backend Documentation (Node.js + Express)

## 10.1 Project Setup

### package.json
```json
{
  "name": "petshop-jogja-backend",
  "version": "1.0.0",
  "description": "PetShop Jogja Finder Backend API",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest --coverage",
    "lint": "eslint src/",
    "migrate": "sequelize-cli db:migrate",
    "migrate:undo": "sequelize-cli db:migrate:undo",
    "seed": "sequelize-cli db:seed:all"
  },
  "dependencies": {
    "express": "^4.18.2",
    "sequelize": "^6.35.2",
    "mysql2": "^3.6.5",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "express-validator": "^7.0.0",
    "express-rate-limit": "^7.1.5",
    "morgan": "^1.10.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "jest": "^29.7.0",
    "supertest": "^6.3.3",
    "eslint": "^8.54.0",
    "sequelize-cli": "^6.6.2"
  }
}
```

---

## 10.2 Core Application Setup

### src/server.js
```javascript
require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### src/app.js
```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || ['http://localhost:3000'],
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Logging
app.use(morgan('combined'));

// Body Parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/v1', routes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    database: 'CONNECTED', // TODO: Add DB check
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error Handler
app.use(errorHandler);

module.exports = app;
```

---

## 10.3 Database Configuration

### src/config/database.js
```javascript
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
```

---

## 10.4 Sequelize Models

### src/models/Petshop.js
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Petshop = sequelize.define('Petshop', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  province: {
    type: DataTypes.STRING(100),
    defaultValue: 'Yogyakarta',
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  email: DataTypes.STRING(255),
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false,
  },
  opening_time: DataTypes.TIME,
  closing_time: DataTypes.TIME,
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  image_url: DataTypes.STRING(500),
}, {
  tableName: 'petshops',
  timestamps: true,
  underscored: true,
});

module.exports = Petshop;
```

### src/models/Product.js
```javascript
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  petshop_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: DataTypes.TEXT,
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  brand: DataTypes.STRING(100),
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  image_url: DataTypes.STRING(500),
}, {
  tableName: 'products',
  timestamps: true,
  underscored: true,
});

module.exports = Product;
```

### src/models/index.js
```javascript
const Petshop = require('./Petshop');
const Product = require('./Product');

// Define Relationships
Petshop.hasMany(Product, {
  foreignKey: 'petshop_id',
  onDelete: 'CASCADE',
});

Product.belongsTo(Petshop, {
  foreignKey: 'petshop_id',
});

module.exports = {
  Petshop,
  Product,
};
```

---

## 10.5 Controllers

### src/controllers/petshopController.js
```javascript
const { Petshop, Product } = require('../models');
const { validationResult } = require('express-validator');
const successResponse = require('../utils/successResponse');
const errorResponse = require('../utils/errorResponse');

exports.getAllPetshops = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, city, search } = req.query;

    let where = {};
    if (city) where.city = city;
    if (search) {
      where = {
        ...where,
        [sequelize.Op.or]: [
          { name: { [sequelize.Op.like]: `%${search}%` } },
          { address: { [sequelize.Op.like]: `%${search}%` } },
        ],
      };
    }

    const { count, rows } = await Petshop.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });

    res.json(
      successResponse(rows, {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        total_pages: Math.ceil(count / limit),
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.getPetshopById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const petshop = await Petshop.findByPk(id, {
      include: [{ model: Product }],
    });

    if (!petshop) {
      return res.status(404).json(
        errorResponse('Petshop not found')
      );
    }

    res.json(successResponse(petshop));
  } catch (error) {
    next(error);
  }
};
```

### src/controllers/productController.js
```javascript
const { Product, Petshop } = require('../models');
const { Op } = require('sequelize');
const successResponse = require('../utils/successResponse');
const errorResponse = require('../utils/errorResponse');

exports.getAllProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      brand,
      search,
      petshop_id,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = req.query;

    let where = {};
    if (category) where.category = category;
    if (brand) where.brand = brand;
    if (petshop_id) where.petshop_id = petshop_id;
    if (search) {
      where = {
        ...where,
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { brand: { [Op.like]: `%${search}%` } },
        ],
      };
    }

    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [{ model: Petshop, attributes: ['id', 'name'] }],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
      order: [[sort_by, sort_order]],
    });

    res.json(
      successResponse(rows, {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        total_pages: Math.ceil(count / limit),
      })
    );
  } catch (error) {
    next(error);
  }
};

exports.comparePrices = async (req, res, next) => {
  try {
    const { product_name, product_id } = req.query;

    let where = {};
    if (product_name) {
      where.name = { [Op.like]: `%${product_name}%` };
    } else if (product_id) {
      where.id = product_id;
    } else {
      return res.status(400).json(
        errorResponse('product_name or product_id required')
      );
    }

    const products = await Product.findAll({
      where,
      include: [{ model: Petshop, attributes: ['id', 'name', 'phone', 'address'] }],
      raw: false,
    });

    if (products.length === 0) {
      return res.status(404).json(
        errorResponse('Product not found')
      );
    }

    const comparison = products.map((p) => ({
      petshop_id: p.Petshop.id,
      petshop_name: p.Petshop.name,
      price: parseFloat(p.price),
      stock: p.stock,
      phone: p.Petshop.phone,
      address: p.Petshop.address,
    }));

    const prices = comparison.map((c) => c.price);

    res.json(
      successResponse({
        product_name: products[0].name,
        comparison,
        price_range: {
          min: Math.min(...prices),
          max: Math.max(...prices),
          average: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
        },
      })
    );
  } catch (error) {
    next(error);
  }
};
```

---

## 10.6 Routes

### src/routes/index.js
```javascript
const express = require('express');
const router = express.Router();

const petshopRoutes = require('./petshops');
const productRoutes = require('./products');
const compareRoutes = require('./compare');
const healthRoutes = require('./health');

router.use('/petshops', petshopRoutes);
router.use('/products', productRoutes);
router.use('/compare', compareRoutes);
router.use('/health', healthRoutes);

module.exports = router;
```

### src/routes/petshops.js
```javascript
const express = require('express');
const router = express.Router();
const petshopController = require('../controllers/petshopController');
const { validationRules, validate } = require('../validations/petshopValidation');

router.get('/', petshopController.getAllPetshops);
router.get('/:id', petshopController.getPetshopById);

// Admin routes (future)
// router.post('/', validationRules(), validate, petshopController.createPetshop);
// router.put('/:id', validationRules(), validate, petshopController.updatePetshop);
// router.delete('/:id', petshopController.deletePetshop);

module.exports = router;
```

---

## 10.7 Utility Functions

### src/utils/successResponse.js
```javascript
function successResponse(data, pagination = null) {
  const response = {
    success: true,
    data,
  };

  if (pagination) {
    response.pagination = pagination;
  }

  return response;
}

module.exports = successResponse;
```

### src/utils/errorResponse.js
```javascript
function errorResponse(message, errors = null) {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return response;
}

module.exports = errorResponse;
```

---

## 10.8 Middleware: Error Handler

### src/middlewares/errorHandler.js
```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err }),
  });
};

module.exports = errorHandler;
```

---

## 10.9 Environment Configuration

### .env.example
```env
# Server
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=petshop_jogja
DB_USER=root
DB_PASSWORD=password

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Frontend URL
FRONTEND_URL=http://localhost:3000

# API Documentation
API_URL=http://localhost:5000
```

---

# 11. Security Implementation

## 11.1 Security Headers (Helmet.js)

```javascript
const helmet = require('helmet');

app.use(helmet()); // Sets multiple security headers:
// X-Content-Type-Options: nosniff
// X-Frame-Options: DENY
// X-XSS-Protection: 1; mode=block
// Strict-Transport-Security
// Content-Security-Policy
```

---

## 11.2 CORS Configuration

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN.split(','),
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
```

---

## 11.3 Rate Limiting

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
  standardHeaders: true,     // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,      // Disable X-RateLimit-* headers
});

app.use('/api/', limiter);
```

---

## 11.4 Input Validation (Express Validator)

```javascript
const { body, query, validationResult } = require('express-validator');

// Example: Validate product search
const searchValidationRules = () => [
  query('search')
    .optional()
    .trim()
    .isLength({ min: 2, max: 255 })
    .withMessage('Search must be between 2-255 characters'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1-100'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }
  next();
};
```

---

## 11.5 SQL Injection Prevention

**Using Sequelize ORM (Parameterized Queries):**

```javascript
// ✅ Safe: Using parameterized queries
const product = await Product.findAll({
  where: {
    name: { [Op.like]: `%${searchTerm}%` }
  }
});

// ❌ Unsafe: Raw SQL (NEVER use string interpolation)
// const product = await sequelize.query(
//   `SELECT * FROM products WHERE name LIKE '%${searchTerm}%'`
// );
```

---

## 11.6 Environment Variables

**Never commit secrets:**

```env
# .env (gitignored)
DB_PASSWORD=secret_password_here
API_KEY=your_api_key_here
JWT_SECRET=jwt_secret_key
```

**Use in code:**

```javascript
const dbPassword = process.env.DB_PASSWORD;
const apiKey = process.env.API_KEY;
```

---

## 11.7 HTTPS/TLS

**Development:**
```bash
# Using http://localhost
```

**Production:**
```bash
# All connections must use HTTPS
# Certificate: Let's Encrypt (free)
# Configure nginx or Docker
```

---

## 11.8 Logging for Security

```javascript
const morgan = require('morgan');

// Log all HTTP requests (development)
app.use(morgan('combined'));

// Example log format:
// 127.0.0.1 - - [14/Jun/2026:10:30:00 +0000] "GET /api/v1/products HTTP/1.1" 200 2500
```


---

# 12. Development Workflow

## 12.1 Setup Development Environment

### Prerequisites
- Node.js 18+ dan npm/yarn
- MySQL 8.0+
- Git
- Code editor (VS Code recommended)

### Initial Setup

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan database credentials
npm run migrate      # Create tables
npm run seed         # Seed sample data
npm run dev          # Start dev server
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev          # Start Next.js dev server
# Open http://localhost:3000
```

---

## 12.2 Git Workflow

### Branch Naming Convention
```
feature/feature-name      # New features
bugfix/bug-description    # Bug fixes
docs/documentation-topic  # Documentation
refactor/area-changed     # Code refactoring
```

### Commit Message Convention
```
feat: add product search functionality
fix: resolve pagination offset calculation
docs: update API documentation
style: format code with prettier
test: add unit tests for product service
```

---

## 12.3 Testing Strategy

### Backend Testing
```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# Coverage report
npm run test:coverage
```

### Frontend Testing (Next.js)
```bash
# Jest unit tests
npm run test

# E2E tests with Playwright
npm run test:e2e
```

---

## 12.4 Code Quality Tools

### ESLint & Prettier
```bash
# Backend
npm run lint
npm run lint:fix

# Frontend
npm run lint
npm run format
```

---

## 12.5 Database Migrations

```bash
# Create migration
npx sequelize-cli migration:generate --name add-column-to-products

# Run migrations
npm run migrate

# Undo last migration
npm run migrate:undo

# Seed data
npm run seed
```

---

## 12.6 Deployment Checklist

**Backend (Railway/Render):**
- [ ] Set environment variables in production
- [ ] Run database migrations
- [ ] Set up backups
- [ ] Configure SSL/TLS
- [ ] Set up monitoring and alerts
- [ ] Test API endpoints

**Frontend (Vercel):**
- [ ] Build optimization
- [ ] Image optimization
- [ ] Set environment variables
- [ ] Enable analytics
- [ ] Configure domain/DNS

**Database:**
- [ ] MySQL 8.0+ setup
- [ ] Configure backups (daily)
- [ ] Set up monitoring
- [ ] Test disaster recovery

---

# 13. Monitoring & Maintenance

## 13.1 Health Checks

**API Health Check:**
```bash
curl http://localhost:5000/api/v1/health
```

**Response:**
```json
{
  "status": "UP",
  "timestamp": "2026-06-14T10:30:00Z",
  "database": "CONNECTED"
}
```

---

## 13.2 Performance Monitoring

### Key Metrics
- API response time (target: < 500ms)
- Database query time (target: < 200ms)
- Error rate (target: < 0.1%)
- Uptime (target: 99%)

### Tools
- New Relic / DataDog (APM)
- Sentry (Error tracking)
- LogRocket (Frontend monitoring)
- MySQL slow query log

---

## 13.3 Database Maintenance

```sql
-- Check database size
SELECT table_schema,
       ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size_mb
FROM information_schema.tables
GROUP BY table_schema;

-- Optimize tables
OPTIMIZE TABLE petshops, products;

-- Check indexes
SHOW INDEX FROM petshops;
SHOW INDEX FROM products;
```

---

## 13.4 Backup & Recovery

**Automated backup (weekly):**
```bash
#!/bin/bash
mysqldump -u root -p$DB_PASSWORD petshop_jogja \
  | gzip > backup_$(date +%Y%m%d_%H%M%S).sql.gz
```

**Restore from backup:**
```bash
gunzip < backup_20260614_100000.sql.gz | mysql -u root -p$DB_PASSWORD petshop_jogja
```

---

# 14. Future Development Roadmap

## Version 1.0 (MVP - Current)
- ✅ Daftar petshop
- ✅ Daftar produk
- ✅ Pencarian & filter
- ✅ Perbandingan harga
- ✅ Peta lokasi

---

## Version 2.0 (Q4 2026)
- User authentication & authorization
- Petshop dashboard
- Product image uploads
- User reviews & ratings
- Wishlist / favorites
- WhatsApp integration
- Google Maps API
- Admin dashboard

---

## Version 3.0 (2027)
- Payment gateway integration
- Order management
- Delivery tracking
- User account management
- Advanced analytics
- Mobile app (React Native)
- Expand to national scope

---

## Version 4.0+ (Long-term)
- Marketplace features
- Vendor management
- Multi-language support
- AI-powered recommendations
- Blockchain for authenticity
- IoT integration for inventory

---

# 15. Documentation & References

## API Documentation
- Swagger/OpenAPI (future)
- Postman collection

## Frontend Documentation
- Storybook (UI component library)
- Next.js documentation: https://nextjs.org/docs

## Backend Documentation
- Express.js: https://expressjs.com/
- Sequelize: https://sequelize.org/

## Database
- MySQL 8 documentation: https://dev.mysql.com/doc/

---

# 16. Conclusion

**PetShop Jogja Finder** adalah aplikasi direktori petshop modern yang dibangun dengan teknologi terkini:

- **Frontend:** Next.js 15 (React 19) untuk pengalaman pengguna yang optimal
- **Backend:** Node.js + Express.js untuk API yang scalable dan maintainable
- **Database:** MySQL 8 untuk data persistence yang reliable
- **Architecture:** Client-Server dengan REST API untuk separation of concerns

**Keunggulan Desain:**
✅ Scalable - Siap untuk pertumbuhan dari 100 ke 10,000+ petshop  
✅ Maintainable - Code yang terstruktur dan well-documented  
✅ Secure - Implementasi security best practices  
✅ Performant - Optimized API responses dan database queries  
✅ User-Friendly - Responsive design untuk semua devices  

**Siap untuk:**
- MVP deployment di Q3 2026
- Expansion ke marketplace nasional di 2027
- Additional features dan integrations

Dokumen ini akan diperbarui seiring dengan development progress.
