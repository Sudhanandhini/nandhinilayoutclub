const nodemailer = require('nodemailer');

const toBool = value => String(value).toLowerCase() === 'true';

function getMailConfig() {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    MAIL_FROM,
    MAIL_TO,
  } = process.env;

  return {
    SMTP_HOST,
    SMTP_PORT: SMTP_PORT ? Number(SMTP_PORT) : undefined,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE: typeof SMTP_SECURE === 'undefined' ? undefined : toBool(SMTP_SECURE),
    MAIL_FROM,
    MAIL_TO,
  };
}

function hasRequiredMailConfig(config = getMailConfig()) {
  return Boolean(
    config.SMTP_HOST &&
    config.SMTP_PORT &&
    config.SMTP_USER &&
    config.SMTP_PASS &&
    config.MAIL_FROM &&
    config.MAIL_TO
  );
}

function createTransport() {
  const config = getMailConfig();
  if (!hasRequiredMailConfig(config)) {
    return null;
  }

  const secure = typeof config.SMTP_SECURE === 'boolean'
    ? config.SMTP_SECURE
    : config.SMTP_PORT === 465;

  return nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });
}

async function sendMail(options) {
  const transporter = createTransport();

  if (!transporter) {
    const error = new Error('Mail transport is not configured.');
    error.code = 'MAIL_NOT_CONFIGURED';
    throw error;
  }

  return transporter.sendMail(options);
}

module.exports = {
  createTransport,
  getMailConfig,
  hasRequiredMailConfig,
  sendMail,
};
