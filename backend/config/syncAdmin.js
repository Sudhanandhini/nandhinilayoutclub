const bcrypt = require('bcryptjs');
const db = require('./db');

// Keeps the admins table in sync with ADMIN_EMAIL / ADMIN_PASSWORD from .env.
// Runs once on server start so editing .env and restarting updates the login credentials.
async function syncAdminFromEnv() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const [rows] = await db.query('SELECT id FROM admins WHERE role = "super_admin" ORDER BY id ASC LIMIT 1');

    if (rows.length) {
      await db.query('UPDATE admins SET email = ?, password = ? WHERE id = ?', [email, hashed, rows[0].id]);
    } else {
      await db.query(
        'INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, "super_admin")',
        ['Admin', email, hashed]
      );
    }
    console.log(`✅ Admin credentials synced from .env (${email})`);
  } catch (err) {
    console.error('❌ Failed to sync admin credentials from .env:', err.message);
  }
}

module.exports = syncAdminFromEnv;
