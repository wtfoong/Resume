const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const authRepo = require('../repositories/authRepository');
const { sendPasswordResetEmail } = require('./emailService');
const AppError = require('../utils/AppError');
require('dotenv').config();

const REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const login = async (email, password) => {
  const admin = await authRepo.findAdminByEmail(email);
  if (!admin) throw new AppError('Invalid credentials', 401);

  const isMatch = await bcrypt.compare(password, admin.password_hash);
  if (!isMatch) throw new AppError('Invalid credentials', 401);

  await authRepo.updateLastLogin(admin.id);

  const accessToken = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = crypto.randomBytes(40).toString('hex');
  const refreshExpiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS);
  await authRepo.saveRefreshToken(admin.id, refreshToken, refreshExpiresAt);

  return { accessToken, refreshToken, refreshExpiresAt };
};

const refresh = async (refreshToken) => {
  if (!refreshToken) throw new AppError('Refresh token required', 401);

  const admin = await authRepo.findAdminByRefreshToken(refreshToken);
  if (!admin) throw new AppError('Invalid refresh token', 401);

  const isExpired = new Date() > new Date(admin.refresh_token_expires_at);
  if (isExpired) {
    await authRepo.clearRefreshToken(admin.id);
    throw new AppError('Refresh token expired, please login again', 401);
  }

  // rotation — generate new refresh token, invalidate old one
  const newRefreshToken = crypto.randomBytes(40).toString('hex');
  const newRefreshExpiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRY_MS);
  await authRepo.saveRefreshToken(admin.id, newRefreshToken, newRefreshExpiresAt);

  const accessToken = jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  return { accessToken, newRefreshToken, newRefreshExpiresAt };
};

const logout = async (refreshToken) => {
  if (!refreshToken) return;
  const admin = await authRepo.findAdminByRefreshToken(refreshToken);
  if (admin) await authRepo.clearRefreshToken(admin.id);
};

const forgotPassword = async (email) => {
  const admin = await authRepo.findAdminByEmail(email);
  if (!admin) return;

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(
    Date.now() + process.env.RESET_TOKEN_EXPIRY_MINUTES * 60 * 1000
  );
  await authRepo.saveResetToken(admin.id, token, expiresAt);
  await sendPasswordResetEmail(email, token);
};

const resetPassword = async (token, newPassword) => {
  const admin = await authRepo.findAdminByResetToken(token);
  if (!admin) throw new AppError('Invalid or expired reset token', 400);

  const isExpired = new Date() > new Date(admin.reset_token_expires_at);
  if (isExpired) throw new AppError('Invalid or expired reset token', 400);

  const hash = await bcrypt.hash(newPassword, 10);
  await authRepo.updateAdminPassword(admin.id, hash);
  await authRepo.clearResetToken(admin.id);
};

const changePassword = async (adminId, oldPassword, newPassword) => {
  const admin = await authRepo.findAdminById(adminId);
  if (!admin) throw new AppError('Admin not found', 404);

  const isMatch = await bcrypt.compare(oldPassword, admin.password_hash);
  if (!isMatch) throw new AppError('Current password is incorrect', 401);

  const hash = await bcrypt.hash(newPassword, 10);
  await authRepo.updateAdminPassword(adminId, hash);
};

const changeEmail = async (adminId, newEmail, password) => {
  const admin = await authRepo.findAdminById(adminId);
  if (!admin) throw new AppError('Admin not found', 404);

  const isMatch = await bcrypt.compare(password, admin.password_hash);
  if (!isMatch) throw new AppError('Password is incorrect', 401);

  const existing = await authRepo.findAdminByEmail(newEmail);
  if (existing) throw new AppError('Email already in use', 400);

  await authRepo.updateAdminEmail(adminId, newEmail);
};

module.exports = {
  login, refresh, logout,
  forgotPassword, resetPassword,
  changePassword, changeEmail,
};