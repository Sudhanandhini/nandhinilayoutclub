# Nandini Layout Club — Backend API

Node.js + Express REST API with MySQL database.

## Prerequisites

- Node.js v18+
- MySQL 8.0+
- npm

## Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nandini_club

JWT_SECRET=your_super_secret_key_minimum_32_chars
JWT_EXPIRES_IN=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_SECURE=false
MAIL_FROM=noreply@nandinilayoutclub.in
MAIL_TO=admin@nandinilayoutclub.in

FRONTEND_URL=http://localhost:5173
```

### 3. Create and seed database

```bash
# Create database and tables
mysql -u root -p < schema.sql
```

This creates all tables and inserts seed data.  
**Default admin credentials:** `admin@nandinilayoutclub.in` / `password`

> ⚠️ Change the admin password immediately after first login!

### 4. Start development server

```bash
npm run dev
```

Server starts at `http://localhost:5000`

### 5. Start production server

```bash
npm start
```

---

## API Endpoints

### Public

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/banners` | Get active hero banners |
| GET | `/api/gallery` | Get gallery images |
| GET | `/api/gallery/categories` | Get gallery categories |
| GET | `/api/facilities` | Get all facilities |
| GET | `/api/facilities/:id` | Get single facility |
| GET | `/api/testimonials` | Get testimonials |
| GET | `/api/pages/:slug` | Get page by slug |
| GET | `/api/news` | Get news & events |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/membership/apply` | Submit membership application |

### Auth (Admin)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/login` | Admin login → JWT token |
| GET | `/api/auth/me` | Get current admin (protected) |
| POST | `/api/auth/change-password` | Change password (protected) |

### Admin (All require Bearer token)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/stats` | Dashboard stats |
| GET/POST | `/api/admin/banners` | List / Create banners |
| PUT/DELETE | `/api/admin/banners/:id` | Update / Delete banner |
| GET/POST | `/api/admin/gallery` | List / Upload gallery images |
| PUT/DELETE | `/api/admin/gallery/:id` | Update / Delete image |
| GET/POST | `/api/admin/facilities` | List / Create facilities |
| PUT/DELETE | `/api/admin/facilities/:id` | Update / Delete facility |
| GET/POST | `/api/admin/testimonials` | List / Create testimonials |
| PUT/DELETE | `/api/admin/testimonials/:id` | Update / Delete testimonial |
| GET/POST | `/api/admin/pages` | List / Create pages |
| PUT | `/api/admin/pages/:id` | Update page |
| GET/POST | `/api/admin/news` | List / Create news |
| PUT/DELETE | `/api/admin/news/:id` | Update / Delete news |
| GET | `/api/admin/contact` | List contact inquiries |
| PUT | `/api/admin/contact/:id/status` | Update inquiry status |
| DELETE | `/api/admin/contact/:id` | Delete inquiry |
| GET | `/api/admin/memberships` | List membership applications |
| PUT | `/api/admin/memberships/:id/status` | Update membership status |

---

## File Uploads

Uploaded files are stored in `/uploads/{type}/` directories:
- `/uploads/banners/`
- `/uploads/gallery/`
- `/uploads/facilities/`
- `/uploads/testimonials/`
- `/uploads/pages/`
- `/uploads/news/`

Accessible at: `http://localhost:5000/uploads/{type}/{filename}`

---

## cPanel Deployment

1. Upload backend files via File Manager or FTP
2. In cPanel → **Setup Node.js App**:
   - Node.js version: 18.x
   - Application mode: Production
   - Application root: `/backend`
   - Application startup file: `server.js`
3. Set environment variables in the Node.js app configuration
4. Install dependencies: `npm install --production`
5. Restart the app

### MySQL on cPanel
1. Create database via **MySQL Databases** wizard
2. Create user and assign all privileges
3. Import `schema.sql` via **phpMyAdmin**

---

## VPS Deployment (with PM2)

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start server.js --name "nandini-club-api"

# Save PM2 config
pm2 save
pm2 startup

# Nginx reverse proxy config
# /etc/nginx/sites-available/api.nandinilayoutclub.in
server {
    listen 80;
    server_name api.nandinilayoutclub.in;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads {
        alias /var/www/nandini-club/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Security Notes

- Change `JWT_SECRET` to a random 64-char string in production
- Use Gmail App Passwords (not your main password) for SMTP
- Keep `.env` out of version control
- Run behind HTTPS in production (use Let's Encrypt)
- Restrict MySQL user to only the `nandini_club` database
