
# FKPDK API Documentation

API Backend untuk Forum Komunitas Pengelola Data Kepustakaan (FKPDK)

## Setup Database

1. **Install PostgreSQL** (pastikan PostgreSQL sudah terinstall)

2. **Buat Database:**
```bash
createdb fkpdk_db
```

3. **Setup Schema:**
```bash
cd api
npm run db:setup
```

4. **Seed Data:**
```bash
npm run db:seed
```

5. **Reset Database (jika diperlukan):**
```bash
npm run db:reset
```

## Setup API Server

1. **Install Dependencies:**
```bash
cd api
npm install
```

2. **Setup Environment Variables:**
Buat file `.env` di folder `api/`:
```env
DB_USER=your_postgresql_username
DB_PASSWORD=your_postgresql_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fkpdk_db
NODE_ENV=development
PORT=3001
```

3. **Jalankan Server:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Dashboard
- `GET /api/dashboard/stats` - Statistik dashboard
- `GET /api/dashboard/activities` - Aktivitas terbaru  
- `GET /api/dashboard/approvals` - Pending approvals

### Libraries (Perpustakaan)
- `GET /api/libraries` - List semua perpustakaan
- `GET /api/libraries/:id` - Detail perpustakaan
- `POST /api/libraries` - Tambah perpustakaan baru
- `PUT /api/libraries/:id` - Update perpustakaan
- `DELETE /api/libraries/:id` - Hapus perpustakaan

### Users (Pengguna)
- `GET /api/users` - List semua pengguna
- `GET /api/users/:id` - Detail pengguna
- `POST /api/users` - Tambah pengguna baru
- `PUT /api/users/:id` - Update pengguna
- `DELETE /api/users/:id` - Hapus pengguna

### Documents (Dokumen)
- `GET /api/documents` - List semua dokumen
- `GET /api/documents/:id` - Detail dokumen
- `POST /api/documents` - Upload dokumen baru
- `PUT /api/documents/:id` - Update dokumen
- `DELETE /api/documents/:id` - Hapus dokumen

### Reports (Laporan)
- `GET /api/reports` - List semua laporan
- `GET /api/reports/:id` - Detail laporan
- `POST /api/reports` - Buat laporan baru
- `PUT /api/reports/:id` - Update laporan
- `DELETE /api/reports/:id` - Hapus laporan

## Query Parameters

Semua endpoint GET list mendukung query parameters:
- `page` - Nomor halaman (default: 1)
- `limit` - Jumlah item per halaman (default: 10)
- `search` - Pencarian berdasarkan nama/judul
- `status` - Filter berdasarkan status
- Additional filters sesuai context masing-masing endpoint

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {...},
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

## Database Schema

Database terdiri dari tabel-tabel berikut:

1. **admins** - Data administrator
2. **libraries** - Data perpustakaan
3. **users** - Data pengguna perpustakaan
4. **events** - Data kegiatan/acara
5. **discussions** - Data diskusi forum
6. **documents** - Data dokumen
7. **reports** - Data laporan
8. **activity_logs** - Log aktivitas perubahan data

## Security Notes

- Implementasi authentication/authorization perlu ditambahkan sesuai kebutuhan
- Validasi input perlu diperkuat untuk production
- Rate limiting perlu ditambahkan
- File upload security perlu diimplementasi untuk endpoint documents

## Development

Untuk development, gunakan:
```bash
npm run dev
```

Server akan restart otomatis ketika ada perubahan file.

Health check endpoint tersedia di: `GET /api/health`
