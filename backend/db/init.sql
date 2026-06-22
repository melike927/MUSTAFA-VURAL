-- Initial database and table for Mustafa Vural project
CREATE DATABASE IF NOT EXISTS mv_clinic DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE mv_clinic;

CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  adSoyad VARCHAR(255),
  telefon VARCHAR(50),
  email VARCHAR(255),
  tedavi VARCHAR(255),
  tarih DATE,
  saat VARCHAR(50),
  note TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS website_content (
  page_key VARCHAR(40) NOT NULL,
  content_json LONGTEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (page_key)
);
