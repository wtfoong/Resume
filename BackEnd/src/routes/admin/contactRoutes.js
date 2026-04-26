const express = require('express');
const router = express.Router();
const contactCtrl = require('../../controllers/admin/contactController');
const validate = require('../../middleware/validate');
const { createContactSchema, updateContactSchema } = require('../../validators/contactValidator');

router.post('/',    validate(createContactSchema), contactCtrl.createContact);
router.put('/:id',  validate(updateContactSchema), contactCtrl.updateContact);
router.delete('/:id',                              contactCtrl.deleteContact);

module.exports = router;
