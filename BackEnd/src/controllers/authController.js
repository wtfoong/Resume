const authService = require('../services/authService');
const AppError = require('../utils/AppError');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return next(new AppError('Email and password are required', 400));
    const { accessToken, refreshToken, refreshExpiresAt } = await authService.login(email, password);
    res.cookie('refreshToken', refreshToken, {
      ...COOKIE_OPTIONS,
      expires: refreshExpiresAt,
    });
    res.json({ accessToken });
  } catch (err) { next(err); }
};

const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return next(new AppError('Refresh token required', 401));
    const { accessToken, newRefreshToken, newRefreshExpiresAt } = await authService.refresh(refreshToken);
    res.cookie('refreshToken', newRefreshToken, {
      ...COOKIE_OPTIONS,
      expires: newRefreshExpiresAt,
    });
    res.json({ accessToken });
  } catch (err) { next(err); }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    await authService.logout(refreshToken);
    res.clearCookie('refreshToken', COOKIE_OPTIONS);
    res.json({ message: 'Logged out successfully' });
  } catch (err) { next(err); }
};

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if (!email) return next(new AppError('Email is required', 400));
    await authService.forgotPassword(email);
    res.json({ message: 'If that email exists, a reset link has been sent' });
  } catch (err) { next(err); }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body || {};
    if (!token || !newPassword) return next(new AppError('Token and new password are required', 400));
    await authService.resetPassword(token, newPassword);
    res.json({ message: 'Password reset successfully' });
  } catch (err) { next(err); }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body || {};
    if (!oldPassword || !newPassword) return next(new AppError('Old and new password are required', 400));
    await authService.changePassword(req.admin.id, oldPassword, newPassword);
    res.json({ message: 'Password changed successfully' });
  } catch (err) { next(err); }
};

const changeEmail = async (req, res, next) => {
  try {
    const { newEmail, password } = req.body || {};
    if (!newEmail || !password) return next(new AppError('New email and password are required', 400));
    await authService.changeEmail(req.admin.id, newEmail, password);
    res.json({ message: 'Email changed successfully' });
  } catch (err) { next(err); }
};

module.exports = {
  login, refresh, logout,
  forgotPassword, resetPassword,
  changePassword, changeEmail,
};