
# FKPDK - Forum Komunikasi Perpustakaan Desa/Kelurahan

Website resmi Forum Komunikasi Perpustakaan Desa/Kelurahan (FKPDK) yang menghubungkan dan memberdayakan perpustakaan desa dan kelurahan di seluruh Indonesia.

## 🌟 Fitur Utama

### Halaman Statis
- **Beranda (Home)** - Halaman utama dengan informasi tentang FKPDK
- **Tentang Kami (About)** - Informasi lengkap tentang visi, misi, dan pencapaian FKPDK
- **Kontak** - Informasi kontak sekretariat dengan form kontak dan peta lokasi
- **404 Not Found** - Halaman error dengan desain yang unik dan ramah pengguna

### Halaman Dinamis
- **Perpustakaan (Libraries)** - Direktori perpustakaan dengan fitur:
  - Pencarian berdasarkan nama perpustakaan
  - Filter berdasarkan status (Semua, Aktif, Pending, Ditolak)
  - Filter berdasarkan kategori (Semua, Desa, Kelurahan)
  - Filter berdasarkan provinsi
  - Tampilan card responsif dengan informasi lengkap setiap perpustakaan

### Fitur Admin Dashboard
- **Dashboard Admin** - Panel administrasi untuk mengelola:
  - Data perpustakaan (CRUD operations)
  - Data pengguna aktif
  - Diskusi dan kegiatan
  - Dokumen dan laporan
  - Statistik dan analytics

- **Admin Libraries** - Halaman khusus untuk manajemen perpustakaan:
  - Daftar lengkap semua perpustakaan dengan tabel responsif
  - Fitur pencarian perpustakaan berdasarkan nama, alamat, atau kontak
  - CRUD operations (Create, Read, Update, Delete) untuk data perpustakaan
  - Form perpustakaan terintegrasi dengan validasi lengkap
  - Status management untuk approval perpustakaan
  - Real-time updates dengan notifikasi toast

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Next** - Framework
- **React 18** - Library JavaScript untuk membangun user interface
- **TypeScript** - Superset JavaScript dengan type safety
- **Vite** - Build tool dan development server yang cepat
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Komponen UI yang dapat disesuaikan
- **React Router DOM** - Routing untuk Single Page Application
- **React Hook Form** - Library untuk form handling
- **Zod** - Schema validation
- **TanStack Query** - Data fetching dan state management
- **Lucide React** - Icon library
- **Recharts** - Library untuk charts dan graphs

### Backend & Database
- **Node.js/Express** - Server backend dengan RESTful API
- **PostgreSQL** - Database relational dengan schema lengkap
- **RESTful API Endpoints**:
  - `GET /api/libraries` - Mengambil daftar perpustakaan
  - `POST /api/libraries` - Menambah perpustakaan baru
  - `PUT /api/libraries/:id` - Update data perpustakaan
  - `DELETE /api/libraries/:id` - Hapus perpustakaan
  - `GET /api/dashboard/stats` - Statistik dashboard
  - `GET /api/users` - Data pengguna
  - `GET /api/documents` - Data dokumen
  - `GET /api/reports` - Data laporan

### Database Schema
**10 Tabel Utama**:
- `admins` - Data administrator sistem
- `libraries` - Data perpustakaan dengan informasi lengkap
- `users` - Data pengguna terdaftar
- `events` - Data kegiatan dan acara
- `discussions` - Data diskusi komunitas
- `documents` - Data dokumen dan file
- `reports` - Data laporan dan statistik
- `activity_logs` - Log aktivitas sistem
- `contact_messages` - Pesan dari form kontak
- `page_content` - Konten dinamis halaman

## 🚀 Cara Menjalankan Proyek

### Prasyarat
- Node.js (versi 16 atau lebih baru)
- npm atau yarn
- PostgreSQL database

### Instalasi

1. **Clone repositori**
```bash
git clone https://github.com/irfan-lie92/desa-forum-komunikasi-plus.git
cd desa-forum-komunikasi-plus
```

2. **Install dependensi frontend**
```bash
npm install
```

3. **Install dependensi backend**
```bash
cd api
npm install
cd ..
```

4. **Setup Database**
```bash
# Jalankan schema database
psql -U username -d database_name -f database/schema.sql

# Jalankan seed data (opsional)
psql -U username -d database_name -f database/seed.sql
```

