const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../middleware/auth');

router.use(verifyToken); // applies to all admin routes

router.use('/profile',            require('./profileRoutes'));
router.use('/contacts',           require('./contactRoutes'));
router.use('/experience',         require('./experienceRoutes'));
router.use('/experience-details', require('./experienceDetailRoutes'));
router.use('/education',          require('./educationRoutes'));
router.use('/education-details',  require('./educationDetailRoutes'));
router.use('/skills',             require('./skillRoutes'));
router.use('/projects',           require('./projectRoutes'));
router.use('/project-tags',       require('./projectTagRoutes'));

module.exports = router;
