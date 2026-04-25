const express = require('express');
const router = express.Router();
const resumeCtrl = require('../controllers/resumeController');
const authCtrl = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// public resume endpoints
router.get('/profile',    resumeCtrl.getProfile);
router.get('/experience', resumeCtrl.getExperience);
router.get('/education',  resumeCtrl.getEducation);
router.get('/skills',     resumeCtrl.getSkills);
router.get('/projects',   resumeCtrl.getProjects);

// auth endpoints
router.post('/auth/login',           authCtrl.login);
router.post('/auth/refresh',         authCtrl.refresh);
router.post('/auth/logout',          authCtrl.logout);
router.post('/auth/forgot-password', authCtrl.forgotPassword);
router.post('/auth/reset-password',  authCtrl.resetPassword);

// protected endpoints
router.put('/admin/auth/change-password', verifyToken, authCtrl.changePassword);
router.put('/admin/auth/change-email',    verifyToken, authCtrl.changeEmail);

module.exports = router;