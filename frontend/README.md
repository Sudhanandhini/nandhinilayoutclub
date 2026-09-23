# Nandini Layout Club — Frontend

React + Vite frontend application.

## Tech Stack

- **React 18** with hooks
- **Vite 5** for blazing-fast builds
- **React Router DOM v6** for routing
- **Tailwind CSS v3** for styling
- **Framer Motion** for animations
- **Swiper.js** for sliders/carousels
- **Axios** for API calls
- **React Helmet Async** for SEO meta tags
- **React Hot Toast** for notifications

## Prerequisites

- Node.js v18+
- npm
- Backend API running (see `/backend/README.md`)

## Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_UPLOADS_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=919876543210
VITE_SITE_NAME=Nandini Layout Club
```

### 3. Start development server

```bash
npm run dev
```

Runs at `http://localhost:5173`

### 4. Build for production

```bash
npm run build
```

Output in `/dist` folder.

---

## Project Structure

```
src/
├── admin/                  # Admin panel pages
│   ├── AdminLogin.jsx
│   ├── AdminDashboard.jsx
│   ├── AdminBanners.jsx
│   ├── AdminGallery.jsx
│   ├── AdminFacilities.jsx
│   ├── AdminTestimonials.jsx
│   ├── AdminForms.jsx      # Contacts + Memberships
│   └── AdminContent.jsx    # News + Pages
│
├── components/
│   ├── common/
│   │   ├── Navbar.jsx       # Sticky responsive navbar
│   │   ├── Footer.jsx       # Footer with links
│   │   ├── UI.jsx           # WhatsApp btn, Breadcrumbs, PageHero, Spinner
│   │   └── ProtectedRoute.jsx
│   └── home/
│       ├── HeroSlider.jsx   # Swiper-based hero
│       ├── FacilitiesGrid.jsx
│       ├── HomeAbout.jsx
│       ├── Testimonials.jsx
│       └── ContactSection.jsx
│
├── context/
│   └── AuthContext.jsx      # JWT auth state management
│
├── layouts/
│   ├── MainLayout.jsx       # Public pages layout
│   └── AdminLayout.jsx      # Admin sidebar layout
│
├── pages/
│   ├── HomePage.jsx
│   ├── AboutPage.jsx
│   ├── GalleryPage.jsx      # With lightbox
│   ├── AmenitiesPage.jsx
│   ├── MembershipPage.jsx   # + Apply form + Committee pages
│   └── OtherPages.jsx       # FindUs, News, Rooms
│
├── services/
│   └── api.js               # Axios instance + helpers
│
├── App.jsx                  # All routes
├── main.jsx                 # Entry point
└── index.css                # Global styles + Tailwind
```

---

## Routes

### Public
| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About Club |
| `/about/presidents-message` | President's Message |
| `/about/secretarys-message` | Secretary's Message |
| `/membership` | Membership Plans |
| `/membership/apply` | Apply for Membership |
| `/membership/managing-committee` | Managing Committee |
| `/membership/sub-committees` | Sub Committees |
| `/gallery` | Photo Gallery |
| `/amenities` | Amenities & Facilities |
| `/rooms` | Guest Rooms |
| `/news-events` | News & Events |
| `/find-us` | Location & Map |

### Admin (Protected)
| Route | Page |
|-------|------|
| `/admin/login` | Login |
| `/admin` | Dashboard |
| `/admin/banners` | Hero Banners |
| `/admin/gallery` | Gallery Manager |
| `/admin/facilities` | Facilities Manager |
| `/admin/testimonials` | Testimonials Manager |
| `/admin/pages` | Pages Editor |
| `/admin/news` | News & Events |
| `/admin/memberships` | Membership Applications |
| `/admin/contacts` | Contact Inquiries |

---

## Design System

Colors:
- **Primary**: `#8B1A1A` (deep red)
- **Gold**: `#C8972A`
- **Dark**: `#1a1a1a`
- **Cream**: `#FAF7F0`

Typography:
- **Headings**: Playfair Display (serif)
- **Body**: Source Sans 3 (sans-serif)

---

## cPanel Deployment

1. Run `npm run build` locally
2. Upload the `/dist` folder contents to your cPanel `public_html` (or subdomain folder)
3. Create `.htaccess` for React Router:

```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

4. Update `VITE_API_URL` to your production API URL before building

## VPS Deployment (Nginx)

```nginx
server {
    listen 80;
    server_name nandinilayoutclub.in www.nandinilayoutclub.in;
    root /var/www/nandini-club/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## Admin Login

After setting up and seeding the database:
- **URL:** `http://yourdomain.com/admin/login`
- **Email:** `admin@nandinilayoutclub.in`
- **Password:** `password`

> ⚠️ Change the password immediately after first login via Settings!
