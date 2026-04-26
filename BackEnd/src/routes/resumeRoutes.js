const express = require('express');
const router = express.Router();
const resumeCtrl = require('../controllers/resumeController');

router.get('/profile',    resumeCtrl.getProfile);
router.get('/experience', resumeCtrl.getExperience);
router.get('/education',  resumeCtrl.getEducation);
router.get('/skills',     resumeCtrl.getSkills);
router.get('/projects',   resumeCtrl.getProjects);

module.exports = router;
