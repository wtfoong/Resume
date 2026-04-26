const express = require('express');
const router = express.Router();
const projectCtrl = require('../../controllers/admin/projectController');
const validate = require('../../middleware/validate');
const { createProjectSchema, updateProjectSchema } = require('../../validators/projectValidator');

router.post('/',    validate(createProjectSchema), projectCtrl.createProject);
router.put('/:id',  validate(updateProjectSchema), projectCtrl.updateProject);
router.delete('/:id',                              projectCtrl.deleteProject);

module.exports = router;
