
-- FKPDK Database Seed Data

-- Insert admin users
INSERT INTO admins (username, password, email, full_name, role) VALUES
('admin', '$2b$10$8K9K8K9K8K9K8K9K8K9K8O', 'admin@fkpdk.org', 'Administrator FKPDK', 'admin'),
('superadmin', '$2b$10$8K9K8K9K8K9K8K9K8K9K8O', 'superadmin@fkpdk.org', 'Super Administrator', 'superadmin');

-- Insert sample libraries
INSERT INTO libraries (name, address, contact_person, phone, email, status, approved_at) VALUES
('Perpustakaan Desa Makmur', 'Jl. Raya Desa No. 123, Makmur, Jawa Barat', 'Siti Nurhaliza', '081234567890', 'perpus.makmur@gmail.com', 'approved', CURRENT_TIMESTAMP),
('Perpustakaan Komunitas Literasi', 'Jl. Pendidikan No. 45, Bandung, Jawa Barat', 'Ahmad Fauzi', '081234567891', 'literasi.bandung@gmail.com', 'approved', CURRENT_TIMESTAMP),
('Perpustakaan Digital Nusantara', 'Jl. Teknologi No. 67, Jakarta Selatan', 'Maya Sari', '081234567892', 'digital.nusantara@gmail.com', 'approved', CURRENT_TIMESTAMP),
('Perpustakaan Anak Bangsa', 'Jl. Harapan No. 89, Surabaya, Jawa Timur', 'Budi Santoso', '081234567893', 'anak.bangsa@gmail.com', 'pending', NULL);

-- Insert sample users
INSERT INTO users (username, email, full_name, phone, library_id, status, last_login) VALUES
('siti.nur', 'siti.nur@gmail.com', 'Siti Nurhaliza', '081234567890', 1, 'active', CURRENT_TIMESTAMP - INTERVAL '1 hour'),
('ahmad.fauzi', 'ahmad.fauzi@gmail.com', 'Ahmad Fauzi', '081234567891', 2, 'active', CURRENT_TIMESTAMP - INTERVAL '2 hours'),
('maya.sari', 'maya.sari@gmail.com', 'Maya Sari', '081234567892', 3, 'active', CURRENT_TIMESTAMP - INTERVAL '30 minutes'),
('budi.santoso', 'budi.santoso@gmail.com', 'Budi Santoso', '081234567893', 4, 'active', CURRENT_TIMESTAMP - INTERVAL '1 day'),
('rina.dewi', 'rina.dewi@gmail.com', 'Rina Dewi', '081234567894', 1, 'active', CURRENT_TIMESTAMP - INTERVAL '3 hours'),
('joko.widodo', 'joko.widodo@gmail.com', 'Joko Widodo', '081234567895', 2, 'inactive', CURRENT_TIMESTAMP - INTERVAL '7 days');

-- Insert sample events
INSERT INTO events (title, description, event_date, event_time, location, organizer, library_id, status, max_participants, current_participants) VALUES
('Workshop Digital Literacy', 'Pelatihan literasi digital untuk masyarakat', CURRENT_DATE + INTERVAL '7 days', '09:00:00', 'Aula Perpustakaan Desa Makmur', 'Tim FKPDK', 1, 'scheduled', 50, 23),
('Diskusi Buku Nasional', 'Diskusi tentang buku-buku karya penulis Indonesia', CURRENT_DATE + INTERVAL '14 days', '14:00:00', 'Ruang Diskusi Komunitas Literasi', 'Ahmad Fauzi', 2, 'scheduled', 30, 15),
('Pelatihan Pengelolaan Perpustakaan', 'Pelatihan manajemen perpustakaan modern', CURRENT_DATE + INTERVAL '21 days', '10:00:00', 'Gedung Digital Nusantara', 'Maya Sari', 3, 'scheduled', 40, 32),
('Festival Literasi Anak', 'Festival literasi khusus untuk anak-anak', CURRENT_DATE - INTERVAL '7 days', '08:00:00', 'Taman Bacaan Anak Bangsa', 'Budi Santoso', 4, 'completed', 100, 87);

