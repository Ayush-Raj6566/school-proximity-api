
CREATE DATABASE IF NOT EXISTS schools_db;
USE schools_db;

CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO schools (name, address, latitude, longitude) VALUES
('Greenfield High', '12 Park Street', 28.6139, 77.2090),
('Sunrise Public School', '221 Baker Road', 19.0760, 72.8777);
