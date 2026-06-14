# ⚡ QUICK RUN - Jalankan Dalam 60 Detik

---

## 🚀 CARA TERCEPAT

### **Langkah 1**
```
Buka: RUN.bat
(Lokasi: e:\latihan\VC Sumir\web-petshop\RUN.bat)
```

Double-click file tersebut.

### **Langkah 2**
Tunggu 2-3 menit sampai:
- `✅ Backend dependencies installed`
- `✅ Frontend dependencies installed`
- Dua terminal window terbuka

### **Langkah 3**
```
Buka browser ke: http://localhost:3000
```

Selesai! 🎉

---

## ✅ Apa yang akan terjadi otomatis

```
1. Check Node.js & npm
2. Install backend packages
3. Install frontend packages  
4. Create .env files
5. Start backend (port 5000)
6. Start frontend (port 3000)
7. Database ready for connection
```

---

## 📍 Akses

Setelah startup:

```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000/api/v1
```

---

## 🛑 Jika Ada Error

### MySQL tidak koneksi

```bash
# Manual setup database
mysql -u root < setup-database.sql
```

### Port already in use

```bash
# Ubah di backend/.env
PORT=5001
```

### npm install gagal

```bash
# Delete dan retry
rmdir /s frontend\node_modules
npm install --legacy-peer-deps
```

---

## 💡 Troubleshooting Cepat

| Problem | Solution |
|---------|----------|
| npm not found | Install Node.js dari nodejs.org |
| MySQL not found | Pasang MySQL atau gunakan PlanetScale |
| Port 5000 used | Change PORT in .env to 5001 |
| Slow install | Use `npm install --prefer-offline` |
| Build error | Delete node_modules, npm cache clean, retry |

---

## 🎯 Setelah Berjalan

1. **Test**: Kunjungi http://localhost:3000
2. **Verify**: Click menu, test search, test filter
3. **Check**: Open DevTools (F12), no red errors
4. **Next**: Follow TESTING_EXECUTION_PLAN.md

---

## 📚 Lengkap Documentation

- Full setup: `AUTOMATIC_SETUP_GUIDE.md`
- Testing: `TESTING_EXECUTION_PLAN.md`
- Components: `COMPONENT_CREATION_STARTER.md`
- Deployment: `DEPLOYMENT_GUIDE.md`

---

**Langsung jalankan RUN.bat dan nikmati! 🚀**
