const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, designation, message, rating } = req.body;
    const photo_url = req.file ? `/uploads/testimonials/${req.file.filename}` : null;
    const [result] = await db.query(
      'INSERT INTO testimonials (name, designation, message, photo_url, rating) VALUES (?,?,?,?,?)',
      [name, designation, message, photo_url, rating || 5]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, designation, message, rating, is_active } = req.body;
    const photo_url = req.file ? `/uploads/testimonials/${req.file.filename}` : null;
    let q = 'UPDATE testimonials SET name=?, designation=?, message=?, rating=?, is_active=?';
    let p = [name, designation, message, rating, is_active];
    if (photo_url) { q += ', photo_url=?'; p.push(photo_url); }
    q += ' WHERE id=?'; p.push(req.params.id);
    await db.query(q, p);
    res.json({ success: true, message: 'Updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM testimonials WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
