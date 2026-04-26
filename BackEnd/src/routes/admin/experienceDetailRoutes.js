const express = require('express');
const router = express.Router();
const experienceDetailCtrl = require('../../controllers/admin/experienceDetailController');
const validate = require('../../middleware/validate');
const { createExperienceDetailSchema, updateExperienceDetailSchema } = require('../../validators/experienceDetailValidator');

router.post('/',    validate(createExperienceDetailSchema), experienceDetailCtrl.createExperienceDetail);
router.put('/:id',  validate(updateExperienceDetailSchema), experienceDetailCtrl.updateExperienceDetail);
router.delete('/:id',                                       experienceDetailCtrl.deleteExperienceDetail);

module.exports = router;
