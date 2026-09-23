const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM committee_members WHERE is_active = 1 ORDER BY sort_order ASC, created_at ASC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getAllAdmin = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM committee_members ORDER BY sort_order ASC, created_at ASC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { sort_order } = req.body;
    const photo_url = req.file ? `/uploads/committee/${req.file.filename}` : null;
    if (!photo_url) return res.status(400).json({ success: false, message: 'Image required.' });

    const [result] = await db.query(
      'INSERT INTO committee_members (photo_url, sort_order) VALUES (?,?)',
      [photo_url, sort_order || 0]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { sort_order, is_active } = req.body;
    const photo_url = req.file ? `/uploads/committee/${req.file.filename}` : null;

    let query = 'UPDATE committee_members SET sort_order=?, is_active=?';
    let params = [sort_order, is_active];
    if (photo_url) { query += ', photo_url=?'; params.push(photo_url); }
    query += ' WHERE id=?'; params.push(req.params.id);

    await db.query(query, params);
    res.json({ success: true, message: 'Updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM committee_members WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
