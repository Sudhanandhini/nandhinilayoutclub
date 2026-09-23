require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const syncAdminFromEnv = require('./config/syncAdmin');

const app = express();

// ─── Security ────────────────────────────────────
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// ─── CORS ─────────────────────────────────────────
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || 'http://localhost:5173,https://nandinilayoutclub.in').split(',').map((origin) => origin.trim()).filter(Boolean);

// Accept both apex and www variants of any allowed origin (e.g. nandinilayoutclub.in + www.nandinilayoutclub.in)
const isAllowedOrigin = (origin) => {
  if (allowedOrigins.includes(origin)) return true;
  const withoutWww = origin.replace(/^https?:\/\/www\./, (m) => m.replace('www.', ''));
  const withWww = origin.replace(/^(https?:\/\/)(?!www\.)/, '$1www.');
  return allowedOrigins.includes(withoutWww) || allowedOrigins.includes(withWww);
};

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// ─── Rate Limiting ────────────────────────────────
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 300,
  message: { success: false, message: 'Too many requests. Please try again later.' },
}));

// Stricter limit for auth
app.use('/api/auth/login', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts.' },
}));

// ─── Body Parsing ─────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Static Files (Uploads) ───────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Routes ──────────────────────────────────────
app.use('/api', require('./routes/index'));

// ─── Health Check ────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ─── 404 Handler ─────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ─── Error Handler ───────────────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: err.message || 'Internal server error.' });
});

// ─── Start ────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT} [${process.env.NODE_ENV}]`);
  await syncAdminFromEnv();
});

module.exports = app;