5. **Setup Environment Variables**
```bash
# Buat file .env di folder api dan atur variabel berikut:
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PORT=5000
```

6. **Jalankan backend API server**
```bash
cd api
npm start
```

7. **Jalankan frontend development server (di terminal terpisah)**
```bash
npm run dev
```

Website akan berjalan di `http://localhost:5173`
API server akan berjalan di `http://localhost:5000`

## 📁 Struktur Proyek

```
src/
├── components/          # Komponen UI reusable
│   ├── ui/             # Komponen shadcn/ui
│   ├── Header.tsx      # Navigasi utama
│   ├── Footer.tsx      # Footer website
│   ├── LibraryForm.tsx # Form untuk CRUD perpustakaan
│   └── ...
├── pages/              # Halaman-halaman website
│   ├── Index.tsx       # Halaman beranda
│   ├── About.tsx       # Halaman tentang
│   ├── Contact.tsx     # Halaman kontak
│   ├── Libraries.tsx   # Halaman direktori perpustakaan
│   ├── AdminDashboard.tsx  # Dashboard admin utama
│   ├── AdminLibraries.tsx  # Halaman admin kelola perpustakaan
│   ├── Login.tsx       # Halaman login
│   └── NotFound.tsx    # Halaman 404
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx            # Root component

api/
├── controllers/       # Logic controller API
│   ├── librariesController.js  # CRUD operations perpustakaan
│   ├── dashboardController.js  # Statistik dashboard
│   ├── usersController.js      # Manajemen pengguna
│   ├── documentsController.js  # Manajemen dokumen
│   └── reportsController.js    # Manajemen laporan
├── routes/           # Definisi routes API
│   ├── libraries.js  # Routes untuk perpustakaan
│   ├── dashboard.js  # Routes untuk dashboard
│   ├── users.js      # Routes untuk pengguna
│   ├── documents.js  # Routes untuk dokumen
│   └── reports.js    # Routes untuk laporan
├── config/           # Konfigurasi database
│   └── database.js   # Koneksi PostgreSQL
└── server.js         # Entry point backend

database/
├── schema.sql         # Schema database PostgreSQL
└── seed.sql          # Data sample untuk testing
```

## 🎨 Fitur UI/UX

- **Responsive Design** - Tampilan optimal di semua perangkat
- **Dark/Light Mode** - Dukungan tema gelap dan terang
- **Animasi Smooth** - Transisi yang halus antar elemen
- **Loading States** - Indikator loading untuk pengalaman pengguna yang baik
- **Toast Notifications** - Notifikasi real-time untuk feedback pengguna
- **Form Validation** - Validasi form dengan error handling menggunakan Zod
- **Modal Dialogs** - Dialog form yang responsif untuk CRUD operations
- **Data Tables** - Tabel responsif dengan fitur pencarian dan sorting

## 🔧 Fitur Admin

### Dashboard Utama
Dashboard admin menyediakan overview lengkap dengan:
- ✅ **Statistik Real-time** - Total perpustakaan, pengguna, dokumen, dan laporan
- ✅ **Grafik Analytics** - Visualisasi data menggunakan Recharts
- ✅ **Activity Logs** - Tracking semua aktivitas sistem
- ✅ **Quick Actions** - Akses cepat ke fitur-fitur utama

### Kelola Perpustakaan (Admin Libraries)
Halaman khusus untuk manajemen perpustakaan dengan fitur:
- ✅ **Daftar Perpustakaan** - Tabel responsif dengan informasi lengkap
- ✅ **Pencarian & Filter** - Cari berdasarkan nama, alamat, atau kontak
- ✅ **CRUD Operations**:
  - **Create** - Tambah perpustakaan baru dengan form validasi
  - **Read** - Lihat detail perpustakaan
  - **Update** - Edit data perpustakaan existing
  - **Delete** - Hapus perpustakaan dengan konfirmasi
- ✅ **Status Management** - Approve/reject perpustakaan
- ✅ **Real-time Updates** - Data terupdate otomatis
- ✅ **Toast Notifications** - Feedback operasi untuk pengguna

