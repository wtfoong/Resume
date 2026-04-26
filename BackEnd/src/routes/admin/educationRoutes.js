const express = require('express');
const router = express.Router();
const educationCtrl = require('../../controllers/admin/educationController');
const validate = require('../../middleware/validate');
const { createEducationSchema, updateEducationSchema } = require('../../validators/educationValidator');

router.post('/',    validate(createEducationSchema), educationCtrl.createEducation);
router.put('/:id',  validate(updateEducationSchema), educationCtrl.updateEducation);
router.delete('/:id',                                educationCtrl.deleteEducation);

module.exports = router;