-- Insert sample discussions
INSERT INTO discussions (title, content, user_id, library_id, status, replies_count, views_count) VALUES
('Cara Meningkatkan Minat Baca Anak', 'Bagaimana cara yang efektif untuk meningkatkan minat baca pada anak-anak di era digital ini?', 1, 1, 'active', 12, 156),
('Digitalisasi Koleksi Perpustakaan', 'Pengalaman dan tips dalam proses digitalisasi koleksi buku perpustakaan', 2, 2, 'active', 8, 89),
('Manajemen Anggaran Perpustakaan', 'Diskusi tentang strategi pengelolaan anggaran perpustakaan yang efektif', 3, 3, 'active', 15, 234),
('Program Literasi Komunitas', 'Berbagi pengalaman program literasi yang berhasil di komunitas', 4, 4, 'closed', 22, 445);

-- Insert sample documents
INSERT INTO documents (title, description, file_name, file_path, file_size, file_type, uploaded_by, library_id, category, status, download_count) VALUES
('Panduan Pengelolaan Perpustakaan Desa', 'Panduan lengkap pengelolaan perpustakaan desa', 'panduan_perpus_desa.pdf', '/uploads/documents/panduan_perpus_desa.pdf', 2048000, 'application/pdf', 1, 1, 'Panduan', 'approved', 45),
('Laporan Kegiatan Literasi 2024', 'Laporan kegiatan literasi tahun 2024', 'laporan_literasi_2024.pdf', '/uploads/documents/laporan_literasi_2024.pdf', 1536000, 'application/pdf', 2, 2, 'Laporan', 'approved', 32),
('Katalog Buku Digital', 'Katalog buku-buku digital yang tersedia', 'katalog_digital.xlsx', '/uploads/documents/katalog_digital.xlsx', 512000, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 3, 3, 'Katalog', 'approved', 67),
('Proposal Kegiatan Workshop', 'Proposal kegiatan workshop literasi', 'proposal_workshop.docx', '/uploads/documents/proposal_workshop.docx', 768000, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 4, 4, 'Proposal', 'pending', 12);

-- Insert sample reports
INSERT INTO reports (title, type, content, data, generated_by, library_id, report_period_start, report_period_end, status) VALUES
('Laporan Bulanan Januari 2024', 'monthly', 'Laporan aktivitas perpustakaan bulan Januari 2024', '{"total_visitors": 1247, "books_borrowed": 356, "events_held": 4, "new_members": 23}', 1, 1, '2024-01-01', '2024-01-31', 'published'),
('Laporan Triwulan Q1 2024', 'quarterly', 'Laporan aktivitas perpustakaan triwulan pertama 2024', '{"total_visitors": 3891, "books_borrowed": 1024, "events_held": 12, "new_members": 67}', 1, 2, '2024-01-01', '2024-03-31', 'published'),
('Laporan Tahunan 2023', 'annual', 'Laporan aktivitas perpustakaan tahun 2023', '{"total_visitors": 15647, "books_borrowed": 4567, "events_held": 48, "new_members": 234}', 2, 3, '2023-01-01', '2023-12-31', 'published');

-- Insert sample activity logs
INSERT INTO activity_logs (table_name, record_id, action, old_values, new_values, changed_by) VALUES
('libraries', 1, 'update', '{"status": "pending"}', '{"status": "approved"}', 1),
('users', 1, 'create', NULL, '{"username": "siti.nur", "email": "siti.nur@gmail.com"}', 1),
('events', 1, 'create', NULL, '{"title": "Workshop Digital Literacy", "status": "scheduled"}', 1),
('documents', 1, 'update', '{"status": "pending"}', '{"status": "approved"}', 2);