### Fitur Admin Lainnya
- ✅ **Kelola Pengguna** - Manajemen data pengguna dan status
- ✅ **Kelola Dokumen** - Upload, organize, dan manage dokumen
- ✅ **Kelola Laporan** - Generate dan manage berbagai jenis laporan
- ✅ **Activity Logs** - Tracking semua aktivitas sistem

## 🗺️ Halaman dan Rute

### Halaman Publik
- `/` - Halaman beranda
- `/about` - Halaman tentang kami
- `/contact` - Halaman kontak dengan form dan peta
- `/libraries` - Direktori perpustakaan dengan pencarian dan filter

### Halaman Admin
- `/admin` - Dashboard administrasi utama
- `/admin/libraries` - Kelola perpustakaan (CRUD operations)
- `/login` - Halaman login admin

### Halaman Error
- `/*` - Halaman 404 untuk rute yang tidak ditemukan

## 📡 API Endpoints

### Libraries API
- `GET /api/libraries` - Mengambil daftar semua perpustakaan
- `POST /api/libraries` - Menambah perpustakaan baru
- `PUT /api/libraries/:id` - Update data perpustakaan berdasarkan ID
- `DELETE /api/libraries/:id` - Hapus perpustakaan berdasarkan ID

### Dashboard API
- `GET /api/dashboard/stats` - Mengambil statistik dashboard

### Users API
- `GET /api/users` - Mengambil daftar pengguna

### Documents API
- `GET /api/documents` - Mengambil daftar dokumen

### Reports API
- `GET /api/reports` - Mengambil daftar laporan

## 📞 Informasi Kontak

**Sekretariat FKPDK**
- 📍 **Alamat**: Jl. RE.Martadinata-Ancaran Nomor 524, Kuningan, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45511
- 📞 **Telepon**: 081461208098
- 📧 **Email**: info@fkpdk.org
- 🌐 **Website**: www.fkpdk.org
- 🕒 **Jam Operasional**: 
  - Senin-Jumat: 08.00 - 17.00 WIB
  - Sabtu: 08.00 - 12.00 WIB
  - Minggu: Tutup

## 🚀 Deployment

### Frontend Deployment
Proyek frontend dapat di-deploy menggunakan:
- **Vercel** - Deploy otomatis dari GitHub
- **Netlify** - Static site hosting
- **GitHub Pages** - Hosting gratis untuk proyek open source

### Backend Deployment
Backend API dapat di-deploy menggunakan:
- **Heroku** - Platform cloud dengan PostgreSQL addon
- **Railway** - Modern deployment platform
- **DigitalOcean** - VPS dengan Docker
- **AWS EC2** - Cloud server dengan RDS PostgreSQL

### Database Deployment
- **Heroku Postgres** - Managed PostgreSQL
- **Railway PostgreSQL** - Database hosting
- **AWS RDS** - Managed relational database
- **DigitalOcean Managed Database** - Fully managed PostgreSQL

## 🔧 Environment Variables

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
```

### Backend (api/.env)
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PORT=5000
NODE_ENV=development
```

## 🤝 Kontribusi

Kami menerima kontribusi dari komunitas! Silakan:
1. Fork repositori ini
2. Buat branch untuk fitur baru (`git checkout -b feature/nama-fitur`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buat Pull Request

### Panduan Kontribusi
- Pastikan code mengikuti standard TypeScript dan ESLint
- Tambahkan unit tests untuk fitur baru
- Update dokumentasi jika diperlukan
- Gunakan conventional commits untuk pesan commit

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 🙏 Dukungan

Jika Anda memiliki pertanyaan atau memerlukan bantuan, silakan:
- Buka issue di GitHub
- Hubungi kami melalui email: info@fkpdk.org
- Kunjungi website: [www.fkpdk.org](http://www.fkpdk.org)

## 🔄 Changelog

### Versi Terbaru
- ✅ Menambah halaman Admin Libraries untuk CRUD perpustakaan
- ✅ Implementasi API endpoints untuk manajemen perpustakaan
- ✅ Form perpustakaan dengan validasi menggunakan React Hook Form + Zod
- ✅ Toast notifications untuk feedback pengguna
- ✅ Tabel responsif dengan fitur pencarian
- ✅ Status management untuk approval perpustakaan
- ✅ Real-time data updates

---

**FKPDK** - Membangun Literasi, Memperkuat Bangsa 📚✨
