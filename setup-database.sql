-- Create Database
CREATE DATABASE IF NOT EXISTS petshop_jogja CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE petshop_jogja;

-- Create Petshops Table
CREATE TABLE IF NOT EXISTS petshops (
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

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
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

-- Insert Petshops
INSERT INTO petshops (name, description, address, city, province, postal_code, phone, email, latitude, longitude, opening_time, closing_time, is_active) VALUES
('Pet Gallery', 'Petshop terpercaya dengan produk lengkap dan berkualitas', 'Jl. Gejayan No. 10, Sleman', 'Sleman', 'Yogyakarta', '55281', '08123456789', 'info@petgallery.com', -7.76010, 110.38900, '08:00:00', '18:00:00', 1),
('Petshop Sejahtera', 'Melayani semua kebutuhan hewan peliharaan Anda', 'Jl. Malioboro No. 5, Yogyakarta Kota', 'Yogyakarta Kota', 'Yogyakarta', '55271', '08198765432', 'sejahtera@petshop.com', -7.79800, 110.36200, '09:00:00', '20:00:00', 1),
('Pet Paradise', 'Surga hewan peliharaan dengan layanan grooming profesional', 'Jl. Sultan Agung No. 20, Bantul', 'Bantul', 'Yogyakarta', '55711', '08512341234', 'paradise@pet.com', -7.86500, 110.37100, '08:30:00', '17:30:00', 1),
('Paws & Love', 'Toko hewan dengan harga terjangkau dan berkualitas', 'Jl. Wonosari No. 15, Gunungkidul', 'Gunungkidul', 'Yogyakarta', '55812', '08765432109', 'pawslove@email.com', -7.92300, 110.42800, '07:00:00', '19:00:00', 1),
('Furry Friends', 'Komunitas petshop untuk semua pecinta hewan', 'Jl. Grobogan No. 8, Kulon Progo', 'Kulon Progo', 'Yogyakarta', '55652', '08345678901', 'friends@furry.com', -7.71200, 110.25600, '08:00:00', '18:00:00', 1);

-- Insert Products
INSERT INTO products (petshop_id, name, description, category, brand, price, stock, is_available) VALUES
(1, 'Royal Canin Kitten 2kg', 'Makanan kucing premium untuk anak kucing berusia 4-12 bulan', 'Makanan Kucing', 'Royal Canin', 245000, 15, 1),
(1, 'Pro Plan Adult Dog 10kg', 'Makanan anjing berkualitas tinggi dengan nutrisi lengkap', 'Makanan Anjing', 'Pro Plan', 350000, 8, 1),
(2, 'Pasir Kucing Bentonite Premium 5kg', 'Pasir kucing wangi yang mudah dibuang', 'Pasir Kucing', 'Golden Pearl', 85000, 20, 1),
(2, 'Vitamin Anjing Complete', 'Suplemen vitamin lengkap untuk kesehatan anjing', 'Vitamin & Suplemen', 'Natural Plus', 125000, 12, 1),
(3, 'Kandang Kelinci Besar 80x50cm', 'Kandang kelinci dengan desain modern dan nyaman', 'Kandang & Rumah', 'Petcare', 350000, 5, 1),
(3, 'Kalung Hewan Adjustable', 'Kalung yang dapat disesuaikan untuk anjing dan kucing', 'Aksesoris', 'Pet Fashion', 45000, 30, 1),
(4, 'Gunting Grooming Set 5pcs', 'Set lengkap alat grooming profesional', 'Grooming', 'Professional', 150000, 10, 1),
(4, 'Mainan Bola Kucing Catnip', 'Mainan interaktif untuk kucing dengan catnip', 'Mainan', 'Whisker Toys', 35000, 25, 1),
(5, 'Shampoo Anjing Herbal 250ml', 'Sampo anjing alami tanpa bahan kimia berbahaya', 'Grooming', 'Nature Pure', 55000, 18, 1),
(5, 'Makanan Kura-kura Premium 500gr', 'Pakan kura-kura dengan nutrisi seimbang', 'Makanan Hewan Lain', 'Aqua Life', 95000, 9, 1),
(1, 'Tempat Minum Otomatis Kucing', 'Dispenser air otomatis untuk kucing', 'Aksesoris', 'Smart Pet', 165000, 6, 1),
(2, 'Bantal Hewan Ortopedik', 'Bantal premium untuk kenyamanan hewan peliharaan', 'Kandang & Rumah', 'ComfortPet', 225000, 7, 1),
(3, 'Obat Cacing Anjing Tablet', 'Obat cacing aman untuk semua jenis anjing', 'Vitamin & Suplemen', 'VetCare', 35000, 40, 1);

-- Verify
SELECT 'Database Setup Completed!' as Status;
SELECT COUNT(*) as total_petshops FROM petshops;
SELECT COUNT(*) as total_products FROM products;
