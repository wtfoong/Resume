const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/resumeController');

router.get('/profile',    ctrl.getProfile);
router.get('/experience', ctrl.getExperience);
router.get('/education',  ctrl.getEducation);
router.get('/skills',     ctrl.getSkills);
router.get('/projects',   ctrl.getProjects);

module.exports = router;