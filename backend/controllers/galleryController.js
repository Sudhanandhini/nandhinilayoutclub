const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM gallery WHERE is_active = 1';
    const params = [];
    if (category && category !== 'All') {
      query += ' AND category = ?'; params.push(category);
    }
    query += ' ORDER BY sort_order ASC, created_at DESC';
    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT DISTINCT category FROM gallery WHERE is_active = 1');
    const categories = ['All', ...rows.map(r => r.category)];
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, category, sort_order } = req.body;
    const image_url = req.file ? `/uploads/gallery/${req.file.filename}` : null;
    if (!image_url) return res.status(400).json({ success: false, message: 'Image required.' });

    const [result] = await db.query(
      'INSERT INTO gallery (title, image_url, category, sort_order) VALUES (?,?,?,?)',
      [title, image_url, category || 'General', sort_order || 0]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, category, sort_order, is_active } = req.body;
    const image_url = req.file ? `/uploads/gallery/${req.file.filename}` : null;

    let query = 'UPDATE gallery SET title=?, category=?, sort_order=?, is_active=?';
    let params = [title, category, sort_order, is_active];
    if (image_url) { query += ', image_url=?'; params.push(image_url); }
    query += ' WHERE id=?'; params.push(req.params.id);

    await db.query(query, params);
    res.json({ success: true, message: 'Updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
