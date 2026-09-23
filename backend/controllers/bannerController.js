const db = require('../config/db');

// GET /api/banners - public
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM banners WHERE is_active = 1 ORDER BY sort_order ASC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// POST /api/admin/banners
exports.create = async (req, res) => {
  try {
    const { title, subtitle, link_url, sort_order } = req.body;
    const image_url = req.file ? `/uploads/banners/${req.file.filename}` : null;
    if (!image_url) return res.status(400).json({ success: false, message: 'Image is required.' });

    const [result] = await db.query(
      'INSERT INTO banners (title, subtitle, image_url, link_url, sort_order) VALUES (?,?,?,?,?)',
      [title, subtitle, image_url, link_url, sort_order || 0]
    );
    res.status(201).json({ success: true, id: result.insertId, message: 'Banner created.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// PUT /api/admin/banners/:id
exports.update = async (req, res) => {
  try {
    const { title, subtitle, link_url, sort_order, is_active } = req.body;
    const image_url = req.file ? `/uploads/banners/${req.file.filename}` : null;

    let query = 'UPDATE banners SET title=?, subtitle=?, link_url=?, sort_order=?, is_active=?';
    let params = [title, subtitle, link_url, sort_order, is_active];

    if (image_url) { query += ', image_url=?'; params.push(image_url); }
    query += ' WHERE id=?'; params.push(req.params.id);

    await db.query(query, params);
    res.json({ success: true, message: 'Banner updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// DELETE /api/admin/banners/:id
exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM banners WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Banner deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
