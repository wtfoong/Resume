const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendPasswordResetEmail = async (toEmail, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: `"Resume Site" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Password Reset Request',
    html: `
      <h2>Password Reset</h2>
      <p>You requested a password reset. Click the link below to reset your password.</p>
      <p>This link expires in ${process.env.RESET_TOKEN_EXPIRY_MINUTES} minutes.</p>
      <a href="${resetUrl}" style="
        display: inline-block;
        padding: 12px 24px;
        background: #2d5a3d;
        color: white;
        text-decoration: none;
        border-radius: 6px;
      ">Reset Password</a>
      <p>If you did not request this, ignore this email.</p>
    `,
  });
};

module.exports = { sendPasswordResetEmail };