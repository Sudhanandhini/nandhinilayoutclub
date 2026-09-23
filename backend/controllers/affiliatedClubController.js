const db = require('../config/db');

exports.getPublic = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM affiliated_clubs
       WHERE is_active = 1
       ORDER BY state ASC, COALESCE(region, '') ASC, sort_order ASC, club_name ASC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM affiliated_clubs
       ORDER BY state ASC, COALESCE(region, '') ASC, sort_order ASC, club_name ASC`
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      state,
      region,
      club_name,
      location,
      contact_info,
      email,
      notes,
      sort_order,
      is_active,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO affiliated_clubs
      (state, region, club_name, location, contact_info, email, notes, sort_order, is_active)
      VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        state,
        region || null,
        club_name,
        location || null,
        contact_info || null,
        email || null,
        notes || null,
        Number(sort_order || 0),
        Number(is_active ?? 1),
      ]
    );

    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      state,
      region,
      club_name,
      location,
      contact_info,
      email,
      notes,
      sort_order,
      is_active,
    } = req.body;

    await db.query(
      `UPDATE affiliated_clubs
       SET state=?, region=?, club_name=?, location=?, contact_info=?, email=?, notes=?, sort_order=?, is_active=?
       WHERE id=?`,
      [
        state,
        region || null,
        club_name,
        location || null,
        contact_info || null,
        email || null,
        notes || null,
        Number(sort_order || 0),
        Number(is_active ?? 1),
        req.params.id,
      ]
    );

    res.json({ success: true, message: 'Updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM affiliated_clubs WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
