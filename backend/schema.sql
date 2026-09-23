-- ============================================
-- Nandini Layout Club - MySQL Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS nandini_club CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE nandini_club;

-- Admins
CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('super_admin','admin') DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Banners (Hero Slider)
CREATE TABLE banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  subtitle VARCHAR(300),
  image_url VARCHAR(500) NOT NULL,
  link_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pages (About, President's Message, etc.)
CREATE TABLE pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(200) NOT NULL UNIQUE,
  title VARCHAR(300) NOT NULL,
  content LONGTEXT,
  meta_title VARCHAR(300),
  meta_description VARCHAR(500),
  featured_image VARCHAR(500),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Affiliated Clubs
CREATE TABLE affiliated_clubs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  state VARCHAR(150) NOT NULL,
  region VARCHAR(200),
  club_name VARCHAR(300) NOT NULL,
  location VARCHAR(300),
  contact_info VARCHAR(300),
  email VARCHAR(200),
  notes TEXT,
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Facilities / Amenities
CREATE TABLE facilities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  icon_url VARCHAR(500),
  image_url VARCHAR(500),
  category VARCHAR(100),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Gallery
CREATE TABLE gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200),
  image_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  category VARCHAR(100) DEFAULT 'General',
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  designation VARCHAR(200),
  message TEXT NOT NULL,
  photo_url VARCHAR(500),
  rating TINYINT DEFAULT 5,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Memberships (enrollment form submissions)
CREATE TABLE memberships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  membership_type ENUM('individual','family','corporate','senior') DEFAULT 'individual',
  message TEXT,
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Inquiries
CREATE TABLE contact_inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(300),
  message TEXT NOT NULL,
  status ENUM('unread','read','replied') DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Managing Committee (full-width images, e.g. committee member posters)
CREATE TABLE committee_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  designation VARCHAR(200),
  photo_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- News & Events
CREATE TABLE news_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(300) NOT NULL,
  content LONGTEXT,
  image_url VARCHAR(500),
  event_date DATE,
  is_featured TINYINT(1) DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SEED DATA
-- ============================================

