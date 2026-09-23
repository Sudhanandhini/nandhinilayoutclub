const db = require('../config/db');
const { getMailConfig, hasRequiredMailConfig, sendMail } = require('../utils/mailer');

exports.apply = async (req, res) => {
  try {
    const { full_name, email, phone, address, membership_type, message } = req.body;
    if (!full_name || !email || !phone)
      return res.status(400).json({ success: false, message: 'Name, email and phone are required.' });

    await db.query(
      'INSERT INTO memberships (full_name, email, phone, address, membership_type, message) VALUES (?,?,?,?,?,?)',
      [full_name, email, phone, address, membership_type || 'individual', message]
    );

    try {
      const mailConfig = getMailConfig();
      if (!hasRequiredMailConfig(mailConfig)) {
        console.warn('Membership application saved, but email notification skipped because SMTP variables are missing.');
      } else {
        await sendMail({
          from: mailConfig.MAIL_FROM,
          to: mailConfig.MAIL_TO,
          replyTo: email,
          subject: `New Membership Application: ${full_name}`,
          html: `
            <h2>New Membership Application</h2>
            <p><strong>Name:</strong> ${full_name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Type:</strong> ${membership_type}</p>
            <p><strong>Address:</strong> ${address || 'N/A'}</p>
            <p><strong>Message:</strong> ${message || 'N/A'}</p>
          `,
        });
        // Confirm to applicant
        await sendMail({
          from: mailConfig.MAIL_FROM,
          to: email,
          subject: 'Membership Application Received - Nandini Layout Club',
          html: `
            <h2>Thank You, ${full_name}!</h2>
            <p>We have received your membership application. Our team will review it and contact you within 3-5 business days.</p>
            <p>Nandini Layout Club</p>
          `,
        });
      }
    } catch (mailErr) {
      console.error('Email error:', mailErr);
    }

    res.status(201).json({ success: true, message: 'Application submitted successfully! We will contact you soon.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM memberships';
    const params = [];
    if (status) { query += ' WHERE status = ?'; params.push(status); }
    query += ' ORDER BY created_at DESC';
    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await db.query('UPDATE memberships SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: 'Status updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
