const db = require('../config/db');

exports.getBySlug = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pages WHERE slug = ? AND is_active = 1', [req.params.slug]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Page not found.' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('pages.getBySlug error:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pages ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { slug, title, content, meta_title, meta_description } = req.body;
    const featured_image = req.file ? `/uploads/pages/${req.file.filename}` : null;
    const [result] = await db.query(
      'INSERT INTO pages (slug, title, content, meta_title, meta_description, featured_image) VALUES (?,?,?,?,?,?)',
      [slug, title, content, meta_title, meta_description, featured_image]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, content, meta_title, meta_description, is_active } = req.body;
    const featured_image = req.file ? `/uploads/pages/${req.file.filename}` : null;
    let q = 'UPDATE pages SET title=?, content=?, meta_title=?, meta_description=?, is_active=?';
    let p = [title, content, meta_title, meta_description, is_active];
    if (featured_image) { q += ', featured_image=?'; p.push(featured_image); }
    q += ' WHERE id=?'; p.push(req.params.id);
    await db.query(q, p);
    res.json({ success: true, message: 'Updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
