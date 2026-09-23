const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

// Controllers
const authCtrl = require('../controllers/authController');
const bannerCtrl = require('../controllers/bannerController');
const galleryCtrl = require('../controllers/galleryController');
const facilityCtrl = require('../controllers/facilityController');
const contactCtrl = require('../controllers/contactController');
const membershipCtrl = require('../controllers/membershipController');
const testimonialCtrl = require('../controllers/testimonialController');
const pageCtrl = require('../controllers/pageController');
const newsCtrl = require('../controllers/newsController');
const affiliatedClubCtrl = require('../controllers/affiliatedClubController');
const committeeCtrl = require('../controllers/committeeController');

// ─── AUTH ────────────────────────────────────────
router.post('/auth/login', authCtrl.login);
router.get('/auth/me', auth, authCtrl.getMe);
router.post('/auth/change-password', auth, authCtrl.changePassword);

// ─── PUBLIC APIs ─────────────────────────────────
router.get('/banners', bannerCtrl.getAll);
router.get('/gallery', galleryCtrl.getAll);
router.get('/gallery/categories', galleryCtrl.getCategories);
router.get('/facilities', facilityCtrl.getAll);
router.get('/facilities/:id', facilityCtrl.getOne);
router.get('/testimonials', testimonialCtrl.getAll);
router.get('/pages/:slug', pageCtrl.getBySlug);
router.get('/news', newsCtrl.getAll);
router.get('/affiliated-clubs', affiliatedClubCtrl.getPublic);
router.get('/committee', committeeCtrl.getAll);

// ─── CONTACT / MEMBERSHIP (Public POST) ──────────
router.post('/contact', contactCtrl.submit);
router.post('/membership/apply', membershipCtrl.apply);

// ─── ADMIN APIs (Protected) ───────────────────────
// Banners
router.post('/admin/banners', auth, (req, res, next) => { req.uploadFolder = 'banners'; next(); }, upload.single('image'), bannerCtrl.create);
router.put('/admin/banners/:id', auth, (req, res, next) => { req.uploadFolder = 'banners'; next(); }, upload.single('image'), bannerCtrl.update);
router.delete('/admin/banners/:id', auth, bannerCtrl.remove);
router.get('/admin/banners', auth, bannerCtrl.getAll);

// Gallery
router.post('/admin/gallery', auth, (req, res, next) => { req.uploadFolder = 'gallery'; next(); }, upload.single('image'), galleryCtrl.create);
router.put('/admin/gallery/:id', auth, (req, res, next) => { req.uploadFolder = 'gallery'; next(); }, upload.single('image'), galleryCtrl.update);
router.delete('/admin/gallery/:id', auth, galleryCtrl.remove);

// Facilities
router.post('/admin/facilities', auth, (req, res, next) => { req.uploadFolder = 'facilities'; next(); }, upload.single('image'), facilityCtrl.create);
router.put('/admin/facilities/:id', auth, (req, res, next) => { req.uploadFolder = 'facilities'; next(); }, upload.single('image'), facilityCtrl.update);
router.delete('/admin/facilities/:id', auth, facilityCtrl.remove);

// Testimonials
router.post('/admin/testimonials', auth, (req, res, next) => { req.uploadFolder = 'testimonials'; next(); }, upload.single('photo'), testimonialCtrl.create);
router.put('/admin/testimonials/:id', auth, (req, res, next) => { req.uploadFolder = 'testimonials'; next(); }, upload.single('photo'), testimonialCtrl.update);
router.delete('/admin/testimonials/:id', auth, testimonialCtrl.remove);

// Pages
router.get('/admin/pages', auth, pageCtrl.getAll);
router.post('/admin/pages', auth, (req, res, next) => { req.uploadFolder = 'pages'; next(); }, upload.single('image'), pageCtrl.create);
router.put('/admin/pages/:id', auth, (req, res, next) => { req.uploadFolder = 'pages'; next(); }, upload.single('image'), pageCtrl.update);

// Affiliated clubs
router.get('/admin/affiliated-clubs', auth, affiliatedClubCtrl.getAll);
router.post('/admin/affiliated-clubs', auth, affiliatedClubCtrl.create);
router.put('/admin/affiliated-clubs/:id', auth, affiliatedClubCtrl.update);
router.delete('/admin/affiliated-clubs/:id', auth, affiliatedClubCtrl.remove);

// Managing Committee
router.get('/admin/committee', auth, committeeCtrl.getAllAdmin);
router.post('/admin/committee', auth, (req, res, next) => { req.uploadFolder = 'committee'; next(); }, upload.single('photo'), committeeCtrl.create);
router.put('/admin/committee/:id', auth, (req, res, next) => { req.uploadFolder = 'committee'; next(); }, upload.single('photo'), committeeCtrl.update);
router.delete('/admin/committee/:id', auth, committeeCtrl.remove);

// Contact inquiries
router.get('/admin/contact', auth, contactCtrl.getAll);
router.put('/admin/contact/:id/status', auth, contactCtrl.updateStatus);
router.delete('/admin/contact/:id', auth, contactCtrl.remove);

// Memberships
router.get('/admin/memberships', auth, membershipCtrl.getAll);
router.put('/admin/memberships/:id/status', auth, membershipCtrl.updateStatus);

// News & Events
router.get('/admin/news', auth, newsCtrl.getAll);
router.post('/admin/news', auth, (req, res, next) => { req.uploadFolder = 'news'; next(); }, upload.single('image'), newsCtrl.create);
router.put('/admin/news/:id', auth, (req, res, next) => { req.uploadFolder = 'news'; next(); }, upload.single('image'), newsCtrl.update);
router.delete('/admin/news/:id', auth, newsCtrl.remove);

// Dashboard stats
router.get('/admin/stats', auth, async (req, res) => {
  const db = require('../config/db');
  try {
    const [[{ contacts }]] = await db.query('SELECT COUNT(*) as contacts FROM contact_inquiries WHERE status="unread"');
    const [[{ memberships }]] = await db.query('SELECT COUNT(*) as memberships FROM memberships WHERE status="pending"');
    const [[{ gallery }]] = await db.query('SELECT COUNT(*) as gallery FROM gallery');
    const [[{ facilities }]] = await db.query('SELECT COUNT(*) as facilities FROM facilities');
    const [[{ affiliated_clubs }]] = await db.query('SELECT COUNT(*) as affiliated_clubs FROM affiliated_clubs');
    const [[{ committee }]] = await db.query('SELECT COUNT(*) as committee FROM committee_members');
    res.json({ success: true, data: { contacts, memberships, gallery, facilities, affiliated_clubs, committee } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
