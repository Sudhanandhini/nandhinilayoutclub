const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM news_events WHERE is_active = 1 ORDER BY event_date DESC, created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, content, event_date, is_featured } = req.body;
    const image_url = req.file ? `/uploads/news/${req.file.filename}` : null;
    const [result] = await db.query(
      'INSERT INTO news_events (title, content, image_url, event_date, is_featured) VALUES (?,?,?,?,?)',
      [title, content, image_url, event_date, is_featured || 0]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, content, event_date, is_featured, is_active } = req.body;
    const image_url = req.file ? `/uploads/news/${req.file.filename}` : null;
    let q = 'UPDATE news_events SET title=?, content=?, event_date=?, is_featured=?, is_active=?';
    let p = [title, content, event_date, is_featured, is_active];
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
    await db.query('DELETE FROM news_events WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
