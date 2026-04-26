const express = require('express');
const router = express.Router();
const projectTagCtrl = require('../../controllers/admin/projectTagController');
const validate = require('../../middleware/validate');
const { createProjectTagSchema, updateProjectTagSchema } = require('../../validators/projectTagValidator');

router.post('/',    validate(createProjectTagSchema), projectTagCtrl.createProjectTag);
router.put('/:id',  validate(updateProjectTagSchema), projectTagCtrl.updateProjectTag);
router.delete('/:id',                                 projectTagCtrl.deleteProjectTag);

module.exports = router;
