const db = require('../config/db');
const { getMailConfig, hasRequiredMailConfig, sendMail } = require('../utils/mailer');

exports.submit = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message)
      return res.status(400).json({ success: false, message: 'Name, email and message are required.' });

    await db.query(
      'INSERT INTO contact_inquiries (name, email, subject, message) VALUES (?,?,?,?)',
      [name, email, subject, message]
    );

    // Send email notification
    try {
      const mailConfig = getMailConfig();
      if (!hasRequiredMailConfig(mailConfig)) {
        console.warn('Contact inquiry saved, but email notification skipped because SMTP variables are missing.');
      } else {
        await sendMail({
          from: mailConfig.MAIL_FROM,
          to: mailConfig.MAIL_TO,
          replyTo: email,
          subject: `New Contact Inquiry: ${subject || 'General Inquiry'}`,
          text: [
            'New Contact Inquiry',
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject || 'N/A'}`,
            '',
            'Message:',
            message,
          ].join('\n'),
          html: `
            <h2>New Contact Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        });
      }
    } catch (mailErr) {
      console.error('Email send error:', mailErr);
      // Don't fail the request if email fails
    }

    res.status(201).json({ success: true, message: 'Your inquiry has been submitted. We will contact you soon.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Admin: get all inquiries
exports.getAll = async (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM contact_inquiries';
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
    await db.query('UPDATE contact_inquiries SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true, message: 'Status updated.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.remove = async (req, res) => {
  try {
    await db.query('DELETE FROM contact_inquiries WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
