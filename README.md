
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

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Next** - Framework first until update
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
- **8 Tabel Utama**:
  - `admins` - Data administrator
  - `libraries` - Data perpustakaan
  - `users` - Data pengguna
  - `events` - Data kegiatan
  - `discussions` - Data diskusi
  - `documents` - Data dokumen
  - `reports` - Data laporan
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

2. **Install dependensi**
```bash
npm install
```

3. **Setup Database**
```bash
# Jalankan schema database
psql -U username -d database_name -f database/schema.sql

# Jalankan seed data (opsional)
psql -U username -d database_name -f database/seed.sql
```

4. **Setup Environment Variables**
```bash
# Buat file .env dan atur variabel berikut:
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
PORT=3000
```

5. **Jalankan development server**
```bash
npm run dev
```

6. **Jalankan backend API (di terminal terpisah)**
```bash
cd api
npm install
npm start
```

Website akan berjalan di `http://localhost:5173`

## 📁 Struktur Proyek

```
src/
├── components/          # Komponen UI reusable
│   ├── ui/             # Komponen shadcn/ui
│   ├── Header.tsx      # Navigasi utama
│   ├── Footer.tsx      # Footer website
│   └── ...
├── pages/              # Halaman-halaman website
│   ├── Index.tsx       # Halaman beranda
│   ├── About.tsx       # Halaman tentang
│   ├── Contact.tsx     # Halaman kontak
│   ├── Libraries.tsx   # Halaman perpustakaan
│   ├── AdminDashboard.tsx  # Dashboard admin
│   ├── Login.tsx       # Halaman login
│   └── NotFound.tsx    # Halaman 404
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── App.tsx            # Root component

database/
├── schema.sql         # Schema database PostgreSQL
└── seed.sql          # Data sample untuk testing

api/
├── controllers/       # Logic controller API
├── routes/           # Definisi routes API
├── config/           # Konfigurasi database
└── server.js         # Entry point backend
```

## 🎨 Fitur UI/UX

- **Responsive Design** - Tampilan optimal di semua perangkat
- **Dark/Light Mode** - Dukungan tema gelap dan terang
- **Animasi Smooth** - Transisi yang halus antar elemen
- **Loading States** - Indikator loading untuk pengalaman pengguna yang baik
- **Toast Notifications** - Notifikasi untuk feedback pengguna
- **Form Validation** - Validasi form dengan error handling

## 🔧 Fitur Admin

Dashboard admin menyediakan CRUD operations untuk:
- ✅ **Kelola Perpustakaan** - Tambah, edit, hapus, dan approve perpustakaan
- ✅ **Kelola Pengguna** - Manajemen data pengguna dan status
- ✅ **Kelola Dokumen** - Upload, organize, dan manage dokumen
- ✅ **Kelola Laporan** - Generate dan manage berbagai jenis laporan
- ✅ **Activity Logs** - Tracking semua aktivitas sistem
- ✅ **Statistik Dashboard** - Overview data dan analytics

## 🗺️ Halaman dan Rute

- `/` - Halaman beranda
- `/about` - Halaman tentang kami
- `/contact` - Halaman kontak dengan form dan peta
- `/libraries` - Direktori perpustakaan dengan pencarian dan filter
- `/admin` - Dashboard administrasi
- `/login` - Halaman login admin
- `/*` - Halaman 404 untuk rute yang tidak ditemukan

## 📞 Informasi Kontak

**Sekretariat FKPDK**
- 📍 **Alamat**: Jl. RE.Martadinata-Ancaran Nomor 524, Kuningan, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45511
- 📞 **Telepon**: 081461208098
- 📧 **Email**: info@fkpdk.org
- 🕒 **Jam Operasional**: 
  - Senin-Jumat: 08.00 - 17.00 WIB
  - Sabtu: 08.00 - 12.00 WIB
  - Minggu: Tutup

## 🚀 Deployment

Proyek ini dapat di-deploy menggunakan:
- Vercel, Netlify, atau platform hosting lainnya (Frontend)
- Heroku, Railway, atau VPS (Backend + Database)

## 🤝 Kontribusi

Kami menerima kontribusi dari komunitas! Silakan:
1. Fork repositori ini
2. Buat branch untuk fitur baru (`git checkout -b feature/nama-fitur`)
3. Commit perubahan (`git commit -m 'Menambah fitur baru'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buat Pull Request

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 🙏 Dukungan

Jika Anda memiliki pertanyaan atau memerlukan bantuan, silakan:
- Buka issue di GitHub
- Hubungi kami melalui email: info@fkpdk.org
- Kunjungi website: [www.fkpdk.org](http://www.fkpdk.org)

---

**FKPDK** - Membangun Literasi, Memperkuat Bangsa 📚✨