INSERT INTO admins (name, email, password, role) VALUES
('Super Admin', 'admin@nandinilayoutclub.in', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin');
-- Default password: password

INSERT INTO banners (title, subtitle, image_url, sort_order) VALUES
('Welcome To Nandini Layout Club', 'In Pursuit of Excellence', '/uploads/banners/slider-01.jpg', 1),
('Experience Luxury & Leisure', 'West Bangalore\'s Premier Club Since 1986', '/uploads/banners/slider-02.jpg', 2),
('World Class Amenities', 'Sports, Leisure & Hospitality Under One Roof', '/uploads/banners/slider-03.jpg', 3),
('Join Our Community', 'Become a Member Today', '/uploads/banners/slider-04.jpg', 4);

INSERT INTO pages (slug, title, content, meta_title, meta_description) VALUES
('about-club', 'About Club',
'<p>Nandini Layout Club - The perfect place to enjoy life in a classy and friendly atmosphere! The Club houses a unique combination of the traditions of an exclusive club and the best of today''s sporting, leisure, entertaining and hotel facilities, in one of the most convenient locations in West Bangalore.</p><p>From its humble beginning as "Chord Road Club" in 1986, the club has grown steadily over the years. Today, with a glorious history of over 35 years, the club has a total membership of close to 1000.</p>',
'About Nandini Layout Club | West Bangalore''s Premier Club',
'Learn about Nandini Layout Club - West Bangalore''s premier social club established in 1986 with world-class amenities.'),
('presidents-message', 'President''s Message',
'<p>Dear Members and Guests,</p><p>It is with great pride and honor that I welcome you to Nandini Layout Club. Our club has been a cornerstone of the West Bangalore community since 1986, providing a space where families and friends can come together to enjoy the finest amenities and social experiences.</p><p>We remain committed to excellence in all that we do, continually enhancing our facilities and services to meet the evolving needs of our valued members.</p><p>Warm regards,<br/>President, Nandini Layout Club</p>',
'President''s Message | Nandini Layout Club', 'Message from the President of Nandini Layout Club.'),
('secretarys-message', 'Hon. Secretary''s Message',
'<p>Dear Members,</p><p>On behalf of the Managing Committee, I extend a warm welcome to all members and visitors of Nandini Layout Club. Our dedicated team works tirelessly to ensure that your experience at the club is nothing short of exceptional.</p><p>Thank you for your continued support and patronage.</p><p>Sincerely,<br/>Hon. Secretary, Nandini Layout Club</p>',
'Secretary''s Message | Nandini Layout Club', 'Message from the Honorary Secretary of Nandini Layout Club.');

INSERT INTO facilities (name, description, icon_url, category, sort_order) VALUES
('Sports Facilities', 'World-class sports facilities including badminton courts, table tennis, chess, and carrom.', '/uploads/icons/icon-sports.png', 'Sports', 1),
('Health & Wellness', 'State-of-the-art gymnasium and wellness center for your fitness needs.', '/uploads/icons/icon-health.png', 'Wellness', 2),
('Guest Rooms', 'Comfortable and elegant guest rooms for members and their guests.', '/uploads/icons/icon-guestroom.png', 'Accommodation', 3),
('Conferences & Banquets', 'Modern conference halls and banquet facilities for all occasions.', '/uploads/icons/icon-conferences.png', 'Events', 4),
('Food & Beverage', 'Multi-cuisine restaurant and bar serving delicious food and beverages.', '/uploads/icons/icon-food.png', 'Dining', 5),
('Events & Activities', 'Regular cultural events, festivals, and social activities for members.', '/uploads/icons/icon-events.png', 'Events', 6),
('Membership', 'Exclusive membership benefits with access to all club facilities.', '/uploads/icons/icon-membership.png', 'General', 7),
('Other Facilities', 'Swimming pool, library, and other exclusive member facilities.', '/uploads/icons/icon-facilities.png', 'General', 8);

INSERT INTO testimonials (name, designation, message, rating) VALUES
('Rajesh Kumar', 'Member since 2010', 'Nandini Layout Club has been our second home for over a decade. The facilities are world-class and the staff is always warm and welcoming.', 5),
('Priya Sharma', 'Family Member', 'The club offers excellent facilities for the whole family. My children love the sports courts and we all enjoy the restaurant.', 5),
('Dr. Arun Patel', 'Corporate Member', 'Excellent venue for corporate events and meetings. The banquet facilities are top-notch and the catering is superb.', 5),
('Sunita Reddy', 'Senior Member', 'I have been a member since the early days. This club has grown tremendously while maintaining its warmth and community spirit.', 5);

INSERT INTO gallery (title, image_url, category, sort_order) VALUES
('Club Exterior', '/uploads/gallery/gallery-01.jpg', 'Club', 1),
('Swimming Pool', '/uploads/gallery/gallery-02.jpg', 'Sports', 2),
('Banquet Hall', '/uploads/gallery/gallery-03.jpg', 'Events', 3),
('Restaurant', '/uploads/gallery/gallery-04.jpg', 'Dining', 4),
('Badminton Court', '/uploads/gallery/gallery-05.jpg', 'Sports', 5),
('Guest Rooms', '/uploads/gallery/gallery-06.jpg', 'Accommodation', 6),
('Club Events', '/uploads/gallery/gallery-07.jpg', 'Events', 7),
('Garden Area', '/uploads/gallery/gallery-08.jpg', 'Club', 8),
('Conference Room', '/uploads/gallery/gallery-09.jpg', 'Events', 9),
('Gym', '/uploads/gallery/gallery-10.jpg', 'Wellness', 10);

INSERT INTO news_events (title, content, event_date, is_featured) VALUES
('Annual General Meeting 2024', 'The Annual General Meeting of Nandini Layout Club will be held on the last Sunday of March. All members are requested to attend.', '2024-03-31', 1),
('Holi Celebration 2024', 'Join us for a grand Holi celebration at the club grounds. Special cultural programs, music, and festive delicacies await you.', '2024-03-25', 1),
('New Year''s Eve Gala 2024', 'Ring in the New Year with a spectacular gala dinner, live music, and dance at Nandini Layout Club.', '2024-12-31', 0),
('Summer Sports Tournament', 'Annual summer sports tournament for all age groups. Register at the front desk.', '2024-05-15', 0);
