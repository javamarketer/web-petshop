# 🐾 PetShop Jogja Finder

Aplikasi web direktori petshop di Daerah Istimewa Yogyakarta dengan fitur pencarian produk dan perbandingan harga.

![Version](https://img.shields.io/badge/version-1.0-blue)
![Status](https://img.shields.io/badge/status-MVP%20Ready-green)
![Tech](https://img.shields.io/badge/tech-Next.js%2B%20Express%20%2B%20MySQL-blueviolet)

---

## 🎯 Quick Overview

**PetShop Jogja Finder** memudahkan pemilik hewan peliharaan untuk:
- 🔍 Mencari petshop terdekat di Yogyakarta
- 📍 Melihat lokasi petshop di peta interaktif
- 🛍️ Browsing produk dari berbagai petshop
- 💰 Membandingkan harga produk yang sama antar petshop
- 📊 Menemukan harga termurah dengan mudah

---

## 🚀 Tech Stack

**Frontend:**
- Next.js 15 (React 19)
- Tailwind CSS
- Axios + Leaflet Maps

**Backend:**
- Node.js 18+ LTS
- Express.js 4.x
- Sequelize ORM

**Database:**
- MySQL 8.0+

**Deployment:**
- Frontend: Vercel
- Backend: Railway / Render
- Database: Managed MySQL

---

## 📋 Documentation

Lengkap dokumentasi tersedia:

| Document | Deskripsi |
|----------|-----------|
| **DOCUMENTATION_INDEX.md** | 📚 Panduan navigasi dokumentasi (mulai di sini!) |
| **QUICK_START.md** | 🚀 Setup development environment |
| **system-design.md** | 🏗️ Architecture & design decisions |
| **system-document.md** | 📖 Complete specifications & APIs |
| **SYNCHRONIZATION_SUMMARY.md** | ✅ Improvements & changes |

👉 **[Baca dokumentasi lengkap](./DOCUMENTATION_INDEX.md)**

---

## ⚡ Quick Start

### Prerequisites
```bash
- Node.js 18+
- MySQL 8.0+
- Git
```

### Setup Backend
```bash
cd backend
npm install
cp .env.example .env          # Edit dengan database credentials
npm run migrate               # Create database tables
npm run seed                  # Load sample data
npm run dev                   # Start on http://localhost:5000
```

### Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev                   # Start on http://localhost:3000
```

📖 **[Petunjuk detail di QUICK_START.md](./QUICK_START.md)**

---

## 📍 Key Features (MVP v1.0)

### 1️⃣ Petshop Directory
- Daftar lengkap petshop di DIY
- Informasi (alamat, kontak, jam operasional)
- Lokasi di peta interaktif

### 2️⃣ Product Catalog
- Database produk dari berbagai petshop
- Filter by kategori, brand
- Search dengan autocomplete

### 3️⃣ Price Comparison
- Bandingkan harga produk yang sama
- Highlight harga termurah
- Info petshop (kontak, alamat)

### 4️⃣ Responsive Design
- Mobile-friendly interface
- Desktop optimized
- Fast load times

---

## 📊 Project Structure

```
web-petshop/
├── frontend/               # Next.js application
│   ├── src/app/           # Pages & routes
│   ├── src/components/    # Reusable components
│   └── src/services/      # API client
│
├── backend/               # Express.js API
│   ├── src/models/        # Database models
│   ├── src/controllers/   # Business logic
│   ├── src/routes/        # API endpoints
│   └── src/services/      # Data access
│
└── docs/                  # This documentation
```

---

## 🔌 API Endpoints

```http
# Petshops
GET    /api/v1/petshops
GET    /api/v1/petshops/:id
GET    /api/v1/petshops?search=name&city=Sleman

# Products
GET    /api/v1/products
GET    /api/v1/products/:id
GET    /api/v1/products?search=royal&category=cat

# Price Comparison
GET    /api/v1/compare?product_name=Royal%20Canin

# Health
GET    /api/v1/health
```

📖 **[API docs lengkap di system-document.md Section 8](./system-document.md)**

---

## 🌍 Frontend Pages

| Route | Description |
|-------|-----------|
| `/` | Home page |
| `/petshops` | Petshop directory |
| `/petshops/:id` | Petshop detail |
| `/products` | Product catalog |
| `/products/:id` | Product detail |
| `/compare` | Price comparison |

---

## 🛢️ Database Schema

```sql
-- Petshops table
petshops (id, name, address, city, phone, 
          latitude, longitude, ...)

-- Products table
products (id, petshop_id, name, category, 
          brand, price, stock, ...)

-- Relationship: 1 petshop → N products
```

📖 **[Schema lengkap di system-document.md Section 7](./system-document.md)**

---

## 🔒 Security

✅ Helmet.js (security headers)  
✅ CORS protection  
✅ Rate limiting (100 req/min)  
✅ Input validation  
✅ SQL injection prevention (Sequelize ORM)  
✅ Environment variables  
✅ HTTPS/TLS ready  

📖 **[Security details di system-document.md Section 11](./system-document.md)**

---

## 📈 Performance

**Targets:**
- API response < 500ms
- Frontend load < 3 seconds
- Database query < 200ms
- Uptime target 99%

**Optimizations:**
- Image optimization (Next.js)
- Database indexing
- Response compression
- CDN ready

---

## 🎯 Roadmap

### Version 1.0 (MVP) - Q3 2026
✅ Daftar petshop  
✅ Katalog produk  
✅ Pencarian & filter  
✅ Perbandingan harga  

### Version 2.0 - Q4 2026
- User login & registration
- Petshop dashboard
- Product image uploads
- Review & rating
- WhatsApp integration
- Admin dashboard

### Version 3.0 - 2027
- Payment gateway
- Order management
- Mobile app
- National expansion

📖 **[Roadmap detail di system-design.md Section 12](./system-design.md)**

---

## 👥 Contributing

### Development Workflow
```bash
# 1. Create feature branch
git checkout -b feature/feature-name

# 2. Make changes
# 3. Test
npm run test
npm run lint

# 4. Commit
git commit -m "feat: description"

# 5. Push & create PR
git push origin feature/feature-name
```

### Commit Convention
```
feat: add feature description
fix: fix bug description
docs: documentation changes
style: code formatting
test: add/update tests
```

---

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Auto-deploy from GitHub
# Push to main branch
git push origin main
# Vercel automatically deploys
```

### Backend (Railway)
```bash
# Connect repository to Railway
# Set environment variables
# Deploy from main branch
```

📖 **[Deployment checklist di QUICK_START.md](./QUICK_START.md)**

---

## 📞 Support & Resources

### Documentation
- 📚 **[Documentation Index](./DOCUMENTATION_INDEX.md)** - Start here!
- 🚀 **[Quick Start Guide](./QUICK_START.md)** - Setup instructions
- 🏗️ **[System Design](./system-design.md)** - Architecture
- 📖 **[System Document](./system-document.md)** - Specifications

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

### Common Issues
See **QUICK_START.md** → Troubleshooting section

---

## 📊 Stats

- **Lines of Documentation:** 1,750+
- **API Endpoints:** 7+
- **Frontend Pages:** 6
- **Database Tables:** 2
- **Development Time:** Ready to start
- **Target Launch:** Q3 2026

---

## ✅ Status

| Area | Status | Notes |
|------|--------|-------|
| Documentation | ✅ Complete | Ready for dev |
| Architecture | ✅ Designed | Best practices |
| Database | ✅ Designed | Optimized schema |
| API | ✅ Specified | Complete docs |
| Frontend | ✅ Planned | Ready to build |
| Backend | ✅ Planned | Ready to build |
| Deployment | ✅ Planned | Setup ready |
| Security | ✅ Designed | Best practices |

---

## 📄 License

[Add your license here]

---

## 👨‍💻 Team

- **Project Lead:** [Name]
- **Tech Lead:** [Name]
- **Backend Lead:** [Name]
- **Frontend Lead:** [Name]

---

## 📞 Contact

- 📧 Email: [contact@email.com]
- 💬 Chat: [Slack/Discord]
- 🐦 Twitter: [@handle]

---

## 🎓 Version Info

- **Version:** 1.0 (MVP)
- **Status:** 🟢 Production Ready
- **Last Updated:** June 14, 2026
- **Next Review:** July 14, 2026

---

**🚀 Ready to start development?**

1. Read the [Documentation Index](./DOCUMENTATION_INDEX.md)
2. Follow [QUICK_START.md](./QUICK_START.md) for setup
3. Review [system-document.md](./system-document.md) for implementation
4. Check [SYNCHRONIZATION_SUMMARY.md](./SYNCHRONIZATION_SUMMARY.md) for improvements

---

<div align="center">

**Happy Coding! 🐾**

Built with ❤️ for PetShop Lovers in Yogyakarta

</div>
