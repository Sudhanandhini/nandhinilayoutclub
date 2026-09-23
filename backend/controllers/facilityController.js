const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM facilities WHERE is_active = 1 ORDER BY sort_order ASC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM facilities WHERE id = ? AND is_active = 1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Not found.' });
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, description, category, sort_order } = req.body;
    const image_url = req.file ? `/uploads/facilities/${req.file.filename}` : null;
    const [result] = await db.query(
      'INSERT INTO facilities (name, description, image_url, category, sort_order) VALUES (?,?,?,?,?)',
      [name, description, image_url, category, sort_order || 0]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description, category, sort_order, is_active } = req.body;
    const image_url = req.file ? `/uploads/facilities/${req.file.filename}` : null;

    let q = 'UPDATE facilities SET name=?, description=?, category=?, sort_order=?, is_active=?';
    let p = [name, description, category, sort_order, is_active];
    if (image_url) { q += ', image_url=?'; p.push(image_url); }
    q += ' WHERE id=?'; p.push(req.params.id);
    await db.query(q, p);
    res.json({ success: true, message: 'Updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM facilities WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
