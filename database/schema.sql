
-- FKPDK Database Schema
-- Drop tables if they exist (for re-seeding)
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS page_content CASCADE;
DROP TABLE IF EXISTS activity_logs CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS discussions CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS libraries CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- Admin table for authentication
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Libraries table (enhanced for Libraries page)
CREATE TABLE libraries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    province VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    category VARCHAR(20) DEFAULT 'Desa', -- Desa, Kelurahan
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, active
    member_count INTEGER DEFAULT 0,
    book_count INTEGER DEFAULT 0,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    last_activity TIMESTAMP,
    description TEXT,
    website VARCHAR(255),
    social_media JSONB, -- Store social media links as JSON
    facilities TEXT[], -- Array of facilities
    operating_hours JSONB, -- Store operating hours as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Messages table (for Contact page form submissions)
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread', -- unread, read, replied, archived
    ip_address INET,
    user_agent TEXT,
    replied_by INTEGER REFERENCES admins(id),
    replied_at TIMESTAMP,
    reply_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Page Content table (for dynamic content management of About and Contact pages)
CREATE TABLE page_content (
    id SERIAL PRIMARY KEY,
    page_name VARCHAR(50) NOT NULL, -- about, contact, home, etc.
    section_name VARCHAR(100) NOT NULL, -- hero, mission, vision, features, etc.
    content_type VARCHAR(20) NOT NULL, -- text, html, json, image
    content TEXT,
    content_data JSONB, -- For structured content like achievements, features, etc.
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_by INTEGER REFERENCES admins(id),
    updated_by INTEGER REFERENCES admins(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    library_id INTEGER REFERENCES libraries(id),
    position VARCHAR(100), -- Jabatan di perpustakaan
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, suspended
    profile_image VARCHAR(255),
    bio TEXT,
    last_login TIMESTAMP,
    login_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events/Activities table (enhanced)
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    event_time TIME,
    end_date DATE,
    end_time TIME,
    location VARCHAR(200),
    address TEXT,
    organizer VARCHAR(100),
    library_id INTEGER REFERENCES libraries(id),
    status VARCHAR(20) DEFAULT 'scheduled', -- scheduled, ongoing, completed, cancelled
    event_type VARCHAR(50) DEFAULT 'workshop', -- workshop, seminar, training, meeting, etc.
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    registration_fee DECIMAL(10,2) DEFAULT 0,
    is_online BOOLEAN DEFAULT false,
    meeting_link VARCHAR(255),
    tags TEXT[],
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Discussions table
CREATE TABLE discussions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id),
    library_id INTEGER REFERENCES libraries(id),
    category VARCHAR(50) DEFAULT 'general', -- general, technical, policy, etc.
    status VARCHAR(20) DEFAULT 'active', -- active, closed, archived
    is_pinned BOOLEAN DEFAULT false,
    replies_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    last_reply_at TIMESTAMP,
    last_reply_by INTEGER REFERENCES users(id),
    tags TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table (enhanced)
CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    file_type VARCHAR(50),
    uploaded_by INTEGER REFERENCES users(id),
    library_id INTEGER REFERENCES libraries(id),
    category VARCHAR(100),
    subcategory VARCHAR(100),
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    is_public BOOLEAN DEFAULT false,
    download_count INTEGER DEFAULT 0,
    version VARCHAR(20) DEFAULT '1.0',
    tags TEXT[],
    metadata JSONB, -- Additional file metadata
    thumbnail_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports table
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL, -- monthly, quarterly, annual, custom
    content TEXT,
    data JSONB, -- Store report data as JSON
    generated_by INTEGER REFERENCES admins(id),
    library_id INTEGER REFERENCES libraries(id),
    report_period_start DATE,
    report_period_end DATE,
    status VARCHAR(20) DEFAULT 'draft', -- draft, published
    file_path VARCHAR(500), -- Path to generated report file
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity logs table for tracking changes
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL, -- create, update, delete
    old_values JSONB,
    new_values JSONB,
    changed_by INTEGER REFERENCES admins(id),
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_libraries_status ON libraries(status);
CREATE INDEX idx_libraries_province ON libraries(province);
CREATE INDEX idx_libraries_category ON libraries(category);
CREATE INDEX idx_libraries_name ON libraries USING gin(to_tsvector('indonesian', name));
CREATE INDEX idx_libraries_address ON libraries USING gin(to_tsvector('indonesian', address));

CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);
CREATE INDEX idx_contact_messages_email ON contact_messages(email);

