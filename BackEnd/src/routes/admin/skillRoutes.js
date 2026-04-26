const express = require('express');
const router = express.Router();
const skillCtrl = require('../../controllers/admin/skillController');
const validate = require('../../middleware/validate');
const { createSkillSchema, updateSkillSchema } = require('../../validators/skillValidator');

router.post('/',    validate(createSkillSchema), skillCtrl.createSkill);
router.put('/:id',  validate(updateSkillSchema), skillCtrl.updateSkill);
router.delete('/:id',                            skillCtrl.deleteSkill);

module.exports = router;
