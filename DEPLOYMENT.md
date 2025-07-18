
# Deployment Guide - FKPDK ke Vercel dengan Neon Database

## Langkah-langkah Deployment

### 1. Persiapan Database Neon

1. Buat akun di [Neon](https://neon.tech)
2. Buat database baru
3. Catat connection string yang diberikan

### 2. Setup Vercel

1. Fork/Clone repository ini ke GitHub
2. Buat akun di [Vercel](https://vercel.com)
3. Import project dari GitHub
4. Set environment variables di Vercel:
   - `DATABASE_URL`: Connection string dari Neon
   - `NODE_ENV`: `production`

### 3. Environment Variables di Vercel

Masuk ke dashboard Vercel → Project Settings → Environment Variables, lalu tambahkan:

```
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
NODE_ENV=production
```

### 4. Deploy

1. Push code ke GitHub
2. Vercel akan otomatis deploy
3. Database migration akan berjalan otomatis setelah build

### 5. Verifikasi

1. Akses URL Vercel yang diberikan
2. Test endpoint API: `/api/health`
3. Cek apakah frontend dan backend berjalan dengan baik

## Struktur File untuk Deployment

```
├── vercel.json          # Konfigurasi Vercel
├── scripts/
│   └── migrate.js       # Script migrasi database
├── api/
│   ├── server.js        # Backend server
│   ├── config/
│   │   └── database.js  # Konfigurasi database
│   └── routes/          # API routes
├── database/
│   ├── schema.sql       # Database schema
│   └── seed.sql         # Data awal
└── src/                 # Frontend React
```

## Troubleshooting

### Database Connection Issues
- Pastikan DATABASE_URL benar
- Cek apakah Neon database sudah aktif
- Verifikasi SSL configuration

### Build Errors
- Cek logs di Vercel dashboard
- Pastikan semua dependencies terinstall
- Verifikasi TypeScript compilation

### API Issues
- Test endpoint `/api/health` terlebih dahulu
- Cek environment variables di Vercel
- Review function logs di Vercel

## Commands

### Local Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run migrate      # Run database migration
```

### Production
```bash
npm run build        # Vercel akan menjalankan ini
npm run postbuild    # Migrasi database otomatis
```