CREATE INDEX idx_page_content_page ON page_content(page_name, section_name);
CREATE INDEX idx_page_content_active ON page_content(is_active);

CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_users_library ON users(library_id);
CREATE INDEX idx_users_email ON users(email);

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_library ON events(library_id);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_type ON events(event_type);

CREATE INDEX idx_discussions_status ON discussions(status);
CREATE INDEX idx_discussions_library ON discussions(library_id);
CREATE INDEX idx_discussions_category ON discussions(category);
CREATE INDEX idx_discussions_last_reply ON discussions(last_reply_at);

CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_library ON documents(library_id);
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_documents_public ON documents(is_public);

CREATE INDEX idx_reports_type ON reports(type);
CREATE INDEX idx_reports_library ON reports(library_id);
CREATE INDEX idx_reports_period ON reports(report_period_start, report_period_end);

CREATE INDEX idx_activity_logs_table ON activity_logs(table_name, record_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_libraries_updated_at BEFORE UPDATE ON libraries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_content_updated_at BEFORE UPDATE ON page_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_discussions_updated_at BEFORE UPDATE ON discussions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert initial page content for About page
INSERT INTO page_content (page_name, section_name, content_type, content_data, is_active, sort_order) VALUES
('about', 'hero', 'json', '{"title": "Tentang FKPDK", "subtitle": "Forum Komunikasi Perpustakaan Desa/Kelurahan", "description": "FKPDK adalah platform digital yang menghubungkan, memberdayakan, dan mengembangkan perpustakaan desa dan kelurahan di seluruh Indonesia dalam mendukung gerakan literasi nasional."}', true, 1),
('about', 'vision', 'text', 'Menjadi platform utama yang menghubungkan dan memberdayakan perpustakaan desa/kelurahan di Indonesia untuk menciptakan masyarakat yang literat, cerdas, dan berbudaya melalui akses informasi dan pengetahuan yang merata.', true, 2),
('about', 'mission', 'json', '["Memfasilitasi komunikasi antar perpustakaan desa/kelurahan", "Menyediakan platform berbagi pengetahuan dan pengalaman", "Mendukung peningkatan kualitas layanan perpustakaan", "Mengembangkan program literasi berkelanjutan"]', true, 3),
('about', 'achievements', 'json', '{"libraries": "1,247", "users": "3,891", "discussions": "156", "programs": "42"}', true, 4);

-- Insert initial page content for Contact page
INSERT INTO page_content (page_name, section_name, content_type, content_data, is_active, sort_order) VALUES
('contact', 'hero', 'json', '{"title": "Hubungi Kami", "subtitle": "Sekretariat FKPDK siap membantu Anda", "description": "Kami siap membantu menjawab pertanyaan Anda seputar pengelolaan perpustakaan, program literasi, dan layanan FKPDK lainnya."}', true, 1),
('contact', 'address', 'json', '{"street": "Jl. RE.Martadinata-Ancaran Nomor 524", "city": "Kuningan", "district": "Kec. Kuningan", "regency": "Kabupaten Kuningan", "province": "Jawa Barat", "postal_code": "45511"}', true, 2),
('contact', 'contact_info', 'json', '{"phone": "081461208098", "email": "info@fkpdk.org", "operating_hours": {"weekdays": "08.00 - 17.00 WIB", "saturday": "08.00 - 12.00 WIB", "sunday": "Tutup"}}', true, 3);

-- Create unique constraints
ALTER TABLE page_content ADD CONSTRAINT unique_page_section UNIQUE (page_name, section_name);
ALTER TABLE contact_messages ADD CONSTRAINT check_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');
ALTER TABLE libraries ADD CONSTRAINT check_member_count CHECK (member_count >= 0);
ALTER TABLE libraries ADD CONSTRAINT check_book_count CHECK (book_count >= 0);
