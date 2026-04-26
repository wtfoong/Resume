const express = require('express');
const router = express.Router();
const experienceCtrl = require('../../controllers/admin/experienceController');
const validate = require('../../middleware/validate');
const { createExperienceSchema, updateExperienceSchema } = require('../../validators/experienceValidator');

router.post('/',    validate(createExperienceSchema), experienceCtrl.createExperience);
router.put('/:id',  validate(updateExperienceSchema), experienceCtrl.updateExperience);
router.delete('/:id',                                 experienceCtrl.deleteExperience);

module.exports = router;
