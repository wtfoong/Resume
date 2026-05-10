const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
  changeEmailSchema,
} = require('../validators/authValidator');

router.post('/login',           validate(loginSchema),           authCtrl.login);
router.post('/refresh',                                          authCtrl.refresh);
router.post('/logout',                                           authCtrl.logout);
router.post('/forgot-password', validate(forgotPasswordSchema),  authCtrl.forgotPassword);
router.post('/reset-password',  validate(resetPasswordSchema),   authCtrl.resetPassword);

// verify access token
router.get('/verify', verifyToken, (req, res) => {
  res.json({ valid: true, admin: req.admin });
});

router.put('/admin/change-password', verifyToken, validate(changePasswordSchema), authCtrl.changePassword);
router.put('/admin/change-email',    verifyToken, validate(changeEmailSchema),    authCtrl.changeEmail);

module.exports = router;