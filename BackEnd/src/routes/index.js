const express = require('express');
const router = express.Router();

router.use('/',     require('./resumeRoutes'));
router.use('/auth', require('./authRoutes'));
router.use('/admin', require('./admin/index'));

module.exports = router;