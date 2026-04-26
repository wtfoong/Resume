const express = require('express');
const router = express.Router();
const educationDetailCtrl = require('../../controllers/admin/educationDetailController');
const validate = require('../../middleware/validate');
const { createEducationDetailSchema, updateEducationDetailSchema } = require('../../validators/educationDetailValidator');

router.post('/',    validate(createEducationDetailSchema), educationDetailCtrl.createEducationDetail);
router.put('/:id',  validate(updateEducationDetailSchema), educationDetailCtrl.updateEducationDetail);
router.delete('/:id',                                      educationDetailCtrl.deleteEducationDetail);

module.exports = router;
